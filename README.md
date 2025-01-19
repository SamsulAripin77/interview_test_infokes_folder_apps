# Langkah-langkah Setup
## 1. Kloning Repositori

   - Salin URL repositori: https://github.com/SamsulAripin77/interview_test_infokes_folder_apps.git

   - Buka terminal atau command prompt

   - Jalankan perintah git clone https://github.com/SamsulAripin77/interview_test_infokes_folder_apps.git

   - Masuk ke direktori proyek: **cd interview_test_infokes_folder_apps**

## 2. Konfigurasi Backend
   
  + Sesuaikan Kredensial Database:
    - Buka file .env dan env.test
    - Ubah nilai **DATABASE_URL** sesuai dengan database Anda
  + Instal Dependensi:
    - Buka terminal di dalam direktori backend
    - Jalankan **bun install**
  + Migrasi dan Seeding Data:
    - Jalankan **bun migrate** untuk membuat struktur database
    - Jalankan **bun seed** untuk mengisi data dummy
  + Jalankan Server:
    - Jalankan **bun dev**
    - Buka browser dan akses http://localhost:3000
    - Tes Endpoint **/api/v1/folders** untuk memastikan backend berfungsi

## 3. Konfigurasi Frontend
   - Masuk ke Direktori Frontend: **cd frontend**
   - Instal Dependensi: **bun install**
   - Jalankan Development Server: **bun dev**
   - Akses Aplikasi: Buka browser dan akses http://localhost:5174/
   - Jalankan End-to-End Test: **bun test:e2e:dev**
