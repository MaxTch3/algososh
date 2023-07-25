import React, { useCallback, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './string.module.css'
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { IItem } from "./types";
import { swap } from "./utils";
import { DELAY } from "./constants";

export const StringComponent: React.FC = () => {
   const [inputText, setInputText] = useState('');
   const [letters, setLetters] = useState<IItem[]>([]);
   const [isLoader, setIsLoader] = useState(false);

   const reverseLine = useCallback((arr: IItem[], start = 0, end = arr.length - 1) => {

      setIsLoader(true);

      if (start === end) {
         arr[start].state = ElementStates.Modified;
         setTimeout(() => {
            arr[start - 1].state = ElementStates.Modified;
            arr[end + 1].state = ElementStates.Modified;
            setIsLoader(false)
         }, DELAY)
      };

      if (start < end) {
         setTimeout(() => {
            if (start) {
               swap(arr, start - 1, end + 1);
               arr[start - 1].state = ElementStates.Modified;
               arr[end + 1].state = ElementStates.Modified;
            };
            arr[start].state = ElementStates.Changing;
            arr[end].state = ElementStates.Changing;
            setLetters([...arr]);
            start++;
            end--;
            reverseLine(arr, start, end)
         }, DELAY);
      } else {
         setTimeout(() => {
            swap(arr, start - 1, end + 1);
            arr[end + 1].state = ElementStates.Modified;
            arr[start - 1].state = ElementStates.Modified;
            setLetters(arr);
            setIsLoader(false);
         }, DELAY)
      }
   }, [])

   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value)
   }, [])

   const handleClick = useCallback(() => {
      const arrTemp = inputText.split('');
      const arr = arrTemp.length > 1
         ? arrTemp.map((item) => { return { item, state: ElementStates.Default } })
         : [{ item: arrTemp[0], state: ElementStates.Modified }];
      setLetters(arr);

      if (arr.length !== 1) {
         reverseLine(arr)
      }
   }, [inputText, reverseLine]);

   return (
      <SolutionLayout title="Строка">
         <div className={styles.container}>
            <div className={styles.input_box}>
               <Input
                  placeholder="Введите текст"
                  type="text"
                  maxLength={11}
                  isLimitText={true}
                  onChange={handleChange}
               />
               <Button
                  style={{ minWidth: '175px' }}
                  text={'Развернуть'}
                  type="button"
                  isLoader={isLoader}
                  linkedList={"small"}
                  disabled={!inputText}
                  onClick={handleClick}
               />
            </div>
            <div className={styles.letter_box}>
               {
                  letters.map(({item, state}, index) => (
                     <Circle
                        key={index}
                        state={state}
                        letter={item}
                     />
                  ))
               }
            </div>
         </div>
      </SolutionLayout>
   );
};
