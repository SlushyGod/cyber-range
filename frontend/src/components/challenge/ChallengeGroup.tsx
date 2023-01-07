import * as React from 'react';
import Box from '@mui/material/Box';

import ChallengeCard from './ChallengeCard';

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

interface ChallengeGroupProps {
  challenges: Challenge[];
  challengeGroup: string;
};

const ChallengeGroup = ({challenges, challengeGroup}: ChallengeGroupProps) => {
  let challengesElem = challenges.map(challenge => (
    <ChallengeCard challenge={challenge} id={challenge.group+challenge.name} />
  ));

  return (
    <Box>
      <h1>{challengeGroup}</h1>
      {challengesElem}
    </Box>
  );
}

export default ChallengeGroup;
