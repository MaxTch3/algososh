import React, { useState } from "react";
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
   const [line, setLine] = useState('');
   const [arr, setArr] = useState<IItem[]>([]);
   const [isLoader, setIsLoader] = useState(false);

   const reverseLine = (arr: IItem[], start = 0, end = arr.length - 1) => {
      
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
            setArr([...arr]);
            start++;
            end--;
            reverseLine(arr, start, end)
         }, DELAY);
      } else {
         setTimeout(() => {
            swap(arr, start - 1, end + 1);
            arr[end + 1].state = ElementStates.Modified;
            arr[start - 1].state = ElementStates.Modified;
            setArr(arr);
            setIsLoader(false);
         }, DELAY)
      }
   }

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLine(e.target.value)
   }

   const onClick = () => {
      const arrTemp = line.split('');
      const arr = arrTemp.length > 1
         ? arrTemp.map((item) => { return { item, state: ElementStates.Default } })
         : [{ item: arrTemp[0], state: ElementStates.Modified }];
      setArr(arr);

      if (arr.length !== 1) {
         reverseLine(arr)
      }
   }

   return (
      <SolutionLayout title="Строка">
         <div className={styles.container}>
            <div className={styles.input_box}>
               <Input
                  placeholder="Введите текст"
                  type="text"
                  maxLength={11}
                  isLimitText={true}
                  onChange={onChange}
               />
               <Button
                  style={{ minWidth: '175px' }}
                  text={'Развернуть'}
                  type="button"
                  isLoader={isLoader}
                  linkedList={"small"}
                  disabled={line ? false : true}
                  onClick={onClick}
               />
            </div>
            <div className={styles.letter_box}>
               {
                  arr.map((letter, index) => (
                     <Circle
                        key={index}
                        state={letter.state}
                        letter={letter.item}
                     />
                  ))
               }
            </div>
         </div>
      </SolutionLayout>
   );
};
