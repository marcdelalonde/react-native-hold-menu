import * as React from "react";
import { StyleSheet, ViewStyle } from "react-native";

import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import StyleGuide from "./StyleGuide";
import { BlurView } from "expo-blur";

export const MENU_WIDTH = (StyleGuide.dimensionWidth * 60) / 100;

export interface MenuBackDropProps {
  tint?: "dark" | "light";
  toggle: boolean;
  onCloseMenu: any;
  containerStyle?: ViewStyle;
}

export const MenuBackDrop = ({
  tint = "dark",
  toggle,
  onCloseMenu,
  containerStyle,
}: MenuBackDropProps) => {
  const [animateBackdrop, setAnimateBackdrop] = React.useState(false);

  React.useEffect(() => {
    setAnimateBackdrop(toggle);
  }, [toggle]);

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animateBackdrop ? 1 : 0, {
        duration: toggle ? 300 : 0,
      }),
      zIndex: toggle ? 10 : 5,
    };
  });

  return toggle ? (
    <Animated.View
      style={[styles.background, { ...containerStyle }, { ...style }]}
    >
      <BlurView
        tint={tint}
        intensity={100}
        style={[StyleSheet.absoluteFillObject]}
      >
        <TouchableWithoutFeedback
          style={{ width: "100%", height: "100%" }}
          onPress={onCloseMenu}
        />
      </BlurView>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  background: {
    width: StyleGuide.dimensionWidth,
    height: StyleGuide.dimensionHeight,
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
  },
});
