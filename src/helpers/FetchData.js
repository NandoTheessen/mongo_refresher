const axios = require('axios');

async function fetchData(url) {
  try {
    console.log('URL:', url);
    const { data } = await axios.get(url);
    console.log(data);
    return data;
  } catch (e) {
    // console.log(e);
    return e;
  }
}

module.exports = fetchData;
