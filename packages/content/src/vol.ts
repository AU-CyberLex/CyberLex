import type { VolSource } from "./types";

export const VOL: readonly VolSource[] = [
  {
    "t": "CPU registers and cache",
    "e": "Gone in nanoseconds. Practically uncollectable, but it heads the list in RFC 3227."
  },
  {
    "t": "Routing table, ARP cache, process table, kernel statistics",
    "e": "Live system state. Lost the instant the machine is powered down."
  },
  {
    "t": "Contents of RAM, including encryption keys",
    "e": "The most valuable volatile source in practice. Capture before shutdown or lose it entirely."
  },
  {
    "t": "Temporary file systems and swap",
    "e": "Often cleared on reboot. May contain fragments of documents never saved to disk."
  },
  {
    "t": "Data on the hard disk",
    "e": "Durable. This is what the forensic image captures."
  },
  {
    "t": "Remote logging and monitoring data held elsewhere",
    "e": "Held on another system, subject to that system's retention policy."
  },
  {
    "t": "Physical configuration and network topology",
    "e": "Stable, documented by photographs and notes."
  },
  {
    "t": "Archival media and backups",
    "e": "The most durable source, and often the one everybody forgets to ask for."
  }
];
