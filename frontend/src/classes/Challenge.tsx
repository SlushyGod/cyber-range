import Task from './Task';
import { checkFlag } from '../api/HttpRequests';

// Think I should just add task into challenge
class Challenge {
  category: string;
  downloads: string[];
  name: string;
  group: string;
  task: Task;

  static fromJSON(data) {
    return new Challenge({
      category: data.category,
      downloads: data.downloads,
      name: data.name,
      group: data.group
    })
  }

  constructor({...args}) {
    this.category = args.category;
    this.downloads = args.downloads;
    this.name = args.name;
    this.group = args.group;
    this.task = new Task(this.group + '#' + this.name);
  }

  async isFlagCorrect(flag) {
    try {
      let flagCorrect = await checkFlag(flag, this.group, this.name);
      return (flagCorrect == 1) ? true : false;
    } catch (error) {
      console.log(error);
    }
  }

  async startTask() {
    try{
      await this.task.start();
      return this.task;
    } catch (error) {
      console.log(error);
    }
  }

  hasTask() {
    return this.task.isRunning();
  }

  getTask() {
    return this.task;
  }

  timeLeft() {
    return this.task.getRemainingTime();
  }
}

export default Challenge;
