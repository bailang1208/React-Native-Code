import { ViewStyle, ViewProps } from 'react-native';

export type SpacingProps = {
  m?: number;
  my?: number;
  mx?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  p?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  py?: number;
  px?: number;
  bottom?: number;
};

export type FlexProps = {
  flex?: ViewStyle['flex'];
  flexDirection?: ViewStyle['flexDirection'];
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  alignSelf?: ViewStyle['alignSelf'];
};

export type BoxProps = SpacingProps &
  FlexProps &
  ViewProps & {
    bg?: string;
    width?: ViewStyle['width'];
    height?: ViewStyle['height'];
    position?: ViewStyle['position'];
    borderRadius?: ViewStyle['borderRadius'];
    borderColor?: string;
    borderWidth?: ViewStyle['borderWidth'];
    bbw?: ViewStyle['borderBottomWidth'];
    btw?: ViewStyle['borderTopWidth'];
    brw?: ViewStyle['borderRightWidth'];
    blw?: ViewStyle['borderLeftWidth'];
    btrr?: ViewStyle['borderTopRightRadius'];
    bbrr?: ViewStyle['borderBottomRightRadius'];
    btlr?: ViewStyle['borderTopLeftRadius'];
    bblr?: ViewStyle['borderBottomLeftRadius'];
    r?: ViewStyle['right'];
    l?: ViewStyle['left'];
    t?: ViewStyle['top'];
    b?: ViewStyle['bottom'];
  };
