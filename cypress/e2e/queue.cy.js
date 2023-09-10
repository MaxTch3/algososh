import { baseUrl, queueUrl } from "./constants";

describe('Тестирование страницы Очередь', () => {

   beforeEach(() => {
      cy.visit(baseUrl + queueUrl);
      cy.clock();
   });

   it('Кнопка Добавить заблокированна при пустом поле input', () => {
      cy.get('[test-id="textInput"]').invoke('val').then((val) => {
         if (!val) {
            cy.get('[test-id="addButton"]').should('be.disabled')
         }
      });
   });
})