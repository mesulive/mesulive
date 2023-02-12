declare module "*.svg" {
  import React = require("react");
  import {
    EmotionJSX,
    WithConditionalCSSProp,
  } from "@emotion/react/types/jsx-namespace";
  type WithEmotionProps<P> = EmotionJSX.IntrinsicAttributes &
    WithConditionalCSSProp<P> &
    P;
  const value: React.FC<WithEmotionProps<React.SVGProps<SVGSVGElement>>>;
  export default value;
}
