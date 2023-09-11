import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { ElColor, baseUrl, stackUrl } from './constants';

const textArray = ['А', 'Б', 'В', 'Г', 'Д', 'Е'];

describe('Тестирование страницы Стек', () => {

   beforeEach(() => {
      cy.visit(baseUrl + stackUrl);
      cy.clock();
   });

   afterEach(() => {
      cy.clock().then((clock) => {
         clock.restore()
      })
   });

   it('Кнопка Добавить заблокированна при пустом поле input', () => {
      cy.get('[test-id="textInput"]').invoke('val').then((val) => {
         if (!val) {
            cy.get('[test-id="addButton"]').should('be.disabled')
         }
      });
   });

   it('Корректность стилей и значений при добавлени элемента в стек', () => {

      for (let i = 0; i < textArray.length; i++) {
         cy.get('[test-id="textInput"]').type(textArray[i]);
         cy.get('[test-id="addButton"]').click();
         cy.get('[test-id="circle"]').each((element, index, list) => {
            if (list.length === 1 || (index === list.length - 1 && index !== 0)) {
               cy.get(element).contains(textArray[index]);
               cy.get(element).should('have.css', 'border-color', ElColor.changing);
               cy.tick(SHORT_DELAY_IN_MS);
               cy.get(element).should('have.css', 'border-color', ElColor.default);
            };
            if (index < list.length - 1 && list.length !== 1) {
               cy.get(element).should('have.css', 'border-color', ElColor.default);
            }
         })
      }
   });

   it('Корректность стилей и значений при удалении элемента из стека', () => {

      for (let i = 0; i < textArray.length; i++) {
         cy.get('[test-id="textInput"]').type(textArray[i]);
         cy.get('[test-id="addButton"]').click();
         cy.tick(SHORT_DELAY_IN_MS)
      }

      for (let i = 0; i < textArray.length; i++) {
         cy.get('[test-id="deleteButton"]').click();

         cy.get('[test-id="circle"]').each((element, index, list) => {
            if (list.length === 1 || (index === list.length - 1 && index !== 0)) {
               cy.get(element).contains(textArray[index]);
               cy.get(element).should('have.css', 'border-color', ElColor.changing);
            }
            if (index < list.length - 1 && list.length !== 1) {
               cy.get(element).should('have.css', 'border-color', ElColor.default);
            }
         });

         cy.tick(SHORT_DELAY_IN_MS);

         if (textArray.length - 1 - i === 0) {
            cy.get('[test-id="circle"]').should('not.exist')
         } else {
            cy.get('[test-id="circle"]').eq(textArray.length - i - 1).should('not.exist');
         }
      }
   });

   it('Корректность очистки стека', () => {
      for (let i = 0; i < textArray.length; i++) {
         cy.get('[test-id="textInput"]').type(textArray[i]);
         cy.get('[test-id="addButton"]').click();
         cy.tick(SHORT_DELAY_IN_MS)
      }
      cy.get('[test-id="clearButton"]').click();
      cy.get('[test-id="circle"]').should('not.exist')
   })
});