import { getDatabaseFile} from "../../../components/walking/SQLite";

const API_BASE_URL = 'http://192.168.25.31:4000/sensor-data';

/* [Function] fetch 로직 중복 최적화 함수.*/
async function fetchData(url, data, method = 'POST') {
  try {
      const response = await fetch(`${API_BASE_URL}/${url}`, {
          method,
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
      });
      return await response.json();
  } catch (error) {
      console.error(`Error in fetch operation for ${method} ${url}: `, error);
      throw error;  // Re-throw to handle it in retry logic or to bubble up the error
  }
}

/* [Function] 청크 사이즈로 잘린 데이터를 서버로 전송 함수 */
export const sendChunk = async (chunk, index, totalChunks, clientId) => {
  return await fetchData('data-chunk', { chunk, index, totalChunks, clientId });
};

/* [Function] 서버 센서데이터 해시값과 클라이언트 센서데이터 해시값 비교 함수 */
export const compareHash = async (clientHash, clientId, formatTime) => {
  return await fetchData('compare-hash', { clientHash, clientId, formatTime });
};

/* [Function] 데이터를 조각별로 서버에 전송하고, 누락된 조각을 다시 전송하는 함수 */
export const resendMissingChunks = async (missingChunks, chunks) => {
    try {
      for (let i = 0; i < missingChunks.length; i++) {
        const chunkIndex = missingChunks[i]; // 누락된 조각의 인덱스
        const response = await fetch('http://192.168.25.31:4000/sensor-data/upload-chunk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ chunk: chunks[chunkIndex], index: chunkIndex, totalChunks: chunks.length }),
        });
        const result = await response.json();
        console.log(`Resent chunk ${chunkIndex} status:`, result);
      }
    } catch (error) {
      console.error('Error resending missing chunks:', error);
    }
  };

/* [Function] 클라이언트 DB파일 서버로 전송 후 로컬 저장 함수 */
export const sendDatabaseFile = async (TableName) => {
    try {
      const dbFile = await getDatabaseFile();
      const response = await fetch('http://192.168.25.31:4000/upload', {
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

  
