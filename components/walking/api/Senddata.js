import { getDatabaseFile} from "../../../components/walking/SQLite";

export const sendDatabaseFile = async (TableName) => {
    try {
      const dbFile = await getDatabaseFile();
      const response = await fetch('http://192.168.0.9:4000/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          fileName: "sensor_data.db",
          fileData: dbFile, 
          tableName: TableName
        }),
      });
      const result = await response.text();
      console.log('Server response:', result);
      return result;
    } catch (error) {
      console.error('Error uploading the file:', error);
      throw error;
    }
  };