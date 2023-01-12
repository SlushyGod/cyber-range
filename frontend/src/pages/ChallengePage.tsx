import * as React from 'react';
import ChallengeCard from '../components/challenge/ChallengeCard.tsx';
import { getChallenges, getTasks } from '../api/HttpRequests'; 
import Challenge from '../classes/Challenge';
import Task from '../classes/Task';

import ChallengeGroup from '../components/challenge/ChallengeGroup';

const ChallengePage = () => {
  const [fullChallenges, setFullChallenges] = React.useState([]);

  const getChallengesWithTasks = async () => {
    try {
      let [challenges, tasks] = await Promise.all([getChallenges(), getTasks()])
      tasks.map(task => {
        challenges.map(challenge => {
          if (challenge.id == task.challengeId) {
            challenge['task'] = task;
          }
        });
      });
      setFullChallenges(challenges);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getChallengesWithTasks();
  }, []);

  let challengeGroups = fullChallenges.reduce((acc, cur) => {
    acc[cur.group] = acc[cur.group] || [];
    acc[cur.group].push(cur);
    return acc;
  }, {});

  let challengeGroupElem = [];
  for (let [key, val] of Object.entries(challengeGroups)) {
    challengeGroupElem.push(
      <ChallengeGroup challenges={val} challengeGroup={key} id={key} />
    );
  }

  return (
    <>
      {challengeGroupElem}
    </>
  );
}

export default ChallengePage;
