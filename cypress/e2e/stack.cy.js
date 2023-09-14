import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import {
   ElColor,
   baseUrl,
   circleSelector,
   stackUrl,
   addButtonSelector,
   textInputSelector,
   deleteButtonSelector,
   clearButtonSelector
} from './constants';

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
      cy.get(textInputSelector).invoke('val').then((val) => {
         if (!val) {
            cy.get(addButtonSelector).should('be.disabled')
         }
      });
   });

   it('Корректность стилей и значений при добавлени элемента в стек', () => {

      for (let i = 0; i < textArray.length; i++) {
         cy.get(textInputSelector).type(textArray[i]);
         cy.get(addButtonSelector).click();
         cy.get(circleSelector).each((element, index, list) => {
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
         cy.get(textInputSelector).type(textArray[i]);
         cy.get(addButtonSelector).click();
         cy.tick(SHORT_DELAY_IN_MS)
      }

      for (let i = 0; i < textArray.length; i++) {
         cy.get(deleteButtonSelector).click();

         cy.get(circleSelector).each((element, index, list) => {
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
            cy.get(circleSelector).should('not.exist')
         } else {
            cy.get(circleSelector).eq(textArray.length - i - 1).should('not.exist');
         }
      }
   });

   it('Корректность очистки стека', () => {
      for (let i = 0; i < textArray.length; i++) {
         cy.get(textInputSelector).type(textArray[i]);
         cy.get(addButtonSelector).click();
         cy.tick(SHORT_DELAY_IN_MS)
      }
      cy.get(clearButtonSelector).click();
      cy.get(circleSelector).should('not.exist')
   })
});