import DATE_GRANULARITY, { NUM_OF_DAYS } from '../../../constants/DATE_GRANULARITY';

const getMaxDate = () => new Date();
const getMinDate = (timeframe: string) => {
  const date = new Date();
  date.setDate(date.getDate() - NUM_OF_DAYS[timeframe]);
  return date;
};

// Made to handle missing gaps in data
const getChartOptions = (timeframe: string) => ({
  responsive: true,
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
      bounds: 'ticks',
      min: getMinDate(timeframe),
      max: getMaxDate(),
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
  spanGaps: false, // Show gaps in the line for missing data
  datasets: {
    line: {
      // Ensure null values don't break the line
      spanGaps: false,
      // Custom segment styling for null values
      segment: {
        borderColor: ctx => 
          ctx.p0.parsed.y === null || ctx.p1.parsed.y === null 
            ? 'rgba(200, 200, 200, 0.3)' 
            : undefined,
        borderDash: ctx => 
          ctx.p0.parsed.y === null || ctx.p1.parsed.y === null 
            ? [4, 4] 
            : undefined
      }
    }
  }
});

export { getChartOptions };
