import DATE_GRANULARITY from '../../../constants/DATE_GRANULARITY';

// Made to handle missing gaps in data
const getChartOptions = (timeframe: string) => ({
  // responsive: true,
  scales: {
    x: {
      type: 'time',
      time: {
        unit: timeframe === DATE_GRANULARITY.DAILY ? 'day' : timeframe === DATE_GRANULARITY.WEEKLY ? 'week' : timeframe === DATE_GRANULARITY.MONTHLY ? 'month' : 'year',
        tooltipFormat: 'MMM d, yyyy',
        displayFormats: {
          day: 'MMM d',
          week: 'MMM d',
          month: 'MMM yyyy',
          year: 'yyyy'
        },
      },
      title: {
        display: true,
        text: 'Date'
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
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          return context.raw === null
            ? 'No data'
            : `Mood: ${context.raw?.x}`;
        }
      }
    }
  },
  spanGaps: false // Show gaps in the line for missing data
});

export { getChartOptions };
