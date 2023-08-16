import { ElementStates } from '../../types/element-states';

export enum AlgorithmMethod { SelectionSort, BubbleSort };

export interface IColumn {
   number: number;
   state: ElementStates
};

export interface IStep {
   array: number[],
   currentIndex: number,
   comparedIndex: number,
   lastIndex?: number
}
