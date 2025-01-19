<template>
  <div class="panel panel-right" v-if="selectedFolder">
    <h2>Contents of {{ selectedFolder.name }}</h2>
    <div class="grid-gallery">
      <div
        v-for="item in selectedFolder.subfolders"
        :key="item.id"
        class="grid-item"
      >
        <div v-if="!item.is_file" class="folder">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="icon-folder"
          >
            <path
              d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
            />
          </svg>
          <div class="item-name">{{ item.name }}</div>
        </div>
        <div v-else class="file">
          <img :src="item.url" :alt="item.url" class="file-image" />
          <div class="item-name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="panel panel-right">
    <h2>Select a folder to view its contents</h2>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useFolderStore } from '../stores/folderStore';

const folderStore = useFolderStore();
const { selectedFolder } = storeToRefs(folderStore);
</script>
<style scoped>
.panel {
  padding: 16px;
}

h2 {
  margin-bottom: 16px;
}

.grid-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.grid-item {
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  background: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icon-folder {
  width: 48px;
  height: 48px;
  color: #ffa500;
}

.file-image {
  width: 100%;
  height: auto;
  max-height: 120px;
  object-fit: cover;
  border-radius: 4px;
}

.item-name {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  overflow-wrap: break-word;
}

.folder .item-name {
  color: #0073e6;
}

.file .item-name {
  color: #555;
}
</style>
