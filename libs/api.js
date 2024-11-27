import axios from "axios";

let url = 'http://localhost:4334';
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export async function getData(endpoint) {
    try {
        let res = await axios.get(`${url}/${endpoint}`)
        return res.data
    } catch (error) {
        throw error
    }
}
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export async function postData(endpoint, body) {
    try {
        let res = await axios.post(`${url}/${endpoint}`, body);
        return res;
    } catch (error) {
        console.error(error);
        throw error
    }
}
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export async function patchData(endpoint, body) {
    try {
        let res = await axios.patch(`${url}/${endpoint}`, body);
        return res;
    } catch (error) {
        console.error(error);
        throw error
    }
}




