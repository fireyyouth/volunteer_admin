<template>
  <BaseHeader />
  <div class="main-container flex">
    <div w="full" py="4">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 4px);
}

</style>
