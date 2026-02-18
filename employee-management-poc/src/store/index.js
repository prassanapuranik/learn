import { createStore } from 'vuex';
import employees from './modules/employees';
import departments from './modules/departments';
import roles from './modules/roles';
import salaries from './modules/salaries';
import leaves from './modules/leaves';

export default createStore({
  modules: {
    employees,
    departments,
    roles,
    salaries,
    leaves
  }
});
