import { SectionBox, SectionTitle } from "@mesulive/ui";
import { Temp } from "~/components/bonus-stat/calc/result/Temp";

export const ResultSection = () => {
  return (
    <SectionBox>
      <SectionTitle>계산 결과</SectionTitle>
      <Temp />
    </SectionBox>
  );
};
