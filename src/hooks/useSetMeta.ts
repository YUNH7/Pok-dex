import { metaAtom } from "@state/meta";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

const useSetMeta = (initMeta?: Record<string, string>) => {
  const [newMeta, setNewMeta] = useState(initMeta);
  const setMeta = useSetAtom(metaAtom);

  useEffect(() => {
    if (newMeta) setMeta((pre) => ({ ...pre, ...newMeta }));
  }, [newMeta, setMeta]);

  return setNewMeta;
};

export default useSetMeta;
