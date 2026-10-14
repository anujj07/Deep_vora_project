interface LegalPageProps { type: 'privacy' | 'terms'; }

const content = {
  privacy: { title: 'Privacy Policy', intro: 'This portfolio collects only the information you choose to send when you contact Deep Vora.', sections: [['Information you provide', 'If you use the contact form, your name, email address, selected interest and message are prepared in your own email application. This website does not receive or store those details.'], ['Cookies and analytics', 'This website does not use analytics, advertising pixels, or non-essential cookies. A local browser preference may be used to remember the selected colour theme.'], ['Contact', 'For privacy questions, email architectdeepvora@gmail.com.']] },
  terms: { title: 'Terms of Use', intro: 'This portfolio is provided to share Deep Vora’s work and professional information.', sections: [['Portfolio content', 'Unless stated otherwise, portfolio content, images and written material may not be reproduced or used without permission.'], ['Information on this website', 'Project information is presented for general portfolio purposes and does not constitute professional advice, an offer, or a contract.'], ['Contact', 'For permission requests or questions about these terms, email architectdeepvora@gmail.com.']] },
} as const;

export function LegalPage({ type }: LegalPageProps) {
  const page = content[type];
  return <main className="min-h-screen bg-[var(--bg-primary)] px-5 pb-24 pt-32 text-[var(--text-primary)] sm:px-8 md:px-12 lg:px-20"><article className="mx-auto max-w-3xl"><p className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">Deep Vora / Legal</p><h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">{page.title}</h1><p className="mt-10 text-lg leading-relaxed text-[var(--text-secondary)]">{page.intro}</p><div className="mt-12 space-y-10">{page.sections.map(([heading, body]) => <section key={heading} className="border-t border-[var(--border-subtle)] pt-5"><h2 className="text-xl font-medium">{heading}</h2><p className="mt-3 leading-relaxed text-[var(--text-secondary)]">{body}</p></section>)}</div></article></main>;
}
