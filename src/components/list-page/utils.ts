import { IList, ListNode } from './types';

export class List<T> implements IList<T>{
   head: ListNode<T> | null;
   tail: ListNode<T> | null;

   constructor(startingArray: T[]) {
      this.head = null;
      this.tail = null;
      if (startingArray.length) {
         startingArray.map((item) => this.push(item));
      }
   };

   toArray = (): T[] => {
      const result: T[] = [];
      let currNode = this.head;
      while (currNode !== null) {
         result.push(currNode.value);
         currNode = currNode.next;
      };
      return result;
   }

   push = (value: T) => {
      const newNode = new ListNode(value);
      if (this.isEmpty()) {
         this.head = newNode;
         this.tail = newNode
      } else {
         this.tail!.next = newNode;
         this.tail = newNode
      }
   }

   unshift = (value: T) => {
      const newNode = new ListNode(value);
      if (this.isEmpty()) {
         this.head = newNode;
         this.tail = newNode
      } else {
         newNode.next = this.head;
         this.head = newNode
      }
   }

   insertAt = (value: T, index: number) => {

      if (index < 0) {
         throw new Error('Ошибка: некорректный индекс')
      };
      if (index === 0) {
         this.unshift(value);
         return
      };
      const newNode = new ListNode(value);
      let count = 0;
      let currNode = this.head;
      let prevNode = null;
      while (count < index && currNode !== null) {
         prevNode = currNode;
         currNode = currNode.next;
         count++
      }
      if (count < index && currNode === null) {
         throw new Error('Ошибка: индекс вне допустимых границ');
      }
      prevNode!.next = newNode;
      newNode.next = currNode
   }

   deleteAt = (index: number) => {
      if (index < 0 || this.isEmpty()) {
         throw new Error('Ошибка: некорректный индекс');
      };
      if (index === 0) {
         this.head = this.head!.next;
         if (this.head === null) {
            this.tail = null;
         };
         return
      };
      let count = 0;
      let currNode = this.head;
      let prevNode = null;
      while (count < index && currNode !== null) {
         prevNode = currNode;
         currNode = currNode.next;
         count++;
      };
      if (count < index && currNode === null) {
         throw new Error('Ошибка: индекс вне допустимых границ');
      };
      prevNode!.next = currNode!.next;
      if (currNode === this.tail) {
         this.tail = prevNode
      }
   }

   size = (): number => {
      let count = 0;
      let currNode = this.head;
      while (currNode !== null) {
         count++;
         currNode = currNode.next;
      };
      return count
   };

   isEmpty = (): boolean => this.head === null
}
