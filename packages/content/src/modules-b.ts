import type { Module } from "./types";

/**
 * P3 — Modules B: dpdp, evidence, jurisdiction, interception, terror.
 * Kept in its own file so the owner can edit it without touching modules.ts.
 *
 * Authoring rules: theory stays short (one-line takeaway, a few bullets or a
 * table, one callout). Each drill has exactly three questions, `c` is the
 * zero-based index of the correct option, and the correct option is NOT
 * always the longest or always in the same position.
 */
export const MODULES_B: Module[] = [
  /* ───────────────────────── DPDP ───────────────────────── */
  {
    id: "dpdp",
    tag: "DPDP 2023",
    title: "Data protection under the DPDP Act",
    blurb: "Consent, children, fiduciary duties and penalties up to ₹250 crore.",
    video: "The DPDP Act 2023: obligations, rights and the Board",
    body: `
 <p class="tldr"><b>In one line:</b> consent in, security out. The fiduciary answers for everything, children get extra protection, and penalties reach ₹250 crore.</p>
 <p>The Digital Personal Data Protection Act 2023 covers digital personal data processed in India, and abroad when goods or services are offered to people in India. The DPDP Rules were notified on <b>14 November 2025</b>. Most duties switch on after an 18-month runway (Consent Managers after 12 months), so check the commencement notification for exact dates.</p>
 <h3>Who is who</h3>
 <table>
  <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
  <tbody>
   <tr><td>Data Principal</td><td>The individual the data is about (the parent or guardian, for a child).</td></tr>
   <tr><td>Data Fiduciary</td><td>Decides why and how data is processed. The "controller".</td></tr>
   <tr><td>Data Processor</td><td>Processes data on a fiduciary's behalf.</td></tr>
   <tr><td>Significant Data Fiduciary</td><td>Notified by the Centre. Extra duties: India-based DPO, independent auditor, impact assessments.</td></tr>
   <tr><td>Consent Manager</td><td>Registered with the Board. One dashboard to give, review and withdraw consent.</td></tr>
  </tbody>
 </table>
 <h3>The rules that get tested</h3>
 <ul class="tight">
  <li><b>Consent</b> — free, specific, informed, unconditional and unambiguous, by clear affirmative action, after a notice. Withdrawing must be as easy as giving it (s.6).</li>
  <li><b>Legitimate use</b> — no consent needed for data volunteered for a purpose, State benefits, legal duties, medical emergencies and employment (s.7). Advertising is not on the list.</li>
  <li><b>Children</b> — anyone under 18. Verifiable parental consent, and no tracking, behavioural monitoring or targeted ads aimed at them (s.9), subject to any exemptions in the Rules.</li>
  <li><b>Security and breach</b> — reasonable safeguards (s.8(5)), even when a processor holds the data (s.8(1)). Tell the Board and every affected person about a breach (s.8(6)). Erase data once the purpose ends.</li>
 </ul>
 <h3>Penalties (the Schedule)</h3>
 <table>
  <thead><tr><th>Failure</th><th>Maximum</th></tr></thead>
  <tbody>
   <tr><td>Reasonable security safeguards (s.8(5))</td><td><b>₹250 crore</b></td></tr>
   <tr><td>Notifying a personal data breach (s.8(6))</td><td><b>₹200 crore</b></td></tr>
   <tr><td>Children's obligations (s.9)</td><td><b>₹200 crore</b></td></tr>
   <tr><td>Significant Data Fiduciary duties (s.10)</td><td><b>₹150 crore</b></td></tr>
   <tr><td>Any other provision of the Act or Rules</td><td><b>₹50 crore</b></td></tr>
   <tr><td>A Data Principal's own duties, such as false complaints (s.15)</td><td><b>₹10,000</b></td></tr>
  </tbody>
 </table>
 <p>The Data Protection Board imposes these civil penalties. Appeals go to the Telecom Disputes Settlement and Appellate Tribunal (TDSAT).</p>
 <div class="callout law"><b>Exam traps.</b> A contract with the processor never moves the fiduciary's liability. The top figure, ₹250 crore, is for weak security, not for failing to report. The State exemptions in s.17 are the most contested part of the Act, read against <em>Puttaswamy</em> (2017).</div>`,
    quiz: [
      {
        q: "A fintech app signs up a 17-year-old and shows her personalised loan ads based on her spending. What is the position under the DPDP Act?",
        a: [
          "Fine — she tapped 'I agree' when installing the app, so valid consent exists.",
          "Fine, as long as her parent is informed after the ads begin.",
          "Barred — she is under 18, and ads targeted at children are prohibited.",
          "Fine — lending is a 'legitimate use' that needs no consent.",
        ],
        c: 2,
        e: "A child is anyone under 18. Two problems arise. Processing her data needs verifiable parental consent, which was never obtained. And s.9 separately bars tracking, behavioural monitoring and targeted advertising directed at children, subject only to exemptions in the Rules. 'Legitimate use' under s.7 does not cover advertising.",
      },
      {
        q: "A fiduciary stores data with a processor whose weak configuration causes a breach. The contract puts every security duty on the processor. Who answers to the Board?",
        a: [
          "The processor alone, because the contract hands it every security duty.",
          "Neither — a breach nobody intended attracts no penalty under the Act.",
          "Both equally, as joint fiduciaries sharing the same statutory duty.",
          "The fiduciary — the safeguards duty applies despite any contract.",
        ],
        c: 3,
        e: "Under s.8(1) the fiduciary is responsible for processing done on its behalf by a processor, irrespective of any agreement to the contrary, and s.8(5) puts the safeguards duty on the fiduciary. The contract may give it an indemnity, but it cannot move the statutory liability. Failure to take reasonable safeguards carries up to ₹250 crore.",
      },
      {
        q: "After a breach, a fiduciary tells neither the Board nor the affected users. What is the maximum penalty for that failure to notify?",
        a: [
          "₹200 crore",
          "₹250 crore",
          "₹150 crore",
          "₹50 crore",
        ],
        c: 0,
        e: "Failing to notify the Board and affected principals of a breach (s.8(6)) carries up to ₹200 crore. ₹250 crore is the separate ceiling for failing to take reasonable security safeguards, and ₹150 crore is for Significant Data Fiduciary duties. ₹50 crore is the residual cap. The Board imposes the penalty; appeals lie to TDSAT.",
      },
    ],
  },

  /* ───────────────────────── EVIDENCE ───────────────────────── */
  {
    id: "evidence",
    tag: "§63 BSA",
    title: "Electronic evidence and the certificate",
    blurb: "Why prosecutions collapse: the certificate, the hash, and the Anvar–Shafhi–Arjun line.",
    video: "Section 63 BSA in practice: drafting and attacking the certificate",
    body: `
 <p class="tldr"><b>In one line:</b> a printout, CD or forwarded copy gets in only with a s.63 certificate. The original device, produced by its owner, needs none.</p>
 <p>Section 63 of the Bharatiya Sakshya Adhiniyam 2023 (in force 1 July 2024) replaced section 65B of the Evidence Act 1872. Judgments still say "65B", so learn both numbers.</p>
 <h3>How it works</h3>
 <ul class="tight">
  <li>Computer output (a printout, CD or copy) is treated as a <em>document</em> and is admissible without the original, if the s.63 conditions are met and the certificate is filed.</li>
  <li><b>Conditions</b> — the device was in regular use for lawful activities, was fed information in the ordinary course, was working properly (or any fault did not affect accuracy), and the output comes from that information.</li>
  <li><b>Certificate, s.63(4)</b> — the form in the Schedule. <b>Part A</b> identifies the record, the device and how the output was produced, and states the <b>hash value</b> and the hash algorithm (for example SHA-256). <b>Part B</b> is for an expert.</li>
 </ul>
 <div class="callout fx"><b>Forensics link.</b> The hash is what ties the printout to the seized original. Compute it at acquisition (try the Integrity bench in the Lab) and carry it into Part A.</div>
 <h3>The line of authority</h3>
 <table>
  <thead><tr><th>Case</th><th>Holding</th></tr></thead>
  <tbody>
   <tr><td><em>State (NCT of Delhi) v. Navjot Sandhu</em> (2005) 11 SCC 600</td><td>Allowed electronic records to be proved by other routes (old ss.63 and 65). Overruled by Anvar.</td></tr>
   <tr><td><em>Anvar P.V. v. P.K. Basheer</em> (2014) 10 SCC 473</td><td>Certificate is <b>mandatory</b> for secondary electronic evidence. 65B is a complete code.</td></tr>
   <tr><td><em>Shafhi Mohammad v. State of HP</em> (2018) 2 SCC 801</td><td>Relaxed the certificate where the party does not hold the device. Doubted almost at once.</td></tr>
   <tr><td><em>Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal</em> (2020) 7 SCC 1</td><td>Three judges <b>overruled Shafhi and restored Anvar</b>. A party who cannot get a certificate can ask the court to summon it. It may be produced before the trial ends, at the court's discretion.</td></tr>
  </tbody>
 </table>
 <p>Remember it as <b>Navjot → Anvar → Shafhi → Arjun</b>: loose, strict, loose, strict.</p>
 <div class="callout law"><b>Latest.</b> In <em>Pune Bar Association v. Union of India</em> (Supreme Court, 22 May 2026) a three-judge bench upheld s.63(4), including the hash-value requirement, calling a hash "an electronic fingerprint". On who may sign Part B it said a cyber-forensics expert could qualify on unimpeachable material, but left the point open.</div>
 <div class="callout"><b>The exception everyone misses.</b> If the owner brings the original phone to court and testifies, that is primary evidence. No certificate is needed. The certificate exists only for secondary output.</div>`,
    quiz: [
      {
        q: "A defence lawyer cites Shafhi Mohammad (2018) to argue that a party who does not hold the device need not file a certificate. Is that good law?",
        a: [
          "Yes — Shafhi is the most recent Supreme Court word on the point, so it governs.",
          "Yes, but only in criminal trials, not civil ones.",
          "No — Anvar overruled Shafhi back in 2014.",
          "No — Arjun Panditrao (2020) overruled Shafhi and restored Anvar.",
        ],
        c: 3,
        e: "Shafhi (2018) relaxed the rule, but a three-judge bench in Arjun Panditrao (2020) overruled it and restored Anvar P.V. The certificate is mandatory for secondary electronic evidence. A party who cannot obtain it may apply to the court to direct the person in control to supply it, and it can be produced before the trial concludes. Anvar (2014) could not have overruled Shafhi, which came four years later.",
      },
      {
        q: "A complainant walks into court holding the phone that received the threatening messages, and testifies that she received them. Does she need a section 63 certificate?",
        a: [
          "Yes — every electronic record needs a section 63 certificate, always.",
          "No — the original device, produced by its owner, is primary evidence.",
          "Yes, unless the accused admits receiving the messages in court.",
          "No, but only after the phone has first been sent for forensic examination.",
        ],
        c: 1,
        e: "Section 63 is aimed at output tendered in place of the original. When the original device is produced and the person in control testifies, the record is primary evidence and the certificate requirement does not arise. Anvar P.V. drew this line and Arjun Panditrao reaffirmed it.",
      },
      {
        q: "How does a BSA section 63(4) certificate differ from the old section 65B certificate?",
        a: [
          "It is no longer needed for CDs, printouts or other secondary copies.",
          "It must be notarised before a Magistrate within thirty days of the FIR.",
          "It must state the hash value of the record; Part B is for an expert.",
          "It must be countersigned by the investigating officer and the public prosecutor.",
        ],
        c: 2,
        e: "The Schedule form asks for the hash value (and the hash function used) in Part A and adds an expert's Part B. The Supreme Court upheld s.63(4) in Pune Bar Association v. Union of India (22 May 2026) and called the hash an electronic fingerprint. Who may sign Part B was left open. There is no notarisation rule and no 30-day deadline.",
      },
    ],
  },

  /* ───────────────────────── JURISDICTION ───────────────────────── */
  {
    id: "jurisdiction",
    tag: "§1(2) · §75 · BNSS 198–199",
    title: "Jurisdiction and extra-territorial reach",
    blurb: "The server is in Ireland, the accused in Manila, the victim in Madurai. Who tries the case?",
    video: "Jurisdiction in cyberspace: section 75 and the tests courts apply",
    body: `
 <p class="tldr"><b>In one line:</b> abroad? Ask whether a computer in India is involved (s.75). Inside India? The act's place or its consequence's place will do (BNSS s.199).</p>
 <h3>Reaching outside India</h3>
 <p>Section 1(2) read with <b>section 75</b> applies the IT Act to an offence or contravention committed outside India by <em>any person, of any nationality</em>, if the act involves a computer, system or network <b>located in India</b>. Claiming reach is easy. Enforcing it needs mutual legal assistance, letters rogatory or platform cooperation.</p>
 <h3>Which court inside India</h3>
 <ul class="tight">
  <li><b>BNSS Chapter XIV (ss.197–209)</b> replaced CrPC ss.177–189.</li>
  <li><b>s.198</b> (old s.178) — if it is uncertain where the offence happened, or it spans areas, any of those areas can try it.</li>
  <li><b>s.199</b> (old s.179) — triable where the act was done <em>or</em> where its consequence ensued. A victim's home court qualifies.</li>
  <li><b>Zero FIR, s.173</b> — lodge it at any police station. It is transferred to the one with jurisdiction.</li>
 </ul>
 <h3>Tests courts borrow</h3>
 <ul class="tight">
  <li><b>Purposeful availment</b> — <em>Banyan Tree Holding v. A. Murali Krishna Reddy</em> (Delhi HC, 2009): a merely accessible website is not enough. The defendant must have targeted forum users and caused injury there.</li>
  <li><b>Effects test</b> — jurisdiction where the harm is felt. Good for defamation and breaches, but it exposes a publisher to every forum.</li>
  <li><b>Location of the computer resource</b> — the statutory s.75 test. Targeting is irrelevant.</li>
 </ul>
 <div class="callout"><b>Evidence abroad.</b> BNSS s.94 (old CrPC s.91) lets a court or police officer require production of documents and devices, but serving a foreign company with no Indian presence is the real obstacle. That usually means a mutual legal assistance request through the Ministry of Home Affairs. India is not a party to the Budapest Convention.</div>`,
    quiz: [
      {
        q: "A person in Manila uses a server in Singapore to deploy ransomware that encrypts a hospital network in Coimbatore. Does the IT Act apply?",
        a: [
          "Yes — s.75 reaches offences abroad that involve a computer in India.",
          "No — both the accused and the server are outside Indian territory.",
          "Only if the accused is an Indian citizen who is later extradited.",
          "Only if Singapore, where the server sits, consents to the prosecution.",
        ],
        c: 0,
        e: "Section 75 applies the Act to offences committed outside India by any person, irrespective of nationality, where the act involves a computer, system or network located in India. The Coimbatore hospital network qualifies. Actually bringing the accused to trial is a separate question of extradition and mutual legal assistance.",
      },
      {
        q: "What did Banyan Tree Holding v. A. Murali Krishna Reddy decide about passive websites?",
        a: [
          "Any website accessible in the forum state gives its courts jurisdiction over the owner.",
          "Jurisdiction lies only where the website's server is located.",
          "Mere access is not enough; the defendant must have targeted the forum.",
          "Only the Supreme Court can decide internet jurisdiction disputes.",
        ],
        c: 2,
        e: "The Delhi High Court borrowed the 'purposeful availment' idea from US law. For a passive website the plaintiff must show the defendant intentionally directed its activity at the forum, and that this caused injury to the plaintiff there. Accessibility alone is not enough.",
      },
      {
        q: "A Tamil Nadu victim is defrauded by an accused operating from Delhi, and the money lands in a Mumbai account. Where can the complaint be lodged and tried?",
        a: [
          "Only in Delhi, where the accused did the act, and nowhere else.",
          "Lodged anywhere (zero FIR); triable in Tamil Nadu, Delhi or Mumbai.",
          "Only in Mumbai, where the money was finally received and held.",
          "Only through the National Cyber Crime Reporting Portal, not a police station.",
        ],
        c: 1,
        e: "BNSS s.199 (old CrPC s.179) allows trial where the act was done or where its consequence ensued, and s.198 covers offences spanning several areas, so all three places are open. Under s.173 the victim can lodge a zero FIR at her local station, which is then transferred to the station with jurisdiction. The portal is a reporting channel, not a jurisdiction rule.",
      },
    ],
  },

  /* ───────────────────────── INTERCEPTION ───────────────────────── */
  {
    id: "interception",
    tag: "§69 · §69A · §69B · §70",
    title: "Interception, blocking and protected systems",
    blurb: "State power over networks, and the proportionality standard it must meet.",
    video: "Sections 69 to 70 and the Puttaswamy proportionality test",
    body: `
 <p class="tldr"><b>In one line:</b> 69 listens, 69A blocks, 69B counts traffic, 70 protects. Each power is lawful only if it passes the Puttaswamy proportionality test.</p>
 <h3>Four powers, often confused</h3>
 <table>
  <thead><tr><th>Section</th><th>What it does</th><th>Non-compliance</th></tr></thead>
  <tbody>
   <tr><td><b>69</b></td><td>Directs interception, monitoring or decryption, including for investigating an offence. Interception Rules 2009.</td><td>Up to 7 years + fine</td></tr>
   <tr><td><b>69A</b></td><td>Directs blocking of <em>public access</em> to information. Blocking Rules 2009.</td><td>Up to 7 years + fine</td></tr>
   <tr><td><b>69B</b></td><td>Authorises monitoring of traffic data for cyber security. Traffic Data Rules 2009.</td><td>Up to 3 years + fine</td></tr>
   <tr><td><b>70</b></td><td>Notifies a <em>protected system</em> (critical information infrastructure). s.70A: NCIIPC. s.70B: CERT-In.</td><td>Unauthorised access: up to 10 years + fine</td></tr>
  </tbody>
 </table>
 <div class="callout law"><b>Shreya Singhal (2015) upheld s.69A.</b> It is limited to the Article 19(2) grounds, orders must carry written reasons so they can be challenged under Article 226, and the Rules build in a committee and a hearing for the originator.</div>
 <h3>The proportionality overlay</h3>
 <ul class="tight">
  <li><b>Puttaswamy (2017)</b> — any intrusion on privacy needs a law, a legitimate aim, proportionate means and procedural safeguards.</li>
  <li><b>Anuradha Bhasin (2020)</b> — internet shutdown orders must be published, reasoned, proportionate, limited in time and subject to periodic review.</li>
 </ul>
 <h3>CERT-In directions, 28 April 2022</h3>
 <ul class="tight">
  <li>Report specified cyber incidents within <b>6 hours</b> of noticing them.</li>
  <li>Keep ICT logs for <b>180 days</b>, within India.</li>
  <li>VPN, cloud and data-centre providers keep subscriber records for <b>5 years</b> after cancellation.</li>
  <li>Synchronise clocks to NIC or NPL time servers.</li>
 </ul>`,
    quiz: [
      {
        q: "Which provision lets the government direct that public access to online information be blocked?",
        a: [
          "Section 69, read with the Interception Rules 2009",
          "Section 69A, read with the Blocking Rules 2009",
          "Section 69B, read with the Traffic Data Rules 2009",
          "Section 70, read with the Protected System Rules 2018",
        ],
        c: 1,
        e: "Section 69 is about interception, monitoring and decryption. Section 69A is the blocking power, exercised under the 2009 Blocking Rules. Section 69B covers traffic data monitoring for cyber security, and section 70 declares protected systems. Shreya Singhal upheld s.69A.",
      },
      {
        q: "What is the CERT-In reporting window for a specified cyber incident under the April 2022 directions?",
        a: [
          "6 hours from noticing the incident",
          "24 hours from noticing the incident",
          "72 hours from noticing the incident",
          "30 days from noticing the incident",
        ],
        c: 0,
        e: "The 28 April 2022 directions require reporting within six hours of noticing the incident. Do not confuse it with the 72 hours familiar from the GDPR. Logs must be kept for 180 days within India.",
      },
      {
        q: "Anuradha Bhasin v. Union of India is authority for which proposition?",
        a: [
          "Internet access is an absolute fundamental right that cannot be limited.",
          "Section 69A is unconstitutional because it lacks safeguards.",
          "Internet shutdowns can never be ordered by any authority, even in an emergency.",
          "Shutdown orders must be published, reasoned, proportionate and reviewed.",
        ],
        c: 3,
        e: "The Court did not declare internet access absolute. It held that speech and trade over the internet are constitutionally protected, so suspension orders are subject to judicial review and must be published, give reasons, satisfy proportionality, cannot be indefinite, and must be reviewed periodically. It did not touch s.69A.",
      },
    ],
  },

  /* ───────────────────────── TERROR ───────────────────────── */
  {
    id: "terror",
    tag: "§66F · §65 · BNS 113",
    title: "Cyber terrorism and source code offences",
    blurb: "The gravest offence in the Act, and the narrow provision students always overstate.",
    video: "Section 66F: threshold, intention and why it is rarely charged",
    body: `
 <p class="tldr"><b>In one line:</b> 66F turns on <em>intent</em>, not on how bad the damage is. Section 65 protects only source code that the law requires you to keep.</p>
 <h3>Section 66F — cyber terrorism</h3>
 <p>The only provision in the IT Act punishable with <b>imprisonment for life</b>. It is cognizable and non-bailable. Two limbs:</p>
 <ul class="tight">
  <li><b>(1)(A)</b> — intent to threaten the unity, integrity, security or sovereignty of India, or to strike terror, plus conduct (denying access, unauthorised access, or a contaminant) that causes or is likely to cause death, injury, damage, disruption of essential supplies or services, or harm to critical information infrastructure.</li>
  <li><b>(1)(B)</b> — unauthorised access to restricted information, with reason to believe it may be used to harm India's sovereignty, security, public order or foreign relations.</li>
 </ul>
 <div class="callout law"><b>Intent is the threshold.</b> A money-motivated ransomware gang that halts a logistics firm is not committing cyber terrorism, however serious the outage. Charge ss.66 and 43 (and s.70 if a protected system is hit). Loose 66F charges are a known criticism, and they matter because 66F is non-bailable.</div>
 <p><b>BNS overlap.</b> BNS s.113 (terrorist act) uses the words "any other means of whatever nature", so cyber-enabled attacks with terror intent can also be argued under it, and under the UAPA. An officer of SP rank or above decides whether to register under BNS 113 or the UAPA.</p>
 <h3>Section 65 — tampering with source documents</h3>
 <p>Knowingly concealing, destroying or altering computer source code <b>that the law requires to be kept or maintained</b>. Punishment: up to 3 years, or a fine up to ₹2 lakh, or both.</p>
 <div class="callout"><b>The qualifier is the whole point.</b> Section 65 is not a general source-code-theft offence. If no law requires the code to be kept, use ss.66 with 43, the Copyright Act ss.63 and 63B, or breach of confidence.</div>`,
    quiz: [
      {
        q: "A criminal group encrypts a private logistics company's servers and demands ransom. Deliveries stop for four days. Is section 66F made out?",
        a: [
          "Yes — deliveries stopped for four days, so essential supplies were disrupted.",
          "Yes — every ransomware attack is cyber terrorism by definition.",
          "No — a ransom motive is not terror intent; charge s.66 with s.43.",
          "Only if the company turns out to be foreign-owned.",
        ],
        c: 2,
        e: "Section 66F needs a specific mental element: intent to threaten the unity, integrity, security or sovereignty of India, or to strike terror. Financial motive is inconsistent with that. The outage is serious, but the right charges are s.66 read with s.43 (and s.70 if the system was a notified protected system).",
      },
      {
        q: "A developer leaving a private startup deletes its proprietary source code out of spite. No law requires the company to maintain that code. Is section 65 available?",
        a: [
          "Yes — s.65 covers every kind of source code theft or destruction.",
          "No — s.65 covers only code the law requires to be kept or maintained.",
          "Yes, provided the deleted code was commercially valuable to the firm concerned.",
          "No — deleting code is not 'altering' it, so s.65 cannot apply.",
        ],
        c: 1,
        e: "Section 65 covers source code 'required to be kept or maintained by law for the time being in force'. Without that requirement it fails. Deletion is not the problem, since the section expressly covers destroying code. Use s.66 with s.43, s.63 of the Copyright Act, and the confidentiality covenant instead.",
      },
      {
        q: "Attackers wipe a State power utility's control systems intending to terrorise the public. The blackout causes deaths. Which charge fits best?",
        a: [
          "Section 66F(1)(A): terror intent plus disruption of essential services.",
          "Section 43 only, because it is the only section dealing with damage to systems.",
          "Section 65, tampering with source documents kept as required by law.",
          "Section 66 only, since the attackers' intent does not matter at all.",
        ],
        c: 0,
        e: "Terror intent, unauthorised conduct and disruption of services essential to the community (and likely harm to critical infrastructure) satisfy s.66F(1)(A), which carries life imprisonment and is non-bailable. BNS s.113 and the UAPA may be invoked as well. Section 43 is only the civil route, s.65 concerns legally mandated source code, and s.66 misses the terror element.",
      },
    ],
  },
];
