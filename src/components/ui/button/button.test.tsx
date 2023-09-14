import { fireEvent, render, screen } from "@testing-library/react"
import { Button } from "./button"

describe('Тест компонента Button', () => {
   it('Отрисовка с текстом', () => {
      const button = render(<Button text='Кнопка' />).container;
      expect(button).toMatchSnapshot();
   });

   it('Отрисовка без текста', () => {
      const button = render(<Button />).container;
      expect(button).toMatchSnapshot();
   });

   it('Отрисовка c блокировкой', () => {
      const button = render(<Button disabled />).container;
      expect(button).toMatchSnapshot();
   });

   it('Отрисовка с индикацией загрузки', () => {
      const button = render(<Button isLoader />).container;
      expect(button).toMatchSnapshot();
   });

   it('Вызов колбека при клике на кнопку', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} text='Кнопка'/>);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
   });
})