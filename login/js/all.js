// 分頁
var btn1 = document.querySelector('#btn1');
var btn2 = document.querySelector('#btn2');
var tab_content1 = document.querySelector('#login');
var tab_content2 = document.querySelector('#register');


btn1.addEventListener('click', function () {
    btn1.setAttribute('class', 'active');
    btn2.classList.remove("active");
    tab_content1.classList.add("show");
    tab_content2.classList.remove("show");

})

btn2.addEventListener('click', function () {
    btn2.setAttribute('class', 'active');
    btn1.classList.remove("active");
    tab_content1.classList.remove("show");
    tab_content2.classList.add("show");

})


// dom註冊
var signup = document.querySelector(".signup");
var login = document.querySelector(".login");

var listup = document.querySelector(".listup");
var listin = document.querySelector(".listin");

var mailup = document.querySelector(".mailup");
var pswup = document.querySelector(".pswup");
var mailin = document.querySelector(".mailin");
var pswin = document.querySelector(".pswin");
var msg01 = document.querySelector('.msg01');
var msg02 = document.querySelector('.msg02');
var msg03 = document.querySelector('.msg03');
var msg04 = document.querySelector('.msg04');


// 事件監聽
signup.addEventListener('click', signupres, false);
login.addEventListener('click', loginres, false);

mailup.addEventListener('blur', checkBlank, false);
pswup.addEventListener('blur', checkBlank, false);
mailin.addEventListener('blur', checkBlank, false);
pswin.addEventListener('blur', checkBlank, false);


// 欄位不可空白
function checkBlank(e) {
    // 針對每一個欄位
    var ary = [
        {
            targ: 'mailup',
            msg: msg01,
        },
        {
            targ: 'pswup',
            msg: msg02,
        },
        {
            targ: 'mailin',
            msg: msg03,
        },
        {
            targ: 'pswin',
            msg: msg04,
        }
    ];
    for (var i = 0; i < ary.length; i++) {
        if (e.target.value == "") {
            if (e.target.className == ary[i].targ) {
                ary[i].msg.textContent = "欄位請勿留白！";
                return;
            }
        } else {
            ary[i].msg.textContent = "";
        }
    }
}


// 註冊up
function signupres(e) {
    // @ts-ignore
    if (mailup.value == "" || pswup.value == "") {
        alert("請確認欄位是否填寫完成喔！");
        return;
    }
    // 記得是欄位裡面的值哦!!!!
    var account = {};
    // @ts-ignore
    account.email = mailup.value;
    // @ts-ignore
    account.password = pswup.value;

    // ajax
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://hexschool-tutorial.herokuapp.com/api/signup', true);
    // 因為是post
    xhr.setRequestHeader("Content-type", "application/json");
    // 物件轉字串
    var str = JSON.stringify(account);
    xhr.send(str);

    // 非同步true
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // 將 responseText 內的值轉為陣列
            var data = JSON.parse(xhr.responseText);

            console.log(data);
            if (data.message == "帳號註冊成功") {
                listup.innerHTML = '<div class="listcolor">帳號註冊成功！！</div>';
                // alert('帳號註冊成功！！');
            } else if (data.message == "Email 格式不正確") {
                listup.innerHTML = '<div class="listcolor">Email 格式不正確！！</div>';
                // alert('Email 格式不正確！！');
            } else if (data.message == "此帳號已被使用") {
                listup.innerHTML = '<div class="listcolor">此帳號已被使用！！</div>';
                // alert('此帳號已被使用！！');
            } else {
                listup.innerHTML = '<div class="listcolor">帳號註冊失敗！！</div>';
                // alert('帳號註冊失敗！！');
            }
        } else {
            alert('獲取不到資料，請暫停使用。')
        }
    }
}




// 登入
function loginres(e) {
    // @ts-ignore
    if (mailin.value == "" || pswin.value == "") {
        alert("請確認欄位是否填寫完成喔！");
        return;
    }
    // 記得是欄位裡面的值哦!!!!
    var account = {};
    // @ts-ignore
    account.email = mailin.value;
    // @ts-ignore
    account.password = pswin.value;

    // ajax
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://hexschool-tutorial.herokuapp.com/api/signup', true);
    // 告訴伺服器 格式為 JSON 格式
    xhr.setRequestHeader("Content-type", "application/json");
    // 將 str 轉為字串
    var str = JSON.stringify(account);
    xhr.send(str);

    // 非同步true
    xhr.onload = function () {

        if (xhr.readyState == 4 && xhr.status == 200) {
            // 將 responseText 內的值轉為陣列
            var data = JSON.parse(xhr.responseText);

            console.log(data);
            if (data.message == "登入成功") {
                listin.innerHTML = '<div class="listcolor">登入成功！！</div>';
                // alert('登入成功！！');
            } else {
                listin.innerHTML = '<div class="listcolor">此帳號不存在或帳號密碼錯誤！！</div>';
                // alert('此帳號不存在或帳號密碼錯誤！！');
            }
        } else {
            alert('獲取不到資料，請暫停使用。')
        }
    }
}

