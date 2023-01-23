import { Flex, SectionBox, SectionTitle } from "@mesulive/ui";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "@xstate/react";
import Color from "color";
import { values } from "lodash";
import { useContext } from "react";
import { ResultCalculator } from "~/components/bonus-stat/calc/result/ResultCalculator";
import { ResultRow } from "~/components/bonus-stat/calc/result/ResultRow";
import { BonusStat } from "~/lib/bonus-stat";
import { FlowContext } from "~/lib/flow/flowProvider";
import { FlowMachineState } from "~/lib/flow/machine";

export const ResultSection = () => {
  const loading = useSelector(useContext(FlowContext).service, (state) =>
    state.matches(FlowMachineState.enum.calculating)
  );

  return (
    <SectionBox>
      <ResultCalculator />
      <SectionTitle>계산 결과</SectionTitle>
      <Flex sx={{ position: "relative" }} gap={16}>
        {values(BonusStat.Method.enum).map((method) => (
          <ResultRow method={method} key={method} />
        ))}
        <Backdrop
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: Color("white").alpha(0.7).toString(),
          }}
          open={loading}
        >
          <CircularProgress />
        </Backdrop>
      </Flex>
    </SectionBox>
  );
};
