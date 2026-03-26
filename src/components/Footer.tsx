import { Heart } from "lucide-react";

const Footer = ({ highlightEmail }: any) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Music", href: "#music" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">
              Shlok Nanhoriya
            </h3>
            <p className="text-gray-900 dark:text-gray-400 hover:text-primary transition-colors text-sm">
              AI & ML Engineer • Musician • Creator
            </p>
            <p className="text-xs text-gray-500 mt-1">
  🎓 B.Tech CSE – Lovely Professional University, Punjab <br />
  🏫 Matriculation & Higher Secondary – D.A.V Public School, Nigahi
</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
  href={link.href}
  className="text-gray-900 dark:text-gray-400 hover:text-primary transition-colors text-sm"
>

                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-3">Get In Touch</h4>
            <p
  className={`text-sm mb-2 transition-all duration-500 ${
    highlightEmail
      ? "text-primary scale-110 font-semibold"
      : "text-gray-900 dark:text-gray-400 hover:text-primary"
  }`}
>
  Email: nanhoriyashlok@gmail.com
</p>
            <p className="text-gray-900 dark:text-gray-400 hover:text-primary transition-colors text-sm">
              Based in India
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Shlok Nanhoriya. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" /> and lots of caffeine
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
