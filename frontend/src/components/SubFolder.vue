<template>
  <li v-if="!folder.is_file">
    <div class="folder-header" @click="toggleSubfolder(folder)">
      <span :class="{'caret': true, 'caret-down': isSubfolderOpen(folder.id)}">▶</span>
      <span class="icon-folder">📁</span>
      {{ folder.name }}
    </div>
    <ul v-show="isSubfolderOpen(folder.id)" class="nested">
      <SubFolder
        v-for="subfolder in folder.subfolders"
        :key="subfolder.id"
        :folder="subfolder"
      />
    </ul>
  </li>
</template>

<script setup>
import { ref } from 'vue';
import { useFolderStore } from '../stores/folderStore';

const folderStore = useFolderStore();
const openSubfolders = ref([]);

defineProps({
  folder: {
    type: Object,
    required: true,
  },
});

const isSubfolderOpen = (folderId) => openSubfolders.value.includes(folderId);

const toggleSubfolder = async (folder) => {
  if (openSubfolders.value.includes(folder.id)) {
    openSubfolders.value = openSubfolders.value.filter((id) => id !== folder.id);
  } else {
    openSubfolders.value.push(folder.id);

    if (!folder.subfolders || folder.subfolders.length === 0) {
      try {
        await folderStore.loadSubfolders(folder); // Memuat subfolder ke dalam store
      } catch (error) {
        console.error(`Error loading subfolders for folder ${folder.id}:`, error);
      }
    }
  }

  folderStore.selectFolder(folder);
};
</script>

<style scoped>
.folder-header {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.caret {
  margin-right: 5px;
  transform: rotate(0deg);
  transition: transform 0.2s ease;
}

.caret-down {
  transform: rotate(90deg);
}
</style>
