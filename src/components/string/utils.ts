import { ElementStates } from "../../types/element-states";

export const swap = (arr: string[], firstIndex: number, secondIndex: number): void => {
   const temp = arr[firstIndex];
   arr[firstIndex] = arr[secondIndex];
   arr[secondIndex] = temp;
}

export const getLetterState = (length: number, currIndex: number, start: number = 0, end = length - 1) => {
   if (start >= end
      || (start < end && (currIndex < start || currIndex > end))) {
      return ElementStates.Modified;
   }
   if (start < end) {
      if (currIndex === start || currIndex === end) {
         return ElementStates.Changing
      }
   }
}

export function getReversingStringSteps(sourceArray: string[]): string[][] {
   const reversingStringSteps = [[...sourceArray]];
   for (let i = 0; i < sourceArray.length - i - 1; i++) {
      swap(sourceArray, i, sourceArray.length - i - 1);
      reversingStringSteps.push([...sourceArray])
   }
   return reversingStringSteps
} 
