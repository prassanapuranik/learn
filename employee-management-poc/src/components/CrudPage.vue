<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">{{ title }}</div>
      <q-btn color="primary" label="Add" @click="openCreate" />
    </div>

    <q-table :rows="rows" :columns="columnsWithActions" row-key="id" flat bordered>
      <template #body-cell-actions="props">
        <q-td>
          <q-btn dense flat icon="edit" color="primary" @click="openEdit(props.row)" />
          <q-btn dense flat icon="delete" color="negative" @click="remove(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="dialogOpen">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ isEditing ? 'Edit' : 'Create' }} {{ title }}</div>
        </q-card-section>
        <q-card-section class="q-gutter-sm">
          <q-input
            v-for="field in fields"
            :key="field.name"
            v-model="form[field.name]"
            :type="field.type || 'text'"
            :label="field.label"
            dense
            outlined
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="primary" label="Save" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';

const props = defineProps({
  title: String,
  moduleName: String,
  columns: Array,
  fields: Array
});

const store = useStore();
const $q = useQuasar();
const dialogOpen = ref(false);
const isEditing = ref(false);
const form = reactive({});

const rows = computed(() => store.getters[`${props.moduleName}/all`]);
const columnsWithActions = computed(() => [
  ...props.columns,
  { name: 'actions', label: 'Actions', align: 'left', field: 'actions' }
]);

const resetForm = () => {
  props.fields.forEach((field) => {
    form[field.name] = '';
  });
  form.id = '';
};

const openCreate = () => {
  isEditing.value = false;
  resetForm();
  dialogOpen.value = true;
};

const openEdit = (row) => {
  isEditing.value = true;
  Object.assign(form, row);
  dialogOpen.value = true;
};

const save = () => {
  if (!form.id) {
    form.id = `${props.moduleName}-${Date.now()}`;
    store.commit(`${props.moduleName}/add`, { ...form });
    $q.notify({ type: 'positive', message: `${props.title} created` });
  } else {
    store.commit(`${props.moduleName}/update`, { ...form });
    $q.notify({ type: 'info', message: `${props.title} updated` });
  }
  dialogOpen.value = false;
};

const remove = (id) => {
  store.commit(`${props.moduleName}/remove`, id);
  $q.notify({ type: 'warning', message: `${props.title} deleted` });
};
</script>
