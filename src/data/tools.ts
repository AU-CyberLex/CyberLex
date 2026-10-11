export const TOOLS = [
  {
    "n": "FTK Imager",
    "c": "Acquisition",
    "d": "Creates a forensic image — a bit-for-bit copy of a storage device including unallocated space and slack — and computes hashes of the source and the image. Produces raw (dd) or expert witness (E01) formats.",
    "p": "That the image tendered is identical to the media as it existed at acquisition.",
    "l": "It proves nothing about how the device was obtained, who handled it before imaging, or whether a hardware write blocker was in line. Ask for the acquisition log and the write blocker model."
  },
  {
    "n": "Autopsy / The Sleuth Kit",
    "c": "Analysis",
    "d": "Open-source examination platform. Parses filesystems, recovers deleted files by carving, builds timelines from MAC times, extracts web history, and indexes keywords.",
    "p": "That specified artefacts exist on the image and when the filesystem recorded them.",
    "l": "A timeline is only as honest as the system clock and the timezone setting. Carved files often have no metadata and no reliable timestamp at all. Attribution to a human user is an inference, never a finding."
  },
  {
    "n": "EnCase / X-Ways",
    "c": "Analysis",
    "d": "Commercial examination suites used widely by police forces. Similar function to Autopsy, with validated tooling and court-accepted reporting formats.",
    "p": "Same evidential ground as Autopsy, with the added weight of tool validation records.",
    "l": "Commercial licensing does not equal correctness. Ask whether the examiner verified any critical finding with a second, independent tool — dual-tool verification is standard practice and its absence is a fair criticism."
  },
  {
    "n": "Cellebrite UFED / Magnet AXIOM",
    "c": "Mobile",
    "d": "Mobile extraction. Logical extraction pulls what the phone's own interface exposes. File system extraction goes deeper. Physical extraction reads the raw flash including deleted regions, and is often unavailable on modern encrypted handsets.",
    "p": "The contents of messages, call logs, location history and application data as stored on the handset.",
    "l": "Establish which extraction type was used, because a logical extraction cannot support a claim about deleted content. Cloud-synced data pulled with the account credentials raises a separate authorisation question. Deleted-message recovery on a current encrypted device is frequently overstated."
  },
  {
    "n": "Volatility",
    "c": "Memory",
    "d": "Analyses a captured RAM image. Recovers running processes, open network connections, injected code, clipboard contents and, importantly, encryption keys held only in memory.",
    "p": "The live state of the machine at the instant of capture.",
    "l": "Requires that memory was captured before shutdown. If the first responder pulled the plug, this evidence no longer exists — which is why order of volatility is a legal question, not merely a technical one."
  },
  {
    "n": "Wireshark / tcpdump",
    "c": "Network",
    "d": "Captures and dissects network traffic into a pcap file. Shows source and destination addresses, ports, protocols and, where traffic is unencrypted, payload content.",
    "p": "That traffic of a given shape passed between two addresses at a given time.",
    "l": "An IP address identifies an interface, not a person. Carrier-grade NAT, shared connections, VPNs and compromised devices all break the inference from address to individual. Most traffic today is encrypted, so payload is usually unavailable and only metadata remains."
  },
  {
    "n": "Hardware write blocker",
    "c": "Acquisition",
    "d": "A physical device placed between the evidence drive and the examination machine that permits read commands and refuses write commands.",
    "p": "That the examination process could not have altered the source media.",
    "l": "It must actually have been used. Its absence is the single most damaging admission an examiner can make, because mounting a drive on a running operating system updates access times and can write to the volume."
  },
  {
    "n": "C-DAC CyberCheck / TrueBack",
    "c": "Indian toolchain",
    "d": "Developed by the Resource Centre for Cyber Forensics at C-DAC Thiruvananthapuram. TrueBack handles acquisition, CyberCheck handles analysis. Used by several Indian state police forces and accepted in Indian courts.",
    "p": "The same evidential ground as the international suites, with reports formatted for Indian practice.",
    "l": "The examiner's competence and the documented procedure matter more than the brand of the tool. Ask about training, certification and whether the laboratory follows a documented standard operating procedure."
  }
] as const;

export type TOOL = (typeof TOOLS)[number];
