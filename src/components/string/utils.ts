import { IItem } from './types';

export const swap = (arr: IItem[], firstIndex: number, secondIndex: number): void => {
   const temp = arr[firstIndex];
   arr[firstIndex] = arr[secondIndex];
   arr[secondIndex] = temp;
}