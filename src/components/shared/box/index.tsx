import React from 'react';
import { View } from 'react-native';

import getStyles from './styles';
import { BoxProps } from './types';

const Box: React.FC<BoxProps> = (props) => {
  const {
    children,
    onLayout,
    pointerEvents,
    testID,
    accessibilityLabel,
    style,
    m,
    my,
    mx,
    mt,
    mr,
    mb,
    ml,
    p,
    pt,
    pr,
    pb,
    pl,
    py,
    px,
    bg,
    height,
    width,
    alignItems,
    alignSelf,
    justifyContent,
    flexDirection,
    flex,
    position,
    bottom,
    borderColor,
    borderWidth,
    bbw,
    btw,
    brw,
    blw,
    btrr,
    bbrr,
    btlr,
    bblr,
    r,
    l,
    t,
    b,
    ...restProps
  } = props;

  const styles = getStyles({
    m,
    my,
    mx,
    mt,
    mr,
    mb,
    ml,
    p,
    pt,
    pr,
    pb,
    pl,
    py,
    px,
    bg,
    height,
    width,
    alignItems,
    alignSelf,
    justifyContent,
    flexDirection,
    flex,
    position,
    bottom,
    borderColor,
    borderWidth,
    bbw,
    btw,
    brw,
    blw,
    btrr,
    bbrr,
    btlr,
    bblr,
    r,
    l,
    t,
    b,
  });

  return (
    <View
      {...restProps}
      onLayout={onLayout}
      pointerEvents={pointerEvents}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      style={[styles.box, style]}
    >
      {children}
    </View>
  );
};

export default Box;
