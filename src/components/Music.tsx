import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Music2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Music = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const tracks = [
    { name: "MyTrack", path: "/audio/MyTrack.mp3" },
    { name: "Track", path: "/audio/Track.mp3" },
  ];

  const currentTrack = tracks[currentTrackIndex];

  // Load and auto-play current track
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
  
      setCurrentTime(0);      // Reset track time
      setDuration(0);         // Reset duration until loaded
      audioRef.current.src = currentTrack.path;
      audioRef.current.load();
  
      // Wait for metadata to load
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current?.duration || 0);
        if (wasPlaying) audioRef.current.play();
      };
    }
  }, [currentTrackIndex]);
  

  // Play / Pause toggle
  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Previous track
  const handlePreviousTrack = () => {
    const wasPlaying = isPlaying;
    audioRef.current?.pause();
    setCurrentTrackIndex(prev => (prev === 0 ? tracks.length - 1 : prev - 1));
    setIsPlaying(wasPlaying);
  };

  // Next track
  const handleNextTrack = () => {
    const wasPlaying = isPlaying;
    audioRef.current?.pause();
    setCurrentTrackIndex(prev => (prev === tracks.length - 1 ? 0 : prev + 1));
    setIsPlaying(wasPlaying);
  };

  // Format mm:ss
  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
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
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
                <div className="relative z-10 flex items-center justify-center gap-4">
                  
                  {/* Previous Button */}
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full"
                    onClick={handlePreviousTrack}>
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  {/* Music Info */}
                  <div className="text-center space-y-4">
                    <Music2 className="h-20 w-20 text-primary mx-auto animate-float" />
                    <p className="text-lg text-muted-foreground">Music Player Demo</p>
                    <p className="text-sm text-primary/80">{currentTrack.name}</p>

                    {/* Play / Pause Button */}
                    <Button variant="hero" size="lg" onClick={togglePlayback}>
                      {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                      {isPlaying ? "Pause Track" : "Play Track"}
                    </Button>
                  </div>

                  {/* Next Button */}
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full"
                    onClick={handleNextTrack}>
                    <ChevronRight className="h-6 w-6" />
                  </Button>

                  {/* Audio Element */}
                  <audio
                    ref={audioRef}
                    src={currentTrack.path}
                    preload="auto"
                    className="hidden"
                    onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                    onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                    onEnded={() => {
                      setIsPlaying(false);
                      handleNextTrack();
                    }}
                  />
                </div>
              </div>

              {/* Custom Progress Bar */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Latest Composition</h3>
                <p className="text-muted-foreground mb-4">
                  An experimental blend of electronic and orchestral elements.
                </p>

                <div className="space-y-3">
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={(e) => {
                      if (audioRef.current) audioRef.current.currentTime = Number(e.target.value);
                      setCurrentTime(Number(e.target.value));
                    }}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Buttons */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">Listen to more of my work</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="glass">Spotify</Button>
                
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
