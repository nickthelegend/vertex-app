// useCustomFonts.js
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';

const useCustomFonts = (fonts) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Promise.all(fonts.map(font => useFonts(font)));
      setFontsLoaded(true);
    };

    loadFonts();

    return () => {
      // Cleanup if needed
    };
  }, [fonts]);

  return fontsLoaded;
};

export default useCustomFonts;
