import { IStack } from './types';

export class Stack<T> implements IStack<T> {
   private container: T[] = [];
   push = (item: T): void => {
      this.container.push(item)
   };
   pop = (): void => {
      if (this.getSize()) {
         this.container.pop()
      }
   };

   reset = (): void => { this.container = [] };
   getSize = () => this.container.length;
   getItems = () => this.container
}
