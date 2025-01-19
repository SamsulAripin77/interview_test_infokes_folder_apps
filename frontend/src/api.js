const API_BASE_URL = 'http://localhost:3000/api/v1/folders';

export const fetchRootFolders = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch folders');
  const responseData = await response.json();
  return responseData.data.map(folder => ({
    ...folder,
    subfolders: [],
  }));
};

export const fetchSubfolders = async (folderId) => {
  const response = await fetch(`${API_BASE_URL}/${folderId}`);
  if (!response.ok) throw new Error('Failed to fetch subfolders');
  const responseData = await response.json();
  return responseData.data.children.map(subfolder => ({
    ...subfolder,
    subfolders: [],
  }));
};
