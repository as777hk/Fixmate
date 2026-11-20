# FixMate — Assignment Submission

## Live application
https://as-fixmate.vercel.app

## Source repositories
This project is maintained as one GitHub monorepo with independent client and server deployment roots.

- Client (Next.js): https://github.com/as777hk/Fixmate/tree/main/client
- Server (Express API): https://github.com/as777hk/Fixmate/tree/main/server
- Full repository: https://github.com/as777hk/Fixmate

## Demo account roles
The production demo seed previously created examiner accounts for all required roles. Use the separate credential handoff supplied to the project owner for passwords; do not publish passwords in this repository.

- Administrator: admin@fixmate.com
- Technician: ariyan.tech@fixmate.com
- Customer: samira@fixmate.com

## Main functionality
- Role-based customer, technician and administrator experiences.
- Repair service discovery across seven categories.
- Customer booking requests and booking status tracking.
- Technician job workflow and service management.
- Administrator service moderation and dashboard.
- Stripe Test Mode payment integration and webhook processing.
- ImgBB-backed image upload integration.
- Responsive public pages and role-aware dashboards.

## Production deployment status
- Client Vercel project: READY (latest deployment includes footer social profile links).
- API Vercel project: READY.
- MongoDB health check: connected on the last verified health check.
- Stripe Test Mode account: authorized; webhook endpoint enabled for checkout completion events.

## Social profile links
- Developer GitHub: https://github.com/Annika-Islam
- Developer LinkedIn: https://www.linkedin.com/in/as-full-stack-dev
- Developer email: annikaakter06@gmail.com

## Outstanding verification
- Google OAuth is not enabled in production; Google Client ID/Secret must be supplied and the client flag enabled before Google sign-in can be tested.
- Stripe Test Checkout must be exercised with a real test card before claiming end-to-end payment verification.
- Customer, technician and admin interactive login and workflows must be manually verified in the deployed site before final grading.
- Confirm all demo passwords from the private credential handoff before submission.
