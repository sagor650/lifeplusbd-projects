# Labaid AI Internal Product Timeline

Single-view internal delivery timeline for LUNA, Retina-FLVE, DigitalRM, MedPAC, TeleICU, PacMan Node, and the TeleICU Interface Board.

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

The build creates the timeline and 28 clickable KPI routes under `dist/kpi`. The production host is `https://labaidai.lifeplusbd.tech`.

The production Nginx templates are in `nginx/`. `bootstrap.conf` is used only for the first certificate request; `labaidai.conf` is the steady-state HTTPS configuration.
