import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const imageUrls = [
  "https://images.dog.ceo/breeds/terrier-american/n02093428_10245.jpg",
  "https://images.dog.ceo/breeds/terrier-american/n02093428_10328.jpg",
  "https://images.dog.ceo/breeds/terrier-american/n02093428_10365.jpg",
  "https://images.dog.ceo/breeds/terrier-american/n02093428_10381.jpg",
  "https://images.dog.ceo/breeds/terrier-american/n02093428_10575.jpg",
  "https://images.dog.ceo/breeds/terrier-american/n02093428_1070.jpg",
  "https://images.dog.ceo/breeds/terrier-american/n02093428_10761.jpg",
  "https://images.dog.ceo/breeds/terrier-american/n02093428_10807.jpg",
  "https://images.dog.ceo/breeds/terrier-american/n02093428_10896.jpg",
  "https://images.dog.ceo/breeds/terrier-american/n02093428_10908.jpg",
  "https://images.dog.ceo/breeds/terrier-american/n02093428_8582.jpg",
  "https://images.dog.ceo/breeds/terrier-american/pan-pan.jpg",
  "https://images.dog.ceo/breeds/terrier-american/n02093428_9929.jpg",
  "https://images.dog.ceo/breeds/terrier-american/n02093428_9797.jpg",
  "https://images.dog.ceo/breeds/terrier-american/n02093428_9538.jpg"
];

const getRandomImageUrls = (count: number): string[] => {
  return Array.from({ length: count }, () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  });
};

const addFilesToFolder = async (parentId: number, parentUrl: string | null) => {
  const fileCount = Math.floor(Math.random() * 8) + 3; // Random 3-10 files
  const urls = getRandomImageUrls(fileCount);

  for (const url of urls) {
    await prisma.folder.create({
      data: {
        name: `File-${Math.random().toString(36).substring(7)}.jpg`,
        url,
        parentId,
        is_file: true
      },
    });
  }
};

async function main() {
  await prisma.folder.deleteMany(); // Clear all data before seeding

  const jawaBarat = await prisma.folder.create({
    data: { name: 'Provinsi Jawa Barat', parentId: null, url: null },
  });
  await addFilesToFolder(jawaBarat.id, null);

  const kotaBandung = await prisma.folder.create({
    data: { name: 'Kota Bandung', parentId: jawaBarat.id, url: null },
  });
  await addFilesToFolder(kotaBandung.id, null);

  const kecamatanCoblong = await prisma.folder.create({
    data: { name: 'Kecamatan Coblong', parentId: kotaBandung.id, url: null },
  });
  await addFilesToFolder(kecamatanCoblong.id, null);

  const desaDago = await prisma.folder.create({
    data: { name: 'Desa Dago', parentId: kecamatanCoblong.id, url: null },
  });
  await addFilesToFolder(desaDago.id, null);

  const desaLebakGede = await prisma.folder.create({
    data: { name: 'Desa Lebak Gede', parentId: kecamatanCoblong.id, url: null },
  });
  await addFilesToFolder(desaLebakGede.id, null);

  const kecamatanCicendo = await prisma.folder.create({
    data: { name: 'Kecamatan Cicendo', parentId: kotaBandung.id, url: null },
  });
  await addFilesToFolder(kecamatanCicendo.id, null);

  const desaPajajaran = await prisma.folder.create({
    data: { name: 'Desa Pajajaran', parentId: kecamatanCicendo.id, url: null },
  });
  await addFilesToFolder(desaPajajaran.id, null);

  const kabupatenBogor = await prisma.folder.create({
    data: { name: 'Kabupaten Bogor', parentId: jawaBarat.id, url: null },
  });
  await addFilesToFolder(kabupatenBogor.id, null);

  const kecamatanCibinong = await prisma.folder.create({
    data: { name: 'Kecamatan Cibinong', parentId: kabupatenBogor.id, url: null },
  });
  await addFilesToFolder(kecamatanCibinong.id, null);

  const desaKaradenan = await prisma.folder.create({
    data: { name: 'Desa Karadenan', parentId: kecamatanCibinong.id, url: null },
  });
  await addFilesToFolder(desaKaradenan.id, null);

  const jawaTengah = await prisma.folder.create({
    data: { name: 'Provinsi Jawa Tengah', parentId: null, url: null },
  });
  await addFilesToFolder(jawaTengah.id, null);

  const kotaSemarang = await prisma.folder.create({
    data: { name: 'Kota Semarang', parentId: jawaTengah.id, url: null },
  });
  await addFilesToFolder(kotaSemarang.id, null);

  const kecamatanSemarangTengah = await prisma.folder.create({
    data: { name: 'Kecamatan Semarang Tengah', parentId: kotaSemarang.id, url: null },
  });
  await addFilesToFolder(kecamatanSemarangTengah.id, null);

  const desaGajahmungkur = await prisma.folder.create({
    data: { name: 'Desa Gajahmungkur', parentId: kecamatanSemarangTengah.id, url: null },
  });
  await addFilesToFolder(desaGajahmungkur.id, null);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
