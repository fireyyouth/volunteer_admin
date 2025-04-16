import { reactive, ref, watch } from 'vue';

export const store = ref(localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')!) : {});

watch(store, (newVal) => {
    localStorage.setItem('store', JSON.stringify(newVal));
}, { deep: true });