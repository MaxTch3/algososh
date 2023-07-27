import React, { useCallback, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import styles from './stack-page.module.css'
import { Button } from '../ui/button/button';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import { IStackItem } from './types';
import { Stack } from './utils';

export const StackPage: React.FC = () => {
   const [inputText, setInputText] = useState('');
   const [array, setArray] = useState<IStackItem[]>([]);

   const stack = useMemo(() => {
      return new Stack<IStackItem>()
   }, []);

   const pushItem = () => {
      setInputText('');
      stack.push({ head: 'top', value: inputText });
      const arr = stack.getItems();
      setArray([...arr])
   }

   const popItem = () => {
      setInputText('');
      stack.pop();
      const arr = stack.getItems();
      setArray([...arr])
   }

   const resetItem = () => {
      setInputText('');
      stack.reset();
      setArray([])
   }

   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value)
   }, [])

   return (
      <SolutionLayout title='Стек'>
         <div className={styles.container}>
            <div className={styles.control_box}>
               <Input
                  placeholder='Введите текст'
                  type='text'
                  maxLength={4}
                  isLimitText={true}
                  style={{ minWidth: '380px' }}
                  onChange={handleChange}
                  value={inputText}
               />
               <div className={styles.buttons}>
                  <div className={styles.buttons_action}>
                     <Button
                        text='Добавить'
                        type='button'
                        style={{ minWidth: '120px' }}
                        disabled={!inputText || array.length >= 10}
                        onClick={pushItem}
                     />
                     <Button
                        text='Удалить'
                        type='button'
                        style={{ minWidth: '110px' }}
                        disabled={array.length === 0}
                        onClick={popItem}
                     />
                  </div>
                  <Button
                     extraClass={styles.button_reset}
                     text='Очистить'
                     type='button'
                     style={{ minWidth: '120px' }}
                     disabled={array.length === 0}
                     onClick={resetItem}
                  />
               </div>
            </div>
            <div className={styles.array_box}>
               {
                  array.map((item, index) => (
                     <Circle
                        key={index}
                        head={
                           index === array.length - 1 ? item.head : ''}
                        index={index}
                        letter={item.value}
                     />
                  ))
               }
            </div>
         </div>
      </SolutionLayout>
   );
};
