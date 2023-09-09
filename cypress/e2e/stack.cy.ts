import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { ElColor, baseUrl, stackUrl } from "./constants";

describe('Тестирование страницы Стек', () => {
   beforeEach(() => {
      cy.visit(baseUrl + stackUrl);
      cy.clock();
   });
   it('Кнопка Добавить заблокированна при пустом поле input', () => {
      cy.get('[test-id="textInput"]').invoke('val').then((val) => {
         if (!val) {
            cy.get('[test-id="addButton"]').should('be.disabled')
         }
      });
   });

   it('Корректность стилей и значений при добавлени элемента в очередь', () => {
      const textArray = ['А', 'Б', 'В', 'Г', 'Д'];

      for (let i = 0; i < textArray.length; i++) {
         cy.get('[test-id="textInput"]').type(textArray[i]);
         cy.get('[test-id="addButton"]').click();
         cy.get('[test-id="circle"]').each((element, index, list) => {
            if (list.length === 1 || (index === list.length - 1 && index !== 0)) {
               cy.get(element).contains(textArray[index]);
               cy.get(element).should('have.css', 'border-color', ElColor.changing);
               cy.tick(SHORT_DELAY_IN_MS);
               cy.get(element).should('have.css', 'border-color', ElColor.default);
            }
            if (index < list.length - 1 && list.length !== 1) {
               cy.get(element).should('have.css', 'border-color', ElColor.default);
            }
         })
      }
   });
});