import { useCallback, useContext, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BonusStatState } from "~/lib/bonus-stat/state";
import { Method } from "~/lib/bonus-stat/types";
import { FlowContext } from "~/lib/flow/flowProvider";

export const ResultCalculator = () => {
  const workerRef = useRef<Worker>();
  const setResult = useSetRecoilState(BonusStatState.calcResultAtom);
  const inputs = useRecoilValue(BonusStatState.inputsSelector);

  const flowService = useContext(FlowContext).service;
  const { send } = flowService;

  const initWorker = useCallback(() => {
    workerRef.current = new Worker(
      new URL("../../../../lib/bonus-stat/calcProbWorker.ts", import.meta.url)
    );
    workerRef.current.onmessage = (
      event: MessageEvent<Record<Method, number | undefined>>
    ) => {
      setResult(event.data);
      send({ type: "FINISH_CALC" });
    };
  }, [send, setResult]);

  const startWorker = useCallback(() => {
    send({ type: "SUBMIT", needLoading: true });
    initWorker();
    workerRef.current?.postMessage(inputs);
  }, [initWorker, inputs, send]);

  const terminateWorker = useCallback(() => {
    workerRef.current?.terminate();
    send({ type: "SUBMIT" });
  }, [send]);

  useEffect(() => {
    terminateWorker();
    startWorker();
    return terminateWorker;
  }, [startWorker, terminateWorker]);

  return null;
};
