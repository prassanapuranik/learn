<template>
  <MainLayout>
    <div class="text-h5 q-mb-md">Reports</div>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section class="text-subtitle1">Topics Report</q-card-section>
          <q-separator />
          <q-list>
            <q-item v-for="item in topics" :key="item.topic">
              <q-item-section>{{ item.topic }}</q-item-section>
              <q-item-section side>{{ item.count }}</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section class="text-subtitle1">Presenters Report</q-card-section>
          <q-separator />
          <q-list>
            <q-item v-for="item in presenters" :key="item.presenter">
              <q-item-section>{{ item.presenter }}</q-item-section>
              <q-item-section side>{{ item.count }}</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <q-card class="q-mt-md">
      <q-card-section class="text-subtitle1">Credit Point System</q-card-section>
      <q-card-section>
        <div>Total credits from events: <b>{{ stats.totalCredits }}</b></div>
        <div class="text-caption text-grey-7">Each event contributes configurable credit points.</div>
      </q-card-section>
    </q-card>
  </MainLayout>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import MainLayout from '../layouts/MainLayout.vue';

const store = useStore();

const topics = computed(() => store.getters.topicReport);
const presenters = computed(() => store.getters.presenterReport);
const stats = computed(() => store.getters.dashboardStats);
</script>
