// 透過AJAX勞資料
var xhrdata;  //
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);
// 因為非同步，用onload取值
xhr.onload = function () {
    // 字串轉陣列
    var str = JSON.parse(xhr.responseText);
    xhrdata = str.result.records; //result.records用來對應json位置
    // btnaa();
}
// 設定一個空值


// --------------------------------- //

// 呈現的值
var list = document.querySelector(".list");
// 按鈕
var btnArea = document.querySelector(".btnArea");
// 抓下拉選單
var ka = document.querySelector("#ka");
// 頁數
var page = document.querySelector(".page");

// --------------------------------- //

// 下拉選單事件監聽
ka.addEventListener('change', kaselect, false);
// 按鈕事件監聽
btnArea.addEventListener('click', btnaa, false);

// --------------------------------- //

//選擇行政區，下拉選單
function kaselect(e) {
    var title = e.target.value;
    console.log(title);
    abc(title);
    pageContent(1);  // 目前頁數  //*1
}

// --------------------------------------- //
//熱門行政區
function btnaa(e) {
    // 為何加上去
    // console.log(e.target.localName);
    // if(e.target.localName !== "input"){
    //     return;
    // }
    var title = e.target.value;
    // @ts-ignore
    ka.value = title;
    // @ts-ignore
    console.log(ka.value);
    abc(title); 
    pageContent(1);  // 目前頁數  //*1
}

// --------------------------------------- //
// 下拉選單與按鈕相戶對應，找出同一區的景點，text 是選擇的區域名
var selectData;
function abc(text){
    list.innerHTML = "";  //給標題，list清空給空字串
    selectData = [];
    for(var i=0; i<xhrdata.length; i++){
        // console.log(xhrdata.length);
        console.log(text);
        document.querySelector(".title").textContent = text;
        // 符合狀況1
        if(text == xhrdata[i].Zone){
            selectData.push(xhrdata[i]);
        // 符合狀況3
        }else if(text == ""){
            document.querySelector(".title").textContent = "";
        }
    } 
     // 符合狀況2
     if(selectData.length == 0){
        document.querySelector(".noInfo").textContent = "無相關資料";
        // @ts-ignore
     }else{
        document.querySelector(".noInfo").textContent = "";
     }
}

    //  1 - 有標題，有資料數
    //  2 - 有標題，無資料數
    //  3 - 無標題，無資料

// --------------------------------------- //
// 分頁
// nowPage目前所在頁數位置(thisPage)，pageNum每頁資料數上限
var pageNum = 6; //每頁資料數上限
var nowPage = 1; //現在所在頁數
var totalPage; //所有頁數
var totalInfo; //該區所有資料數(筆)


function pageContent(thisPage){   //*2  //*6
    console.log(thisPage);
    totalInfo = selectData.length; //該區所有資料數
    console.log(totalInfo); //剛剛把符合標題的值加到selectData參數裡
    var counPage = totalInfo / pageNum;

    //總共有幾頁
    totalPage = Math.ceil(counPage); //無條件進位
    console.log(totalPage);
   

    //頁數判斷是否要顯示? // 如果頁數超過1頁 顯示頁數/上一頁/下一頁
    if(selectData.length == 0){
        if(totalPage > 1){
            // @ts-ignore
            page.style.display = "block";
        }else{
            // @ts-ignore
            page.style.display = "none";
        }
    }else{
        // @ts-ignore
        page.style.display = "block";
    }
   
    // 頁數分類
    var startInfo; //開始顯示的資料數
    var endInfo;  //結束顯示的資料數
    if(thisPage == totalPage){
        startInfo = (totalPage-1)*pageNum;
        endInfo = totalInfo;
    }else{
        startInfo = (thisPage-1)*pageNum;
        endInfo = thisPage*pageNum;
    }

    //資料印出來
    var str="";
    if (selectData.length == 0 ){   return;  } //針對有標題，無資料.
    for(var i=startInfo; i<endInfo; i++){
        // console.log(selectData[i]);
        str += '<div class="col-6 col-s-12" data-id="'+ i +'"><div class="card"><div class="top"><img width="463px" src="' + selectData[i].Picture1  
        + '"><p class="ka">' + selectData[i].Name 
        + '</p> <p class="ka-section">' + selectData[i].Zone 
        + '</p></div><div class="bottom"><p class="text"><i class="far fa-clock fa-clock-time gray"></i>' + selectData[i].Opentime 
        + '</p><p class="text"><i class="fas fa-map-marker-alt fa-map-gps orange"></i>'+ selectData[i].Add 
        + '</p><div class="p-leftright"><p class="text"><i class="fas fa-mobile-alt fa-mobile ligtblue"></i>'+ selectData[i].Tel 
        + '</p> <p class="text"><i class="fas fa-tags text-warning orange"></i>'+ selectData[i].Ticketinfo 
        + '</p></div></div></div></div>';
        
    }
    list.innerHTML = str;

    nowPage = thisPage; //thisPage=1 //本身頁數等於目前頁數
    pageCount(totalPage,thisPage); //顯示頁數，函式執行 //*3 //*7 
}

