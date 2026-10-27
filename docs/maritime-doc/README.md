---
title: Summary
# Home page card. Every report folder needs this block in its README.md.
report:
  title: 'Maritime decoys: what 112,264 attackers did in six months'
  summary: >-
    Eight decoy ship, port and crane systems drew 1.19 million intrusion alerts. Most of it is
    automated, but the industrial side was found too: crane controllers on Modbus and a vessel
    network questioned over IEC-104.
  published: '2026-10-27'
  period: Apr – Oct 2026
  tags: [Maritime, OT / ICS, Scanning]
  stats:
    - ['1.19 M', intrusion alerts]
    - ['112,264', source IPs]
    - ['8', maritime decoys]
---

# Maritime decoys: what 112,264 attackers did in six months

<p class="report-byline">Cequra Threat Research · Published 27 Oct 2026 · Data: 11 Apr – 11 Oct 2026</p>

<div class="key-numbers">
  <div><strong>1.19 M</strong><span>intrusion alerts</span></div>
  <div><strong>112,264</strong><span>source IPs</span></div>
  <div><strong>11.3 M</strong><span>network events</span></div>
  <div><strong>8</strong><span>maritime decoys</span></div>
  <div><strong>54</strong><span>known-exploited CVEs targeted</span></div>
</div>

## In one paragraph

For six months we ran eight decoys that look like the digital side of shipping: a ship's **satellite terminal**, an **onboard vessel network**, an **AIS vessel-tracking database**, a **port authority gateway**, a container **terminal operating system** and three **crane controllers**. 112,264 IP addresses connected to them. Most were not looking for ships. They were automated scanners and bots that try everything on the internet: open databases, weak SSH passwords, unpatched web software. But the industrial side was found too. The crane controllers were contacted on **Modbus**, the protocol that drives their machinery, and someone used **IEC-104** to ask the vessel network for a full readout of its data points.

## Key findings

1. **Being reachable is enough to be attacked.** 90% of the source IPs touched only one decoy, and almost half of all alerts (49%) came from addresses that are *already* on public blocklists (Spamhaus, DShield, CINS). Most of this traffic is untargeted background noise that would find any exposed system.
2. **Each system draws a different kind of attack.** The terminal operating system was mostly hit with SSH password guessing (50% of its alerts). The port gateway drew web exploits (49%, led by 28,980 Log4Shell attempts). The AIS database drew MySQL probing, and the satellite terminal drew mostly blocklisted mass scanners (78%).
3. **Industrial protocols are found and probed.** Every alert on the three crane controllers was on the Modbus port: 28,036 in total, 83–100% of them from blocklisted scanners. On the vessel network, 180 IEC-104 *general interrogation* commands asked the station to report every value it holds.
4. **Old bugs still dominate, and new ones arrive fast.** Attackers tried 79 different CVEs, 54 of them on the CISA Known Exploited Vulnerabilities list. Log4Shell (2021) is still the most attempted. React2Shell ([CVE-2025-55182](https://nvd.nist.gov/vuln/detail/CVE-2025-55182)), a 2025 bug, was already tried 3,364 times on five decoys.
5. **The loudest sources are not the most dangerous.** The ten busiest IPs sent 26% of all traffic but caused only 1.3% of the alerts. 32 IPs reached all eight decoys, and 23 of them belong to Amazon Web Services.

## What to do

| | Action |
|---|---|
| **Never expose OT protocols** | Modbus (TCP 502) and IEC-104 (TCP 2404) should not be reachable from the internet. Put crane, PLC and SCADA interfaces behind a VPN or an allow-list. |
| **Use blocklists at the edge** | Dropping traffic from Spamhaus DROP, DShield and CINS-listed addresses would have removed about half of the alerts on these decoys. |
| **Lock down remote access** | Use SSH keys instead of passwords (moving SSH to port 2222 or 2223 did not hide it). Never expose MySQL to the internet. |
| **Patch web-facing systems** | Prioritise the exploited CVEs in [Indicators & Detection](./indicators.md), starting with Log4Shell, React2Shell, PHP-CGI and Apache path traversal. |

::: tip How to read this report
- An **event** is one network record from the intrusion detection system: a connection, an HTTP request, an SSH session and so on. An **alert** is an event that matched a detection rule.
- Only traffic from **outside sources** is counted. The decoys also generate internal traffic to look realistic, and that is excluded (see [Data & Method](./data-and-method.md)).
- Decoys are named by what they emulate. Their IP addresses and locations are deliberately not published.
:::
