const puppeteer = require('puppeteer');

const url = "https://pe.ebay.com/b/Nintendo-Game-Boy-Color-Video-Game-Consoles/139971/bn_7116333186";


module.exports = async function() {
    try {
        let browser = await puppeteer.launch({ignoreDefaultArgs: ['--disable-extensions']})
        let page = await browser.newPage();

        await page.goto(url);
        await page.waitForSelector('h3.s-item__title')

        let data = await page.evaluate(() => {
            let titulos = document.querySelectorAll('h3.s-item__title')
            let imagenes = document.querySelectorAll('img.s-item__image-img')
            let precios = document.querySelectorAll('span.ITALIC')
            //console.log(precios);
            array = []

            for (var i = 0; i < precios.length; i++) {
                array[i] = {
                    titulo: titulos[i].innerText.trim(),
                    imagen: imagenes[i].getAttribute('src'),
                    precio:precios[i].innerText.trim()
                }
                
            }
            return array;
        })
        console.log(data);

        await browser.close();

        return data;
    } catch (err) {
        console.log(err);
        //await browser.close();
    }
}

