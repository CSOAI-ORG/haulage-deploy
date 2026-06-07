# Move #17 — status.haulage.app setup

## Vendor choice

**Better Stack** (formerly Better Uptime) — chosen for:

- Tier-1 UK + EU PoP coverage
- Sub-£20/mo paid tier
- Auto-detects HTTP / DNS / TCP / heartbeats
- Public branded status page on a subdomain
- Slack / Email / SMS alerts
- Incidents API for automation

Alternatives reviewed: Instatus (simpler), Atlassian Statuspage (overkill at this scale), UptimeRobot (no incident-management workflow).

## Subdomain plan

| Hostname                | What                                         | DNS                                                  |
|-------------------------|----------------------------------------------|------------------------------------------------------|
| `status.haulage.app`    | Public branded incidents + uptime history    | CNAME → `statuspage.betterstack.com`                 |
| `status.meok.ai`        | (Future) wider MEOK ecosystem status         | Same vendor                                          |

## Monitors to add (initial)

| Monitor                                | URL                                                              | Type     | Interval | Alert  |
|----------------------------------------|------------------------------------------------------------------|----------|----------|--------|
| haulage.app home                       | https://haulage.app/                                             | HTTP 200 | 3 min    | Email  |
| haulage.app catalogue                  | https://haulage.app/catalogue.json                               | HTTP 200 + JSON content | 3 min | Email |
| haulage.app sitemap                    | https://haulage.app/sitemap.xml                                  | HTTP 200 | 5 min    | Email  |
| Attestation API health                 | https://meok-attestation-api.vercel.app/health                   | JSON `ok=true` | 1 min | SMS+Email |
| Attestation API openapi                | https://meok-attestation-api.vercel.app/openapi.json             | HTTP 200 | 3 min    | Email  |
| Attestation API verifier               | POST https://meok-attestation-api.vercel.app/verify (smoke body) | HTTP 200 | 3 min    | Email  |
| Compliance app                         | https://meok-compliance.vercel.app/                              | HTTP 200 | 5 min    | Email  |
| Plant Hire SaaS                        | https://planthire.ai/                                            | HTTP 200 | 5 min    | Email  |
| Grab Hire SaaS                         | https://grabhire.ai/                                             | HTTP 200 | 5 min    | Email  |
| Muckaway SaaS                          | https://muckaway.ai/                                             | HTTP 200 | 5 min    | Email  |
| Stripe Buy links                       | https://buy.stripe.com/4gMbJ3fsM28a381fL28k844                   | HTTP 200 | 10 min   | Email  |

## Components on the status page

1. **Web** — haulage.app + 4 .ai sites
2. **Attestation API** — sign, verify, OpenAPI surface
3. **MCP catalogue** — PyPI install availability for the 7 live MCPs
4. **Billing** — Stripe checkout reachability
5. **Identity + email** — nicholas@meok.ai mailbox + Stripe email delivery

## Manual setup (one-time, ~10 min)

1. Sign up at https://betterstack.com/users/sign-up
2. Better Uptime → New monitor → paste the URLs from the table above
3. Better Stack Status → New page → connect subdomain `status.haulage.app`
4. DNS: in Vercel domain settings (or registrar), add CNAME `status` → `cname.betterstack.com`
5. Add Slack webhook integration → `#alerts` channel
6. Embed status badge on haulage.app footer:

```tsx
<a href="https://status.haulage.app" target="_blank" rel="noopener noreferrer">
  <img
    src="https://betteruptime.com/status-badges/v1/monitor/PUBLIC_ID.svg"
    alt="MEOK status"
    height="20"
  />
</a>
```

## Why this matters

A visible status page = visible accountability. SOC 2 Type 1 auditors ask for it. Enterprise buyers ask for it. Today there's no way for a customer to know if a 5-minute blip was on our end or theirs — that ambiguity kills trust silently. This fixes it.

Cost: ~£15-25/mo. Wins: ⭐⭐⭐⭐⭐
