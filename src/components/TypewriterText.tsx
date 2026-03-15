
import { useEffect, useState } from "react";

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (index < text.length) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 90);
    } else {
      // Wait before restarting typing
      timeout = setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 5001); 
    }

    return () => clearTimeout(timeout);
  }, [index, text]);

  return (
    <>
      {displayText}
      <span className="animate-pulse">|</span>
    </>
  );
};

export default TypewriterText;

