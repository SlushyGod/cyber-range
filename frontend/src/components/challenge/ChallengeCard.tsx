import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { startTask, getTasks } from '../../api/HttpRequests';
import FlagSubmissionField from './FlagSubmissionField';
import ChallengeDownloadsDisplay from './ChallengeDownloadsDisplay';

interface Challenge {
	category: string;
  downloads: string[];
  name: string;
  ecs_cluster: string;
  ecs_task: string;
  flag: string;
  group: string;
  timeout: number;
  type: string;
};

const ChallengeCard = (challenge: Challenge) => {
  const [task, setTask] = React.useState([]);

  React.useEffect(() => {
    getTasks()
      .then(data => {
        console.log(data);
        setTask(data);
      }).catch(err => {
        console.log(err);
      });
  }, []);

  // TaskControlBar.tsx ?
  // TaskLauncherButton.tsx ?
  // TaskStatusBox.tsx ?

  const handleStartChallenge = () => {
    startTask(challenge.challenge.group, challenge.challenge.name)
      .then(resp => {
        setTask([...task, resp]);
      }).catch(err => {
        console.log(err);
      });
  }

  let tasks = task.map(t => <div id={t.id}>{t.connection}</div>);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={challenge.challenge.name}
      />
      
      {tasks}
        <Button size="small" onClick={handleStartChallenge}>Launch</Button>
      <CardContent>
        <ChallengeDownloadsDisplay downloads={challenge.challenge.downloads} />
      </CardContent>

      <CardActions>
        <FlagSubmissionField
          group={challenge.challenge.group}
          name={challenge.challenge.name}
        />
      </CardActions>
    </Card>
  );
};

export { ChallengeCard };

