//dom元素
var heightClass = document.querySelector(".heightClass");
var weightClass = document.querySelector(".weightClass");
var list = document.querySelector(".list");
var data = JSON.parse(localStorage.getItem("mybmi")) || [];
// 圈圈
var youresult = document.querySelector('.you-result');
var yourbtn = document.querySelector(".your-btn");
var btn = document.querySelector(".btnClass");


upres(data);
// @ts-ignore
youresult.style.display = "none";



//設定時間
var d = new Date();
//月份的轉換
var month = new Array(12)
month[0] = "01"
month[1] = "02"
month[2] = "03"
month[3] = "04"
month[4] = "05"
month[5] = "06"
month[6] = "07"
month[7] = "08"
month[8] = "09"
month[9] = "10"
month[10] = "11"
month[11] = "12"
var datares = d.getFullYear() + "-" + month[d.getMonth()] + "-" + d.getDate();



//判斷值不可為空值
heightClass.addEventListener('blur', function (e) {
    // @ts-ignore
    if (e.target.value == "") {
        alert("內容不為空值");
    }
});
weightClass.addEventListener('blur', function (e) {
    // @ts-ignore
    if (e.target.value == "") {
        alert("內容不為空值");
    }
});



//綁定監聽
btn.addEventListener('click', btnres);
list.addEventListener('click', delres);
upres(data);


//若無任何一個值的話
window.onload = a;
function a() {
    if (data == "") {
        list.innerHTML = `<div class="text">` + "無任何紀錄" + `</div>`;
    }
}

//按鈕新增身高、體重
function btnres(e) {
    e.preventDefault();
    // @ts-ignore
    var height = heightClass.value;
    // @ts-ignore
    var weight = weightClass.value;
    var status = "";
    if (height == "" || weight == "") {
        alert("請輸入值");
        return
    }
    //計算BMI
    var bmi = Math.floor((weight / Math.pow(height, 2) * 10000) * 10) / 10;
    //設定一個物件
    var bmio = {
        BMI: bmi,
        DATE: datares,
        HEIGHT: height,
        WEIGHT: weight,
        status: ""
    };

    // 如果bmi等於區間裡面的值，狀態從空物件轉成有值，用localStorage存入瀏覽器
    // @ts-ignore
    if (heightClass.value.replace(/[<>]/g, "") == "" || weightClass.value.replace(/[<>]/g, "") == "") {
        alert('請輸入身高與體重！');
        return;
    } else {
        if (bmi >= 18.5 && bmi < 24) {
            bmio.status = "理想";
            //把值(物件)加到取值裡
            data.push(bmio);
            upres(data);
            localStorage.setItem("mybmi", JSON.stringify(data));
            alert("已輸入值");

        } else if (bmi < 18.5) {
            bmio.status = "過輕";
            //把值(物件)加到取值裡
            data.push(bmio);
            upres(data);
            localStorage.setItem("mybmi", JSON.stringify(data));
            alert("已輸入值");
        } else if (bmi >= 24 && bmi < 27) {
            bmio.status = "過重";
            //把值(物件)加到取值裡
            data.push(bmio);
            upres(data);
            localStorage.setItem("mybmi", JSON.stringify(data));
            alert("已輸入值");
        } else if (bmi >= 27 && bmi < 30) {
            bmio.status = "輕度肥胖";
            //把值(物件)加到取值裡
            data.push(bmio);
            upres(data);
            localStorage.setItem("mybmi", JSON.stringify(data));
            alert("已輸入值");
        } else if (bmi >= 30 && bmi < 35) {
            bmio.status = "中度肥胖";
            //把值(物件)加到取值裡
            data.push(bmio);
            upres(data);
            localStorage.setItem("mybmi", JSON.stringify(data));
            alert("已輸入值");
        } else if (bmi > 40){
            bmio.status = "重度肥胖";
            //把值(物件)加到取值裡
            data.push(bmio);
            upres(data);
            localStorage.setItem("mybmi", JSON.stringify(data));
            alert("已輸入值");
        } else {
            // 無
        }
    }



    // @ts-ignore
    // 按下去外圈顯示
    youresult.style.display = "block";
    // @ts-ignore
    // 按下去黃色按鈕隱藏
    yourbtn.style.display = "none";
    // @ts-ignore
    // 印出外圈bmi值
    document.querySelector(".bmi-result").textContent = bmi;
    // 印出外圈重新整理，按下去可以重新整理
    document.querySelector(".reflesh").addEventListener('click', reflesh);



    // 外圈顏色設定
    var result = document.querySelector('.result');
    var StatusColor = "";
    if (bmio.status == "理想") {
        StatusColor = "color-Health";
        result.classList.add(StatusColor);
    } else if (bmio.status == "過輕") {
        StatusColor = "color-UnderWeight";
        result.classList.add(StatusColor);
    } else if (bmio.status == "過重") {
        StatusColor = "color-OverWeight";
        result.classList.add(StatusColor);
    } else if (bmio.status == "輕度肥胖") {
        StatusColor = "color-MildObesity";
        result.classList.add(StatusColor);
    } else if (bmio.status == "中度肥胖") {
        StatusColor = "color-ModerateObesity";
        result.classList.add(StatusColor);
    } else if (bmio.status == "重度肥胖") {
        StatusColor = "color-SevereObesity";
        result.classList.add(StatusColor);
    } else {
        alert("錯誤");
    }

    // 取得外圈顏色色碼
    var statuswordcolor = window.getComputedStyle(document.querySelector(".result")).getPropertyValue("border-color");
    // 賦予色碼給狀態文字與刷新按鈕
    // @ts-ignore
    document.querySelector('.reflesh').style.backgroundColor = statuswordcolor;
}

