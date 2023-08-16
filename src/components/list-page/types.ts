export class ListNode<T> {
   value: T;
   next: ListNode<T> | null;

   constructor(value: T) {
      this.value = value;
      this.next = null
   }
}

export interface IList<T> {
   push: (value: T) => void;
   unshift: (value: T) => void;
   insertAt: (value: T, index: number) => void;
   deleteAt: (index: number) => void
}
