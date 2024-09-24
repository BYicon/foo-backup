// 在页面控制台输入
const style = document.createElement('style');
style.innerHTML = `
    html,body {
        filter: grayscale(1);
    }
    .pop-text,.TC_pop_masker,.con-1 {
        display: none !important;
    }
`;
document.head.appendChild(style);



// 抽奖

const goMirror = function(index) {let timer = setInterval(() => { document.querySelector(`.con-2 .machine-${index} .btn-ten`).click() }, 200);};goMirror(2);

let timer = setInterval(() => { document.querySelector(`.con-2 .machine-${index} .btn-ten`).click() }, 200);