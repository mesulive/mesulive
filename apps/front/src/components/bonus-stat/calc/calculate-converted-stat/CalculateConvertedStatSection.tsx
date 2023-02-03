import { ScreenType, SectionBox, SectionTitle } from "@mesulive/ui";
import { CalculateConvertedStatContent } from "~/components/bonus-stat/calc/calculate-converted-stat/CalculateConvertedStatContent";
import { useScreenType } from "~/lib/hooks/window";

export const CalculateConvertedStatSection = () => {
  const screenType = useScreenType();

  if (screenType < ScreenType.laptop) {
    return null;
  }

  return (
    <SectionBox>
      <SectionTitle>스탯 환산치 계산</SectionTitle>
      <CalculateConvertedStatContent />
    </SectionBox>
  );
};
