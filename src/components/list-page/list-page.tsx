import React, { useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './list-page.module.css'
import { Circle } from '../ui/circle/circle';
import { List } from './utils';
import { startingArray } from './constants';
import { ArrowIcon } from '../ui/icons/arrow-icon';

export const ListPage: React.FC = () => {
   const [arrString, setArrString] = useState<string[]>(startingArray);
   const listString = useMemo(() => {
      return new List<string>(startingArray)
   }, []);
   return (
      <SolutionLayout title='Связный список'>
         <div className={styles.container}>
            <div className={styles.control_box}>
               <Input
                  placeholder='Введите значение'
                  type='text'
                  maxLength={4}
                  isLimitText={true}
                  style={{ maxWidth: '204px' }}
               />
               <Button
                  text='Добавить&nbsp;в&nbsp;head'
                  style={{ minWidth: '175px' }}
               />
               <Button
                  text='Добавить в tail'
                  style={{ minWidth: '175px' }}
               />
               <Button
                  text='Удалить&nbsp;из&nbsp;head'
                  style={{ minWidth: '175px' }}
               />
               <Button
                  text='Удалить из tail'
                  style={{ minWidth: '175px' }}
               />
            </div>
            <div className={styles.control_box}>
               <Input
                  placeholder='Введите индекс'
                  type='text'
                  maxLength={4}
                  style={{ maxWidth: '204px' }}
               />
               <Button
                  text='Добавить по индексу'
                  style={{ minWidth: '362px' }}
               />
               <Button
                  text='Удалить по индексу'
                  style={{ minWidth: '362px' }}
               />
            </div>
            <div className={styles.array_box}>
               {arrString &&
                  arrString.map((item, index) => (
                     <div className={styles.item_box}>
                        <Circle
                           key={index}
                           index={index}
                           letter={item}
                        />
                        {index < arrString.length - 1 &&
                           <ArrowIcon />
                        }
                     </div>
                  ))
               }
            </div>
         </div>
      </SolutionLayout >
   );
};
