const axios = require('axios');
const cheerio = require('cheerio');

let baseUrl = 'https://www.alexa.com/topsites/';
let countryUrl = `${baseUrl}countries/`;

/**
 * certainAmount: a function to retrieve certain amount of top website urls.
 * @param {number} num - a number entered by user.
 */
async function certainAmount(num) {
    try {
        const html = await axios.get(baseUrl);
        const $ = await cheerio.load(html.data);
        let data = [];
        $('.listings > .tr').each((i, element) => {
            if (i < num) {
                data.push({
                    number: i + 1,
                    url: $(element).find('a').text()
                })
            }
        })
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

/**
 * topWebsitesByCountry: a function to retrieve top 20 website urls based on requested country.
 * @param {string} country - a string entered by user.
 */
async function topWebsitesByCountry(country) {
    try {
        const html = await axios.get(countryUrl);
        const $ = await cheerio.load(html.data);
        // retrieve all country name and store into the data array 
        let data = [];
        $('.countries > li').each((i, element) => {
            data.push({
                country: $(element).find('a').text(),
                url: $(element).find('a').attr('href').split('/')[1]
            })
        })

        // compare requested country with data array.
        let countryFound = false;
        for (let i = 0; i < data.length; i++) {
            if (country === data[i].country) {
                countryUrl += data[i].url;
                countryFound = true;
            }
        }

        // retrieve top 20 websites only if the requested country has been found.
        if (countryFound) {
            const countryHtml = await axios.get(countryUrl);
            const $byCountry = await cheerio.load(countryHtml.data);
            let top20Websites = [];
            $byCountry('.listings > .tr').each((i, element) => {
                if (i < 20) {
                    top20Websites.push({
                        number: i + 1,
                        url: $byCountry(element).find('a').text()
                    })
                }
            })
            console.log(top20Websites)
        } else {
            throw `Requested country not found, please try another one.`
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    certainAmount,
    topWebsitesByCountry
};