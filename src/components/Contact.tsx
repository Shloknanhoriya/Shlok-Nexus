import React, { useState } from "react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

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
      href: "https://www.instagram.com/musician_shlok/",
    },
    {
      id: "email",
      name: "Email",
      icon: <Mail size={24} />,
      href: "#contact-form",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const formObject = new FormData(form);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formObject,
    });

    const result = await res.json();

    if (result.success) {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="px-6 py-20 text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Get In <span className="text-gradient">Touch</span>
        </h2>
        <p className="text-center text-gray-400 mb-10">
          Have a project in mind or just want to chat? Feel free to reach out!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 bg-gray-900 p-6 rounded-xl shadow-lg"
          >
            <input type="hidden" name="access_key" value="e81a4e90-bf94-43bd-867a-4837a4fd9551" />

            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows={4}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
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
