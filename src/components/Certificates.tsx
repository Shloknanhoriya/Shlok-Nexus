import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Certificates = () => {
  const ref = useRef(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const certificates = [
    {
      title: "Object Oriented Programming (72 hours)",
      issuer: "Aug 2024 - Dec 2024",
      year: "2024",
      image: "CPP.png", // replace with your OOP certificate image path
    },
    {
      title: "Data Structures and Algorithm (72 hours)",
      issuer: "Aug 2024 - Dec 2024",
      year: "2024",
      image: "DSA.png", // replace with your DSA certificate image path
    },
    {
      title: "Introduction to Hardware and Operating Systems",
      issuer: "July 2024 - Sep 2024",
      year: "2024",
      image: "IBM.png", // replace with your Hardware & OS certificate image path
    },
    {
      title: "Hackathon: Code-a-Haunt (24-hour Competitive Hackathon, Team-based)",
      issuer: "Feb 2024 - Mar 2024",
      year: "2024",
      image: "Hackathon.png", // replace with your hackathon certificate image path
    },
    {
      title: "Responsive Web Design",
      issuer: "Aug 2023 - Nov 2023",
      year: "2023",
      image: "Web.png", // replace with your web design certificate image path
    },
    {
      title: "Infosys Computational Theory",
      issuer: "Infosys",
      year: "2024",
      image: "I.png", // replace with your Infosys computational theory certificate image path
    },
  ];

  const moreCertificates = [
    {
      title: "NPTEL Cloud Computing",
      issuer: "NPTEL",
      year: "Year",
      image: "Cloud.png",
    },
    {
      title: "Essentials Automation Professional",
      issuer: "Certification",
      year: "Year",
      image: "Automation.png",
    },
    {
      title: "Java Programming (72 hours)",
      issuer: "Course (72 hours)",
      year: "Year",
      image: "Java.png",
    },
    {
      title: "Computer Programming in C",
      issuer: "Course",
      year: "Year",
      image: "c.png",
    },
    {
      title: "Computer Communications",
      issuer: "Course",
      year: "Year",
      image: "CC.png",
    },
    {
      title: "Fundamentals of Network Communication",
      issuer: "Course",
      year: "Year",
      image: "F.png",
    },
    {
      title: "TCP/IP and Advanced Topics",
      issuer: "Course",
      year: "Year",
      image: "T.png",
    },
    {
      title: "Packet Switching Networks and Algorithms",
      issuer: "Course",
      year: "Year",
      image: "P.png",
    },
    {
      title: "Peer-to-Peer Protocols and Local Area Networks",
      issuer: "Course",
      year: "Year",
      image: "L.png",
    },
    {
      title: "The Bits and Bytes of Computer Networking",
      issuer: "Course",
      year: "Year",
      image: "B.png",
    },
  ];

  const [showMore, setShowMore] = useState(false);

  const allCertificates = [...certificates, ...moreCertificates];
  const visibleCertificates = showMore ? allCertificates : certificates;

  const handleToggleShowMore = () => {
    const wasShowingMore = showMore;
    setShowMore((prev) => !prev);
    
    // If collapsing, scroll to button after a brief delay to allow DOM update
    if (wasShowingMore && buttonRef.current) {
      setTimeout(() => {
        buttonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  return (
    <section id="certificates" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Certificates{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              & Courses
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A collection of certifications and courses that strengthen my skills in AI,
            web development, robotics, and beyond.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {visibleCertificates.map((item, index) => (
              <Dialog key={item.title + item.year}>
                <DialogTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="cursor-pointer bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all hover:shadow-card flex flex-col"
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.issuer}
                      </p>
                    </div>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <img
                    src={item.image}
                    alt={`${item.title} full view`}
                    className="w-full h-auto object-contain max-h-[80vh]"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {allCertificates.length > certificates.length && (
            <div ref={buttonRef} className="text-center mt-8">
              <Button variant="glass" onClick={handleToggleShowMore}>
                {showMore ? "Show fewer certificates" : "Show more certificates"}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;


