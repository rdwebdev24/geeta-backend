const cheerio = require("cheerio");
const axios = require('axios');
const random = require('./utils/random')
const data = require('./utils/data')
let chapter = random(1,18);
let slok_num = 1
let url = `https://www.holy-bhagavad-gita.org/chapter/${chapter}/verse/`

const fetch1 = async () => {
    const axiosResponse = await axios.request({
        method: "GET",
        url: url+slok_num,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        }   
    })
    console.log('fetched...');
    const $ = cheerio.load(axiosResponse.data);
    const num_slok = $('.verseSmall').length;
    slok_num = random(1,num_slok);
    await fetch2(url+slok_num);
}

const fetch2 = async (URL) => {
    const axiosResponse = await axios.request({
        method: "GET",
        url: URL,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        }   
    })
    console.log('fetched2...');
    const $ = cheerio.load(axiosResponse.data);
    const num_slok = $('.verseSmall').length;
    const slok = $('#originalVerse').html().trim();
    const meaning = $('#commentary').text().trim();
    const title = $('.chapterTitle').text().split('.')[1].trim();
    data.chapterNo = chapter,
    data.chapterName = title,
    data.slokNo = slok_num,
    data.slok = slok,
    data.commentry = meaning
}

const promise = new Promise(async (resolve, reject) => {
    try {
        await fetch1()
        resolve()
    } catch (error) {
        reject();
    }
});

module.exports = promise