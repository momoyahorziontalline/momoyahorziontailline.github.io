// DOM

let hour = document.querySelector("#hour");
let minute = document.querySelector("#minute");
let second = document.querySelector("#second");

function startTime() {
    // 設定時間
    // 用建構子產生 Date 物件
    let time = new Date();
    let hh = time.getHours();
    let mm = time.getMinutes();
    let ss = time.getSeconds();

    // 計算角度，因為圖片出圖的原因(起始位置在15分，所以-90度)和(起始位置在30分，所以+180度)
    let hourdeg = hh * 30 + mm * 0.5 - 90;
    let minutedeg = mm * 6 + ss * 0.1;
    let seconddeg = ss * 6 + 180;

    // 計算時針角度
    // 時針一圈12小時，一圈306度，每小時走幾度? 360度/12小時=30度 => 每小時走30度
    // 每小時走30度，分針一圈60分，那分針走幾度?  30度/60分=0.5度 => 每分鐘走0.5度
    // (起始位置在15分，所以-90度) =>這樣就能從12點開始計算

    // 計算分針角度
    // 分針一圈60分，一圈360度，每分鐘走幾度? 360度/60分=6度 => 每分鐘走6度
    // 每分鐘走6度，秒針一圈60度，那秒針走幾度?  6度/60分=0.1度 => 每秒鐘走0.1度

    // 計算秒針角度
    // 秒針一圈60秒，一圈360度，每秒鐘走幾度? 360度/60秒=6度 =>每秒鐘走6度
    // (起始位置在30分，所以+180度) =>這樣就能從12點開始計算

    // 印出值
    // 使用 object.style.transform = rotate(angle) 語法使指針旋轉
    hour.style.transform = `rotate(${hourdeg}deg)`; //時針
    minute.style.transform = `rotate(${minutedeg}deg)`; //分針
    second.style.transform = `rotate(${seconddeg}deg)`; //秒針

    // 電子時間檢查數字小於10的，補0
    mm = checkTime(mm);
    ss = checkTime(ss);
    document.querySelector(".clock_time").innerHTML = hh + ":" + mm + ":" + ss;
}

// 檢查數字小於10的，補0
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
        return i;  //回傳值
    } else {
        return i;  //回傳值
    }
}

// 執行；變動的感覺，500毫秒在變動
// setTimeout只執行一次，setInterval重複執行。
setInterval(startTime, 500);

// JavaScript 定時器
// setInterval() : 重覆調用一個函式，在每次調用之間具有固定時間延遲；clearInterval()用來清除或防止函數運行。
// set​Timeout() : 設置一個定時器，在定時器到期後執行一個函式；clear​Timeout()用來清除或防止函數運行。



