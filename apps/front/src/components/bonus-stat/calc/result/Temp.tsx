import { keys } from "@mesulive/shared";
import { Button, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { BonusStatState } from "~/lib/bonus-stat/state";
import { Method } from "~/lib/bonus-stat/types";

export const Temp = () => {
  const [result, setResult] = useState<
    Record<Method, number | undefined> | undefined
  >(undefined);
  const workerRef = useRef<Worker>();
  const inputs = useRecoilValue(BonusStatState.inputsSelector);

  const initWorker = useCallback(() => {
    workerRef.current = new Worker(
      new URL("../../../../lib/bonus-stat/calcProbWorker.ts", import.meta.url)
    );
    workerRef.current.onmessage = (
      event: MessageEvent<Record<Method, number | undefined>>
    ) => {
      console.log(event.data);
      setResult(event.data);
    };
  }, []);

  const startWorker = useCallback(() => {
    initWorker();
    workerRef.current?.postMessage(inputs);
  }, [initWorker, inputs]);

  const terminateWorker = useCallback(() => {
    workerRef.current?.terminate();
  }, []);

  useEffect(() => {
    return terminateWorker;
  }, [initWorker, terminateWorker]);

  useEffect(() => {
    terminateWorker();
    startWorker();
    return terminateWorker;
  }, [startWorker, terminateWorker]);

  return (
    <>
      <Typography sx={{ whiteSpace: "pre-line" }}>
        {result
          ? keys(result).map((key) => `${key}: ${result[key]?.toString()}\n`)
          : "없엉"}
      </Typography>
      <Button
        onClick={() => {
          startWorker();
        }}
      >
        시작
      </Button>
      <Button onClick={terminateWorker}>취소</Button>
    </>
  );
};
