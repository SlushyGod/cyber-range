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
    return new Challenge(
      data.category,
      data.downloads,
      data.name,
      data.group
    )
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
    this.task = await Task().start(this.group + '#' + this.name);
    return this.task;
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
