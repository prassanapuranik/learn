import createCrudModule from '../createCrudModule';

export default createCrudModule('departments', [
  { id: 'dep-1', name: 'Engineering', description: 'Builds and maintains products' }
]);
