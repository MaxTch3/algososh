import { ElColor, baseUrl, listUrl } from "./constants";

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
      const startingArray = ['0', '34', '8', '1'];
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

})