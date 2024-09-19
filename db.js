import pkg from 'pg';
const {Client} = pkg;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Sangee@2001',
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database', err));

  export default client;