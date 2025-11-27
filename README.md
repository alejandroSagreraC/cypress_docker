# Cypress Docker

![banner](docs/banner.svg)

A lightweight setup for running **Cypress end-to-end tests** inside a fully reproducible **Docker environment**.  
No need to install Node, Cypress, or browsers on your machine — everything runs in the container.

---

## 🚀 Live Documentation (GitHub Pages)
A beautifully formatted HTML version of this README is available here:

👉 **https://alejandroSagreraC.github.io/cypress_docker/**

---

## 📦 What’s inside?

- `cypress/` — test specs, fixtures, support files  
- `cypress.config.js` — Cypress configuration  
- `Dockerfile` — container image with Cypress + Node  
- `docker-compose.yml` — one-command test runner  
- `.dockerignore` / `.gitignore`  
- `package.json`

---

## 🧪 Running the tests

### **Using Docker Compose (recommended)**

```bash
docker-compose up
