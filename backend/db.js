const mongoose = require('mongoose');
const MONGOOSE_URI = process.env.MONGOOSE_URI;

const getConnect = ()=>{
    try {
        mongoose.connect(MONGOOSE_URI);
        console.log('DB connected.')
    } catch (error) {
        console.log(error);
    }
}

module.exports = getConnect