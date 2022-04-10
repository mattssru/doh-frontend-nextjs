import { useEffect, useState } from "react";


const LoopSurvey = (handler: Function, interval: any) => {
  const [intervalId, setIntervalId] = useState<number | undefined>();
  useEffect(() => {
    const id = setInterval(handler, interval);
    setIntervalId(id);
    return () => clearInterval(id);
  }, []);
  return () => clearInterval(intervalId);
};

export default LoopSurvey;