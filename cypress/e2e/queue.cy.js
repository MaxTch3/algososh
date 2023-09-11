import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { ElColor, baseUrl, queueUrl } from "./constants";

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
      cy.get('[test-id="textInput"]').invoke('val').then((val) => {
         if (!val) {
            cy.get('[test-id="addButton"]').should('be.disabled')
         }
      });
   });

   it('Корректность стилей и значений при добавлени элемента в очередь', () => {

      for (let i = 0; i < textArray.length; i++) {
         cy.get('[test-id="textInput"]').type(textArray[i]);
         cy.get('[test-id="addButton"]').click()

         cy.get('[test-id="circle"]').each((element, index) => {
            if (i === index) {
               cy.get(element).should('have.css', 'border-color', ElColor.changing);
               cy.get(element).should('not.have.text');

            }
            if (index < i) {
               cy.get(element).should('have.css', 'border-color', ElColor.default);
               cy.get(element).should('have.text', textArray[index])
            }
            if (index === i - 1 && i > 0) {
               cy.get(element).parent().get('[test-id="tail"]').should('have.text', 'tail')
            } else {
               cy.get(element).parent().get('[test-id="tail"]').should('not.have.text')
            }
            if (index === 0 && i > 0) {
               cy.get(element).parent().get('[test-id="head"]').should('have.text', 'head')
            } else {
               cy.get(element).parent().get('[test-id="head"]').should('not.have.text');
            }
         });

         cy.tick(SHORT_DELAY_IN_MS);
         cy.get('[test-id="circle"]').eq(i).should('have.css', 'border-color', ElColor.default);
         cy.get('[test-id="circle"]').eq(i).should('have.text', textArray[i])
      }
   });

   it('Корректность стилей и значений при удалении элемента из очереди', () => {

      for (let i = 0; i < textArray.length; i++) {
         cy.get('[test-id="textInput"]').type(textArray[i]);
         cy.get('[test-id="addButton"]').click()
         cy.tick(SHORT_DELAY_IN_MS);
      };

      for (let i = 0; i < textArray.length; i++) {
         cy.get('[test-id="deleteButton"]').click()
         cy.get('[test-id="circle"]').each((element, index) => {
            if (index === i) {
               cy.get(element).should('have.css', 'border-color', ElColor.changing);
               cy.get(element).should('have.text', textArray[i]);
               cy.get(element).parent().get('[test-id="head"]').should('have.text', 'head')
            }
         });

         cy.tick(SHORT_DELAY_IN_MS);
         cy.get('[test-id="circle"]').eq(i).should('have.css', 'border-color', ElColor.default);
         cy.get('[test-id="circle"]').eq(i).should('not.have.text');
         cy.get('[test-id="circle"]').eq(i).parent().get('[test-id="head"]').should('not.have.text');
         if (i === textArray.length - 1) {
            cy.get('[test-id="circle"]').eq(i).parent().get('[test-id="tail"]').should('not.have.text')
         }
      }
   });

   it('Корректность очистки очереди', () => {

      for (let i = 0; i < textArray.length; i++) {
         cy.get('[test-id="textInput"]').type(textArray[i]);
         cy.get('[test-id="addButton"]').click();
         cy.tick(SHORT_DELAY_IN_MS)
      }
      cy.get('[test-id="clearButton"]').click();
      cy.get('[test-id="circle"]').each((element) => {
         cy.get(element).should('have.css', 'border-color', ElColor.default);
         cy.get(element).should('not.have.text');
         cy.get(element).parent().get('[test-id="head"]').should('not.have.text');
         cy.get(element).parent().get('[test-id="tail"]').should('not.have.text');
      })
   })

});


