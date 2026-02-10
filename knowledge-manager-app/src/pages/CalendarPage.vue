<template>
  <MainLayout>
    <div class="row items-center q-gutter-md q-mb-md">
      <div class="text-h5">Monthly Calendar</div>
      <q-select
        dense
        outlined
        style="width: 180px"
        v-model="selectedMonth"
        :options="monthOptions"
        label="Month"
      />
    </div>

    <div class="calendar-grid q-mb-sm text-weight-medium">
      <div v-for="day in daysOfWeek" :key="day" class="text-center">{{ day }}</div>
    </div>

    <div class="calendar-grid">
      <div v-for="cell in calendarCells" :key="cell.key" class="calendar-cell">
        <template v-if="cell.date">
          <div class="text-weight-bold">{{ cell.day }}</div>
          <div v-for="event in cell.events" :key="event.id" class="event-chip">
            {{ event.topic }} ({{ event.presenter }})
          </div>
        </template>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import MainLayout from '../layouts/MainLayout.vue';

const store = useStore();
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const monthOptions = [
  { label: 'January 2026', value: '2026-01' },
  { label: 'February 2026', value: '2026-02' }
];

const selectedMonth = ref(monthOptions[0]);

const eventsByDate = computed(() => {
  const map = {};
  store.getters.allEvents.forEach((event) => {
    map[event.date] = map[event.date] || [];
    map[event.date].push(event);
  });
  return map;
});

const calendarCells = computed(() => {
  const [yearStr, monthStr] = selectedMonth.value.value.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr) - 1;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];

  for (let i = 0; i < firstDay; i += 1) {
    cells.push({ key: `empty-${i}`, date: null });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    cells.push({
      key: date,
      date,
      day,
      events: eventsByDate.value[date] || []
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ key: `tail-${cells.length}`, date: null });
  }

  return cells;
});
</script>
