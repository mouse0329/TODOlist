var list = [];
var listc = [];
var listk = [];
var listkt = [];
var kategoris = [];
var kategori_list = [];
var datetime=[];
var a;
var b;
var log=[];
window.onload = () => {
    if(Cookies.get("list") === "undefined")
    {
        reset();
        seve();
    }
    load();
    drawing();
    setInterval(() => {
        time_drawing();
    }, 1000);
}
function sanitize(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\//g, "&#x2F;");
}

function seve() {
    const seve=JSON.stringify
    ({
        list:list,
        listk:listk,
        listkt:listkt,
        listc:listc,
        kategoris:kategoris,
        kategori_list:kategori_list,
        datetime:datetime,

    })
    localStorage.setItem('seve', seve);
}

function load() {
    const seve = JSON.parse(localStorage.getItem('seve'));
        list=seve.list;
        listk=seve.listk;
        listkt=seve.listkt;
        listc=seve.listc;
        kategoris=seve.kategoris;
        kategori_list=seve.kategori_list;
        datetime=seve.datetime;
}
function reset() {
    list = [];
    listc = [];
    listk = ["#afafaf"];
    listkt = ["#000000"];
    kategoris = [];
    kategori_list = ["通常"];
    datetime=[];
    a="";
    b="";
}
function drawing() {
    b=document.getElementById('select').value;
    a = "";
    for (let i = 0; i < list.length; i++) {
        let x =kategori_list.indexOf(kategoris[i])
        a = a + `<div class="content" id="${i}" style="background-color:${listk[x]};color:${listkt[x]};">
            ${i + 1}${"  カテゴリ:"+kategoris[i]}
            <div id="time${i}"></div>
            <p style="color:${listkt[x]};">${list[i]}
            <input type="checkbox" id="check${i}" onclick="check(${i});">
            </p>
            <input type="button" onclick="removeItem(${i});" value="削除" class="s">
            <input type="button" value="編集"onclick="edit(${i});" >
            </div>
            <br>`
    }
    document.getElementById('list').innerHTML = a;
    for (let i = 0; i < list.length; i++) {
        console.log(listc[i])
        document.getElementById('check' + i).checked = listc[i]
    }
    a="";
    for (let i = 0; i < kategori_list.length; i++) 
    {
        a=a+`<option value="${kategori_list[i]}">${kategori_list[i]}</option>`
        document.getElementById('select').innerHTML=a;
    }
    document.getElementById('select').value=b;
}
function time_drawing()
{
    for(let i=0; i < datetime.length; i++)
    {
        let date = new Date();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let targetDate = new Date(datetime[i]);
        let ato = targetDate - date;
        let element = document.getElementById('time'+i);
        if (ato>0) {
            let day = Math.floor(ato / (1000 * 60 * 60 * 24)); 
        hour = Math.floor((ato % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 
        min = Math.floor((ato % (1000 * 60 * 60)) / (1000 * 60)); 
        sec = Math.floor((ato % (1000 * 60)) / 1000);
        if (element) {
            document.getElementById('time'+i).innerHTML = `残り${day}日${hour}時間${min}分${sec}秒`;
         }
        }else
        {
            if (element) {
                document.getElementById('time'+i).innerHTML=`この予定の時間が過ぎました。`;
            }
        }
    }
}
function removeItem(la) {//9
    list.splice(la, 1);
    listc.splice(la, 1);
    kategoris.splice(la, 1);
    datetime.splice(la, 1);
    drawing();
    seve();
}
function indx() {
    const a = document.getElementById('t').value
    list.push(sanitize(a));
    listc.push(false);
    kategoris.push(document.getElementById('select').value);
    datetime.push(document.getElementById('datetime').value);
    seve();
    drawing();
}
function reset_button() {
    var krasu = window.confirm('リセットしますか？');
    if (krasu) { reset(); drawing(); seve();setting();}
}
function edit(ac) {
    a="";
    for (let i = 0; i < kategori_list.length; i++) 
    {
        a=a+`<option value="${kategori_list[i]}">${kategori_list[i]}</option>`
    }
    document.getElementById(ac).innerHTML = `
    ${ac + 1}
    <input value="${list[ac]}" id="h${ac}" ><select id="se${ac}" class="input">${a}</select><input type="datetime-local" id="dd${ac}" value="${datetime[ac]}">
    <br><input type="button" onclick="drawing();" value="キャンセル" class="s">
    <input type="button" value="保存"onclick="Saving_changes(${ac});">`;
    document.getElementById('se'+ac).value=kategoris[ac];
}
function Saving_changes(ok) {
    list[ok] = sanitize(document.getElementById(`h${ok}`).value);
    kategoris[ok] = document.getElementById(`se${ok}`).value;
    datetime[ok]=document.getElementById(`dd${ok}`).value
    seve(); drawing();
}
function check(c) {
    listc[c] = document.getElementById(`check${c}`).checked;
    seve();
}


function setting() {
    document.getElementById('button').style.display="none";
    document.getElementById('list').innerHTML = `
    <h1>設定</h1><br>
    <p>カテゴリ</p>
    <div class="t" id="kateggori">
    <input type="button" value="追加 +" onclick="kategori();">
    </div>
    <br>
    <input type="button" value="設定を閉じる" onclick="kategoriss();drawing();seve();document.getElementById('button').style.display = 'block';">
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    <input type="button" value="リセット" onclick="reset_button();" style="display: flex;">
    <input type="button" value="変数一覧" onclick="debug();">
    <div id="debug"></div>`;
        kategorig();
        
}
function kategori() {
    listk.push("#afafaf");
    listkt.push("#000000");
    kategori_list.push("無名");
    kategorig();
}
function kategorig() {
    a = "";
    for (let i = 0; i < kategori_list.length; i++) {
        a =a+`
    <div style="background-color: rgb(167, 167, 167);" class="box">
    <input value="${listk[i]}" type="color" id="c${i}"">背景
    <input value="${listkt[i]}" type="color" id="ck${i}">文字
    <input type="text" value="${kategori_list[i]}" id="t${i}">
    <input type="button" value="削除" onclick="kategorisss(${i});">
</div>
<br>
    `
    }
    a=a+'<input type="button" value="追加 +" onclick="kategori();">';
    document.getElementById('kateggori').innerHTML = a;
}
function kategoriss()
{
    let mo =kategori_list
    for (let i = 0; i < kategori_list.length; i++){
    listk[i]=document.getElementById('c'+i).value
    listkt[i]=document.getElementById('ck'+i).value
    kategori_list[i]=document.getElementById('t'+i).value
    seve();}
}
function kategorisss(a)
{
    if(kategori_list.length!=1){
    listk.splice(a, 1);
    listkt.splice(a, 1);
    kategori_list.splice(a, 1);
    kategorig();
    seve();
    }
}
function debug(){
    document.getElementById('debug').innerHTML=`list:${list}<br>listc:${listc}<br>listk:${listk}<br>listkt${listkt}<br>kategors:${kategoris}<br>kategor_list:${kategori_list}<br>datetime:${datetime}`;
}
