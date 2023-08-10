import React, { useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './list-page.module.css'
import { Circle } from '../ui/circle/circle';
import { List } from './utils';
import { startingArray } from './constants';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { delay } from '../../utils/utils';
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';

enum ListFunction { AddHead, AddTail, None }

export const ListPage: React.FC = () => {
   const [arrString, setArrString] = useState<string[]>(startingArray);
   const [inputText, setInputText] = useState('');
   const [inputIndex, setInputIndex] = useState('');
   const [insertIndex, setInsertIndex] = useState<number>(NaN);
   const [modifiedIndex, setModifiedIndex] = useState<number>(NaN);
   const [isLoadingAddHead, setIsLoadingAddHead] = useState(false);
   const [isLoadingAddTail, setIsLoadingAddTail] = useState(false);
   const [isFunction, setIsFunction] = useState<ListFunction>(ListFunction.None)

   const listString = useMemo(() => {
      return new List<string>(startingArray)
   }, []);

   const addHead = async () => {
      setIsLoadingAddHead(true);
      setIsFunction(ListFunction.AddHead);
      setInsertIndex(0);
      await delay(DELAY_IN_MS);
      listString.unshift(inputText);
      setInputText('');
      setArrString(listString.toArray());
      setInsertIndex(NaN);
      setModifiedIndex(0);
      await delay(DELAY_IN_MS);
      setModifiedIndex(NaN);
      setIsFunction(ListFunction.None)
      setIsLoadingAddHead(false);
   };

   const addTail = async () => {
      setIsLoadingAddTail(true);
      setIsFunction(ListFunction.AddTail)
      setInsertIndex(arrString.length - 1);
      await delay(DELAY_IN_MS);
      listString.push(inputText);
      setInputText('');
      setArrString(listString.toArray());
      setInsertIndex(NaN);
      setModifiedIndex(arrString.length);
      await delay(DELAY_IN_MS);
      setModifiedIndex(NaN);
      setIsFunction(ListFunction.None)
      setIsLoadingAddTail(false);
   };

   const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value)
   }

   const handleChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
      const minIndex = 0;
      const maxIndex = listString.toArray().length - 1
      if (
         +e.target.value >= minIndex &&
         +e.target.value <= maxIndex
      ) {
         setInputIndex(e.target.value)
      }
   }

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
                  onChange={handleChangeText}
                  value={inputText}
               />
               <Button
                  text='Добавить&nbsp;в&nbsp;head'
                  style={{ minWidth: '175px' }}
                  onClick={addHead}
                  isLoader={isLoadingAddHead}
                  disabled={!inputText || isLoadingAddTail}
               />
               <Button
                  text='Добавить в tail'
                  style={{ minWidth: '175px' }}
                  onClick={addTail}
                  isLoader={isLoadingAddTail}
                  disabled={!inputText || isLoadingAddHead}
               />
               <Button
                  text='Удалить&nbsp;из&nbsp;head'
                  style={{ minWidth: '175px' }}
                  disabled={!arrString || isLoadingAddHead || isLoadingAddTail}
               />
               <Button
                  text='Удалить из tail'
                  style={{ minWidth: '175px' }}
                  disabled={!arrString || isLoadingAddHead || isLoadingAddTail}
               />
            </div>
            <div className={styles.control_box}>
               <Input
                  placeholder='Введите индекс'
                  type='text'
                  maxLength={4}
                  style={{ maxWidth: '204px' }}
                  value={inputIndex}
                  onChange={handleChangeIndex}
               />
               <Button
                  text='Добавить по индексу'
                  style={{ minWidth: '362px' }}
                  disabled={!inputIndex || !inputText || isLoadingAddHead || isLoadingAddTail}
               />
               <Button
                  text='Удалить по индексу'
                  style={{ minWidth: '362px' }}
                  disabled={!arrString || !inputIndex || isLoadingAddHead || isLoadingAddTail}
               />
            </div>
            <div className={styles.array_box}>
               {arrString &&
                  arrString.map((item, index) => (
                     <div className={styles.item_box} key={index}>
                        <Circle
                           head={insertIndex === index && (isFunction === ListFunction.AddHead || isFunction === ListFunction.AddTail)
                              ? <Circle isSmall letter={inputText} state={ElementStates.Changing} />
                              : index === 0 ? 'head' : ''}
                           tail={index === arrString.length - 1 ? 'tail' : ''}
                           index={index}
                           letter={item}
                           state={modifiedIndex === index ? ElementStates.Modified : ElementStates.Default}
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
