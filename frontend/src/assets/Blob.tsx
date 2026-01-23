import React from 'react';

interface BlobProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
}

const Blob: React.FC<BlobProps> = ({ className, style, ...props }) => {
  return (
    <svg
      id="sw-js-blob-svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className={className}
      style={style}
      {...props}
    >
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop
            id="stop1"
            stopColor="rgba(55, 246.366, 248, 1)"
            offset="-1%"
          />
          <stop
            id="stop2"
            stopColor="rgba(31, 160.94, 251, 1)"
            offset="101%"
          />
        </linearGradient>
      </defs>
      <path
        fill="none"
        d="M20.5,-24.9C27.6,-18.4,35.1,-13,36,-6.5C36.9,-0.1,31.2,7.3,26,13.9C20.9,20.5,16.2,26.2,9.2,31.4C2.2,36.6,-7.3,41.3,-16.1,39.9C-24.8,38.5,-32.9,31.1,-36.7,22.3C-40.5,13.5,-40,3.3,-37.9,-6.3C-35.8,-15.9,-32.1,-24.9,-25.5,-31.5C-18.9,-38,-9.5,-42.2,-1.4,-40.6C6.7,-38.9,13.4,-31.4,20.5,-24.9Z"
        transform="translate(50 50)"
        strokeWidth="1"
        style={{ transition: '0.3s' }}
        stroke="url(#sw-gradient)"
      />
    </svg>
  );
};

export default Blob;