import type { CertScenario } from "./types";

export const CERTS: readonly CertScenario[] = [
  {
    "t": "A certificate signed by the bank's branch manager, identifying the statement, describing that it was printed from the core banking system, giving the system particulars, and stating that the system was in regular use and operating properly.",
    "ok": true,
    "e": "This satisfies section 63(4). The branch manager occupies a responsible official position in relation to the management of the relevant activities, the record and device are identified, and the conditions are addressed. The exhibit gets in."
  },
  {
    "t": "No certificate. The investigating officer testifies on oath that he personally downloaded the call detail records from the telecom provider's portal and that they are accurate.",
    "ok": false,
    "e": "Oral evidence cannot substitute for the certificate where secondary electronic evidence is tendered. That is the holding of Anvar P.V., restored by Arjun Panditrao after Shafhi Mohammad was overruled. The correct course is to apply to the court to summon the certificate from the telecom provider."
  },
  {
    "t": "The complainant produces the original mobile handset on which the messages were received and steps into the witness box to depose to receiving them.",
    "ok": true,
    "e": "No certificate is needed. Section 63 governs computer output tendered in place of the original. Here the original device is produced and spoken to, so this is primary evidence. Anvar P.V. says so in terms."
  },
  {
    "t": "A certificate signed by a junior clerk in the company, which recites that \"the enclosed printout is true and correct\" and nothing further.",
    "ok": false,
    "e": "Two defects. The signatory must occupy a responsible official position in relation to the operation of the device or the management of the activities, and a junior clerk with no such role does not qualify. And the certificate must identify the record, describe the manner of production and give device particulars — a bare assertion of correctness does none of that."
  },
  {
    "t": "A certificate filed for the first time during the trial, after the prosecution evidence has begun but before it closes, with an explanation for the delay.",
    "ok": true,
    "e": "Arjun Panditrao held that the certificate may be produced at any stage before the trial is concluded, in the exercise of the court's discretion and provided no irreversible prejudice is caused. Late is not fatal; absent is."
  }
];
