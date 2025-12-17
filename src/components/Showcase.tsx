import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot } from "lucide-react";
import { shlokProfile } from "@/data/shlok-profile";

type Message = {
  role: "user" | "bot";
  text: string;
};

const Showcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I'm an AI assistant. Ask me anything about Shlok — his skills, projects, internships, or education.",
    },
  ]);
  const [input, setInput] = useState("");

  // 🧠 REAL AI LOGIC (Phase 2)
  const getAIResponse = (question: string): string => {
    const q = question.toLowerCase();

    if (q.includes("who") || q.includes("about")) {
      return `I am ${shlokProfile.personal.name}, a ${shlokProfile.personal.role} based in ${shlokProfile.personal.location}.`;
    }

    if (q.includes("skill")) {
      return `Shlok is skilled in ${shlokProfile.skills.languages.join(
        ", "
      )} and works with frameworks like ${shlokProfile.skills.frameworks.join(
        ", "
      )}.`;
    }

    if (q.includes("project")) {
      return shlokProfile.projects
        .map((p) => `• ${p.name}: ${p.description}`)
        .join("\n");
    }

    if (q.includes("intern") || q.includes("experience")) {
      return shlokProfile.internships
        .map(
          (i) => `• ${i.role} at ${i.organization} (${i.duration})`
        )
        .join("\n");
    }

    if (q.includes("certificate")) {
      return `Shlok has earned certifications including:\n${shlokProfile.certificates
        .map((c) => `• ${c}`)
        .join("\n")}`;
    }

    if (q.includes("education")) {
      return shlokProfile.education
        .map(
          (e) =>
            `• ${e.degree || e.level} at ${e.institute}`
        )
        .join("\n");
    }

    if (q.includes("contact") || q.includes("email")) {
      return `You can contact Shlok via email at ${shlokProfile.personal.email} or connect on LinkedIn.`;
    }

    return "You can ask me about Shlok’s skills, projects, internships, certificates, or education.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);

    const response = getAIResponse(input);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: response },
      ]);
    }, 500);

    setInput("");
  };

  return (
    <section id="showcase" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Interactive{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>

          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Try out this AI chatbot demo — it knows everything about me.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden shadow-elegant"
          >
            <div className="bg-gradient-primary p-4 flex items-center gap-3">
              <Bot className="h-6 w-6 text-white" />
              <h3 className="text-white font-semibold">
                AI Assistant Demo
              </h3>
            </div>

            <div className="p-6 h-80 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: msg.role === "user" ? 20 : -20,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-border/50">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSend()
                  }
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
