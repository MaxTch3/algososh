import { ElementStates } from '../../types/element-states';

export interface IColumn {
   number: number;
   state: ElementStates
};

export enum AlgorithmMethod { SelectionSort, BubbleSort };
