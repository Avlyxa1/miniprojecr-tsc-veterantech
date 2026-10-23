import readline from "readline";
import {
  addContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  filterByCategory,
  searchByName,
  loadContactsFromFile,
} from "./functions.js";

// Muat data saat program dijalankan
loadContactsFromFile();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Tampilkan menu utama
const showMenu = () => {
  console.log(`
==============================
📇  SISTEM MANAJEMEN KONTAK
==============================
1. Lihat semua kontak
2. Tambah kontak baru
3. Cari kontak berdasarkan ID
4. Ubah data kontak
5. Hapus kontak
6. Filter kontak berdasarkan kategori
7. Cari kontak berdasarkan nama
0. Keluar
==============================
`);
};

// Loop pemilihan menu
const askMenu = () => {
  rl.question("Pilih menu (0-7): ", (choice) => {
    switch (choice) {
      case "1":
        getAllContacts();
        return askMenu();

      case "2":
        rl.question("Masukkan nama lengkap: ", (name) => {
          rl.question("Masukkan nomor telepon: ", (phone) => {
            rl.question("Masukkan email: ", (email) => {
              rl.question("Masukkan alamat: ", (address) => {
                rl.question(
                  "Masukkan kategori (Teman/Keluarga/Kerja): ",
                  (category) => {
                    addContact({
                      name,
                      phone,
                      email,
                      address,
                      category,
                    });
                    askMenu();
                  }
                );
              });
            });
          });
        });
        break;

      case "3":
        rl.question("Masukkan ID kontak: ", (id) => {
          getContactById(id);
          askMenu();
        });
        break;

      case "4":
        rl.question("Masukkan ID kontak yang ingin diubah: ", (id) => {
          rl.question("Masukkan email baru: ", (email) => {
            rl.question("Masukkan kategori baru: ", (category) => {
              updateContact(id, { email, category });
              askMenu();
            });
          });
        });
        break;

      case "5":
        rl.question("Masukkan ID kontak yang ingin dihapus: ", (id) => {
          deleteContact(id);
          askMenu();
        });
        break;

      case "6":
        rl.question("Masukkan nama kategori: ", (category) => {
          filterByCategory(category);
          askMenu();
        });
        break;

      case "7":
        rl.question("Masukkan nama yang dicari: ", (nameQuery) => {
          searchByName(nameQuery);
          askMenu();
        });
        break;

      case "0":
        console.log("Keluar dari sistem. Terima kasih!");
        rl.close();
        break;

      default:
        console.log("Pilihan tidak valid, coba lagi!");
        askMenu();
        break;
    }
  });
};

// Jalankan program
showMenu();
askMenu();