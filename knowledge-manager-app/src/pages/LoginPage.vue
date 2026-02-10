<template>
  <div class="fullscreen bg-grey-2 flex flex-center">
    <q-card style="width: 360px">
      <q-card-section>
        <div class="text-h6">Knowledge Management Login</div>
        <div class="text-caption text-grey-7">Use admin/admin123 or viewer/viewer123</div>
      </q-card-section>
      <q-card-section class="q-gutter-sm">
        <q-input v-model="username" label="Username" outlined dense />
        <q-input v-model="password" label="Password" type="password" outlined dense />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Login" color="primary" @click="submit" />
      </q-card-actions>
      <q-card-section v-if="error" class="text-negative">{{ error }}</q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const username = ref('admin');
const password = ref('admin123');
const error = ref('');

const submit = async () => {
  try {
    error.value = '';
    await store.dispatch('login', { username: username.value, password: password.value });
    await store.dispatch('loadEvents');
    router.push('/dashboard');
  } catch (err) {
    error.value = err.message;
  }
};
</script>
