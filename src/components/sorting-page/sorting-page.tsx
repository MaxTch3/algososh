import React from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import styles from './sorting-page.module.css'
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';

export const SortingPage: React.FC = () => {
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
                     type='reset'
                     style={{ minWidth: '168px' }}
                  />
               </div>
            </div>
         </div>
      </SolutionLayout>
   );
};
