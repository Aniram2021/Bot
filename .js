// ==UserScript==
// @name         Bot For Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Tyurina Marina
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon         
// @grant        none
// ==/UserScript==

let keywords = ["гобой", "саксофон", "как звучит флейта"];

let button = document.getElementsByClassName("button")[0];
let links = document.links;
let keyword = keywords[getRandom(0, keywords.length)];
let yandexInput = document.getElementById("text");
let i = 0;

if(button!==undefined) {
    let timerId = setInterval(function() {
        yandexInput.value += keyword[i];
        i++;
        if(i == keyword.length) {
            clearInterval(timerId);
            button.click();
        }
    }, 1000);




} else if(location.hostname == "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") {
    console.log("Мы на сайте");
    setTimeout(()=>{
        let index = getRandom (0, links.length);

        if(getRandom(0, 101)>=70) {
           location.href = "https://yandex.ru/";
           }
        if(links[index].href.indexOf('xn----7sbab5aqcbiddtdj1e1g.xn--p1ai')!=-1)
        links[index].click();
    }, getRandom (2000, 3500));
}
else {
    let nextYandexPage = true;
    for(let i=0;i<links.length;i++) {
        if(links[i].href.indexOf('xn----7sbab5aqcbiddtdj1e1g.xn--p1ai')!=-1) {
            let link = links[i];
            nextYandexPage = false;
            console.log("Нашел фразу" + link);
            link.removeAttribute("target");

            setTimeout(()=> {
                link.click();}
                       ,getRandom(1000, 4500));
            break;
        }
    }

    if(document.querySelector('.pager__item_current_yes').textContent == "5") {
        nextYandexPage = false;
        location.href = "https://yandex.ru/";
    }


    if(document.querySelector('.pager__item_current_yes').textContent !== "5") {
        nextYandexPage = false;
        setTimeout(()=>{
            document.querySelector('.pager__item_kind_next').click();}
                   ,getRandom(3000,5000));
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}
