import React, { useCallback, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import styles from './stack-page.module.css'
import { Button } from '../ui/button/button';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import { IStackItem } from './types';
import { Stack } from './utils';
import { delay } from '../../utils/utils';
import { DELAY_IN_MS } from '../../constants/delays';

export const StackPage: React.FC = () => {
   const [inputText, setInputText] = useState('');
   const [array, setArray] = useState<IStackItem[]>([]);

   const stack = useMemo(() => {
      return new Stack<IStackItem>()
   }, []);

   const pushItem = async () => {
      setInputText('');
      stack.push({ head: 'top', value: inputText, state: ElementStates.Changing });
      const arr = stack.getItems();
      if (arr.length > 1) {
         arr[arr.length - 2].head = ''
      }
      setArray([...arr])
      await delay(DELAY_IN_MS);
      arr[arr.length - 1].state = ElementStates.Default;
      console.log(arr);
      setArray([...arr]);
   }

   const popItem = async () => {
      let arr = stack.getItems();
      arr[arr.length - 1].state = ElementStates.Changing
      setArray([...arr]);
      await delay(DELAY_IN_MS);
      stack.pop();
      arr = stack.getItems();
      if (arr.length >= 1) {
         arr[arr.length - 1].head = 'top'
      }
      console.log(arr)
      setArray([...arr])
   }

   const resetItem = () => {
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
                        disabled={!inputText || array.length >= 20}
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
                        head={item.head}
                        index={index}
                        letter={item.value}
                        state={item.state}
                     />
                  ))
               }
            </div>
         </div>
      </SolutionLayout>
   );
};
