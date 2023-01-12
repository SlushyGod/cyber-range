import Task from './Task';
import { checkFlag } from '../api/HttpRequests';

// Think I should just add task into challenge
class Challenge {
  id: string;
  category: string;
  downloads: string[];
  name: string;
  group: string;
  task: Task;

  static fromJSON(data) {
    return new Challenge({
      id: data.id,
      category: data.category,
      downloads: data.downloads,
      name: data.name,
      group: data.group
    })
  }

  constructor({...args}) {
    this.id = args.id;
    this.category = args.category;
    this.downloads = args.downloads;
    this.name = args.name;
    this.group = args.group;
    this.task = new Task(this.group + '#' + this.name);
  }

  addTask(task: Task) {
    this.task = task;
  }

  async isFlagCorrect(flag: string) {
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
