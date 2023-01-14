import { MainButton } from "@mesulive/ui";
import { useContext } from "react";
import { FlameState } from "~/lib/flame/states";
import { FlowContext } from "~/lib/flow/flowProvider";
import { useRecoilCallback } from "~/lib/hooks/recoil";

export const CalcButton = () => {
  const flowService = useContext(FlowContext).service;
  const validate = useRecoilCallback(
    ({ get }) =>
      () =>
        get(FlameState.inputUnfilledSelector),
    []
  );

  return (
    <MainButton
      variant="contained"
      onClick={() => {
        flowService.send({ type: "SUBMIT", invalid: validate() });
      }}
    >
      계산하기
    </MainButton>
  );
};
