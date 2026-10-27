---
title: Indicators & Detection
---

# Indicators & Detection

## Network indicators

| Type | Indicator | Notes |
|---|---|---|
| User agent | `libredtail-http` | On every one of the 18,021 alerts. Easy for the operator to change, but currently very reliable. |
| URL pattern | `/cgi-bin/` … `/bin/sh` with `.%2e` or `%%32%65` | Apache path traversal (requests 1 – 2) |
| URL pattern | `allow_url_include` + `auto_prepend_file=php://input` with `%AD`, `%25AD` or `-d` | PHP-CGI argument injection (requests 3 – 4, and the Kit B variants) |
| URL pattern | `s=/index/\think\app/invokefunction` … `vars[0]=md5&vars[1][]=Hello` | ThinkPHP vulnerability check (requests 5 – 6) |

## Suricata signatures

These Emerging Threats Open rules fired on Redtail traffic. Alert counts are after duplicate removal.

| SID | Signature | Alerts | CVE in rule |
|---|---|---:|---|
| 2011465 | ET WEB_SERVER /bin/sh In URI Possible Shell Command Execution Attempt | 1,808 | — |
| 2031124 | ET HUNTING Suspicious PHP Code in HTTP POST (Inbound) | 1,615 | — |
| 2053461 | ET WEB_SERVER Possible SQL Injection (exec) in HTTP Request Body | 1,615 | — |
| 2011768 | ET WEB_SERVER PHP tags in HTTP POST | 1,614 | — |
| 2016977 | ET WEB_SERVER allow_url_include PHP config option in uri | 1,614 | — |
| 2016982 | ET WEB_SERVER auto_prepend_file PHP config option in uri | 1,614 | — |
| 2019957 | ET WEB_SERVER Generic PHP Remote File Include | 1,516 | — |
| 2019804 | ET WEB_SERVER PHP.//Input in HTTP POST | 1,515 | — |
| 2060800 | ET WEB_SPECIFIC_APPS PHP-CGI OS Command Injection (soft hyphen) | 1,297 | CVE-2024-4577 |
| 2026731 | ET WEB_SERVER ThinkPHP RCE Exploitation Attempt | 1,204 | — |
| 2034125 | ET EXPLOIT Apache HTTP Server 2.4.49 - Path Traversal Attempt M2 | 1,101 | CVE-2021-41773 |
| 2034173 | ET EXPLOIT Apache HTTP Server - Path Traversal Attempt M2 | 689 | CVE-2021-42013 |
| 2016683 | ET WEB_SERVER WebShell Generic - wget http - POST | 347 | — |
| 2029011 | ET HUNTING Generic IOT Downloader Malware in POST (Inbound) | 270 | — |
| 2013001 | ET WEB_SERVER PHP Possible php Remote File Inclusion Attempt | 202 | CVE-2002-0953 |

::: tip Most useful rules
2034125 / 2034173 (Apache), 2060800 (PHP-CGI) and 2026731 (ThinkPHP) name the exact exploit. 2016683 and 2029011 flag the **downloader** payload, which is the step that installs the miner.
:::

## Vulnerabilities

| CVE | Product | Fixed in |
|---|---|---|
| [CVE-2021-41773](https://nvd.nist.gov/vuln/detail/CVE-2021-41773) | Apache HTTP Server 2.4.49 | 2.4.51 |
| [CVE-2021-42013](https://nvd.nist.gov/vuln/detail/CVE-2021-42013) | Apache HTTP Server 2.4.49 – 2.4.50 | 2.4.51 |
| [CVE-2024-4577](https://nvd.nist.gov/vuln/detail/CVE-2024-4577) | PHP-CGI on Windows | 8.1.29, 8.2.20, 8.3.8 |
| [CVE-2018-20062](https://nvd.nist.gov/vuln/detail/CVE-2018-20062) | ThinkPHP 5.x (analyst mapping; the rule carries no CVE) | 5.0.23, 5.1.31 |

## MITRE ATT&CK

| Tactic | Technique | Seen as |
|---|---|---|
| Initial Access | [T1190](https://attack.mitre.org/techniques/T1190/) Exploit Public-Facing Application | All three exploits |
| Execution | [T1059.004](https://attack.mitre.org/techniques/T1059/004/) Unix Shell | Apache traversal to `/bin/sh` |
| Execution | [T1059](https://attack.mitre.org/techniques/T1059/) Command and Scripting Interpreter | PHP code run via `php://input` |
| Discovery | [T1083](https://attack.mitre.org/techniques/T1083/) File and Directory Discovery | Rule metadata on the `/bin/sh` traversal |
| Reconnaissance | [T1595.002](https://attack.mitre.org/techniques/T1595/002/) Vulnerability Scanning | ThinkPHP `md5("Hello")` check |
| Command and Control | [T1105](https://attack.mitre.org/techniques/T1105/) Ingress Tool Transfer | wget / downloader body on request 1 (analyst mapping) |

## Source IPs

All 762 source IPs, with country, network, visits, honeypots, first and last seen, and the playbook each used:

<a :href="$withBase('/downloads/redtail-doc-source-ips.csv')" download>⬇ Download redtail-doc-source-ips.csv</a>

::: warning Use IP lists carefully
77% of these IPs were seen in only one visit, and many belong to hosting providers whose addresses get reassigned. Use the list to enrich alerts, or as a short-lived blocklist, rather than as a permanent block.
:::

## Recommendations

1. **Patch** the four vulnerabilities above. They are 2 – 8 years old and still being exploited daily.
2. **Enable the ET rules listed above** on internet-facing web servers, and alert on 2016683 / 2029011 in particular.
3. **Block or rate-limit** the user agent `libredtail-http` at the WAF, reverse proxy or IPS.
4. **Watch outbound traffic** from web servers: an infected host will start mining and scanning. Unexpected outbound connections from a web server are a strong sign of compromise.

## References

1. SANS Internet Storm Center, *Danger of Libredtail* (Guest Diary): <https://isc.sans.edu/diary/32936>
2. SANS Internet Storm Center, *IDS Comparisons with DShield Honeypot Data*: <https://isc.sans.edu/diary/30002>
3. NVD entries: [CVE-2021-41773](https://nvd.nist.gov/vuln/detail/CVE-2021-41773), [CVE-2021-42013](https://nvd.nist.gov/vuln/detail/CVE-2021-42013), [CVE-2024-4577](https://nvd.nist.gov/vuln/detail/CVE-2024-4577), [CVE-2018-20062](https://nvd.nist.gov/vuln/detail/CVE-2018-20062)
4. Emerging Threats Open rule set: <https://rules.emergingthreats.net/>
5. MITRE ATT&CK, Enterprise techniques: <https://attack.mitre.org/techniques/enterprise/>
