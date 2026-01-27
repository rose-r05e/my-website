import React from "react";

/**
 * Fine-line Angular Rose Bouquet
 * - Cienkie, łamane linie (styl rapidografu)
 * - Spiralne wnętrze inspirowane przesłanym obrazem
 * - Delikatne kołysanie (efekt wiatru)
 */

const SketchyRose = ({ x, y, scale, rotation, delay }) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      {/* Cienka, łamana łodyga */}
      <polyline
        points="-300,100 -200,80 -100,90 -20,20 0,0"
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.3"
      />
      
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-1 0 0; 1 0 0; -1 0 0"
          dur={`${6 + delay}s`}
          repeatCount="indefinite"
        />

        {/* Centrum - ciasna spirala z łamanych linii */}
        <polyline
          points="-5,-2 2,-8 12,-2 8,10 -5,8 -10,-5 0,-15 15,-10 20,5 10,18 -10,15 -20,0"
          fill="none"
          stroke="white"
          strokeWidth="0.6"
        />

        {/* Środkowe płatki - kanciaste, wywinięte krawędzie */}
        <polyline points="-15,-10 -5,-25 15,-28 30,-10 25,15 5,25 -15,18 -25,0 -20,-15" fill="none" stroke="white" strokeWidth="0.6" />
        <polyline points="-25,-20 0,-35 25,-32 45,-15 40,20 15,35 -20,30 -35,5 -30,-25" fill="none" stroke="white" strokeWidth="0.6" />

        {/* Zewnętrzne płatki - duże, nieregularne wielokąty */}
        <polyline 
          points="-40,-30 -10,-55 35,-50 65,-20 60,30 25,55 -30,50 -55,10 -50,-35" 
          fill="none" 
          stroke="white" 
          strokeWidth="0.6" 
        />
        <polyline 
          points="-60,-45 0,-75 50,-70 85,-30 80,45 35,75 -40,70 -75,20 -70,-50" 
          fill="none" 
          stroke="white" 
          strokeWidth="0.6" 
        />

        {/* Działki kielicha (calyx) - ostre linie pod kwiatem */}
        <g transform="rotate(160)">
          <polyline points="0,0 15,40 0,65 -10,40 0,0" fill="none" stroke="white" strokeWidth="0.5" opacity="0.6" />
        </g>
        <g transform="rotate(200)">
          <polyline points="0,0 10,35 0,55 -8,35 0,0" fill="none" stroke="white" strokeWidth="0.5" opacity="0.6" />
        </g>
      </g>
    </g>
  );
};

export default function RoseBouquetBackground() {
  const bouquet = [
    { x: 150, y: 150, scale: 0.6, rotation: -20, delay: 0 },
    { x: 250, y: 300, scale: 1.0, rotation: -5, delay: 1.2 },
    { x: 180, y: 500, scale: 0.8, rotation: 15, delay: 0.5 },
  ];

  return (
    <svg
      viewBox="0 0 1000 800"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'transparent',
        pointerEvents: 'none'
      }}
      preserveAspectRatio="xMinYMid slice"
    >
      <g>
        {/* Delikatne przesunięcie całego bukietu (imitacja podmuchu) */}
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 10,5; 0,0"
          dur="10s"
          repeatCount="indefinite"
        />
        
        {bouquet.map((props, i) => (
          <SketchyRose key={i} {...props} />
        ))}
      </g>
    </svg>
  );
}