interface ContactPageBodyProps { headingLevel?: 1 | 2; }

export function ContactPageBody({ headingLevel = 1 }: ContactPageBodyProps) {
  return (
    <div data-reveal-section className={`bg-[var(--bg-primary)] px-6 pb-20 text-[#121212] sm:px-10 lg:px-[6vw] ${headingLevel === 2 ? 'pt-1 sm:pt-2 lg:pt-3' : 'pt-32'}`}>
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-[3vw]">
        <div className="lg:col-span-4">
          <h2 data-reveal className="text-xl text-[#121212]">Contact me</h2>
          <div className="mt-8 space-y-12">
            <div data-reveal><h2 className="text-xl text-[#121212]">Locations</h2><p className="mt-1">Vancouver<br /><span className="text-[#121212]">British Columbia</span></p><p className="mt-5">T&nbsp; +1 236 808 5229</p><a className="mt-1 inline-block border-b border-[#c9c9c6] hover:border-[#121212]" href="mailto:architectdeepvora@gmail.com">architectdeepvora@gmail.com</a></div>
            <div data-reveal><h2 className="text-xl text-[#121212]">Social</h2><a className="mt-1 inline-block border-b border-[#c9c9c6] hover:border-[#121212]" href="https://www.instagram.com/deepvora_/?hl=en" target="_blank" rel="noreferrer">Instagram</a><br /><a className="mt-2 inline-block border-b border-[#c9c9c6] hover:border-[#121212]" href="https://www.linkedin.com/in/deep-vora-143308109/" target="_blank" rel="noreferrer">LinkedIn</a></div>
          </div>
        </div>
        <section data-reveal className="rounded-4xl bg-[var(--bg-secondary)] px-6 py-9 text-center shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg sm:px-9 sm:py-11 lg:py-0 lg:h-[250px] lg:mt-16 lg:col-span-8 lg:col-start-5 lg:min-h-0 lg:w-full lg:flex lg:flex-col lg:items-center lg:justify-center motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0">
          <h2 className="text-[20px] font-semibold leading-[1.25] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[26px] lg:text-[30px]">Have a project in mind?<br />Drop me an email.</h2>
          <a className="mt-[20px] inline-block text-[13px] text-[var(--text-primary)] underline underline-offset-4 transition-opacity hover:opacity-60" href="mailto:architectdeepvora@gmail.com">architectdeepvora@gmail.com</a>
        </section>
      </section>

    </div>
  );
}

export function ContactPage() {
  return <main className="min-h-screen bg-[var(--bg-primary)]"><ContactPageBody /></main>;
}
