# 🛡️ Blue team and incident response

**For:** SOC analysts, incident responders, detection engineers and sysadmins.
**Prerequisites:** [Start here](start-here.md).

## 1. Learn how attackers operate

- Browse [MITRE ATT&CK](https://attack.mitre.org/) and pick a few techniques to study in depth. Detection starts with knowing what you're looking for.
- Read the techniques behind [LOLBAS](https://lolbas-project.github.io/) and [GTFOBins](https://gtfobins.org/): attackers often use built-in system tools.

## 2. See it on the network

- Analyze captures with [Wireshark](https://www.wireshark.org/).
- Run [Zeek](https://zeek.org/) on a capture to see how traffic becomes searchable logs.
- Run [Suricata](https://suricata.io/) with a public rule set and see what alerts fire. [Awesome Suricata](https://github.com/satta/awesome-suricata) lists rule sources.

## 3. See it on the endpoint

- Query your own machine with [osquery](https://osquery.io/).
- Collect artifacts across machines with [Velociraptor](https://docs.velociraptor.app/).

## 4. Write and test detections

- Learn the [Sigma](https://github.com/SigmaHQ/sigma) rule format and convert rules for your SIEM.
- Simulate techniques safely in a lab with [Atomic Red Team](https://atomicredteam.io/), then check whether your detections fire.
- Follow the [ThreatHunter-Playbook](https://github.com/OTRF/ThreatHunter-Playbook) for hypothesis-driven hunting.
- Read [Awesome Detection Engineering](https://github.com/infosecB/awesome-detection-engineering).

## 5. Investigate incidents

- Disk forensics with [Autopsy](https://www.autopsy.com/).
- Memory forensics with [Volatility 3](https://github.com/volatilityfoundation/volatility3).
- Build timelines with [Plaso](https://plaso.readthedocs.io/).
- Keep [Awesome Incident Response](https://github.com/meirwah/awesome-incident-response) and [Awesome Forensics](https://github.com/Cugu/awesome-forensics) as references.

## 6. Scale up

- Run full adversary emulations with [Caldera](https://github.com/apache/caldera).
- Track threats with resources from [Awesome Threat Intelligence](https://github.com/hslatman/awesome-threat-intelligence).
