---
title: Data & Method
---

# Data & Method

## Where the data comes from

The data comes from the **CequraIQ honeypot network**. Each decoy runs behind the **Suricata** intrusion detection system with the Emerging Threats (ET) rule set. For each decoy we used six months of records, from 11 April to 11 October 2026, aggregated per decoy: totals, signatures, ports, CVEs, countries and a per-source-IP breakdown.

| | |
|---|---|
| Period | 11 Apr – 11 Oct 2026 |
| Maritime decoys | 8 |
| Network events from outside sources | 11,267,561 |
| Intrusion alerts from outside sources | 1,191,874 |
| Source IP addresses | 112,264 |
| Distinct CVEs in alerts | 79 (54 on the CISA KEV list) |

## The decoys

| Decoy | What it emulates | First alert | Source IPs | Events | Alerts |
|---|---|---|---:|---:|---:|
| VSAT satellite terminal | A ship's satellite-communications terminal: web UI, SSH, Telnet, NMEA, SNMP | 17 Apr | 79,846 | 8,295,013 | 632,410 |
| MariNet vessel network | An onboard vessel network: SSH, MySQL, Modbus, IEC-104, NMEA, web | 19 May | 29,599 | 954,444 | 89,247 |
| AIS vessel database | A vessel-tracking (AIS) API and web interface backed by MySQL | 11 Apr | 7,217 | 849,918 | 285,667 |
| Port authority gateway | A port community system: web portal and API, FTP, SSH, Modbus, SNMP, OPC UA | 1 May | 8,886 | 626,717 | 125,488 |
| Terminal operating system | A container terminal's operating system (TOS): web application and API, SSH | 1 May | 2,182 | 471,188 | 31,026 |
| STS crane controller | A ship-to-shore crane PLC: Modbus/TCP, web HMI | 13 Apr | 1,201 | 27,321 | 10,633 |
| Crane safety controller | A crane safety PLC: Modbus/TCP, web HMI | 12 Apr | 1,360 | 29,424 | 11,991 |
| Crane PLC | A crane PLC: Modbus/TCP | 24 Jul | 645 | 13,536 | 5,412 |

*First alert* is the first day with an intrusion alert inside the period. Decoys that show 11–17 April were most likely already online before the period started.

::: warning Why decoy addresses and locations are not listed
Publishing a sensor's address or location lets attackers recognise it and avoid it. Decoys are therefore named only by what they emulate.
:::

## Counting only real attackers

Decoys simulate normal activity so that they look alive, and that activity also shows up in the IDS records. Counted naively, the eight decoys recorded **102 million** events, almost ten times the real external traffic.

- **Crane controllers** poll their own simulated PLC over Modbus constantly: 21–27 million events each, of which fewer than 0.2% came from outside.
- **The terminal operating system and port gateway** run simulated users and API calls, and only 5–10% of their events came from outside.
- **Public DNS resolvers** (for example 1.1.1.1) appear as "sources" when they answer the decoy's own lookups.

So every number in this report comes from the per-source-IP breakdown, **counting only public internet addresses and excluding public DNS resolvers**. Event counts drop from 102 million to 11.3 million. Alert counts drop only by about 10% (from 1.33 to 1.19 million), because internal traffic rarely triggers rules.

## How alerts were grouped

Suricata alerts carry a signature name, such as `ET SCAN Suspicious inbound to mySQL port 3306`. We grouped all 899 signatures seen into six plain-language types:

| Type | What it means | Example signatures |
|---|---|---|
| Known-bad source | The sender is on a public blocklist, whatever it sent | `ET DROP Spamhaus DROP Listed`, `ET DROP Dshield Block Listed`, `ET CINS Poor Reputation` |
| Scanning / discovery | Probing which services are running | `ET SCAN Suspicious inbound to mySQL port 3306`, `ET SCAN Zmap User-Agent` |
| Brute force / login | Guessing passwords or logging in | `ET INFO SSH-2.0-Go version string`, `ET SCAN Multiple MySQL Login Failures` |
| Web exploit attempt | Trying a known web vulnerability or hunting for secrets | Log4j, React2Shell, PHP-CGI, `Request to Hidden Environment File` |
| Industrial protocol | Speaking an industrial control protocol | `ET SCADA IEC-104 Station Interrogation` |
| Protocol anomaly | Traffic that breaks protocol rules, typical of scanners | `SURICATA TLS invalid record type` |

## Limits

- **Aggregated data.** We worked from per-decoy summaries, not raw packets, so we can't follow individual sessions or see request bodies.
- **Location and network data are approximate.** Country and network owner come from IP registry data (Team Cymru IP-to-ASN), which shows where an address is registered, not who operates it.
- **Threat-intelligence matches are leads, not attribution.** Matching an IP against malware or threat-actor feeds is unreliable for cloud and hosting addresses, which change hands often. We report only exact IP matches to malware families.
- **No automatic MITRE mapping.** Automatic rule-to-MITRE mappings labelled blocklist hits as "Impair Defenses" and "Network Denial of Service", which is misleading. The mapping in [Indicators & Detection](./indicators.md) is based on observed behaviour.
