import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Brain, Globe, Music } from "lucide-react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      icon: Code,
      title: "Programming",
      skills: ["Python", "JavaScript/TypeScript", "C++", "Java", "SQL"],
      color: "from-primary to-primary-glow",
    },
    {
      icon: Brain,
      title: "AI & ML",
      skills: ["TensorFlow", "PyTorch", "Neural Networks", "Computer Vision", "NLP"],
      color: "from-secondary to-accent",
    },
    {
      icon: Globe,
      title: "Web Development",
      skills: ["React", "Next.js", "Node.js", "Tailwind CSS", "REST APIs"],
      color: "from-accent to-primary",
    },
    {
      icon: Music,
      title: "Music Technology",
      skills: ["FL Studio", "Audio Production", "MIDI", "Sound Design", "Composition"],
      color: "from-secondary to-primary",
    },
  ];

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            My <span className="bg-gradient-primary bg-clip-text text-transparent">Skills</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all hover:shadow-glow"
                >
                  <div className={`bg-gradient-to-br ${category.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                  <div className="space-y-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="text-sm text-muted-foreground bg-muted/30 rounded-lg px-3 py-2"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
