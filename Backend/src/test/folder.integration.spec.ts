import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import { Elysia } from 'elysia';
import FolderRoutes from '../routes/folder.routes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = new Elysia();

// Tambahkan rute ke aplikasi
app.group('/api/v1', (api) => api.use(FolderRoutes));
const BASE_URL = 'http://localhost/api/v1/folders';

describe('Folder API Integration Tests', () => {
  let rootFolder1Id: number;
  let rootFolder2Id: number;

  beforeAll(async () => {
    // Hapus semua data terlebih dahulu
    await prisma.folder.deleteMany();

    // Masukkan root folders terlebih dahulu
    await prisma.folder.createMany({
      data: [
        { name: 'Root Folder 1', parentId: null },
        { name: 'Root Folder 2', parentId: null },
      ],
    });

    // Dapatkan ID root folder yang baru dibuat
    const rootFolder1 = await prisma.folder.findFirst({
      where: { name: 'Root Folder 1' },
    });
    const rootFolder2 = await prisma.folder.findFirst({
      where: { name: 'Root Folder 2' },
    });

    rootFolder1Id = rootFolder1?.id || 0;
    rootFolder2Id = rootFolder2?.id || 0;

    // Masukkan sub-folder setelah root folders dibuat
    await prisma.folder.create({
      data: { name: 'Sub Folder 1', parentId: rootFolder1Id },
    });
  });

  afterAll(async () => {
    // Hapus data setelah pengujian selesai
    await prisma.folder.deleteMany();
  });

  it('should fetch root folders', async () => {
    const request = new Request(`${BASE_URL}`, {
      method: 'GET',
    });
    const response = await app.handle(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.length).toBe(2); // Root folders harus ada 2
  });

  it('should fetch folder with children', async () => {
    // Gunakan rootFolder1Id yang didapat dari beforeAll
    const request = new Request(`${BASE_URL}/${rootFolder1Id}`, {
      method: 'GET',
    });
    const response = await app.handle(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('Successfully fetched folder with children');
    expect(data.data.children.length).toBe(1); // Folder dengan ID rootFolder1Id harus memiliki 1 anak
  });

  it('should return error for invalid folder ID', async () => {
    const request = new Request(`${BASE_URL}/999`, {
      method: 'GET',
    });
    const response = await app.handle(request);
    const data = await response.json();

    expect(response.status).toBe(404);  // Error karena folder tidak ditemukan
    expect(data.message).toBe('Folder not found');
  });

  it('should return error for folder not found', async () => {
    const request = new Request(`${BASE_URL}/999`, {
      method: 'GET',
    });
    const response = await app.handle(request);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.message).toBe('Folder not found');
  });
});
