import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Task from '../../types/Task';
import { startTask } from '../../api/HttpRequests';

const TaskControlBar = (challengeId: string, task: Task | null) => {
  const [timer, setTimer] = React.useState(0);
  const [connection, setConnection] = React.useState('');
  const interval = React.useRef(null);

  const clearTimer = () => {
    if (interval.current != undefined) {
      clearInterval(interval.current);
    }
  };
  
  const startTimer = () => {
    if (interval.current != undefined) return;

    interval.current = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
  };

  const getRemainingTime = (timeout: number) => {
    let currentTime = Math.floor(Date.now() / 1000);
    if (timeout < currentTime) return 0;
    return timeout - currentTime;
  }

  const handleStartTask = async () => {
    try {
      console.log('this should be a func', startTask);
      let newTask = await startTask(challengeId);
      setTimer(getRemainingTime(newTask.timeout));
      setConnection(newTask.connection);
      startTimer();
    } catch (error) {
      console.log(error);
    } 
  }

  React.useEffect(() => {
    if (task != null) {
      setTimer(getRemainingTime(task.timeout));
      setConnection(task.connection);
      startTimer();
    }

    return () => {
      clearTimer();
    }
  }, []);

  let buttonStatus = (timer > 0) ? 'Restart' : 'Start';
  let timerStatus = (timer > 0) ? <span>Remaining Time: {timer}</span> : '';
  let connectionStatus = (timer > 0) ? <div>{connection}</div> : '';

  return (
    <Box>
      <Button
        onClick={handleStartTask}
      >
        {buttonStatus}
      </Button>
      {timerStatus}
      {connectionStatus}
    </Box>
  );
}

export default TaskControlBar;
