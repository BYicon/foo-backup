const axios = require("axios");


const reset = "\x1b[0m";
const purple = "\x1b[35m";
const color_2 = "\x1b[36m";
const white = "\x1b[37m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const blue = "\x1b[34m";
let timer = null;
let draw_cookie = "";

// 抽奖
const drawHandle = (groupIndex, index, type) => {
  console.log("正在抽奖... " + index + "号🚀🚀🚀");
  const url = "https://evt08.example.com/csol/2451831/home/index.php/prize";

  const headers = {
    Accept: "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "zh-CN,zh;q=0.9",
    Connection: "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Cookie: draw_cookie,
    Host: "evt08.example.com",
    Origin: "https://evt08.example.com",
    Referer:
      "https://evt08.example.com/csol/2451831/home/index.php?code=D6UKG7",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua":
      '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
  };
  const formData = `group=${groupIndex}&type=${type}&index=${index}&u=&k=`;
  axios
    .post(url, formData, { headers })
    .then((response) => {
      console.log("中奖情况 " + index + "🟢🟢🟢", response.data);
    })
    .catch((error) => {
      // console.error('Error:', error);
    });
};


// 获取最新数据
const getData = (groupIndex) => {
    const url = "https://evt08.example.com/csol/2451831/home/index.php/prizenum";
    const get_cookie = "";
    const headers = {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "zh-CN,zh;q=0.9",
      // 'X-Forwarded-For': '203.0.113.195',
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Cookie: get_cookie,
      Host: "evt08.example.com",
      Origin: "https://evt08.example.com",
      Referer:
        "https://evt08.example.com/csol/2451831/home/index.php?from=pc",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
      "X-Requested-With": "XMLHttpRequest",
      "sec-ch-ua":
        '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
    };
    const formData = `group=${groupIndex}&u=&k=`;
    axios
      .post(url, formData, { headers })
      .then((response) => {
        const data = response.data?.data?.m;
        const group = response.data?.data?.group;
        if (!data) return;
        const total =
          data.S + data.A + data.B + data.C + data.D + data.E + data.F;
        console.log(`${yellow}${group}${reset}号总数：${green}${total}${reset}，S:${purple} ${data.S}${reset} ,A: ${red}${data.A} ${reset},B: ${data.B},C: ${data.C},D:, ${data.D} ,E: ${data.E}  ,F: ${white}${data.F}${reset}`);
        const TOTAL_FLAG = 100;
        if (data.S === 1 && data.A === 0 && total < TOTAL_FLAG) {
          let type = "2"; // 1 单抽 2 10连
          if (total < 10) {
            type = "1";
          }
          let targetIndex = "";
          if (data[1].includes("还在噢")) {
            targetIndex = 1;
          }
          if (data[2].includes("还在噢")) {
            targetIndex = 2;
          }
          if (data[3].includes("还在噢")) {
            targetIndex = 3;
          }
          if (data[4].includes("还在噢")) {
            targetIndex = 4;
          }
          if (data[5].includes("还在噢")) {
            targetIndex = 5;
          }
  
          const delay = 2000;
          if (targetIndex) {
            clearInterval(timer);
            setInterval(() => {
              drawHandle(groupIndex, targetIndex, type);
              drawHandle(groupIndex, targetIndex, type);
              drawHandle(groupIndex, targetIndex, type);
              drawHandle(groupIndex, targetIndex, type);
              drawHandle(groupIndex, targetIndex, type);
            }, delay);
          }
        }
      })
      .catch((error) => {
        // console.error('Error:', error);
      });
  };


const LOOP_DELAY = 3000;

let timer_count = 0;

// 初始总数： 1200
timer = setInterval(() => {
 
console.log(`${white}第${reset} ${++timer_count} ${white}次请求----------------------------${reset}`);

  draw_cookie = ''; 
  
  getData(293);
  getData(294);


}, LOOP_DELAY);

  // getData(290); // 290号总数： 246，  S: 1 ,A: 0 ,B: 6,C: 19,D:, 57 ,E: 80  ,F: 83
  // getData(288);  // 348，  S: 1 ,A: 0 ,B: 6,C: 32,D:, 85 ,E: 91  ,F: 133


