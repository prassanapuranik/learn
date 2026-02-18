import createCrudModule from '../createCrudModule';

export default createCrudModule('salaries', [
  { id: 'sal-1', employee: 'Jane Doe', amount: 90000, effectiveDate: '2025-01-01' }
]);
