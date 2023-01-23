import { getMethodProbMap, GetProbPerMethod } from "~/lib/bonus-stat/util";

addEventListener(
  "message",
  (event: MessageEvent<Parameters<GetProbPerMethod>[0]>) => {
    postMessage(getMethodProbMap(event.data));
  }
);
