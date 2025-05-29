import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

import { useMoodTrendsData } from '../../hooks/useMoodTrendsData';
import DATE_GRANULARITY from '../../constants/DATE_GRANULARITY';
import { formatChartData } from './formatChartData';

Chart.register(...registerables);

const getChartOptions = (timeframe: string) => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    x: {
      type: 'category',
      time: {
        unit: timeframe === DATE_GRANULARITY.DAILY ? 'day' : timeframe === DATE_GRANULARITY.WEEKLY ? 'week' : timeframe === DATE_GRANULARITY.MONTHLY ? 'month' : 'year',
      },
    },
    y: {
      min: 1,
      max: 5,
      ticks: {
        stepSize: 1,
      }
    },
  },
});

const MoodChartContainer = () => {
  // Fetch data for different timeframes
  const { data: dailyData, isLoading: dailyLoading } = useMoodTrendsData(DATE_GRANULARITY.DAILY);
  const { data: weeklyData, isLoading: weeklyLoading } = useMoodTrendsData(DATE_GRANULARITY.WEEKLY);
  const { data: monthlyData, isLoading: monthlyLoading } = useMoodTrendsData(DATE_GRANULARITY.MONTHLY);
  const { data: yearlyData, isLoading: yearlyLoading } = useMoodTrendsData(DATE_GRANULARITY.YEARLY);

  // Combine loading states
  const isLoading = dailyLoading || weeklyLoading || monthlyLoading || yearlyLoading;
  // Prepare chartData for the chart
  const chartData = useMemo(() => {
    if (isLoading) return null;

    return {
      daily: formatChartData(dailyData, DATE_GRANULARITY.DAILY),
      weekly: formatChartData(weeklyData, DATE_GRANULARITY.WEEKLY),
      monthly: formatChartData(monthlyData, DATE_GRANULARITY.MONTHLY),
      yearly: formatChartData(yearlyData, DATE_GRANULARITY.YEARLY),
    };
  }, [isLoading, dailyData, weeklyData, monthlyData, yearlyData]);

  console.log('Chart Data:', chartData);
  if (isLoading) return <div>Loading...</div>;
  if (!chartData) return <div>No data available</div>;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {Object.keys(chartData).map((timeframe: string) => (
        <div key={`mood-chart--${timeframe}`}>
          <h2>{timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Mood Trends</h2>
          <Line
            data={chartData[timeframe]}
            options={getChartOptions(timeframe)} // TODO: resolve Typescript issues with generated options
          />
        </div>
      ))}
    </div>
  );
}

export default MoodChartContainer;
