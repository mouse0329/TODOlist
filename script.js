var list =[];
var listc=[];
var a;
window.onload= () =>{
load();
drawing();
}
function sanitize(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\//g, "&#x2F;");
}
function seve(){
    compression();
    a=""
    for (let i = 0; i < listc.length; i++) {
        if(listc[i]){a=a+"t"}else{a=a+"f"}
    }
    console.log("seve:"+a);
    Cookies.set("listc",a);
}
function load(){
   Thawing();
    a=Cookies.get("listc");
    console.log("listc:"+a)
    for (let i = 0; i < a.length; i++){
        console.log(a.charAt(i));
        if(a.charAt(i) === "t"){
            listc.push(true);
        }else{
            listc.push(false);
        }
    }
    console.log("l:"+listc);
}
function reset(){
    list=[];
    listc=[];
}
function drawing(){
     a="";
    for (let i = 0; i < list.length; i++) {
        a=a+`<div class="content" id="${i}">
        ${i+1}
        <p>${list[i]}
        <input type="checkbox" id="check${i}" onclick="check(${i});">
        </p>
        <input type="button" onclick="removeItem(${i});" value="削除" class="s">
        <input type="button" value="編集"onclick="edit(${i});" >
        </div>
        <br>`
    }
    document.getElementById('list').innerHTML= bb;
    for (let i = 0; i < list.length; i++) {
        console.log(listc[i])
        document.getElementById('check'+i).checked=listc[i]
    }
}
function removeItem(la){
    list.splice(la,1);
    drawing();
    seve();
}
function indx(){
    const a =document.getElementById('t').value
    list.push(sanitize(a));
    listc.push(false);
    drawing();
    check();
}
function reset_button(){
    var krasu = window.confirm('リセットしますか？');
    if(krasu){reset();drawing();seve();}
}
function edit(ac){
    document.getElementById(ac).innerHTML=`<input value="${list[ac]}" id="h${ac}" >
    <br><input type="button" onclick="b();" value="キャンセル" class="s">
    <input type="button" value="保存"onclick="Saving_changes(${ac});" >`;
}
function Saving_changes(ok){
    list[ok]=document.getElementById(`h${ok}`).value;
    seve();drawing();
}
function check(c){
    const a =document.getElementById(`c${c}`);
    listc[c]=a.checked
    seve();
}

function Thawing()
{
    let m =Cookies.get("list");
    let n ="";
    list =[];
    for (let i = 0; i < m.length; i++){
        if(m.charAt(i)==="/")
        {
            list.push(n);
            n=""
        }else
        {
            n=n+m.charAt(i)
        }
    }
}
function compression()
{
    Cookies.set("long", list.length);
    let kar="";
    for (let i = 0; i < list.length; i++)
    {
        kar=kar+list[i]+"/"
    }
    Cookies.set("list",kar);
    console.log("compression:"+kar);
}