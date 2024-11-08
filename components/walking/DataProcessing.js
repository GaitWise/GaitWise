import CryptoJS from "crypto-js";

/* [Function] chunk 사이즈 대로 데이터를 청크 단위로 나누는 함수 */ 
export const chunkData = (data, chunkSize) => {
    const stringData = JSON.stringify(data)
    const chuncks = []
    for (let i = 0; i < stringData.length; i+= chunkSize){
          chuncks.push(stringData.slice(i, i+chunkSize))
    }
    return chuncks
}

/* [Function] Sensorlog 값을 SHA256 해시값으로 변경하는 함수 */
export const generateHash = (data) => {
    const stringData = JSON.stringify(data);
    const hash = CryptoJS.SHA256(stringData).toString(CryptoJS.enc.Hex);
    return hash;
};