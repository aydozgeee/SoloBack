const { Client } = require('pg');

const dbConfig = {
  user: 'ozgeaydin',
  host: 'localhost',
  database: 'ozgeaydin',
  password: 'ozge',
  port: 5432,
};

const client = new Client(dbConfig);

client.connect()
  .then(() => {
    console.log('PostgreSQL veritabanına başarıyla bağlandı');
  })
  .catch((err) => {
    console.error('Bağlantı hatası:', err);
  });


process.on('SIGINT', () => {
  console.log('Uygulama sonlandırılıyor...');

  client.end()
    .then(() => {
      console.log('PostgreSQL veritabanı bağlantısı kapatıldı');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Bağlantı kapatma hatası:', err);
      process.exit(1);
    });
});

module.exports = { db: client };
