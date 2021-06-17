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
    setState({ height: window.innerHeight, width: window.innerWidth });
    setRendered({ page: 'home', seed: Math.random() });
  }, []);

  return (
    <div className="home">
      { state.height !== 0 && (<Slider {...state} />)}
    </div>
  )
}

export default Home;