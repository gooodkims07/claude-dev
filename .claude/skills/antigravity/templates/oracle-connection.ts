import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

// Oracle Client 초기화 (Instant Client 경로)
if (process.env.ORACLE_LIB_DIR) {
  oracledb.initOracleClient({ libDir: process.env.ORACLE_LIB_DIR });
}

// Connection Pool
let pool: oracledb.Pool;

export const initializePool = async (): Promise<oracledb.Pool> => {
  pool = await oracledb.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
    poolMin: 2,
    poolMax: 10,
    poolIncrement: 2,
  });
  console.log('Oracle connection pool created');
  return pool;
};

export const getConnection = async (): Promise<oracledb.Connection> => {
  if (!pool) {
    await initializePool();
  }
  return await oracledb.getConnection();
};

export const closePool = async (): Promise<void> => {
  if (pool) {
    await pool.close(0);
    console.log('Oracle connection pool closed');
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await closePool();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closePool();
  process.exit(0);
});
