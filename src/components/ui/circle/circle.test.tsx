import { render } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe('Тест компонента Circle', () => {
   it('Отрисовка без символов', () => {
      const circle = render(<Circle />).container;
      expect(circle).toMatchSnapshot();
   });

   it('Отрисовка с символами', () => {
      const circle = render(<Circle letter='К' />).container;
      expect(circle).toMatchSnapshot();
   });

   it('Отрисовка с head', () => {
      const circle = render(<Circle head='Р' />).container;
      expect(circle).toMatchSnapshot();
   });

   it('Отрисовка с react-элементом в head', () => {
      const circle = render(
         <Circle head={<Circle isSmall={true} letter='У' />} />
      ).container;
      expect(circle).toMatchSnapshot();
   });

   it('Отрисовка с tail', () => {
      const circle = render(<Circle tail='Г' />).container;
      expect(circle).toMatchSnapshot();
   });

   it('Отрисовка с react-элементом в tail', () => {
      const circle = render(
         <Circle tail={<Circle isSmall={true} letter='И' />} />
      ).container;
      expect(circle).toMatchSnapshot();
   });

   it('Отрисовка с index', () => {
      const circle = render(<Circle index={0} />).container;
      expect(circle).toMatchSnapshot();
   });

   it('Отрисовка с пропом isSmall === true', () => {
      const circle = render(<Circle isSmall={true} />).container;
      expect(circle).toMatchSnapshot();
   });

   it('Отрисовка в состоянии default', () => {
      const circle = render(<Circle state={ElementStates.Default} />).container;
      expect(circle).toMatchSnapshot();
   });

   it('Отрисовка в состоянии changing', () => {
      const circle = render(<Circle state={ElementStates.Changing} />).container;
      expect(circle).toMatchSnapshot();
   });

   it('Отрисовка в состоянии modified', () => {
      const circle = render(<Circle state={ElementStates.Modified} />).container;
      expect(circle).toMatchSnapshot();
   });
})