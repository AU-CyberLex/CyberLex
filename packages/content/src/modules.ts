import type { Module } from "./types";
import { MODULES_B } from "./modules-b";

export const MODULES: Module[] = [
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
  ...MODULES_B,
];
