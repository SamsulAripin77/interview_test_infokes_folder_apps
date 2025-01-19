<template>
  <div class="panel panel-left">
    <h2>Folder List</h2>
    <ul>
      <li v-for="folder in folders" :key="folder.id" >
        <div class="folder-header" @click="toggleFolder(folder)">
          <span :class="{'caret': true, 'caret-down': isFolderOpen(folder.id)}">▶</span>
          <span class="icon-folder">📁</span>
          {{ folder.name }}
        </div>
        <ul v-show="isFolderOpen(folder.id)" class="nested">
          <SubFolder
            v-for="subfolder in folder.subfolders"
            :key="subfolder.id"
            :folder="subfolder"
          />
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useFolderStore } from '../stores/folderStore';
import SubFolder from './SubFolder.vue';

const folderStore = useFolderStore();
const folders = ref([]);
const openFolders = ref([]);

const toggleFolder = async (folder) => {
  if (openFolders.value.includes(folder.id)) {
    openFolders.value = openFolders.value.filter((id) => id !== folder.id);
  } else {
    openFolders.value.push(folder.id);
    folderStore.selectFolder(folder);
    if (!folder.subfolders || folder.subfolders.length === 0) {
      await folderStore.loadSubfolders(folder);
    }
  }
};

const isFolderOpen = (folderId) => openFolders.value.includes(folderId);

onMounted(async () => {
  try {
    await folderStore.loadRootFolders();
    folders.value = folderStore.folders;
  } catch (err) {
    console.error('Error loading root folders:', err);
  }
});
</script>

<style scoped>
.panel {
  border-right: 1px solid #ccc;
  padding: 1rem;
  width: 30%;
  overflow-y: auto;
}

.folder-header {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.icon-folder {
  margin-right: 5px;
}

.caret {
  display: inline-block;
  margin-right: 6px;
  transition: transform 0.3s;
}

.caret-down {
  transform: rotate(90deg);
}

.nested {
  margin-left: 1rem;
  list-style: none;
  padding-left: 1rem;
}
</style>
