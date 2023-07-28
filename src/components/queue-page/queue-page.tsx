import React, { useEffect, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue-page.module.css'
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Queue } from './utils';
import { lengthQueue } from './constans';

export const QueuePage: React.FC = () => {
   const [inputText, setInputText] = useState('');
   const [array, setArray] = useState<(string | undefined)[]>();

   const queue = useMemo(() => {
      return new Queue<string>(lengthQueue)
   }, []);

   useEffect(() => {
      setArray(queue.getQueue())
   }, [queue])

   const enqueueItem = () => {
      queue.enqueue(inputText);
      setArray([...queue.getQueue()])
   }

   const dequeueItem = () => {
      queue.dequeue();
      setArray([...queue.getQueue()])
   }

   const resetItems = () => {
      queue.reset();
      setArray([...queue.getQueue()])
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value)
   }

   return (
      <SolutionLayout title='Очередь'>

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
                        disabled={!inputText}
                        onClick={enqueueItem}
                     //                  isLoader={isLoadingPush}
                     />
                     <Button
                        text='Удалить'
                        type='button'
                        style={{ minWidth: '110px' }}
                        //                  disabled={array.length === 0 || isLoadingPush}
                        onClick={dequeueItem}
                     />
                  </div>
                  <Button
                     extraClass={styles.button_reset}
                     text='Очистить'
                     type='button'
                     style={{ minWidth: '120px' }}
                     //                disabled={array.length === 0 || isLoadingPush || isLoadingPop}
                     onClick={resetItems}
                  />
               </div>
            </div>
            <div className={styles.array_box}>
               {array &&
                  array.map((item, index) => (
                     <Circle
                        key={index}
                        //                 head={item.head}
                        index={index}
                        letter={item}
                     //                  state={item.state}
                     />
                  ))
               }
            </div>
         </div>

      </SolutionLayout>
   );
};
