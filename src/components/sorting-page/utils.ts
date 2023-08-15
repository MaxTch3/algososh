import { ElementStates } from '../../types/element-states';
import { IStep } from './types';

export const randomArr = (minLength: number, maxLength: number) => {
   let array: number[] = [];
   const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
   for (let i = 0; i < length; i++) {
      array.push(Math.floor(Math.random() * 101))
   }
   return array
}

export const getSelectionSortSteps = (arr: number[], order: string): IStep[] => {
   const steps: { array: number[], currentIndex: number, comparedIndex: number }[] = [];
   for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
         steps.push({ array: arr.slice(), currentIndex: i, comparedIndex: j });
         if ((order === 'asc' && arr[j] < arr[minIndex]) || (order !== 'asc' && arr[j] > arr[minIndex])) {
            minIndex = j;
         }
      }
      if (minIndex !== i) {
         [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      }
   }
   steps.push({ array: arr.slice(), currentIndex: -1, comparedIndex: -1 });
   return steps;
}

export const getBubbleSortSteps = (arr: number[], order: string): IStep[] => {
   const steps: IStep[] = [];
   for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
         steps.push({ array: arr.slice(), currentIndex: j, comparedIndex: j + 1, lastIndex: arr.length - 1 - i });
         if ((order === 'asc' && arr[j] > arr[j + 1]) || (order !== 'asc' && arr[j] < arr[j + 1])) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            steps.push({ array: arr.slice(), currentIndex: j, comparedIndex: j + 1, lastIndex: arr.length - 1 - i });
         }
      }
   }
   steps.push({ array: arr.slice(), currentIndex: -1, comparedIndex: -1, lastIndex: -1 });

   return steps;
}

export const getStateSelectionSorting = (index: number, currentIndex: number, comparedIndex: number) => {
   if (index === currentIndex || index === comparedIndex) return ElementStates.Changing;
   if (index < currentIndex || (currentIndex === comparedIndex && currentIndex !== null)) return ElementStates.Modified;
   if (index > currentIndex && index < comparedIndex) return ElementStates.Default
}

export const getStateBubbleSorting = (index: number, currentIndex: number, comparedIndex: number, lastIndex: number) => {
   if (index === currentIndex || index === comparedIndex) return ElementStates.Changing;
   if (index > lastIndex && lastIndex) return ElementStates.Modified
   if (!index) return ElementStates.Default
}
