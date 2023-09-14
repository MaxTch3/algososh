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
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const StackPage: React.FC = () => {
   const [inputText, setInputText] = useState('');
   const [array, setArray] = useState<IStackItem[]>([]);
   const [isLoadingPush, setIsLoadingPush] = useState(false);
   const [isLoadingPop, setIsLoadingPop] = useState(false);

   const stack = useMemo(() => {
      return new Stack<IStackItem>()
   }, []);

   const pushItem = async () => {
      setIsLoadingPush(true);
      setInputText('');
      stack.push({ head: 'top', value: inputText, state: ElementStates.Changing });
      const arr = stack.getItems();
      if (arr.length > 1) {
         arr[arr.length - 2].head = ''
      };
      setArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      arr[arr.length - 1].state = ElementStates.Default;
      setArray([...arr]);
      setIsLoadingPush(false);
   }

   const popItem = async () => {
      setIsLoadingPop(true);
      let arr = stack.getItems();
      arr[arr.length - 1].state = ElementStates.Changing
      setArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      stack.pop();
      arr = stack.getItems();
      if (arr.length >= 1) {
         arr[arr.length - 1].head = 'top'
      }
      setArray([...arr])
      setIsLoadingPop(false);
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
                  extraClass={styles.input}
                  onChange={handleChange}
                  value={inputText}
                  test-id='textInput'
               />
               <div className={styles.buttons}>
                  <div className={styles.buttons_action}>
                     <Button
                        text='Добавить'
                        type='button'
                        extraClass={styles.button_add}
                        disabled={!inputText || array.length >= 20 || isLoadingPop}
                        onClick={pushItem}
                        isLoader={isLoadingPush}
                        test-id='addButton'
                     />
                     <Button
                        text='Удалить'
                        type='button'
                        extraClass={styles.button_del}
                        disabled={array.length === 0 || isLoadingPush}
                        onClick={popItem}
                        isLoader={isLoadingPop}
                        test-id='deleteButton'
                     />
                  </div>
                  <Button
                     extraClass={styles.button_reset}
                     text='Очистить'
                     type='button'
                     disabled={array.length === 0 || isLoadingPush || isLoadingPop}
                     onClick={resetItem}
                     test-id='clearButton'
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
