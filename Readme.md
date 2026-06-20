# LifePlusBD Projects

A collection of LifePlusBD web projects, landing pages, and product showcase prototypes.

## Repository Overview

This repository contains multiple front-end builds and static site prototypes for LifePlusBD brands and services. Each top-level folder is a self-contained site, often mapped to a public subdomain such as `asset.lifeplusbd.tech`, `digitalrm.lifeplusbd.tech`, or `pms.lifeplusbd.tech`.

## Included Projects

- `home`
  - React + Vite product showcase and portfolio site.
  - Built with React, Tailwind CSS, Radix UI, and Vite.
  - Contains the main interactive application in `home/src` and a complete Vite configuration.

- `estate`
  - VirtuState landing page for virtual estate and real estate 3D experiences.
  - Includes full HTML/CSS content and branding for `estate.lifeplusbd.tech`.

- `tourism`
  - VirtuTour hotel interior explorer dashboard and pixel streaming prototype.
  - Includes a full static interface with hospitality UI, booking, and stream controls.

- `asset`
  - Placeholder landing page for `asset.lifeplusbd.tech`.

- `digitalrm`
  - Placeholder landing page for `digitalrm.lifeplusbd.tech`.

- `hub`
  - Placeholder landing page for `hub.lifeplusbd.tech`.

- `medipacs`
  - Placeholder landing page for `medipacs.lifeplusbd.tech`.

- `opti`
  - Placeholder landing page for `opti.lifeplusbd.tech`.

- `pms`
  - Placeholder landing page for `psm.lifeplusbd.tech`.

- `twin`
  - Placeholder landing page for `twin.lifeplusbd.tech`.

- `udp`
  - Placeholder landing page for `udp.lifeplusbd.tech`.

## Run Instructions for `home`

The `home` project is the main local development application in this repository.

1. Open a terminal and navigate to `home`.
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```
4. Build for production:
   ```powershell
   npm run build
   ```

## Notes

- Most folders are simple static HTML pages and can be served from any static web server.
- The `home` folder is the only project with a full Node-based build setup.
- Use the folder names to identify corresponding deployed subdomains and brand experiences.

## Deployment

### Free deployment option: GitHub Pages

This repository now includes a GitHub Actions workflow to deploy the `home` app to GitHub Pages.

Files added:
- `.github/workflows/deploy-gh-pages.yml`

How it works:
- Builds `home` on every push to `main`
- Publishes the output from `home/dist` to the `gh-pages` branch
- Uses the built-in `GITHUB_TOKEN`, so no extra secrets are required

To enable GitHub Pages:
1. Open your repo settings on GitHub.
2. Go to `Pages`.
3. Set the source to `gh-pages` branch.
4. Save and wait for the site to publish.

### Paid option: DigitalOcean App Platform

This repo also includes a DigitalOcean App Platform spec if you still want App Platform later.

Files added:
- `.github/workflows/deploy.yml`
- `app.yaml`

Required GitHub secrets for DigitalOcean App Platform:
- `DIGITALOCEAN_ACCESS_TOKEN`
- `DO_APP_ID`

Deployment behavior:
- Builds `home` on every push to `main`
- Uses `doctl` to update the App Platform app with the spec in `app.yaml`

If the app is not yet created, create it from the DigitalOcean control panel or with `doctl apps create --spec app.yaml` and then set `DO_APP_ID`.

## Contact

For updates or new project additions, add new folders at the repository root and document them in this README.
