import React, { useEffect, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import styles from './sorting-page.module.css'
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import {
   getBubbleSortSteps,
   getSelectionSortSteps,
   getStateBubbleSorting,
   getStateSelectionSorting,
   randomArr
} from './utils';
import { Column } from '../ui/column/column';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils/utils';
import { AlgorithmMethod } from './types';

export const SortingPage: React.FC = () => {
   const minLength: number = 3;
   const maxLength: number = 17;
   const [array, setArray] = useState<number[]>([]);
   const [method, setMethod] = useState(AlgorithmMethod.SelectionSort);
   const [isLoaderAsc, setIsLoaderAsc] = useState(false);
   const [isLoaderDesc, setIsLoaderDesc] = useState(false);
   const [currentIndex, setCurrentIndex] = useState<number | null>();
   const [comparedIndex, setComparedIndex] = useState<number | null>();
   const [lastIndex, setLastIndex] = useState<number | null>()

   const createArray = useMemo(() => () => {
      const newArray = randomArr(minLength, maxLength);
      setCurrentIndex(null);
      setComparedIndex(null);
      setLastIndex(null);
      setArray(newArray)
   }, [setArray])

   useEffect(() => {
      createArray()
   }, [createArray]);

   const resetStatus = () => {
      setArray(array)
   }

   const selectionSort = async (arr: number[], order: 'asc' | 'desc') => {
      if (order === 'asc') {
         setIsLoaderAsc(true);
      } else {
         setIsLoaderDesc(true);
      };
      
      const steps = getSelectionSortSteps(arr, order);

      for (let step of steps) {
         setArray(step.array);
         setCurrentIndex(step.currentIndex);
         setComparedIndex(step.comparedIndex);
         await delay(SHORT_DELAY_IN_MS)
      };

      if (order === 'asc') {
         setIsLoaderAsc(false);
      } else {
         setIsLoaderDesc(false);
      }
   }

   const bubbleSort = async (arr: number[], order: 'asc' | 'desc') => {
      if (order === 'asc') {
         setIsLoaderAsc(true);
      } else {
         setIsLoaderDesc(true);
      }

      const steps = getBubbleSortSteps(arr, order);

      for (let step of steps) {
         setArray(step.array);
         setCurrentIndex(step.currentIndex);
         setComparedIndex(step.comparedIndex);
         setLastIndex(step.lastIndex);
         await delay(SHORT_DELAY_IN_MS)
      };

      if (order === 'asc') {
         setIsLoaderAsc(false);
      } else {
         setIsLoaderDesc(false);
      }
   }

   useEffect(() => {
      return () => {
         setIsLoaderAsc(false);
         setIsLoaderDesc(false);
         setArray([])
      }
   }, [])

   return (
      <SolutionLayout title='Сортировка массива'>
         <div className={styles.container}>
            <div className={styles.control_box}>
               <div className={styles.radio_box}>
                  <RadioInput
                     checked={method === AlgorithmMethod.SelectionSort}
                     onChange={() => setMethod(AlgorithmMethod.SelectionSort)}
                     label='Выбор'
                     disabled={isLoaderAsc || isLoaderDesc}
                  />
                  <RadioInput
                     checked={method === AlgorithmMethod.BubbleSort}
                     onChange={() => setMethod(AlgorithmMethod.BubbleSort)}
                     label='Пузырёк'
                     disabled={isLoaderAsc || isLoaderDesc}
                  />
               </div>
               <div className={styles.buttons}>
                  <div className={styles.buttons_sorting}>
                     <Button
                        text='По возрастанию'
                        type='button'
                        sorting={Direction.Ascending}
                        extraClass={styles.button_ascending}
                        onClick={() => {
                           resetStatus();
                           if (method === AlgorithmMethod.SelectionSort) {
                              selectionSort(array, 'asc')
                           } else {
                              bubbleSort(array, 'asc')
                           }
                        }}
                        isLoader={isLoaderAsc}
                        disabled={isLoaderDesc}
                     />
                     <Button
                        text='По убыванию'
                        type='button'
                        sorting={Direction.Descending}
                        extraClass={styles.button_descending}
                        onClick={() => {
                           resetStatus();
                           if (method === AlgorithmMethod.SelectionSort) {
                              selectionSort(array, 'desc')
                           } else {
                              bubbleSort(array, 'desc')
                           }
                        }}
                        isLoader={isLoaderDesc}
                        disabled={isLoaderAsc}
                     />
                  </div>
                  <Button
                     extraClass={styles.button_reset}
                     text='Новый массив'
                     type='button'
                     onClick={createArray}
                     disabled={isLoaderAsc || isLoaderDesc}
                  />
               </div>
            </div>
            <div className={styles.array_box}>
               {
                  array.map((number, index) => (
                     <Column key={index}
                        index={number}
                        state={method === AlgorithmMethod.SelectionSort
                           ? getStateSelectionSorting(index, currentIndex!, comparedIndex!)
                           : getStateBubbleSorting(index, currentIndex!, comparedIndex!, lastIndex!)
                        }
                     />
                  ))
               }
            </div>
         </div>
      </SolutionLayout>
   );
};
