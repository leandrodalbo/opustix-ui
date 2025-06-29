import { FaDiscord, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-8 mt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Opustix. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://discord.gg/CE32y6frQy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
            aria-label="Discord"
          >
            <FaDiscord size={20} />
          </a>
          <a
            href="https://x.com/Opustix"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://www.youtube.com/@opustix"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
            aria-label="Youtube"
          >
            <FaYoutube size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
