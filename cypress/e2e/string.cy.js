import {
   ElColor,
   baseUrl,
   recursionUrl
} from "./constants";
import { DELAY_IN_MS } from '../../src/constants/delays';

describe('Тестирование страницы Строка', () => {
   beforeEach(() => {
      cy.visit(baseUrl + recursionUrl);
      cy.clock();
   });
   it('Кнопка заблокированна при пустом поле input', () => {
      cy.get('[test-id="textInput"]').invoke('val').then((val) => {
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

      cy.get('[test-id="textInput"]').type(inputText);
      cy.get('[test-id="reverseButton"]').click();

      for (let i = 0; i < steps.length; i++) {
         cy.get('[test-id="circle"]').each((element, index) => {
            cy.get(element).contains(steps[i].textArray[index]);
            cy.get(element).should('have.css', 'border-color', steps[i].colors[index]);
            cy.tick(DELAY_IN_MS);
         })
      }
   });
});

