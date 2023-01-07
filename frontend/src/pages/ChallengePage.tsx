import * as React from 'react';
import ChallengeCard from '../components/challenge/ChallengeCard.tsx';
import { getChallenges, getTasks } from '../api/HttpRequests'; 
import Challenge from '../classes/Challenge';
import Task from '../classes/Task';

import ChallengeGroup from '../components/challenge/ChallengeGroup';

const ChallengePage = () => {
  const [challenges, setChallenges] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);

  const loadChallenges = async () => {
    try {
      let challengesJSON = await getChallenges();
      let tmpChallenges = challengesJSON.map(challengeJSON => {
        return Challenge.fromJSON(challengeJSON);
      });
      setChallenges(tmpChallenges);
    } catch (error) { 
      console.log(error);
    } 
  } 
   
  const loadTasks = async () => {
    try {
      let curTasks = await getTasks();
      curTasks = curTasks.map(task => {
        return new Task(task.id, task.connection);
      }); 
      setTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  }

  const syncChallengeTasks = () => {

  }

  React.useEffect(() => {
    loadChallenges();
    loadTasks();
    syncChallengeTasks();
  }, []);

  let challengeGroups = challenges.reduce((acc, cur) => {
    acc[cur.group] = acc[cur.group] || [];
    acc[cur.group].push(cur);
    return acc;
  }, {});

  let challengeGroupElem = [];
  for (let [key, val] of Object.entries(challengeGroups)) {
    console.log('group values', val)
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
