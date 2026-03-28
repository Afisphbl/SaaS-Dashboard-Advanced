import React, { useMemo } from 'react';
import { Users, UserPlus, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Chart } from '../../components/Chart/Chart';
import styles from './Dashboard.module.css';

// Mock data for chart since we don't have historical data in profiles
const chartData = [
  { label: 'Jan', value: 400 },
  { label: 'Feb', value: 300 },
  { label: 'Mar', value: 550 },
  { label: 'Apr', value: 450 },
  { label: 'May', value: 700 },
  { label: 'Jun', value: 650 },
  { label: 'Jul', value: 800 }
];

const StatCard = React.memo(({ title, value, icon: Icon, trend, trendValue }) => (
  <div className={styles.statCard}>
    <div className={styles.statHeader}>
      <h3 className={styles.statTitle}>{title}</h3>
      <div className={styles.iconWrapper}>
        <Icon size={20} className={styles.icon} />
      </div>
    </div>
    <div className={styles.statValue}>{value}</div>
    <div className={`${styles.trend} ${trend === 'up' ? styles.up : styles.down}`}>
      {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
      <span>{trendValue} vs last month</span>
    </div>
  </div>
));

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard overview</h1>
        <p className={styles.subtitle}>Welcome back! Here's what's happening today.</p>
      </header>

      <div className={styles.statsGrid}>
        <StatCard 
          title="Total Users" 
          value="8,249" 
          icon={Users} 
          trend="up" 
          trendValue="12%" 
        />
        <StatCard 
          title="Active Users" 
          value="5,190" 
          icon={Activity} 
          trend="down" 
          trendValue="2%" 
        />
        <StatCard 
          title="New Signups" 
          value="432" 
          icon={UserPlus} 
          trend="up" 
          trendValue="24%" 
        />
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <h2 className={styles.chartTitle}>User Growth</h2>
          <select className={styles.chartFilter}>
            <option>Last 7 months</option>
            <option>Last 30 days</option>
            <option>This year</option>
          </select>
        </div>
        <div className={styles.chartWrapper}>
          <Chart data={chartData} height={300} />
        </div>
      </div>
    </div>
  );
}
