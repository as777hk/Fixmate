# FixMate

A full-stack repair-service marketplace for Dhaka, Bangladesh, focused on clear service listings, accountable repair progress and payment after completion.

## Workspace
- `client/` — Next.js App Router, TypeScript, Better Auth, public pages and role-based dashboards.
- `server/` — Express API, MongoDB, Better Auth, access-control middleware, booking and service routes, ImgBB uploads and Stripe.

The client and API are independent deployment roots inside this repository. Deploy the client from `client/` and the API from `server/`.

## Local development
Requirements: Node.js 20.11+ and npm 10+.
1. Copy `server/.env.example` to `server/.env` and configure MongoDB, Better Auth and local origins.
2. Copy `client/.env.local.example` to `client/.env.local`.
3. Install dependencies from the repository root: `npm install`.
4. Seed a development database: `npm run seed`.
5. Start both applications: `npm run dev`.

Client: `http://localhost:3000`. API health: `http://localhost:5000/api/health`.

## Production configuration
Set secrets only in the API deployment environment. Integrations include MongoDB Atlas, Better Auth, Stripe test-mode credentials and an ImgBB API key. Google OAuth is optional. Never commit environment files or credentials.

Create two Vercel projects from this repository:

- **Client project:** Root Directory `client/`, domain `https://as-fixmate.vercel.app`.
- **API project:** Root Directory `server/`, domain `https://as-fixmate-api.vercel.app`.

For the client project, set `NEXT_PUBLIC_API_URL`, `INTERNAL_API_URL` and `API_URL` to `https://as-fixmate-api.vercel.app`; set `NEXT_PUBLIC_SITE_URL` to `https://as-fixmate.vercel.app`. For the API project, set `BETTER_AUTH_URL=https://as-fixmate-api.vercel.app`, `CLIENT_URL=https://as-fixmate.vercel.app` and `CORS_ALLOWED_ORIGINS=https://as-fixmate.vercel.app`. Also configure MongoDB Atlas, a 32+ character `BETTER_AUTH_SECRET`, Stripe test-mode `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`, and `IMGBB_API_KEY`. Google OAuth is optional; when enabled, register the API callback URL `https://as-fixmate-api.vercel.app/api/auth/callback/google` and the client origin in Google Cloud.

Register the Stripe webhook as `https://as-fixmate-api.vercel.app/api/payments/webhook` in Stripe Test Mode. Never place server secrets in the client project or commit them to GitHub. Run `npm run seed` against the intended MongoDB database after setting secure admin, technician and customer seed credentials in the server environment.

## Product capabilities
- Customer, technician and administrator experiences with role-aware navigation.
- Searchable repair listings across seven categories.
- Repair booking, ownership checks, valid status transitions and a job timeline.
- Technician listing management and administrator moderation.
- Stripe Checkout after job completion, verified webhooks and idempotent payment records.
- ImgBB-backed service and profile image uploads.
- Responsive public pages, dashboards, loading and error states, and persistent theme preference.

## Visual assets
Temporary, distinct service photographs are currently used for development. The final 14 custom FixMate JPGs and the supplied `fixmate-live-preview.html` reference will be integrated when provided; they are intentionally not fabricated.

## Repository layout and submission links
- Client source: `client/` — https://github.com/as777hk/Fixmate/tree/main/client
- Server source: `server/` — https://github.com/as777hk/Fixmate/tree/main/server
- This is a single monorepo; both Vercel projects deploy from their respective root directories.

## Quality checks
Run `npm run check` for server checks and client TypeScript validation; run `npm run build` for production builds. Configure real integration credentials before testing OAuth, uploads or Stripe end to end.
