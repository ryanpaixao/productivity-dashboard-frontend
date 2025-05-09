import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
// import { format } from 'date-fns';
import { Box, Heading, useColorMode } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const dates = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const TrendsChart = ({ moodData, habitData }) => {
  const { colorMode } = useColorMode();

  // Sample data structure. (Replace with actual data in future)
  // const moodValues = [3, 4, 2, 5, 4, 3, 5]; // 1-5 scale
  // const habitValues = [1, 1, 0, 1, 1, 0, 1]; // 0 or 1 (done/not done)
  const [moodValues, setMood] = useState([]);
  const [habitValues, setHabit] = useState([]);

  useEffect(() => {
    setMood(moodData);
  }, [moodData]);

  useEffect(() => {
    setHabit(habitData);
  }, [habitData])
  
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Mood (1-5)',
        data: moodValues,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        yAxisID: 'y',
      },
      {
        label: 'Habit Completion',
        data: habitValues,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.3,
        yAxisID: 'y1'
      },
    ],
  };

  const options ={
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          color: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: colorMode === 'dark' ? 'white' : 'gray.800',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        min: 0,
        max: 5,
        grid: {
          color: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: colorMode === 'dark' ? 'white' : 'gray.800',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        min: 0,
        max: 1,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Heading size="md" mb={4}>Weekly Trends</Heading>
      <Line data={data} options={options} />
    </Box>
  );
};
