import { FaLinkedin} from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex gap-4 text-2xl">
      <a
        href="https://www.linkedin.com/in/ramón-cuevas-martínez-94a216a3/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 text-blue-600"
      >
        <FaLinkedin />
        </a>
    </div>
  );
}
