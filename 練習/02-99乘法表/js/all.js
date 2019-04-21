
let wrap = document.querySelector("#wrap");

function calculation() {
    for (let i = 2; i < 10; i++) {
        //創建新 box
        const box = document.createElement('div');
        box.setAttribute('class', 'box')
        //將 box加入wrap
        wrap.appendChild(box);

        //創建新 chart
        const chart = document.createElement('ul');
        chart.setAttribute('class', 'chart');
        //將 chart加入box
        box.appendChild(chart);

        //創建標題
        let title = document.createElement('li');
        // @ts-ignore
        title.textContent = i;
        title.setAttribute('class', 'chart_title');
        //將標題加入 chart
        chart.appendChild(title);

        // 最後相乘
        for (let j = 1; j < 10; j++) {
            let answer = i * j;
            let list = document.createElement("li");
            list.textContent = `${i} × ${j} = ${answer}`;
            chart.appendChild(list);
        }
    };
};

// 執行
calculation();

