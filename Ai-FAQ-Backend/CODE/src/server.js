require('dotenv').config();

const dns = require('dns');

dns.setServers([
  '8.8.8.8',
  '8.8.4.4'
]);

const app = require('./app');

const connectDB = async () => {
  try {
    const dbConnect = require('./config/db');
    await dbConnect();
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
  }
};

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;

  const server = app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
    );
  });

  process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);

    server.close(() => {
      process.exit(1);
    });
  });
};

startServer();