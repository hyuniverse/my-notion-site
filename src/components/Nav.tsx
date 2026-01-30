"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-nav shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-4">
        <Link href="/" className="group">
          <span className="text-foreground font-normal text-lg">Park Sehyun</span>
          <span className="block text-muted text-xs tracking-wider">Developer</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link
              href="#writing"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-300 relative group"
            >
              Writing
              <span className="absolute left-0 bottom-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
            </Link>
          </li>
          <li>
            <Link
              href="#projects"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-300 relative group"
            >
              Projects
              <span className="absolute left-0 bottom-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-300 relative group"
            >
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`w-6 h-px bg-foreground transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-px bg-foreground transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-px bg-foreground transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass-nav transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col px-6 py-4">
          <li>
            <Link
              href="#writing"
              className="block py-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Writing
            </Link>
          </li>
          <li>
            <Link
              href="#projects"
              className="block py-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="block py-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Nav;
