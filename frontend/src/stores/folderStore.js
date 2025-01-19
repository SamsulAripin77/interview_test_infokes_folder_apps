import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchRootFolders, fetchSubfolders } from '../api';

export const useFolderStore = defineStore('folderStore', () => {
  const folders = ref([]);
  const selectedFolder = ref(null);

  const loadRootFolders = async () => {
    try {
      const rootFolders = await fetchRootFolders();
      folders.value = rootFolders;
    } catch (error) {
      console.error('Error loading root folders:', error);
      throw error;
    }
  };

  const loadSubfolders = async (folder) => {
    try {
      const subfolders = await fetchSubfolders(folder.id);
      folder.subfolders = subfolders;
    } catch (error) {
      console.error(`Error loading subfolders for folder ${folder.id}:`, error);
      throw error;
    }
  };

  const selectFolder = (folder) => {
    selectedFolder.value = folder;
  };

  return {
    folders,
    selectedFolder,
    loadRootFolders,
    loadSubfolders,
    selectFolder,
  };
});
