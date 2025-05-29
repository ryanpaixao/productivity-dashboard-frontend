import DATE_GRANULARITY from '../../constants/DATE_GRANULARITY';

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

// Function to format chart data
const formatChartData = (data: any, timeframe: string) => {
  console.log('Formatting data for timeframe:', timeframe, 'Data:', data);
  if (!data) return null;
  if (!Array.isArray(data) || data.length === 0) return null;
  const ratings: number[] = [];
  const labels: string[] = [];

  switch (timeframe) {
    case (DATE_GRANULARITY.DAILY):
      data.map((item: { averageRating: number; date: string }) => {
        if (item.averageRating) {
          ratings.push(item.averageRating);
          labels.push(item.date);
        }
      });
      break;
    case (DATE_GRANULARITY.WEEKLY):
      data.map((item: { averageRating: number; year: string, week: string }) => {
        if (item.averageRating) {
          ratings.push(item.averageRating);
          labels.push(`${item.year}-${item.week}`);
        }
      });
      break;
    case (DATE_GRANULARITY.MONTHLY):
      data.map((item: { averageRating: number; year: string, month: string }) => {
        if (item.averageRating) {
          ratings.push(item.averageRating);
          labels.push(`${item.year}-${item.month}`);
        }
      });
      break;
    case (DATE_GRANULARITY.YEARLY):
      data.map((item: { averageRating: number; year: string }) => {
        if (item.averageRating) {
          ratings.push(item.averageRating);
          labels.push(item.year);
        }
      });
      break;
  }
  console.log('Formatted ratings:', ratings, 'Labels:', labels);
  return {
    labels,
    datasets: [
      {
        label: `Mood (${timeframe})`,
        data: ratings,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: getColorForTimeframe(timeframe),
        fill: true,
        tension: 0.1,
      },
    ],
  };
};

export { formatChartData };
