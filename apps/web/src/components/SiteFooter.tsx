export function SiteFooter() {
  return (
    <footer
      className="mx-auto w-full max-w-[1180px] border-t px-5 py-8 text-[0.82rem]"
      style={{ borderColor: "var(--rule)", color: "var(--muted)" }}
    >
      <p>
        <b style={{ color: "var(--text)" }}>CyberLex</b> is a teaching studio for law students.
        Statutory references follow the Information Technology Act 2000, the Digital Personal Data
        Protection Act 2023, the Bharatiya Sakshya Adhiniyam 2023 and the Bharatiya Nagarik
        Suraksha Sanhita 2023 as understood at the time of writing. Provisions are amended and
        rules are notified frequently, and case law moves. Nothing here is legal advice. Always
        read the bare act on India Code and the judgment in full before relying on any proposition.
      </p>
    </footer>
  );
}
