export const MODULES = [
  {
    "id": "access",
    "tag": "§43 · §66",
    "title": "Unauthorised access and data theft",
    "blurb": "Where the civil wrong ends and the offence begins, and why intention is the whole case.",
    "video": "Unauthorised access: mapping section 43 onto section 66",
    "body": "\n <p>Section 43 lists the acts: accessing a computer without permission, downloading or copying data, introducing a contaminant, damaging or disrupting, denying access, tampering, destroying or diminishing value, and stealing or concealing source code. Commit any of them without the permission of the owner and you are liable to pay compensation. That is all section 43 does. It creates no offence and no imprisonment.</p>\n <p>Section 66 takes the same list and adds a mental element. Do any act referred to in section 43 <em>dishonestly or fraudulently</em> and it becomes an offence punishable with three years or five lakh rupees or both. \"Dishonestly\" and \"fraudulently\" are not defined in the IT Act; they are borrowed from the penal code, now sections 2(7) and 2(9) of the Bharatiya Nyaya Sanhita 2023. Dishonestly means with intention to cause wrongful gain to one person or wrongful loss to another. Fraudulently means with intent to defraud.</p>\n <p>Almost every contested prosecution under section 66 turns on two questions. Was there permission, express or implied? And was the state of mind dishonest rather than merely careless or curious?</p>\n <h3>The permission problem</h3>\n <p>An employee with valid credentials who accesses a folder they were never meant to open has not bypassed any technical control. Indian courts have generally treated the scope of authorisation as a question of fact determined by the employment terms, the access policy and the practice of the workplace, rather than by whether a password was defeated. An access policy that is written down and acknowledged is therefore worth more to a prosecution than any amount of technical logging.</p>\n <h3>Related provisions to charge alongside</h3>\n <ul class=\"tight\">\n   <li><b>Section 65</b> — knowingly concealing, destroying or altering computer source code required to be kept by law. Narrower than it looks: the source code must be one the law requires to be maintained.</li>\n   <li><b>Section 66B</b> — dishonestly receiving or retaining a stolen computer resource or communication device, knowing or having reason to believe it is stolen.</li>\n   <li><b>Section 72A</b> — where the accused obtained the data lawfully under a contract and then disclosed it in breach of that contract with intent to cause wrongful loss or gain. This is often the correct charge against a departing employee, and it is missed constantly.</li>\n   <li><b>Section 316 BNS</b> (criminal breach of trust, formerly section 405 IPC) where the data was entrusted.</li>\n </ul>",
    "quiz": [
      {
        "q": "A systems administrator, annoyed at being passed over for promotion, uses her own valid credentials to read the confidential appraisal file of a colleague. She copies nothing and tells nobody. Which is the soundest charge?",
        "a": [
          "Section 66 — she accessed data she had no permission to access, and her motive was improper",
          "Section 43 only — there is no dishonesty or fraud, so no offence is made out",
          "Section 66C — she used credentials to access personal information",
          "Section 66F — she attacked a protected system"
        ],
        "c": 1,
        "e": "Section 66 needs a dishonest or fraudulent intention, meaning intention to cause wrongful gain or wrongful loss. Spite and curiosity are not enough on these facts: no gain accrued, no loss was caused, nothing was copied or disclosed. The act falls squarely in section 43, which is a civil liability before the adjudicating officer. Section 66C is wrong because the credentials were her own."
      },
      {
        "q": "The same administrator emails the appraisal file to a rival firm that is trying to poach the colleague, in exchange for a referral fee. What changes?",
        "a": [
          "Nothing — she still used valid credentials",
          "Section 66 is now available, and section 72A should be considered alongside it",
          "Only a civil suit for breach of contract lies",
          "Section 67 applies because the material was transmitted electronically"
        ],
        "c": 1,
        "e": "The referral fee supplies wrongful gain to her and the disclosure supplies wrongful loss to the colleague and the employer, so the dishonesty element of section 66 is satisfied. Because she obtained the material lawfully under her contract of service and then disclosed it, section 72A is the more precise charge and carries three years. Section 67 concerns obscene material and has no application."
      },
      {
        "q": "Section 43 proceedings are decided by which forum?",
        "a": [
          "The Magistrate having jurisdiction",
          "The adjudicating officer appointed under section 46, with appeal to the Appellate Tribunal",
          "The District Consumer Commission",
          "The High Court in writ jurisdiction"
        ],
        "c": 1,
        "e": "Section 46 empowers the Central Government to appoint an adjudicating officer, not below the rank of Director to the Government of India or equivalent State officer, to adjudicate contraventions where the claim does not exceed five crore rupees. Claims above that go to the competent civil court. Appeals lie to the Telecom Disputes Settlement and Appellate Tribunal, which now exercises the functions of the Cyber Appellate Tribunal."
      }
    ]
  },
  {
    "id": "identity",
    "tag": "§66C · §66D",
    "title": "Identity theft and cheating by personation",
    "blurb": "The two most charged sections in India, and the distinction examiners test.",
    "video": "Impersonation online: 66C, 66D and the BNS cheating provisions",
    "body": "\n <p>These two sections sit next to each other and are routinely charged together, but they punish different things.</p>\n <p><b>Section 66C</b> punishes whoever <em>fraudulently or dishonestly makes use of</em> the electronic signature, password or any other unique identification feature of any other person. The gravamen is the unauthorised <em>use of an identifier</em>. No victim needs to be deceived; no property needs to change hands. Using a stolen OTP is complete under 66C the moment it is used.</p>\n <p><b>Section 66D</b> punishes whoever <em>by means of any communication device or computer resource cheats by personation</em>. The gravamen is <em>deception of a human being</em>, pretending to be someone you are not, resulting in the cheating. The ingredients of cheating from section 318 BNS (formerly section 415 IPC) are imported: deception, and inducement to deliver property or to do something they would not otherwise have done.</p>\n <table>\n  <thead><tr><th></th><th>Section 66C</th><th>Section 66D</th></tr></thead>\n  <tbody>\n   <tr><td>Core act</td><td>Use of another's unique identifier</td><td>Personation that cheats</td></tr>\n   <tr><td>Victim deceived?</td><td>Not required</td><td>Essential</td></tr>\n   <tr><td>Property obtained?</td><td>Not required</td><td>Usually, or an act induced</td></tr>\n   <tr><td>Typical facts</td><td>Stolen OTP, hijacked password, forged e-signature</td><td>Fake customer-care call, romance fraud, spoofed CEO email</td></tr>\n   <tr><td>Punishment</td><td>3 years and up to ₹1 lakh</td><td>3 years and up to ₹1 lakh</td></tr>\n  </tbody>\n </table>\n <h3>What a \"unique identification feature\" covers</h3>\n <p>The phrase is deliberately open. Passwords and electronic signatures are named. Courts have comfortably read in Aadhaar numbers, PAN, biometric templates, account numbers with credentials, and one-time passwords. A photograph alone is contested: a face is not generally a \"unique identification feature\" in the sense the section uses, which is why misuse of a person's photograph is usually charged under section 66D together with section 356 BNS (defamation) or section 77 BNS (voyeurism) rather than under 66C.</p>\n <div class=\"callout law\"><b>Practice point.</b> First information reports in online fraud cases routinely list sections 66C, 66D IT Act with section 318(4) BNS. Where money moved through a bank, add the offence of criminal breach of trust or forgery of an electronic record under section 336 BNS as the facts support.</div>",
    "quiz": [
      {
        "q": "A caller tells a pensioner he is from her bank's fraud team, persuades her to read out the OTP, and transfers ₹80,000. Which sections are correctly charged?",
        "a": [
          "66C alone — he used her OTP",
          "66D alone — he personated a bank official",
          "66C and 66D both, with cheating under section 318 BNS",
          "65 and 66 — he tampered with the bank system"
        ],
        "c": 2,
        "e": "Both are made out on distinct acts. Personating the fraud team and inducing her to part with the OTP is cheating by personation under 66D. Then actually using her OTP, a unique identification feature, to authorise the transfer is the separate offence under 66C. The underlying cheating under section 318 BNS is charged alongside because the IT Act offences do not displace it on these facts."
      },
      {
        "q": "A student creates a parody account using a politician's name and photograph, clearly labelled \"parody\", and posts satire. No money is involved and nobody is deceived. What is the correct analysis?",
        "a": [
          "Section 66D is made out because a computer resource was used",
          "Section 66C is made out because the photograph is a unique identification feature",
          "Neither 66C nor 66D is made out; any liability would have to be found elsewhere, and political satire attracts Article 19(1)(a) protection",
          "Section 66A applies"
        ],
        "c": 2,
        "e": "66D requires cheating, which requires deception and inducement; a labelled parody deceives nobody. 66C requires fraudulent or dishonest use of a unique identification feature, and a name with a public photograph is neither unique identification in the statutory sense nor used fraudulently here. Section 66A was struck down in Shreya Singhal in 2015 and cannot be charged at all — police stations that still invoke it are acting without jurisdiction."
      },
      {
        "q": "Which is the best single description of what makes 66D different from ordinary cheating under the BNS?",
        "a": [
          "66D requires that loss exceed one lakh rupees",
          "66D requires that the cheating be by personation and be committed by means of a communication device or computer resource",
          "66D does not require dishonest intention",
          "66D is a civil provision"
        ],
        "c": 1,
        "e": "Section 66D is a specific aggravated form of cheating: the deception must take the form of personation, and the medium must be a communication device or computer resource. Both elements must be pleaded. There is no monetary threshold."
      }
    ]
  },
  {
    "id": "obscene",
    "tag": "§67 · §67A · §67B",
    "title": "Obscene and sexually explicit material",
    "blurb": "A graded scheme, an obsolete test replaced, and the one section with no consent defence.",
    "video": "Sections 67, 67A and 67B: the graded scheme and its overlaps",
    "body": "\n <p>The IT Act grades this material in three steps.</p>\n <ul class=\"tight\">\n  <li><b>Section 67</b> — publishing or transmitting <em>obscene</em> material in electronic form. Three years and five lakh on first conviction, five years and ten lakh on a subsequent one.</li>\n  <li><b>Section 67A</b> — material containing <em>sexually explicit act or conduct</em>. Five years and ten lakh, rising to seven years. Non-bailable.</li>\n  <li><b>Section 67B</b> — material depicting <em>children</em> in a sexually explicit act, and also the acts of creating, collecting, browsing, downloading, facilitating, enticing a child into an online relationship for a sexually explicit act, and recording abuse. Five years, rising to seven. A child is defined in the section as a person under eighteen.</li>\n </ul>\n <h3>What \"obscene\" means after Aveek Sarkar</h3>\n <p>Section 67 uses the lascivious / prurient interest / tendency to deprave and corrupt formula taken from the old <em>Hicklin</em> test. In <em>Aveek Sarkar v. State of West Bengal</em> (2014) the Supreme Court discarded Hicklin and adopted the community standards test: obscenity is judged from the standpoint of an average person applying contemporary community standards, taking the work as a whole and in its context. A photograph is not obscene merely because it is nude or suggestive; the question is whether it is designed to arouse sexual passion in the circumstances of its publication.</p>\n <div class=\"callout law\"><b>Section 67B has no consent defence.</b> Consent is irrelevant where the person depicted is under eighteen, and the section reaches collection and browsing, not only publication. It runs alongside the POCSO Act 2012, whose sections 13 to 15 cover use of a child for pornographic purposes and storage of such material. Where both apply, the punishment provisions of POCSO generally prevail as the special and later Act on the subject.</div>\n <h3>Overlap with the penal code</h3>\n <p>In <em>Sharat Babu Digumarti v. Government of NCT of Delhi</em> (2017) the Supreme Court held that where obscene material is published in electronic form, section 67 of the IT Act is a special provision that overrides section 292 IPC by operation of section 81 of the IT Act. The accused could not be prosecuted under the general penal provision once the special one covered the field. The same reasoning applies to the corresponding provision, now section 294 BNS.</p>\n <div class=\"callout fx\"><b>Non-consensual intimate imagery.</b> Section 66E (capturing, publishing or transmitting the image of a private area without consent) is the provision for voyeurism and revenge imagery involving adults, read with section 77 BNS. Rule 3(2)(b) of the Intermediary Guidelines 2021 requires intermediaries to remove such content within twenty-four hours of a complaint.</div>",
    "quiz": [
      {
        "q": "Which test governs whether material is obscene under section 67 today?",
        "a": [
          "The Hicklin test — tendency to deprave the most susceptible reader",
          "The community standards test adopted in Aveek Sarkar, judging the work as a whole in context",
          "Whether any complaint has been received",
          "Whether the material was shared with more than fifty people"
        ],
        "c": 1,
        "e": "Aveek Sarkar v. State of West Bengal (2014) expressly discarded Hicklin, which had been applied in Ranjit Udeshi, in favour of contemporary community standards. The material is assessed as a whole and in the context of its publication, from the standpoint of an average person rather than the most susceptible one."
      },
      {
        "q": "An eighteen-year-old and her partner exchange private intimate images consensually. He later forwards them to a group without her knowledge. Which provision is central?",
        "a": [
          "Section 67B, because the images are sexually explicit",
          "Section 66E and section 67A — she is an adult, so 67B does not apply, and the transmission was without consent",
          "Section 66C, because he used her images",
          "No offence, because the images were created consensually"
        ],
        "c": 1,
        "e": "Section 67B applies only where the person depicted is under eighteen; she is not. The publication of the image of a private area without consent engages section 66E, and where the material depicts a sexually explicit act, section 67A. Her original consent to the creation of the images is not consent to their transmission — that is the entire point of section 66E."
      },
      {
        "q": "Which statement about section 67B is correct?",
        "a": [
          "It punishes publication only",
          "It reaches creating, collecting, browsing and downloading such material, and consent of the child is no defence",
          "It applies to persons under sixteen",
          "It is bailable and compoundable"
        ],
        "c": 1,
        "e": "Section 67B is drafted deliberately widely to cover collection, browsing and downloading, not merely publication, and it covers enticement of a child into an online relationship for a sexually explicit act. A child means a person below eighteen. Consent is irrelevant."
      }
    ]
  },
  {
    "id": "intermediary",
    "tag": "§79 · IT Rules 2021",
    "title": "Intermediary liability and safe harbour",
    "blurb": "When a platform stops being a conduit and becomes a participant.",
    "video": "Safe harbour after Shreya Singhal and the 2021 Rules",
    "body": "\n <p>Section 2(1)(w) defines an intermediary as any person who on behalf of another receives, stores or transmits an electronic record or provides any service with respect to it. Telecom providers, network service providers, web hosts, search engines, online payment sites, auction sites, marketplaces and cyber cafes are named.</p>\n <p>Section 79(1) exempts an intermediary from liability for third-party information it makes available. The exemption is conditional.</p>\n <ul class=\"tight\">\n  <li><b>79(2)(a)</b> — the function is limited to providing access to a communication system; or</li>\n  <li><b>79(2)(b)</b> — the intermediary does not initiate the transmission, select the receiver, or select or modify the information; and</li>\n  <li><b>79(2)(c)</b> — it observes due diligence and any guidelines prescribed by the Central Government.</li>\n </ul>\n <p>Section 79(3) removes the exemption where the intermediary has conspired, abetted, aided or induced the unlawful act, or where it fails to expeditiously remove material on receiving <em>actual knowledge</em>.</p>\n <div class=\"callout law\"><b>Shreya Singhal read down 79(3)(b).</b> \"Actual knowledge\" was held to mean knowledge received through a court order or a notification by the appropriate government or its agency, that the unlawful act relates to the restrictions in Article 19(2). A private complaint from any aggrieved person does not trigger the takedown obligation. The court reasoned that millions of private takedown demands would make the intermediary an arbiter of speech and would chill lawful expression.</div>\n <h3>The Intermediary Guidelines and Digital Media Ethics Code Rules 2021</h3>\n <ul class=\"tight\">\n  <li><b>Rule 3(1)(b)</b> — publish rules, privacy policy and user agreement, and inform users of prohibited categories of content.</li>\n  <li><b>Rule 3(1)(d)</b> — remove or disable access within thirty-six hours of a court order or a government notification.</li>\n  <li><b>Rule 3(2)(a)</b> — a grievance officer must acknowledge a complaint within twenty-four hours and dispose of it within fifteen days.</li>\n  <li><b>Rule 3(2)(b)</b> — content exposing a private area, showing nudity, or depicting a person in an impersonated form including artificially morphed images, must go within twenty-four hours of complaint.</li>\n  <li><b>Rule 4</b> — a significant social media intermediary, meaning one above the notified user threshold of fifty lakh registered users, must appoint a Chief Compliance Officer, a nodal contact person available round the clock, and a Resident Grievance Officer, all resident in India, and publish monthly compliance reports.</li>\n  <li><b>Rule 4(2)</b> — a significant social media intermediary providing messaging must enable identification of the <em>first originator</em> of information, on a judicial order or an order under section 69, only for specified serious offences. This provision is under constitutional challenge as incompatible with end-to-end encryption and with Puttaswamy proportionality.</li>\n </ul>\n <h3>Losing safe harbour by participating</h3>\n <p>In <em>Christian Louboutin SAS v. Nakul Bajaj</em> (Delhi High Court, 2018) the court set out a list of activities — identifying the seller, transporting, promoting, advertising, authenticating, offering guarantees — and held that a marketplace which performs enough of them ceases to be a passive conduit and becomes an active participant, losing the section 79 exemption. Contrast <em>MySpace Inc. v. Super Cassettes</em> (Delhi High Court, Division Bench, 2016), where automated processing for format and advertising was held not to amount to modification of content.</p>",
    "quiz": [
      {
        "q": "A private individual emails a platform demanding removal of a post she says defames her. The platform does nothing. Has it lost safe harbour under section 79(3)(b)?",
        "a": [
          "Yes — it had actual knowledge from the email",
          "No — after Shreya Singhal, actual knowledge means a court order or a government notification",
          "Yes, but only if the post is later found defamatory",
          "Only if the platform is a significant social media intermediary"
        ],
        "c": 1,
        "e": "Shreya Singhal read down section 79(3)(b) precisely so that private demands do not trigger the obligation. Actual knowledge means receipt of a court order, or notification by the appropriate government or its agency, relating to the Article 19(2) restrictions. Note separately that the 2021 Rules impose their own grievance-redressal timelines, but failure to meet those is a rule breach and not automatically a loss of the statutory exemption."
      },
      {
        "q": "An online marketplace photographs the products, warehouses them, guarantees authenticity and handles returns. A luxury brand sues over counterfeits. What is the likely outcome on safe harbour?",
        "a": [
          "Safe harbour holds because the seller is a third party",
          "Applying Christian Louboutin, the accumulation of active functions is likely to take it outside section 79",
          "Safe harbour is automatically lost by any e-commerce platform",
          "The question depends only on whether it has 50 lakh users"
        ],
        "c": 1,
        "e": "The Delhi High Court in Christian Louboutin v. Nakul Bajaj identified a catalogue of activities that, taken together, convert a passive conduit into an active participant. Warehousing, authentication guarantees and returns handling sit squarely in that catalogue. The user threshold is relevant to the additional due diligence under Rule 4, not to the basic availability of section 79."
      },
      {
        "q": "Under the 2021 Rules, within what period must an intermediary acknowledge a user grievance?",
        "a": [
          "24 hours, with disposal in 15 days",
          "36 hours, with disposal in 30 days",
          "72 hours, with disposal in 7 days",
          "There is no prescribed period"
        ],
        "c": 0,
        "e": "Rule 3(2)(a) requires acknowledgement within twenty-four hours and disposal within fifteen days. Keep this distinct from the thirty-six hour window in Rule 3(1)(d) for acting on a court order or government notification, and the separate twenty-four hour window in Rule 3(2)(b) for intimate or morphed imagery."
      }
    ]
  },
  {
    "id": "dpdp",
    "tag": "DPDP 2023",
    "title": "Data protection under the DPDP Act",
    "blurb": "Consent, fiduciary duties, children, breach reporting and penalties up to ₹250 crore.",
    "video": "The DPDP Act 2023: obligations, rights and the Board",
    "body": "\n <p>The Digital Personal Data Protection Act 2023 replaced the thin protection previously offered by section 43A of the IT Act and the 2011 Sensitive Personal Data Rules. It applies to digital personal data processed within India, and to processing outside India where it is in connection with offering goods or services to data principals in India.</p>\n <h3>The vocabulary</h3>\n <table>\n  <thead><tr><th>Term</th><th>Meaning</th></tr></thead>\n  <tbody>\n   <tr><td>Data Principal</td><td>The individual to whom the personal data relates. For a child, includes the parent or lawful guardian.</td></tr>\n   <tr><td>Data Fiduciary</td><td>Whoever alone or with others determines the purpose and means of processing. The controller equivalent.</td></tr>\n   <tr><td>Data Processor</td><td>Processes on behalf of a fiduciary.</td></tr>\n   <tr><td>Significant Data Fiduciary</td><td>Notified by the Central Government on volume and sensitivity of data, risk to rights, electoral democracy, security of the State and public order. Owes extra duties.</td></tr>\n   <tr><td>Consent Manager</td><td>Registered with the Board; gives the principal a single interface to give, manage, review and withdraw consent.</td></tr>\n  </tbody>\n </table>\n <h3>Consent and notice</h3>\n <p>Consent must be free, specific, informed, unconditional and unambiguous, given by a clear affirmative action, and limited to the data necessary for the specified purpose. The notice must accompany or precede the request, state the data and the purpose, explain how to withdraw, how to exercise rights, and how to complain to the Board. The notice must be available in English or any language in the Eighth Schedule, at the principal's option. Withdrawal must be as easy as giving consent.</p>\n <p>Certain processing is permitted without consent as a \"legitimate use\": where the principal voluntarily provided data for a purpose and did not object, for State functions and subsidies, for compliance with law or court orders, for medical emergencies, epidemics, disasters, and for employment purposes.</p>\n <h3>Children</h3>\n <p>A child is anyone under eighteen. Processing requires verifiable consent of the parent or guardian. Tracking, behavioural monitoring and targeted advertising directed at children are prohibited outright, as is processing likely to cause a detrimental effect on a child's wellbeing.</p>\n <h3>Duties of the fiduciary</h3>\n <ul class=\"tight\">\n  <li>Ensure completeness, accuracy and consistency of data used to make a decision affecting the principal or shared with another fiduciary.</li>\n  <li>Implement reasonable security safeguards. This duty exists regardless of any contract with a processor.</li>\n  <li>Notify the Board and each affected principal of a personal data breach.</li>\n  <li>Erase data when consent is withdrawn or the purpose is no longer served, unless retention is required by law.</li>\n  <li>Publish the contact details of a Data Protection Officer or person answering questions.</li>\n  <li>Significant Data Fiduciaries additionally appoint a DPO based in India answerable to the board of directors, appoint an independent data auditor, and conduct periodic Data Protection Impact Assessments and audits.</li>\n </ul>\n <h3>Rights, duties and enforcement</h3>\n <p>Principals have rights to access a summary of their data and the fiduciaries it was shared with, to correction and erasure, to grievance redressal, and to nominate another person to exercise rights in the event of death or incapacity. Notably, the Act also imposes <em>duties</em> on principals, including not registering false or frivolous complaints, breach of which attracts a penalty up to ten thousand rupees.</p>\n <p>The Data Protection Board of India adjudicates. Penalties are civil and run to two hundred and fifty crore rupees for failure to take reasonable security safeguards, two hundred crore for failure to notify a breach or breach of children's obligations, and one hundred and fifty crore for breach of Significant Data Fiduciary duties. Appeals lie to the Telecom Disputes Settlement and Appellate Tribunal.</p>\n <div class=\"callout\"><b>Constitutional backdrop.</b> Read the Act against <em>K.S. Puttaswamy v. Union of India</em> (2017), which located informational privacy within Article 21 and required any restriction to satisfy legality, legitimate aim, proportionality and procedural safeguards. The breadth of the State exemptions under section 17 of the DPDP Act is the most contested question in the field.</div>",
    "quiz": [
      {
        "q": "A fintech app signs up a seventeen-year-old and serves her personalised loan advertisements based on her spending. Which is correct?",
        "a": [
          "Permitted, because she consented when installing the app",
          "Prohibited — she is a child under the Act, and targeted advertising directed at children is barred outright regardless of consent",
          "Permitted if the parent is informed afterwards",
          "Permitted because financial services are a legitimate use"
        ],
        "c": 1,
        "e": "A child under the DPDP Act is anyone below eighteen. Two separate problems arise. Processing her data at all requires verifiable parental consent, which was not obtained. And even with such consent, tracking, behavioural monitoring and targeted advertising directed at children are prohibited. Legitimate use does not cover commercial advertising."
      },
      {
        "q": "A fiduciary outsources storage to a processor, whose weak configuration causes a breach. The contract puts all security obligations on the processor. Who answers to the Board?",
        "a": [
          "The processor alone, under the contract",
          "The fiduciary — the security obligation under the Act is not displaced by contract, though it may have contractual recourse against the processor",
          "Neither, since there was no intention",
          "Both equally, as joint fiduciaries"
        ],
        "c": 1,
        "e": "The Act places the duty to implement reasonable security safeguards on the Data Fiduciary and states that it applies whether or not there is an agreement to the contrary with a processor. The contract may give the fiduciary an indemnity against the processor, but it does not move the statutory liability. The maximum penalty for this failure is two hundred and fifty crore rupees."
      },
      {
        "q": "Which body hears an appeal from an order of the Data Protection Board of India?",
        "a": [
          "The National Company Law Appellate Tribunal",
          "The Telecom Disputes Settlement and Appellate Tribunal",
          "The High Court directly under Article 226",
          "The Cyber Appellate Tribunal"
        ],
        "c": 1,
        "e": "Appeals from the Data Protection Board lie to the Telecom Disputes Settlement and Appellate Tribunal, which is also the appellate forum for orders under the IT Act following the merger of the Cyber Appellate Tribunal into it."
      }
    ]
  },
  {
    "id": "evidence",
    "tag": "§63 BSA",
    "title": "Electronic evidence and the certificate",
    "blurb": "Why prosecutions collapse: the conditions, the certificate, and the line of authority.",
    "video": "Section 63 BSA in practice: drafting and attacking the certificate",
    "body": "\n <p>Section 63 of the Bharatiya Sakshya Adhiniyam 2023 carries forward, with modifications, what section 65B of the Indian Evidence Act 1872 did. Every reported judgment you will read still says 65B, so learn both numbers.</p>\n <p>The scheme is this. An electronic record printed, stored, recorded or copied by a computer is deemed to be a <em>document</em>, and is admissible without further proof and without producing the original, if the conditions are satisfied. That is a considerable concession: it dispenses with the primary evidence rule for a whole class of material.</p>\n <h3>The conditions</h3>\n <ul class=\"tight\">\n  <li>The computer output was produced by a computer or communication device used regularly to store or process information for activities regularly carried on by a person having lawful control over it.</li>\n  <li>Information of that kind was regularly fed into it in the ordinary course of those activities.</li>\n  <li>Throughout the material period the device was operating properly, or if not, the malfunction did not affect the accuracy of the record.</li>\n  <li>The information reproduces or derives from information fed in during the ordinary course.</li>\n </ul>\n <p>Where the record was produced by a combination of devices or over a period by several computers, they are treated as a single device.</p>\n <h3>The certificate</h3>\n <p>Subsection (4) requires a certificate identifying the electronic record, describing the manner of its production, giving particulars of the device, and dealing with the conditions. It must be signed by a person in charge of the computer or communication device or the management of the relevant activities, and the 2023 Act additionally contemplates a certificate from an expert. A statement in the certificate made to the best of the signatory's knowledge and belief suffices.</p>\n <h3>The line of authority</h3>\n <table>\n  <thead><tr><th>Case</th><th>Holding</th></tr></thead>\n  <tbody>\n   <tr><td><em>State (NCT of Delhi) v. Navjot Sandhu</em> (2005)</td><td>Permitted proof of electronic records by other means under sections 63 and 65 of the old Act. Later held to be bad law.</td></tr>\n   <tr><td><em>Anvar P.V. v. P.K. Basheer</em> (2014)</td><td>Overruled Navjot Sandhu. The certificate is mandatory for secondary electronic evidence. Section 65B is a complete code.</td></tr>\n   <tr><td><em>Shafhi Mohammad v. State of HP</em> (2018)</td><td>Two-judge bench relaxed the requirement where the party did not possess the device. Doubted almost immediately.</td></tr>\n   <tr><td><em>Arjun Panditrao Khotkar v. Kailash Gorantyal</em> (2020)</td><td>Three-judge bench overruled Shafhi, restored Anvar, and clarified that a party who cannot obtain a certificate should apply to the court to summon it. Also clarified the certificate may be produced at any stage before trial concludes, in the court's discretion.</td></tr>\n  </tbody>\n </table>\n <div class=\"callout law\"><b>The exception that is always missed.</b> If the original device itself is produced and the owner steps into the witness box, no certificate is needed. The certificate exists only to authenticate <em>secondary</em> output — a printout, a CD, a forwarded copy. A litigant who brings the actual phone and testifies is giving primary evidence.</div>",
    "quiz": [
      {
        "q": "The prosecution produces a CD containing CCTV footage, supported by the testimony of the investigating officer who copied it, but no certificate. What is the position after Arjun Panditrao?",
        "a": [
          "Admissible, because oral evidence of the copying process is sufficient",
          "Inadmissible as it stands; the certificate is mandatory for secondary electronic evidence, though the court may permit it to be produced later",
          "Admissible if the accused does not object",
          "Admissible because CCTV is real evidence, not documentary"
        ],
        "c": 1,
        "e": "Arjun Panditrao overruled Shafhi Mohammad and restored Anvar P.V. Oral testimony cannot substitute for the certificate where secondary electronic evidence is tendered. The court did however hold that the certificate may be produced at any stage before the trial concludes, and that a party unable to obtain it may apply to the court to summon it from the person in control."
      },
      {
        "q": "A complainant walks into court holding the phone on which she received the threatening messages, and testifies to receiving them. Does she need a section 63 certificate?",
        "a": [
          "Yes, always, for any electronic record",
          "No — producing the original device with the owner's testimony is primary evidence; the certificate is required only for secondary output",
          "Yes, unless the accused admits the messages",
          "No, but only if the phone is sent for forensic examination"
        ],
        "c": 1,
        "e": "Section 63 is directed at computer output tendered in place of the original. Where the original device is itself produced and spoken to by the person in control of it, the material is primary evidence and the certificate requirement does not arise. This is stated in terms in Anvar P.V. and reaffirmed in Arjun Panditrao."
      },
      {
        "q": "Which decision did Arjun Panditrao Khotkar expressly overrule?",
        "a": [
          "Anvar P.V. v. P.K. Basheer",
          "Shafhi Mohammad v. State of Himachal Pradesh",
          "Shreya Singhal v. Union of India",
          "Tomaso Bruno v. State of UP"
        ],
        "c": 1,
        "e": "The three-judge bench overruled Shafhi Mohammad, which had relaxed the certificate requirement for parties not in possession of the device, and restored the strict position taken in Anvar P.V. Navjot Sandhu had already been overruled by Anvar itself."
      }
    ]
  },
  {
    "id": "jurisdiction",
    "tag": "§1(2) · §75",
    "title": "Jurisdiction and extra-territorial reach",
    "blurb": "The server is in Ireland, the accused in Manila, the victim in Madurai. Who tries the case?",
    "video": "Jurisdiction in cyberspace: section 75 and the tests courts apply",
    "body": "\n <p>Section 1(2) extends the IT Act to the whole of India and, subject to section 75, to any offence or contravention committed outside India by any person. Section 75 makes the position explicit: the Act applies to an offence or contravention committed outside India by any person irrespective of nationality, <em>if the act involves a computer, computer system or computer network located in India</em>.</p>\n <p>That is a broad claim of prescriptive jurisdiction. It is easy to state and hard to enforce, which is why the practical questions are about mutual legal assistance, letters rogatory and platform cooperation rather than about the text of section 75.</p>\n <h3>Territorial jurisdiction within India</h3>\n <p>Which court in India tries the matter is governed by the procedural code, now sections 197 to 206 of the Bharatiya Nagarik Suraksha Sanhita 2023, which continue the familiar rules: the offence may be tried where the act was done or where the consequence ensued, and where it is uncertain, in any of the local areas concerned. For online fraud, the place where the victim parted with the money and the place where it was received are both available. This is why a complainant in Tamil Nadu can register an FIR locally even though the accused operates from another State, and why \"zero FIR\" practice matters.</p>\n <h3>The tests courts have borrowed</h3>\n <ul class=\"tight\">\n  <li><b>Purposeful availment.</b> Drawn from United States doctrine and applied by the Delhi High Court in <em>Banyan Tree Holding v. A. Murali Krishna Reddy</em> (2009) for a passive website: the plaintiff must show the defendant specifically targeted users in the forum state and that the activity resulted in injury there. A merely accessible website is not enough.</li>\n  <li><b>Effects test.</b> Jurisdiction where the harmful effect is felt. Attractive for defamation and data breach, criticised for exposing a publisher to every forum on earth.</li>\n  <li><b>Location of the computer resource.</b> The statutory test under section 75, which does not ask about targeting at all.</li>\n </ul>\n <div class=\"callout\"><b>Data location is not the whole answer.</b> Where evidence sits on a foreign server, production usually requires a mutual legal assistance treaty request through the Ministry of Home Affairs, which is slow. Section 94 BNSS empowers a court or officer in charge of a police station to require production of a document or electronic communication device, but service on a foreign entity with no Indian presence remains the practical obstacle. This is precisely the problem the CLOUD Act arrangements and the Budapest Convention debate are about, and India is not a party to the Budapest Convention.</div>",
    "quiz": [
      {
        "q": "A person in Manila, using a server in Singapore, deploys ransomware that encrypts a hospital network in Coimbatore. Does the IT Act apply?",
        "a": [
          "No — both the accused and the server are outside India",
          "Yes — section 75 applies where the act involves a computer or network located in India, irrespective of the nationality of the accused",
          "Only if the accused is an Indian citizen",
          "Only if Singapore consents"
        ],
        "c": 1,
        "e": "Section 75 asserts jurisdiction over an offence committed outside India by any person, irrespective of nationality, where the act involves a computer, computer system or computer network located in India. The hospital network in Coimbatore satisfies that. Whether the accused can actually be brought to trial is a separate question of extradition and mutual legal assistance."
      },
      {
        "q": "What did Banyan Tree Holding v. A. Murali Krishna Reddy establish about passive websites?",
        "a": [
          "Any accessible website confers jurisdiction everywhere",
          "The plaintiff must show the defendant purposefully availed itself of the forum and that the targeted activity caused injury there",
          "Jurisdiction lies only where the server is located",
          "Only the Supreme Court has jurisdiction over internet disputes"
        ],
        "c": 1,
        "e": "The Delhi High Court held that mere accessibility of a website in the forum state is insufficient. The plaintiff must plead and show that the defendant purposefully availed itself of the forum jurisdiction, that the activity was intentionally directed at users there, and that it resulted in injury to the plaintiff in that forum."
      },
      {
        "q": "A victim in Tamil Nadu is defrauded by an accused operating from Delhi, money moving to a Mumbai account. Where can the FIR be registered?",
        "a": [
          "Only in Delhi, where the accused acted",
          "In Tamil Nadu, Delhi or Mumbai — the act and its consequences span all three",
          "Only in Mumbai, where the money was received",
          "Only at the National Cyber Crime Reporting Portal"
        ],
        "c": 1,
        "e": "The territorial jurisdiction provisions of the BNSS permit trial where the act was done or where the consequence ensued, and where it is uncertain in which of several areas the offence was committed, in any of them. All three locations are therefore available. Practically, the victim registers locally, and a zero FIR is transferred to the station with jurisdiction to investigate."
      }
    ]
  },
  {
    "id": "interception",
    "tag": "§69 · §69A · §69B · §70",
    "title": "Interception, blocking and protected systems",
    "blurb": "State power over networks, and the proportionality standard it now has to meet.",
    "video": "Sections 69 to 70 and the Puttaswamy proportionality test",
    "body": "\n <p>Three adjacent powers, often confused.</p>\n <ul class=\"tight\">\n  <li><b>Section 69</b> — directions for interception, monitoring or decryption of any information through any computer resource, on grounds of sovereignty and integrity, defence, security of the State, friendly relations with foreign States, public order, or preventing incitement to a cognizable offence, or for investigation of an offence. A subscriber or intermediary who fails to assist faces seven years and a fine.</li>\n  <li><b>Section 69A</b> — directions to block public access to information, on the same grounds minus investigation of an offence. Procedure is in the Blocking Rules 2009, which include a confidentiality clause that has been much criticised.</li>\n  <li><b>Section 69B</b> — authorisation to monitor and collect traffic data or information for cyber security purposes.</li>\n  <li><b>Section 70</b> — declaration of a protected system by notification. Unauthorised access to it carries ten years. Section 70A establishes the National Critical Information Infrastructure Protection Centre; section 70B establishes CERT-In.</li>\n </ul>\n <div class=\"callout law\"><b>Section 69A survived Shreya Singhal.</b> While section 66A was struck down, the court upheld section 69A and the Blocking Rules, noting that blocking is only on the Article 19(2) grounds, that reasons must be recorded in writing so the order is amenable to challenge under Article 226, and that a committee procedure with a hearing for the originator is built into the Rules.</div>\n <h3>The proportionality overlay</h3>\n <p>After <em>Puttaswamy</em>, any invasion of informational privacy must satisfy four requirements: a law must exist; the aim must be legitimate; the means must be rationally connected and be the least restrictive available; and there must be procedural safeguards against abuse. The <em>Anuradha Bhasin v. Union of India</em> (2020) decision applied this to internet shutdowns, holding that orders must be published, must be reasoned, must be limited in duration and scope, and are subject to periodic review by a committee.</p>\n <h3>CERT-In directions of 28 April 2022</h3>\n <ul class=\"tight\">\n  <li>Report specified cyber incidents to CERT-In within <b>six hours</b> of noticing them.</li>\n  <li>Enable and securely maintain ICT system logs for a rolling period of <b>180 days</b>, within Indian jurisdiction.</li>\n  <li>Data centres, virtual private server providers, cloud and VPN providers must register and retain subscriber details for <b>five years</b> after cancellation.</li>\n  <li>Synchronise system clocks to NIC or NPL servers.</li>\n </ul>",
    "quiz": [
      {
        "q": "Which section empowers the government to direct that public access to online information be blocked?",
        "a": [
          "Section 69",
          "Section 69A, read with the Blocking Rules 2009",
          "Section 69B",
          "Section 70"
        ],
        "c": 1,
        "e": "Section 69 concerns interception, monitoring and decryption directed at information passing through a computer resource. Section 69A is the blocking power, exercised under the Information Technology (Procedure and Safeguards for Blocking for Access of Information by Public) Rules 2009. Section 69B deals with traffic data monitoring for cyber security, and section 70 with protected systems."
      },
      {
        "q": "What is the CERT-In reporting window for a specified cyber incident under the April 2022 directions?",
        "a": [
          "72 hours",
          "6 hours of noticing the incident",
          "24 hours",
          "30 days"
        ],
        "c": 1,
        "e": "The directions require reporting within six hours of noticing the incident or being brought to notice of it. The six-hour window is among the shortest in the world and is a frequent examination point. Log retention is separately fixed at 180 days within India."
      },
      {
        "q": "Anuradha Bhasin v. Union of India is authority for which proposition?",
        "a": [
          "Internet access is an absolute fundamental right",
          "Orders restricting internet access must be published, reasoned, proportionate, limited in time and subject to periodic review",
          "Section 69A is unconstitutional",
          "Shutdowns can never be ordered"
        ],
        "c": 1,
        "e": "The Court did not declare internet access an absolute right. It held that freedom of speech and the freedom to carry on trade through the internet are constitutionally protected, that suspension orders are subject to judicial review, must be published, must record reasons, must satisfy proportionality, cannot be indefinite, and must be reviewed periodically by the committee constituted under the Telecom Suspension Rules."
      }
    ]
  },
  {
    "id": "terror",
    "tag": "§66F · §65",
    "title": "Cyber terrorism and source code offences",
    "blurb": "The gravest offence in the Act, and the narrow provision students always overstate.",
    "video": "Section 66F: threshold, intention and why it is rarely charged",
    "body": "\n <p><b>Section 66F</b> is the only provision in the IT Act carrying imprisonment for life. It has two limbs.</p>\n <p><b>Limb (1)(A)</b> — with intent to threaten the unity, integrity, security or sovereignty of India or to strike terror in the people or any section of the people, the accused denies access to an authorised person, attempts to penetrate without authorisation, or introduces a contaminant, and by such conduct causes or is likely to cause death or injuries to persons, damage to property, disruption of supplies or services essential to the life of the community, or adversely affects critical information infrastructure.</p>\n <p><b>Limb (1)(B)</b> — knowingly or intentionally penetrating or accessing a computer resource without authorisation and thereby obtaining access to information restricted in the interests of the sovereignty and integrity of India, the security of the State, friendly relations with foreign States, public order, decency or morality, or in relation to contempt of court, defamation or incitement to an offence, or to any restricted information, data or database, with reason to believe that it may be used to cause injury to the interests of India or its sovereignty.</p>\n <div class=\"callout law\"><b>The threshold is intention, not consequence.</b> A large-scale outage caused by a financially motivated ransomware group does not become cyber terrorism merely because it is serious. Without the specific intent to threaten sovereignty or strike terror, the correct charges are sections 66 and 43, with section 70 if a protected system is involved. Charging 66F loosely is a recurring criticism of investigating agencies, and it matters because 66F is non-bailable.</div>\n <h3>Section 65 — tampering with source documents</h3>\n <p>Section 65 punishes knowingly or intentionally concealing, destroying or altering, or causing another to do so, any computer source code <em>used for a computer, computer programme, computer system or computer network, when the source code is required to be kept or maintained by law for the time being in force</em>. Three years or two lakh rupees or both.</p>\n <p>Students routinely misread this as covering all source code theft. It does not. The qualifier — required to be kept or maintained by law — narrows it considerably. Where no statute or regulation requires that the code be maintained, section 65 is unavailable and the correct route is section 66 read with section 43, copyright infringement under sections 63 and 63B of the Copyright Act 1957, or an action for breach of confidence.</p>\n <h3>Protected systems</h3>\n <p>Section 70 permits the appropriate government to declare any computer resource which directly or indirectly affects the facility of Critical Information Infrastructure to be a protected system, by notification in the Official Gazette. Securing unauthorised access to such a system carries ten years and a fine. Critical Information Infrastructure is defined in the Explanation as a computer resource whose incapacitation or destruction shall have a debilitating impact on national security, economy, public health or safety.</p>",
    "quiz": [
      {
        "q": "A criminal group encrypts a private logistics company's servers and demands ransom. Deliveries stop for four days. Is section 66F made out?",
        "a": [
          "Yes — essential supplies were disrupted",
          "Not without the specific intent to threaten sovereignty or strike terror; sections 66 and 43 are the appropriate charges",
          "Yes — any ransomware is cyber terrorism",
          "Only if the company is foreign-owned"
        ],
        "c": 1,
        "e": "Section 66F requires a specific mental element: intent to threaten the unity, integrity, security or sovereignty of India, or to strike terror in the people or a section of them. Financial motivation is inconsistent with that intent. The disruption is serious but the correct charges are section 66 read with section 43, with section 70 if the resource had been notified as a protected system."
      },
      {
        "q": "A developer leaving a private startup deletes the company's proprietary source code from the repository out of spite. No law requires the company to maintain that code. Is section 65 available?",
        "a": [
          "Yes — section 65 covers all source code",
          "No — section 65 applies only where the source code is required to be kept or maintained by law",
          "Yes, but only if the code was commercially valuable",
          "No, because deletion is not alteration"
        ],
        "c": 1,
        "e": "The qualifying words in section 65 are essential: the source code must be one required to be kept or maintained by law for the time being in force. Absent such a requirement, section 65 fails. Charge section 66 with section 43 for the destruction of data, consider section 63 of the Copyright Act, and plead breach of the confidentiality covenant in the employment contract."
      },
      {
        "q": "Which section permits declaration of a protected system, and what punishment attaches to unauthorised access to one?",
        "a": [
          "Section 69, three years",
          "Section 70, ten years",
          "Section 66F, life imprisonment",
          "Section 43A, compensation only"
        ],
        "c": 1,
        "e": "Section 70 permits the appropriate government to declare a computer resource affecting Critical Information Infrastructure to be a protected system by Gazette notification. Section 70(3) punishes securing access or attempting to secure access to such a system in contravention of the section with imprisonment up to ten years and a fine."
      }
    ]
  }
] as const;

export type MODULE = (typeof MODULES)[number];
