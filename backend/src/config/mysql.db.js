const { CONFIG } = require("./index");
const mySqlPromise = require("mysql2/promise");

let pool;

try {
  const dbUrl = CONFIG.DATABASE_URL;
  if (!dbUrl) {
    console.error("⚠️ WARNING: DATABASE_URL is not set. Database operations will fail.");
  } else {
    // If URL contains query params already or is internal railway url, handle properly
    const separator = dbUrl.includes("?") ? "&" : "?";
    const sslParam = (dbUrl.includes("localhost") || dbUrl.includes("127.0.0.1") || dbUrl.includes("railway.internal"))
      ? ""
      : `${separator}ssl={"rejectUnauthorized":false}`;

    const connectionString = `${dbUrl}${sslParam}&multipleStatements=true&dateStrings=false&waitForConnections=true&connectionLimit=50&enableKeepAlive=true&keepAliveInitialDelay=10000`;
    pool = mySqlPromise.createPool(connectionString);
    console.log("✅ DB Pool Created successfully.");
  }
} catch (err) {
  console.error("❌ Error initializing DB Pool:", err);
}

exports.getMySqlPromiseConnection = async () => {
  if (!pool) {
    if (!CONFIG.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is missing.");
    }
    pool = mySqlPromise.createPool(CONFIG.DATABASE_URL);
  }
  try {
    return await pool.getConnection();
  } catch (error) {
    console.error("Pool Connection Error: =======>");
    console.error(error);
    throw error;
  }
};
