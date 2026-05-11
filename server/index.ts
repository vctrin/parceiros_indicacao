import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const partnerInterestSchema = z.object({
  nome: z.string().trim().min(1).max(50),
  sobrenome: z.string().trim().min(1).max(50),
  email: z.string().trim().email().max(100),
  celular: z
    .string()
    .trim()
    .max(20)
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 11;
    }),
  empresa: z.string().trim().min(1).max(100),
  observacoes: z.string().trim().max(500).optional().default(""),
  website: z.string().trim().max(200).optional().default(""),
});

const rateLimitWindowMs = 60_000;
const maxRequestsPerWindow = 3;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: express.Request) {
  return req.ip || req.socket.remoteAddress || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  entry.count += 1;
  return entry.count > maxRequestsPerWindow;
}

function pruneRateLimitStore() {
  const now = Date.now();
  for (const [ip, entry] of Array.from(rateLimitStore.entries())) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(ip);
    }
  }
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  const partnerWebhookUrl = process.env.PARTNER_WEBHOOK_URL || process.env.WEBHOOK_URL;

  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    res.setHeader(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "script-src 'self' https:",
        "style-src 'self' 'unsafe-inline' https:",
        "font-src 'self' https: data:",
        "img-src 'self' https: data:",
        "connect-src 'self' https:",
      ].join("; ")
    );
    next();
  });

  app.use(express.json({ limit: "16kb", type: "application/json" }));

  app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error instanceof SyntaxError) {
      res.status(400).json({ error: "invalid_json" });
      return;
    }

    next(error);
  });

  app.post("/api/partner-interest", async (req, res) => {
    const ip = clientIp(req);

    pruneRateLimitStore();
    if (isRateLimited(ip)) {
      res.status(429).json({ error: "rate_limited" });
      return;
    }

    const parsed = partnerInterestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "invalid_payload" });
      return;
    }

    if (parsed.data.website) {
      res.status(204).end();
      return;
    }

    if (!partnerWebhookUrl) {
      console.error("PARTNER_WEBHOOK_URL is not configured");
      res.status(503).json({ error: "service_unavailable" });
      return;
    }

    try {
      const webhookResponse = await fetch(partnerWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...parsed.data,
          website: undefined,
          timestamp: new Date().toISOString(),
          source: "landing-page-parceria",
          client: {
            ip,
            userAgent: req.get("user-agent") || "",
          },
        }),
        signal: AbortSignal.timeout(10_000),
      });

      if (!webhookResponse.ok) {
        console.error(`Partner webhook failed with status ${webhookResponse.status}`);
        res.status(502).json({ error: "webhook_failed" });
        return;
      }

      res.status(202).json({ success: true });
    } catch (error) {
      console.error("Partner webhook request failed", error);
      res.status(502).json({ error: "webhook_failed" });
    }
  });

  app.use("/api", (_req, res) => {
    res.status(404).json({ error: "not_found" });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(
    express.static(staticPath, {
      dotfiles: "deny",
      etag: true,
      index: false,
      maxAge: process.env.NODE_ENV === "production" ? "1h" : 0,
    })
  );

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
