import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import profileImg from "@/assets/profile.jpg";
import { GraduationCap, Music, Code, Cpu } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    {
      year: "2024",
      title: "AI & ML Journey",
      description: "Diving deep into machine learning and autonomous systems",
      icon: Cpu,
    },
    {
      year: "2023",
      title: "Full Stack Development",
      description: "Building modern web applications with cutting-edge tech",
      icon: Code,
    },
    {
      year: "2022",
      title: "Music Production",
      description: "Creating and producing original music compositions",
      icon: Music,
    },
    {
      year: "2021",
      title: "Engineering Studies",
      description: "Started my journey in technology and innovation",
      icon: GraduationCap,
    },
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-30 animate-pulse" />
                <img
                  src="/myphoto.JPG"
                  alt="Shlok Nanhoriya"
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-primary/20 shadow-glow"
                />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-lg text-foreground leading-relaxed">
                I'm a passionate AI & ML engineer in the making, combining my love for
                technology with creative expression through music. My journey bridges the gap
                between artificial intelligence, autonomous systems, and artistic innovation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not training neural networks or building intelligent systems, you'll
                find me composing music or exploring the intersection of technology and art.
                I believe in creating solutions that not only solve problems but inspire
                wonder.
              </p>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-24"
          >
            <h3 className="text-3xl font-bold text-center mb-12">
              My <span className="bg-gradient-primary bg-clip-text text-transparent">Journey</span>
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all hover:shadow-card"
                  >
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-sm text-primary font-semibold mb-2">{item.year}</div>
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
