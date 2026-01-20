import React from 'react';

interface DoubleWaveProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
  waveColor?: string;
  opacity1?: number;
  opacity2?: number;
}

const DoubleWave: React.FC<DoubleWaveProps> = ({
  className = '',
  style = {},
  width = '100%',
  height = '100%',
  waveColor = '#97cef4',
  opacity1 = 0.53,
  opacity2 = 1,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1440 390"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition duration-300 ease-in-out delay-150 ${className}`}
      style={style}
      {...props}
    >
      {/* Első hullám - kisebb átlátszósággal */}
      <path
        d="M 0,400 L 0,400 C 102.01913875598083,266.8133971291866 204.03827751196167,133.6267942583732 286,98 C 367.96172248803833,62.3732057416268 429.8660287081341,124.30622009569379 536,134 C 642.1339712918659,143.6937799043062 792.4976076555023,101.14832535885165 891,73 C 989.5023923444977,44.85167464114834 1036.1435406698565,31.100478468899524 1119,88 C 1201.8564593301435,144.89952153110048 1320.9282296650717,272.44976076555025 1440,400 L 1440,400 L 0,400 Z"
        stroke="none"
        strokeWidth="0"
        fill={waveColor}
        fillOpacity={opacity1}
        className="transition-all duration-300 ease-in-out delay-150 path-0"
        transform="rotate(-180 720 200)"
      />
      
      {/* Második hullám - teljes átlátszósággal */}
      <path
        d="M 0,400 L 0,400 C 101.7129186602871,354.4688995215311 203.4258373205742,308.9377990430622 306,269 C 408.5741626794258,229.0622009569378 512.0095693779904,194.7177033492823 610,197 C 707.9904306220096,199.2822966507177 800.5358851674641,238.1913875598086 888,246 C 975.4641148325359,253.8086124401914 1057.846889952153,230.51674641148327 1149,251 C 1240.153110047847,271.48325358851673 1340.0765550239234,335.74162679425837 1440,400 L 1440,400 L 0,400 Z"
        stroke="none"
        strokeWidth="0"
        fill={waveColor}
        fillOpacity={opacity2}
        className="transition-all duration-300 ease-in-out delay-150 path-1"
        transform="rotate(-180 720 200)"
      />
    </svg>
  );
};

export default DoubleWave;