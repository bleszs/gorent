"use client";

const QUICK_LINKS = ["Fleet", "Pricing", "Destinations", "About", "Contact"];
const SOCIAL_LINKS = ["Instagram", "Twitter", "YouTube"];

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 px-6 pb-12 pt-24 md:px-10 md:pt-32">
      <div className="mx-auto w-full max-w-7xl">
        {/* Statement mewah + newsletter */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-6xl font-bold leading-[0.95] tracking-tighter md:text-8xl">
              Let&apos;s
              <br />
              <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                ride.
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="mb-6 max-w-sm font-body text-white/50">
              Join the inner circle. Early access to new arrivals and private
              member rates.
            </p>
            <form
              className="group relative flex items-center border-b border-white/20 pb-3 transition-colors duration-500 focus-within:border-luxury-gold"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                aria-label="Email address"
                className="w-full bg-transparent font-body text-lg text-white placeholder:text-white/30 focus:outline-none"
              />
              <button
                type="submit"
                className="ml-4 shrink-0 font-ui text-sm uppercase tracking-widest text-white/70 transition-all duration-500 ease-out hover:text-luxury-gold"
              >
                Subscribe →
              </button>
            </form>
          </div>
        </div>

        {/* Baris tautan */}
        <div className="mt-24 flex flex-col gap-10 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
          <span className="font-display text-2xl font-bold tracking-tighter">
            GORENT
          </span>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {QUICK_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="font-ui text-sm text-white/60 transition-colors duration-500 ease-out hover:text-white"
              >
                {link}
              </a>
            ))}
          </nav>

          <nav className="flex gap-x-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="font-ui text-sm text-white/40 transition-colors duration-500 ease-out hover:text-luxury-gold"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <p className="mt-12 font-ui text-xs uppercase tracking-widest text-white/30">
          © {new Date().getFullYear()} GORENT — Premium Car &amp; Motorcycle
          Rental. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
