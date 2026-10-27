---
home: true
title: Home
heroImage: /logo.svg
heroImageDark: /logo-dark.svg
heroAlt: Cequra
heroHeight: 64
heroText: Threat Reports
tagline: Evidence from decoy ships, ports and industrial systems — what attackers really do, and how to stop them.
actions:
  - text: Read the reports
    link: '#latest-reports'
    type: primary
  - text: Open CequraIQ
    link: https://dashboard.cequraiq.io/login
    type: secondary
features:
  - title: Decoys built for critical infrastructure
    details: >-
      CequraIQ runs realistic decoys of maritime and industrial systems: satellite terminals, vessel networks,
      port gateways, terminal operating systems, crane controllers and SCADA servers. No legitimate user ever
      connects to them, so every connection is an attacker or a scanner.
  - title: Every packet inspected
    details: >-
      All traffic passes through the Suricata intrusion detection system with the Emerging Threats rule set.
      Alerts are enriched with location, network owner, CVE, the CISA Known Exploited Vulnerabilities list
      and MITRE ATT&CK.
  - title: Findings you can act on
    details: >-
      Each report explains one campaign or one sector in plain language, shows the evidence, and ends with
      the indicators to block, the detection rules to enable and the systems to patch.
footer: Cequra Threat Research · Data from the CequraIQ honeypot network (Suricata IDS)
---

## The last six months at a glance

<div class="key-numbers">
  <div><strong>112,714</strong><span>attacking IP addresses</span></div>
  <div><strong>1.22 M</strong><span>intrusion alerts</span></div>
  <div><strong>11.3 M</strong><span>network events</span></div>
  <div><strong>56</strong><span>known-exploited CVEs targeted</span></div>
  <div><strong>13</strong><span>industrial and maritime decoys</span></div>
</div>

<p class="figure-caption figure-caption--left">11 April – 11 October 2026. Traffic from outside sources only; the decoys' own simulated activity is excluded. "Known-exploited" means listed in the CISA Known Exploited Vulnerabilities catalog.</p>

## Latest reports

<ReportCards />
