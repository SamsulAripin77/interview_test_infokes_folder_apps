import { getRootFolders, getFolderWithChildren } from '../services/folder.service';
import { Context } from 'elysia';
import { formatResponse } from '../utils/response';

export const fetchRootFolders = async () => {
    try {
      const folders = await getRootFolders();
      return formatResponse({
        message: 'Successfully fetched root folders',
        data: folders,
      });
    } catch (error) {
      return formatResponse({
        message: 'Failed to fetch root folders',
      });
    }
  };
  
  export const fetchFolderWithChildren = async (ctx: Context) => {
    try {
      const id = parseInt(ctx.params.id, 10);
  
      if (isNaN(id)) {
        // Gunakan ctx.error untuk mengatur status dan pesan
        return ctx.error(400, formatResponse({
          message: 'Invalid folder ID',
        }));
      }
  
      const folder = await getFolderWithChildren(id);
  
      if (!folder) {
        return ctx.error(404, formatResponse({
          message: 'Folder not found',
        }));
      }
  
      return formatResponse({
        message: 'Successfully fetched folder with children',
        data: folder,
      });
    } catch (error) {
        return ctx.error(500, formatResponse({
            message: 'Failed to fetch folder with children',
        }));
    }
  };