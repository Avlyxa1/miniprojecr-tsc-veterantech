## Dibuat Oleh:
- Bagas Bani Aryasatya (2410501055)

# Sistem Manajemen Kontak

Aplikasi CLI sederhana untuk mengelola data kontak dengan fitur CRUD (Create, Read, Update, Delete) yang berjalan melalui terminal. Data disimpan dalam array of objects dan dapat disimpan ke file JSON.

## Cara Menjalankan Program

Pastikan Node.js sudah terinstal, lalu jalankan perintah berikut di terminal:

```bash
node main.js
```

## Format Data

Data kontak disimpan dalam bentuk array of objects. Setiap objek memiliki key-value sebagai berikut:

- `id` — ID unik kontak (contoh: "CTC-BUD123")
- `name` — Nama lengkap kontak
- `phone` — Nomor telepon
- `email` — Alamat email
- `address` — Alamat domisili
- `category` — Kategori kontak (Teman, Keluarga, Kerja)

Contoh data:

```json
{
  "id": "CTC-BUD123",
  "name": "Budi Santoso",
  "phone": "081234567890",
  "email": "budi.santoso@email.com",
  "address": "Jl. Merdeka No. 10, Jakarta",
  "category": "Teman"
}
```

## Penjelasan Function CRUD

- **Create** (`addContact`): Menambahkan kontak baru ke array setelah divalidasi (nama, telepon, email wajib diisi dan format email benar). ID dihasilkan otomatis jika kosong. Data disimpan ke `contacts.json`.
- **Read** (`getAllContacts`, `getContactById`): Menampilkan semua kontak dalam tabel, atau mencari satu kontak berdasarkan ID.
- **Update** (`updateContact`): Mengubah data kontak yang sudah ada berdasarkan ID (email dan kategori dapat diperbarui). Menggunakan spread operator untuk menggabungkan data lama dan baru.
- **Delete** (`deleteContact`): Menghapus kontak dari array berdasarkan ID. Data terbaru disimpan ke `contacts.json`.

Fitur tambahan: filter kontak berdasarkan kategori dan pencarian kontak berdasarkan nama.

# Mentor
- Nadia Jasmine Aulia

Trial Study Club Backend Basic
