import { createStore } from 'vuex';
import axios from 'axios';

const STORAGE_KEY = 'km-events';

const store = createStore({
  state: {
    currentUser: null,
    users: [
      { username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User' },
      { username: 'viewer', password: 'viewer123', role: 'viewer', name: 'Knowledge Viewer' }
    ],
    events: [],
    loading: false,
    reminders: []
  },
  getters: {
    isAuthenticated: (state) => Boolean(state.currentUser),
    currentUserRole: (state) => state.currentUser?.role || null,
    allEvents: (state) => state.events,
    dashboardStats: (state) => {
      const total = state.events.length;
      const credits = state.events.reduce((sum, item) => sum + Number(item.creditPoints || 0), 0);
      return {
        totalEvents: total,
        totalTopics: new Set(state.events.map((event) => event.topic)).size,
        totalPresenters: new Set(state.events.map((event) => event.presenter)).size,
        totalCredits: credits
      };
    },
    topicReport: (state) => {
      const map = {};
      state.events.forEach((event) => {
        map[event.topic] = (map[event.topic] || 0) + 1;
      });
      return Object.entries(map).map(([topic, count]) => ({ topic, count }));
    },
    presenterReport: (state) => {
      const map = {};
      state.events.forEach((event) => {
        map[event.presenter] = (map[event.presenter] || 0) + 1;
      });
      return Object.entries(map).map(([presenter, count]) => ({ presenter, count }));
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.currentUser = user;
    },
    SET_EVENTS(state, events) {
      state.events = events;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    ADD_EVENT(state, event) {
      state.events.push(event);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.events));
    },
    UPDATE_EVENT(state, updatedEvent) {
      const index = state.events.findIndex((event) => event.id === updatedEvent.id);
      if (index !== -1) {
        state.events.splice(index, 1, updatedEvent);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.events));
    },
    DELETE_EVENT(state, eventId) {
      state.events = state.events.filter((event) => event.id !== eventId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.events));
    },
    ADD_REMINDER(state, payload) {
      state.reminders.unshift(payload);
      state.reminders = state.reminders.slice(0, 20);
    }
  },
  actions: {
    login({ commit, state }, credentials) {
      const user = state.users.find(
        (item) => item.username === credentials.username && item.password === credentials.password
      );
      if (!user) {
        throw new Error('Invalid username or password');
      }
      commit('SET_USER', user);
      return user;
    },
    logout({ commit }) {
      commit('SET_USER', null);
    },
    async loadEvents({ commit }) {
      commit('SET_LOADING', true);
      try {
        const localData = localStorage.getItem(STORAGE_KEY);
        if (localData) {
          commit('SET_EVENTS', JSON.parse(localData));
          return;
        }

        const [m1, m2] = await Promise.all([
          axios.get('/db/events-2026-01.json'),
          axios.get('/db/events-2026-02.json')
        ]);
        const events = [...m1.data, ...m2.data];
        commit('SET_EVENTS', events);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    createEvent({ commit }, event) {
      const newEvent = { ...event, id: Date.now().toString() };
      commit('ADD_EVENT', newEvent);
    },
    saveEvent({ commit }, event) {
      commit('UPDATE_EVENT', event);
    },
    removeEvent({ commit }, id) {
      commit('DELETE_EVENT', id);
    },
    sendReminder({ commit, state }, eventId) {
      const target = state.events.find((event) => event.id === eventId);
      if (!target) return;
      commit('ADD_REMINDER', {
        id: Date.now().toString(),
        message: `Reminder + email sent for ${target.topic} (${target.date})`,
        at: new Date().toLocaleString()
      });
    }
  }
});

export default store;
