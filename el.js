const axios = require("axios");
const cheerio = require("cheerio");


const reset = "\x1b[0m";
const purple = "\x1b[35m";
const color_2 = "\x1b[36m";
const white = "\x1b[37m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";

const getData = () => {
  // 要抓取的网页 URL
  const url = "https://evt08.example.com/csol/2451831/home/index.php?from=pc"; // 替换为你要抓取的目标网站

  // 使用 axios 发送 HTTP GET 请求
  axios
    .get(url)
    .then((response) => {
    //   console.log(response.data);
      // 加载 HTML 内容
      const $ = cheerio.load(response.data);

      // 使用 cheerio 选择器选择元素
      // 例如，选择 <h1> 标签中的文字内容
      const li_1 = $(".con-2 #promo1 ul li").first();
      const NoText= li_1.find('.title').text();
      const SCount = li_1.find('.s_color').text();
      const ACount = li_1.find('.a_color').text();
      const BCount = li_1.find('.pool-list').last().find('.pool-item').eq(0).text();
      const CCount = li_1.find('.pool-list').last().find('.pool-item').eq(1).text();
      const DCount = li_1.find('.pool-list').last().find('.pool-item').eq(2).text();
      const ECount = li_1.find('.pool-list').last().find('.pool-item').eq(3).text();
      const FCount = li_1.find('.pool-list').last().find('.pool-item').last().text();

      const machine_1 = li_1.find('.machine-1 p').text();
      const machine_2 = li_1.find('.machine-2 p').text();
      const machine_3 = li_1.find('.machine-3 p').text();
      const machine_4 = li_1.find('.machine-4 p').text();
      const machine_5 = li_1.find('.machine-5 p').text();

      const total = +SCount + +ACount + +BCount + +CCount + +DCount + +ECount + +FCount;
            
      // 输出元素的文字内容
      console.log(`${NoText}: S:${purple} ${SCount}${reset}-- A:${red}${ACount}${reset} -- B:${BCount} -- C:${CCount} -- D:${DCount} -- E:${ECount} -- F:${yellow}${FCount}${reset} -- 总共:${total}`);
      let machineIndex = null;
      if (+ACount <= 3) {
        const flag1 = machine_1.includes('还在噢');
        if(flag1) {
            machineIndex = 1;
            console.log(`${red}大奖在${green} ${machineIndex}${reset} 号`);
        }
        const flag2 = machine_2.includes('还在噢');
        if(flag2) {
            machineIndex = 2;
            console.log(`${red}大奖在${green} ${machineIndex}${reset} 号`);
        }
        const flag3 = machine_3.includes('还在噢');
        if(flag3) {
            machineIndex = 3;
            console.log(`${red}大奖在${green} ${machineIndex}${reset} 号`);
        }
        const flag4 = machine_4.includes('还在噢');
        if(flag4) {
            machineIndex = 4;
            console.log(`${red}大奖在${green} ${machineIndex}${reset} 号`);
        }
        const flag5 = machine_5.includes('还在噢');
        if(flag5) {
            machineIndex = 5;
            console.log(`${red}大奖在${green} ${machineIndex}${reset} 号`);
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching the URL:", error);
    });
};
let count = 1;
setInterval(() => {
    console.log(`------- 第${color_2}${count++}${reset}次请求-------`)

    // 328号柜剩余奖励: S: 2-- A:0 -- B:6 -- C:32 -- D:87 -- E:87 -- F:144
    // 328号柜剩余奖励: S: 1-- A:0 -- B:5 -- C:24 -- D:78 -- E:73 -- F:129

    getData()
}, Math.random() *  10000);

getData();



