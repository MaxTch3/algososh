import React, { useEffect, useMemo, useState } from 'react';
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

enum ListFunction { AddHead, AddTail, DeleteHead, DeleteTail, InsertAtIndex, DeleteAtIndex, None }

export const ListPage: React.FC = () => {
   const [arrString, setArrString] = useState<string[]>(startingArray);
   const [inputText, setInputText] = useState('');
   const [inputIndex, setInputIndex] = useState('');
   const [insertIndex, setInsertIndex] = useState<number | null>();
   const [modifiedIndex, setModifiedIndex] = useState<number | null>();
   const [changedIndex, setChangedIndex] = useState<number | null>();
   const [isLoadingAddHead, setIsLoadingAddHead] = useState(false);
   const [isLoadingAddTail, setIsLoadingAddTail] = useState(false);
   const [isLoadingDeleteHead, setIsLoadingDeleteHead] = useState(false);
   const [isLoadingDeleteTail, setIsLoadingDeleteTail] = useState(false);
   const [isLoadingInsertAtIndex, setIsLoadingInsertAtIndex] = useState(false);
   const [isLoadingDeleteAtIndex, setIsLoadingDeleteAtIndex] = useState(false);

   const [isFunction, setIsFunction] = useState<ListFunction>(ListFunction.None);

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
      setInsertIndex(null);
      setModifiedIndex(0);
      await delay(DELAY_IN_MS);
      setModifiedIndex(null);
      setIsFunction(ListFunction.None);
      setIsLoadingAddHead(false)
   };

   const insertAtIndex = async () => {
      setIsLoadingInsertAtIndex(true);
      const index = Number(inputIndex);
      setIsFunction(ListFunction.InsertAtIndex);
      for (let i = 0; i <= index; i++) {
         setInsertIndex(i);
         setChangedIndex(i);
         await delay(DELAY_IN_MS);
      };
      listString.insertAt(inputText, Number(inputIndex));
      setInputIndex('');
      setInputText('');
      setArrString(listString.toArray());
      setInsertIndex(null);
      setChangedIndex(null);
      setModifiedIndex(index);
      await delay(DELAY_IN_MS);
      setModifiedIndex(null);
      setIsFunction(ListFunction.None);
      setIsLoadingInsertAtIndex(false)
   }

   const addTail = async () => {
      setIsLoadingAddTail(true);
      setIsFunction(ListFunction.AddTail);
      setInsertIndex(arrString.length - 1);
      await delay(DELAY_IN_MS);
      listString.push(inputText);
      setInputText('');
      setArrString(listString.toArray());
      setInsertIndex(null);
      setModifiedIndex(arrString.length);
      await delay(DELAY_IN_MS);
      setModifiedIndex(null);
      setIsFunction(ListFunction.None);
      setIsLoadingAddTail(false)
   };

   const deleteHead = async () => {
      setIsLoadingDeleteHead(true);
      setIsFunction(ListFunction.DeleteHead);
      setInsertIndex(0);
      await delay(DELAY_IN_MS);
      listString.deleteAt(0);
      setInsertIndex(null);
      setArrString(listString.toArray);
      setIsFunction(ListFunction.None);
      setIsLoadingDeleteHead(false);
   };

   const deleteAtIndex = async () => {
      const index = Number(inputIndex);
      setInputIndex('');
      setIsLoadingDeleteAtIndex(true);
      setIsFunction(ListFunction.DeleteAtIndex);
      for (let i = 0; i <= index; i++) {
         setChangedIndex(i);
         await delay(DELAY_IN_MS);
      };
      setInsertIndex(index);
      await delay(DELAY_IN_MS);
      setInsertIndex(null);
      listString.deleteAt(index);
      setArrString(listString.toArray());
      setChangedIndex(null);
      setIsFunction(ListFunction.None);
      setIsLoadingDeleteAtIndex(false)
   }

   const deleteTail = async () => {
      setIsLoadingDeleteTail(true);
      setIsFunction(ListFunction.DeleteTail);
      setInsertIndex(arrString.length - 1);
      await delay(DELAY_IN_MS);
      listString.deleteAt(arrString.length - 1);
      setInsertIndex(null);
      setArrString(listString.toArray());
      setIsFunction(ListFunction.None);
      setIsLoadingDeleteTail(false)
   }

   const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value)
   };

   const handleChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
      const minIndex = 0;
      const maxIndex = listString.toArray().length - 1
      if (
         +e.target.value >= minIndex &&
         +e.target.value <= maxIndex
      ) {
         setInputIndex(e.target.value)
      }
   };

   useEffect(() => {
      return () => {
         setIsLoadingAddHead(false);
         setIsLoadingAddTail(false);
         setIsLoadingDeleteHead(false);
         setIsLoadingDeleteTail(false);
         setIsLoadingInsertAtIndex(false);
         setIsLoadingDeleteAtIndex(false);
      }
   }, [])

   return (
      <SolutionLayout title='Связный список'>
         <div className={styles.container}>
            <div className={styles.control_box}>
               <Input
                  placeholder='Введите значение'
                  type='text'
                  maxLength={4}
                  isLimitText={true}
                  extraClass={styles.input}
                  onChange={handleChangeText}
                  value={inputText}
                  disabled={isLoadingAddHead
                     || isLoadingAddTail
                     || isLoadingDeleteHead
                     || isLoadingDeleteTail
                     || isLoadingInsertAtIndex
                     || isLoadingDeleteAtIndex}
                  test-id='textInput'
               />
               <Button
                  text='Добавить&nbsp;в&nbsp;head'
                  extraClass={styles.button_text}
                  onClick={addHead}
                  isLoader={isLoadingAddHead}
                  disabled={!inputText
                     || isLoadingAddTail
                     || isLoadingDeleteHead
                     || isLoadingDeleteTail
                     || isLoadingInsertAtIndex
                     || isLoadingDeleteAtIndex}
                  test-id='addHeadButton'
               />
               <Button
                  text='Добавить в tail'
                  extraClass={styles.button_text}
                  onClick={addTail}
                  isLoader={isLoadingAddTail}
                  disabled={!inputText
                     || isLoadingAddHead
                     || isLoadingDeleteHead
                     || isLoadingDeleteTail
                     || isLoadingInsertAtIndex
                     || isLoadingDeleteAtIndex}
                  test-id='addTailButton'
               />
               <Button
                  text='Удалить&nbsp;из&nbsp;head'
                  extraClass={styles.button_text}
                  disabled={arrString.length === 0
                     || isLoadingAddHead
                     || isLoadingAddTail
                     || isLoadingDeleteTail
                     || isLoadingInsertAtIndex
                     || isLoadingDeleteAtIndex}
                  onClick={deleteHead}
                  isLoader={isLoadingDeleteHead}
               />
               <Button
                  text='Удалить из tail'
                  extraClass={styles.button_text}
                  disabled={arrString.length === 0
                     || isLoadingAddHead
                     || isLoadingAddTail
                     || isLoadingDeleteHead
                     || isLoadingInsertAtIndex
                     || isLoadingDeleteAtIndex}
                  onClick={deleteTail}
                  isLoader={isLoadingDeleteTail}
               />
            </div>
            <div className={styles.control_box}>
               <Input
                  placeholder='Введите индекс'
                  type='text'
                  maxLength={4}
                  extraClass={styles.input}
                  value={inputIndex}
                  onChange={handleChangeIndex}
                  disabled={isLoadingAddHead
                     || isLoadingAddTail
                     || isLoadingDeleteHead
                     || isLoadingDeleteTail
                     || isLoadingInsertAtIndex
                     || isLoadingDeleteAtIndex}
                  test-id='indexInput'
               />
               <Button
                  text='Добавить по индексу'
                  extraClass={styles.button_index}
                  disabled={!inputIndex
                     || !inputText
                     || isLoadingAddHead
                     || isLoadingAddTail
                     || isLoadingDeleteHead
                     || isLoadingDeleteTail
                     || isLoadingDeleteAtIndex}
                  onClick={insertAtIndex}
                  isLoader={isLoadingInsertAtIndex}
                  test-id='addIndexButton'
               />
               <Button
                  text='Удалить по индексу'
                  extraClass={styles.button_index}
                  disabled={arrString.length === 0
                     || !inputIndex
                     || isLoadingAddHead
                     || isLoadingAddTail
                     || isLoadingDeleteHead
                     || isLoadingDeleteTail
                     || isLoadingInsertAtIndex}
                  onClick={deleteAtIndex}
                  isLoader={isLoadingDeleteAtIndex}
                  test-id='deleteIndexButton'
               />
            </div>
            <div className={styles.array_box}>
               {arrString &&
                  arrString.map((item, index) => (
                     <div className={styles.item_box} key={index}>
                        <Circle
                           head={
                              insertIndex === index &&
                                 (isFunction === ListFunction.AddHead
                                    || isFunction === ListFunction.AddTail
                                    || isFunction === ListFunction.InsertAtIndex)
                                 ? <Circle isSmall letter={inputText} state={ElementStates.Changing} />
                                 : index === 0 ? 'head' : ''
                           }
                           tail={
                              insertIndex === index &&
                                 (isFunction === ListFunction.DeleteHead
                                    || isFunction === ListFunction.DeleteTail
                                    || isFunction === ListFunction.DeleteAtIndex
                                 )
                                 ? <Circle isSmall letter={item} state={ElementStates.Changing} />
                                 : index === arrString.length - 1 ? 'tail' : ''
                           }
                           index={index}
                           letter={
                              (isFunction === ListFunction.DeleteHead
                                 || isFunction === ListFunction.DeleteTail
                                 || isFunction === ListFunction.DeleteAtIndex) &&
                                 insertIndex === index
                                 ? '' : item
                           }
                           state={
                              isFunction === ListFunction.DeleteAtIndex && changedIndex &&
                                 index <= changedIndex
                                 ? ElementStates.Changing
                                 : isFunction === ListFunction.InsertAtIndex && changedIndex &&
                                    index < changedIndex
                                    ? ElementStates.Changing
                                    : modifiedIndex === index
                                       ? ElementStates.Modified : ElementStates.Default
                           }
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
