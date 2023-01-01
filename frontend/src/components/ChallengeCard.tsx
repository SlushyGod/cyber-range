import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface Challenge {
	category: string;
  name: string;
  ecs_cluster: string;
  ecs_task: string;
  flag: string;
  group: string;
  static: string[];
  timeout: number;
  type: string;
};

const ChallengeCard = (challenge: Challenge) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={challenge.challenge.name}
      />

      <CardContent>
        <Typography variant="body2">
          well meaning and kindly.
          {/*Put this in the backend code, backend should send the full url down*/}
          <a href="https://trey-cyber-range.s3.us-east-2.amazonaws.com/{challenge.challenge.static[0]}" target="_blank">{challenge.challenge.static[0]}</a>
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Launch</Button>
      </CardActions>
    </Card>
  );
};

export { ChallengeCard };

