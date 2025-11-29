import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Internships = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const internships = [
    {
      role: "Software Developer Intern",
      company: "NTPC Limited",
      period: "June 2025 - July 2025",
      description:
        "Collaborated with a cross-functional team to develop an internal web application for AGM operations, improving UI responsiveness, optimizing navigation, and enhancing usability, accessibility, and workflow efficiency. Tech stack: HTML, CSS, JavaScript, React.js, Node.js.",
      image: "IMG_8988.JPG", // replace with your NTPC internship certificate/image
    },
    {
      role: "AI & ML for Real-World Problem Solving (Project Internship)",
      company: "Lovely Professional University",
      period: "June 2025 - July 2025",
      description:
        "Built an AI-powered emotional support system using NLP and user-centered design, improving conversational accuracy and digital interaction relevance through iterative testing and multi-round usability evaluation. Tech stack: Python, FastAPI, NLP models (HuggingFace), React.js.",
      image: "CERTIFICATE.jpeg", // replace with your AI & ML internship certificate/image
    },
    {
      role: "Industrial Training Intern (Networking & Systems)",
      company: "Northern Coalfields Limited",
      period: "July 2024 - August 2024",
      description:
        "Learned communication infrastructure deployment and real-time operational systems while understanding reliability, safety, and optimization critical to secure system performance.",
      image: "IMG_8990.jpg", // replace with your NCL internship certificate/image
    },
    {
      role: "Machine Learning Intern",
      company: "Prodigy InfoTech",
      period: "July 2024",
      description:
        "Successfully completed a 1-month internship in Machine Learning, working on ML projects and gaining hands-on experience with machine learning algorithms and applications.",
      image: "M.png", // replace with your Prodigy InfoTech Machine Learning internship certificate/image
    },
  ];

  return (
    <section id="internships" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Internship{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A snapshot of the internships where I applied my skills to real-world
            problems and learned from industry mentors.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {internships.map((item, index) => (
              <Dialog key={item.role + item.company}>
                <DialogTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="cursor-pointer bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all hover:shadow-card"
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={item.image}
                        alt={`${item.company} internship`}
                        className={`w-full h-full object-cover ${
                          index === 0 ? "object-top" : ""
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                    </div>
                    <div className="p-6 relative z-10">
                      <div className="flex items-baseline justify-between mb-2">
                        <h3 className="text-2xl font-bold">{item.role}</h3>
                        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {item.period}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        {item.company}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <img
                    src={item.image}
                    alt={`${item.company} internship full view`}
                    className="w-full h-auto object-contain max-h-[80vh]"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Internships;


