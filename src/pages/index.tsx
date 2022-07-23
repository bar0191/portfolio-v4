import * as React from 'react';
import { useSetRecoilState } from 'recoil';
import { pageRendered } from '../store';
import Slider from '../components/Slider';

const { useState, useEffect } = React;

function Home(): JSX.Element {
  const setRendered = useSetRecoilState(pageRendered);
  const [state, setState] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const onResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      console.log(vh);
    };

    setRendered({ page: 'home', seed: Math.random() });
    setState({ height: window.innerHeight, width: window.innerWidth });

    window.addEventListener('resize', onResize);
    // setRendered({ page: 'home', seed: Math.random() });
    // eslint-disable-next-line
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  return (
    <div className="home">
      { state.height !== 0 && (<Slider {...state} />)}
    </div>
  )
}

export default Home;