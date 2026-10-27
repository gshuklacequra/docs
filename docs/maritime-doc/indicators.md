---
title: Indicators & Detection
---

# Indicators & Detection

## Exposure checklist for maritime operators

| Service | Port | Seen on our decoys | Recommendation |
|---|---|---|---|
| Modbus/TCP | 502 | 30,778 alerts | Never internet-facing; allow-list engineering stations only |
| IEC-104 | 2404 | Full sessions and general interrogation | Never internet-facing; VPN with mutual authentication |
| SSH | 22, 2222, 2223 | 170,000+ alerts; Go-based brute forcing | Keys only, no passwords; restrict source addresses |
| MySQL | 3306 | 124,683 probes, 8,146 brute-force bursts | Never internet-facing |
| Web interfaces | 80, 443, 5000, 8000, 8080 | Log4Shell, React2Shell, `.env` hunting, Redtail | Patch; put admin interfaces behind a VPN; return no secrets from the web root |

## Suricata signatures

The most useful Emerging Threats signatures seen on the maritime decoys:

| Signature | Alerts | Why it matters |
|---|---:|---|
| ET DROP Spamhaus DROP Listed Traffic Inbound (all groups) | 471,964 | Sender on Spamhaus DROP; safe to block |
| ET SCAN Suspicious inbound to mySQL port 3306 | 124,683 | Database discovery |
| ET CINS Active Threat Intelligence Poor Reputation IP (all groups) | 97,438 | Sender on CINS list |
| ET INFO SSH-2.0-Go version string Observed in Network Traffic | 68,479 | Go-based SSH brute-force tooling |
| ET DROP Dshield Block Listed Source group 1 | 65,581 | Sender on DShield list |
| ET INFO Request to Hidden Environment File - Inbound | 34,570 | Hunting for secrets in `.env` files |
| ET SCAN MS Terminal Server Traffic on Non-standard Port | 31,394 | RDP probing, including on Modbus ports |
| ET HUNTING Possible Apache log4j RCE Attempt (CVE-2021-44228) | 10,867 | Log4Shell (plus 2,980+ exact-match ET EXPLOIT alerts) |
| ET SCAN Multiple MySQL Login Failures Possible Brute Force Attempt | 8,146 | MySQL password guessing |
| ET SCAN Zmap User-Agent (Inbound) | 4,842 | Internet-wide scanner |
| ET WEB_SPECIFIC_APPS React Server Components React2Shell (CVE-2025-55182) | 3,364 | 2025 remote code execution |
| ET SCADA IEC-104 Station Interrogation - Global ASDU Broadcast | 180 | Reading every value from an IEC-104 station |

## Vulnerabilities

Attackers tried **79 different CVEs**; **54** are on the [CISA Known Exploited Vulnerabilities](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) list. The most attempted:

| CVE | Product | Attempts | CISA KEV | Decoys |
|---|---|---:|:---:|---|
| [CVE-2021-44228](https://nvd.nist.gov/vuln/detail/CVE-2021-44228) | Apache Log4j (Log4Shell) | 28,983 | ✔ | Port gateway, STS crane controller |
| [CVE-2025-55182](https://nvd.nist.gov/vuln/detail/CVE-2025-55182) | React Server Components (React2Shell) | 3,364 | ✔ | 5 decoys |
| [CVE-2025-30208](https://nvd.nist.gov/vuln/detail/CVE-2025-30208) | Vite dev server (file read) | 2,134 | | 5 decoys |
| [CVE-2024-4577](https://nvd.nist.gov/vuln/detail/CVE-2024-4577) | PHP-CGI | 1,166 | ✔ | Satellite terminal, port gateway |
| [CVE-2021-41773](https://nvd.nist.gov/vuln/detail/CVE-2021-41773) | Apache HTTP Server path traversal | 782 | ✔ | 3 decoys |
| [CVE-2021-42013](https://nvd.nist.gov/vuln/detail/CVE-2021-42013) | Apache HTTP Server path traversal | 682 | ✔ | 3 decoys |
| [CVE-2020-14882](https://nvd.nist.gov/vuln/detail/CVE-2020-14882) | Oracle WebLogic Server | 423 | ✔ | Port gateway |
| [CVE-2021-36260](https://nvd.nist.gov/vuln/detail/CVE-2021-36260) | Hikvision cameras | 209 | ✔ | 3 decoys |
| [CVE-2022-22963](https://nvd.nist.gov/vuln/detail/CVE-2022-22963) | Spring Cloud Function | 168 | ✔ | Port gateway |
| [CVE-2020-3452](https://nvd.nist.gov/vuln/detail/CVE-2020-3452) | Cisco ASA / FTD | 144 | ✔ | 2 decoys |
| [CVE-2018-10561](https://nvd.nist.gov/vuln/detail/CVE-2018-10561) | Dasan GPON routers | 123 | ✔ | 2 decoys |

## MITRE ATT&CK

Analyst mapping based on the behaviour observed:

| Tactic | Technique | Seen as |
|---|---|---|
| Reconnaissance | [T1595](https://attack.mitre.org/techniques/T1595/) Active Scanning | Internet-wide scanning, RDP and MySQL probing |
| Discovery | [T1046](https://attack.mitre.org/techniques/T1046/) Network Service Discovery | Probing for Modbus, IEC-104, MySQL, SSH |
| Credential Access | [T1110](https://attack.mitre.org/techniques/T1110/) Brute Force | SSH and MySQL password guessing |
| Credential Access | [T1552.001](https://attack.mitre.org/techniques/T1552/001/) Credentials in Files | Requests for `.env` files |
| Initial Access | [T1190](https://attack.mitre.org/techniques/T1190/) Exploit Public-Facing Application | Log4Shell, React2Shell, PHP-CGI and others |
| Collection (ICS) | [T0801](https://attack.mitre.org/techniques/ics/T0801/) Monitor Process State | IEC-104 general interrogation |

## Source IPs

The 4,719 most active sources (at least 1,000 events, or three or more decoys reached), with country, network, events, alerts and the decoys they reached:

<a :href="$withBase('/downloads/maritime-doc-source-ips.csv')" download>⬇ Download maritime-doc-source-ips.csv</a>

::: warning Use IP lists carefully
The list includes internet survey services (Censys, ONYPHE, Driftnet) and large cloud providers whose addresses are reassigned. Use it to enrich alerts and for short-lived blocks, not as a permanent blocklist. The public blocklists below are maintained and safer for blocking.
:::

## References

1. CISA, Known Exploited Vulnerabilities Catalog: <https://www.cisa.gov/known-exploited-vulnerabilities-catalog>
2. Spamhaus DROP list: <https://www.spamhaus.org/drop/>
3. DShield (SANS Internet Storm Center): <https://www.dshield.org/>
4. CINS Army list: <https://cinsscore.com/>
5. Emerging Threats Open rule set: <https://rules.emergingthreats.net/>
6. MITRE ATT&CK for Enterprise and ICS: <https://attack.mitre.org/>
7. Team Cymru IP-to-ASN mapping: <https://www.team-cymru.com/ip-asn-mapping>
