# Community & AI features

## Setup

### Backend `.env`

```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=https://admin.aashishtimalsina.com.np/api/v1/auth/google/callback
FRONTEND_URL=https://aashishtimalsina.com.np
GEMINI_API_KEY=...   # Google AI Studio
```

Or set **Gemini API key** in Filament → **Community → AI & Integrations** (encrypted in DB).

### Google Cloud Console

1. OAuth client (Web application).
2. Authorized redirect URI: your `GOOGLE_REDIRECT_URI`.
3. Authorized JavaScript origins: `https://aashishtimalsina.com.np`.

### Migrate

```bash
cd backend && php artisan migrate
```

## Features

| Feature | URL | Auth |
|---------|-----|------|
| Summarize / Humanize | `/tools` | Google |
| Portfolio chatbot | `/chat` | Google |
| Account & profile | `/account` | Google |
| Public profile | `/u/{username}` | Public if enabled |
| Blog comments & ratings | `/blog/{slug}` | Google to post |

## Admin (Filament)

- **AI & Integrations** — API keys, enable tools/chat, chatbot context, daily limits
- **Comments** — Approve / reject (new comments are `pending`)
- **Members** — Google sign-in users
