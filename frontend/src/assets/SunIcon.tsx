import React from 'react';

// Meghatározzuk a típusokat: minden alap SVG tulajdonságot elfogad
interface SunIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

const SunIcon: React.FC<SunIconProps> = ({ 
  size = 36, 
  color = "currentColor", // Alapértelmezetten örökli a szöveg színét
  ...props 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(2 2)">
        <g id="Sun_3_Brightness_3">
          {/* Nap széle/sugarai */}
          <path
            d="M32,14H27.033c-2,1.769-.779,4,.967,4h4.967C34.966,16.231,33.746,14,32,14Z"
            fill={color}
          />
          
          {/* Középső kör részletes görbéi */}
          <path
            d="M 15.9985 13.9998 C 15.4003 13.9998 14.8379 14.2647 14.4554 14.7265 C 14.1813 15.0575 13.8867 15.6217 14.0404 16.4318 C 14.1787 17.1635 14.8358 17.82 15.5677 17.9587 C 15.7131 17.9862 15.8577 18.0002 15.9974 18.0002 C 16.5956 18.0002 17.158 17.7354 17.5405 17.2738 C 17.8148 16.9426 18.1098 16.3782 17.9569 15.5705 C 17.818 14.8375 17.1605 14.18 16.4283 14.0413 C 16.2829 14.0138 16.1384 13.9998 15.9986 13.9998 L 15.9985 13.9998 M 15.9986 10 C 16.3824 10 16.7746 10.0358 17.172 10.111 C 19.521 10.556 21.442 12.477 21.887 14.826 C 22.6118 18.6557 19.6962 22.0002 15.9974 22.0002 C 15.6137 22.0002 15.2214 21.9642 14.824 21.889 C 12.476 21.444 10.554 19.523 10.11 17.175 C 9.3834 13.3444 12.3 10 15.9986 10 Z"
            fill={color}
          />

          {/* Téglalap sugarak (0°, 90°, 180°, 270°) */}
          <rect width={8} height={4} rx={1.993} transform="translate(26 14)" fill={color} />
          <rect width={8} height={4} rx={1.993} transform="translate(18 26) rotate(90)" fill={color} />
          <rect width={8} height={4} rx={1.993} transform="translate(18 -2) rotate(90)" fill={color} />
          <rect width={8} height={4} rx={1.993} transform="translate(-2 14)" fill={color} />

          {/* Átlós sugarak */}
          <rect width={6.925} height={3.766} rx={1.883} transform="translate(23.22 6.117) rotate(-45)" fill={color} />
          <rect width={3.766} height={6.925} rx={1.883} transform="matrix(0.707, -0.707, 0.707, 0.707, 23.22, 25.883)" fill={color} />
          <rect width={3.766} height={6.925} rx={1.883} transform="translate(1.22 3.883) rotate(-45)" fill={color} />
          <rect width={6.925} height={3.766} rx={1.883} transform="translate(1.22 28.117) rotate(-45)" fill={color} />
        </g>
      </g>
    </svg>
  );
};

export default SunIcon;