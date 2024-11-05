import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

// Table Generation
export const createTable = async(TableName) => {
    // SQLite Database Connection
    const db = await SQLite.openDatabaseAsync('sensor_data',{ useNewConnection: true });
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "${TableName}" (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_Time TEXT,
        accX REAL,
        accY REAL,
        accZ REAL,
        gyroX REAL,
        gyroY REAL,
        gyroZ REAL,
        rotX REAL,
        rotY REAL,
        rotZ REAL
        );`
    )
}

// Data Insert
export const insertSensorData = async(sensorLog, TableName, batchSize = 1000) => {
    await createTable(TableName);
    const db = await SQLite.openDatabaseAsync('sensor_data', { useNewConnection: true });

    const totalBatches = Math.ceil(sensorLog.current.length / batchSize);

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++){
        const start = batchIndex * batchSize
        const end = Math.min(start + batchSize, sensorLog.current.length)
        const batch = sensorLog.current.slice(start, end)
        await db.withExclusiveTransactionAsync(async (txn) => {
            const insertValues = batch.map(logEntry => `(
                '${logEntry['timestamp']}', 
                ${logEntry["accData"]['x']}, ${logEntry["accData"]['y']}, ${logEntry["accData"]['z']}, 
                ${logEntry["gyroData"]['x']}, ${logEntry["gyroData"]['y']}, ${logEntry["gyroData"]['z']}, 
                ${logEntry["rotationData"]['alpha']}, ${logEntry["rotationData"]['beta']}, ${logEntry["rotationData"]['gamma']}
            )`).join(',');
    
            const insertQuery = `
                INSERT INTO "${TableName}" 
                (event_time, accX, accY, accZ, gyroX, gyroY, gyroZ, rotX, rotY, rotZ)
                VALUES ${insertValues}
            `;
    
            await txn.execAsync(insertQuery);
        });
    }
    
};

// DataBase Data Check
export const allreadDatabase = async(TableName) => {
    const db = await SQLite.openDatabaseAsync('sensor_data',{ useNewConnection: true });
    const allrows = await db.getAllAsync(`SELECT * FROM "${TableName}"`)
    const data = []
    for (const row of allrows) {
        data.push(row)
    }
    return data
}

// Database internal storage check
export const getDatabaseFile = async () => {
    const fileUri = `${FileSystem.documentDirectory}/SQLite/sensor_data`;
    const dbFile = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
    return dbFile;
};

// Database internal storage filelist check
export const Listfiles = async () => {
    const fileList = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}/SQLite`);
    console.log("fileList:", fileList)
    return fileList
}

