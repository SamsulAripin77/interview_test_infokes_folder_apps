import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRootFolders = async () => {
    try {
      const folders = await prisma.folder.findMany({
        where: { parentId: null },
      });
      return folders;
    } catch (error) {
      console.error('Error fetching root folders:', error);
      throw new Error('Failed to fetch root folders');
    }
  };
  
  export const getFolderWithChildren = async (id: number) => {
    try {
      const folder = await prisma.folder.findUnique({
        where: { id },
        include: {
          children: true,
        },
      });
      return folder;
    } catch (error) {
      console.error('Error fetching folder with children:', error);
      throw new Error('Failed to fetch folder with children');
    }
  };