# 🌐 Web application security

**For:** developers, aspiring pentesters and bug bounty hunters.
**Prerequisites:** [Start here](start-here.md), plus basic HTTP and some JavaScript.

## 1. Learn the vulnerability classes

- Work through the [Web Security Academy](https://portswigger.net/web-security) topic by topic. Do every apprentice lab before moving to practitioner labs.
- Read the [OWASP Top 10](https://owasp.org/www-project-top-ten/) and keep the [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) open for the defensive side of each issue.
- Watch the [Hacker101](https://www.hacker101.com/) videos for a bug bounty point of view.

## 2. Practice on deliberately vulnerable apps

- [DVWA](https://github.com/digininja/DVWA): start on "low" difficulty, then raise it and see what changes.
- [OWASP WebGoat](https://owasp.org/www-project-webgoat/): guided lessons that explain each flaw.
- [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/): a modern single-page app with 100+ challenges.

## 3. Learn the tools

- Intercept and modify requests with [ZAP](https://www.zaproxy.org/).
- Discover content with [ffuf](https://github.com/ffuf/ffuf) or [Gobuster](https://github.com/OJ/gobuster) and the wordlists in [SecLists](https://github.com/danielmiessler/SecLists).
- Understand what [sqlmap](https://sqlmap.org/) automates after you have found SQL injection by hand.
- Use [Nuclei](https://github.com/projectdiscovery/nuclei) templates to check for known issues at scale.

## 4. Test methodically

- Follow the [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) as a checklist on a full lab application.
- For APIs, use the [API Security Checklist](https://github.com/shieldfy/API-Security-Checklist).
- Use [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) and [HackTricks](https://book.hacktricks.wiki/) as references, not as a substitute for understanding.

## 5. Go further

- Read [Awesome Web Security](https://github.com/qazbnm456/awesome-web-security) for deeper research topics.
- When you are ready for bug bounties, start with [Awesome Bug Bounty](https://github.com/djadmin/awesome-bug-bounty) and always read each program's scope and rules.
- If you build software, verify your own app against [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/).
