import { useEffect, useState } from "react";

export default function useRefetchDelay(duration = 200, refetchFn, refetchLoading) {
  const [skeleton, setSkeleton] = useState(false);

  function refetchDelay() {
    setSkeleton(true);

    setTimeout(() => {
      refetchFn();
    }, duration);
  }
  useEffect(() => {
    if (!refetchLoading) {
      setSkeleton(false);
    }
  }, [refetchLoading]);

  return { skeleton, refetchDelay };
}
