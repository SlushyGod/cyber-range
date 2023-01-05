import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';

import { checkFlag, startChallenge, getTasks } from '../api/HttpRequests';

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
  const [flag, setFlag] = React.useState('');

  /* Will need to push this to server side later */
  const handleCheckFlag = () => {
    checkFlag(
      flag,
      challenge.challenge.group,
      challenge.challenge.name
    ).then(data => {
      console.log(data);
      if (data == 1) alert('goodjob');
      else alert('badjob');
    }).catch(err => {
      console.log(err);
    });
  };

  const handleFlagChange = (e) => {
    setFlag(e.target.value);
    getTasks().then(resp => console.log(resp)).catch(err => console.log(err));
  }

  const handleStartChallenge = () => {
    startChallenge(challenge.challenge.group, challenge.challenge.name)
      .then(resp => {
        alert(resp);
      }).catch(err => {
        console.log(err);
      });
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={challenge.challenge.name}
      />
        <Button size="small" onClick={handleStartChallenge}>Launch</Button>
      <CardContent>
        <Typography variant="body2">
          {/*Put this in the backend code, backend should send the full url down*/}
          <a href="https://trey-cyber-range.s3.us-east-2.amazonaws.com/{challenge.challenge.static[0]}" target="_blank">{challenge.challenge.downloads[0]}</a>
        </Typography>
      </CardContent>

      <CardActions>
        <Box sx={{ display: 'flex', 'flexWrap': 'wrap' }}>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-flag">flag{"{}"}</InputLabel>
            <OutlinedInput
              id="outlined-flag"
              type="text"
              label="flag{}"
              value={flag}
              onChange={handleFlagChange}
            />
          </FormControl>

          <Button onClick={handleCheckFlag}>Submit</Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export { ChallengeCard };

