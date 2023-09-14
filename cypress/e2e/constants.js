export const baseUrl = 'http://localhost:3000/';

export const recursionUrl = 'recursion';
export const fibonacciUrl = 'fibonacci';
export const stackUrl = 'stack';
export const queueUrl = 'queue';
export const listUrl = 'list';

export const extraPageInfo = [
   { name: 'Строка', url: recursionUrl },
   { name: 'Последовательность Фибоначчи', url: fibonacciUrl },
   { name: 'Сортировка массива', url: 'sorting' },
   { name: 'Стек', url: stackUrl },
   { name: 'Очередь', url: 'queue' },
   { name: 'Связный список', url: 'list' }
];

export const ElColor = {
   default: 'rgb(0, 50, 255)',
   changing: 'rgb(210, 82, 225)',
   modified: 'rgb(127, 224, 81)'
}

export const circleSelector = '[test-id="circle"]';
export const smallCircleSelector = '[test-id="smallCircle"]';
export const headSelector = '[test-id="head"]';
export const tailSelector = '[test-id="tail"]';
export const addHeadSelector = '[test-id="addHeadButton"]';
export const addTailSelector = '[test-id="addTailButton"]';
export const deleteHeadSelector = '[test-id="deleteHeadButton"]';
export const deleteTailSelector = '[test-id="deleteTailButton"]';
export const addIndexSelector = '[test-id="addIndexButton"]';
export const deleteIndexSelector = '[test-id="deleteIndexButton"]';
export const textInputSelector = '[test-id="textInput"]';
export const indexInputSelector = '[test-id="indexInput"]';
export const addButtonSelector = '[test-id="addButton"]';
export const deleteButtonSelector = '[test-id="deleteButton"]';
export const clearButtonSelector = '[test-id="clearButton"]'
