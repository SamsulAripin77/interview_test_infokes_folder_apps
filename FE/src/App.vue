<template>
  <div id="app">
    <div class="container">
    <FolderList />
    <SubFolderPanel />
    </div>
  </div>
</template>

<script setup>
import FolderList from './components/FolderList.vue';
import SubFolderPanel from './components/SubFolderPanel.vue';
</script>

<style>
.container {
  display: flex;
  height: 100vh;
}
</style>
