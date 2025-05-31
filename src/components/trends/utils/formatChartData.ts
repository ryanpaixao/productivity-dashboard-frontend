import DATE_GRANULARITY from '../../../constants/DATE_GRANULARITY';
import { getDateFromWeek } from './getDateFromWeek.js';

const getColorForTimeframe = (timeframe: string) => {
  switch (timeframe) {
    case DATE_GRANULARITY.DAILY:
      return 'rgba(255, 99, 132, 0.2)';
    case DATE_GRANULARITY.WEEKLY:
      return 'rgba(54, 162, 235, 0.2)';
    case DATE_GRANULARITY.MONTHLY:
      return 'rgba(255, 206, 86, 0.2)';
    case DATE_GRANULARITY.YEARLY:
      return 'rgba(153, 102, 255, 0.2)';
    default:
      return 'rgba(75, 192, 192, 0.2)';
  }
};

const transformData = (data: Array<any>, timeframe: string) => {
  const transformedData: Array<{ x: Date; y: number }> = [];

  switch (timeframe) {
    case (DATE_GRANULARITY.DAILY):
      data.map((item: { averageRating: number; date: string }) => {
        if (item.averageRating) {
          transformedData.push({
            y: item.averageRating,
            x: new Date(item.date)
          });
        }
      });
      break;
    case (DATE_GRANULARITY.WEEKLY):
      data.map((item: { averageRating: number; year: string, week: string }) => {
        if (item.averageRating) {
          transformedData.push({
            y: item.averageRating,
            x: getDateFromWeek(Number(item.year), Number(item.week))
          });
        }
      });
      break;
    case (DATE_GRANULARITY.MONTHLY):
      data.map((item: { averageRating: number; year: string, month: string }) => {
        if (item.averageRating) {
          transformedData.push({
            y: item.averageRating,
            x: new Date(Number(item.year), Number(item.month) - 1, 1)
          });
        }
      });
      break;
    case (DATE_GRANULARITY.YEARLY):
      data.map((item: { averageRating: number; year: string }) => {
        if (item.averageRating) {
          transformedData.push({
            y: item.averageRating,
            x: new Date(Number(item.year), 0, 1)
          });
        }
      });
      break;
  }

  return transformedData;
};

// Function to format chart data
const formatChartData = (data: any, timeframe: string) => {
  if (!data) return null;
  if (!Array.isArray(data) || data.length === 0) return null;

  return {
    // labels,
    datasets: [
      {
        label: `Mood (${timeframe})`,
        data: transformData(data, timeframe),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: getColorForTimeframe(timeframe),
        fill: true,
        tension: 0.1,
        spanGaps: false,
        segment: {
          borderDash: ctx => ctx.p0.skip || ctx.p1.skip ? [6, 6] : undefined
        }
      },
    ],
  };
};

export { formatChartData };
