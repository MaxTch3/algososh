import { ElementStates } from "../../types/element-states";

export interface IQueue<T> {
   enqueue: (item: T) => void;
   dequeue: () => void;
   peak: () => T | null;
}

export interface IQueueItem {
   state?: ElementStates;
   head?: string;
   tail?: string;
   value?: string
}