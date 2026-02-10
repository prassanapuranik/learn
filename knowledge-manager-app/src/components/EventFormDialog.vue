<template>
  <q-dialog v-model="modelValueProxy" persistent>
    <q-card style="min-width: 480px">
      <q-card-section class="text-h6">{{ form.id ? 'Edit Event' : 'Create Event' }}</q-card-section>
      <q-card-section class="q-gutter-sm">
        <q-input v-model="form.topic" label="Topic" dense outlined />
        <q-input v-model="form.presenter" label="Presenter" dense outlined />
        <q-input v-model="form.date" type="date" label="Date" dense outlined />
        <q-input v-model="form.duration" label="Duration" dense outlined />
        <q-input v-model.number="form.creditPoints" type="number" label="Credit Points" dense outlined />
        <q-input v-model="form.medium" label="Medium" dense outlined />
        <q-input v-model="form.notes" type="textarea" label="Notes" dense outlined />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="grey" @click="close" />
        <q-btn flat label="Save" color="primary" @click="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, reactive, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  selectedEvent: { type: Object, default: null }
});

const emit = defineEmits(['update:modelValue', 'save']);

const emptyEvent = () => ({
  id: null,
  topic: '',
  presenter: '',
  date: '',
  duration: '',
  creditPoints: 1,
  medium: 'Teams',
  notes: ''
});

const form = reactive(emptyEvent());

watch(
  () => props.selectedEvent,
  (val) => {
    Object.assign(form, val ? { ...val } : emptyEvent());
  },
  { immediate: true }
);

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const close = () => emit('update:modelValue', false);

const save = () => {
  emit('save', { ...form });
  close();
};
</script>
