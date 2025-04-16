<template>
  <BaseHeader />
  <div class="main-container flex">
  <BaseSide />
  <div w="full" py="4">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  </div>
</template>

<style scoped>
.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 4px);
}

</style>
