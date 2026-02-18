import createCrudModule from '../createCrudModule';

export default createCrudModule('employees', [
  { id: 'emp-1', name: 'Jane Doe', email: 'jane@example.com', department: 'Engineering', role: 'Software Engineer' }
]);
