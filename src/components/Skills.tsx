import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Brain, Globe, Music, Trophy } from "lucide-react";

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
      skills: ["Numpy", "Pandas", "Neural Networks", "Computer Vision", "NLP"],
      color: "from-secondary to-accent",
    },
    {
      icon: Globe,
      title: "Web Development",
      skills: ["HTML", "React", "Node.js", "Tailwind CSS", "REST APIs"],
      color: "from-accent to-primary",
    },
    {
      icon: Music,
      title: "Soft Skills",
      skills: ["Communication", "Teamwork", "Time Management", "Problem Solving", "Adaptability"],
      color: "from-secondary to-primary",
    },
  ];

  const codingProfiles = [
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/ShlokNanhoriya/",
      color: "from-orange-500 to-yellow-500",
      logo: "https://leetcode.com/favicon.ico",
    },
    {
      name: "CodeChef",
      url: "https://www.codechef.com/users/shloknanhoriya",
      color: "from-amber-600 to-amber-400",
      logo: "https://www.codechef.com/favicon.ico",
    },
    {
      name: "Code360",
      url: "https://www.naukri.com/code360/profile/ShlokNanhoriya",
      color: "from-orange-600 to-red-400",
      logo: "https://www.naukri.com/favicon.ico",
    },
    {
      name: "HackerRank",
      url: "https://www.hackerrank.com/profile/nanhoriyashlok",
      color: "from-green-600 to-green-400",
      logo: "https://www.hackerrank.com/favicon.ico",
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
                        className="text-sm text-muted-foreground bg-muted/30 rounded-lg px-3 py-2
                        transition-all duration-300 transform
                        hover:scale-110 hover:bg-muted/50 hover:shadow-md cursor-pointer"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Coding Profiles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16 max-w-7xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Coding <span className="bg-gradient-primary bg-clip-text text-transparent">Profiles</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {codingProfiles.map((profile, index) => (
                <motion.a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all hover:shadow-glow flex flex-col items-center gap-3 cursor-pointer"
                >
                  <div className={`bg-gradient-to-br ${profile.color} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <img
                      src={profile.logo}
                      alt={profile.name}
                      className="w-6 h-6"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <span className="font-semibold text-sm">{profile.name}</span>
                  <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View Profile →
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Skills;