export interface IQueue<T> {
   enqueue: (item: T) => void;
   dequeue: () => void;
   getQueue: () => Array<T | null>
}
