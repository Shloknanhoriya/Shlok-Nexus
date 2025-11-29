import React from "react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react"; // if using lucide-react icons

export default function Contact() {
  const SOCIAL_LINKS = [
    {
      id: "github",
      name: "GitHub",
      icon: <Github size={24} />,
      href: "https://github.com/Shloknanhoriya",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <Linkedin size={24} />,
      href: "https://www.linkedin.com/in/shlok-nanhoriya/",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <Instagram size={24} />,
      href: "https://www.instagram.com/shloknanhoriya_/",
    },
    {
      id: "email",
      name: "Email",
      icon: <Mail size={24} />,
      href: "#contact-form", // scroll to the form section
    },
  ];

  return (
    <section id="contact" className="px-6 py-20 text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Get In <span className="text-gradient">Touch</span>
        </h2>
        <p className="text-center text-gray-400 mb-10">
          Have a project in mind or just want to chat? Feel free to reach out!
        </p>

        {/* Contact Form */}
        <div className="grid md:grid-cols-2 gap-8">
          <form
            id="contact-form"
            className="flex flex-col space-y-4 bg-gray-900 p-6 rounded-xl shadow-lg"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sending will be handled via API (Step 2).");
            }}
          >
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
                className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                required
                className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                rows={4}
                required
                className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white py-3 rounded-lg font-semibold transition"
            >
              Send Message
            </button>
          </form>

          {/* Social Links Section */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-4">
            <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>

            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                {...(link.id !== "email"
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex items-center gap-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                <div className="text-purple-400">{link.icon}</div>
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
