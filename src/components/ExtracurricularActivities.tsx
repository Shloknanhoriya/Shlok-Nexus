import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Music2,
  ChevronLeft,
  ChevronRight,
  Award,
  ChevronDown,
  ChevronUp,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Certificate Data ────────────────────────────────────────────────────────
const certificates = [
  {
    id: 1,
    title: "Prabhakar Degree",
    subtitle: "Classical Music – Sangeet Prabhakar",
    issuer: "Prayag Sangeet Samiti",
    year: "2023",
    // Replace with your actual image path, e.g. "/certs/prabhakar.jpg"
    image: null,
    color: "from-cyan-500/20 to-blue-600/20",
    accent: "#22d3ee",
  },
  {
    id: 2,
    title: "Music Certificate II",
    subtitle: "Intermediate Classical Vocals",
    issuer: "Prayag Sangeet Samiti",
    year: "2021",
    image: null,
    color: "from-violet-500/20 to-purple-700/20",
    accent: "#a78bfa",
  },
  {
    id: 3,
    title: "Music Certificate I",
    subtitle: "Foundation in Classical Music",
    issuer: "Prayag Sangeet Samiti",
    year: "2019",
    image: null,
    color: "from-pink-500/20 to-fuchsia-600/20",
    accent: "#f472b6",
  },
];

// ─── Track Data ───────────────────────────────────────────────────────────────
const tracks = [
  { name: "MyTrack", path: "/audio/MyTrack.mp3" },
  { name: "My Track 2", path: "/audio/myTrack3.mp3" },
  { name: "Track", path: "/audio/Track.mp3" },
];

// ─── Music Player ─────────────────────────────────────────────────────────────
const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      setCurrentTime(0);
      setDuration(0);
      audioRef.current.src = currentTrack.path;
      audioRef.current.load();
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current?.duration || 0);
        if (wasPlaying) audioRef.current?.play();
      };
    }
  }, [currentTrackIndex]);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    const wasPlaying = isPlaying;
    audioRef.current?.pause();
    setCurrentTrackIndex((p) => (p === 0 ? tracks.length - 1 : p - 1));
    setIsPlaying(wasPlaying);
  };

  const handleNext = () => {
    const wasPlaying = isPlaying;
    audioRef.current?.pause();
    setCurrentTrackIndex((p) => (p === tracks.length - 1 ? 0 : p + 1));
    setIsPlaying(wasPlaying);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden shadow-elegant">
      {/* Player Visual Area */}
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
        <div className="relative z-10 flex items-center justify-center gap-4">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full" onClick={handlePrev}>
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="text-center space-y-4">
            <Music2 className="h-20 w-20 text-primary mx-auto animate-float" />
            <p className="text-lg text-muted-foreground">Music Player Demo</p>
            <p className="text-sm text-primary/80">{currentTrack.name}</p>
            <Button variant="hero" size="lg" onClick={togglePlayback}>
              {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
              {isPlaying ? "Pause Track" : "Play Track"}
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full" onClick={handleNext}>
            <ChevronRight className="h-6 w-6" />
          </Button>

          <audio
            ref={audioRef}
            src={currentTrack.path}
            preload="auto"
            className="hidden"
            onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
            onEnded={() => {
              setIsPlaying(false);
              handleNext();
            }}
          />
        </div>
      </div>

      {/* Progress Bar */}
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

      {/* Platform Buttons */}
      <div className="pb-6 text-center">
        <p className="text-muted-foreground mb-4">Coming Soon...</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="glass">Spotify</Button>
          <Button variant="glass">YouTube</Button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ExtracurricularActivities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [playerOpen, setPlayerOpen] = useState(false);

  return (
    <section id="extracurricular" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Extracurricular{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Activities
            </span>
          </h2>
          <p className="text-center text-gray-900 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Beyond engineering — a formal journey through music and creative expression.
          </p>

          {/* Certificate Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.15 * i, duration: 0.5 }}
                className={`relative rounded-2xl border border-border/50 bg-gradient-to-br ${cert.color} backdrop-blur-sm p-6 shadow-elegant flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-300`}
              >
                {/* Certificate image or placeholder */}
                <div className="w-full h-36 rounded-xl bg-card/40 flex items-center justify-center border border-border/30 overflow-hidden">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-50">
                      <Award
                        className="h-12 w-12"
                        style={{ color: cert.accent }}
                      />
                      <span className="text-xs text-muted-foreground">
                        Certificate Image
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div>
                  <h3
                    className="text-lg font-bold leading-tight"
                    style={{ color: cert.accent }}
                  >
                    {cert.title}
                  </h3>
                  <p className="text-sm text-foreground/80 mt-1">{cert.subtitle}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-900 dark:text-gray-400">{cert.issuer}</span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full border"
                      style={{
                        color: cert.accent,
                        borderColor: `${cert.accent}40`,
                        background: `${cert.accent}15`,
                      }}
                    >
                      {cert.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Music Player Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Toggle Button */}
            <button
              onClick={() => setPlayerOpen((v) => !v)}
              className="w-full flex items-center justify-between px-6 py-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                  <Headphones className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    🎵 My Music Compositions
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Click to {playerOpen ? "collapse" : "expand"} the music player
                  </p>
                </div>
              </div>
              {playerOpen ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>

            {/* Collapsible Player */}
            <AnimatePresence>
              {playerOpen && (
                <motion.div
                  key="player"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden mt-4"
                >
                  <MusicPlayer />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExtracurricularActivities;