import { baseUrl, extraPageInfo } from "./constants"

describe('Проверка запуска страниц', () => {
   beforeEach(() => {
      cy.visit(baseUrl)
   });

   for (let i = 0; i < extraPageInfo.length; i++) {
      const name = extraPageInfo[i].name;
      const url = extraPageInfo[i].url;
      
      it(`${name}`, () => {
         cy.get(`a[href*=${url}]`).click()
         cy.contains(name)
      })
   }
})
