import * as Font from "expo-font";
import { useEffect, useState } from "react";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

export default function useCustomFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_700Bold,
      });
      setFontsLoaded(true);
    })();
  }, []);

  return fontsLoaded;
}
