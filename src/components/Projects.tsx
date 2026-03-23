import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import MLA from "@/assets/MLA.jpg";
import projectMusic from "@/assets/project-music.jpg";
import Portfolio from "@/assets/portfolio.jpg";
import Recom from "@/assets/recom.jpg";

type ProjectCategory = "All" | "ML" | "Web" | "Music" ;

const Projects = () => {
  const ref = useRef(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const [showAll, setShowAll] = useState(false);

  const handleFilterChange = (category: ProjectCategory) => {
    setFilter(category);
    setShowAll(false);
  };

  const handleToggleShowAll = () => {
    const wasShowingAll = showAll;
    setShowAll((prev) => !prev);
    if (wasShowingAll && buttonRef.current) {
      setTimeout(() => {
        buttonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  const projects = [
    {
      title: "Municipal Law Assistant",
      description: "AI chatbot that detects emotional signals and generates context-appropriate responses using LLMs",
      image: MLA,
      category: "ML",
      tags: ["Python", "FastAPI", "NLP", "LLM"],
      github: "https://github.com/Shloknanhoriya/municipal-law-assistant",
      demo: "https://municipal-law-assistant.vercel.app/",
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing projects, skills, and professional experience",
      image: Portfolio,
      category: "Web",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/Shloknanhoriya/Shlok-Nexus",
      demo: "https://shlok-nexus.vercel.app/",
    },
    {
      title: "Vocational Training Recommender",
      description: "Website for recommending vocational training programs based on user interests and local availability",
      image: Recom,
      category: "ML",
      tags: ["React", "Node.js", "REST APIs"],
      github: "https://github.com/Shloknanhoriya/Recommend-Vocational-Course",
      demo: "https://vocational-course-recommender.streamlit.app",
    },
    {
      title: "AI Music Generator",
      description: "Machine learning model that generates original music compositions when given a Lyrics input",
      image: projectMusic,
      category: "Music",
      tags: ["Python", "MIDI", "ML"],
      github: "https://github.com/Shloknanhoriya/SonicForge-AI",
      demo: "#",
    },
  ];

  const categories: ProjectCategory[] = ["All", "ML", "Web", "Music"];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const visibleProjects =
    filter === "All" && !showAll ? filteredProjects.slice(0, 4) : filteredProjects;

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-center text-gray-900 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Explore my portfolio of innovative projects spanning AI, web development, music, and machine learning
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "glass"}
                onClick={() => handleFilterChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all hover:shadow-glow"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-900 dark:text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => project.demo !== "#" && window.open(project.demo, "_blank")}
                      disabled={project.demo === "#"}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {project.demo === "#" ? "Coming Soon" : "Demo"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filter === "All" && filteredProjects.length > 4 && (
            <div ref={buttonRef} className="text-center mt-8">
              <Button variant="glass" onClick={handleToggleShowAll}>
                {showAll ? "Show fewer projects" : "Show more projects"}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;