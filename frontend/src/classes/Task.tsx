import { startTask } from '../api/HttpRequests';

class Task {
  challengeId: string;
  connection: string;
  timeout = 0;

  constructor(challengeId: string, ...args) {
    this.challengeId = challengeId;
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
