import { Platform } from "react-native";

export const dpToPixels = (dp) => {
    const scale = Platform.OS === "ios" ? 2 : 1;
    return dp * scale;
  };