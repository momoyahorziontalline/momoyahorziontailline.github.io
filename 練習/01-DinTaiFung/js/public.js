
/*驗證表單*/
function CKFormat(formName,data){
    var typ="",fName="",fTitle="",msg="",val="";
    for(i=0;i<data.length;i++){        
        typ    = data[i][0];
        fTitle = data[i][1];
        fName  = data[i][2];
        val    = $("#"+ formName+" #"+fName).val();
        
        if(typ == "isMail"){
            var checkRep="N";
            if(data[i][3]=="Y") checkRep="Y";
            msg += isMail(val,fTitle,checkRep);
        }
        if(typ == "orMoreMail"){
            var emailsarr=val.split(",");
            var rtnMsg="";
            for(var i=0;i<emailsarr.length;i++){
                rtnMsg=orMail(emailsarr[i],fTitle);
                if (rtnMsg!=""){
                    msg +="第 " + (i+1) + " 個"+rtnMsg+"\n";
                }
            }            
        }  
        if(typ == "orMail"){
            msg += orMail(val,fTitle);
        }
        if(typ == "isPw"){
            msg += isPw(val,fTitle);
        }
        if(typ == "orPw"){
            msg += orPw(val,fTitle);
        }
        if(typ == "ckPw"){
            var val2=$("#"+ formName+" #"+data[i][3]).val();
            msg += ckPw(val,val2);
        }
        if(typ == "isStr"){
            msg += isStr(val,fTitle);
        }
        if(typ == "isStr0"){
            msg += isStr0(val,fTitle);
        }
        if(typ == "isAgree"){
            val=$("#"+ formName+' input[name='+fName+']:checked').val();
            msg += isAgree(val);
        }
        if(typ == "isckbox"){
            
            val=$("#"+ formName+' input[name^='+fName+']:checked').val();
            
            msg += isStr(val,fTitle);
        }
        if(msg){
            alert(msg);
            $("#"+ formName+" #"+fName).focus();
            $("#"+ formName+" #"+fName).select();
            return false;
        }
    }
    return true;
}

/*資料檢查*/
function isMail(val,title,ckRep){
    if (val=="")return sysMsg.fillin+title;
    var msg=orMail(val,title,ckRep);    
    return msg;
}
function orMail(val,title,ckRep){
    if (val=="" || typeof(val)=="undefined") { return ""; }
    var Reg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if(!Reg.test(val)) return title+sysMsg.erFormat;
    if(ckRep=="Y"){
        /*code:確認是否重覆帳號*/
    } 
    return "";
}
function isPw(val,title){
    if (val=="") {return sysMsg.fillin+title;}
    orPw(val,title);   
    return "";
}
function orPw(val,title){
    if (val=="" || typeof(val)=="undefined") {return "";}
    var Reg=/^(?=.{8,15})(?=(.*\d){1,})(?=.*[A-Za-z]{1,})(?!.*[^0-9a-zA-Z]).*$/;
    if(!Reg.test(val)){ return title+"請輸入8～15位數，需同時包含英文和數字。"; }
    return "";
}
function ckPw(val,val2){
    if (val!=val2) {return "確認密碼與密碼不同";}
    return "";   
}
function isStr(val,title){
    if(val=="" || typeof(val)=="undefined") return sysMsg.fillin+title;
    return "";   
}
function isStr0(val,title){
    if(val==0 || val=="" || typeof(val)=="undefined") return sysMsg.fillin+title;
    return "";   
}
function isAgree(val){
    if(val!="Y") return "請詳細閱讀，並同意會員約定內容。"; 
    return "";
}
function isNum(val){
    var Reg = /^\d+$/;
    return re.test(val);
    return "";
}
function isPhone(val,title){
    var str;
    var fDatastr="";
    if (val=="") {return sysMsg.fillin+title;}
    if (val==null || val=="") return true
    for (var i=0;i<val.length;i++){
        str=val.substring(i,i+1);
        if (str!="(" && str!=")" && str!="（" && str!="）" && str!="+" && str!="-" && str!="#" && str!=" ")
           fDatastr=fDatastr+str;
    }
    if (isNaN(fDatastr))return "[TEL]"+sysMsg.erFormat;
    return "";    
}
function isDate(val){
    try{
        var dd = new Date(Date.parse(val.replace("-", "/")));
        return true;
    }catch(ee){return false;}
}


var mainPath="";
function GetSubCate(serial,actype){
    var data="";
    $.ajax({
        url: mainPath+"ajxprocess.php",
        type: 'POST',
        async : false,
        data: { "actype" : actype , "id" : serial },
        dataType: 'json',
        error:function(){ alert("js error"); },
        success: function(response){
            if(response.suc){       
                var tmp = response.msg.split("||");
                m = tmp.length;
                for(var i=0;i<m;i++){
                    if(tmp[i]){
                        var txt =tmp[i].split(",");
                        data +="<option value=\""+txt[0]+"\">"+txt[1]+"</option>";
                    }
                }
                return data;
            }else{
                alert(sysMsg.error);
            }   
        }
    });
    return data;
} 

/*縣市*/
$(document).ready(function(){
    //區域
    $(".act-city-select").change(function(){
        var serial=$(this).val();
        var data="";
        data=GetSubCate(serial,"GetSubCate");
        var obj=$(this).parent().parent().find(".act-zone-select");
        obj.find('option').remove();
        obj.append("<option value=''>請選擇區域</option>"+data);
    });
    $(".act-storezone").change(function(){
        var serial=$(this).val();
        var data="";
        data=GetSubCate(serial,"getStore");
        var obj=$(this).parent().parent().parent().find(".act-storelist");
        obj.find('option').remove();
        obj.append("<option value=''>請選擇區域</option>"+data);
    });
    $(".btn_clean").click(function(){
        $("#eForm1")[0].reset();
    });  
    $(".act-addep").click(function(){
        ordcanEP("order");
    });
    $(".act-cancelep").click(function(){
         ordcanEP("cancel");
    });

});
function ordcanEP(typ){
    var email=$("#ordermail").val();
    $.ajax({
        type : "POST",
        dataType : "json",
        url:"ajxprocess.php",
        data: { actype : "epaper", mail : email , act :typ },
        success : function(data){
            alert(data.message);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr);
        }
    });
}
