import React, { useEffect, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import styles from './sorting-page.module.css'
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { randomArr } from './utils';
import { ElementStates } from '../../types/element-states';
import { Column } from '../ui/column/column';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils/utils';
import { AlgorithmMethod, IColumn } from './types';

export const SortingPage: React.FC = () => {
   const minLength: number = 3;
   const maxLength = 17;
   const [array, setArray] = useState<IColumn[]>([]);
   const [method, setMethod] = useState(AlgorithmMethod.SelectionSort)
   const createArray = useMemo(() => () => {
      const newArray = randomArr(minLength, maxLength).map((number) => { return { number, state: ElementStates.Default } });
      setArray(newArray)
   }, [setArray])

   useEffect(() => {
      createArray()
   }, []);

   const resetStatus = () => {
      array.forEach((item) => item.state = ElementStates.Default);
      setArray(array)
   }

   const selectionSort = async (arr: IColumn[], order: 'asc' | 'desc') => {
      for (let i = 0; i < arr.length; i++) {
         if (i) {
            arr[i - 1].state = ElementStates.Modified
            arr[i].state = ElementStates.Changing
            setArray([...arr])
         } else {
            arr[i].state = ElementStates.Changing
            setArray([...arr])
         }
         if (i === arr.length - 1) {
            arr[i].state = ElementStates.Modified
            setArray([...arr])
         }
         let currIndex = i;        
         for (let j = i + 1; j < arr.length; j++) {
            arr[j].state = ElementStates.Changing;
            setArray([...arr]);
            await delay(SHORT_DELAY_IN_MS)
            if (order === 'asc'
               ? arr[j].number < arr[currIndex].number
               : arr[j].number > arr[currIndex].number) {
               currIndex = j;
            }

            arr[j].state = ElementStates.Default;
            setArray([...arr]);
         };

         if (currIndex !== i) {
            const temp = arr[i].number;
            arr[i].number = arr[currIndex].number;
            arr[currIndex].number = temp;
            setArray([...arr]);
         }
      }
   }

   const bubbleSort = async (arr: IColumn[], order: 'asc' | 'desc') => {
      for (let i = 0; i < arr.length; i++) {
         for (let j = 0; j < arr.length - i - 1; j++) {
            arr[j].state = ElementStates.Changing;
            arr[j + 1].state = ElementStates.Changing;
            setArray([...arr]);

            if (order === 'asc' ? arr[j].number > arr[j + 1].number : arr[j].number < arr[j + 1].number) {
               const temp = arr[j].number;
               arr[j].number = arr[j + 1].number;
               arr[j + 1].number = temp;
               setArray([...arr])
            }
            await delay(SHORT_DELAY_IN_MS);
            arr[j].state = ElementStates.Default;
            arr[j + 1].state = ElementStates.Default;
            setArray([...arr]);
         }

         arr[arr.length - i - 1].state = ElementStates.Modified;
      }
      arr[0].state = ElementStates.Modified;
      arr[1].state = ElementStates.Modified;
      setArray([...arr]);
   }

   return (
      <SolutionLayout title='Сортировка массива'>
         <div className={styles.container}>
            <div className={styles.control_box}>
               <div className={styles.radio_box}>
                  <RadioInput
                     checked={method === AlgorithmMethod.SelectionSort}
                     onChange={() => setMethod(AlgorithmMethod.SelectionSort)}
                     label='Выбор'
                  />
                  <RadioInput
                     checked={method === AlgorithmMethod.BubbleSort}
                     onChange={() => setMethod(AlgorithmMethod.BubbleSort)}
                     label='Пузырёк'
                  />
               </div>
               <div className={styles.buttons}>
                  <div className={styles.buttons_sorting}>
                     <Button
                        text='По возрастанию'
                        type='button'
                        sorting={Direction.Ascending}
                        style={{ minWidth: '205px' }}
                        onClick={() => {
                           resetStatus();
                           if (method === AlgorithmMethod.SelectionSort) {
                              selectionSort(array, 'asc')
                           } else {
                              bubbleSort(array, 'asc')
                           }
                        }}
                     />
                     <Button
                        text='По убыванию'
                        type='button'
                        sorting={Direction.Descending}
                        style={{ minWidth: '186px' }}
                        onClick={() => {
                           resetStatus();
                           if (method === AlgorithmMethod.SelectionSort) {
                              selectionSort(array, 'desc')
                           } else {
                              bubbleSort(array, 'desc')
                           }
                        }}
                     />
                  </div>
                  <Button
                     extraClass={styles.button_reset}
                     text='Новый массив'
                     type='button'
                     style={{ minWidth: '168px' }}
                     onClick={createArray}
                  />
               </div>
            </div>
            <div className={styles.array_box}>
               {
                  array.map(({ number, state }, index) => (
                     <Column key={index} index={number} state={state} />
                  ))
               }
            </div>
         </div>
      </SolutionLayout>
   );
};
