import { useEffect, useState } from "react";

export default function useScrollShadow() {
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShadow(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return shadow;
}