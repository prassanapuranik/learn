<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>Knowledge Management Portal</q-toolbar-title>
        <div class="q-gutter-sm row items-center">
          <q-btn flat dense label="Dashboard" to="/dashboard" />
          <q-btn flat dense label="Calendar" to="/calendar" />
          <q-btn flat dense label="Reports" to="/reports" />
          <q-btn
            v-if="isAdmin"
            flat
            dense
            label="Manage Events"
            to="/events"
          />
          <q-btn flat dense color="yellow-3" label="Logout" @click="logout" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const isAdmin = computed(() => store.getters.currentUserRole === 'admin');

const logout = () => {
  store.dispatch('logout');
  router.push('/login');
};
</script>
