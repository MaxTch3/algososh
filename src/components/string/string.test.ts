import { getReversingStringSteps } from './utils';

describe('Тест пошагового разворота строки', () => {
   it('С чётным количеством символов', () => {
      const array = ['п', 'р', 'и', 'в', 'е', 'т']
      const result = getReversingStringSteps(array)
      expect(result).toEqual([
         ["п", "р", "и", "в", "е", "т"],
         ["т", "р", "и", "в", "е", "п"],
         ["т", "е", "и", "в", "р", "п"],
         ["т", "е", "в", "и", "р", "п"]
      ])
   });

   it('С нечётным количеством символов', () => {
      const array = ['h', 'e', 'l', 'l', 'o']
      const result = getReversingStringSteps(array)
      expect(result).toEqual([
         ['h', 'e', 'l', 'l', 'o'],
         ['o', 'e', 'l', 'l', 'h'],
         ['o', 'l', 'l', 'e', 'h']
      ]);
   });

   it('C одним символом', () => {
      const array = ['T']
      const result = getReversingStringSteps(array)
      expect(result).toEqual([['T']]);
   });

   it('C пустой строкой', () => {
      const array: string[] = [];
      const result = getReversingStringSteps(array)
      expect(result).toEqual([[]]);
   })
})