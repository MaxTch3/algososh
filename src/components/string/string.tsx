import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './string.module.css'
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
   const [line, setLine] = useState('');
   const [arr, setArr] = useState<string[]>([])

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLine(e.target.value)
   }

   const onClick = () => {
      setArr(line.split(''))
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
                  isLoader={false}
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
                        state={ElementStates.Default}
                        letter={letter}
                     />
                  ))
               }
            </div>
         </div>
      </SolutionLayout>
   );
};
