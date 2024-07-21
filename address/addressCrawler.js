const puppeteer = require("puppeteer");
const fs = require("fs");
const URL = "https://www.stats.gov.cn/sj/tjbz/tjyqhdmhcxhfdm/2023/index.html";

const oversea = [
  { code: "90", name: "香港特别行政区" },
  { code: "12", name: "澳门特别行政区" },
  { code: "81", name: "台湾省" },
  { code: "000000", name: "海外国家" },
];

const resultArray = [];

/**
const node = {
  code: null,
  name: null,
  sub: [],
}
*/

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await enter(page, URL);
  await browser.close();

  // 将海外信息添加到最后
  oversea.forEach((item) => resultArray.push(item));

  // 写文件到本地
  fs.writeFile("address.json", JSON.stringify(resultArray), "utf8", function (err) {
    if (err) {
      return console.error("An error occured while writing JSON Object to File");
    }
    console.log("JSON file has been saved.");
  });
})();

// 主入口
async function enter(page, href) {
  await page.goto(href);
  const provinceList = await page.$$eval(".provincetr a", (list) =>
    list.map((item) => {
      const code = item.href.split("/").pop().split(".")[0];
      const name = item.innerText.trim();
      return { code, name, href: item.href };
    })
  );

  provinceList.forEach((item) => {
    // 添加省份
    resultArray.push({
      code: item.code + "0000",
      name: item.name,
      sub: [],
    });
  });

  for (let i = 0; i < provinceList.length; i++) {
    await enterEachProvince(page, provinceList[i].href, resultArray[i]);
  }
}

// 获取某个省份之内的所有城市信息
async function enterEachProvince(page, href, provinceData) {
  // console.log(provinceData);
  await page.goto(href);

  // 使用 page.$$eval() 来获取所有 .citytr 下的 td 中的 a 标签的文本内容
  const cityList = await page.$$eval(".citytr", (rows) => {
    return rows.map((row) => {
      const cells = row.querySelectorAll("td");

      const href = Array.from(cells)[0].querySelector("a").href;

      const codeAndName = Array.from(cells).map((cell) => {
        const link = cell.querySelector("a");
        return link ? link.textContent.trim() : null;
      });

      return { code: codeAndName[0].substring(0, 6), name: codeAndName[1], href: href };
    });
  });

  cityList.forEach((item) => {
    const ret = {
      code: item.code,
      name: item.name,
      sub: [],
    };
    provinceData.sub.push(ret);
  });

  for (let i = 0; i < cityList.length; i++) {
    if (cityList[i].href) {
      try {
        await enterEachCity(page, cityList[i].href, provinceData.sub[i]);
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error(cityList[i]);
    }
  }
}
// 获取某个城市之内的所有区信息
async function enterEachCity(page, href, cityData) {
  await page.goto(href);
  // 使用 page.$$eval() 来获取所有 .citytr 下的 td 中的 a 标签的文本内容

  let districtList = await page.$$eval(".countytr", (rows) => {
    return rows
      .map((row) => {
        const cells = row.querySelectorAll("td");
        const codeAndName = Array.from(cells).map((cell) => {
          const link = cell.querySelector("a");
          return link ? link.textContent.trim() : null;
        });
        return { code: codeAndName[0], name: codeAndName[1] };
      })
      .filter((item) => !!item.code);
  });

  // 雄安新区、中山市、东莞市、儋州市，没有区，只有镇
  if(districtList.length === 0) {
    districtList = await page.$$eval(".towntr", (rows) => {
      return rows
        .map((row) => {
          const cells = row.querySelectorAll("td");
          const codeAndName = Array.from(cells).map((cell) => {
            const link = cell.querySelector("a");
            return link ? link.textContent.trim() : null;
          });
          return { code: codeAndName[0], name: codeAndName[1] };
        })
    })
  }

  districtList.forEach((item) => {
    cityData.sub.push({
      code: item.code.substring(0, 6),
      name: item.name,
    });
  });
  for (let i = 0; i < cityData.sub.length; i++) {
    console.log(cityData.sub[i]);
  }
}
