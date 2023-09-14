import { baseUrl } from "./constants"

describe('Проверка запуска приложения', () => {
   it('запущено', () => {
      cy.visit(baseUrl)
   })
})