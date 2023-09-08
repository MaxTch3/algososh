import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { baseUrl, fibonacciUrl } from "./constants";

describe('Тестирование страницы Числа Фибоначчи', () => {
   beforeEach(() => {
      cy.visit(baseUrl + fibonacciUrl);
      cy.clock();
   });
   
   it('Кнопка заблокированна при пустом поле input', () => {
      cy.get('[test-id="numberInput"]').invoke('val').then((val) => {
         if (!val) {
            cy.get('[test-id="calculateButton"]').should('be.disabled')
         }
      });
   });

   it('Корректность генерируемых значений', () => {
      const inputNumber = 5;
      const resultArray = [1, 1, 2, 3, 5, 8];

      cy.get('[test-id="numberInput"]').type(inputNumber);
      cy.get('[test-id="calculateButton"]').click();

      for (let i = 0; i <= inputNumber; i++) {
         cy.get('[test-id="circle"]').eq(i).contains(resultArray[i]);
         cy.tick(SHORT_DELAY_IN_MS)
      }
   });

});
