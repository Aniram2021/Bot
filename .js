// ==UserScript==
// @name         Bot For Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Tyurina Marina
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://psyholog.me/*
// @icon         
// @grant        none
// ==/UserScript==

let sites = {
	"xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["гобой",
				"саксофон",
				"как звучит флейта"],
	"psyholog.me":["центр здоровых отношений",
				   "Услуги центра здоровых отношений",
				   "Чекалина Елена  психолог"]
};

let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];

let keywords = sites[site];

let button = document.getElementsByClassName("button")[0];
let links = document.links;
let keyword = keywords[getRandom(0, keywords.length)];
let yandexInput = document.getElementById("text");
let i = 0;


if(button !== undefined) {
	document.cookie = "site="+site;
}else if (location.hostname == "www.yandex.ru") {
	site = getCookie("site");
}else{
	site = location.hostname;
}

if(button!==undefined) {
    document.cookie = "site="+site;
    let timerId = setInterval(function() {
        yandexInput.value += keyword[i];
        i++;
        if(i == keyword.length) {
            clearInterval(timerId);
            button.click();
        }
    }, 1000);


} else if(location.hostname == site ) {
    console.log("Мы на сайте");
    setTimeout(()=>{
        let index = getRandom (0, links.length);

        if(getRandom(0, 101)>=70) {
           location.href = "https://yandex.ru/";
           }
        if(links[index].href.indexOf(site)!=-1)
        links[index].click();
    }, getRandom (4000, 7000));
}
else {
    let nextYandexPage = true;
    for(let i=0;i<links.length;i++) {
        if(links[i].href.indexOf(site)!=-1) {
            let link = links[i];
            nextYandexPage = false;
            console.log("Нашел фразу" + link);
            link.removeAttribute("target");
            setTimeout(()=> {
                link.click();},getRandom(3000, 5000));
            break;
        }
    }

   if(document.querySelector('.pager__item_current_yes').textContent == "5") {
        nextYandexPage = false;
        location.href = "https://yandex.ru/";
    }


    if(nextYandexPage) {
        // nextYandexPage = false;
        setTimeout(()=>{
            document.querySelector('.pager__item_kind_next').click();}
                   ,getRandom(3000,5000));
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
