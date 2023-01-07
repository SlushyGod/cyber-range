import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Challenge from '../../classes/Challenge';

const TaskControlBar = ({challenge}: Challenge) => {
  const [timer, setTimer] = React.useState(0);
  const interval = React.useRef(null);
  const task = React.useRef(null);


  const clearTimer = () => {
    if (interval.current != undefined) {
      clearInterval(interval.current);
    }
  };
  
  const startTimer = (time) => {
    setTimer(time);
    interval.current = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
  };

  const startTask = async () => {
    try {
      let tmpTask = await challenge.startTask();
      clearTimer();

      startTimer(tmpTask.getRemainingTime());
      task.current = tmpTask;
    } catch (error) {
      console.log(error);
    } 
  }

  let timeout;
  let buttonStatus;
  let connection;
  let curTask = challenge.getTask();
  if (curTask.isRunning()) {
    startTimer(curTask.getRemainingTime());
    timeout = <div>Time Left: {timer}</div>;
    connection = curTask.connection;
  }
  buttonStatus = curTask.isRunning() ? 'Restart' : 'Start';

  React.useEffect(() => {
    task.current = challenge.getTask();

    return () => {
      clearTimer();
    }
  }, []);

  return (
    <Box>
      <Button
        onClick={startTask}
      >
        {buttonStatus}
      </Button>
      {timer}
      {timeout}
      {connection}
    </Box>
  );
}

export default TaskControlBar;
