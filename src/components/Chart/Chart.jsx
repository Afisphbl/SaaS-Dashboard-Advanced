import React, { useMemo } from 'react';
import styles from './Chart.module.css';

export const Chart = React.memo(function Chart({ data, width = '100%', height = 300 }) {
  // data format: [{ label: 'Jan', value: 100 }, ...]
  
  const { points, maxVal, minVal } = useMemo(() => {
    if (!data || data.length === 0) return { points: '', maxVal: 0, minVal: 0 };
    
    const max = Math.max(...data.map(d => d.value));
    const min = Math.min(...data.map(d => d.value));
    
    // Scale values to fit within 0 to 100 on Y axis (percentages)
    // Map X axis evenly
    const range = max - min || 1;
    
    const mapped = data.map((d, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (((d.value - min) / range) * 80 + 10); // leave 10% padding top/bottom
      return `${x},${y}`;
    });

    return { points: mapped.join(' '), maxVal: max, minVal: min };
  }, [data]);

  if (!data || data.length === 0) {
    return <div className={styles.empty}>No data available for chart</div>;
  }

  return (
    <div className={styles.chartContainer} style={{ width, height }}>
      <svg className={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Background Grid Lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} className={styles.gridLine} />
        ))}
        
        {/* Fill Area */}
        <polyline 
          points={`0,100 ${points} 100,100`} 
          className={styles.areaFill} 
        />
        
        {/* Stroke Line */}
        <polyline 
          points={points} 
          className={styles.lineStroke} 
        />

        {/* Data Points */}
        {data.map((d, index) => {
          const x = (index / (data.length - 1)) * 100;
          const range = maxVal - minVal || 1;
          const y = 100 - (((d.value - minVal) / range) * 80 + 10);
          return (
            <circle 
              key={index}
              cx={x} 
              cy={y} 
              r="1.5" 
              className={styles.point} 
            >
              <title>{`${d.label}: ${d.value}`}</title>
            </circle>
          );
        })}
      </svg>
      
      {/* X Axis Labels */}
      <div className={styles.labels}>
        {data.map((d, index) => (
          <span key={index} className={styles.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
});
