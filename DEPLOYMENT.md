# Deployment Guide

This guide covers deploying the portfolio site to GitHub Pages.

## Prerequisites

- Node.js >= 20.0
- Git configured with your GitHub credentials
- A GitHub account (username: `abhishekgupta1`)

## 1. Create the GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a repository named `portfolio-site`
3. Set visibility to **Public** (required for GitHub Pages on free plans)
4. Do **not** initialize with a README (you already have local files)

Add the remote and push:

```bash
cd portfolio-site
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/abhishekgupta1/portfolio-site.git
git branch -M main
git push -u origin main
```

## 2. Configure GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Set the branch to `gh-pages` and folder to `/ (root)`
4. Click **Save**

> The `gh-pages` branch will be created automatically on your first deployment.

## 3. First-Time Deployment

Build and deploy the site:

```bash
npm run deploy
```

This runs the following command under the hood:

```
GIT_USER=abhishekgupta1 docusaurus deploy
```

It will:
- Build the site (`docusaurus build`)
- Push the build output to the `gh-pages` branch

After a successful deploy, the site will be live at:

```
https://abhishekgupta1.github.io/portfolio-site/
```

> GitHub Pages may take a few minutes to propagate on the first deploy.

### Troubleshooting

- **Authentication errors**: Ensure `GIT_USER` matches your GitHub username and you have push access. If using HTTPS, you may need a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
- **Build failures**: Run `npm run build` locally first to catch errors before deploying.

## 4. Custom Domain Setup (Optional)

To serve the site at `abhishekgtech.com`:

### DNS Configuration

Add these DNS records with your domain registrar:

| Type  | Name | Value                              |
|-------|------|------------------------------------|
| CNAME | www  | abhishekgupta1.github.io           |
| A     | @    | 185.199.108.153                    |
| A     | @    | 185.199.109.153                    |
| A     | @    | 185.199.110.153                    |
| A     | @    | 185.199.111.153                    |

### GitHub Pages Settings

1. Go to repo → **Settings** → **Pages**
2. Under **Custom domain**, enter `abhishekgtech.com`
3. Click **Save**
4. Check **Enforce HTTPS** once the DNS check passes

### Update Docusaurus Config

In `docusaurus.config.js`, update:

```js
url: 'https://abhishekgtech.com',
baseUrl: '/',
```

Then redeploy:

```bash
npm run deploy
```

### Add CNAME File

Create `static/CNAME` with your domain so it persists across deploys:

```
abhishekgtech.com
```
