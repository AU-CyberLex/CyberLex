module.exports = [
 {n:'family_photo.jpg',hex:'FF D8 FF E0 00 10 4A 46 49 46 00 01 01 00 00 48',asc:'ÿØÿà..JFIF......',v:'JPEG image',ok:true,
  e:'The header matches the extension. This is a genuine JPEG. Nothing to report.'},
 {n:'accounts_2025.docx',hex:'52 61 72 21 1A 07 01 00 CF 90 73 00 0D 00 00 00',asc:'Rar!............',v:'RAR archive',ok:false,
  e:'The extension says Word document. The header says RAR archive. A genuine .docx begins 50 4B 03 04 because it is a ZIP container. This file has been deliberately renamed to hide an archive among the accounting documents — a standard concealment technique, and a finding that goes directly to the accused\'s knowledge and intention.'},
 {n:'notes.txt',hex:'25 50 44 46 2D 31 2E 37 0A 25 E2 E3 CF D3 0A 31',asc:'%PDF-1.7.%.....1',v:'PDF document',ok:false,
  e:'A PDF renamed to a text file. Less sinister than the archive but still a mismatch that must be reported. Note what this means for keyword searching: a tool searching only files with document extensions would have missed this one entirely.'},
 {n:'backup.zip',hex:'50 4B 03 04 14 00 06 00 08 00 00 00 21 00 D2 A8',asc:'PK..........!...',v:'ZIP archive',ok:true,
  e:'Genuine ZIP container. Remember that docx, xlsx, pptx, apk and jar files all share this signature, so a header match alone does not tell you which of them you are holding — the internal structure does.'},
 {n:'logo.png',hex:'D0 CF 11 E0 A1 B1 1A E1 00 00 00 00 00 00 00 00',asc:'ÐÏ..¡±..........',v:'Legacy Microsoft Office document',ok:false,
  e:'This is an OLE compound file — a legacy .doc or .xls — masquerading as an image. Legacy Office formats can carry macros, which raises a separate question about whether the file was capable of executing code on the victim\'s machine.'}
];