import fs from "fs";
import { contacts } from "./data.js";

// Buat ID kontak otomatis
const generateContactId = (name) => {
  const prefix = name.split(" ")[0].substring(0, 2).toUpperCase();
  const randomNum = Math.floor(Math.random() * 900 + 100);
  return `CTC-${prefix}${randomNum}`;
};

// Simpan data ke file JSON
export const saveContactsToFile = () => {
  fs.writeFileSync("contacts.json", JSON.stringify(contacts, null, 2));
  console.log("Data kontak berhasil disimpan ke contacts.json");
};

// Muat data dari file JSON
export const loadContactsFromFile = () => {
  if (fs.existsSync("contacts.json")) {
    const data = fs.readFileSync("contacts.json");
    const loaded = JSON.parse(data);
    contacts.splice(0, contacts.length, ...loaded);
    console.log("Data kontak berhasil dimuat dari file.");
  } else {
    console.log("Belum ada file data yang tersimpan.");
  }
};

// Tambah kontak baru
export const addContact = (newContact) => {
  // Validasi data wajib diisi
  if (!newContact.name || !newContact.phone || !newContact.email) {
    console.log("Nama, nomor telepon, dan email wajib diisi!");
    return;
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newContact.email)) {
    console.log("Format email tidak valid!");
    return;
  }

  // Buat ID otomatis jika kosong
  if (!newContact.id) {
    newContact.id = generateContactId(newContact.name);
  }

  // Cek ID duplikat
  const exists = contacts.find((c) => c.id === newContact.id);
  if (exists) {
    console.log(`ID kontak ${newContact.id} sudah ada!`);
    return;
  }

  contacts.push(newContact);
  saveContactsToFile();
  console.log(`Kontak ${newContact.name} berhasil ditambahkan.`);
};

// Lihat semua kontak
export const getAllContacts = () => {
  console.log("Daftar Semua Kontak:");
  console.table(contacts);
  return contacts;
};

// Lihat kontak berdasarkan ID
export const getContactById = (id) => {
  const contact = contacts.find((c) => c.id === id);
  if (!contact) {
    console.log(`Kontak dengan ID ${id} tidak ditemukan.`);
    return null;
  }
  console.table([contact]);
  return contact;
};

// Ubah data kontak
export const updateContact = (id, updatedData) => {
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) {
    console.log(`Tidak ada kontak dengan ID ${id}.`);
    return;
  }

  if (updatedData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedData.email)) {
    console.log("Format email tidak valid!");
    return;
  }

  contacts[index] = { ...contacts[index], ...updatedData };
  saveContactsToFile();
  console.log(`Data kontak ${id} berhasil diperbarui.`);
};

// Hapus kontak
export const deleteContact = (id) => {
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) {
    console.log(`Tidak ada kontak dengan ID ${id}.`);
    return;
  }
  const { name: deletedName } = contacts[index];
  contacts.splice(index, 1);
  saveContactsToFile();
  console.log(`Kontak ${deletedName} (${id}) berhasil dihapus.`);
};

// Filter kontak berdasarkan kategori
export const filterByCategory = (categoryName) => {
  const filtered = contacts.filter(
    (c) => c.category.toLowerCase() === categoryName.toLowerCase()
  );
  console.log(`Daftar kontak kategori ${categoryName}:`);
  console.table(filtered);
  return filtered;
};

// Cari kontak berdasarkan nama
export const searchByName = (nameQuery) => {
  const found = contacts.filter((c) =>
    c.name.toLowerCase().includes(nameQuery.toLowerCase())
  );
  console.log(`Hasil pencarian untuk "${nameQuery}":`);
  console.table(found);
  return found;
};