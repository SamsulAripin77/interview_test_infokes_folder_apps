// import Elysia
import { Elysia } from 'elysia';

// import controllers
import { fetchRootFolders, fetchFolderWithChildren } from '../controllers/folder.controller';

const FolderRoutes = new Elysia({ prefix: '/folders' })

  // Route to get all root folders
  .get('/', () => fetchRootFolders())

  // Route to get a folder by ID with its children
  .get('/:id', (ctx) => fetchFolderWithChildren(ctx));

export default FolderRoutes;
