/* ==========================================================================
   Shared demo state, scoring and helpers.
   Everything lives in localStorage. No network calls.
   ========================================================================== */
(function () {
  "use strict";

  var DEMO_KEY = "cybernova.p7.demo.v1";

  var MODULES = [
    { id: "access", title: "Unauthorised access and data theft", tag: "§43 · §66", video: "Unauthorised access: §43 and §66", quiz: 3 },
    { id: "identity", title: "Identity theft and cheating by personation", tag: "§66C · §66D", video: "Identity theft and personation: §66C and §66D", quiz: 3 },
    { id: "obscene", title: "Obscene and sexually explicit material", tag: "§67 · §67A · §67B", video: "Obscenity online: §67, §67A and §67B", quiz: 3 },
    { id: "intermediary", title: "Intermediary liability and safe harbour", tag: "§79 · IT Rules 2021", video: "Safe harbour and the IT Rules 2021", quiz: 3 },
    { id: "dpdp", title: "Data protection under the DPDP Act", tag: "DPDP Act 2023", video: "DPDP Act 2023: consent, notice and penalties", quiz: 3 },
    { id: "evidence", title: "Electronic evidence and the certificate", tag: "§63 BSA", video: "Electronic evidence and the §63 BSA certificate", quiz: 3 },
    { id: "jurisdiction", title: "Jurisdiction and extra-territorial reach", tag: "§1(2) · §75", video: "Jurisdiction and §75", quiz: 3 },
    { id: "interception", title: "Interception, blocking and protected systems", tag: "§69 · §69A · §69B · §70", video: "Interception, blocking and protected systems", quiz: 3 },
    { id: "terror", title: "Cyber terrorism and source code offences", tag: "§66F · §65", video: "Cyber terrorism and source code offences", quiz: 3 }
  ];

  var SIMS = [
    { id: "exfil", title: "The departing associate", steps: 4 },
    { id: "mule", title: "The customer care call", steps: 4 },
    { id: "platform", title: "The morphed image", steps: 4 }
  ];

  var CASES = [
    {
      n: "Shreya Singhal v. Union of India",
      c: "(2015) 5 SCC 1",
      h: "Struck down section 66A as vague and overbroad, violating Article 19(1)(a) and not saved by Article 19(2). Upheld section 69A and the Blocking Rules. Read down section 79(3)(b) so that \"actual knowledge\" means a court order or government notification. Drew the distinction between discussion or advocacy, which is protected, and incitement, which may be restricted."
    },
    {
      n: "K.S. Puttaswamy v. Union of India",
      c: "(2017) 10 SCC 1",
      h: "Nine judges held privacy to be a fundamental right under Article 21, including informational privacy. Any restriction must satisfy legality, legitimate State aim, proportionality and procedural safeguards. The constitutional foundation of the DPDP Act and of every challenge to surveillance powers."
    },
    {
      n: "Anvar P.V. v. P.K. Basheer",
      c: "(2014) 10 SCC 473",
      h: "Overruled Navjot Sandhu. Section 65B is a complete code for secondary electronic evidence; the certificate is mandatory and cannot be substituted by oral evidence. Where the original device is produced, no certificate is required."
    },
    {
      n: "Arjun Panditrao Khotkar v. Kailash Gorantyal",
      c: "(2020) 7 SCC 1",
      h: "Three judges overruled Shafhi Mohammad, restored Anvar, and held the certificate mandatory. A party unable to obtain it may apply to the court to summon it. The certificate may be produced at any stage before the trial concludes, in the court's discretion."
    },
    {
      n: "Aveek Sarkar v. State of West Bengal",
      c: "(2014) 4 SCC 257",
      h: "Discarded the Hicklin test for obscenity and adopted contemporary community standards. Material is judged as a whole, in context, from the standpoint of an average person. Nudity alone is not obscenity."
    },
    {
      n: "Sharat Babu Digumarti v. Govt of NCT of Delhi",
      c: "(2017) 2 SCC 18",
      h: "Where obscene material is in electronic form, section 67 of the IT Act is the special provision and overrides section 292 IPC by operation of section 81. The accused could not be prosecuted under the general penal provision."
    },
    {
      n: "Christian Louboutin SAS v. Nakul Bajaj",
      c: "2018 SCC OnLine Del 12215",
      h: "Listed the activities that convert an e-commerce marketplace from a passive conduit into an active participant — identifying sellers, warehousing, authenticating, guaranteeing, promoting. Enough of them, and section 79 safe harbour is lost."
    },
    {
      n: "MySpace Inc. v. Super Cassettes Industries",
      c: "2016 SCC OnLine Del 6382",
      h: "Division Bench held that automated processing of content for format and advertisement insertion is not \"modification\" that defeats safe harbour. Actual knowledge for copyright purposes requires specific identification of the infringing material, not a general notice."
    },
    {
      n: "Anuradha Bhasin v. Union of India",
      c: "(2020) 3 SCC 637",
      h: "Internet shutdown orders must be published, must record reasons, must be proportionate and limited in duration, and are subject to periodic review and to judicial review. Freedom of trade through the internet is protected under Article 19(1)(g)."
    },
    {
      n: "State of Tamil Nadu v. Suhas Katti",
      c: "CC No. 4680 of 2004, Egmore",
      h: "The first conviction in India under section 67 of the IT Act, obtained within about seven months of the charge sheet. Obscene messages about a divorced woman were posted in a Yahoo group. Significant as a procedural landmark for speed and for reliance on electronic records."
    },
    {
      n: "CBI v. Arif Azim (Sony Sambandh)",
      c: "Delhi, 2003",
      h: "First reported cybercrime conviction in India. A call centre employee used stolen credit card details to order goods. Convicted of cheating under the IPC; the court noted the IT Act did not then cover the conduct comprehensively, and released him on probation given his age."
    },
    {
      n: "Shafhi Mohammad v. State of Himachal Pradesh",
      c: "(2018) 2 SCC 801",
      h: "Relaxed the section 65B certificate where the party did not possess the device, reasoning that procedure should not defeat justice. Overruled by Arjun Panditrao in 2020. Learn it as the wrong turn in the line, because examiners ask what happened to it."
    }
  ];

  var VOL_LEN = 8;
  var COC_LEN = 8;
  var POINT_RULES = { moduleComplete: 50, drillCorrect: 10, labCorrect: 5, simPoint: 10, caseReviewed: 5 };

  var DEFAULT_STATE = {
    profile: "Aarav Mehta",
    done: { access: true, identity: true, obscene: true, dpdp: true, evidence: true },
    scores: { access: 3, identity: 2, obscene: 3, dpdp: 2, evidence: 3, vol: 8, coc: 8, "sim-exfil": 7, "sim-mule": 5 },
    flipped: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true },
    videos: {
      access: "https://www.youtube.com/watch?v=cQYACLLAPOw",
      identity: "https://vimeo.com/76979871",
      evidence: "https://drive.google.com/file/d/1yKbrlk-2yuzVTX3P33kKEV4wMoJRMwMW/view",
      dpdp: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    },
    board: [
      { name: "Meera Nair", points: 710, modules: 7, cases: 12, updatedAt: 1761000000000 },
      { name: "Aarav Mehta", points: 620, modules: 5, cases: 8, updatedAt: 1761001200000 },
      { name: "Rohan Iyer", points: 540, modules: 5, cases: 10, updatedAt: 1760998000000 },
      { name: "Ishita Rao", points: 480, modules: 4, cases: 9, updatedAt: 1760995000000 },
      { name: "Kabir Sethi", points: 300, modules: 3, cases: 5, updatedAt: 1760990000000 }
    ],
    theme: "light"
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function defaultState() {
    return clone(DEFAULT_STATE);
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(DEMO_KEY);
      if (!raw) return defaultState();
      var parsed = JSON.parse(raw);
      var base = defaultState();
      return {
        profile: typeof parsed.profile === "string" ? parsed.profile : base.profile,
        done: parsed.done && typeof parsed.done === "object" ? parsed.done : {},
        scores: parsed.scores && typeof parsed.scores === "object" ? parsed.scores : {},
        flipped: parsed.flipped && typeof parsed.flipped === "object" ? parsed.flipped : {},
        videos: parsed.videos && typeof parsed.videos === "object" ? parsed.videos : {},
        board: Array.isArray(parsed.board) ? parsed.board : [],
        theme: parsed.theme === "dark" ? "dark" : "light"
      };
    } catch (error) {
      return defaultState();
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(DEMO_KEY, JSON.stringify(state));
    } catch (error) {
      /* file:// or private mode may refuse storage; the page still works in memory. */
    }
  }

  function resetDemo() {
    try {
      localStorage.removeItem(DEMO_KEY);
    } catch (error) {}
    location.reload();
  }

  function clearProgress(state) {
    return Object.assign({}, state, { done: {}, scores: {}, flipped: {}, board: [] });
  }

  function toast(message, kind) {
    var host = document.getElementById("toast-host");
    if (!host) return;
    var node = document.createElement("div");
    node.className = "toast" + (kind === "error" ? " error" : "");
    node.textContent = message;
    host.appendChild(node);
    setTimeout(function () {
      node.style.opacity = "0";
      node.style.transform = "translateY(4px)";
      setTimeout(function () { node.remove(); }, 180);
    }, 2600);
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function providerOf(raw) {
    var value = String(raw || "");
    if (/youtu\.?be/i.test(value)) return { label: "YouTube", kind: "frame" };
    if (/vimeo\.com/i.test(value)) return { label: "Vimeo", kind: "frame" };
    if (/drive\.google\.com/i.test(value)) return { label: "Google Drive", kind: "frame" };
    if (/\.(mp4|webm|ogg)(\?|$)/i.test(value)) return { label: "Direct file", kind: "file" };
    return { label: "Embed", kind: "frame" };
  }

  function embedUrl(raw) {
    var value = String(raw || "").trim();
    if (!value) return null;
    if (/^https?:\/\/\S+\.(mp4|webm|ogg)(\?\S*)?$/i.test(value)) return { kind: "file", src: value };
    var match;
    if ((match = value.match(/(?:youtube\.com\/(?:watch\?(?:\S*&)?v=|embed\/|live\/|shorts\/)|youtu\.be\/)([\w-]{11})/))) {
      return { kind: "frame", src: "https://www.youtube-nocookie.com/embed/" + match[1] + "?rel=0" };
    }
    if ((match = value.match(/vimeo\.com\/(?:video\/)?(\d+)/))) {
      return { kind: "frame", src: "https://player.vimeo.com/video/" + match[1] };
    }
    if ((match = value.match(/drive\.google\.com\/file\/d\/([\w-]+)/))) {
      return { kind: "frame", src: "https://drive.google.com/file/d/" + match[1] + "/preview" };
    }
    if (/^https?:\/\//i.test(value)) return { kind: "frame", src: value };
    return null;
  }

  function finite(value) {
    return typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : 0;
  }

  function completedModules(state) {
    return MODULES.reduce(function (n, module) { return n + (state.done && state.done[module.id] ? 1 : 0); }, 0);
  }

  function reviewedCases(state) {
    return CASES.reduce(function (n, item, index) { return n + (state.flipped && state.flipped[index] ? 1 : 0); }, 0);
  }

  function pointRows(state) {
    var moduleDone = MODULES.reduce(function (n, module) { return n + (state.done && state.done[module.id] ? POINT_RULES.moduleComplete : 0); }, 0);
    var moduleMax = MODULES.length * POINT_RULES.moduleComplete;
    var drillDone = MODULES.reduce(function (n, module) {
      return n + Math.min(finite(state.scores && state.scores[module.id]), module.quiz) * POINT_RULES.drillCorrect;
    }, 0);
    var drillMax = MODULES.reduce(function (n, module) { return n + module.quiz; }, 0) * POINT_RULES.drillCorrect;
    var vol = Math.min(finite(state.scores && state.scores.vol), VOL_LEN);
    var coc = Math.min(finite(state.scores && state.scores.coc), COC_LEN);
    var labDone = (vol + coc) * POINT_RULES.labCorrect;
    var labMax = (VOL_LEN + COC_LEN) * POINT_RULES.labCorrect;
    var simDone = SIMS.reduce(function (n, sim) {
      var max = sim.steps * 2;
      return n + Math.min(finite(state.scores && state.scores["sim-" + sim.id]), max) * POINT_RULES.simPoint;
    }, 0);
    var simMax = SIMS.reduce(function (n, sim) { return n + sim.steps * 2; }, 0) * POINT_RULES.simPoint;
    var cases = reviewedCases(state);
    return [
      { id: "modules", label: "Modules completed", earned: moduleDone, max: moduleMax, detail: completedModules(state) + " of " + MODULES.length + " × " + POINT_RULES.moduleComplete + " pts" },
      { id: "drills", label: "Drill answers", earned: drillDone, max: drillMax, detail: (drillDone / POINT_RULES.drillCorrect) + " correct × " + POINT_RULES.drillCorrect + " pts" },
      { id: "labs", label: "Lab checks", earned: labDone, max: labMax, detail: "Volatility " + vol + "/" + VOL_LEN + " · chain " + coc + "/" + COC_LEN + " × " + POINT_RULES.labCorrect + " pts" },
      { id: "sims", label: "Investigation points", earned: simDone, max: simMax, detail: "Simulation score × " + POINT_RULES.simPoint + " pts" },
      { id: "cases", label: "Case cards reviewed", earned: cases * POINT_RULES.caseReviewed, max: CASES.length * POINT_RULES.caseReviewed, detail: cases + " of " + CASES.length + " × " + POINT_RULES.caseReviewed + " pts" }
    ];
  }

  function computePoints(state) {
    return pointRows(state).reduce(function (n, row) { return n + row.earned; }, 0);
  }

  function maxPoints() {
    return pointRows({
      done: MODULES.reduce(function (o, module) { o[module.id] = true; return o; }, {}),
      scores: MODULES.reduce(function (o, module) { o[module.id] = module.quiz; return o; }, {
        vol: VOL_LEN,
        coc: COC_LEN,
        "sim-exfil": 8,
        "sim-mule": 8,
        "sim-platform": 8
      }),
      flipped: CASES.reduce(function (o, item, index) { o[index] = true; return o; }, {})
    }).reduce(function (n, row) { return n + row.max; }, 0);
  }

  var LEVELS = [
    { min: 0, name: "Junior clerk" },
    { min: 200, name: "Associate" },
    { min: 450, name: "Junior counsel" },
    { min: 750, name: "Senior counsel" },
    { min: 1000, name: "Silk" }
  ];

  function levelFor(points) {
    var index = 0;
    for (var i = 0; i < LEVELS.length; i++) {
      if (points >= LEVELS[i].min) index = i;
    }
    var current = LEVELS[index];
    var next = LEVELS[index + 1] || null;
    return {
      level: index + 1,
      name: current.name,
      min: current.min,
      next: next ? next.min : null,
      progress: next ? Math.min(1, (points - current.min) / (next.min - current.min)) : 1
    };
  }

  function badgesFor(state) {
    var modules = completedModules(state);
    var cases = reviewedCases(state);
    var points = computePoints(state);
    var drillScores = MODULES.map(function (module) { return finite(state.scores && state.scores[module.id]); });
    var simScores = SIMS.map(function (sim) { return finite(state.scores && state.scores["sim-" + sim.id]); });
    var perfectDrill = MODULES.some(function (module, index) { return drillScores[index] === module.quiz; });
    var allDrills = drillScores.filter(function (n) { return n > 0; }).length;
    var firstSim = simScores.some(function (n, index) { return n > 0 || (state.scores && state.scores["sim-" + SIMS[index].id] !== undefined); });
    var allSims = SIMS.filter(function (sim) { return state.scores && state.scores["sim-" + sim.id] !== undefined; }).length;
    var perfectSim = SIMS.some(function (sim, index) { return simScores[index] === sim.steps * 2; });
    function badge(id, name, description, tone, progress, target, mark) {
      return {
        id: id, name: name, description: description, tone: tone,
        earned: progress >= target, progress: Math.min(progress, target), target: target, mark: mark
      };
    }
    return [
      badge("first-module", "First authority", "Complete one statutory module.", "teal", modules, 1, "I"),
      badge("five-modules", "Doctrine five", "Complete five of the nine modules.", "teal", modules, 5, "V"),
      badge("all-modules", "Nine of nine", "Complete every statutory module.", "teal", modules, 9, "IX"),
      badge("perfect-drill", "Clean drill", "Score 3/3 on any applied drill.", "amber", perfectDrill ? 1 : 0, 1, "3"),
      badge("all-drills", "Every drill sat", "Attempt the drill in every module.", "amber", allDrills, MODULES.length, "A"),
      badge("volatility", "Volatility order", "Sequence all eight sources correctly.", "navy", finite(state.scores && state.scores.vol), VOL_LEN, "8"),
      badge("custody", "Chain intact", "Build the full chain of custody correctly.", "navy", finite(state.scores && state.scores.coc), COC_LEN, "C"),
      badge("first-sim", "First verdict", "Finish one branching investigation.", "ox", firstSim ? 1 : 0, 1, "1"),
      badge("all-sims", "Three verdicts", "Finish all three investigations.", "ox", allSims, SIMS.length, "3"),
      badge("perfect-sim", "No ground given", "Score the maximum on any investigation.", "ox", perfectSim ? 1 : 0, 1, "M"),
      badge("ten-cases", "Case brief", "Review ten of the twelve authorities.", "amber", cases, 10, "X"),
      badge("all-cases", "Twelve authorities", "Review every landmark authority card.", "amber", cases, CASES.length, "XII"),
      badge("points-500", "Five hundred", "Reach 500 points.", "teal", points, 500, "500"),
      badge("points-1000", "One thousand", "Reach 1,000 points.", "ox", points, 1000, "1k")
    ];
  }

  function boardWithCurrent(state) {
    var rows = (state.board || []).slice();
    if (state.profile) {
      var name = state.profile.trim().toLowerCase();
      var existing = rows.filter(function (row) { return row.name.trim().toLowerCase() === name; })[0];
      rows = rows.filter(function (row) { return row.name.trim().toLowerCase() !== name; });
      rows.push({
        name: state.profile,
        points: computePoints(state),
        modules: completedModules(state),
        cases: reviewedCases(state),
        updatedAt: existing ? existing.updatedAt : Date.now()
      });
    }
    return rows.sort(function (a, b) { return b.points - a.points || a.name.localeCompare(b.name); });
  }

  function saveBoardEntry(state, name) {
    var clean = String(name || "").trim().slice(0, 60);
    if (!clean) return state;
    var entry = {
      name: clean,
      points: computePoints(state),
      modules: completedModules(state),
      cases: reviewedCases(state),
      updatedAt: Date.now()
    };
    var rows = (state.board || []).filter(function (row) { return row.name.trim().toLowerCase() !== clean.toLowerCase(); });
    rows.push(entry);
    rows.sort(function (a, b) { return b.points - a.points || a.name.localeCompare(b.name); });
    var next = Object.assign({}, state, { profile: clean, board: rows.slice(0, 25) });
    return next;
  }

  function exportPayload(state) {
    return JSON.stringify({
      app: "cyberlex",
      version: 1,
      exportedAt: new Date().toISOString(),
      state: state
    }, null, 2);
  }

  function parseImport(text) {
    var parsed;
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      throw new Error("That file is not valid JSON.");
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("The progress file must contain a JSON object.");
    }
    var raw = parsed.state && typeof parsed.state === "object" && !Array.isArray(parsed.state) ? parsed.state : parsed;
    var keys = ["done", "scores", "flipped", "videos", "profile", "board", "theme"];
    var found = keys.some(function (key) { return key in raw; });
    if (!found) throw new Error("No recognisable progress fields were found in that file.");
    function record(source, mapper) {
      var out = {};
      if (!source || typeof source !== "object" || Array.isArray(source)) return out;
      Object.keys(source).forEach(function (key) {
        var value = mapper(source[key]);
        if (value !== undefined) out[key] = value;
      });
      return out;
    }
    var scores = record(raw.scores, function (value) {
      return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.round(value)) : undefined;
    });
    var done = record(raw.done, function (value) { return typeof value === "boolean" ? value : undefined; });
    var flipped = record(raw.flipped, function (value) { return typeof value === "boolean" ? value : undefined; });
    var videos = record(raw.videos, function (value) {
      return typeof value === "string" && value.trim() ? value.trim().slice(0, 2048) : undefined;
    });
    var board = Array.isArray(raw.board) ? raw.board.filter(function (row) {
      return row && typeof row === "object" && typeof row.name === "string" && row.name.trim();
    }).map(function (row) {
      return {
        name: row.name.trim().slice(0, 60),
        points: finite(row.points),
        modules: finite(row.modules),
        cases: finite(row.cases),
        updatedAt: finite(row.updatedAt)
      };
    }).sort(function (a, b) { return b.points - a.points || a.name.localeCompare(b.name); }).slice(0, 25) : [];
    return {
      state: {
        done: done,
        scores: scores,
        flipped: flipped,
        videos: videos,
        profile: typeof raw.profile === "string" && raw.profile.trim() ? raw.profile.trim().slice(0, 60) : undefined,
        board: board,
        theme: raw.theme === "dark" ? "dark" : "light"
      },
      warnings: parsed.version > 1 ? ["The file was exported by a newer version; unknown fields were ignored."] : []
    };
  }

  function formatDate(value) {
    if (!value) return "—";
    try {
      return new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    } catch (error) {
      return "—";
    }
  }

  function downloadText(filename, text) {
    var blob = new Blob([text], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    var area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); } catch (error) {}
    area.remove();
    return Promise.resolve();
  }

  function setActiveNav() {
    var page = document.body.getAttribute("data-page");
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      if (link.getAttribute("data-nav") === page) link.classList.add("active");
    });
  }

  function initShell() {
    setActiveNav();
    var reset = document.querySelector("[data-reset-demo]");
    if (reset) {
      reset.addEventListener("click", function () {
        if (window.confirm("Reset the seeded P7 demo data? This clears the demo progress stored in this browser.")) resetDemo();
      });
    }
    var theme = document.querySelector("[data-theme-toggle]");
    if (theme) {
      theme.addEventListener("click", function () {
        var state = loadState();
        state.theme = state.theme === "dark" ? "light" : "dark";
        saveState(state);
        document.documentElement.setAttribute("data-theme", state.theme);
        theme.textContent = state.theme === "dark" ? "Light" : "Dark";
      });
    }
    var state = loadState();
    if (state.theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
  }

  window.CyberDemo = {
    DEMO_KEY: DEMO_KEY,
    MODULES: MODULES,
    SIMS: SIMS,
    CASES: CASES,
    VOL_LEN: VOL_LEN,
    COC_LEN: COC_LEN,
    POINT_RULES: POINT_RULES,
    DEFAULT_STATE: DEFAULT_STATE,
    loadState: loadState,
    saveState: saveState,
    resetDemo: resetDemo,
    clearProgress: clearProgress,
    toast: toast,
    escapeHtml: escapeHtml,
    providerOf: providerOf,
    embedUrl: embedUrl,
    computePoints: computePoints,
    pointRows: pointRows,
    maxPoints: maxPoints,
    completedModules: completedModules,
    reviewedCases: reviewedCases,
    levelFor: levelFor,
    badgesFor: badgesFor,
    boardWithCurrent: boardWithCurrent,
    saveBoardEntry: saveBoardEntry,
    exportPayload: exportPayload,
    parseImport: parseImport,
    formatDate: formatDate,
    downloadText: downloadText,
    copyText: copyText
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShell);
  } else {
    initShell();
  }
})();
