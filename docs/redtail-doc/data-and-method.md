---
title: Data & Method
---

# Data & Method

## Where the data comes from

The data comes from the **CequraIQ honeypot network**: decoy systems that look like real industrial, maritime, transport and IT services but have no real users. Anything that talks to them is, by definition, unsolicited. Every honeypot sits behind the **Suricata** intrusion detection system, running the Emerging Threats (ET) Open rule set, and its alerts are collected centrally in CequraIQ.

For this report we took **every Suricata alert where the HTTP user agent was `libredtail-http`**, from 7 Aug 2025 to 18 Oct 2026.

| | |
|---|---|
| Alerts collected | 18,575 |
| Removed as duplicates (see below) | 554 |
| **Alerts analysed** | **18,021** |
| Source IP addresses | 762 |
| Honeypots that saw Redtail | 18 (12 personas) |
| Visits | 1,122 |

## The honeypots

All 18 honeypots expose a web service: on port 80, except where noted. "Active" is the period in which each honeypot recorded Redtail alerts, which is close to but not the same as its uptime.

| Honeypot | Port | Active (Redtail seen) | Visits | IPs |
|---|---|---|---:|---:|
| IT Services with IMAP | 80 | 7 – 9 Aug 2025 | 5 | 5 |
| IT Services with POP3 | 80 | 8 Aug – 14 Oct 2025 | 72 | 64 |
| Electric vehicle charging process #1 | 80 | 10 Aug – 12 Dec 2025 | 145 | 130 |
| Electric vehicle charging process #2 | 80 | 13 Oct – 13 Dec 2025 | 90 | 78 |
| SCADA DNP3 S7 SERVER #1 | 80 | 23 Oct 2025 | 3 | 3 |
| Industrial Control Systems #1 | 80 | 25 Nov 2025 | 2 | 2 |
| Industrial Control Systems #2 | 80 | 27 Nov 2025 – 30 Apr 2026 | 17 | 16 |
| SCADA DNP3 S7 SERVER #2 | 80 | 9 Dec 2025 – 20 Jun 2026 | 108 | 100 |
| Electric-Vehicle-Charging-System | 80 | 7 Jan – 6 Feb 2026 | 61 | 59 |
| seatel-vsat-satcom | 5000 | 9 Jan – 14 Feb 2026 | 89 | 74 |
| Cobham-decoy #1 | 80 | 14 Apr – 1 Jul 2026 | 183 | 153 |
| Port-Authority-Gateway-Decoy #1 | 8000 | 17 – 19 Apr 2026 | 7 | 7 |
| Port-Authority-Gateway-Decoy #2 | 80 | 11 May – 14 Oct 2026 | 116 | 99 |
| Scada Historian Database | 80 | 19 – 20 Jun 2026 | 2 | 2 |
| Cobham-decoy #2 | 80 | 24 Jun – 16 Oct 2026 | 113 | 82 |
| seatel-vsat-satcom-Bahrain | 80, 5000 | 22 Jul – 18 Oct 2026 | 100 | 87 |
| SCADA DNP3 S7 SERVER #3 | 80 | 29 Jul 2026 | 1 | 1 |
| Malware Collection Type 2 | 80 | 25 Sep – 18 Oct 2026 | 8 | 8 |

::: warning Why honeypot IPs are not listed
Publishing a sensor's address lets attackers recognise it and stay away from it. Honeypots are therefore named by persona and numbered in order of first activity.
:::

## How we turned alerts into behaviour

1. **Alerts → requests.** Suricata often fires several rules on one HTTP request. We grouped alerts that share the same connection, request number and URL back into the single request that caused them.
2. **Requests → visits.** All requests from one IP to one honeypot belong to the same *visit* until there is a gap of more than 30 minutes.
3. **Visits → playbooks.** Each visit is labelled by *which* exploit requests it contained: Kit A, Kit B, Single or Partial. The labels are defined in [Attack Breakdown](./attack-breakdown.md).
4. **CVE and MITRE ATT&CK.** These come from the Suricata rule metadata where the rule has it. Where a rule has none, we add an analyst mapping and say so.

## What we removed

On the two *Cobham-decoy* honeypots, a reverse proxy forwards traffic to the application inside the honeypot. Suricata saw the same request twice: once from the real attacker and once from the proxy's internal address (172.18.0.3 / 172.20.0.3), with the attacker in the `X-Forwarded-For` header. 547 of these 554 internal alerts matched an alert from the real attacker within 5 seconds, so we removed them all. Left in, they would have looked like "two IPs with 256 visits".

## Limits

- **Alerts only.** We see the URL, method and response code, not the request body. The downloader body on the first request is only known because a rule matched it.
- **Sensors came and went.** The honeypots were online at different times, so compare honeypots *within* their active windows (see the [timeline](./activity.md)).
- **Location data is approximate.** Country and network owner come from IP enrichment. 135 IPs have no network-owner information.
