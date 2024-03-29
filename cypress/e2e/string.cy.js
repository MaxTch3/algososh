import { ElColor, baseUrl, circleSelector, recursionUrl, textInputSelector } from "./constants";
import { DELAY_IN_MS } from '../../src/constants/delays';

describe('Тестирование страницы Строка', () => {
   beforeEach(() => {
      cy.visit(baseUrl + recursionUrl);
      cy.clock();
   });

   afterEach(() => {
      cy.clock().then((clock) => {
         clock.restore()
      })
   });

   it('Кнопка заблокированна при пустом поле input', () => {
      cy.get(textInputSelector).invoke('val').then((val) => {
         if (!val) {
            cy.get('[test-id="reverseButton"]').should('be.disabled')
         }
      });
   });
   it('Корректность значений и стилей при развороте', () => {

      const inputText = 'hello';
      const steps = [
         {
            textArray: ['h', 'e', 'l', 'l', 'o'],
            colors: [ElColor.changing, ElColor.default, ElColor.default, ElColor.default, ElColor.changing]
         },
         {
            textArray: ['o', 'e', 'l', 'l', 'h'],
            colors: [ElColor.modified, ElColor.changing, ElColor.default, ElColor.changing, ElColor.modified]
         },
         {
            textArray: ['o', 'l', 'l', 'e', 'h'],
            colors: [ElColor.modified, ElColor.modified, ElColor.modified, ElColor.modified, ElColor.modified]
         }
      ];

      cy.get(textInputSelector).type(inputText);
      cy.get('[test-id="reverseButton"]').click();

      for (let i = 0; i < steps.length; i++) {
         cy.get(circleSelector).each((element, index) => {
            cy.get(element).contains(steps[i].textArray[index]);
            cy.get(element).should('have.css', 'border-color', steps[i].colors[index]);
         })
         cy.tick(DELAY_IN_MS);
      }
   });
});

