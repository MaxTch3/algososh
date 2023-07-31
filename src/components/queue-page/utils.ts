import { IQueue } from './types';

export class Queue<T> implements IQueue<T> {
   private container: (T | undefined)[] = [];
   private head = 0;
   private tail = 0;
   private readonly size: number = 0;
   private length: number = 0;

   constructor(size: number) {
      this.size = size;
      this.container = Array(size);
   }

   enqueue = (item: T) => {
      if (this.length >= this.size) {
         throw new Error('Maximum length exceeded');
      }
      if (this.tail < this.size) {
         this.container[this.tail % this.size] = item;
         this.tail++;
         this.length++;
      }

   };

   dequeue = () => {
      if (this.head === this.size) {
         this.container[this.head % this.size] = undefined;
      } else {
         if (this.length > 0) {
            this.container[this.head % this.size] = undefined;
            this.head++;
            this.length--;
         }
      }
   };

   getQueue = (): (T | undefined)[] => { return [...this.container] };

   getHead = () => this.head;

   getTail = () => this.tail;

   reset = (): void => {
      this.container = Array(this.size);
      this.head = 0;
      this.tail = 0;
   };

}