// 按下重新整理
function reflesh(e) {
    e.preventDefault();
    // console.log("12");
    // @ts-ignore
    // 按下去黃色按鈕顯示
    yourbtn.style.display = "block";
    // @ts-ignore
    // 按下去外圈隱藏
    youresult.style.display = "none";
  
    //  重新設置樣式(剔除顏色)，按下重新設置css回到最初
    // 清空輸入框
    // @ts-ignore
    heightClass.value = "";
    // @ts-ignore
    weightClass.value = "";  
    var resulto = document.querySelector("result");
    resulto.setAttribute('class','result');
}

function upres(items) {
    var str = "";
    var bmicolor = "";
    for (var i = 0; i < items.length; i++) {
        var bmi = items[i].BMI;
        var d = items[i].DATE;
        var height = items[i].HEIGHT;
        var weight = items[i].WEIGHT;
        var status = items[i].status;
        // console.log(status);
        if (items[i].status == "理想") {
            bmicolor = "green";
        } else if (items[i].status == "過輕") {
            bmicolor = "blue";
        } else if (items[i].status == "過重") {
            bmicolor = "lightorange";
        } else if (items[i].status == "輕度肥胖") {
            bmicolor = "darkorange";
        } else if (items[i].status == "中度肥胖") {
            bmicolor = "red";
        } else if (items[i].status == "重度肥胖") {
            bmicolor = "red";
        }
        str += '<li class="table-row ' + bmicolor + '"><div class="col col-3" data-label="狀態 (Status)">' + status + '</div><div class="col col-1" id="hiddenClass">BMI</div><div class="col col-4" data-label="BMI">' + bmi + '</div><div class="col col-1" id="hiddenClass" data-label="">height</div><div class="col col-4" data-label="身高 (Height)">' + height + 'cm </div><div class="col col-1" id="hiddenClass">weight</div><div class="col col-4" data-label="體重 (Weight)"> ' + weight + 'kg </div><div class="col col-2" data-label="日期 (Date)"> ' + d + '</div><div class="col col-5" ><div><a class="delClass" id="hiddenClass" href="#" data-index="' + i + '">刪除</a></div></div><div class="btnMobile"><div><a class="delClass" href="#" data-index=" ' + i + ' ">刪除</a></div></div></li>';
    }

    list.innerHTML = str;
}


//刪除資料的方法
function delres(e) {

    e.preventDefault();
    //如果被點擊的不是A連結，則返回

    if (e.target.nodeName !== 'A') {
        return
    }

    //宣告index為data-index的值
    var index = e.target.dataset.index;
    console.log(index);
    data.splice(index, 1);
    window.location.reload();
    upres(data);
    //將BMIdata轉文字儲存進localStorage之中,並設定名稱是BMIdataList
    localStorage.setItem('mybmi', JSON.stringify(data));
};

