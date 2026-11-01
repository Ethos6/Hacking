# ☁️ Cloud and DevSecOps

**For:** developers, platform engineers and anyone shipping software to the cloud.
**Prerequisites:** Git, containers and a cloud account you own.

## 1. Secure your code

- Add [Semgrep](https://semgrep.dev/) to your editor or CI to catch insecure patterns.
- Browse [Static Analysis Tools](https://analysis-tools.dev/) for analyzers in your language.
- Follow the [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) for secure defaults.

## 2. Keep secrets out of Git

- Scan your repositories with [Gitleaks](https://github.com/gitleaks/gitleaks) or [TruffleHog](https://github.com/trufflesecurity/trufflehog), and add one as a pre-commit hook.

## 3. Manage dependencies and images

- Check dependencies for known vulnerabilities with [OSV-Scanner](https://github.com/google/osv-scanner).
- Scan container images, filesystems and IaC with [Trivy](https://trivy.dev/).

## 4. Audit your cloud account

- Run [Prowler](https://github.com/prowler-cloud/prowler) against your own AWS, Azure or GCP account and fix the highest-severity findings first.

## 5. Protect the pipeline

- Read [Awesome CI/CD Attacks](https://github.com/TupleType/awesome-cicd-attacks) to understand how build systems are attacked, then harden your own workflows: pin dependencies, limit token permissions and protect release branches.
