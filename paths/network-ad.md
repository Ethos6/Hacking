# 🏰 Networks and Active Directory

**For:** pentesters and defenders responsible for Windows enterprise networks.
**Prerequisites:** [Start here](start-here.md) and basic Windows administration.

> Build everything below in your own lab. Never point these tools at networks you don't have written permission to test.

## 1. Map a network

- Discover hosts and services with [Nmap](https://nmap.org/). For large ranges, compare with [masscan](https://github.com/robertdavidgraham/masscan) or [RustScan](https://github.com/bee-san/RustScan).
- Watch what your scans look like on the wire with [Wireshark](https://www.wireshark.org/).

## 2. Build an Active Directory lab

- Deploy [GOAD (Game of Active Directory)](https://github.com/Orange-Cyberdefense/GOAD). It creates a deliberately vulnerable multi-domain environment.

## 3. Understand AD attack paths

- Collect and visualize relationships with [BloodHound](https://github.com/SpecterOps/BloodHound). Defenders use it to find and remove risky paths before attackers do.
- Learn how Windows protocols work (SMB, Kerberos, LDAP) through the example scripts in [Impacket](https://github.com/fortra/impacket).
- Use [HackTricks](https://book.hacktricks.wiki/) as a reference for specific techniques.

## 4. Privilege escalation

- Enumerate with [PEASS-ng](https://github.com/peass-ng/PEASS-ng) (winPEAS and linPEAS) in your lab, then understand each finding manually.
- Study [LOLBAS](https://lolbas-project.github.io/) for Windows and [GTFOBins](https://gtfobins.org/) for Linux.

## 5. Defend what you broke

- For every technique you practice, write down how it could be detected. Then continue with the [Blue team path](blue-team.md) and test those detections.
