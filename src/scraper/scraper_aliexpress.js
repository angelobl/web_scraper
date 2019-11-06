const puppeteer = require("puppeteer");

const url1 = "https://login.aliexpress.com/?from=sm&return_url=https%3A%2F%2Fes.aliexpress.com%3A443%2F%2Fwholesale%2F_____tmd_____%2Fpunish%3Fx5secdata%3D5e0c8e1365474455070961b803bd560607b52cabf5960afff39b64ce58073f78a189947e9a397fdf240c55d920f623b02aeb9455a7e24af28ac2e97b74ad2a6176cfd69fc6855cfd606bf150111a78ac0480def1935cf7544236ad19f2057552a162a340699158048a0de1331e905e5a49d5db805b9215f9db44920987df88e46378d1fa2c789ad2446d69c1326ed2be09cf44858e85ad48cca79286c5a7bd6553cbc44eb678a97533ab39d4512f9911518363df3084b8222e427500f5867a927cf926208454823246599c933e5598893b327e27af767b2c979c28d443c20fe7a45cd1d5904b1bb4682fc4a7583178c398171b3a2160f2cf84f0987a2b6115f0fbd23888ffe90d57c5f5517984b37bfadc93e71969a440df72b2d6771a63cf7b3aa2d89a5041c02775e6c780c7057afc1efeec2199cac5656669a307252132dcc8a5376d5eeb10e4b18bc286a166d1630ba2afb0aa610bf7ac271d0799152c50f5dc1b251eaade1aec29176afdc3d5586352fd448aaaac44793d3fb51b58cdb2fd989fa8ab3eddebca5f3fdd5f48da09655c83b5351f0001ade5e9b996b934799eb12e619216aa0363ab6d55aabde8515d8185a43bb5378bf676a330869f53d246d7c07b418bd61930fcc7f43085f215eaf5766db64f23594d9e9a301e3b94fe526c16bfe50fd4c8ddc4fdfde186f8d60d72566f1d43c7f53641b337f76dc877%26x5step%3D100"

const url2 =
  "https://es.aliexpress.com/wholesale?catId=0&initiative_id=AS_20191102162952&SearchText=play+station+4";

async function exec() {
  try {
    let browser = await puppeteer.launch({
      ignoreDefaultArgs: ["--disable-extensions"]
    });
    let page = await browser.newPage();
/*
    //await page.setViewport({ width: 1200, height: 720 });
    await page.goto(url1); // wait until page load
    console.log(page);
    //await page.waitForSelector(".fm-text");
    await page.type("#fm-login-id", 'bertello.angelo@gmail.com');
    await page.type("#fm-login-password", 'asdasd12');
    // click and wait for navigation
    await Promise.all([
      page.click(".fm-submit"),
      page.waitForNavigation({ waitUntil: "networkidle0" })
    ]);*/

    await page.goto(url2); 
    //await page.waitForSelector("a.item-title");
    let data = await page.evaluate(() => {
      let titulos = document.querySelectorAll("a.item-title");
      let imagenes = document.querySelectorAll("img.item-img");
      let precios = document.querySelectorAll("span.price-current");
      //console.log(precios);
      array = [];

      for (var i = 0; i < precios.length; i++) {
        array[i] = {
          titulo: titulos[i].getAttribute("title"),
          imagen: imagenes[i].getAttribute("src"),
          precio: precios[i].innerText.trim()
        };
      }
      return array;
    });
    console.log(data);

    await browser.close();

    return data;
  } catch (err) {
    console.log(err);
    //await browser.close();
  }
}

exec();
