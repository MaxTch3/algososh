import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './list-page.module.css'

export const ListPage: React.FC = () => {
   return (
      <SolutionLayout title="Связный список">
         <div className={styles.container}>
            <div className={styles.control_box}>
               <Input
                  placeholder='Введите значение'
                  type='text'
                  maxLength={4}
                  isLimitText={true}
                  style={{ maxWidth: '204px' }}
               />
               <Button
                  text='Добавить&nbsp;в&nbsp;head'
                  style={{ minWidth: '175px' }}
               />
               <Button
                  text='Добавить в tail'
                  style={{ minWidth: '175px' }}
               />
               <Button
                  text='Удалить&nbsp;из&nbsp;head'
                  style={{ minWidth: '175px' }}
               />
               <Button
                  text='Удалить из tail'
                  style={{ minWidth: '175px' }}
               />
            </div>
            <div className={styles.control_box}>
               <Input
                  placeholder='Введите индекс'
                  type='text'
                  maxLength={4}
                  isLimitText={false}
                  style={{ maxWidth: '204px' }}
               />
               <Button
                  text='Добавить по индексу'
                  style={{ minWidth: '362px' }}
               />
               <Button
                  text='Удалить по индексу'
                  style={{ minWidth: '362px' }}
               />
            </div>
         </div>
      </SolutionLayout >
   );
};
