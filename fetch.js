const cheerio = require("cheerio");
const axios = require('axios');
const data = require('./utils/data')
const random = require('./utils/random')
let slok_num = 1
let chapter = 1;
const fetch1 = async () => {
    chapter = random(1,18);
    const url = `https://www.holy-bhagavad-gita.org/chapter/${chapter}/verse/`
    const axiosResponse = await axios.request({
        method: "GET",
        url: url+slok_num,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        }   
    })
    const $ = cheerio.load(axiosResponse.data);
    const num_slok = $('.verseSmall').length;
    slok_num = random(1,num_slok);
    slok_num==0?slok_num=1:slok_num;
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
    const $ = cheerio.load(axiosResponse.data);
    const slok = $('#originalVerse').html();
    const meaning = $('#commentary').text();
    const title = $('.chapterTitle').text().split('.')[1];
    data.chapterNo = chapter,
    data.chapterName = title?title.trim():'title',
    data.slokNo = slok_num,
    data.slok = slok?slok.trim():'sloka',
    data.commentry = meaning?meaning.trim():'commentry'
}

module.exports = fetch1