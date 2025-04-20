<script setup>
import { useRouter } from 'vue-router';
import { store } from '~/store';

const router = useRouter();

// Redirect to dashboard when accessing the root route '/'
if (store.value.profile) {
    if (store.value.profile.roles.map(x => x.name).includes('ADMIN')) {
        router.push('/admin');
    } else {
        router.push('/dashboard');
    }
}

</script>

<template>
</template>