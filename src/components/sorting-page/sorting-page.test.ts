import { getSelectionSortSteps, getBubbleSortSteps } from './utils';

describe('Корректность сортировки выбором', () => {
   it('пустой массив по возрастанию', () => {
      const array: number[] = [];
      const result = getSelectionSortSteps(array, 'asc');
      expect(result).toEqual([{ array: [], currentIndex: -1, comparedIndex: -1 }])
   });

   it('пустой массив по убыванию', () => {
      const array: number[] = [];
      const result = getSelectionSortSteps(array, 'desc');
      expect(result).toEqual([{ array: [], currentIndex: -1, comparedIndex: -1 }])
   });

   it('массив из одного элемента по возрастанию', () => {
      const array = [7];
      const result = getSelectionSortSteps(array, 'asc');
      expect(result).toEqual([{ array: [7], currentIndex: -1, comparedIndex: -1 }])
   });

   it('массив из одного элементa по убыванию', () => {
      const array = [7];
      const result = getSelectionSortSteps(array, 'desc');
      expect(result).toEqual([{ array: [7], currentIndex: -1, comparedIndex: -1 }])
   });

   it('массив из нескольких элементов по возрастанию', () => {
      const array = [3, 1, 2, 4];
      const result = getSelectionSortSteps(array, 'asc');
      expect(result).toEqual([
         { array: [3, 1, 2, 4], currentIndex: 0, comparedIndex: 1 },
         { array: [3, 1, 2, 4], currentIndex: 0, comparedIndex: 2 },
         { array: [3, 1, 2, 4], currentIndex: 0, comparedIndex: 3 },
         { array: [1, 3, 2, 4], currentIndex: 1, comparedIndex: 2 },
         { array: [1, 3, 2, 4], currentIndex: 1, comparedIndex: 3 },
         { array: [1, 2, 3, 4], currentIndex: 2, comparedIndex: 3 },
         { array: [1, 2, 3, 4], currentIndex: -1, comparedIndex: -1 }
      ])
   });

   it('массив из нескольких элементов по убыванию', () => {
      const array = [3, 1, 2, 4];
      const result = getSelectionSortSteps(array, 'desc');
      expect(result).toEqual([
         { array: [3, 1, 2, 4], currentIndex: 0, comparedIndex: 1 },
         { array: [3, 1, 2, 4], currentIndex: 0, comparedIndex: 2 },
         { array: [3, 1, 2, 4], currentIndex: 0, comparedIndex: 3 },
         { array: [4, 1, 2, 3], currentIndex: 1, comparedIndex: 2 },
         { array: [4, 1, 2, 3], currentIndex: 1, comparedIndex: 3 },
         { array: [4, 3, 2, 1], currentIndex: 2, comparedIndex: 3 },
         { array: [4, 3, 2, 1], currentIndex: -1, comparedIndex: -1 }
      ])
   });
});

describe('Корректность сортировки пузырьком', () => {
   it('пустой массив по возрастанию', () => {
      const array: number[] = [];
      const result = getBubbleSortSteps(array, 'asc');
      expect(result).toEqual([{ array: [], currentIndex: -1, comparedIndex: -1, lastIndex: -1 }])
   });

   it('пустой массив по убыванию', () => {
      const array: number[] = [];
      const result = getBubbleSortSteps(array, 'desc');
      expect(result).toEqual([{ array: [], currentIndex: -1, comparedIndex: -1, lastIndex: -1 }])
   });

   it('массив из одного элемента по возрастанию', () => {
      const array = [7];
      const result = getBubbleSortSteps(array, 'asc');
      expect(result).toEqual([{ array: [7], currentIndex: -1, comparedIndex: -1, lastIndex: -1 }])
   });

   it('массив из одного элементa по убыванию', () => {
      const array = [7];
      const result = getBubbleSortSteps(array, 'desc');
      expect(result).toEqual([{ array: [7], currentIndex: -1, comparedIndex: -1, lastIndex: -1 }])
   });

   it('массив из нескольких элементов по возрастанию', () => {
      const array = [3, 1, 2, 4];
      const result = getBubbleSortSteps(array, 'asc');
      expect(result).toEqual([
         { array: [3, 1, 2, 4], currentIndex: 0, comparedIndex: 1, lastIndex: 3 },
         { array: [1, 3, 2, 4], currentIndex: 0, comparedIndex: 1, lastIndex: 3 },
         { array: [1, 3, 2, 4], currentIndex: 1, comparedIndex: 2, lastIndex: 3 },
         { array: [1, 2, 3, 4], currentIndex: 1, comparedIndex: 2, lastIndex: 3 },
         { array: [1, 2, 3, 4], currentIndex: 2, comparedIndex: 3, lastIndex: 3 },
         { array: [1, 2, 3, 4], currentIndex: 0, comparedIndex: 1, lastIndex: 2 },
         { array: [1, 2, 3, 4], currentIndex: 1, comparedIndex: 2, lastIndex: 2 },
         { array: [1, 2, 3, 4], currentIndex: 0, comparedIndex: 1, lastIndex: 1 },
         { array: [1, 2, 3, 4], currentIndex: -1, comparedIndex: -1, lastIndex: -1 }
      ])
   });

   it('массив из нескольких элементов по убыванию', () => {
      const array = [3, 1, 2, 4];
      const result = getBubbleSortSteps(array, 'desc');
      expect(result).toEqual([
         { array: [3, 1, 2, 4], currentIndex: 0, comparedIndex: 1, lastIndex: 3 },
         { array: [3, 1, 2, 4], currentIndex: 1, comparedIndex: 2, lastIndex: 3 },
         { array: [3, 2, 1, 4], currentIndex: 1, comparedIndex: 2, lastIndex: 3 },
         { array: [3, 2, 1, 4], currentIndex: 2, comparedIndex: 3, lastIndex: 3 },
         { array: [3, 2, 4, 1], currentIndex: 2, comparedIndex: 3, lastIndex: 3 },
         { array: [3, 2, 4, 1], currentIndex: 0, comparedIndex: 1, lastIndex: 2 },
         { array: [3, 2, 4, 1], currentIndex: 1, comparedIndex: 2, lastIndex: 2 },
         { array: [3, 4, 2, 1], currentIndex: 1, comparedIndex: 2, lastIndex: 2 },
         { array: [3, 4, 2, 1], currentIndex: 0, comparedIndex: 1, lastIndex: 1 },
         { array: [4, 3, 2, 1], currentIndex: 0, comparedIndex: 1, lastIndex: 1 },
         { array: [4, 3, 2, 1], currentIndex: -1, comparedIndex: -1, lastIndex: -1 }
      ])
   })
})