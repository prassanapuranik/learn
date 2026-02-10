<template>
  <MainLayout>
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Event Management (Admin)</div>
      <q-btn color="primary" label="Create Event" @click="openCreate" />
    </div>

    <q-table :rows="events" :columns="columns" row-key="id" flat bordered>
      <template #body-cell-actions="props">
        <q-td>
          <q-btn dense flat icon="edit" color="primary" @click="openEdit(props.row)" />
          <q-btn dense flat icon="delete" color="negative" @click="remove(props.row.id)" />
          <q-btn dense flat icon="mail" color="orange" @click="sendReminder(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <EventFormDialog v-model="dialog" :selected-event="selectedEvent" @save="save" />
  </MainLayout>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import MainLayout from '../layouts/MainLayout.vue';
import EventFormDialog from '../components/EventFormDialog.vue';

const store = useStore();
const dialog = ref(false);
const selectedEvent = ref(null);

const columns = [
  { name: 'date', label: 'Date', field: 'date', align: 'left' },
  { name: 'topic', label: 'Topic', field: 'topic', align: 'left' },
  { name: 'presenter', label: 'Presenter', field: 'presenter', align: 'left' },
  { name: 'medium', label: 'Medium', field: 'medium', align: 'left' },
  { name: 'duration', label: 'Duration', field: 'duration', align: 'left' },
  { name: 'creditPoints', label: 'Credits', field: 'creditPoints', align: 'left' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'left' }
];

const events = computed(() => [...store.getters.allEvents].sort((a, b) => a.date.localeCompare(b.date)));

const openCreate = () => {
  selectedEvent.value = null;
  dialog.value = true;
};

const openEdit = (event) => {
  selectedEvent.value = event;
  dialog.value = true;
};

const save = (event) => {
  if (event.id) {
    store.dispatch('saveEvent', event);
  } else {
    store.dispatch('createEvent', event);
  }
};

const remove = (id) => {
  store.dispatch('removeEvent', id);
};

const sendReminder = (id) => {
  store.dispatch('sendReminder', id);
};
</script>
