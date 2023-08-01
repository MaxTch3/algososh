import { ElementStates } from '../../types/element-states';

export interface IQueue<T> {
   enqueue: (item: T) => void;
   dequeue: () => void;
   getQueue: () => Array<T | undefined>
}

export interface IQueueItem {
   state?: ElementStates;
   value?: string;
}