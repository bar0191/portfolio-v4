import * as React from 'react';
import { useEffect, useState } from 'react';
import { animate, easeIn } from 'popmotion';

function Loader() {
  const [dash, setDash] = useState(1000);
  const [y, setY] = useState(100);

  useEffect(() => {
    let svg = document.getElementById("svg-loader");
    let svgTextTwo = document.getElementById("svgTextTwo");
    let svgRect = document.getElementById("svgRect");

    let turbulence = svg.querySelectorAll("#filter feTurbulence")[0];
    let displacement = svg.querySelectorAll("#filter feDisplacementMap")[0];

    animate({
      from: dash,
      to: 0,
      duration: 4000,
      ease: easeIn,
      onUpdate: latest => setDash(latest)
    })

    // animate({
    //   from: y,
    //   to: 0,
    //   duration: 5000,
    //   ease: easeIn,
    //   onUpdate: latest => setY(latest)
    // })


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
          <text style={{ fontSize: '9vw' }} x="0" transform="translate(100)" id="svgTextOne" transform="matrix(1,0,0,1,0,0) " fontWeight="bold"
                textAnchor="start" fontFamily="Arvo, sans-serif" className="svgText" y="100"
                fill="none">LOADING
          </text>
        </clipPath>
      </defs>

      <g filter="url(#filter)">
        <text style={{ strokeDashoffset: dash, fontSize: '9vw' }} x="0" transform="translate(100)" id="svgTextTwo" transform="matrix(1,0,0,1,0,0) " fontWeight="bold"
              textAnchor="start" fontFamily="Arvo, sans-serif" className="svgText" y="100" fill="none"
              stroke="#e89eb8" strokeWidth="2">LOADING
        </text>

        <rect y={`${y}%`} width="100%" height="100%" fill="#e89eb8" id="svgRect" clipPath="url(#clipping)" />
      </g>
    </svg>
  )
}

export default Loader;