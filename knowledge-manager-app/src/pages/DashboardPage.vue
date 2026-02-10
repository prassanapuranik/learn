<template>
  <MainLayout>
    <div class="text-h5 q-mb-md">Dashboard</div>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-3" v-for="(val, key) in stats" :key="key">
        <q-card>
          <q-card-section>
            <div class="text-caption text-grey-6">{{ key }}</div>
            <div class="text-h5">{{ val }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card>
      <q-card-section class="text-subtitle1">Recent Reminders/Emails Sent</q-card-section>
      <q-separator />
      <q-list>
        <q-item v-for="item in reminders" :key="item.id">
          <q-item-section>
            <q-item-label>{{ item.message }}</q-item-label>
            <q-item-label caption>{{ item.at }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="!reminders.length">
          <q-item-section>No reminders sent yet.</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </MainLayout>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import MainLayout from '../layouts/MainLayout.vue';

const store = useStore();

onMounted(() => {
  if (!store.state.events.length) {
    store.dispatch('loadEvents');
  }
});

const stats = computed(() => store.getters.dashboardStats);
const reminders = computed(() => store.state.reminders);
</script>
