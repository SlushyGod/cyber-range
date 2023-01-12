import Task from './Task';

interface Challenge {
  id: string;
  category: string;
  downloads: string[];
  name: string;
  group: string;
  task: Task | null;
}

export default Challenge;
