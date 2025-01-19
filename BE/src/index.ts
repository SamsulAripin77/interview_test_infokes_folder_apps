import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import FolderRoutes from './routes/folder.routes';

// Buat instance aplikasi
const app = new Elysia()
  .use(cors({
    origin: '*', // Izinkan semua origin (bisa disesuaikan ke origin tertentu seperti 'http://localhost:3001')
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Izinkan metode HTTP yang diinginkan
  }));

// Tambahkan rute utama
app.get('/', () => 'Hello Elysia!');

// Tambahkan grup rute
app.group('/api/v1', (api) => api.use(FolderRoutes));

// Jalankan server
app.listen(3000);

console.log(`🦊 Elysia is running at http://localhost:3000`);