// --------------------------------------- //
// 顯示頁數
function pageCount(totalPage,thisPage){ //兩頁 //*4 //*8
    console.log(thisPage);
    var str = "";
    for(var i=0 ;i<totalPage ;i++){
        //數字
       
        str += '<button class="pageColor" data-num="' + (i+1) +'">'+ (i+1) +'</button>'; 
        
        
    }
    //prev和next + 數字
    page.innerHTML = '<button data-add="-1">< prev</button>'+ str +'<button data-add="1">next ></button>'
    document.querySelectorAll(".pageColor")[0].classList.add("active");  //設定一個屬性名稱，撈到他的值全部塗上顏色
    // 零是什麼意思?是全部頁數的第一筆
   
}




// --------------------------------------- //
// 頁數按鈕監聽 
page.addEventListener('click',pageClick,false);

// nowPage=1
function pageClick(e){
    // 設定一個參數
    // 把值轉成數字，pageAdd是prev和next的data-add
    var pageAdd = parseInt(e.target.dataset.add); //dataset.add是1或是-1
    var thisPage;
    if(pageAdd == 1||pageAdd == -1){
        if(pageAdd == -1){
            // nowPage目前頁數
            if(nowPage + pageAdd < 1){
                return; //第一頁往上一頁不做任何執行
            }
            thisPage = nowPage-1;  //第二頁往上一頁，目前頁數減掉(2-1)往上一頁
        }else if(pageAdd == 1){
            if(nowPage + pageAdd > totalPage){
                return;  //totalPage=2，第二頁往下一頁，只有兩頁而已，不執行
            }
            thisPage = nowPage +1;  //第一頁往下一頁，目前頁數(1+1)往下一頁
        }
    }else{
        // 若不是按下prev和next的話，就是按下數字
        thisPage = parseInt(e.target.dataset.num); //num頁數
        // @ts-ignore
        
    }
    pageContent(thisPage); //抓頁數  //第二次按下按鈕*5
    console.log(thisPage);
   
    // 判斷是否為本身頁數
    // 撈出全部頁數，頁數都不要塗顏色移除
    // 在判斷全部頁數是否符合本身頁數，若有就塗上顏色
    for(var j=0 ;j<totalPage ;j++){ 
        document.querySelectorAll(".pageColor")[j].classList.remove("active");
         // @ts-ignore
        if(thisPage == document.querySelectorAll(".pageColor")[j].textContent){
            document.querySelectorAll(".pageColor")[j].classList.add("active");
        }
    }
    
   
}



// --------------------------------------- //
// 回上方
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        // @ts-ignore
        document.querySelector(".gototop").style.display = "block";
    } else {
        // @ts-ignore
        document.querySelector(".gototop").style.display = "none";
    }
}

var gototop = document.querySelector(".gototop");
gototop.addEventListener('click', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});


