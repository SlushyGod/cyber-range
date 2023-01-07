import { API } from 'aws-amplify';

/*
  /challenges

  Endpoint for grabbing challenge data
 */
const getChallenges = () => {
  const apiName = 'cyber-range-api';
  const path = '/challenges';
  const myInit = { };

  return API.get(apiName, path, myInit);
};


const checkFlag = (flag: string, group: string, name: string) => {
  const apiName = 'cyber-range-api';
  const path = '/challenges/flag';
  const req = {
    body: {
      flag: flag,
      group: group,
      name: name
    }
  };

  return API.post(apiName, path, req);
};

const getTasks = () => {
  const apiName = 'cyber-range-api';
  const path = '/task';
  const req = { };

  return API.get(apiName, path, req);
};

const startTask = (challengeId: string) => {
  let [group, name] = challengeId.split('#');

  const apiName = 'cyber-range-api';
  const path = '/task';
  const req = {
    body: {
      group: group,
      name: name
    }
  };

  return API.post(apiName, path, req);
}

export {getChallenges, checkFlag, startTask, getTasks};
