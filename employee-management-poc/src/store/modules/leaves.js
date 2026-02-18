import createCrudModule from '../createCrudModule';

export default createCrudModule('leaves', [
  { id: 'lev-1', employee: 'Jane Doe', type: 'Annual', from: '2025-03-10', to: '2025-03-15', status: 'Approved' }
]);
