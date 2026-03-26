import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Internships from "@/components/Internships";
import Certificates from "@/components/Certificates";
import Showcase from "@/components/Showcase";
import Music from "@/components/ExtracurricularActivities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TypewriterText from "@/components/TypewriterText";

const Index = ({ setHighlightEmail, highlightEmail }: any) => {
  return (
    <div className="min-h-screen bg-transparent">

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Internships />
      <Certificates />
      <Projects />
      <Showcase />
      <Music />
      <Contact setHighlightEmail={setHighlightEmail} />
<Footer highlightEmail={highlightEmail} />
    </div>
  );
};

export default Index;
