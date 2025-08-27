import StealthBrowser from "@/components/StealthBrowser";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Set up keyboard shortcut for stealth mode
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        // This will be handled by the StealthBrowser component
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return <StealthBrowser />;
};

export default Index;
