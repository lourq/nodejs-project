import mysql from "mysql2";
import { config } from "dotenv";
import { readdir, readFile } from "fs/promises";
import { resolve, join } from "path";

config();

const pathSqlFiles = join(resolve(""), "sql");

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

const getTablesName = async (): Promise<string[]> =>
  (await readdir(pathSqlFiles)).map((e) => e.replace(".sql", ""));

const checkTable = async (tableName: string): Promise<number> => {
  return (
    await pool.query(`
        SELECT count(*)
        FROM information_schema.TABLES
        WHERE (TABLE_NAME = '${tableName}')
        `)
  )[0][0]["count(*)"];
};

const createTable = async (tableName): Promise<void> => {
  const path = join(pathSqlFiles, tableName + ".sql");
  const sql = await readFile(path, "utf8");
  await pool.query(sql);
};

const dropAllTables = async () => {
  const tablesName: string[] = await getTablesName();
  console.log(tablesName);
  for (const tableName of tablesName) {
    dropTable(tableName);
  }
};

const dropTable = (tableName) => {
  pool.query(`DROP TABLE ${tableName}`);
};

// #region export func

export const tablesExists = async (): Promise<void> => {
  const tablesName: string[] = await getTablesName();

  const checkAndCreateTable = async (tableName: string) => {
    if (tablesName.includes(tableName)) {
      const tableExists: number = await checkTable(tableName);
      if (tableExists === 0) {
        await createTable(tableName);
      }
    }
  };

  await checkAndCreateTable("Players");
  await checkAndCreateTable("GameSessions");

  for (const tableName of tablesName) {
    if (!["Players", "GameSessions"].includes(tableName)) {
      await checkAndCreateTable(tableName);
    }
  }
};

// #endregion
