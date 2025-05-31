// import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

import MoodChartContainer from '../components/trends/MoodChartContainer';
// import TimeFrameSelector from '../components/trends/TimeFrameSelector'; // TODO: Add TimeFrame Selector

// Constants
// import DATE_GRANULARITY from '../constants/DATE_GRANULARITY';

const Trends = () => {
  // const savedTimeFrame = localStorage.getItem('activeMoodTimeFrame');
  // const [timeFrame, setTimeFrame] = useState(savedTimeFrame || DATE_GRANULARITY.DAILY);

  // useEffect(() => {
  //   localStorage.setItem('activeMoodTimeFrame', timeFrame);
  // }, [timeFrame]);

  return (
    <Box>
      {/* <TimeFrameSelector timeFrame={timeFrame} setTimeFrame={setTimeFrame} /> */}
      <MoodChartContainer/>
    </Box>
  );
};

export default Trends;
