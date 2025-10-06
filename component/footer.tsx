import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-muted text-foreground py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-between gap-8">
        {/* Left: Brand */}
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-2xl font-bold ">MyBlog</h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Sharing thoughts, tutorials, and stories about web development,
            technology, and design.
          </p>
        </div>

        {/* Middle: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold  mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:underline transition">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline transition">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Social Links */}
        <div>
          <h3 className="text-lg font-semibold  mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              className="hover:underline transition"
            >
              <FaTwitter size={22} />
            </a>
            <a href="https://github.com" className="hover:underline transition">
              <FaGithub size={22} />
            </a>
            <a
              href="https://linkedin.com"
              className="hover:underline transition"
            >
              <FaLinkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t  mt-10 pt-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
}
