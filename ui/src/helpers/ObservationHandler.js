import { React, useEffect, useRef } from "react";

export const ObservationHandler = ({ onObserv, delay = 200 }) => {
  const observRef = useRef(null);
  useEffect(() => {
    const observ = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onObserv();
        }
      },
      { delay }
    );
    const elem = observRef.current;
    observ.observe(elem);

    return () => {
      if (elem) {
        observ.unobserve(elem);
      }
    };
  }, [onObserv, delay]);
  return <div ref={observRef} />;
};
