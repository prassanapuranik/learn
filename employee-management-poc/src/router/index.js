import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '../pages/DashboardPage.vue';
import EmployeesPage from '../pages/EmployeesPage.vue';
import DepartmentsPage from '../pages/DepartmentsPage.vue';
import RolesPage from '../pages/RolesPage.vue';
import SalariesPage from '../pages/SalariesPage.vue';
import LeavesPage from '../pages/LeavesPage.vue';

const routes = [
  { path: '/', component: DashboardPage },
  { path: '/employees', component: EmployeesPage },
  { path: '/departments', component: DepartmentsPage },
  { path: '/roles', component: RolesPage },
  { path: '/salaries', component: SalariesPage },
  { path: '/leaves', component: LeavesPage }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
