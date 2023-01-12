import * as React from 'react';
import { startTask } from '../api/HttpRequests';


// Should public fields be used for state? private shouldnt?
//   or should every field be a state?

// Use state hook, then have a getter for the state values

//https://medium.com/swlh/decoupling-logic-from-react-components-f6035646c275

function Task() {
  const [challengeId, setChallengeId] = useState('');
  
  return state?
}

Task.Val()

class Task {
  challengeId: string;
  connection: string;
  timeout = 0;

  constructor(args) {
    this.challengeId = args.challengeId;
    if (args == undefined) return;
    if (args['connection'] != undefined) this.connection = args.connection; 
    if (args['timeout'] != undefined) this.timeout = args.timeout; 
  }

  // Would this be good or bad practice? Does js do things by reference?
  setIfDefined(obj, key, field) {
    
  }

  // Make this a static function? so it can load challengeId
  // task.start(challengeId);
  async start() {
    try {
      let taskInfo = startTask(this.challengeId);
      this.connection = taskInfo.connection;
      this.timeout = taskInfo.timeout || (30 * 60 * 1000);
    } catch (error) {
      console.log(error);
    }
  }

  async stop() {
    if (!this.isRunning()) {
      return;
    }

    try {
      let resp = stopTask(this.challengeId);
      this.timeout = 0;
    } catch (error) {
      console.log(error);
    }
  }

  isRunning() {
    let currentTime = Math.floor(Date.now() / 1000);
    return (currentTime < this.timeout);
  }

  getRemainingTime() {
    let currentTime = Math.floor(Date.now() / 1000);
    return this.timeout - currentTime;
  }
}

export default Task;
