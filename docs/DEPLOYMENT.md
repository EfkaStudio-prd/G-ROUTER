# Golden Router — Production Deployment Guide

This guide covers deploying Golden Router to production environments.

## Prerequisites

- Node.js >= 22.22.3 < 23 or >= 24.0.0 < 27
- pnpm package manager
- PostgreSQL database (for Supabase cloud sync, optional)
- Clerk account (for authentication, optional)

## Environment Variables

### Required Variables

```bash
# Security secrets
JWT_SECRET=your-jwt-secret-here
API_KEY_SECRET=your-api-key-secret-here
INITIAL_PASSWORD=your-admin-password

# Database
DATA_DIR=/var/lib/golden-router
STORAGE_ENCRYPTION_KEY=your-encryption-key-here
```

### Optional Variables

```bash
# Cloud Sync (Supabase + Clerk)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-publishable-key
CLERK_SECRET_KEY=your-secret-key
CLERK_WEBHOOK_SECRET=your-webhook-secret
CLOUD_SYNC_ENABLED=true

# Network
PORT=20128
HOST=0.0.0.0
NODE_ENV=production

# CORS (restrict in production)
CORS_ORIGIN=https://your-domain.com

# Authentication
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=true
```

See `.env.example` for the complete list of environment variables.

## Build Process

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Build for Production

```bash
pnpm run build
```

This creates an optimized production build in `.next/`.

### 3. Start Production Server

```bash
pnpm run start
```

## Deployment Options

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:24-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=20128

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 omniroute

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER omniroute

EXPOSE 20128

ENV PORT 20128
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t golden-router .
docker run -p 20128:20128 --env-file .env golden-router
```

### Vercel Deployment

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel --prod
```

3. Set environment variables in Vercel dashboard

### Railway Deployment

1. Create a new project on Railway
2. Link your GitHub repository
3. Set environment variables in Railway dashboard
4. Railway will automatically deploy on push

## Cloud Sync Setup (Optional)

### Supabase Setup

1. Create a new project at https://supabase.com
2. Run the schema from `src/lib/supabase/schema.sql` in the SQL editor
3. Enable Row Level Security (RLS) policies as defined in the schema
4. Get your project URL and anon key from Settings → API

### Clerk Setup

1. Create a new application at https://dashboard.clerk.com
2. Configure allowed origins for your domain
3. Create a webhook for user sync events
4. Get your publishable key and secret key from API Keys

### Enable Cloud Sync

Set the following environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
CLOUD_SYNC_ENABLED=true
```

Configure the Clerk webhook to point to:

```
https://your-domain.com/api/webhooks/clerk
```

## Security Considerations

1. **Never commit secrets** - Use environment variables for all sensitive data
2. **Enable HTTPS** - Set `AUTH_COOKIE_SECURE=true` in production
3. **Restrict CORS** - Set `CORS_ORIGIN` to your specific domain
4. **Require API keys** - Set `REQUIRE_API_KEY=true` for multi-user deployments
5. **Enable database encryption** - Set `STORAGE_ENCRYPTION_KEY` for data at rest
6. **Use strong secrets** - Generate secrets with `openssl rand -base64 48`

## Monitoring

### Health Check

```bash
curl https://your-domain.com/status
```

### Logs

Logs are stored in `DATA_DIR/logs/` by default.

### Metrics

The `/api/monitoring/health` endpoint provides health status and metrics.

## Backup Strategy

### Database Backup

SQLite database is automatically backed up on startup (can be disabled with `DISABLE_SQLITE_AUTO_BACKUP=true`).

Manual backup:

```bash
cp ~/.golden-router/omniroute.db ~/.golden-router/backup-$(date +%Y%m%d).db
```

### Cloud Sync Backup

If cloud sync is enabled, data is automatically synced to Supabase.

## Troubleshooting

### Build Errors

- Ensure Node.js version is correct: `node --version`
- Clear cache: `rm -rf .next node_modules && pnpm install`

### Runtime Errors

- Check logs in `DATA_DIR/logs/`
- Verify environment variables are set correctly
- Ensure database directory has proper permissions

### Cloud Sync Issues

- Verify Supabase credentials are correct
- Check RLS policies are enabled
- Ensure Clerk webhook is configured correctly

## Performance Optimization

1. **Enable caching** - Use Redis for rate limiting (set `REDIS_URL`)
2. **Compress responses** - Enable gzip compression in your reverse proxy
3. **Load balance** - Use multiple instances behind a load balancer
4. **Monitor resources** - Set up monitoring for CPU, memory, and disk usage

## Update Process

1. Pull latest changes: `git pull`
2. Install dependencies: `pnpm install`
3. Build: `pnpm run build`
4. Restart service

For zero-downtime deployments, use blue-green deployment or rolling updates.

## Support

For issues and questions:

- GitHub Issues: https://github.com/dwi/golden-router/issues
- Documentation: https://github.com/dwi/golden-router/blob/main/README.md
