import { Node } from './types';

export class List<T> {
   head: Node<T> | null;
   tail: Node<T> | null;

   constructor() {
      this.head = null;
      this.tail = null
   }

   push = (value: T) => {
      const newNode = new Node(value);
      if (this.isEmpty()) {
         this.head = newNode;
         this.tail = newNode
      } else {
         this.tail!.next = newNode;
         this.tail = newNode
      }
   }

   unshift = (value: T) => {
      const newNode = new Node(value);
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
      const newNode = new Node(value);
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
   }

   isEmpty = (): boolean => this.head === null;
   removeHead = () => { this.deleteAt(0) };
   removeTail = () => { this.deleteAt(this.size() - 1) };
}
