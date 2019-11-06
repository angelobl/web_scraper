const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.wong.pe/tecnologia";

const imagenes = [];
const descrip = [];
const precios = [];

const results = []

module.exports = function() {
  return axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      const img = $(".product-item__image-link > img");

      for (var i = 0; i < img.length; i++) {
        imagenes.push(img[i].attribs.src);

      }

      const desc = $(".product-item__name");

      for (var i = 0; i < desc.length; i++) {
        descrip.push(desc[i].attribs.title);

      }
      const pre = $(".product-prices__value--best-price");
      let listaPrecio = pre.text().split("S/", pre.length + 1);
      listaPrecio.splice(0, 1);

      listaPrecio.forEach(e => {
        precios.push(e);
      });
      for (var i = 0; i < desc.length; i++) {
        let result = {
          imagen:imagenes[i],
          descripcion:descrip[i],
          precio:precios[i]
        }
        results.push(result);
      }
      console.log(results)
      //console.log(results)
      return results;
    })
    .catch(console.error);
}


