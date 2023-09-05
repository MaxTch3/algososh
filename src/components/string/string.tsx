import React, { useCallback, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './string.module.css'
import { Circle } from '../ui/circle/circle';
import { getLetterState, getReversingStringSteps } from './utils';
import { DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils/utils';

export const StringComponent: React.FC = () => {
   const [inputText, setInputText] = useState('');
   const [letters, setLetters] = useState<string[]>([]);
   const [isLoader, setIsLoader] = useState(false);
   const [start, setStart] = useState<number | null>();
   const [end, setEnd] = useState<number | null>();

   const reverseLine = async (inputText: string) => {
      setIsLoader(true);
      const arr = inputText.trim().split('');
      const reversingStringSteps = getReversingStringSteps(arr)
      let start = 0;
      let end = arr.length - 1
      if (arr.length !== 1) {
         for (let step of reversingStringSteps) {
            if (start <= end + 1) {
               setStart(start);
               setEnd(end);
               setLetters(step);
               await delay(DELAY_IN_MS);
               start++;
               end--
            }
         }
      } else {
         setLetters(reversingStringSteps[0]);
      }
      setIsLoader(false)
   }

   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value)
   }, []);

   const handleClick = useCallback(() => {
      reverseLine(inputText)
   }, [inputText]);

   useEffect(() => {
      return () => {
         setIsLoader(false);
      }
   }, [])

   return (
      <SolutionLayout title='Строка'>
         <div className={styles.container}>
            <div className={styles.input_box}>
               <Input
                  placeholder='Введите текст'
                  type='text'
                  maxLength={11}
                  isLimitText={true}
                  onChange={handleChange}
               />
               <Button
                  extraClass={styles.button}
                  text={'Развернуть'}
                  type='button'
                  isLoader={isLoader}
                  linkedList={'small'}
                  disabled={!inputText}
                  onClick={handleClick}
               />
            </div>
            <div className={styles.letters_box}>
               {letters &&
                  letters.map((item
                     , index) => (
                     <Circle
                        key={index}
                        state={getLetterState(letters.length, index, start!, end!)}
                        letter={item}
                     />
                  ))
               }
            </div>
         </div>
      </SolutionLayout>
   );
};
