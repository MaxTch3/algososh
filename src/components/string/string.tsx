import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './string.module.css'

export const StringComponent: React.FC = () => {
   const [line, setLine] = useState('');

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLine(e.target.value)
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
                  disabled={line ? true : false}
               />
            </div>
         </div>
      </SolutionLayout>
   );
};
