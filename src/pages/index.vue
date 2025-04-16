<script setup>
import { useRouter } from 'vue-router';
import { store } from '~/store';

const router = useRouter();

// Redirect to dashboard when accessing the root route '/'
if (store.value.profile) {
    router.push('/dashboard');
} else {
    router.push('/login');
}

</script>

<template>
</template>