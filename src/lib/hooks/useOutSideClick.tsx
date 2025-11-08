import { useEffect } from 'react';

const useOutSideClick = (ref: any, cb: any) => {
  const handleOutSide = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      cb();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutSide);
    return () =>
      document.removeEventListener('mousedown', handleOutSide);
  }, [ref, cb]);
};

export default useOutSideClick;
