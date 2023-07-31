export const randomArr = (minLength: number, maxLength: number) => {
   let array: number[] = [];
   const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
   for (let i = 0; i < length; i++) {
      array.push(Math.floor(Math.random() * 101))
   }
   return array
}