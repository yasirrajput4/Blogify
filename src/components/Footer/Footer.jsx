import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

// Moved outside the component to avoid rebuilding on every render
const COLUMNS = [
  {
    title: "Company",
    links: ["Features", "Pricing", "Affiliate Program", "Press Kit"],
  },
  {
    title: "Support",
    links: ["Account", "Help", "Contact Us", "Customer Support"],
  },
  {
    title: "Legals",
    links: ["Terms & Conditions", "Privacy Policy", "Licensing"],
  },
];

/**
 * Footer — same four-column structure and link list as before, restyled
 * onto the paper/ink palette with a hairline top rule instead of a heavy
 * border. No links, hrefs, or copy content removed.
 */
function Footer() {
  return (
    <footer className="border-t border-rule bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-wrap gap-y-10">
          {/* Brand column */}
          <div className="w-full lg:w-5/12">
            <Logo width="110px" />
            <p className="mt-4 text-sm text-clay max-w-xs">
              A quiet place to write, read, and think out loud.
            </p>
            <p
              className="mt-8 text-xs font-mono text-clay/70"
              suppressHydrationWarning={true}
            >
              © {new Date().getFullYear()} Blogify. All rights reserved.
            </p>
          </div>

          {/* Link columns */}
          <div className="w-full lg:w-7/12 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-clay">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        to="/"
                        className="text-sm text-ink-soft hover:text-terracotta transition-colors duration-150"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
