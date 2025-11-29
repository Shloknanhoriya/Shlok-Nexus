import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Music = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="music" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            My <span className="bg-gradient-primary bg-clip-text text-transparent">Music</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Blending technology and creativity through sound
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden shadow-elegant">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-glow opacity-30" />
                <div className="relative z-10 text-center space-y-4">
                  <Music2 className="h-20 w-20 text-primary mx-auto animate-float" />
                  <p className="text-lg text-muted-foreground">Music Player Demo</p>
                  <Button
                    variant="hero"
                    size="lg"
                    className="group-hover:scale-105 transition-transform"
                    onClick={togglePlayback}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    {isPlaying ? "Pause Track" : "Play Track"}
                  </Button>
                  <audio
                    ref={audioRef}
                    src="/audio/MyTrack.mp3"
                    preload="auto"
                    className="hidden"
                    onEnded={() => setIsPlaying(false)}
                  />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Latest Composition</h3>
                <p className="text-muted-foreground mb-4">
                  An experimental blend of electronic and orchestral elements, showcasing the
                  intersection of AI-generated harmonies and traditional composition.
                </p>

                {/* Custom Audio Player UI */}
                <div className="space-y-3">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-gradient-primary rounded-full" />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1:24</span>
                    <span>3:45</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Listen to more of my work on streaming platforms
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="glass">Spotify</Button>
                <Button variant="glass">SoundCloud</Button>
                <Button variant="glass">YouTube</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Music;
