import React, { useEffect, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue-page.module.css'
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Queue } from './utils';
import { lengthQueue } from './constans';
import { ElementStates } from '../../types/element-states';
import { delay } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { IQueueItem } from './types';

export const QueuePage: React.FC = () => {
   const [inputText, setInputText] = useState('');
   const [array, setArray] = useState<(IQueueItem | undefined)[]>();
   const [tail, setTail] = useState<number | undefined>();
   const [head, setHead] = useState<number | undefined>();
   const [isLoadingEnqueue, setIsLoadingEnqueue] = useState(false);
   const [isLoadingDequeue, setIsLoadingDequeue] = useState(false);

   const queue = useMemo(() => {
      return new Queue<IQueueItem>(lengthQueue)
   }, []);

   useEffect(() => {
      setArray(queue.getQueue())
   }, [queue]);

   const enqueueItem = async () => {
      setIsLoadingEnqueue(true);
      const currArr = queue.getQueue();
      const currTail = queue.getTail();
      setInputText('');
      if (currTail < lengthQueue) { currArr[currTail] = { state: ElementStates.Changing } };
      setArray(currArr);
      await delay(SHORT_DELAY_IN_MS);
      queue.enqueue({ value: inputText });
      setTail(queue.getTail());
      setHead(queue.getHead());
      setArray([...queue.getQueue()]);
      setIsLoadingEnqueue(false);
   }

   const dequeueItem = async () => {
      setIsLoadingDequeue(true);
      const currArr = queue.getQueue();
      const currHead = queue.getHead();
      const currTail = queue.getTail();
      if (currHead === currTail - 1) {
         currArr[currHead] = { state: ElementStates.Changing, value: currArr[currHead]!.value };
         setArray(currArr);
         await delay(SHORT_DELAY_IN_MS);
         setIsLoadingDequeue(false);
         return resetItems()
      }
      if (currHead >= 0 && currHead < currTail && currHead < lengthQueue) {
         currArr[currHead] = { state: ElementStates.Changing, value: currArr[currHead]!.value };
         setArray(currArr);
         await delay(SHORT_DELAY_IN_MS);
         queue.dequeue();
         setArray([...queue.getQueue()]);
         setHead(queue.getHead());
         setTail(queue.getTail());
         setIsLoadingDequeue(false);
      }
   }

   const resetItems = () => {
      setInputText('');
      queue.reset();
      setTail(undefined);
      setHead(undefined);
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
                        disabled={!inputText || tail === lengthQueue || isLoadingDequeue}
                        onClick={enqueueItem}
                        isLoader={isLoadingEnqueue}
                        test-id='addButton'
                     />
                     <Button
                        text='Удалить'
                        type='button'
                        extraClass={styles.button_del}
                        onClick={dequeueItem}
                        disabled={tail === 0 || head === lengthQueue || tail === head || isLoadingEnqueue}
                        isLoader={isLoadingDequeue}
                        test-id='deleteButton'
                     />
                  </div>
                  <Button
                     extraClass={styles.button_reset}
                     text='Очистить'
                     type='button'
                     disabled={tail === undefined || isLoadingEnqueue || isLoadingDequeue}
                     onClick={resetItems}
                  />
               </div>
            </div>
            <div className={styles.array_box}>
               {array &&
                  array.map((item, index) => (
                     <Circle
                        key={index}
                        tail={index === tail! - 1 ? 'tail' : ''}
                        head={head === undefined ? '' : index === head ? 'head' : ''}
                        index={index}
                        letter={item?.value}
                        state={item?.state}
                     />
                  ))
               }
            </div>
         </div>
      </SolutionLayout>
   );
};
