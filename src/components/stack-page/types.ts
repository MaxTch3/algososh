import { ElementStates } from '../../types/element-states';

export interface IStack<T> {
   push: (item: T) => void;
   pop: () => void;
   reset: () => void
}

export interface IStackItem {
   state?: ElementStates;
   head?: string;
   value: string
}