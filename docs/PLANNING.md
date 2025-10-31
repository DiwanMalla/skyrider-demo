# Skyrider Website Redesign — Project Plan

This document captures the plan to redesign the Skyrider high school website and add a secure, testable results publication system with an admin panel.

## Summary

- Goals: modern responsive public site, secure admin area for result publication, robust publish workflow (upload → validate → preview → publish → rollback), strong security & middleware, automated tests, CI/CD and documentation.
- Primary deliverable: MVP that supports public pages + secure admin UI for publishing exam results.

---

## Stakeholders & Requirements

- Admins: upload results (CSV/Excel), preview, publish/unpublish, rollback, manage users.
- Students & parents: search or view published results by roll number / exam / class.
- Non-functional: secure, auditable, maintainable, tested, performant, accessible.

Must-haves:

- Secure admin authentication (single admin login)
- CSV/Excel upload with schema validation and clear error reporting
- Preview and explicit publish step (no auto-publish)
- Audit logs for publishes/rollbacks and admin actions
- Public results API with rate limiting and privacy controls

Nice-to-haves (phase 2):

- 2FA for admins, email notifications on publish, scheduled publications, import progress UI, per-student view with limited PII.

---

## Recommended Technology Stacks (pick one)

1. Modern JavaScript (recommended):
   - Frontend: Next.js + TypeScript (React)
   - Backend/API: Next.js API routes or small Node/Express service
   - DB: PostgreSQL (Prisma ORM)
   - Auth: Auth.js / NextAuth with secure sessions, optional 2FA
   - Tests: Jest, Testing Library, Playwright
   - Hosting: Vercel for frontend, managed Postgres (Supabase, Railway)

## Frontend UI stack (recommended)

That combo gives you:

- Stunning animations 🎬
- Reusable, elegant components 🧩
- Fast dev setup ⚡
- Enterprise-level UI quality 💼

Suggested libraries/tools to achieve this:

- Tailwind CSS — utility-first styling for rapid, consistent UI builds.
- Radix UI or Headless UI — accessible, unstyled primitives to build reusable components.
- Framer Motion & GSAP — powerful animation library for smooth, production-ready animations.
- shadcn/ui or a small component library built on Tailwind + Radix — quick, consistent UI components.
- Storybook — component explorer and documentation for a reusable component library.
- clsx / classnames — small helper for conditional class concatenation.

Why this is a good choice:

- Tailwind + Radix/Headless separates styling from logic, making components highly reusable and themeable.
- Framer Motion integrates well with React and Tailwind and enables polished animations without huge overhead.
- Storybook accelerates design-to-development feedback and produces living documentation for the admin/public UI components.

If you want, I can scaffold the Next.js starter with this UI combo (Tailwind + Radix + Framer Motion + Storybook) and a small example component library and playroom. This will include an example animated result card, a Storybook story, and a basic global theme.

---

## Architecture (high level)

- Client (Next.js) — SSR/SSG for public pages, protected admin pages
- API (Next API or small Express app) — CSV ingestion, validation, publications
- Database (Postgres) — canonical store for students, exams, results, publications, audit logs
- Object storage (S3 or provider storage) — raw upload files and backups
- Background worker/queue (optional) — process large imports
- CI (GitHub Actions) — lint, tests, build, deploy
- Monitoring: Sentry for errors, basic metrics

Middleware responsibilities:

- Auth checks (admin-only)
- Input validation and schema checks
- Rate-limiting and IP throttling for public endpoints
- Logging and structured error handling

---

## Core Data Model (entities)

- AdminUser { id, name, email, password_hash, roles, disabled, createdAt }
- Student { id, roll_number, name, class_id, optional_encrypted_pii }
- Class { id, name }
- Exam { id, name, term, date }
- Result { id, exam_id, student_id, subject, marks, grade }
- Publication { id, exam_id, uploaded_by, status, created_at, published_at, checksum }
- Upload { id, filename, uploaded_by, hash, validation_report }

Notes:

- Keep PII minimized in published records. Consider encrypting sensitive columns.
- Model supports versioned Publications for rollback.

---

## Result Publication Workflow

