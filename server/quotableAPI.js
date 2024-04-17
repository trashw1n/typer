const axios = require("axios");

getData = async () =>{
    return axios.get(process.env.QUOTESAPI_URI).then(res => res.data.content.split(" "));
}

module.exports = getData;