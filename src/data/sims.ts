export const SIMS = [
  {
    "id": "exfil",
    "title": "The departing associate",
    "tag": "§43 · §66 · §72A",
    "blurb": "A senior associate resigns on Friday. On Monday the managing partner finds the client database on a rival firm's pitch deck.",
    "steps": [
      {
        "n": "You act for the firm. The IT head tells you the associate's laptop is still running at her desk, logged in, with a file-sync client active. The managing partner wants to \"just look through it quickly\" before anyone else touches it.",
        "o": [
          {
            "t": "Let him look. Speed matters and it is the firm's own laptop.",
            "s": -2,
            "f": "Every file he opens updates the access timestamp, and the sync client may push those changes to the cloud. You have contaminated the exhibit before the case begins, and the defence will say so in the first ten minutes of cross-examination. Ownership of the device does not preserve evidence."
          },
          {
            "t": "Photograph the screen, note what is running, then call a forensic examiner before anything is touched.",
            "s": 2,
            "f": "Correct. The machine is live and volatile evidence — running processes, network connections, and decrypted session tokens — exists only while it stays powered. Documenting the screen state costs nothing and preserves the record of what you found."
          },
          {
            "t": "Shut it down immediately so nothing more can be synced.",
            "s": 0,
            "f": "Defensible but costly. You have stopped further exfiltration, which is a real benefit, but you have destroyed the memory image and any encryption keys held only in RAM. If the drive turns out to be encrypted you may have locked yourself out of your own evidence."
          }
        ]
      },
      {
        "n": "The examiner arrives. She proposes to disconnect the network cable, capture RAM, then power down and image the drive through a hardware write blocker. The partner objects that this will take six hours and he wants an injunction application filed today.",
        "o": [
          {
            "t": "Agree with the partner. Copy the relevant folders onto a pen drive now and file on that.",
            "s": -2,
            "f": "A selective copy of \"relevant folders\" is secondary evidence with no image, no hash and no write blocker. It cannot be authenticated, and worse, it invites the allegation that you picked what suited you. You will also have to admit on affidavit how the copy was made."
          },
          {
            "t": "Let the examiner proceed. File the application on the partner's affidavit setting out what was observed, with the forensic report to follow.",
            "s": 2,
            "f": "Correct. An interim application can proceed on a deponent's account of what was seen on the screen. The forensic report strengthens it later. You have not traded away the integrity of the exhibit for a few hours."
          },
          {
            "t": "Ask the examiner to skip the RAM capture to save time, but image the drive properly.",
            "s": 0,
            "f": "A reasonable compromise that most practitioners would accept, but you have given up the memory image. If the associate used a browser-based transfer service, the session evidence may have lived only in RAM."
          }
        ]
      },
      {
        "n": "The image shows the associate used her own valid credentials, accessed a client folder she had partial rights to, and copied 4,200 records to a personal cloud account two days before resigning. Her contract contains an express confidentiality covenant. What do you charge?",
        "o": [
          {
            "t": "Section 66F — this is an attack on the firm's critical infrastructure.",
            "s": -2,
            "f": "No. Section 66F requires intent to threaten the sovereignty or integrity of India or to strike terror. A law firm's client database is not critical information infrastructure and commercial motive is inconsistent with the mental element. Overcharging like this gets the FIR quashed and damages your credibility."
          },
          {
            "t": "Section 43 read with section 66, and section 72A because she obtained the data lawfully under contract and disclosed it in breach.",
            "s": 2,
            "f": "Correct and precise. Section 72A is the provision built for exactly this fact pattern and is routinely missed. Section 66 supplies the dishonesty limb over the section 43 acts. Add criminal breach of trust under section 316 BNS if entrustment can be pleaded, and run the civil remedy under section 43 before the adjudicating officer in parallel."
          },
          {
            "t": "Section 66C — she used credentials to take the data.",
            "s": -1,
            "f": "Section 66C punishes fraudulent use of <em>another person's</em> unique identification feature. She used her own. This charge fails on its face and a defence counsel will say so at the first hearing."
          }
        ]
      },
      {
        "n": "At trial you tender a printout of the cloud upload log, obtained from the firm's own monitoring system. Opposing counsel objects to admissibility.",
        "o": [
          {
            "t": "Argue the printout is real evidence and needs no certificate.",
            "s": -2,
            "f": "A computer output tendered in place of the original device is secondary evidence and section 63 BSA applies. Arjun Panditrao settled this. The objection will be sustained."
          },
          {
            "t": "File a certificate under section 63(4) BSA signed by the IT head, identifying the record, the device and the manner of production.",
            "s": 2,
            "f": "Correct. The IT head occupies a responsible official position in relation to the operation of the monitoring system, which is exactly who the subsection contemplates. Ensure the certificate deals with each of the four conditions and describes the device particulars, not just the file name."
          },
          {
            "t": "Call the IT head to testify orally about how the log was generated.",
            "s": -1,
            "f": "Oral evidence cannot substitute for the certificate where secondary electronic evidence is tendered. That was the whole holding in Anvar P.V., restored in Arjun Panditrao. You may still call him, but you must file the certificate."
          }
        ]
      }
    ]
  },
  {
    "id": "mule",
    "title": "The customer care call",
    "tag": "§66C · §66D · §318 BNS",
    "blurb": "A retired schoolteacher in Madurai loses ₹4.2 lakh in eleven minutes. You are the officer she reports to.",
    "steps": [
      {
        "n": "She reports at 9.40 a.m. The transfers happened at 8.55 a.m. She has the caller's number, the SMS alerts, and her phone in hand. What is your first act?",
        "o": [
          {
            "t": "Record the complaint carefully and register the FIR by the end of the shift.",
            "s": -2,
            "f": "You have lost the money. Layering through mule accounts typically completes within a few hours. The first hour is the only window in which funds can realistically be frozen."
          },
          {
            "t": "Report on the National Cyber Crime Reporting Portal immediately to trigger the banking freeze, then register the FIR.",
            "s": 2,
            "f": "Correct. The reporting portal and the associated helpline route the transaction details to the beneficiary banks for a hold within the golden hour. Registration of the FIR is essential but it is not what stops the money moving."
          },
          {
            "t": "Send her to the bank branch to sort it out with them directly.",
            "s": -1,
            "f": "The branch cannot freeze an account at another bank. You have transferred your own responsibility to a victim who is in distress, and lost the window while she travels."
          }
        ]
      },
      {
        "n": "She hands you her phone and asks you to keep it. Her son says he will forward you screenshots of the SMS alerts instead.",
        "o": [
          {
            "t": "Take the screenshots. They show the same information and are easier to file.",
            "s": -1,
            "f": "A forwarded screenshot is secondary evidence at two removes, with no certificate and no established provenance. It can be challenged as easily fabricated. It is better than nothing but it is the weakest option available to you."
          },
          {
            "t": "Seize the handset under a documented seizure memo with witnesses, and send it for forensic extraction.",
            "s": 2,
            "f": "Correct. The handset is the original. A documented seizure with a memo, witnesses and a hash of the extraction gives you primary material and a defensible chain. Provide her a receipt and, where the investigation permits, arrange a replacement or return after extraction."
          },
          {
            "t": "Photograph the messages on your own phone and return hers.",
            "s": 0,
            "f": "Better than a forwarded screenshot because you can depose to having taken the photographs yourself. But you have given up the original device and with it the message database, deletion artefacts and timestamps that extraction would recover."
          }
        ]
      },
      {
        "n": "Extraction shows the caller spoofed the bank's customer care number, induced her to read out an OTP, and the OTP was then used to authorise the transfer. What sections?",
        "o": [
          {
            "t": "Section 66D only — the whole offence was the impersonation.",
            "s": 0,
            "f": "You have the personation but you have left out the separate act of using her OTP. Charging only 66D is not wrong, but it is incomplete and gives away a count."
          },
          {
            "t": "Sections 66C and 66D IT Act with section 318(4) BNS for cheating.",
            "s": 2,
            "f": "Correct. Personating the bank to induce her is 66D. Actually using her OTP, a unique identification feature, is the distinct offence under 66C. The underlying cheating is charged under section 318(4) BNS. Consider section 336 BNS if any electronic record was forged."
          },
          {
            "t": "Section 66 read with section 43 — the accused accessed her account without permission.",
            "s": -1,
            "f": "Technically the account was accessed using credentials she supplied under deception, so the section 43 framing is strained. The provisions drafted for this exact conduct are 66C and 66D, and a court will expect to see them."
          }
        ]
      },
      {
        "n": "The beneficiary account belongs to a nineteen-year-old who says he was paid ₹3,000 to let his account be used and did not know the source of the funds.",
        "o": [
          {
            "t": "Treat him as a victim and close the inquiry against him.",
            "s": -2,
            "f": "Accepting a fee to lend an account is not innocent. It is at minimum a matter for investigation under the money laundering framework and potentially abetment. Closing without inquiry hands the defence a ready-made gap."
          },
          {
            "t": "Investigate him as a mule: take the account opening documents, device details, and the chain that recruited him, while assessing what he actually knew.",
            "s": 2,
            "f": "Correct. The mule is the only physically reachable node in most of these networks and is the route upward. Knowledge is the live question for section 66B and for abetment; the recruitment chain, usually a messaging group, is where the investigation actually goes."
          },
          {
            "t": "Charge him under section 66F as part of an organised cyber attack.",
            "s": -2,
            "f": "No. The mental element of section 66F is entirely absent and the section is non-bailable. Charging a nineteen-year-old under a life-imprisonment provision on these facts is an abuse that the High Court will correct."
          }
        ]
      }
    ]
  },
  {
    "id": "platform",
    "title": "The morphed image",
    "tag": "§66E · §79 · Rules 2021",
    "blurb": "A college student finds a morphed photograph of herself circulating on a large social platform. You advise her.",
    "steps": [
      {
        "n": "She has screenshots and the profile URL. She wants it gone today. What is the fastest lawful route?",
        "o": [
          {
            "t": "File a writ petition in the High Court seeking a takedown direction.",
            "s": -1,
            "f": "It will work eventually, and in serious cases a court order is exactly what you want. But it is not the fastest route and it is disproportionate as a first step when a twenty-four hour statutory window already exists."
          },
          {
            "t": "Complain to the platform's Resident Grievance Officer, invoking Rule 3(2)(b), which requires removal of morphed or impersonated imagery within twenty-four hours.",
            "s": 2,
            "f": "Correct. Rule 3(2)(b) of the Intermediary Guidelines 2021 creates a specific twenty-four hour obligation for content showing a private area, nudity, or a person in an impersonated form including artificially morphed images. Name the rule expressly in the complaint — it changes how the complaint is triaged."
          },
          {
            "t": "Email the platform's general support address and wait.",
            "s": -2,
            "f": "A general support ticket has no statutory timeline attached. The Rules give you a named officer, a twenty-four hour acknowledgement obligation and a fifteen day disposal obligation. Use them."
          }
        ]
      },
      {
        "n": "Simultaneously, what do you preserve?",
        "o": [
          {
            "t": "Nothing — the platform will have logs.",
            "s": -2,
            "f": "The platform may retain logs, but the post itself is about to be deleted at your own request. Once removed, obtaining the content back requires a legal request that may take months. Preserve first, then complain."
          },
          {
            "t": "Capture the URLs, full-page captures with visible timestamps, the profile identifiers, and hash the captures before filing anything.",
            "s": 2,
            "f": "Correct. Hashing your own captures at the moment of collection lets you show later that what you produce is what you took. Record the date, time and the device used. This is the same discipline the police laboratory applies, and there is no reason a lawyer should apply less."
          },
          {
            "t": "Ask her to forward the screenshots to you on a messaging app.",
            "s": -1,
            "f": "Forwarding re-encodes images, strips metadata and adds a link in the chain you will have to explain. It is the weakest form of preservation and the easiest to attack."
          }
        ]
      },
      {
        "n": "The platform removes the post in eighteen hours but refuses to disclose the uploader's details without legal process. She wants to prosecute.",
        "o": [
          {
            "t": "Argue that the platform has lost safe harbour by refusing, and sue it.",
            "s": -2,
            "f": "The platform complied within the window. Refusing to hand subscriber data to a private party without legal process is correct conduct, not a breach. Section 79 is intact and the suit fails."
          },
          {
            "t": "Register an FIR under sections 66E and 67 IT Act with section 79 BNS, and have the investigating officer seek subscriber details through lawful process.",
            "s": 2,
            "f": "Correct. The platform can only disclose on lawful process. An FIR gives the investigating officer the power to require production. Section 66E addresses the private area imagery, section 67 the obscene publication where the material qualifies, and section 79 BNS covers insult to the modesty of a woman."
          },
          {
            "t": "Ask the platform politely again, in writing.",
            "s": -1,
            "f": "It will be refused again for the same correct reason. You are spending the client's time on a route that cannot succeed without process."
          }
        ]
      },
      {
        "n": "The uploader is identified. He argues the image is obviously fake, that no reasonable person would believe it, and that no offence is made out.",
        "o": [
          {
            "t": "Concede — if it is obviously fake, there is no deception.",
            "s": -2,
            "f": "Deception of a third party is not an ingredient of section 66E, which is about publishing or transmitting the image of a private area without consent. Nor is it an ingredient of section 67, which turns on obscenity. You have conceded a defence that does not exist."
          },
          {
            "t": "Answer that neither section 66E nor section 67 requires anyone to be deceived; the harm is the publication itself.",
            "s": 2,
            "f": "Correct. Section 66E is complete on publication or transmission of the image of a private area without consent. Section 67 turns on whether the material is obscene by community standards. Whether viewers believed it to be authentic goes at most to sentencing and to any parallel defamation claim, not to the ingredients."
          },
          {
            "t": "Rely on section 66A to prosecute the offensive character of the post.",
            "s": -2,
            "f": "Section 66A was struck down in Shreya Singhal in 2015 and no longer exists. Invoking it is a serious error that the Supreme Court has repeatedly had to correct in subsequent directions to police forces."
          }
        ]
      }
    ]
  }
] as const;

export type SIM = (typeof SIMS)[number];