1. Admin uploads CSV/Excel file via admin UI.
2. Server validates schema and data (required fields, ranges, duplicates).
3. Admin previews import results and resolves issues.
4. Admin confirms Publish → server creates a Publication record and writes Result rows in a DB transaction.
5. Publication becomes visible to public API only when status is `published`.
6. Rollback creates a new Publication that reverts to prior state or marks current as superseded.

Edge cases handled:

- Partial import failures → transaction rollback
- Concurrent publishes → serialized by publication records and DB transactions
- Large files → background job with progress and resumable upload

---

## Security & Middleware Checklist

- Use HTTPS everywhere; secure cookies (HttpOnly, Secure, SameSite)
- Server-side input validation (zod / Joi / pydantic)
- CSRF protection for cookie-based flows; token for API
- Rate limit the public results API; IP-based throttling
- Password policy + optional 2FA; account lockout on repeated failures
- Use helmet-like headers (CSP, X-Frame-Options, X-XSS-Protection)
- Secrets stored in environment variables or secret manager
- Audit logs for admin actions and publication events
- Run dependency vulnerability scans (Dependabot)

---

## Testing Strategy

- Unit tests: validator functions, import logic, business rules
- Integration tests: API endpoints with a test database
- E2E tests: admin upload -> publish -> public search (Playwright)
- Security tests: auth flows, authorization checks, error handling
- CI: run lint, typecheck, unit and integration tests on PRs; E2E on staging

Test data:

- Provide example CSVs: valid, invalid, edge cases (missing subjects, huge file)

---

## CI/CD and Deployment

- GitHub Actions:
  - PR: lint, typecheck, unit tests
  - Merge/main: build, integration tests, deploy to staging
  - Manual promotion to production
- Migrations: Prisma Migrate or Django migrations run as a distinct step; keep backups
- Backups: automated DB backups + retention policy

Hosting suggestions:

- Frontend/API: Vercel or Render
- DB: Supabase, Railway, or managed Postgres (small instance initially)
- Storage: S3 or provider object storage

---

## Timeline & Milestones (suggested)

- Week 0: Finalize requirements & pick stack; create repository scaffold and CI
- Week 1: Implement auth, DB schema, basic public pages
- Week 2: Implement CSV upload + validation + admin preview
- Week 3: Implement publish flow + public search API + tests
- Week 4: QA, E2E tests, staging deploy, docs

MVP goal: public site + secure admin + result publication in ~3–4 weeks (single developer). Adjust with team size.

---

## Deliverables

- Project scaffold (Next.js + TypeScript or chosen stack)
- Authenticated admin UI with CSV upload and preview
- Publish workflow and public API for results
- Test suite: unit, integration, E2E
- CI pipeline and deployment guide
- Documentation: README, admin guide, developer setup, API docs

---

## Next actions (what I can do now)

1. If you confirm stack = Next.js/TypeScript, I will scaffold a repo with:

   - initial Next.js app, TypeScript, ESLint, Prettier
   - Prisma schema and migrations for core models
   - Auth (Auth.js / NextAuth) skeleton
   - CSV upload API with a validator and sample test

2. Or if you prefer Django, I will scaffold a Django project with the import/publish flow wired to the Django Admin.

Please confirm which stack you prefer and, if available, attach a sample results CSV (or tell me the columns) so I can start scaffolding.

Note about admin section (user decision):

- Per your request, the admin UI and role/auth work will be held for now. We'll prioritize building the public-facing site and the results import/publication API and validation tooling. When you decide to resume the admin UI, I will resume work on the authenticated admin pages, upload UX, and admin docs.

---

Repository reference

- GitHub: https://github.com/DiwanMalla/skyrider-demo.git

To clone and try locally (example):

```bash
git clone https://github.com/DiwanMalla/skyrider-demo.git
cd skyrider-demo
# then follow the chosen stack's README/setup steps (to be added)
```

---

Contact / Handover notes

- I can start scaffolding once you confirm the stack and provide a sample CSV or the expected CSV columns. After scaffolding I will run the initial tests and share how to run the app locally.

---

Version: 2025-10-31
