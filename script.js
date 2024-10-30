var list =[];
var listc=[];
var listk=[];
var listkt=[];
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
    listk=[];
    listkt=[];
}
function drawing(){
     a="";
    for (let i = 0; i < list.length; i++) {
        a=a+`<div class="content" id="${i}" style="background-color:${listk[i]};color:${listkt[i]};">
        ${i+1}
        <p style="color:${listkt[i]};">${list[i]}
        <input type="checkbox" id="check${i}" onclick="check(${i});">
        </p>
        <input type="button" onclick="removeItem(${i});" value="削除" class="s">
        <input type="button" value="編集"onclick="edit(${i});" >
        </div>
        <br>`
    }
    document.getElementById('list').innerHTML= a;
    for (let i = 0; i < list.length; i++) {
        console.log(listc[i])
        document.getElementById('check'+i).checked=listc[i]
    }
}
function removeItem(la){//9
    list.splice(la,1);
    listc.splice(la,1);
    listk.splice(la,1);
    listkt.splice(la,1);
    drawing();
    seve();
}
function indx(){
    const a =document.getElementById('t').value
    list.push(sanitize(a));
    listc.push(false);
    listk.push("#afafaf");
    listkt.push("#000000");
    seve();
    drawing();
}
function reset_button(){
    var krasu = window.confirm('リセットしますか？');
    if(krasu){reset();drawing();seve();}
}
function edit(ac){
    document.getElementById(ac).innerHTML=`
    ${ac+1}
    <input value="${list[ac]}" id="h${ac}" >
    <input value="${listk[ac]}" id="color${ac}" type="color">
    <input value="${listkt[ac]}" id="color_text${ac}" type="color">
    <br><input type="button" onclick="drawing();" value="キャンセル" class="s">
    <input type="button" value="保存"onclick="Saving_changes(${ac});">`;
}
function Saving_changes(ok){
    list[ok]=sanitize(document.getElementById(`h${ok}`).value);
    listk[ok]=document.getElementById(`color${ok}`).value;
    listkt[ok]=document.getElementById(`color_text${ok}`).value;
    seve();drawing();
}
function check(c){
    listc[c]=document.getElementById(`check${c}`).checked;
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
     m =Cookies.get("listk");
     n ="";
    listk =[];
    for (let i = 0; i < m.length; i++){
        if(m.charAt(i)==="/")
        {
            listk.push(n);
            n=""
        }else
        {
            n=n+m.charAt(i)
        }
    }
    m =Cookies.get("listkt");
    n ="";
   listkt =[];
   for (let i = 0; i < m.length; i++){
       if(m.charAt(i)==="/")
       {
           listkt.push(n);
           n=""
       }else
       {
           n=n+m.charAt(i)
       }
   }
}
function compression()
{
     //Cookies.set("long", list.length);
     let kar="";
     for (let i = 0; i < list.length; i++)
     {
         kar=kar+list[i]+"/"
     }
     Cookies.set("list",kar);
     console.log("compression:"+kar);

     kar="";
     for (let i = 0; i < listk.length; i++)
     {
         kar=kar+listk[i]+"/"
     }
     Cookies.set("listk",kar);
     console.log("compression:"+kar);

     kar="";
     for (let i = 0; i < listkt.length; i++)
     {
         kar=kar+listkt[i]+"/"
     }
     Cookies.set("listkt",kar);
     console.log("compression:"+kar);
}

function setting()
{
    document.getElementById('list').innerHTML=``;
}