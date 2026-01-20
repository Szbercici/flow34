import React from 'react';

interface SimpleWaveProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
}

const SimpleWave: React.FC<SimpleWaveProps> = ({
  className = '',
  style = {},
  width = '100%',
  height = '100%',
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      id="svg"
      viewBox="0 0 1440 390"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition duration-300 ease-in-out delay-150 ${className}`}
      style={style}
      {...props}
    >
      <path
        d="M 0,400 L 0,400 C 98.39234449760767,274.3444976076555 196.78468899521533,148.68899521531102 279,93 C 361.21531100478467,37.31100478468899 427.2535885167464,51.58851674641147 539,99 C 650.7464114832536,146.41148325358853 808.200956937799,226.9569377990431 910,221 C 1011.799043062201,215.0430622009569 1057.9425837320573,122.58373205741628 1137,138 C 1216.0574162679427,153.41626794258372 1328.0287081339713,276.7081339712919 1440,400 L 1440,400 L 0,400 Z"
        stroke="none"
        strokeWidth="0"
        fill="#97cef4"
        fillOpacity="1"
        className="transition-all duration-300 ease-in-out delay-150 path-0"
      />
    </svg>
  );
};

export default SimpleWave;