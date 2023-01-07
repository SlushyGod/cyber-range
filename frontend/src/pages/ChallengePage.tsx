import * as React from 'react';
import ChallengeCard from '../components/challenge/ChallengeCard.tsx';
import { getChallenges, getTasks } from '../api/HttpRequests'; 
import Task from '../classes/Task';
import ChallengeGroup from '../components/challenge/ChallengeGroup';

const ChallengePage = () => {
  const [challenges, setChallenges] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);

  const loadChallenges = async () => {
    try {
      let curChallenges = await getChallenges();
      setChallenges(curChallenges);
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

  React.useEffect(() => {
    loadChallenges();
    loadTasks();
  }, []);

  let challengeGroups = {};
  challenges.map(challenge => {
    if (challengeGroups[challenge.group] == undefined) {
      challengeGroups[challenge.group] = [challenge];
    } else {
      challengeGroups[challenge.group].push(challenge);
    }
  });

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
