import { useCallback, useEffect, useRef } from "react";

interface Props {
  option?: IntersectionObserverInit;
  onIntersect: IntersectionObserverCallback;
}

const defaultOption = {
  root: undefined,
  rootMargin: "0px",
  threshold: 1.0,
};

const useIntersectionObserver = <T extends HTMLElement>({
  option,
  onIntersect,
}: Props) => {
  const ref = useRef<T | null>(null);
  const callback = useCallback<IntersectionObserverCallback>(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect([entry], observer);
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef === null) return;

    const observerOption = option
      ? { ...defaultOption, ...option }
      : defaultOption;
    const observer = new IntersectionObserver(callback, observerOption);

    observer.observe(currentRef);
    return () => currentRef && observer.unobserve(currentRef);
  }, [callback, option, ref]);

  return ref;
};

export default useIntersectionObserver;
