import { DELAY_IN_MS } from "../../src/constants/delays";
import { ElColor, baseUrl, listUrl } from "./constants";

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

      cy.get('[test-id="textInput"]').invoke('val').then((val) => {
         if (!val) {
            cy.get('[test-id="addHeadButton"]').should('be.disabled');
            cy.get('[test-id="addTailButton"]').should('be.disabled');
            cy.get('[test-id="addIndexButton"]').should('be.disabled');
            cy.get('[test-id="deleteIndexButton"]').should('be.disabled');
         }
      });

      cy.get('[test-id="textInput"]').type('А');

      cy.get('[test-id="addHeadButton"]').should('not.be.disabled');
      cy.get('[test-id="addTailButton"]').should('not.be.disabled');
      cy.get('[test-id="addIndexButton"]').should('be.disabled');
      cy.get('[test-id="deleteIndexButton"]').should('be.disabled');

      cy.get('[test-id="textInput"]').type('{backspace}');
      cy.get('[test-id="indexInput"]').type('1');

      cy.get('[test-id="addHeadButton"]').should('be.disabled');
      cy.get('[test-id="addTailButton"]').should('be.disabled');
      cy.get('[test-id="addIndexButton"]').should('be.disabled');
      cy.get('[test-id="deleteIndexButton"]').should('not.be.disabled');

      cy.get('[test-id="textInput"]').type('А');

      cy.get('[test-id="addHeadButton"]').should('not.be.disabled');
      cy.get('[test-id="addTailButton"]').should('not.be.disabled');
      cy.get('[test-id="addIndexButton"]').should('not.be.disabled');
      cy.get('[test-id="deleteIndexButton"]').should('not.be.disabled');
   });

   it('Корректность отрисовки дефолтного списка', () => {
      cy.get('[test-id="circle"]').each((element, index, list) => {
         cy.get(element).should('have.text', startingArray[index]);
         cy.get(element).should('have.css', 'border-color', ElColor.default);

         if (index === 0) {
            cy.get(element).parent().find('[test-id="head"]').should('have.text', 'head')
         } else {
            cy.get(element).parent().find('[test-id="head"]').should('have.text', '')
         };

         if (index === list.length - 1) {
            cy.get(element).parent().find('[test-id="tail"]').should('have.text', 'tail')
         } else {
            cy.get(element).parent().find('[test-id="tail"]').should('have.text', '')
         }
      })
   });

   it('Корректность добавления элемента в head', () => {
      cy.get('[test-id="textInput"]').type('А');
      cy.get('[test-id="addHeadButton"]').click();

      cy.get('[test-id="circle"]')
         .should("have.length", startingArray.length)
         .eq(0)
         .parent()
         .find('[test-id="head"]')
         .find('[test-id="smallCircle"]')
         .should('have.css', 'border-color', ElColor.changing)
         .should('have.text', 'А');

      cy.tick(DELAY_IN_MS);

      cy.get('[test-id="circle"]')
         .should("have.length", startingArray.length + 1)
         .eq(0)
         .should('have.css', 'border-color', ElColor.modified)
         .should('have.text', 'А')
         .parent()
         .find('[test-id="head"]')
         .should('have.text', 'head')
         .should('not.contain', '[test-id="smallCircle"]');

      cy.tick(DELAY_IN_MS);

      cy.get('[test-id="circle"]').eq(0)
         .should('have.css', 'border-color', ElColor.default)
   });

   it('Корректность добавления элемента в tail', () => {
      cy.get('[test-id="textInput"]').type('Б');
      cy.get('[test-id="addTailButton"]').click();

      cy.get('[test-id="circle"]')
         .should("have.length", startingArray.length)
         .each((element, index, list) => {
            if (index === list.length - 1) {
               cy.get(element)
                  .parent()
                  .find('[test-id="head"]')
                  .find('[test-id="smallCircle"]')
                  .should('have.css', 'border-color', ElColor.changing)
                  .should('have.text', 'Б');
            }
         })

      cy.tick(DELAY_IN_MS);

      cy.get('[test-id="circle"]')
         .should("have.length", startingArray.length + 1)
         .each((element, index, list) => {
            if (index === list.length - 1) {
               cy.get(element)
                  .should('have.css', 'border-color', ElColor.modified)
                  .should('have.text', 'Б')
                  .parent()
                  .find('[test-id="head"]')
                  .should('not.contain', '[test-id="smallCircle"]');
            }
         });

      cy.tick(DELAY_IN_MS);

      cy.get('[test-id="circle"]').eq(0)
         .should('have.css', 'border-color', ElColor.default)

      cy.get('[test-id="circle"]').each((element, index, list) => {
         if (index === list.length - 1) {
            cy.get(element)
               .should('have.css', 'border-color', ElColor.default)
         }
      })
   });


   it('Корректность добавления элемента по индексу', () => {
      cy.get('[test-id="textInput"]').type('В');
      cy.get('[test-id="indexInput"]').type('1');
      cy.get('[test-id="addIndexButton"]').click();

      cy.get('[test-id="circle"]')
         .should("have.length", startingArray.length)
         .eq(0)
         .should('have.css', 'border-color', ElColor.default)
         .parent()
         .find('[test-id="head"]')
         .find('[test-id="smallCircle"]')
         .should('have.css', 'border-color', ElColor.changing)
         .should('have.text', 'В');

      cy.tick(DELAY_IN_MS);

      cy.get('[test-id="circle"]').eq(0)
         .should('have.css', 'border-color', ElColor.changing)
         .parent()
         .find('[test-id="head"]')
         .should('have.text', 'head')
         .should('not.contain', '[test-id="smallCircle"]');

      cy.get('[test-id="circle"]').eq(1)
         .should('have.css', 'border-color', ElColor.default)
         .parent()
         .find('[test-id="head"]')
         .find('[test-id="smallCircle"]')
         .should('have.css', 'border-color', ElColor.changing)
         .should('have.text', 'В');

      cy.tick(DELAY_IN_MS);

      cy.get('[test-id="circle"]')
         .should("have.length", startingArray.length + 1)
         .eq(1)
         .should('have.css', 'border-color', ElColor.modified)
         .parent()
         .find('[test-id="head"]')
         .should('have.text', '')
         .should('not.contain', '[test-id="smallCircle"]');

      cy.tick(DELAY_IN_MS);

      cy.get('[test-id="circle"]').eq(1)
         .should('have.css', 'border-color', ElColor.default)
         .should('have.text', 'В')
   });

   it('Корректность удаления элемента из head', () => {

      cy.get('[test-id="deleteHeadButton"]').click()

      cy.get('[test-id="circle"]')
         .eq(0)
         .should('have.text', '')
         .should('have.css', 'border-color', ElColor.default)
         .parent()
         .find('[test-id="tail"]')
         .find('[test-id="smallCircle"]')
         .should('have.css', 'border-color', ElColor.changing)
         .should('have.text', startingArray[0]);

      cy.tick(DELAY_IN_MS);

      cy.get('[test-id="circle"]')
         .should("have.length", startingArray.length - 1)
         .eq(0)
         .should("have.text", startingArray[1])
         .parent()
         .find('[test-id="head"]')
         .should("have.text", 'head')
   });

   it('Корректность удаления элемента из tail', () => {

      cy.get('[test-id="deleteTailButton"]').click()

      cy.get('[test-id="circle"]').each((element, index, list) => {
         if (index === list.length - 1) {
            cy.get(element)
               .should('have.text', '')
               .should('have.css', 'border-color', ElColor.default)
               .parent()
               .find('[test-id="tail"]')
               .find('[test-id="smallCircle"]')
               .should('have.css', 'border-color', ElColor.changing)
               .should('have.text', startingArray[startingArray.length - 1]);
         }
      });

      cy.tick(DELAY_IN_MS);

      cy.get('[test-id="circle"]')
         .should("have.length", startingArray.length - 1)
         .each((element, index, list) => {
            if (index === list.length - 1) {
               cy.get(element)
                  .should("have.text", startingArray[startingArray.length - 2])
                  .parent()
                  .find('[test-id="tail"]')
                  .should('not.contain', '[test-id="smallCircle"]')
                  .should("have.text", 'tail')
            }
         });      
   });

   it('Корректность удаления элемента по индексу', () => { 
      const delIndex = 1;
      
      cy.get('[test-id="indexInput"]').type(delIndex);
      cy.get('[test-id="deleteIndexButton"]').click();

      cy.get('[test-id="circle"]')
         .eq(0)
         .should('have.css', 'border-color', ElColor.changing)

      cy.tick(DELAY_IN_MS);

      cy.get('[test-id="circle"]')
         .eq(0)
         .should('have.css', 'border-color', ElColor.changing)

      cy.get('[test-id="circle"]')
         .eq(1)
         .should('have.css', 'border-color', ElColor.changing)

      cy.tick(DELAY_IN_MS);

      cy.get('[test-id="circle"]')
         .eq(1)
         .should('have.text', '')
         .should('have.css', 'border-color', ElColor.changing)
         .parent()
         .find('[test-id="tail"]')
         .find('[test-id="smallCircle"]')
         .should('have.css', 'border-color', ElColor.changing)
         .should('have.text', startingArray[delIndex]);    
      
      cy.tick(DELAY_IN_MS);

      const delAtIndexArray = [...startingArray.slice(0, delIndex), ...startingArray.slice(delIndex + 1)]
      cy.get('[test-id="circle"]')
         .should("have.length", startingArray.length - 1)
         .each((element, index) => {
            cy.get(element)
               .should('have.text', delAtIndexArray[index])
               .should('have.css', 'border-color', ElColor.default)
      })
   })

})