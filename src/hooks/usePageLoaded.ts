import { useEffect, useRef, useState } from 'react';

const usePageLoaded = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ref = useRef<HTMLDivElement>();

  return {
    ref,
    mounted,
    refWidth: ref.current?.clientWidth ?? 0,
  };
};

export default usePageLoaded;