import { keys } from "@mesulive/shared";
import { Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { BonusStat } from "~/lib/bonus-stat";
import { BonusStatState } from "~/lib/bonus-stat/state";
import { Method } from "~/lib/bonus-stat/types";

export const Temp = () => {
  const [result, setResult] = useState<
    Record<Method, number | undefined> | undefined
  >(undefined);
  const workerRef = useRef<Worker>();
  const inputs = useRecoilValue(BonusStatState.inputsSelector);
  const [loading, setLoading] = useState(false);

  const initWorker = useCallback(() => {
    workerRef.current = new Worker(
      new URL("../../../../lib/bonus-stat/calcProbWorker.ts", import.meta.url)
    );
    workerRef.current.onmessage = (
      event: MessageEvent<Record<Method, number | undefined>>
    ) => {
      setResult(event.data);
      setLoading(false);
    };
  }, []);

  const startWorker = useCallback(() => {
    setLoading(true);
    initWorker();
    workerRef.current?.postMessage(inputs);
  }, [initWorker, inputs]);

  const terminateWorker = useCallback(() => {
    workerRef.current?.terminate();
  }, []);

  useEffect(() => {
    terminateWorker();
    startWorker();
    return terminateWorker;
  }, [startWorker, terminateWorker]);

  return (
    <>
      <Typography sx={{ whiteSpace: "pre-line" }}>
        {loading
          ? "로딩 중..."
          : result && result.POWERFUL !== undefined
          ? keys(result).map(
              (key) =>
                `${BonusStat.MethodInfoMap[key].text}: ${
                  Math.floor((result[key] ?? 0) * 1000000) / 10000
                }%\n`
            )
          : "값을 넣어주세요"}
      </Typography>
    </>
  );
};
