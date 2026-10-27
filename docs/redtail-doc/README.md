---
title: Summary
# Home page card. Every report folder needs this block in its README.md.
report:
  title: 'Redtail: one script, 762 IPs, 18 honeypots'
  summary: >-
    A cryptomining botnet hit our honeypots with the same exploit script for 14 months.
    We follow it across sensors, show what it sends, and list what to block.
  published: '2026-10-27'
  period: Aug 2025 – Oct 2026
  tags: [Botnet, Cryptominer, Web exploits]
  stats:
    - ['18,021', Suricata alerts]
    - ['762', source IPs]
    - ['18', honeypots]
---

# Redtail: one script, 762 IPs, 18 honeypots

<p class="report-byline">Cequra Threat Research · Published 27 Oct 2026 · Data: 7 Aug 2025 – 18 Oct 2026</p>

<div class="key-numbers">
  <div><strong>18,021</strong><span>Suricata alerts</span></div>
  <div><strong>762</strong><span>attacking IPs</span></div>
  <div><strong>1,122</strong><span>attack visits</span></div>
  <div><strong>18</strong><span>honeypots hit</span></div>
  <div><strong>4</strong><span>vulnerabilities targeted</span></div>
</div>

## In one paragraph

For 14 months our honeypots were hit again and again by the **Redtail cryptomining botnet**, which identifies itself with the HTTP user agent `libredtail-http`. The requests came from 762 different IP addresses, but almost all of them ran **the same short script**: a few HTTP requests that try known bugs in **Apache**, **PHP** and **ThinkPHP**. If any of them works on a real server, that server downloads Redtail and starts mining cryptocurrency for the attacker, and very likely starts scanning the internet as a new sender.

## Key findings

1. **One script, hundreds of senders.** 499 visits from 334 different IPs sent *exactly* the same 6 requests in the same order. We call this **Kit A**. Most of the remaining visits are this kit stopped early.
2. **The bot doesn't listen.** Some honeypots answered the ThinkPHP check with `200 OK`, which suggests "I'm vulnerable". The bot sent nothing extra and moved on. This is blind, automated spraying, not a person at a keyboard.
3. **Same IP, same behaviour, mostly.** 143 IPs attacked two or more of our honeypots. 98 of them ran the same playbook everywhere. The other 45 sent the full kit to our industrial and maritime decoys but **only the first request** to our EV-charging and mail decoys.
4. **The kit gets updated.** On 23 July 2026 a 9-request version (**Kit B**) appeared, adding three more PHP-CGI URL variants. By September it was used in more than half of all visits.
5. **Most senders come and go.** 586 of the 762 IPs (77%) were seen in a single visit. IP blocklists go stale quickly, so the user agent and URL patterns are the more durable things to detect.

## What to do

| | Action |
|---|---|
| **Patch** | Apache HTTP Server 2.4.51 or later · PHP 8.1.29 / 8.2.20 / 8.3.8 or later (PHP-CGI on Windows) · ThinkPHP 5.0.23 / 5.1.31 or later |
| **Detect** | The Emerging Threats Suricata rules listed in [Indicators & Detection](./indicators.md) fire on every stage of the script |
| **Block** | User agent `libredtail-http`, and URLs containing `/cgi-bin/` + `/bin/sh`, `allow_url_include`, or `invokefunction` |

::: tip How to read this report
- An **alert** is one Suricata rule firing on one HTTP request. One request can fire several rules.
- A **visit** is everything one IP did to one honeypot without a 30-minute pause.
- A **playbook** is the set of requests sent in a visit (Kit A, Kit B, Single or Partial; see [Attack Breakdown](./attack-breakdown.md)).
- Honeypots are named by persona, numbered when a persona is reused (for example *Cobham-decoy #1*). Their IP addresses are deliberately not published.
:::
