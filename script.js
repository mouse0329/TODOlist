var list = [];
var listc = [];
var listk = [];
var listkt = [];
var kategoris = [];
var kategori_list = [];
var a;
window.onload = () => {
    load();
    drawing();
}
function sanitize(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\//g, "&#x2F;");
}
function seve() {
    compression();
    a = ""
    for (let i = 0; i < listc.length; i++) {
        if (listc[i]) { a = a + "t" } else { a = a + "f" }
    }
    console.log("seve:" + a);
    Cookies.set("listc", a);
}
function load() {
    Thawing();
    a = Cookies.get("listc");
    console.log("listc:" + a)
    for (let i = 0; i < a.length; i++) {
        console.log(a.charAt(i));
        if (a.charAt(i) === "t") {
            listc.push(true);
        } else {
            listc.push(false);
        }
    }
    console.log("l:" + listc);
}
function reset() {
    list = [];
    listc = [];
    listk = [];
    listkt = [];
    kategoris = [];
    kategori_list = [];
}
function drawing() {
    a = "";
    for (let i = 0; i < list.length; i++) {
        let x =kategori_list.indexOf(kategoris[i])
        a = a + `<div class="content" id="${i}" style="background-color:${listk[x]};color:${listkt[x]};">
            ${i + 1}${"カテゴリ:"+kategoris[i]}
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
}
function removeItem(la) {//9
    list.splice(la, 1);
    listc.splice(la, 1);
    kategoris.splice(la, 1);
    drawing();
    seve();
}
function indx() {
    const a = document.getElementById('t').value
    list.push(sanitize(a));
    listc.push(false);
    kategoris.push(document.getElementById('select').value);
    seve();
    drawing();
}
function reset_button() {
    var krasu = window.confirm('リセットしますか？');
    if (krasu) { reset(); drawing(); seve();setting();}
}
function edit(ac) {
    document.getElementById(ac).innerHTML = `
    ${ac + 1}
    <input value="${list[ac]}" id="h${ac}" >
    <br><input type="button" onclick="drawing();" value="キャンセル" class="s">
    <input type="button" value="保存"onclick="Saving_changes(${ac});">`;
}
function Saving_changes(ok) {
    list[ok] = sanitize(document.getElementById(`h${ok}`).value);
    seve(); drawing();
}
function check(c) {
    listc[c] = document.getElementById(`check${c}`).checked;
    seve();
}

function Thawing() {
    let m = Cookies.get("list");
    let n = "";
    list = [];
    for (let i = 0; i < m.length; i++) {
        if (m.charAt(i) === "/") {
            list.push(n);
            n = ""
        } else {
            n = n + m.charAt(i)
        }
    }
    m = Cookies.get("listk");
    n = "";
    listk = [];
    for (let i = 0; i < m.length; i++) {
        if (m.charAt(i) === "/") {
            listk.push(n);
            n = ""
        } else {
            n = n + m.charAt(i)
        }
    }
    m = Cookies.get("listkt");
    n = "";
    listkt = [];
    for (let i = 0; i < m.length; i++) {
        if (m.charAt(i) === "/") {
            listkt.push(n);
            n = ""
        } else {
            n = n + m.charAt(i)
        }
    }
    m = Cookies.get("kategoris");
    n = "";
    kategoris = [];
    for (let i = 0; i < m.length; i++) {
        if (m.charAt(i) === "/") {
            kategoris.push(n);
            n = ""
        } else {
            n = n + m.charAt(i)
        }
    }
    m = Cookies.get("kategori_list");
    n = "";
    kategori_list = [];
    for (let i = 0; i < m.length; i++) {
        if (m.charAt(i) === "/") {
            kategori_list.push(n);
            n = ""
        } else {
            n = n + m.charAt(i)
        }
    }
}
function compression() {
    let kar = "";
    for (let i = 0; i < list.length; i++) {
        kar = kar + list[i] + "/"
    }
    Cookies.set("list", kar);
    console.log("compression:" + kar);

    kar = "";
    for (let i = 0; i < listk.length; i++) {
        kar = kar + listk[i] + "/"
    }
    Cookies.set("listk", kar);
    console.log("compression:" + kar);

    kar = "";
    for (let i = 0; i < listkt.length; i++) {
        kar = kar + listkt[i] + "/"
    }
    Cookies.set("listkt", kar);
    console.log("compression:" + kar);

    kar = "";
    for (let i = 0; i < kategoris.length; i++) {
        kar = kar + kategoris[i] + "/"
    }
    Cookies.set("kategoris", kar);
    console.log("compression:" + kar);

    kar = "";
    for (let i = 0; i < listkt.length; i++) {
        kar = kar + kategori_list[i] + "/"
    }
    Cookies.set("kategori_list", kar);
    console.log("compression:" + kar);
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
    <input type="button" value="設定を閉じる" onclick="drawing();seve();document.getElementById('button').style.display = 'block';">
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    <div class="null"></div>
    <input type="button" value="リセット" onclick="reset_button();" style="display: flex;">
    <input type="button" value="更新" onclick="debug();">
    <div id="debug"></div>;`;
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
    <input type="button" value="保存" onclick="kategoriss(${i});">
    <input type="button" value="削除" onclick="kategorisss(${i});">
</div>
<br>
    `
    }
    a=a+'<input type="button" value="追加 +" onclick="kategori();">';
    document.getElementById('kateggori').innerHTML = a;
}
function kategoriss(a)
{
    listk[a]=document.getElementById('c'+a).value
    listkt[a]=document.getElementById('ck'+a).value
    kategori_list[a]=document.getElementById('t'+a).value
    seve();
}
function kategorisss(a)
{
    listk.splice(a, 1);
    listkt.splice(a, 1);
    kategori_list.splice(a, 1);
    kategori();
    seve();
}
function debug(){
    document.getElementById('debug').innerHTML=`list:${list}<br>listc:${listc}<br>listk:${listk}<br>listkt${listkt}<br>kategors:${kategoris}<br>kategor_list:${kategori_list}`;
}