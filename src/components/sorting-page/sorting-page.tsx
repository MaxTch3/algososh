import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import styles from './sorting-page.module.css'
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { randomArr } from './utils';
import { ElementStates } from '../../types/element-states';
import { Column } from '../ui/column/column';


interface IColumn {
   number: number;
   state: ElementStates
}

export const SortingPage: React.FC = () => {
   const minLength: number = 3;
   const maxLength = 17;
   const [arrayNumbers, setArrayNumbers] = useState<IColumn[]>([])
   const createArray = () => {
      const newArray = randomArr(minLength, maxLength).map((number) => { return { number, state: ElementStates.Default } });
      setArrayNumbers(newArray)
   }
   useEffect(() => {
      createArray()
   }, []);

   console.log(arrayNumbers)
   return (
      <SolutionLayout title='Сортировка массива'>
         <div className={styles.container}>
            <div className={styles.control_box}>
               <div className={styles.radio_box}>
                  <RadioInput
                     label='Выбор' />
                  <RadioInput
                     label='Пузырёк' />
               </div>
               <div className={styles.buttons}>
                  <div className={styles.buttons_sorting}>
                     <Button
                        text='По возрастанию'
                        type='button'
                        sorting={Direction.Ascending}
                        style={{ minWidth: '205px' }}
                     />
                     <Button
                        text='По убыванию'
                        type='button'
                        sorting={Direction.Descending}
                        style={{ minWidth: '186px' }}
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
                  arrayNumbers.map(({ number, state }, index) => (
                     <Column key={index} index={number} state={state} />
                  ))
               }

            </div>
         </div>
      </SolutionLayout>
   );
};
