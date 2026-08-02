# Labaid AI Product Delivery Map

Interactive executive roadmap for LUNA, Digital RM, MedPAC, TeleICU, PacMan Node, and the TeleICU Interface Board.

## Local development

```powershell
npm install
npm run dev
```

## Production build

```powershell
npm ci
npm run build
```

The build creates the portfolio home page and 27 static KPI routes under `dist/kpi`. The production host is `https://labaidai.lifeplusbd.tech`.

The production Nginx templates are in `nginx/`. `bootstrap.conf` is used only for the first certificate request; `labaidai.conf` is the steady-state HTTPS configuration.
