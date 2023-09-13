import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
   ElColor,
   baseUrl,
   circleSelector,
   headSelector,
   tailSelector,
   textInputSelector,
   queueUrl,
   addButtonSelector,
   clearButtonSelector,
   deleteButtonSelector
} from "./constants";

const textArray = ['А', 'Б', 'В', 'Г', 'Д'];

describe('Тестирование страницы Очередь', () => {

   beforeEach(() => {
      cy.visit(baseUrl + queueUrl);
      cy.clock()
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

   it('Корректность стилей и значений при добавлени элемента в очередь', () => {

      for (let i = 0; i < textArray.length; i++) {
         cy.get(textInputSelector).type(textArray[i]);
         cy.get(addButtonSelector).click()

         cy.get(circleSelector).each((element, index) => {
            if (i === index) {
               cy.get(element).should('have.css', 'border-color', ElColor.changing);
               cy.get(element).should('not.have.text');

            }
            if (index < i) {
               cy.get(element).should('have.css', 'border-color', ElColor.default);
               cy.get(element).should('have.text', textArray[index])
            }
            if (index === i - 1 && i > 0) {
               cy.get(element).parent().find(tailSelector).should('have.text', 'tail')
            } else {
               cy.get(element).parent().find(tailSelector).should('have.text', '')
            }
            if (index === 0 && i > 0) {
               cy.get(element).parent().find(headSelector).should('have.text', 'head')
            } else {
               cy.get(element).parent().find(headSelector).should('have.text', '');
            }
         });

         cy.tick(SHORT_DELAY_IN_MS);
         cy.get(circleSelector).eq(i).should('have.css', 'border-color', ElColor.default);
         cy.get(circleSelector).eq(i).should('have.text', textArray[i])
      }
   });

   it('Корректность стилей и значений при удалении элемента из очереди', () => {

      for (let i = 0; i < textArray.length; i++) {
         cy.get(textInputSelector).type(textArray[i]);
         cy.get(addButtonSelector).click()
         cy.tick(SHORT_DELAY_IN_MS);
      };

      for (let i = 0; i < textArray.length; i++) {
         cy.get(deleteButtonSelector).click()
         cy.get(circleSelector).each((element, index) => {
            if (index === i) {
               cy.get(element).should('have.css', 'border-color', ElColor.changing);
               cy.get(element).should('have.text', textArray[i]);
               cy.get(element).parent().find(headSelector).should('have.text', 'head')
            }
         });

         cy.tick(SHORT_DELAY_IN_MS);
         cy.get(circleSelector).eq(i).should('have.css', 'border-color', ElColor.default);
         cy.get(circleSelector).eq(i).should('not.have.text');
         cy.get(circleSelector).eq(i).parent().find(headSelector).should('have.text', '');
         if (i === textArray.length - 1) {
            cy.get(circleSelector).eq(i).parent().find(tailSelector).should('have.text', '')
         }
      }
   });

   it('Корректность очистки очереди', () => {

      for (let i = 0; i < textArray.length; i++) {
         cy.get(textInputSelector).type(textArray[i]);
         cy.get(addButtonSelector).click();
         cy.tick(SHORT_DELAY_IN_MS)
      }
      cy.get(clearButtonSelector).click();
      cy.get(circleSelector).each((element) => {
         cy.get(element).should('have.css', 'border-color', ElColor.default);
         cy.get(element).should('not.have.text');
         cy.get(element).parent().find(headSelector).should('have.text', '');
         cy.get(element).parent().find(tailSelector).should('have.text', '');
      })
   })

});


