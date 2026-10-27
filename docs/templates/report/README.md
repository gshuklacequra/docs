---
title: Summary
# Home page card. Keep every field; the card layout depends on them.
report:
  title: '{{TITLE}}'
  summary: >-
    One or two sentences: what happened and why a reader should care.
  published: '{{DATE}}'
  period: Mon YYYY – Mon YYYY
  tags: [Tag one, Tag two]
  stats:
    - ['0', Suricata alerts]
    - ['0', source IPs]
    - ['0', honeypots]
---

# {{TITLE}}

<p class="report-byline">Cequra Threat Research · Published {{DATE_LONG}} · Data: D Mon YYYY – D Mon YYYY</p>

<!-- 4–5 headline numbers. Keep labels short (2–3 words). -->
<div class="key-numbers">
  <div><strong>0</strong><span>Suricata alerts</span></div>
  <div><strong>0</strong><span>attacking IPs</span></div>
  <div><strong>0</strong><span>attack visits</span></div>
  <div><strong>0</strong><span>honeypots hit</span></div>
</div>

## In one paragraph

<!-- The whole story in 4–5 sentences: who/what, how many, what it does, what happens if it works. No jargon a non-specialist couldn't follow. -->

## Key findings

<!-- 3–5 numbered findings. Each starts with a bold one-line claim, then one or two sentences with the number that proves it. -->

1. **Finding.** Evidence with a number.
2. **Finding.** Evidence with a number.
3. **Finding.** Evidence with a number.

## What to do

| | Action |
|---|---|
| **Patch** | Products and fixed versions |
| **Detect** | Rules / signals, linking to [Indicators & Detection](./indicators.md) |
| **Block** | User agents, URL patterns, ports |

::: tip How to read this report
- An **alert** is one Suricata rule firing on one request.
- A **visit** is everything one IP did to one honeypot without a 30-minute pause.
- Define any other term the report relies on here.
- Honeypots are named by persona, numbered when a persona is reused. Their IP addresses are deliberately not published.
:::
