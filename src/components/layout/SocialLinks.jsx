"use client";

import { FaLinkedin } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <a
        href="https://www.linkedin.com/in/ramón-cuevas-martínez-94a216a3/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
      >
        <FaLinkedin className="text-xl text-stone-400" />
        <span>Ramón Cuevas Martínez</span>
      </a>
    </div>
  );
}

