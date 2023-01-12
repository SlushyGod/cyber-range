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
import Challenge from '../../types/Challenge';

const ChallengeCard = ({challenge}: Challenge) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={challenge.name}
      />
      <TaskControlBar challengeId={challenge.id} task={challenge.task} />
      <CardContent>
        <ChallengeDownloadsDisplay downloads={challenge.downloads} />
      </CardContent>

      <CardActions>
        <FlagSubmissionField
          challengeId={challenge.id}
        />
      </CardActions>
    </Card>
  );
};

export default ChallengeCard;

