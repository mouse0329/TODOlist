var list =[];
var listc=[];
var a;
var bb;
var ac;
var am;
window.onload= () =>{
load();
drawing();
}
function sanitize(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\//g, "&#x2F;");
}
function seve(){
    compression();
    am=""
    for (let i = 0; i < listc.length; i++) {
        if(listc[i]){am=am+"t"}else{am=am+"f"}
    }
    console.log("seve:"+am);
    Cookies.set("listc",am);
}
function load(){
   Thawing();
    am=Cookies.get("listc");
    console.log("listc:"+am)
    for (let i = 0; i < am.length; i++){
        console.log(am.charAt(i));
        if(am.charAt(i) === "t"){
            listc.push(true);
        }else{
            listc.push(false);
        }
    }
    console.log("l:"+listc);
}
function reset(){
    list=[];
    a=null;
    listc=[];
    ac="";
}
function drawing(){
    bb="";
    for (let i = 0; i < list.length; i++) {
        bb=bb+`<div class="content" id="${i}">
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