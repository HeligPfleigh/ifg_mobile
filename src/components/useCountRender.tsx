import { useRef } from 'react';

const useCountRender = () => {
  const ref = useRef(0);
  ref.current += 1;

  // eslint-disable-next-line no-console
  console.log('renders:', ref.current);
};

export default useCountRender;
