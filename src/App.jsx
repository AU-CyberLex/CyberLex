import { useEffect, useState } from "react";

const STORAGE_KEY = "cyberlex-p5-state-v1";

const initialState = {
  scores: { coc: null, cert: null, toolkit: null },
  certificateAttempted: false,
  evidence: [],
  toolkitCompleted: false
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
  } catch {
    return initialState;
  }
}

const labs = [
  { id: "coc", label: "Lab 4", title: "Chain of Custody" },
  { id: "cert", label: "Lab 5", title: "Certificate Clinic" },
  { id: "toolkit", label: "Lab 6", title: "Forensic Toolkit" }
];

function App() {
  const [appState, setAppState] = useState(loadState);
  const [activeLab, setActiveLab] = useState("coc");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }, [appState]);

  function saveScore(lab, score) {
    setAppState((current) => ({
      ...current,
      scores: { ...current.scores, [lab]: score }
    }));
  }

  function addEvidence(item) {
    setAppState((current) => ({
      ...current,
      evidence: [...current.evidence, { ...item, id: Date.now() }]
    }));
  }

  function completeCertificate(score) {
    setAppState((current) => ({
      ...current,
      certificateAttempted: true,
      scores: { ...current.scores, cert: score }
    }));
  }

  function completeToolkit(score) {
    setAppState((current) => ({
      ...current,
      toolkitCompleted: true,
      scores: { ...current.scores, toolkit: score }
    }));
  }

  const totalScore = Object.values(appState.scores).reduce(
    (sum, value) => sum + (typeof value === "number" ? value : 0),
    0
  );

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">CL</div>
        <div>
          <div className="brand-title">CyberLex</div>
          <div className="brand-subtitle">Digital Forensics Lab</div>
        </div>
        <div className="side-label">YOUR MODULES</div>
        <nav className="nav-list" aria-label="Lab navigation">
          {labs.map((lab) => (
            <button
              key={lab.id}
              className={`nav-item ${activeLab === lab.id ? "active" : ""}`}
              onClick={() => setActiveLab(lab.id)}
            >
              <span className="nav-number">{lab.label.replace("Lab ", "")}</span>
              <span>{lab.title}</span>
              {typeof appState.scores[lab.id] === "number" && (
                <span className="done-dot" title="Score saved">✓</span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <span className="status-dot" />
          <div>
            <strong>Progress saved</strong>
            <p>Your scores are stored in this browser.</p>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">CYBERLEX / PHASE 1 / P5</p>
            <h1>Evidence & Investigation Labs</h1>
          </div>
          <div className="score-card">
            <span>Total points</span>
            <strong>{totalScore} <small>/ 30</small></strong>
          </div>
        </header>

        <div className="lab-tabs">
          {labs.map((lab) => (
            <button
              key={lab.id}
              className={`tab ${activeLab === lab.id ? "selected" : ""}`}
              onClick={() => setActiveLab(lab.id)}
            >
              {lab.label}
            </button>
          ))}
        </div>

        {activeLab === "coc" && (
          <ChainOfCustody
            evidence={appState.evidence}
            score={appState.scores.coc}
            onAddEvidence={addEvidence}
            onSaveScore={(score) => saveScore("coc", score)}
          />
        )}
        {activeLab === "cert" && (
          <CertificateClinic
            attempted={appState.certificateAttempted}
            score={appState.scores.cert}
            onComplete={completeCertificate}
          />
        )}
        {activeLab === "toolkit" && (
          <ForensicToolkit
            completed={appState.toolkitCompleted}
            score={appState.scores.toolkit}
            onComplete={completeToolkit}
          />
        )}
        <footer className="footer">
          CyberLex • P5 Labs 4–6 <span>Demo module — connect to your team's backend when available.</span>
        </footer>
      </main>
    </div>
  );
}

function ChainOfCustody({ evidence, score, onAddEvidence, onSaveScore }) {
  const [form, setForm] = useState({
    evidenceName: "",
    collectedBy: "",
    collectedAt: "",
    notes: ""
  });
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [message, setMessage] = useState("");

  const steps = [
    "Record a unique evidence ID",
    "Record who collected the evidence",
    "Record date and time of collection",
    "Document each transfer or access"
  ];

  function submitEvidence(event) {
    event.preventDefault();
    if (!form.evidenceName.trim() || !form.collectedBy.trim() || !form.collectedAt) {
      setMessage("Please fill in evidence name, collector, and collection date/time.");
      return;
    }
    onAddEvidence(form);
    setForm({ evidenceName: "", collectedBy: "", collectedAt: "", notes: "" });
    setMessage("Evidence record saved.");
  }

  function finishChecklist() {
    const result = Math.round((checkedSteps.length / steps.length) * 10);
    onSaveScore(result);
    setMessage(`Checklist completed. Score saved: ${result}/10.`);
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <span className="pill">LAB 04</span>
          <h2>Chain of Custody</h2>
          <p className="muted">Maintain a clear record of who handled digital evidence and when.</p>
        </div>
        <div className="lab-icon">⌁</div>
      </div>

      <div className="info-banner">
        <strong>Objective</strong>
        <p>Preserve evidence integrity by documenting collection, handling, transfer, and storage.</p>
      </div>

      <div className="two-column">
        <div className="subpanel">
          <h3>New evidence record</h3>
          <form onSubmit={submitEvidence} className="form-stack">
            <label>Evidence name / ID
              <input value={form.evidenceName} onChange={(e) => setForm({ ...form, evidenceName: e.target.value })} placeholder="e.g. USB-001" />
            </label>
            <label>Collected by
              <input value={form.collectedBy} onChange={(e) => setForm({ ...form, collectedBy: e.target.value })} placeholder="Investigator name" />
            </label>
            <label>Date and time
              <input type="datetime-local" value={form.collectedAt} onChange={(e) => setForm({ ...form, collectedAt: e.target.value })} />
            </label>
            <label>Notes (optional)
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Condition, seal number, location…" rows="3" />
            </label>
            <button className="primary-button" type="submit">Save evidence record</button>
          </form>
          {message && <p className="inline-message" role="status">{message}</p>}
        </div>

        <div className="subpanel">
          <h3>Integrity checklist</h3>
          <p className="muted small">Select each step you would complete during evidence handling.</p>
          <div className="checklist">
            {steps.map((step, index) => (
              <label className="check-row" key={step}>
                <input
                  type="checkbox"
                  checked={checkedSteps.includes(index)}
                  onChange={(e) => setCheckedSteps((old) => e.target.checked ? [...old, index] : old.filter((n) => n !== index))}
                />
                <span>{step}</span>
              </label>
            ))}
          </div>
          <button className="primary-button" onClick={finishChecklist}>Submit checklist</button>
          <ScoreLine score={score} max={10} />
        </div>
      </div>

      <div className="subpanel evidence-list">
        <div className="list-heading">
          <div><h3>Saved evidence log</h3><p className="muted small">Records persist after refresh in this browser.</p></div>
          <span className="count-badge">{evidence.length} records</span>
        </div>
        {evidence.length === 0 ? (
          <div className="empty-state">No evidence records yet. Add your first record above.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Evidence</th><th>Collected by</th><th>Date / time</th><th>Notes</th></tr></thead>
              <tbody>
                {evidence.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.evidenceName}</strong></td>
                    <td>{item.collectedBy}</td>
                    <td>{item.collectedAt.replace("T", " ")}</td>
                    <td>{item.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function CertificateClinic({ attempted, score, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const questions = [
    {
      id: "q1",
      question: "What does a digital certificate primarily help verify?",
      options: ["The identity associated with a public key", "The size of a hard drive", "The speed of a network"],
      correct: 0
    },
    {
      id: "q2",
      question: "What should you check when validating a certificate?",
      options: ["Only the website colour", "Validity dates, issuer, and trust chain", "The keyboard layout"],
      correct: 1
    },
    {
      id: "q3",
      question: "What can an expired certificate indicate?",
      options: ["It needs validation or renewal", "The computer has no files", "The password is always stolen"],
      correct: 0
    }
  ];

  function submitQuiz(event) {
    event.preventDefault();
    if (attempted || submitted) return;
    const correctCount = questions.filter((q) => Number(answers[q.id]) === q.correct).length;
    const finalScore = Math.round((correctCount / questions.length) * 10);
    setSubmitted(true);
    onComplete(finalScore);
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <span className="pill">LAB 05</span>
          <h2>Certificate Clinic</h2>
          <p className="muted">Practice checking the basic trust and validity details of digital certificates.</p>
        </div>
        <div className="lab-icon">✓</div>
      </div>
      <div className="info-banner">
        <strong>Single-attempt rule</strong>
        <p>This demo locks the quiz after submission. The attempt status is saved in localStorage.</p>
      </div>

      {attempted ? (
        <div className="locked-state">
          <div className="lock-icon">🔒</div>
          <h3>Attempt completed</h3>
          <p>This quiz has already been submitted in this browser.</p>
          <ScoreLine score={score} max={10} />
          <p className="muted small">For a real assessment, enforce attempt limits on the server too. Browser storage can be cleared.</p>
        </div>
      ) : (
        <form onSubmit={submitQuiz} className="quiz-form">
          {questions.map((q, index) => (
            <fieldset className="question-card" key={q.id}>
              <legend>{index + 1}. {q.question}</legend>
              {q.options.map((option, optionIndex) => (
                <label className="option-row" key={option}>
                  <input
                    type="radio"
                    name={q.id}
                    value={optionIndex}
                    checked={answers[q.id] === String(optionIndex)}
                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                    required
                  />
                  <span>{option}</span>
                </label>
              ))}
            </fieldset>
          ))}
          <button className="primary-button" type="submit">Submit final attempt</button>
          {submitted && <p className="inline-message">Your score has been saved.</p>}
        </form>
      )}
    </section>
  );
}

function ForensicToolkit({ completed, score, onComplete }) {
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState([]);
  const [feedback, setFeedback] = useState("");
  const benches = [
    {
      id: "hash",
      title: "Hash verification",
      help: "Compare the hash of the acquired copy with the recorded original hash. A mismatch may indicate a changed file or a different acquisition."
    },
    {
      id: "timeline",
      title: "Timeline review",
      help: "Check timestamps, time zones, and the source of each event. Do not assume every device clock is accurate."
    },
    {
      id: "export",
      title: "Report export",
      help: "Include the case ID, evidence identifiers, tools used, relevant findings, and limitations. Avoid exposing unrelated personal data."
    }
  ];

  function finishToolkit() {
    const result = Math.round((checked.length / benches.length) * 10);
    onComplete(result);
    setFeedback(`Toolkit review completed. Score saved: ${result}/10.`);
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <span className="pill">LAB 06</span>
          <h2>Forensic Toolkit</h2>
          <p className="muted">Review common digital-forensics tasks and open the help text for each bench.</p>
        </div>
        <div className="lab-icon">⌘</div>
      </div>
      <div className="info-banner">
        <strong>Mobile-friendly toolkit</strong>
        <p>Cards and controls resize for smaller screens. Select a bench to view its cross-exam help.</p>
      </div>

      <div className="toolkit-grid">
        {benches.map((bench, index) => (
          <button
            key={bench.id}
            className={`tool-card ${selected === bench.id ? "tool-selected" : ""}`}
            onClick={() => setSelected(bench.id)}
          >
            <span className="tool-number">0{index + 1}</span>
            <strong>{bench.title}</strong>
            <span className="tool-link">Open help ↗</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="help-panel">
          <div>
            <span className="pill">CROSS-EXAM HELP</span>
            <h3>{benches.find((bench) => bench.id === selected)?.title}</h3>
            <p>{benches.find((bench) => bench.id === selected)?.help}</p>
          </div>
          <button className="secondary-button" onClick={() => setSelected("")}>Close help</button>
        </div>
      )}

      <div className="subpanel toolkit-check">
        <h3>Bench completion</h3>
        <p className="muted small">Mark the activities reviewed during this practice session.</p>
        {benches.map((bench) => (
          <label className="check-row" key={bench.id}>
            <input
              type="checkbox"
              checked={checked.includes(bench.id)}
              onChange={(e) => setChecked((old) => e.target.checked ? [...old, bench.id] : old.filter((id) => id !== bench.id))}
            />
            <span>{bench.title} reviewed</span>
          </label>
        ))}
        <button className="primary-button" onClick={finishToolkit}>Save toolkit progress</button>
        {feedback && <p className="inline-message" role="status">{feedback}</p>}
        {completed && <ScoreLine score={score} max={10} />}
      </div>
    </section>
  );
}

function ScoreLine({ score, max }) {
  if (typeof score !== "number") {
    return <p className="score-line muted">No score submitted yet.</p>;
  }
  return (
    <p className="score-line">
      <span>Saved score</span>
      <strong>{score}/{max}</strong>
    </p>
  );
}

export default App;