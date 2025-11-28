# 🧪 Cypress + 🐳 Docker  
A clean, lightweight template for running **Cypress tests inside Docker** — portable, consistent, and CI-friendly.

<p align="center">
  <img src="https://img.shields.io/badge/Cypress-15.x-04C38E?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge" />
</p>

---

## 🚀 Overview

This repository provides a plug-and-play environment for running **Cypress end-to-end tests in Docker**, ensuring reproducible results across machines and CI pipelines.

✔ No need to install Cypress locally  
✔ Works on Windows, macOS, Linux  
✔ Perfect for CI providers (GitHub Actions, GitLab, Jenkins, Bitbucket…)  
✔ No flaky version mismatches — everything self-contained  

---

## 📦 Project Structure

```text
cypress_docker/
├── cypress/
│   ├── e2e/
│   │   └── sample.cy.js        # Example test
│   ├── fixtures/
│   ├── support/
├── Dockerfile                  # Cypress-in-Docker base image
├── docker-compose.yml          # 1-command test execution
└── README.md
```

## 🐳 Run Cypress in Docker (GUI or Headless)

1️⃣ Build the Docker image

docker build -t cypress-docker

2️⃣ Run tests (headless mode)

docker run --rm cypress-docker

3️⃣ Run with docker-compose (recommended)

docker-compose up --build

## 🧪 Running Cypress Open (GUI Mode)

You can open the Cypress GUI from inside the container using:

docker run -it --entrypoint=cypress cypress-docker open

## 🌐 GitHub Pages Documentation

A cleaner formatted HTML version of this README is available at:

👉 https://alejandroSagreraC.github.io/cypress_docker/


## 🛠️ Customization

### Place your tests in:
cypress/e2e/*.cy.js

### Install additional npm packages

RUN npm install <package-name>

## 📸 Screenshots (Optional)

cypress/screenshots/

## 🤖 CI Integration

This Docker setup works out of the box with any CI system.

### GitHub Actions Example

name: Cypress Tests

on: [push, pull_request]

```text
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build + test
        run: |
          docker-compose up --build --exit-code-from cypress
```

## 📚 Useful Commands

| Action          | Command                                                   |
| --------------- | --------------------------------------------------------- |
| Build image     | `docker build -t cypress-docker .`                        |
| Run tests       | `docker run --rm cypress-docker`                          |
| Open GUI        | `docker run -it --entrypoint=cypress cypress-docker open` |
| Run via compose | `docker-compose up --build`                               |

## ⭐ Contributions

Pull requests are welcome!
If you'd like new features (parallelization, artifacts, recordings), feel free to open an issue.

## 📄 License

MIT License — free for personal and commercial use.
