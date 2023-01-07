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
import TaskControlBar from './TaskControlBar';

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

const ChallengeCard = ({challenge}: Challenge) => {
  // TaskControlBar.tsx ?
  // TaskLauncherButton.tsx ?
  // TaskStatusBox.tsx ?

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={challenge.name}
      />
      <TaskControlBar challenge={challenge} />
      <CardContent>
        <ChallengeDownloadsDisplay downloads={challenge.downloads} />
      </CardContent>

      <CardActions>
        <FlagSubmissionField
          challenge={challenge}
        />
      </CardActions>
    </Card>
  );
};

export default ChallengeCard;

