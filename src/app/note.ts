import { Task } from './task';

export interface Note {
  title: string;
  label: string;
  tasks: Task[];
  pinned: boolean;
}
