const axios = require('axios');

const IMGUR_API_URL = 'https://api.imgur.com/3';


exports.uploadToImgur = async(imageBuffer) =>{
    const base64Image = imageBuffer.toString('base64');
    const response = await axios.post(
        `${IMGUR_API_URL}/image`,
        { image: base64Image, type: 'base64', visibility: 'hidden'},
        {
            headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            },
        }
    );
    return response.data.data;
}

exports.deleteFromImgur = async(deleteHash) =>{
    try {
        await axios.delete(`${IMGUR_API_URL}/image/${deleteHash}`, {
            headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            },
        });
    } catch (err) {
        console.error('Error deleting image from Imgur:', err.message);
    }
}