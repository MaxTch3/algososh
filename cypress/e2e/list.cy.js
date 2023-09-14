import { DELAY_IN_MS } from "../../src/constants/delays";
import {
   ElColor,
   baseUrl,
   circleSelector,
   smallCircleSelector,
   headSelector,
   tailSelector,
   listUrl,
   addHeadSelector,
   addTailSelector,
   addIndexSelector,
   deleteIndexSelector,
   textInputSelector,
   indexInputSelector,
   deleteHeadSelector,
   deleteTailSelector
} from "./constants";

const startingArray = ['0', '34', '8', '1'];

describe('Тестирование страницы Связный список', () => {

   beforeEach(() => {
      cy.visit(baseUrl + listUrl);
      cy.clock()
   });

   afterEach(() => {
      cy.clock().then((clock) => {
         clock.restore()
      })
   });

   it('Корректность блокировок кнопок при пустых/заполненных полях ввода значения и индекса', () => {

      cy.get(textInputSelector).invoke('val').then((val) => {
         if (!val) {
            cy.get(addHeadSelector).should('be.disabled');
            cy.get(addTailSelector).should('be.disabled');
            cy.get(addIndexSelector).should('be.disabled');
            cy.get(deleteIndexSelector).should('be.disabled');
         }
      });

      cy.get(textInputSelector).type('А');

      cy.get(addHeadSelector).should('not.be.disabled');
      cy.get(addTailSelector).should('not.be.disabled');
      cy.get(addIndexSelector).should('be.disabled');
      cy.get(deleteIndexSelector).should('be.disabled');

      cy.get(textInputSelector).type('{backspace}');
      cy.get(indexInputSelector).type('1');

      cy.get(addHeadSelector).should('be.disabled');
      cy.get(addTailSelector).should('be.disabled');
      cy.get(addIndexSelector).should('be.disabled');
      cy.get(deleteIndexSelector).should('not.be.disabled');

      cy.get(textInputSelector).type('А');

      cy.get(addHeadSelector).should('not.be.disabled');
      cy.get(addTailSelector).should('not.be.disabled');
      cy.get(addIndexSelector).should('not.be.disabled');
      cy.get(deleteIndexSelector).should('not.be.disabled');
   });

   it('Корректность отрисовки дефолтного списка', () => {
      cy.get(circleSelector).each((element, index, list) => {
         cy.get(element).should('have.text', startingArray[index]);
         cy.get(element).should('have.css', 'border-color', ElColor.default);

         if (index === 0) {
            cy.get(element).parent().find(headSelector).should('have.text', 'head')
         } else {
            cy.get(element).parent().find(headSelector).should('have.text', '')
         };

         if (index === list.length - 1) {
            cy.get(element).parent().find(tailSelector).should('have.text', 'tail')
         } else {
            cy.get(element).parent().find(tailSelector).should('have.text', '')
         }
      })
   });

   it('Корректность добавления элемента в head', () => {
      cy.get(textInputSelector).type('А');
      cy.get(addHeadSelector).click();

      cy.get(circleSelector)
         .should("have.length", startingArray.length)
         .eq(0)
         .parent()
         .find(headSelector)
         .find(smallCircleSelector)
         .should('have.css', 'border-color', ElColor.changing)
         .should('have.text', 'А');

      cy.tick(DELAY_IN_MS);

      cy.get(circleSelector)
         .should("have.length", startingArray.length + 1)
         .eq(0)
         .should('have.css', 'border-color', ElColor.modified)
         .should('have.text', 'А')
         .parent()
         .find(headSelector)
         .should('have.text', 'head')
         .should('not.contain', smallCircleSelector);

      cy.tick(DELAY_IN_MS);

      cy.get(circleSelector).eq(0)
         .should('have.css', 'border-color', ElColor.default)
   });

   it('Корректность добавления элемента в tail', () => {
      cy.get(textInputSelector).type('Б');
      cy.get(addTailSelector).click();

      cy.get(circleSelector)
         .should("have.length", startingArray.length)
         .each((element, index, list) => {
            if (index === list.length - 1) {
               cy.get(element)
                  .parent()
                  .find(headSelector)
                  .find(smallCircleSelector)
                  .should('have.css', 'border-color', ElColor.changing)
                  .should('have.text', 'Б');
            }
         })

      cy.tick(DELAY_IN_MS);

      cy.get(circleSelector)
         .should("have.length", startingArray.length + 1)
         .each((element, index, list) => {
            if (index === list.length - 1) {
               cy.get(element)
                  .should('have.css', 'border-color', ElColor.modified)
                  .should('have.text', 'Б')
                  .parent()
                  .find(headSelector)
                  .should('not.contain', smallCircleSelector);
            }
         });

      cy.tick(DELAY_IN_MS);

      cy.get(circleSelector).eq(0)
         .should('have.css', 'border-color', ElColor.default)

      cy.get(circleSelector).each((element, index, list) => {
         if (index === list.length - 1) {
            cy.get(element)
               .should('have.css', 'border-color', ElColor.default)
         }
      })
   });


   it('Корректность добавления элемента по индексу', () => {
      cy.get(textInputSelector).type('В');
      cy.get(indexInputSelector).type('1');
      cy.get(addIndexSelector).click();

      cy.get(circleSelector)
         .should("have.length", startingArray.length)
         .eq(0)
         .should('have.css', 'border-color', ElColor.default)
         .parent()
         .find(headSelector)
         .find(smallCircleSelector)
         .should('have.css', 'border-color', ElColor.changing)
         .should('have.text', 'В');

      cy.tick(DELAY_IN_MS);

      cy.get(circleSelector).eq(0)
         .should('have.css', 'border-color', ElColor.changing)
         .parent()
         .find(headSelector)
         .should('have.text', 'head')
         .should('not.contain', smallCircleSelector);

      cy.get(circleSelector).eq(1)
         .should('have.css', 'border-color', ElColor.default)
         .parent()
         .find(headSelector)
         .find(smallCircleSelector)
         .should('have.css', 'border-color', ElColor.changing)
         .should('have.text', 'В');

      cy.tick(DELAY_IN_MS);

      cy.get(circleSelector)
         .should("have.length", startingArray.length + 1)
         .eq(1)
         .should('have.css', 'border-color', ElColor.modified)
         .parent()
         .find(headSelector)
         .should('have.text', '')
         .should('not.contain', smallCircleSelector);

      cy.tick(DELAY_IN_MS);

      cy.get(circleSelector).eq(1)
         .should('have.css', 'border-color', ElColor.default)
         .should('have.text', 'В')
   });

   it('Корректность удаления элемента из head', () => {

      cy.get(deleteHeadSelector).click()

      cy.get(circleSelector)
         .eq(0)
         .should('have.text', '')
         .should('have.css', 'border-color', ElColor.default)
         .parent()
         .find(tailSelector)
         .find(smallCircleSelector)
         .should('have.css', 'border-color', ElColor.changing)
         .should('have.text', startingArray[0]);

      cy.tick(DELAY_IN_MS);

      cy.get(circleSelector)
         .should("have.length", startingArray.length - 1)
         .eq(0)
         .should("have.text", startingArray[1])
         .parent()
         .find(headSelector)
         .should("have.text", 'head')
   });

   it('Корректность удаления элемента из tail', () => {

      cy.get(deleteTailSelector).click()

      cy.get(circleSelector).each((element, index, list) => {
         if (index === list.length - 1) {
            cy.get(element)
               .should('have.text', '')
               .should('have.css', 'border-color', ElColor.default)
               .parent()
               .find(tailSelector)
               .find(smallCircleSelector)
               .should('have.css', 'border-color', ElColor.changing)
               .should('have.text', startingArray[startingArray.length - 1]);
         }
      });

      cy.tick(DELAY_IN_MS);

      cy.get(circleSelector)
         .should("have.length", startingArray.length - 1)
         .each((element, index, list) => {
            if (index === list.length - 1) {
               cy.get(element)
                  .should("have.text", startingArray[startingArray.length - 2])
                  .parent()
                  .find(tailSelector)
                  .should('not.contain', smallCircleSelector)
                  .should("have.text", 'tail')
            }
         });      
   });

   it('Корректность удаления элемента по индексу', () => { 
      const delIndex = 1;
      
      cy.get(indexInputSelector).type(delIndex);
      cy.get(deleteIndexSelector).click();

      cy.get(circleSelector)
         .eq(0)
         .should('have.css', 'border-color', ElColor.changing)

      cy.tick(DELAY_IN_MS);

      cy.get(circleSelector)
         .eq(0)
         .should('have.css', 'border-color', ElColor.changing)

      cy.get(circleSelector)
         .eq(1)
         .should('have.css', 'border-color', ElColor.changing)

      cy.tick(DELAY_IN_MS);

      cy.get(circleSelector)
         .eq(1)
         .should('have.text', '')
         .should('have.css', 'border-color', ElColor.changing)
         .parent()
         .find(tailSelector)
         .find(smallCircleSelector)
         .should('have.css', 'border-color', ElColor.changing)
         .should('have.text', startingArray[delIndex]);    
      
      cy.tick(DELAY_IN_MS);

      const delAtIndexArray = [...startingArray.slice(0, delIndex), ...startingArray.slice(delIndex + 1)]
      cy.get(circleSelector)
         .should("have.length", startingArray.length - 1)
         .each((element, index) => {
            cy.get(element)
               .should('have.text', delAtIndexArray[index])
               .should('have.css', 'border-color', ElColor.default)
      })
   })

})