import * as React from 'react';
import { useEffect, useState } from 'react';
import { animate, easeIn } from 'popmotion';

function Loader(): JSX.Element {
  const [dash, setDash] = useState(1000);
  const [y, setY] = useState(50);

  useEffect(() => {
    // let svg = document.getElementById("svg-loader");
    // let svgTextTwo = document.getElementById("svgTextTwo");
    // let svgRect = document.getElementById("svgRect");
    // let turbulence = svg.querySelectorAll("#filter feTurbulence")[0];
    // let displacement = svg.querySelectorAll("#filter feDisplacementMap")[0];

    animate({
      from: dash,
      to: 0,
      duration: 2500,
      ease: easeIn,
      onUpdate: latest => setDash(latest)
    })

    animate({
      from: y,
      to: 35,
      duration: 3000,
      ease: easeIn,
      onUpdate: latest => setY(latest)
    })

    // eslint-disable-next-line
  }, []);

  return (
    <svg id="svg-loader">

      <filter id="filter" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB">

        <feTurbulence baseFrequency="0.05 0.06" type="fractalNoise" numOctaves="1" seed="10" stitchTiles="noStitch"
                      result="turbulence" />

        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="1" xChannelSelector="R" yChannelSelector="B"
                           result="displacementMap" />

      </filter>

      <defs>
        <clipPath id="clipping">
          <text style={{ fontSize: '10vw' }} x="30%"  id="svgTextOne" fontWeight="bold"
                textAnchor="start" className="svgText" y="52%"
                fill="none">LOADING
          </text>
        </clipPath>
      </defs>

      <g filter="url(#filter)">
        <text style={{ strokeDashoffset: dash, fontSize: '10vw' }} x="30%" id="svgTextTwo" fontWeight="bold"
              textAnchor="start" className="svgText" y="52%" fill="none"
              stroke="#f3f3f3" strokeWidth="2">LOADING
        </text>

        <rect y={`${y}%`} width="100%" height="100%" fill="#f3f3f3" id="svgRect" clipPath="url(#clipping)" />
      </g>
    </svg>
  )
}

export default Loader;