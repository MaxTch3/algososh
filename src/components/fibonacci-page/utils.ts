export const getFibonacciArraySteps = (n: number): number[][] => {
   const fibArraySteps: Array<number[]> = [];
   const fibArray: number[] = [];
   for (let i = 0; i <= n; i++) {
      if (i === 0) {
         fibArray.push(1)
      }
      if (i === 1) {
         fibArray.push(1)
      }
      if (i >= 2) {
         fibArray.push(fibArray[i - 1] + fibArray[i - 2])
      }
      fibArraySteps.push([...fibArray])
   }
   return fibArraySteps
}