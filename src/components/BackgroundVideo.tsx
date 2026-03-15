const BackgroundVideo = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10
 opacity-45"
      >
        <source src="/nebula-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40"></div>
    </div>
  );
};

export default BackgroundVideo;
