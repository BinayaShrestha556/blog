"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { logoutAction } from "@/lib/actions";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    await logoutAction();
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="h-14 flex w-full items-center justify-between mx-auto px-5 md:w-[80%] fixed border-b top-0 left-0 right-0 bg-background z-50">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-tighter relative">
        <Image
          alt="logo"
          src="/binaya.logo.black.png"
          width={50}
          height={50}
          objectFit="contain"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 lg:gap-20">
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm px-2 py-1.5 focus:rounded-xl font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              className="text-sm px-2 py-1.5 focus:rounded-xl font-medium hover:text-primary transition-colors"
              href="https://binayashrestha0.com.np/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
          </li>
        </ul>
        <div className="flex gap-4 items-center">
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : user ? (
            <>
              <span className="text-sm text-muted-foreground">
                Welcome, {user.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm px-2 py-1.5 focus:outline-1 focus:rounded-xl font-medium hover:text-primary transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm px-2 py-1.5 focus:outline-1 focus:rounded-xl font-medium hover:text-primary transition-colors"
            >
              Login
            </Link>
          )}
          <Link
            href="/subscribe"
            className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Subscribe
          </Link>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 focus:outline-none   rounded-md"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-out ${
              isMenuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-out ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-out ${
              isMenuOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1.5"
            }`}
          />
        </div>
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-14 left-0 right-0 bg-background border-b transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {/* Navigation Links */}
          <div className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-base font-medium py-2 px-2 rounded-md hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              className="block text-base font-medium py-2 px-2 rounded-md hover:bg-muted transition-colors"
              href="https://binayashrestha0.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </a>
          </div>

          {/* Auth Links */}
          <div className="pt-4 border-t border-border space-y-3">
            {loading ? (
              <div className="text-base text-muted-foreground py-2 px-2">
                Loading...
              </div>
            ) : user ? (
              <>
                <div className="text-base text-muted-foreground py-2 px-2">
                  Welcome, {user.name || user.email}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-base font-medium py-2 px-2 rounded-md hover:bg-muted transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block text-base font-medium py-2 px-2 rounded-md hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
            <Link
              href="/subscribe"
              className="block w-full text-center text-base px-4 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0  bg-opacity-20 z-[-1]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
