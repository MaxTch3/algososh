import React, { useCallback, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Button } from '../ui/button/button';
import styles from './fibonacci-page.module.css'
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils/utils';
import { getFibonacciArraySteps } from './utils';

export const FibonacciPage: React.FC = () => {
   const minNumber = 0;
   const maxNumber = 19;
   const [inputText, setInputText] = useState('');
   const [array, setArray] = useState<number[]>([]);
   const [isLoader, setIsLoader] = useState(false);

   const fibonacciArray = async (n: number) => {
      setIsLoader(true);
      const fibonacciArraySteps = getFibonacciArraySteps(n);
      if (n) {
         for (let step of fibonacciArraySteps) {
            setArray(step);
            await delay(SHORT_DELAY_IN_MS)
         }
      } else {
         setArray(fibonacciArraySteps[0])
      };
      setIsLoader(false)
   }

   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (
         +e.target.value >= minNumber &&
         +e.target.value <= maxNumber
      ) {
         setInputText(e.target.value);
      }
   }, []);

   const handleClick = useCallback(() => {
      fibonacciArray(Number(inputText))
   }, [inputText])

   const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
      if (
         e.key !== 'Backspace' &&
         e.key !== 'Tab' &&
         e.key !== 'Delete' &&
         e.key !== 'ArrowLeft' &&
         e.key !== 'ArrowRight' &&
         isNaN(Number(e.key))
      ) {
         e.preventDefault();
      }
   }, [])

   useEffect(() => {
      return () => {
         setIsLoader(false);
      }
   }, [])

   return (
      <SolutionLayout title='Последовательность Фибоначчи'>
         <div className={styles.container}>
            <div className={styles.input_box}>

               <Input
                  placeholder='Введите число'
                  type={'number'}
                  max={maxNumber}
                  value={inputText}
                  isLimitText={true}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  test-id='numberInput'
               />
               <Button
                  extraClass={styles.button}
                  text={'Рассчитать'}
                  type='button'
                  isLoader={isLoader}
                  linkedList={'small'}
                  onClick={handleClick}
                  disabled={!inputText}
                  test-id='calculateButton'
               />
            </div>
            <div className={styles.letters_box}>
               {
                  array.map((item, index) => (
                     <Circle
                        key={index}
                        letter={item.toString()}
                        index={index}
                     />
                  ))
               }
            </div>
         </div>
      </SolutionLayout>
   );
};
