// ==UserScript==
// @name			Dollchan Extension Tools
// @version			12.4.29.2
// @namespace		http://www.freedollchan.org/scripts/*
// @author			Sthephan Shinkufag @ FreeDollChan
// @copyright		(C)2084, Bender Bending Rodriguez
// @description		Doing some profit for imageboards
// @icon			https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/stable/Icon.png
// @updateURL		https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/stable/Dollchan_Extension_Tools.meta.js
// @include			*
// ==/UserScript==

(function (scriptStorage) {
'use strict';
var defaultCfg = {
	'version':	'2012.04.29.2',
	'lang':		0,		// script language [0=ru, 1=en]
	'sstyle':	0,		// script elements style [0=gradient blue, 1=solid grey]
	'spells':	0,		// hide posts by magic spells
	'awipe':	1,		// antiwipe detectors:
	'samel':	1,		//		same lines
	'samew':	1,		//		same words
	'longp':	1,		//		long posts
	'longw':	0,		//		long words
	'caps':		0,		//		cAsE, CAPS
	'specs':	0,		//		special symbols
	'nums':		1,		//		numbers
	'menuhd':	1,		// menu on hide button
	'viewhd':	1,		// view hidden on postnumber
	'delhd':	0,		// delete hidden posts [0=off, 1=merge, 2=full hide]
	'filthr':	1,		// filter threads
	'updthr':	1,		// update threads [0=off, 1=auto, 2=click+count, 3=click]
	'updint':	2,		//		threads update interval
	'updfav':	1,		//		favicon blinking, if new posts detected
	'navig':	2,		// >>links navigation [0=off, 1=no map, 2=+refmap]
	'navdel':	'2000',	//		delay in ms
	'navmrk':	0,		//		mark viewed posts
	'navhid':	0,		//		strike hidden posts in refmap
	'navdis':	0,		//		don't show hidden posts
	'expimg':	2,		// expand images by click [0=off, 1=in post, 2=by center]
	'expost':	2,		// expand shorted posts [0=off, 1=auto, 2=on click]
	'ctime':	0,		// correct time in posts
	'ctmofs':	'-2',	//		offset
	'ctmpat':	'',		//		pattern
	'insnum':	1,		// insert >>link on postnumber click
	'animp':	1,		// animated popups and post previews
	'aclose':	0,		// auto-close popups
	'rtitle':	1,		// replace page title in threads
	'attach':	1,		// attach main panel
	'icount':	1,		// show posts/images counter
	'showmp':	0,		// show full main panel
	'ospoil':	1,		// open spoilers
	'noname':	0,		// hide post names
	'noscrl':	1,		// hide scrollers in posts
	'mp3':		1,		// mp3 player by links
	'addimg':	1,		// add images by links
	'imgsrc':	1,		// image search
	'ytube':	3,		// YouTube links embedder [0=off, 1=onclick, 2=player, 3=preview+player, 4=only preview]
	'yptype':	0,		//		player type [0=flash, 1=HTML5 <iframe>, 2=HTML5 <video>]
	'ywidth':	360,	//		player width
	'yheigh':	270,	//		player height
	'yhdvid':	0,		//		hd video quality
	'ytitle':	0,		//		convert links to titles
	'verify':	1,		// reply without reload (verify on submit)
	'rndimg':	0,		// add random byte into image
	'addfav':	1,		// add thread to favorites on reply
	'keynav':	0,		// keyboard navigation
	'sagebt':	1,		// email field -> sage btn
	'svsage':	1,		//		remember sage
	'issage':	0,		//		reply with sage
	'pform':	2,		// postform is [0=at top, 1=at bottom, 2=hidden]
	'tform':	1,		// hide thread-creating form
	'forcap':	1,		// language input in captcha [0=off, 1=en, 2=ru]
	'txtbtn':	1,		// text format buttons [0=off, 1=graph, 2=text, 3=usual]
	'txtpos':	0,		//		position at [0=top, 1=bottom]
	'name':		0,		// user name
	'namval':	'',		//		value
	'passw':	0,		// user password
	'pasval':	'',		//		value
	'sign':		0,		// user signature
	'sigval':	'',		//		value
	'norule':	1,		// hide board rules
	'nogoto':	1,		// hide goto field
	'nopass':	1,		// hide password field
	'mask':		0,		// mask images
	'texw':		530,	// textarea width
	'texh':		140,	// textarea height
	'enupd':	1,		// check for script's update
	'betaupd':	0,		// check for beta-version
	'lupdchk':	0,		// last update check
	'supdint':	2		// update interval in days (0 - every page load, -1 - never)
},

Lng = {
	cookiesLimit:	['Превышен лимит cookies', 'Cookies limit overflow'],
	settings:		['Настройки', 'Settings'],
	hidden:			['Скрытое', 'Hidden'],
	favorites:		['Избранное', 'Favorites'],
	refresh:		['Обновить', 'Refresh'],
	newThread:		['Создать тред', 'New thread'],
	goBack:			['Назад', 'Go back'],
	goNext:			['Следующая', 'Next'],
	goUp:			['Наверх', 'To the top'],
	goDown:			['В конец', 'To the bottom'],
	expImages:		['Раскрыть картинки', 'Expand images'],
	maskImages:		['Маскировать картинки', 'Mask images'],
	autoupd:		['Автообновление треда', 'Thread autoupdate'],
	postsImages:	['Постов/Изображений в треде', 'Posts/Images in thread'],
	antiWipe:		['Анти-вайп детекторы ', 'Anti-wipe detectors '],
	sameLines:		['Повтор строк', 'Same lines'],
	sameWords:		['Повтор слов', 'Same words'],
	specSymbols:	['Спецсимволы', 'Special symbols'],
	longPosts:		['Длинные посты', 'Long posts'],
	longWords:		['Длинные слова', 'Long words'],
	numbers:		['Числа', 'Numbers'],
	caps:			['КАПС/реГисТР', 'CAPS/cAsE'],
	spells:			['Заклинания: ', 'Magic spells: '],
	add:			['Добавить', 'Add'],
	apply:			['Применить', 'Apply'],
	clear:			['Очистить', 'Clear'],
	selHiddenPosts:	[
		['Не изменять', 'Объединять', 'Удалять'],
		['Skip', 'Merge', 'Delete']
	],
	filterThreads:	['Применять фильтры к тредам', 'Apply filters to threads'],
	hiderMenu:		['Дополнительное меню кнопок скрытия ', 'Additional menu of hide buttons'],
	viewHidden:		['Просмотр скрытого по №поста*', 'View hidden on №postnumber*'],
	threadUpd:		['подгрузка треда* T=', 'thread update* T='],
	selThreadUpd:	[
		['Откл.', 'Авто', 'Счет+клик', 'По клику'],
		['Disable', 'Auto', 'Count+click', 'On click']
	],
	indication:		['индикация*', 'indication*'],
	navigation:		['навигация по >>ссылкам* ', 'navigation by >>links* '],
	selNavigation:	[
		['Откл.', 'Без карты', 'С картой'],
		['Disable', 'No map', 'With map']
	],
	delayPreview:	[' задержка пропадания (мс)', ' delay disappearance (ms)'],
	markViewed:		['Отмечать просмотренные посты*', 'Mark viewed posts*'],
	hidRefmap:		['Зачеркивать >>ссылки на скрытые посты*', 'Strike >>links to hidden posts*'],
	disHidPview:	['Не отображать превью для скрытых постов', 'Don\'t show previews for hidden posts'],
	expandPosts:	['загрузка сокращенных постов*', 'upload of shorted posts*'],
	selClickAuto:	[
		['Откл.', 'Авто', 'По клику'],
		['Disable', 'Auto', 'On click']
	],
	scriptStyle:	[' стиль скрипта', ' script style'],
	insertLink:		['Вставлять >>ссылку по клику на №поста*', 'Insert >>link on №postnumber click*'],
	animatePopup:	['Анимация уведомлений и превью постов', 'Animation of popups and post preview'],
	autoClose:		['Автоматически закрывать уведомления', 'Close popups automatically'],
	replaceTitle:	['Название треда в заголовке вкладки*', 'Thread name in page title*'],
	attachPanel:	['Прикрепить главную панель ', 'Attach main panel '],
	showImgCount:	['Счетчик постов/изображений в треде', 'Posts/images counter in thread'],
	imgExpand:		['раскрывать изображения ', 'expand images '],
	selImgExpand:	[
		['Откл.', 'В посте', 'По центру'],
		['Disable', 'In post', 'By center']
	],
	hideNames:		['Скрывать имена в постах', 'Hide names in posts'],
	openSpoilers:	['Открывать спойлеры', 'Open spoilers'],
	noScroll:		['Без скролла в постах', 'No scroll in posts'],
	mp3Embed:		['Добавлять плейер к mp3-ссылкам* ', 'Add player to mp3-links* '],
	imgEmbed:		[
		'Загружать изображения к .jpg-, .png-, .gif-ссылкам*',
		'Load images to .jpg-, .png-, .gif-links*'
	],
	YTembed:		['к YouTube-ссылкам* ', 'to YouTube-links* '],
	selYTembed:	[
		['Ничего', 'Плейер по клику', 'Авто плейер', 'Превью+плейер', 'Только превью'],
		['Nothing', 'On click player', 'Auto player', 'Preview+player', 'Only preview']
	],
	YTtitle:		['Загружать названия к YouTube-ссылкам*', 'Load titles into YouTube-links*'],
	replyCheck:		[
		'Постить без перезагрузки (проверять ответ при отправке)*',
		'Posting without reload (check reply on submit)*'
	],
	addToFav:		['Добавлять тред в избранное при ответе', 'Add thread to favorites on reply'],
	mailToSage:		['Sage вместо поля E-mail* ', 'Sage button instead of E-mail field* '],
	saveSage:		['запоминать сажу', 'remember sage'],
	replyForm:		['форма ответа в треде* ', 'reply form in thread* '],
	noThrForm:		['Прятать форму создания треда', 'Hide thread creating form'],
	selReplyForm:   [
		['Сверху', 'Внизу', 'Скрытая'],
		['At top', 'At bottom', 'Hidden']
	],
	capInput:		['язык ввода капчи', 'language input in captcha'],
	selCapInput:	[
		['Откл.', 'Eng', 'Rus'],
		['Disable', 'Eng', 'Rus']
	],
	formatBtns:		['кнопки форматирования текста ', 'text format buttons '],
	selFormatBtns:	[
		['Откл.', 'Графич.', 'Упрощ.', 'Стандарт.'],
		['Disable', 'As images', 'As text', 'Standard']
	],
	atBottom:		['внизу', 'at bottom'],
	fixedName:		['Постоянное имя', 'Fixed name'],
	fixedPass:		['Постоянный пароль', 'Fixed password'],
	fixedSign:		['Постоянная подпись', 'Fixed signature'],
	dontShow:		['Не отображать: ', 'Do not show: '],
	rules:			['правила ', 'rules '],
	gotoField:		['поле goto ', 'goto field '],
	passw:			['пароль', 'password'],
	noGlobalCfg:	['Глобальные настройки не найдены', 'Global config not found'],
	save:			['Сохранить', 'Save'],
	load:			['Загрузить', 'Load'],
	reset:			['Сброс', 'Reset'],
	version:		['Версия: ', 'Version: '],
	storage:		['Хранение: ', 'Storage: '],
	thrViewed:		['Тредов просмотрено: ', 'Threads viewed: '],
	thrCreated:		['Тредов создано: ', 'Threads created: '],
	pstSended:		['Постов отправлено: ', 'Posts sended: '],
	total:			['Всего: ', 'Total: '],
	hiddenPosts:	['Скрытые посты', 'Hidden posts'],
	hiddenThrds:	['Скрытые треды', 'Hidden threads'],
	onPage:			[' на странице', ' on page'],
	noHidThrds:		['Нет скрытых тредов...', 'No hidden threads...'],
	noHidOnPage:	['На этой странице нет скрытого...', 'Nothing to hide on this page...'],
	expandAll:		['Раскрыть все', 'Expand all'],
	undo:			['Вернуть назад', 'Undo'],
	noFavorites:	['Нет избранных тредов...', 'Favorites is empty...'],
	remove:			['Удалить', 'Remove'],
	edit:			['Правка', 'Edit'],
	info:			['Инфо', 'Info'],
	selHiderMenu:	[
		['Скрывать выделенное', 'Скрывать изображение', 'Скрыть схожий текст'],
		['Hide selected text', 'Hide same images', 'Hide similar text']
	],
	selExpandThrd:	[
		['5 постов', '15 постов', '30 постов', '50 постов', '100 постов'],
		['5 posts', '15 posts', '30 posts', '50 posts', '100 posts']
	],
	selAjaxPages:	[
		['1 страница', '2 страницы', '3 страницы', '4 страницы', '5 страниц'],
		['1 page', '2 pages', '3 pages', '4 pages', '5 pages']
	],
	loading:		['Загрузка...', 'Loading...'],
	checking:		['Проверка...', 'Checking...'],
	deleting:		['Удаление...', 'Deleting...'],
	error:			['Ошибка:', 'Error:'],
	bold:			['Жирный', 'Bold'],
	italic:			['Наклонный', 'Italic'],
	underlined:		['Подчеркнутый', 'Underlined'],
	strike:			['Зачеркнутый', 'Strike'],
	spoiler:		['Спойлер', 'Spoiler'],
	code:			['Код', 'Code'],
	quote:			['Цитировать выделенное', 'Quote selected'],
	replies:		['Ответы:', 'Replies:'],
	postNotFound:	['Пост не найден', 'Post not found'],
	noConnect:		['Ошибка подключения', 'Connection failed'],
	postsOmitted:	['Пропущено ответов: ', 'Posts omitted: '],
	collapseThrd:	['Свернуть тред', 'Collapse thread'],
	deleted:		['удалён', 'deleted'],
	thrdNotFound:	['Тред недоступен (№', 'Thread is unavailable (№'],
	getNewPosts:	['Получить новые посты', 'Get new posts'],
	page:			[' страница', ' page'],
	hiddenThrd:		['Скрытый тред:', 'Hidden thread:'],
	expandForm:		['Раскрыть форму', 'Expand form'],
	goCatalog:		['Каталог', 'Catalog'],
	cTime:			['Корректировать время в постах* ', 'Correct time in posts* '],
	cTimeError:		['Неправильная разница во времени', 'Invalid time difference'],
	cTimeOffset:	[' Разница во времени', ' Time difference'],
	cTimePattern:	['Шаблон замены', 'Replace pattern'],
	succDeleted:	['Пост(ы) удален(ы)!', 'Post(s) deleted!'],
	errDelete:		['Не могу удалить пост(ы)!', 'Can\'t delete post(s)!'],
	rndImages:		['Добавлять случайный байт в изображение', 'Add random byte into image'],
	keyNavig:		['Навигация с помощью клавиатуры* ', 'Navigation with keyboard* '],
	keyNavHelp:		['На доске:\n"J" - тред ниже,\n"K" - тред выше,\n"N" - пост ниже,\n"M" - пост выше,\n"V" - вход в тред\n\nВ треде:\n"J" - пост ниже,\n"K" - пост выше,\n"V" - быстрый ответ', 'On board:\n"J" - thread below,\n"K" - thread above,\n"N" - post below,\n"M" - post above,\n"V" - enter a thread\n\nIn thread:\n"J" - post below,\n"K" - post above,\n"V" - quick reply'],
	search:			['Искать в ', 'Search in '],
	imgSearch:		['Добавлять кнопки для поиска изображений*', 'Add image search buttons*'],
	filters:		['Фильтры', 'Filters'],
	posts:			['Посты', 'Posts'],
	links:			['Ссылки', 'Links'],
	form:			['Форма', 'Form'],
	common:			['Общее', 'Common'],
	showMore:		['Показать подробнее', 'Show more'],
	loadGlobal:		['Загрузить глобальные настройки', 'Load global settings'],
	saveGlobal:		['Сохранить настройки как глобальные', 'Save settings as global'],
	editCfg:		['Редактировать настройки в текстовом формате', 'Edit settings in text format'],
	resetCfg:		['Сбросить в настройки по умолчанию', 'Reset settings to defaults'],
	saveChanges:	['Сохранить внесенные изменения', 'Save your changes'],
	editNotes:		['Правка в текстовом формате', 'Edit notes in text format'],
	infoCount:		['Обновить счетчики постов', 'Refresh posts counters'],
	clrDeleted:		['Очистить записи недоступных тредов', 'Clear notes of inaccessible threads'],
	clrSelected:	['Удалить выделенные записи', 'Remove selected notes'],
	upd:	[
		['Всегда', 'Always'],
		['Каждый день', 'Every Day'],
		['Каждые 2 дня', 'Every 2 Day'],
		['Каждую неделю', 'Every Week'],
		['Каждые 2 недели', 'Every 2 Week'],
		['Каждый месяц', 'Every Month'],
		['Никогда', 'Never'],
		['Интервал проверки', 'Check interval'],
		['Включить авто-проверку на обновления', 'Enable Auto Update-сheck'],
		['Проверять обновления для beta-версии', 'Check updates for beta-version'],
		['Проверить сейчас', 'Check now'],
		['Доступно обновление!', 'Update avaiable!'],
		['У вас стоит самая последняя версия!', 'You have latest version!']
	]
},

doc = window.document, Cfg = {}, lCode, Favor = {}, hThrds = {}, Stat = {}, Posts = [], pByNum = [], Visib = [], Expires = [], refMap = [], pSpells = {}, tSpells = {}, oSpells = {}, spellsList = [], ajPosts = {}, ajThrds = {}, ajaxInt, nav = {}, sav = {}, aib = {}, brd, res, TNum, pageNum, docExt, cssFix, pr = {}, dForm, oeForm, pArea, qArea, pPanel, opPanel, curView = null, pViewTimeout, imPosts = {}, pDel = {}, dummy, quotetxt = '', docTitle, favIcon, favIconTimeout, isExpImg = false, timePattern, timeRegex, oldTime, endTime, timeLog = '', tubeHidTimeout, tByCnt = [], cPIndex, cTIndex = 0, scrScroll = false, scrollP = true, scrollT = true, kIgnore = false, postWrapper = false, storageLife = 5*24*3600*1000, liteMode = false, homePage = 'http://www.freedollchan.org/scripts/';


/*==============================================================================
									UTILS
==============================================================================*/

function $$X(path, root, dc) {
	return dc.evaluate(path, root || dc, null, 7, null);
}

function $X(path, root) {
	return $$X(path, root, doc);
}

function $$x(path, root, dc) {
	return dc.evaluate(path, root || dc, null, 8, null).singleNodeValue;
}

function $x(path, root) {
	return $$x(path, root, doc);
}

function $$xb(path, root, dc) {
	return dc.evaluate(path, root || dc, null, 3, null).booleanValue;
}

function $xb(path, root) {
	return $$xb(path, root, doc);
}

function $c(id, root) {
	return root.getElementsByClassName(id)[0];
}

function $id(id) {
	return doc.getElementById(id);
}

function $t(id, root) {
	return root.getElementsByTagName(id)[0];
}

function $each(list, fn) {
	var i = 0, el;
	if(list) {
		while(el = list.snapshotItem(i++)) {
			fn(el, i - 1);
		}
	}
}

function $html(el, htm) {
	var cln = el.cloneNode(false);
	cln.innerHTML = htm;
	el.parentNode.replaceChild(cln, el);
	return cln;
}

function $attr(el, attr) {
	for(var key in attr) {
		key === 'Class' ? el.className = attr[key]
		: key === 'text' ? el.textContent = attr[key]
		: key === 'html' ? el.innerHTML = attr[key]
		: key === 'value' ? el.value = attr[key]
		: el.setAttribute(key, attr[key]);
	}
	return el;
}

function $event(el, events) {
	for(var key in events) {
		el.addEventListener(key, events[key], false);
	}
	return el;
}

function $rattr(el, attr) {
	if(el.getAttribute(attr)) {
		el.removeAttribute(attr);
	}
	if(nav.Opera && el[attr]) {
		el[attr] = '';
	}
}

function $revent(el, events) {
	for(var key in events) {
		el.removeEventListener(key, events[key], false);
	}
}

function $append(el, nodes) {
	for(var i = 0, len = nodes.length; i < len; i++) {
		if(nodes[i]) {
			el.appendChild(nodes[i]);
		}
	}
}

function $before(el, nodes) {
	for(var i = 0, len = nodes.length; i < len; i++) {
		if(nodes[i]) {
			el.parentNode.insertBefore(nodes[i], el);
		}
	}
}

function $after(el, node) {
	el.parentNode.insertBefore(node, el.nextSibling);
}

function $add(htm) {
	dummy.innerHTML = htm;
	return dummy.firstChild;
}

function $$new(tag, attr, events, dc) {
	var el = dc.createElement(tag);
	if(attr) {
		$attr(el, attr);
	}
	if(events) {
		$event(el, events);
	}
	return el;
}

function $new(tag, attr, events) {
	return $$new(tag, attr, events, doc);
}

function $New(tag, attr, nodes) {
	var el = $new(tag, attr, null);
	$append(el, nodes);
	return el;
}

function $txt(el) {
	return doc.createTextNode(el);
}

function $btn(val, ttl, fn) {
	return $new('input', {
		'type': 'button',
		'value': val,
		'title': ttl}, {
		'click': fn
	});
}

function $if(cond, el) {
	return cond ? el : null;
}

function $disp(el) {
	el.style.display = el.style.display === 'none' ? '' : 'none';
}

function $del(el) {
	if(el) {
		el.parentNode.removeChild(el);
	}
}

function $$Del(path, root, dc) {
	$each($$X(path, root, dc), function(el) {
		$del(el);
	});
}

function $Del(path, root) {
	$$Del(path, root, doc)
}

function $delNx(el) {
	while(el.nextSibling) {
		$del(el.nextSibling);
	}
}

function $offset(el) {
	var box = el.getBoundingClientRect();
	return {
		top: Math.round(box.top + window.pageYOffset),
		left: Math.round(box.left + window.pageXOffset)
	};
}

function getStyle(el, prop) {
	return doc.defaultView && doc.defaultView.getComputedStyle
		? doc.defaultView.getComputedStyle(el, '').getPropertyValue(prop)
		: '';
}

function $focus(el) {
	window.scrollTo(0, $offset(el).top);
}

function $pd(e) {
	e.preventDefault();
}

function $rnd() {
	return Math.round(Math.random()*1e10).toString(10);
}

function insertInto(el, txt) {
	var scrtop = el.scrollTop,
		start = el.selectionStart,
		end = el.selectionEnd;
	el.value = el.value.substr(0, start) + txt + el.value.substr(end);
	el.setSelectionRange(start + txt.length, start + txt.length);
	el.focus();
	el.scrollTop = scrtop;
}

function txtSelection() {
	return nav.Opera ? doc.getSelection() : window.getSelection().toString();
}

function strToRegexp(str) {
	var t = str.match(/\/.*?[^\\]\/[ig]*/)[0],
		l = t.lastIndexOf('/');
	return new RegExp(t.substr(1, l - 1), t.substr(l + 1));
}

function isEmptyObj(obj) {
	for(var i in obj) {
		return false;
	}
	return true;
}

function $uneval(obj) {
	return unescape(uneval(obj).replace(/\\u/g, '%u'));
}

if(!String.prototype.trim) {
	String.prototype.trim = function () {
		var str = this.replace(/^\s\s*/, ''),
			s = /\s/,
			i = str.length;
		while(s.test(str.charAt(--i))) {}
		return str.slice(0, i + 1);
	};
}

function HTMLtoDOM(html) {
	var myDoc, el, first;
	try {
		myDoc = (new DOMParser()).parseFromString(html, 'text/html');
	} catch (e) {}
	if(!myDoc || !myDoc.body) {
		myDoc = doc.implementation.createHTMLDocument('');
		el = myDoc.documentElement;
		el.innerHTML = html;
		first = el.firstElementChild;
		if(el.childElementCount === 1 && first.localName.toLowerCase() === 'html') {
			myDoc.replaceChild(first, el);
		}
	}
	return myDoc;
}

function Log(txt) {
	var newTime = (new Date()).getTime();
	timeLog += txt + ': ' + (newTime - oldTime) + 'ms\n';
	oldTime = newTime;
}


/*==============================================================================
								STORAGE / CONFIG
==============================================================================*/

function setCookie(name, value, life) {
	if(name) {
		doc.cookie = escape(name) + '=' + escape(value) + ';expires='
			+ (new Date((new Date()).getTime() + life)).toGMTString() + ';path=/';
	}
}

function getCookie(name) {
	var one,
		arr = doc.cookie.split('; '),
		i = arr.length;
	while(i--) {
		one = arr[i].split('='); {
			if(one[0] === escape(name)) {
				return unescape(one[1]);
			}
		}
	}
	return false;
}

function turnCookies(name) {
	var data = getCookie('DESU_Cookies'),
		arr = data ? data.split('|') : [];
	arr[arr.length] = name;
	if(arr.length > 13) {
		setCookie(arr[0], '', -10);
		arr.splice(0, 1);
	}
	setCookie('DESU_Cookies', arr.join('|'), storageLife);
}

function getStored(name) {
	if(sav.GM) {
		return GM_getValue(name);
	}
	if(sav.script) {
		return scriptStorage.getItem(name);
	}
	if(sav.local) {
		return localStorage.getItem(name);
	}
	return getCookie(name);
}

function setStored(name, value) {
	if(sav.GM) {
		GM_setValue(name, value);
	} else if(sav.script) {
		scriptStorage.setItem(name, value);
	} else if(sav.local) {
		localStorage.setItem(name, value);
	} else {
		setCookie(name, value, storageLife);
	}
}

function getStoredObj(name, def) {
	try {
		return eval(getStored(name)) || def;
	} catch(e) {
		return def;
	}
}

function saveSpells(val) {
	spellsList = val.split('\n');
	setStored('DESU_Spells_' + aib.dm, val);
	initSpells();
}

function fixGlobalCfg() {
	Cfg.forcap = aib.hana || aib.tire || aib.vomb || aib.ment || aib._5ch ? 2 : 1;
}

function setDefaultCfg() {
	Cfg = defaultCfg;
	fixGlobalCfg();
	setStored('DESU_Config_' + aib.dm, $uneval(defaultCfg));
}

function isValidCfg(data) {
	try {
		if(eval(data).version) {
			return true;
		}
	} catch(e) {}
	return false;
}

function readCfg() {
	var key,
		global = false,
		data = getStored('DESU_Config_' + aib.dm);
	if(sav.isGlobal && !isValidCfg(data)) {
		data = getStored('DESU_GlobalCfg');
		global = true;
	}
	if(isValidCfg(data)) {
		Cfg = eval(data);
		Cfg.version = defaultCfg.version;
		for(key in defaultCfg) {
			if(Cfg[key] === undefined) {
				Cfg[key] = defaultCfg[key];
			}
		}
	} else {
		setDefaultCfg();
	}
	if(global) {
		fixGlobalCfg();
	}
	if(!aib.abu) {
		Cfg.noscrl = 0;
	}
	if(aib.hana) {
		Cfg.updthr = Cfg.expost = 0;
	}
	if(!nav.Firefox || aib.hana) {
		Cfg.updfav = 0;
	}
	if(nav.Opera) {
		Cfg.ytitle = 0;
		Cfg.enupd = 0;
	}
	if(nav.Firefox < 7 && !nav.Chrome) {
		Cfg.rndimg = 0;
	}
	if(Cfg.svsage === 0) {
		Cfg.issage = 0;
	}
	setStored('DESU_Config_' + aib.dm, $uneval(Cfg));
	lCode = Cfg.lang;
	Stat = getStoredObj('DESU_Stat_' + aib.dm, {view: 0, op: 0, reply: 0});
	if(TNum) {
		Stat.view = +Stat.view + 1;
	}
	setStored('DESU_Stat_' + aib.dm, $uneval(Stat));
	if(Cfg.ctime) {
		parseTimePattern();
	}
	saveSpells(getStored('DESU_Spells_' + aib.dm) || '');
}

function saveCfg(name, val) {
	Cfg[name] = val;
	setStored('DESU_Config_' + aib.dm, $uneval(Cfg));
}

function toggleCfg(name) {
	saveCfg(name, Cfg[name] === 0 ? 1 : 0);
}

function getVisib(pNum) {
	var key = sav.cookie ? pByNum[pNum].Count : brd + pNum;
	return key in Visib ? Visib[key] : null;
}

function readPostsVisib() {
	var i, arr, data,
		currTime = (new Date()).getTime();
	if(sav.cookie) {
		if(TNum) {
			data = getStored('DESU_Posts_' + aib.dm + '_' + TNum);
			if(data) {
				i = data.length;
				while(i--) {
					Visib[i] = +data[i];
				}
			}
		}
	} else {
		data = getStored('DESU_Posts_' + aib.dm);
		if(data) {
			arr = data.split('-');
			i = arr.length;
			while((i -= 3) >= 0) {
				if(currTime < +arr[i + 2]) {
					Visib[arr[i]] = +arr[i + 1];
					Expires[arr[i]] = +arr[i + 2];
				}
			}
		}
	}
	readHiddenThreads();
	forAll(function(post) {
		var pNum = post.Num;
		post.Vis = getVisib(pNum);
		if(post.isOp) {
			if(hThrds[brd] && (sav.cookie && hThrds[brd].indexOf(pNum) >= 0
				|| !sav.cookie && hThrds[brd][pNum] !== undefined)) {
				setPostVisib(post, 0);
			} else if(post.Vis === 0) {
				Visib[brd + pNum] = null;
				post.Vis = null;
			}
		}
	});
}

function savePostsVisib() {
	var key,
		arr = [],
		id = 'DESU_Posts_' + aib.dm;
	if(sav.cookie) {
		if(TNum) {
			id += '_' + TNum;
			if(!getStored(id)) {
				turnCookies(id);
			}
			setStored(id, Visib.join(''));
		}
	} else {
		for(key in Visib) {
			if(!/^\d$/.test(Visib[key])) {
				break;
			}
			arr[arr.length] = key + '-' + Visib[key] + '-' + Expires[key];
		}
		setStored(id, arr.join('-'));
	}
	toggleContent('Hid', true);
}

function readHiddenThreads() {
	hThrds = getStoredObj('DESU_Threads_' + aib.dm, {});
}

function saveHiddenThreads(txt) {
	setStored('DESU_Threads_' + aib.dm, txt);
}

function toggleHiddenThread(post, vis) {
	var i,
		b = brd,
		tNum = post.Num;
	if(sav.cookie) {
		if(!hThrds[b]) {
			hThrds[b] = [];
		}
		i = hThrds[b].indexOf(tNum);
		if(vis === 0 && i < 0) {
			hThrds[b].push(tNum);
		}
		if(vis === 1 && i >= 0) {
			hThrds[b].splice(i, 1);
		}
		if(escape(uneval(hThrds)).length > 4095) {
			hThrds[b].shift();
		}
	} else {
		if(!hThrds[b]) {
			hThrds[b] = {};
		}
		if(vis === 0) {
			hThrds[b][tNum] = post.thr.dTitle;
		} else {
			delete hThrds[b][tNum];
			if(isEmptyObj(hThrds[b])) {
				delete hThrds[b];
			}
		}
	}
	saveHiddenThreads($uneval(hThrds));
}

function readFavorites() {
	Favor = getStoredObj('DESU_Favorites', {});
}

function saveFavorites(txt) {
	setStored('DESU_Favorites', txt);
	toggleContent('Fav', true);
}

function removeFavorites(h, b, tNum) {
	delete Favor[h][b][tNum];
	if(isEmptyObj(Favor[h][b])) {
		delete Favor[h][b];
	}
	if(isEmptyObj(Favor[h])) {
		delete Favor[h];
	}
	if(pByNum[tNum]) {
		$x('.//a[starts-with(@class,"DESU_btnFav")]', pByNum[tNum].Btns).className = 'DESU_btnFav';
	}
}

function toggleFavorites(post, btn) {
	var h = aib.host,
		b = brd,
		tNum = post.Num;
	if(!btn) {
		return;
	}
	readFavorites();
	if(Favor[h] && Favor[h][b] && Favor[h][b][tNum]) {
		removeFavorites(h, b, tNum);
		saveFavorites($uneval(Favor));
		return;
	}
	if(!Favor[h]) {
		Favor[h] = {};
	}
	if(!Favor[h][b]) {
		Favor[h][b] = {};
	}
	Favor[h][b][tNum] = {
		cnt: post.thr.pCount,
		txt: sav.cookie ? post.thr.dTitle.substring(0, 25) : post.thr.dTitle
	};
	if(sav.cookie && escape(uneval(Favor)).length > 4095) {
		$alert(Lng.cookiesLimit[lCode], '');
		delete Favor[h][b][tNum];
		return;
	}
	btn.className = 'DESU_btnFavSel';
	saveFavorites($uneval(Favor));
}

function markViewedPost(pNum) {
	var post = pByNum[pNum];
	if(post && (post.className).indexOf('DESU_viewed') < 0) {
		post.className += ' DESU_viewed';
	}
}

function readViewedPosts() {
	var arr, i;
	if(Cfg.navmrk !== 0 && sav.session) {
		arr = (sessionStorage.viewedPosts || '').split(',');
		for(i in arr) {
			markViewedPost(arr[i]);
		}
	}
}

function saveViewedPosts(pNum) {
	var arr;
	if(sav.session) {
		arr = (sessionStorage.viewedPosts || '').split(',');
		arr.push(pNum);
		sessionStorage.viewedPosts = arr;
	}
}

/*==============================================================================
							CONTROLS / COMMON CHANGES
==============================================================================*/

function addPanel() {
	var imgLen = getImages(dForm).snapshotLength;
	$before(dForm, [
		$new('div', {'style': 'clear: both;'}, null),
		$New('div', {'id': 'DESU_panel'}, [
			$new('a', {
				'id': 'DESU_btnLogo',
				'href': '#'}, {
				'click': function(e) {
					$pd(e);
					toggleCfg('showmp');
					scriptCSS();
				}
			}),
			$New('div', {'id': 'DESU_panelBtns'}, [
				$new('a', {
					'id': 'DESU_btnSettings',
					'title': Lng.settings[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						toggleContent('Cfg', false);
					}
				}),
				$new('a', {
					'id': 'DESU_btnHidden',
					'title': Lng.hidden[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						toggleContent('Hid', false);
					}
				}),
				$new('a', {
					'id': 'DESU_btnFavor',
					'title': Lng.favorites[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						toggleContent('Fav', false);
					}
				}),
				$new('a', {
					'id': 'DESU_btnRefresh',
					'title': Lng.refresh[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						window.location.reload();
					},
					'mouseover': function() {
						if(!TNum) {
							selectAjaxPages();
						}
					},
					'mouseout': removeSelMenu
				}),
				$new('a', {
					'id': 'DESU_btnGoback',
					'title': Lng.goBack[lCode],
					'href': 'http://' + aib.host + '/' + brd + '/' + (pageNum > 1 ? (pageNum - 1) + docExt : '')
				}, null),
				$if(!TNum, $new('a', {
					'id': 'DESU_btnGonext',
					'title': Lng.goNext[lCode],
					'href': 'http://' + aib.host + '/' + brd + '/' + (pageNum > 0 ? pageNum + 1 : 1) + docExt
				}, null)),
				$new('a', {
					'id': 'DESU_btnGoup',
					'title': Lng.goUp[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						window.scrollTo(0, 0);
					}
				}),
				$new('a', {
					'id': 'DESU_btnGodown',
					'title': Lng.goDown[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						window.scrollTo(0, doc.body.scrollHeight || doc.body.offsetHeight);
					}
				}),
				$if(!TNum && (pr.on || oeForm), $new('a', {
					'id': 'DESU_btnNewthr',
					'title': Lng.newThread[lCode],
					'href': '#'}, {
					'click': toggleMainReply
				})),
				$if(imgLen > 0, $new('a', {
					'id': 'DESU_btnExpimg',
					'title': Lng.expImages[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						Cfg.expimg = 1;
						isExpImg = !isExpImg;
						forAll(function(post) {
							expandAllPostImg(post, isExpImg);
						});
					}
				})),
				$if(pr.file || oeForm, $new('a', {
					'id': 'DESU_btnMaskimg',
					'title': Lng.maskImages[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						toggleCfg('mask');
						scriptCSS();
					}
				})),
				$if(TNum && Cfg.updthr !== 3, $new('a', {
					'id': 'DESU_btnUpdOn',
					'title': Lng.autoupd[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						if(ajaxInt) {
							endPostsUpdate();
						} else {
							this.id = 'DESU_btnUpdOn';
							initPostsUpdate();
						}
					}
				})),
				$if(aib.nul, $new('a', {
					'id': 'DESU_btnCatalog',
					'title': Lng.goCatalog[lCode],
					'target': '_blank',
					'href': 'http://0chan.ru/' + brd +'/catalog.html'
				}, null))
			]),
			$if(TNum, $New('div', {'id': 'DESU_panelInfo'}, [
				$new('span', {
					'title': Lng.postsImages[lCode],
					'text': Posts.length + '/' + imgLen
				}, null)
			]))
		]),
		$new('div', {'id': 'DESU_content'}, null),
		$new('div', {'id': 'DESU_alertBox'}, null),
		$new('hr', {'style': 'clear: both;'}, null)
	]);
}

function toggleContent(name, isUpd) {
	var el, id;
	if(liteMode) {
		return;
	}
	el = $id('DESU_content');
	id = 'DESU_content' + name;
	if(isUpd && el.className !== id) {
		return;
	}
	if(el.childElementCount) {
		if(Cfg.animp !== 0 && (nav.Firefox > 4 || nav.Chrome)) {
			el.addEventListener(nav.Firefox ? 'animationend' : 'webkitAnimationEnd', function clEvent() {
				el.style.display = 'none';
				this.removeEventListener(nav.Firefox ? 'animationend' : 'webkitAnimationEnd', clEvent, false);
				showContent(el, id, name, isUpd);
			}, false);
			el.style.cssText = cssFix + 'animation: DESU_cfgClose 0.1s 1 ease-in;';
		} else {
			showContent(el, id, name, isUpd)
		}
	} else {
		showContent(el, id, name, isUpd)
	}
}

function showContent(el, id, name, isUpd) {
	el.innerHTML = '';
	if(!isUpd && el.className === id) {
		el.className = 'DESU_content';
		return;
	}
	el.className = id;
	if(Cfg.attach === 0) {
		el.appendChild($new('hr', {'style': 'clear: both;'}, null));
	}
	if(name === 'Cfg') {
		addSettings();
	} else {
		el.appendChild($add('<table><tbody align="left"></tbody></table>'));
		if(Cfg.attach !== 0) {
			$t('table', el).style.backgroundColor = getStyle(doc.body, 'background-color');
		}
		if(name === 'Hid') {
			readHiddenThreads();
			addHiddenTable();
		}
		if(name === 'Fav') {
			readFavorites();
			addFavoritesTable();
		}
	}
	if(Cfg.animp !== 0 && (nav.Firefox > 4 || nav.Chrome)) {
		el.style.cssText = cssFix + 'animation: DESU_cfgOpen 0.1s 1 ease-out;';
	} else {
		el.style.display = '';
	}
}

function addSettings() {
	var lBox = function(name, txt, fn, id) {
		var el = $new('input', {
			'type': 'checkbox'}, {
			'click': function() {
				toggleCfg(name);
				if(fn) {
					fn();
				}
			}
		});
		el.checked = Cfg[name] !== 0;
		if(id !== '') {
			el.id = id;
		}
		return $New('label', null, [el, $txt(' ' + txt)]);
	},
	
	divBox = function(name, txt, fn) {
		return $New('div', null, [lBox(name, txt, fn, '')]);
	},
	
	inpTxt = function(name, size, fn) {
		return $new('input', {
			'type': 'text',
			'id': 'DESU_' + name,
			'size': size,
			'value': Cfg[name]}, {
			'keyup': function() {
				saveCfg(name, $id('DESU_' + name).value.replace(/\|/g, ''));
				if(fn) {
					fn();
				}
			}
		})
	},
	
	optSel = function(name, arr, txt, fn) {
		for(var i = 0, len = arr.length, el, opt = []; i < len; i++) {
			opt[i] = '<option value="' + i + '">' + arr[i] + '</option>';
		}
		el = $event($add('<select id="' + name + '_sel">' + opt.join('') + '</select>'), {
			'change': (fn ? fn : function() {
				saveCfg(name, this.selectedIndex);
			})
		});
		el.selectedIndex = Cfg[name];
		return $New('label', null, [el, $txt(' ' + txt)]);
	}, 
	
	cfgTab = function(txt, el) {
		return $New('div', {'Class': aib.pClass + ' DESU_cfgTabBack'}, [
			$new('div', {
				'Class': 'DESU_cfgTab',
				'text': txt}, {
				'click': function() {
					openTab(this, el);
				}
			})
		])
	},
	
	openTab = function(tab, el) {
		if(tab.className == 'DESU_cfgTab_sel') {
			return;
		}
		var oldEl = $c('DESU_cfgBody', doc);
		if(oldEl) {
			oldEl.parentNode.replaceChild(el, oldEl);
			$c('DESU_cfgTab_sel', doc).className = 'DESU_cfgTab';
		} else {
			$after($id('DESU_cfgBar'), el);
		}
		if(Cfg.keynav !== 0) {
			addEvents(el);
		}
		tab.className = 'DESU_cfgTab_sel';
		if(el === cfgFilters) {
			spellsList = getStored('DESU_Spells_' + aib.dm).split('\n');
			initSpells();
			$id('DESU_spellEdit').value = spellsList.join('\n');
		}
	},
	
	cfgFilters = $New('div', {
		'Class': 'DESU_cfgBody',
		'id': 'DESU_cfgFilters'
	}, [
		$New('div', null, [
			$New('span', {'id': 'DESU_spellPanel'}, [
				$new('a', {
					'text': Lng.add[lCode],
					'href': '#'}, {
					'click': $pd,
					'mouseover': selectSpell,
					'mouseout': removeSelMenu
				}),
				$new('a', {
					'text': Lng.apply[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						applySpells('');
					}
				}),
				$new('a', {
					'text': Lng.clear[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						$id('DESU_spellEdit').value = '';
						applySpells('');
					}
				}),
				$new('a', {
					'text': '?',
					'target': '_blank',
					'href': homePage + 'spells'
				}, null)
			]),
			lBox('spells', Lng.spells[lCode], toggleSpells, 'DESU_spellChk'),
			$new('textarea', {
				'id': 'DESU_spellEdit',
				'rows': 7,
				'cols': 55
			}, null)
		]),
		$New('div', null, [
			lBox('awipe', Lng.antiWipe[lCode], null, ''),
			$btn('>', Lng.showMore[lCode], function() {
				$disp($id('DESU_cfgWipe'));
			})
		]),
		$New('div', {
			'id': 'DESU_cfgWipe',
			'style': 'display: none; padding-left: 25px;'
		}, [
			divBox('samel', Lng.sameLines[lCode], null),
			divBox('samew', Lng.sameWords[lCode], null),
			divBox('longp', Lng.longPosts[lCode], null),
			divBox('longw', Lng.longWords[lCode], null),
			divBox('caps', Lng.caps[lCode], null),
			divBox('specs', Lng.specSymbols[lCode], null),
			divBox('nums', Lng.numbers[lCode], null)
		]),
		divBox('filthr', Lng.filterThreads[lCode], null),
		divBox('menuhd', Lng.hiderMenu[lCode], null),
		divBox('viewhd', Lng.viewHidden[lCode], null),
		$New('div', null, [
			optSel('delhd', Lng.selHiddenPosts[lCode], Lng.hiddenPosts[lCode], function() {
				processHidden(this.selectedIndex, Cfg.delhd);
			})
		])
	]),
	
	cfgPosts = $New('div', {
		'Class': 'DESU_cfgBody',
		'id': 'DESU_cfgPosts'
	}, [
		$if(!aib.hana, $New('div', null, [
			optSel('updthr', Lng.selThreadUpd[lCode], Lng.threadUpd[lCode], null),
			optSel('updint', [0.5, 1, 1.5, 2, 5, 15, 30], 'min* ', null),
			$if(nav.Firefox && !aib.hana, lBox('updfav', Lng.indication[lCode], null, ''))
		])),
		$if(!aib.hana, $New('div', null, [
			optSel('expost', Lng.selClickAuto[lCode], Lng.expandPosts[lCode], null)
		])),
		$New('div', null, [
			optSel('expimg', Lng.selImgExpand[lCode], Lng.imgExpand[lCode], null)
		]),
		divBox('imgsrc', Lng.imgSearch[lCode], null),
		divBox('ospoil', Lng.openSpoilers[lCode], scriptCSS),
		divBox('noname', Lng.hideNames[lCode], scriptCSS),
		$if(aib.abu, lBox('noscrl', Lng.noScroll[lCode], scriptCSS, '')),
		$New('div', null, [
			lBox('keynav', Lng.keyNavig[lCode], null, ''),
			$new('a', {
				'text': '?',
				'href': '#'}, {
				'click': function(e) {
					$pd(e);
					$alert(Lng.keyNavHelp[lCode], '');
				}
			})
		]),
		$New('div', null, [
			lBox('ctime', Lng.cTime[lCode], toggleTimeSettings, 'DESU_ctime')
		]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				inpTxt('ctmofs', 3, null),
				$new('span', {text: Lng.cTimeOffset[lCode]}, null)
			]),
			$New('div', null, [
				inpTxt('ctmpat', 30, null),
				$txt(' '),
				$new('a', {
					'text': Lng.cTimePattern[lCode],
					'href': '#'}, {
					'click': function(e) {
						$pd(e);
						$alert('"s" - second (one digit),\n"i" - minute (one digit),\n"h" - hour (one digit),\n"d" - day (one digit),\n"n" - month (one digit),\n"m" - month (string),\n"y" - year (one digit),\n"-" - any symbol\n"+" - any symbol except digits\n"?" - previous char may not be\n\nExamples:\n0chan.ru: "++++yyyy+m+dd+hh+ii+ss"\niichan.ru, 2ch.so: "++++dd+m+yyyy+hh+ii+ss"\ndobrochan.ru: "dd+m+?+?+?+?+?+yyyy+++++++hh+ii+?s?s?"\n410chan.org: "dd+nn+yyyy+++++++hh+ii+ss"\n4chan.org: "nn+dd+yy+++++hh+ii+?s?s?"\n4chon.net: "nn+dd+yy+++++++hh+ii+ss"\nkrautchan.net: "yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?"', '');
					}
				})
			])
		])
	]),
	
	cfgLinks = $New('div', {
		'Class': 'DESU_cfgBody',
		'id': 'DESU_cfgLinks'
	}, [
		$New('div', null, [
			optSel('navig', Lng.selNavigation[lCode], Lng.navigation[lCode], null)
		]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				inpTxt('navdel', 8, null),
				$txt(Lng.delayPreview[lCode])
			]),
			divBox('navmrk', Lng.markViewed[lCode], null),
			divBox('navhid', Lng.hidRefmap[lCode], null),
			divBox('navdis', Lng.disHidPview[lCode], null)
		]),
		divBox('insnum', Lng.insertLink[lCode], null),
		divBox('mp3', Lng.mp3Embed[lCode], null),
		divBox('addimg', Lng.imgEmbed[lCode], null),
		$New('div', null, [
			optSel('ytube', Lng.selYTembed[lCode], Lng.YTembed[lCode], null)
		]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				optSel('yptype', nav.Opera
					? ['Flash', 'HTML5 iframe']
					: ['Flash', 'HTML5 iframe', 'HTML5 video'], ' ', null
				),
				inpTxt('ywidth', 6, null),
				$txt('×'),
				inpTxt('yheigh', 6, null), $txt(' '),
				lBox('yhdvid', 'HD ', null, '')
			]),
			$if(!nav.Opera, lBox('ytitle', Lng.YTtitle[lCode], null, ''))
		])
	]),
	
	cfgForm = $New('div', {
		'Class': 'DESU_cfgBody',
		'id': 'DESU_cfgForm'
	}, [
		$if(pr.on, $New('div', null, [
			optSel('pform', Lng.selReplyForm[lCode], Lng.replyForm[lCode], null)
		])),
		$if(pr.on, divBox('tform', Lng.noThrForm[lCode], function() {
			if(!TNum) {
				pArea.style.display = Cfg.tform ? 'none' : '';
			}
		})),
		divBox('verify', Lng.replyCheck[lCode], null),
		divBox('addfav', Lng.addToFav[lCode], null),
		$if(nav.Firefox > 6 || nav.Chrome, divBox('rndimg', Lng.rndImages[lCode], null)),
		$if(pr.mail, $New('div', null, [
			lBox('sagebt', Lng.mailToSage[lCode], null, ''),
			lBox('svsage', Lng.saveSage[lCode], null, '')
		])),
		$New('div', null, [
			optSel('forcap', Lng.selCapInput[lCode], Lng.capInput[lCode], null)
		]),
		$if(pr.on, $New('div', null, [
			optSel('txtbtn', Lng.selFormatBtns[lCode], Lng.formatBtns[lCode], function() {
				saveCfg('txtbtn', this.selectedIndex);
				addTextPanel();
				scriptCSS();
			}),
			lBox('txtpos', Lng.atBottom[lCode], scriptCSS, '')
		])),
		$if(pr.name, $New('div', null, [
			inpTxt('namval', 20, setUserName),
			lBox('name', Lng.fixedName[lCode], setUserName, 'DESU_fixNameChk')
		])),
		$if(pr.passw, $New('div', null, [
			inpTxt('pasval', 20, setUserPassw),
			lBox('passw', Lng.fixedPass[lCode], setUserPassw, 'DESU_fixPassChk')
		])),
		$if(pr.txta, $New('div', null, [
			inpTxt('sigval', 20, null),
			lBox('sign', Lng.fixedSign[lCode], null, '')
		])),
		$New('div', null, [
			$if(pr.on || oeForm, $txt(Lng.dontShow[lCode])),
			lBox('norule', Lng.rules[lCode], scriptCSS, ''),
			$if(pr.gothr, lBox('nogoto', Lng.gotoField[lCode], function() {
				$disp(pr.gothr);
			}, '')),
			$if(pr.passw, lBox('nopass', Lng.passw[lCode], function() {
				$disp(pr.passw.parentNode.parentNode);
			}, ''))
		])
	]),
	
	cfgCommon = $New('div', {
		'Class': 'DESU_cfgBody',
		'id': 'DESU_cfgCommon'
	}, [
		$New('div', null, [
			optSel('sstyle', ['Gradient blue', 'Solid grey'], Lng.scriptStyle[lCode], function() {
				saveCfg('sstyle', this.selectedIndex);
				scriptCSS();
			})
		]),
		divBox('attach', Lng.attachPanel[lCode], function() {
			toggleContent('Cfg', false);
			scriptCSS();
		}),
		divBox('icount', Lng.showImgCount[lCode], scriptCSS),
		divBox('rtitle', Lng.replaceTitle[lCode], null),
		divBox('animp', Lng.animatePopup[lCode], null),
		divBox('aclose', Lng.autoClose[lCode], null),
		$if(!nav.Opera, $New('div', null, [
			divBox('enupd', Lng.upd[8][lCode], null),
			$New('div', {'id': 'DESU_updCont', 'style': 'padding: 2px 0 10px 25px;'}, [
				optSel('supdint', [
					Lng.upd[0][lCode], // Always
					Lng.upd[1][lCode], // Every Day
					Lng.upd[2][lCode], // Every 2 Day
					Lng.upd[3][lCode], // Every Week
					Lng.upd[4][lCode], // Every 2 Week
					Lng.upd[5][lCode], // Every Month
					Lng.upd[6][lCode]  // Never
				], Lng.upd[7][lCode], function() {
					saveCfg('supdint', this.selectedIndex);
				}),
				divBox('betaupd', Lng.upd[9][lCode], null),
				$btn(Lng.upd[10][lCode], '', function() {
					var el = $id('DESU_updRes', doc);
					el.innerHTML = '<div id="DESU_updRes_check">' + Lng.checking[lCode] + '</div>';
					checkForUpdates(true, false, function(html) {
						el.innerHTML = html;
					});
				})
			]),
			$new('div', {'id': 'DESU_updRes', 'style': 'font-size: 1.1em; text-align: center'}, null)
		]))
	]),
	
	cfgInfo = $New('div', {
		'Class': 'DESU_cfgBody',
		'id': 'DESU_cfgInfo'
	}, [
		$add('<div style="padding-left: 10px;"><div style="display: inline-block; vertical-align: top; width: 200px;"><b>' + Lng.version[lCode] + Cfg.version + '</b><br><br>' + Lng.storage[lCode] + (sav.GM ? 'Mozilla config' : sav.script ? 'Opera ScriptStorage' : sav.local ? 'Local Storage' : 'Cookies') + '<br>' + Lng.thrViewed[lCode] + Stat.view + '<br>' + Lng.thrCreated[lCode] + Stat.op + '<br>' + Lng.pstSended[lCode] + Stat.reply + '</div><div style="display: inline-block; vertical-align: top; padding-left: 17px; border-left: 1px solid grey;">' + timeLog.split('\n').join('<br>') + '<br>' + Lng.total[lCode] + endTime + 'ms</div><div style="text-align: center;"><a href="' + homePage + '" target="_blank">' + homePage + '</a></div></div>')
	]);
	
	$append($id('DESU_content'), [
		$New('div', {
			'Class': aib.pClass,
			'id': 'DESU_cfgWindow'
		}, [
			$new('div', {
				'id': 'DESU_cfgHead',
				'text': 'Dollchan Extension Tools'
			}, null),
			$New('div', {'id': 'DESU_cfgBar'}, [
				cfgTab(Lng.filters[lCode], cfgFilters),
				cfgTab(Lng.posts[lCode], cfgPosts),
				cfgTab(Lng.links[lCode], cfgLinks),
				cfgTab(Lng.form[lCode], cfgForm),
				cfgTab(Lng.common[lCode], cfgCommon),
				cfgTab(Lng.info[lCode], cfgInfo)
			]),
			$New('div', {'id': 'DESU_cfgBtns'}, [
				$New('div', {'style': 'float: right;'}, [
					optSel('lang', ['Ru', 'En'], '', function() {
						saveCfg('lang', this.selectedIndex);
						window.location.reload();
					}),
					$if(sav.isGlobal, $btn(Lng.load[lCode], Lng.loadGlobal[lCode], function() {
						if(isValidCfg(getStored('DESU_GlobalCfg'))) {
							setStored('DESU_Config_' + aib.dm, '');
							window.location.reload();
						} else {
							$alert(Lng.noGlobalCfg[lCode], '');
						}
					})),
					$if(sav.isGlobal, $btn(Lng.save[lCode], Lng.saveGlobal[lCode], function() {
						setStored('DESU_GlobalCfg', $uneval(Cfg));
						toggleContent('Cfg', true);
					})),
					$btn(Lng.edit[lCode], Lng.editCfg[lCode], function() {
						$disp($attr($id('DESU_cfgEdit'), {
							'value': getStored('DESU_Config_' + aib.dm)
						}).parentNode);
					}),
					$btn(Lng.reset[lCode], Lng.resetCfg[lCode], function() {
						setDefaultCfg();
						setStored('DESU_Stat_' + aib.dm, '');
						setStored('DESU_Favorites', '');
						setStored('DESU_Threads_' + aib.dm, '');
						saveSpells('');
						window.location.reload();
					})
				]),
				$new('br', {'style': 'clear: both;'}, null),
				$New('div', {'style': 'display: none;'}, [
					$new('textarea', {
						'id': 'DESU_cfgEdit',
						'rows': 10,
						'cols': 56,
						'value': ''
					}, null),
					$btn(Lng.save[lCode], Lng.saveChanges[lCode], function() {
						setStored('DESU_Config_' + aib.dm, $id('DESU_cfgEdit').value.trim());
						window.location.reload();
					})
				])
			])
		])
	]);
	openTab($c('DESU_cfgTab', doc), cfgFilters);
}

function addHiddenTable() {
	var pp, cln, i, b, tNum, url,
		clones = [],
		tcnt = 0,
		pcnt = 0,
		table = $t('tbody', $id('DESU_content'));
	forAll(function(post) {
		if(post.Vis !== 0) {
			return;
		}
		pp = !post.isOp;
		cln = $attr(($id('DESU_hidThr_' + post.Num) || post).cloneNode(true), {'id': ''});
		clones.push(cln);
		cln.style.display = '';
		cln.pst = post;
		cln.vis = 0;
		$event(pp ? $c('DESU_btnUnhide', doc) : $x('.//a', cln), {
			'click': function(el) {
				return function(e) {
					$pd(e);
					el.vis = el.vis === 0 ? 1 : 0;
					if(pp) {
						togglePost(el, el.vis);
					} else {
						el.nextElementSibling.style.display = el.vis === 1 ? '' : 'none';
					}
				}
			}(cln)
		});
		if(Cfg.attach === 0) {
			$event(aib.getRef(cln) || $x('.//a', cln), {
				'mouseover': function(el) {
					return function() {
						if(el.vis === 0) {
							if(pp) {
								togglePost(el, 1);
							} else {
								el.nextElementSibling.style.display = '';
							}
						}
					}
				}(cln),
				'mouseout': function(el) {
					return function() {
						if(el.vis === 0) {
							if(pp) {
								togglePost(el, 0);
							} else {
								el.nextElementSibling.style.display = 'none';
							}
						}
					}
				}(cln)
			});
		}
		$append(table, [
			$if(!pp && tcnt++ === 0 || pp && pcnt++ === 0, $New('tr', null, [
				$add('<b>' + (pp ? Lng.hiddenPosts[lCode] : Lng.hiddenThrds[lCode]) + Lng.onPage[lCode] + ':</b>')
			])),
			$New('tr', null, [
				cln,
				$if(!pp, $attr(post.cloneNode(true), {
					'style': 'display: none; padding-left: 15px; overflow: hidden; border: 1px solid grey;'
				}))
			])
		]);
		if(!pp) {
			togglePost(cln.nextElementSibling, 1);
		}
	});
	if(pcnt + tcnt === 0) {
		table.insertRow(-1).appendChild($add('<b>' + Lng.noHidOnPage[lCode] + '</b>'));
	} else {
		$append(table.insertRow(-1), [
			$btn(Lng.expandAll[lCode], '', function() {
				if(this.value === Lng.expandAll[lCode]) {
					this.value = Lng.undo[lCode];
					for(i = 0; cln = clones[i++];) {
						setPostVisib(cln.pst, 1);
					}
				} else {
					this.value = Lng.expandAll[lCode];
					for(i = 0; cln = clones[i++];) {
						setPostVisib(cln.pst, cln.vis);
					}
				}
			}),
			$btn(Lng.save[lCode], '', function() {
				for(i = 0; cln = clones[i++];) {
					if(cln.vis !== 0) {
						setPostVisib(cln.pst, 1);
					}
				}
				savePostsVisib();
			})
		]);
	}
	$append(table, [
		$New('tr', null, [
			$new('hr', null, null),
			$add('<b>' + (isEmptyObj(hThrds) ? Lng.noHidThrds[lCode] : Lng.hiddenThrds[lCode]) + '</b>')
		])
	]);
	if(!isEmptyObj(hThrds)) {
		for(b in hThrds) {
			$append(table, [
				$New('tr', {
					'Class': 'DESU_hidTHead',
					'id': 'DESU_hidTHead_' + b
				}, [
					$new('input', {
						'type': 'checkbox'}, {
						'click': function() {
							var inp = this;
							$each($X(
								'.//tr[contains(@id,"_' + inp.parentNode.id.substr(14) + '|")]/div/input',
								table
							), function(el) {
								el.checked = inp.checked;
							});
						}
					}),
					$add('<b>' + b + '</b>')
				])
			]);
			for(tNum in hThrds[b]) {
				if(sav.cookie) {
					tNum = hThrds[b][tNum];
				}
				url = getThrdUrl(aib.host, b, tNum);
				$append(table, [
					$New('tr', {
						'Class': 'DESU_hidTData',
						'id': 'DESU_hidTData_' + b + '|' + tNum
					}, [
						$New('div', {'Class': aib.pClass}, [
							$new('input', {'type': 'checkbox'}, null),
							$add('<a href="' + url + '" target="_blank">№' + tNum + '</a>'),
							$if(!sav.cookie, $txt(' - ' + hThrds[b][tNum]))
						])
					])
				]);
			}
		}
	}
	$append(table, [
		$New('tr', null, [
			$btn(Lng.edit[lCode], Lng.editNotes[lCode], function() {
				$disp($id('DESU_hidTEdit').parentNode);
			}),
			$btn(Lng.remove[lCode], Lng.clrSelected[lCode], function() {
				$each($X('.//tr[@class="DESU_hidTData"]', table), function(el) {
					var i,
						arr = el.id.substr(14).split('|'),
						b = arr[0],
						tNum = arr[1];
					if($t('input', el).checked) {
						if(pByNum[tNum]) {
							setPostVisib(pByNum[tNum], 1);
						} else if(sav.cookie) {
							i = hThrds[b].indexOf(tNum);
							if(i >= 0) {
								hThrds[b].splice(i, 1);
							}
						} else {
							Visib[b + tNum] = 1;
							delete hThrds[b][tNum];
						}
						if(isEmptyObj(hThrds[b])) {
							delete hThrds[b];
						}
					}
				});
				setStored('DESU_Threads_' + aib.dm, $uneval(hThrds));
				savePostsVisib();
			})
		]),
		$New('tr', {'style': 'display: none;'}, [
			$new('textarea', {
				'id': 'DESU_hidTEdit',
				'rows': 9,
				'cols': 70,
				'value': $uneval(hThrds)
			}, null),
			$btn(Lng.save[lCode], Lng.saveChanges[lCode], function() {
				saveHiddenThreads($id('DESU_hidTEdit').value);
			})
		])
	]);
	eventRefLink(table);
}

function addFavoritesTable() {
	var h, b, tNum, url, fav, list,
		table = $x('.//div[@id="DESU_content"]//tbody', doc);
	for(h in Favor) {
		for(b in Favor[h]) {
			$append(table, [
				$New('tr', {
					'Class': 'DESU_favHead',
					'id': 'DESU_favHead_' + h + '|' + b
				}, [
					$new('input', {
						'type': 'checkbox'}, {
						'click': function() {
							var inp = this;
							$each($X(
								'.//tr[contains(@id,"_' + inp.parentNode.id.substr(13) + '|")]/div/input',
								table
							), function(el) {
								el.checked = inp.checked;
							});
						}
					}),
					$add('<a href="http://' + h + '/' + b + '" target="_blank">' + h + '/' + b + '</a>')
				])
			]);
			for(tNum in Favor[h][b]) {
				url = getThrdUrl(h, b, tNum);
				fav = Favor[h][b][tNum];
				$append(table, [
					$New('tr', {
						'Class': 'DESU_favData',
						'id': 'DESU_favData_' + h + '|' + b + '|' + tNum
					}, [
						$New('div', {'Class': aib.pClass}, [
							$new('input', {'type': 'checkbox'}, null),
							$new('a', {
								'Class': 'DESU_btnExpthr',
								'href': '#"'}, {
								'click': loadFavorThread
							}),
							$add('<a href="' + url + '" target="_blank">№' + tNum + '</a>'),
							$txt(' - ' + fav.txt),
							$add('<span class="DESU_favPCount">[<span>' + fav.cnt + '</span>]</span>')
						]),
						$new('div', {
							'id': tNum,
							'Class': ' DESU_thread',
							'style': 'display: none;'
						}, null)
					])
				]);
			}
		}
	}
	if(!table.firstChild) {
		table.insertRow(-1).appendChild($add('<b>' + Lng.noFavorites[lCode] + '</b>'));
	}
	list = $X('.//tr[@class="DESU_favData"]', table);
	$append(table, [
		$New('tr', null, [
			$new('hr', null, null),
			$btn(Lng.edit[lCode], Lng.editNotes[lCode], function() {
				$disp($id('DESU_favEdit').parentNode);
			}),
			$btn(Lng.info[lCode], Lng.infoCount[lCode], function() {
				$each(list, function(el) {
					var c,
						arr = el.id.substr(13).split('|');
					if(aib.host === arr[0]) {
						c = $t('span', $c('DESU_favPCount', el));
						$attr(c, {
							'Class': 'DESU_icnWait',
							'text': ''
						});
						ajaxGetPosts(null, arr[1], arr[2], function(err) {
							var cnt = err || ajThrds[arr[1]][arr[2]].length;
							$attr(c, {
								'Class': '',
								'text': cnt
							});
							if(!err) {
								Favor[arr[0]][arr[1]][arr[2]].cnt = cnt;
								setStored('DESU_Favorites', $uneval(Favor));
							}
						});
					}
				});
			}),
			$btn(Lng.clear[lCode], Lng.clrDeleted[lCode], function() {
				$each(list, function(el) {
					var arr = el.id.substr(13).split('|');
					ajaxGetPosts(getThrdUrl(arr[0], arr[1], arr[2]), null, null, function(err) {
						if(err) {
							removeFavorites(arr[0], arr[1], arr[2]);
							saveFavorites($uneval(Favor));
						}
					});
				});
			}),
			$btn(Lng.remove[lCode], Lng.clrSelected[lCode], function() {
				$each(list, function(el) {
					var arr = el.id.substr(13).split('|');
					if($t('input', el).checked) {
						removeFavorites(arr[0], arr[1], arr[2]);
					}
				});
				saveFavorites($uneval(Favor));
			})
		]),
		$New('tr', {'style': 'display: none;'}, [
			$new('textarea', {
				'id': 'DESU_favEdit',
				'rows': 9,
				'cols': 70,
				'value': $uneval(Favor)
			}, null),
			$btn(Lng.save[lCode], Lng.saveChanges[lCode], function() {
				saveFavorites($id('DESU_favEdit').value);
			})
		])
	]);
}

/*-----------------------------Popup alert messages---------------------------*/

function $show(el) {
	var i, showing;
	if(Cfg.animp === 0) {
		el.style.opacity = 1;
		return;
	}
	if(nav.Firefox > 4 || nav.Chrome) {
		el.style.cssText = cssFix + 'animation: DESU_aOpen 0.2s 1 ease-out;';
		return;
	}
	i = 0;
	showing = setInterval(function() {
		var s;
		if(!el || i++ > 8) {
			clearInterval(showing);
			return;
		}
		s = el.style;
		s.opacity = i/10;
		s.paddingTop = parseInt(s.paddingTop, 10) + 1 + 'px';
		s.paddingBottom = parseInt(s.paddingBottom, 10) + 1 + 'px';
	}, 25);
}

function $close(el) {
	var i, h, closing;
	if(!el) {
		return;
	}
	if(Cfg.animp === 0) {
		$del(el);
		return;
	}
	if(nav.Firefox > 4 || nav.Chrome) {
		el.addEventListener(nav.Firefox ? 'animationend' : 'webkitAnimationEnd', function() {
			$del(el);
		}, false);
		el.style.cssText = cssFix + 'animation: DESU_aClose 0.2s 1 ease-in;';
		return;
	}
	i = 8;
	h = el.clientHeight - 18;
	el.style.height = h + 'px';
	closing = setInterval(function() {
		var s, hh;
		if(!el || i-- < 0) {
			clearInterval(closing);
			$del(el);
			return;
		}
		s = el.style;
		hh = parseInt(s.height, 10) - h/10;
		s.opacity = i/10;
		s.paddingTop = parseInt(s.paddingTop, 10) - 1 + 'px';
		s.paddingBottom = parseInt(s.paddingBottom, 10) - 1 + 'px';
		s.height = (hh < 0 ? 0 : hh) + 'px';
	}, 25);
}

function $alert(txt, id) {
	var el,
		nid = 'DESU_alert';
	if(id !== '') {
		nid += id;
		el = $id(nid);
	}
	if(el) {
		$c(nid, el).innerHTML = txt.trim();
	} else {
		el = $New('div', {
			'Class': aib.pClass,
			'id': nid,
			'style': 'opacity: 0; padding: 0 10px 5px 10px;'
		}, [
			$if(id !== 'Wait', $new('a', {
				'href': '#',
				'style': 'display: inline-block; vertical-align: top; font-size: 150%;',
				'text': '× '}, {
				'click': function(e) {
					$pd(e);
					$close(this.parentNode);
				}
			})),
			$new('div', {
				'style': 'display: inline-block; margin-top: 4px;',
				'Class': nid,
				'html': txt.trim()
			}, null)
		]);
	}
	$show($id('DESU_alertBox').appendChild(el));
	if(Cfg.aclose !== 0 && id !== 'Wait') {
		setTimeout(function() {
			$close(el);
		}, 4e3);
	}
}

/*------------------------------Dropdown select menus-------------------------*/

function removeSelMenu(e) {
	if(!$xb('ancestor-or-self::div[@id="DESU_select"]', e.relatedTarget)) {
		$del($id('DESU_select'));
	}
}

function addSelMenu(el, html) {
	var y, pos,
		pst = getPost(el),
		x = el.className === 'DESU_btnSrc'
			? 'left: ' + $offset(el).left
			: 'right: ' + (doc.body.clientWidth - $offset(el).left - el.offsetWidth);
	if(Cfg.attach !== 0 && $xb('ancestor::div[@id="DESU_content" or @id="DESU_panel"]', el)) {
		pos = 'fixed';
		y = el.id === 'DESU_btnRefresh'
			? 'bottom: 25'
			: 'top: ' + (el.getBoundingClientRect().top + el.offsetHeight);
	} else {
		pos = 'absolute';
		y = 'top: ' + ($offset(el).top + el.offsetHeight);
	}
	doc.body.appendChild($event($add(
		'<div class="' + aib.pClass + '" id="DESU_select" style="position: ' + pos
			+ '; width: auto; min-width: 0; ' + x + 'px; ' + y
			+ 'px; z-index: 9999; padding: 2px 5px; border: 1px solid grey;">' + html + '</div>'
	), {
		'mouseout': removeSelMenu,
		'mouseover': function() {
			if(pst && pst.node) {
				markPost(pst.node, false);
			}
		}
	}));
	return $X('.//div[@id="DESU_select"]//a', doc);
}

function selectSpell(e) {
	$each(addSelMenu(
		e.target,
		'<div style="display: inline-block; border-right: 1px solid grey;"><a href="#">'
			+ ('#b/,#b/itt,#exp ,#exph ,#img ,#imgn ,#name ,#noimg,#notxt,#num ,').split(',')
				.join('</a><a href="#">') + '</a></div><div style="display: inline-block;"><a href="#">'
			+ ('#op,#outrep,#rep ,#sage,#skip ,#theme ,#tmax ,#trip,#video ').split(',')
				.join('</a><a href="#">') + '</a></div>'
	), function(a) {
		$event(a, {
			'click': function(e) {
				var exp = this.textContent;
				$pd(e);
				if(exp === '#b/') {
					exp = '#' + brd + '/ ';
				}
				if(exp === '#b/itt') {
					if(TNum) {
						exp = '#' + brd + '/' + TNum + ' ';
					} else {
						return;
					}
				}
				insertInto($id('DESU_spellEdit'), exp);
			}
		});
	});
}

function selectPostHider(post) {
	if(Cfg.menuhd === 0 || Cfg.filthr === 0 && post.isOp) {
		return;
	}
	var a = addSelMenu(post.Btns.firstChild, '<a href="#">' + Lng.selHiderMenu[lCode].join('</a><a href="#">') + '</a>');
	$event(a.snapshotItem(0), {
		'click': function(e) {
			$pd(e);
			applySpells(quotetxt);
		},
		'mouseover': function() {
			quotetxt = txtSelection().trim();
		}
	});
	$event(a.snapshotItem(1), {
		'click': function(e) {
			$pd(e);
			applySpells(post.Img.snapshotLength === 0
				? '#noimg'
				: '#img =' + getImgWeight(post) + '@' + getImgSize(post).join('x')
			)
		}
	});
	$event(a.snapshotItem(2), {
		'click': function(e) {
			$pd(e);
			hideBySameText(post);
		}
	});
}

function selectExpandThread(post) {
	$each(addSelMenu(
		$x('a[3]', post.Btns),
		'<a href="#">' + Lng.selExpandThrd[lCode].join('</a><a href="#">') + '</a>'
	), function(a) {
		$event(a, {
			'click': function(e) {
				$pd(e);
				loadThread(post, parseInt(this.textContent, 10), null);
			}
		});
	});
}

function selectAjaxPages() {
	$each(addSelMenu(
		$id('DESU_btnRefresh'),
		'<a href="#">' + Lng.selAjaxPages[lCode].join('</a><a href="#">') + '</a>'
	), function(a, i) {
		$event(a, {
			'click': function(e) {
				$pd(e);
				loadPages(i + 1);
			}
		});
	});
}

function selectImgSearch(btn, href) {
	addSelMenu(btn,
		'<a class="DESU_srcIqdb" href="http://iqdb.org/?url=' + href
			+ '" target="_blank">' + Lng.search[lCode] + 'IQDB</a>'
		+ '<a class="DESU_srcTineye" href="http://tineye.com/search/?url=' + href
			+ '" target="_blank">' + Lng.search[lCode] + 'TinEye</a>'
		+ '<a class="DESU_srcGoogle" href="http://google.ru/searchbyimage?image_url=' + href
			+ '" target="_blank">' + Lng.search[lCode] + 'Google</a>'
		+ '<a class="DESU_srcSaucenao" href="http://saucenao.com/search.php?url=' + href
			+ '" target="_blank">' + Lng.search[lCode] + 'SauceNAO</a>'
	);
}

/*----------------------------Init navigation with keyboard-------------------*/

function addEvents(node) {
	$each($X('.//input[@type="text" or @type="password"]|.//textarea', node), function(el) {
		el.onfocus = function() {
			kIgnore = true;
		};
		el.onblur = function() {
			kIgnore = false;
		};
	});
}

function initKeyNavig() {
	var eT;
	if(!aib.nul) {
		addEvents(pr.form);
	} else {
		pr.form.addEventListener(nav.Opera ? 'DOMAttrModified' : 'DOMSubtreeModified', function(e) {
			if(eT) {
				clearTimeout(eT);
			}
			eT = setTimeout(function() {
				addEvents(pr.form);
			}, 200);
		}, false);
	}
	addEvents(dForm);
	window.onscroll = function() {
		if(!scrScroll) {
			scrollP = true;
			scrollT = true;
		} else {
			scrScroll = false;
		}
	};
	doc.onkeydown = function (e) {
		var curTh,
			kc = e.keyCode;
		if(kIgnore || e.ctrlKey || e.altKey || e.shiftKey 
			|| (kc !== 74 && kc !== 75 && kc !== 77 && kc !== 78 && kc !== 86)) {
			return;
		}
		$pd(e);
		if(scrollT) {
			cPIndex = !scrollP ? Posts.indexOf(tByCnt[cTIndex]) : findCurrPost(Posts);
		}
		if(!TNum && scrollP) {
			if((Posts[cPIndex] || {}).isOp) {
				cTIndex = curTh = tByCnt.indexOf(Posts[cPIndex]);
			} else if(scrollT) {
				for(curTh = cPIndex <= 0 ? 0 : cPIndex; curTh > 0 && !Posts[curTh].isOp; curTh--) {}
				cTIndex = curTh = tByCnt.indexOf(Posts[curTh]);
			} else {
				curTh = cTIndex;
			}
		} else {
			curTh = cTIndex;
		}
		scrollP = scrollT = false;
		if(kc === 86) {
			if(TNum) {
				showQuickReply(Posts[cPIndex]);
			} else if(nav.Firefox) {
				GM_openInTab(getThrdUrl(aib.host, brd, tByCnt[curTh].Num), false, true);
			} else {
				window.open(getThrdUrl(aib.host, brd, tByCnt[curTh].Num), '_blank');
			}
			return;
		}
		scrScroll = true;
		if(kc === 75) {
			if(TNum) {
				scrollUpToPost();
			} else {
				try {
					cTIndex = scrollToPost(tByCnt, cTIndex <= 0 ? 0 : cTIndex - 1, -1, true, true);
					scrollT = true;
				} catch(er) {}
			}
		} else if(kc === 74) {
			if(TNum) {
				scrollDownToPost();
			} else if(cTIndex !== tByCnt.length - 1) {
				try {
					cTIndex = scrollToPost(tByCnt, cTIndex + 1, 1, true, true);
					scrollT = true;
				} catch(er) {}
			}
		} else if(!TNum && kc === 77) {
			scrollUpToPost();
		} else if(!TNum && kc === 78) {
			scrollDownToPost();
		}
	};
}

function findCurrPost(posts) {
	for(var i = 0, scrolled = window.pageYOffset; i < posts.length; i++) {
		if($offset(posts[i]).top > scrolled) {
			return i - 1;
		}
	}
}

function scrollDownToPost() {
	if(cPIndex !== Posts.length - 1) {
		try {
			cPIndex = scrollToPost(Posts, cPIndex + 1, 1, Posts[cPIndex + 1].isOp
				|| Posts[cPIndex + 1].getBoundingClientRect().top > window.innerHeight/2
					- Posts[cPIndex + 1].clientHeight/2, false);
			scrollP = true;
		} catch(e) {}
	}
}

function scrollUpToPost() {
	try {
		cPIndex = scrollToPost(Posts, cPIndex <= 0 ? 0 : cPIndex - 1, -1, true, false);
		scrollP = true;
	} catch(e) {}
}

function scrollToPost(posts, idx, dir, scroll, toTop) {
	var post,
		mIdx = idx;
	while(posts[mIdx].Vis === 0 || posts[mIdx].thr.Vis === 0) {
		mIdx += dir;
	}
	post = posts[mIdx];
	if(mIdx !== idx || scroll) {
		window.scrollTo(0, toTop
			? $offset(post).top
			: $offset(post).top - window.innerHeight/2 + post.clientHeight/2
		);
	}
	idx = $c('DESU_selected', doc);
	if(idx) {
		idx.className = idx.oldClassName;
	}
	if(post.isOp) {
		post = post.thr;
	}
	post.oldClassName = post.className;
	post.className += ' DESU_selected';
	return mIdx;
}

/*--------------------------------Changes in postform-------------------------*/

function refreshCapSrc(src, tNum) {
	return aib.kus || aib._5ch
		? src.replace(/\?[^?]+$|$/, (aib._410 ? '?board=' + brd + '&' : '?') + Math.random())
		: tNum > 0 ? src.replace(/mainpage|res\d+/ig, 'res' + tNum)
		: src.replace(/dummy=\d*/, 'dummy=' + $rnd());
}

function refreshCapImg(tNum) {
	var src, e,
		img = pr.recap ? $id('recaptcha_image') || pr.cap : $x(pr.tr + '//img', pr.cap);
	if(aib.hana || pr.recap) {
		e = doc.createEvent('MouseEvents');
		e.initEvent('click', true, true);
		img.dispatchEvent(e);
	} else {
		src = refreshCapSrc(img.getAttribute('src'), tNum);
		img.src = '';
		img.src = src;
	}
}

function doSageBtn() {
	var c = Cfg.issage !== 0;
	$id('DESU_sageBtn').innerHTML = '&nbsp;' + (c
		? '<a class="DESU_btnSage" href="#"></a><b style="color: red;">SAGE</b>'
		: '<i>(no&nbsp;sage)</i>'
	);
	if(pr.mail.type === 'text') {
		pr.mail.value =
			c ? 'sage'
			: aib.fch ? 'noko'
			: '';
	} else {
		pr.mail.checked = c;
	}
}

function setUserName() {
	saveCfg('namval', $id('DESU_fixName').value.replace(/\|/g, ''));
	pr.name.value = $id('DESU_fixNameChk').checked ? Cfg.namval : '';
}

function setUserPassw() {
	var val,
		el = $id('DESU_pasval');
	if(el) {
		saveCfg('pasval', el.value.replace(/\|/g, ''));
	}
	val = Cfg.passw !== 0 ? Cfg.pasval : $rnd().substring(0, 8);
	el = $x('.//input[@type="password"]', dForm);
	if(el) {
		el.value = val;
	}
	pr.passw.value = val;
}

function doChanges() {
	var el;
	if(TNum) {
		if(Cfg.rtitle === 0) {
			docTitle = doc.title;
		} else {
			docTitle = '/' + brd + ' - ' + pByNum[TNum].thr.dTitle;
			doc.title = docTitle;
		}
		window.onblur = function() {
			doc.body.className = 'blurred';
		};
		window.onfocus = function() {
			doc.body.className = 'focused';
			if(Cfg.updfav !== 0 && favIcon) {
				clearInterval(favIconTimeout);
				$Del('.//link[@rel="shortcut icon"]', doc.head);
				doc.head.appendChild($new('link', {
					'href': favIcon,
					'rel': 'shortcut icon'
				}, null));
			}
			if(Cfg.updthr === 1) {
				setTimeout(function() {
					doc.title = docTitle;
				}, 0);
			}
		};
		initPostsUpdate();
		if(Cfg.updthr === 2 || Cfg.updthr === 3) {
			$after($x('.//div[contains(@class," DESU_thread")]', doc), $event($add(
				'<span id="DESU_getNewPosts">[<a href="#">' + Lng.getNewPosts[lCode] + '</a>]</span>'
			), {
				'click': function(e) {
					$pd(e);
					loadNewPosts(true, null);
				}
			}));
		}
	} else {
		setTimeout(function() {
			window.scrollTo(0, 0);
		}, 50);
	}
	if(aib.abu) {
		$Del('.//div[@class="ABU_refmap"]', dForm);
		if(TNum && (el = $c('DESU_thread', dForm))) {
			$Del('following-sibling::node()', el);
			$after(el, $new('hr', null, null));
		}
		if(el = $x('.//input[@name="makewatermark"]', pr.form)) {
			el.checked = false;
			el.style.display = 'none';
		}
	} else {
		if(aib.brit) {
			$each($X('.//span[@class="reflink"]', dForm), function(el) {
				var a = el.firstChild;
				$rattr(a, 'onclick');
				a.href = getThrdUrl(aib.host, brd, a.textContent);
				a.target = '_blank';
			});
		}
		$event(window, {
			'load': function() {
				setTimeout(function() {
					if(aib.nul) {
						$Del('.//div[@class="replieslist"]', dForm);
					} else {
						$Del('.//small[starts-with(@id,"rfmap")]|.//i[@class="abbrev"]', dForm);
					}
				}, 0);
			}
		});
	}
	if(aib.fch && !TNum) {
		$each($X('.//table[@class="pages"]//form', doc), function(el) {
			el.nextElementSibling.appendChild($attr(el, {'style': 'margin-bottom: 0;'}));
			el.appendChild(el.previousElementSibling);
		});
	}
	qArea = $new('div', {
		'id': 'DESU_qarea',
		'Class': aib.pClass,
		'style': 'display: none;'
	}, null);
	pArea = $New('center', {'id': 'DESU_parea'}, [
		$New('div', {
			'id': 'DESU_toggleReply',
			'style': 'display: none;'
		}, [
			$txt('['),
			$new('a', {
				'text': Lng.expandForm[lCode], href: '#'}, {
				'click': toggleMainReply
			}),
			$txt(']')
		]),
		$New('div', {'id': 'DESU_pform'}, [pr.form, oeForm]),
		$new('hr', null, null)
	]);
	if(TNum && Cfg.pform === 2 || !TNum && Cfg.tform !== 0) {
		$disp(pArea);
	}
	if(TNum && Cfg.pform === 1) {
		$after(aib.fch ? $t('hr', dForm) : dForm, pArea);
	} else {
		$before(dForm, [pArea]);
	}
	if(pr.on) {
		doPostformChanges();
	} else if(oeForm) {
		ajaxGetPosts(null, brd, Posts[0].Num, doPostformChanges);
	}
}

function doPostformChanges() {
	var img, src, _img, sageBtn, m, load,
		el = pr.txta,
		resMove = function(e) {
			el.style.width = e.pageX - $offset(el).left + 'px';
			el.style.height = e.pageY - $offset(el).top + 'px';
		},
		resStop = function() {
			$revent(doc.body, {'mousemove': resMove, 'mouseup': resStop});
			saveCfg('texw', parseInt(el.style.width, 10));
			saveCfg('texh', parseInt(el.style.height, 10));
		};
	pr.form.style.display = 'inline-block';
	pr.form.style.textAlign = 'left';
	if(!aib.fch && pr.subm.nextSibling) {
		$delNx(pr.subm);
	}
	addTextPanel();
	$after(el, $new('div', {
		'id': 'DESU_txtResizer'}, {
		'mousedown': function(e) {
			$pd(e);
			$event(doc.body, {
				'mousemove': resMove,
				'mouseup': resStop
			});
		}
	}));
	el.style.cssText = 'width: ' + Cfg.texw + 'px; height: ' + Cfg.texh + 'px;';
	$event(el, {
		'keypress': function(e) {
			var code = e.charCode || e.keyCode;
			if((code === 33 || code === 34) && e.which === 0) {
				e.target.blur();
				window.focus();
			}
		}
	});
	$event(pr.subm, {
		'click': function(e) {
			var txt = pr.txta.value;
			pr.txta.value =
				(Cfg.spells === 0 || !oSpells.outrep[0] ? txt : doReplace(oSpells.outrep, txt))
				+ (Cfg.sign !== 0 && Cfg.sigval !== '' ? '\n' + Cfg.sigval : '');
			if(Cfg.verify !== 0) {
				$alert(Lng.checking[lCode], 'Wait');
			}
			if(Cfg.addfav !== 0 && pr.tNum) {
				toggleFavorites(pByNum[pr.tNum], $c('DESU_btnFav', pByNum[pr.tNum].Btns));
			}
			if(pr.tNum) {
				Stat.reply = +Stat.reply + 1;
			} else {
				Stat.op = +Stat.op + 1;
			}
			setStored('DESU_Stat_' + aib.dm, $uneval(Stat));
			if(aib.nul && pr.isQuick) {
				$disp(qArea);
				$after($id('DESU_toggleReply'), $id('DESU_pform'));
			}
		}
	});
	$each($X('.//input[@type="text"]', pr.form), function(el) {
		el.size = 35;
	});
	if(Cfg.nogoto !== 0 && pr.gothr) {
		$disp(pr.gothr);
	}
	if(Cfg.nopass !== 0 && pr.passw) {
		$disp($x(pr.tr, pr.passw));
	}
	if(Cfg.name !== 0 && pr.name) {
		setTimeout(function() {
			pr.name.value = Cfg.namval;
		}, 0);
	}
	if(pr.passw) {
		setTimeout(setUserPassw, 0);
	}
	if(pr.recap) {
		$attr(pr.subm, {'onclick': 'Recaptcha.focus_response_field = function() {}'});
		el = $id('recaptcha_image');
		if(el) {
			$attr(el, {
				'onclick': 'Recaptcha.reload()',
				'style': 'width: 300px; cursor: pointer;'
			});
		}
		el = $id('recaptcha_reload_btn');
		if(el) {
			$disp(el.parentNode);
		}
	}
	if(pr.cap) {
		setTimeout(function() {
			if(aib.abu) {
				refreshCapImg(0);
				$rattr(pr.cap, 'onclick');
			}
		}, 0);
		$rattr(pr.cap, 'onfocus');
		$rattr(pr.cap, 'onkeypress');
		$event($attr(pr.cap, {
			'autocomplete': 'off'}), {
			'keypress': function(e) {
				var code = e.charCode || e.keyCode,
					chr = String.fromCharCode(code).toLowerCase(),
					ru = 'йцукенгшщзхъфывапролджэячсмитьбюё',
					en = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`',
					i = en.length;
				if(Cfg.forcap === 0 || e.which === 0) {
					return;
				}
				if(Cfg.forcap === 1) {
					if(code < 0x0410 || code > 0x04FF) {
						return;
					}
					while(i--) {
						if(chr === ru[i]) {
							chr = en[i];
						}
					}
				} else {
					if(code < 0x0021 || code > 0x007A) {
						return;
					}
					while(i--) {
						if(chr === en[i]) {
							chr = ru[i];
						}
					}
				}
				$pd(e);
				insertInto(e.target, chr);
			}
		});
		if(!aib.hana && !pr.recap) {
			if(aib.kus) {
				img = $x('.//a|.//img', $x(pr.tr, pr.cap));
				src =
					aib._410 ? ('/faptcha.php?board=' + brd)
					: aib.hid ? ('/securimage/securimage_show.php?' + Math.random())
					: '/' + brd.substr(0, brd.indexOf('/') + 1) + 'captcha.php?' + Math.random();
			} else {
				img = $x(pr.tr + '//img', pr.cap);
				src = img ? img.src : '/' + brd + '/captcha.pl?key=mainpage&amp;dummy=' + $rnd();
			}
			_img = $new('img', {
				'alt': Lng.loading[lCode],
				'title': Lng.refresh[lCode],
				'style': 'display: block; border: none; cursor: pointer;',
				'src': refreshCapSrc(src, TNum || 0)}, {
				'click': function() {
					refreshCapImg(TNum || 0);
				}
			});
			if(img) {
				img.parentNode.replaceChild(_img, img);
			} else {
				$delNx(pr.cap);
				$after(pr.cap, _img);
			}
		}
	}
	if(Cfg.sagebt !== 0 && pr.mail) {
		sageBtn = $new('span', {
			'id': 'DESU_sageBtn'}, {
			'click': function(e) {
				e.stopPropagation();
				$pd(e);
				toggleCfg('issage');
				doSageBtn();
			}
		});
		m = $x('ancestor::label', pr.mail) || pr.mail;
		if(m.nextElementSibling || m.previousElementSibling) {
			$disp(m);
			$after(m, sageBtn);
		} else {
			$disp($x(pr.tr, pr.mail));
			$after(pr.name || pr.subm, sageBtn);
		}
		setTimeout(doSageBtn, 0);
	}
	if(Cfg.verify !== 0) {
		if(nav.Firefox > 3 || nav.Chrome) {
			pr.form.onsubmit = function(e) {
				$pd(e);
				setTimeout(function() {
					prepareData(function(fd) {
						ajaxCheckSubmit(pr.form, fd, checkUpload);
					});
				}, 1e3);
			};
			dForm.onsubmit = function(e) {
				$pd(e);
				$alert(Lng.deleting[lCode], 'Wait');
				$each($X('.//input[@type="checkbox"]', dForm), function(el) {
					el.onclick = function() {
						return false;
					}
				});
				ajaxCheckSubmit(dForm, new FormData(dForm), checkDelete);
			};
		} else {
			if(aib.nul) {
				pr.form.action = pr.form.action.replace(/https/, 'http');
			}
			load = nav.Opera ? 'DOMFrameContentLoaded' : 'load';
			$after($id('DESU_content'), $event($add(
				'<iframe name="DESU_iframe" id="DESU_iframe" src="about:blank" />'
			), {
				load: function() {
					setTimeout(iframeCheckSubmit, 500);
				}
			}));
			$rattr($attr(pr.form, {'target': 'DESU_iframe'}), 'onsubmit');
		}
	}
}

/*-------------------------------Onsubmit reply check-------------------------*/

function ajaxCheckSubmit(form, fd, fn) {
	GM_xmlhttpRequest({
		method: form.method,
		headers: nav.Firefox ? {Referer: '' + doc.location} : null,
		data: fd,
		url: form.action,
		onreadystatechange: function(xhr) {
			if(xhr.readyState === 4) {
				if(xhr.status === 200) {
					fn(HTMLtoDOM(xhr.responseText), xhr.finalUrl);
				} else {
					$close($id('DESU_alertWait'));
					$alert(xhr.status === 0 ? Lng.noConnect[lCode] : 'HTTP [' + xhr.status + '] ' + xhr.statusText, '');
				}
			}
		}
	});
}

function iframeCheckSubmit() {
	var frm = $id('DESU_iframe');
	try {
		frm = frm.contentDocument;
		if(!frm || !frm.body || !frm.body.innerHTML) {
			return;
		}
	} catch(e) {
		$close($id('DESU_alertWait'));
		$alert('Iframe load error:\n' + e, '');
		return;
	}
	checkUpload(frm, '' + frm.location);
	frm.location.replace('about:blank');
}

function checkUpload(dc, url) {
	var err, tNum,
		txt = '',
		pathname = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/)[5],
		xp =
			aib.hana && /error/.test(pathname) ? './/td[@class="post-error"]'
			: aib.krau && pathname === '/post' ? './/td[starts-with(@class,"message_text")]'
			: aib.abu && !dc.getElementById('delform') ? './/font[@size="5"]'
			: '';
	if(xp || !$t('form', dc)) {
		if(!xp) {
			xp =
				aib.kus ? './/h1|.//h2|.//div[contains(@style,"1.25em")]'
				: aib.fch ? './/table//font/b'
				: aib.gazo ? './/font[@size="5"]'
				: '';
		}
		if(xp) {
			$each(dc.evaluate(xp, dc, null, 6, null), function(el) {
				txt += el.innerHTML + '\n';
			});
		} else {
			xp = $t('h2', dc) || $t('h1', dc);
			if(xp) {
				txt = xp.innerHTML.replace(/<br.*/i, '');
			}
		}
		err = txt !== '' ? txt : Lng.error[lCode] + '\n' + dc.body.innerHTML;
		if(/обновл|successful!|uploaded!/i.test(err)) {
			err = undefined;
		}
	}
	if(err) {
		if(aib.nul && pr.isQuick) {
			$disp(qArea);
			qArea.appendChild($id('DESU_pform'));
		}
		$close($id('DESU_alertWait'));
		$alert(err, '');
	} else {
		pr.txta.value = '';
		if(pr.file) {
			pr.file = $x('.//input[@type="file"]', $html($x(pr.tr, pr.file), $x(pr.tr, pr.file).innerHTML));
		}
		if(pr.tNum) {
			tNum = pr.tNum;
			showMainReply();
			if(!TNum) {
				loadThread(pByNum[tNum], 5, null);
			} else {
				loadNewPosts(true, null);
			}
			if(pr.cap) {
				pr.cap.value = '';
				refreshCapImg(tNum);
			}
		} else {
			window.location = !aib.fch ? url : $t('meta', dc).content.match(/http:\/\/[^"]+/)[0];
		}
	}
}

function checkDelete(dc, url) {
	var allDel = true,
		cbFunc = function() {
			$each($X('.//input[@type="checkbox"]', dForm), function(el) {
				if(el.checked && !getPost(el).isDel) {
					allDel = false;
				}
				el.checked = false; el.onclick = null;
			});
			$alert(allDel ? Lng.succDeleted[lCode] : Lng.errDelete[lCode], '');
		};
	if(pr.tNum) {
		if(!TNum) {
			loadThread(pByNum[pr.tNum], 5, cbFunc);
		} else {
			loadNewPosts(true, cbFunc);
		}
	} else {
		$close($id('DESU_alertWait'));
	}
}

function prepareData(fn) {
	if(!Cfg.rndimg) {
		fn(new FormData(pr.form));
		return;
	}
	var fd = new FormData(),
		done = false,
		ready = 0,
		rNeeded = 0,
		i = 0,
		arr = [],
		cb = function() {
			if(done && ready === rNeeded) {
				for(ready = i, i = 0; i < ready; i++) {
					if(arr[i]) {
						fd.append(arr[i].name, arr[i].val);
					}
				}
				fn(fd);
			}
		};
	$each($X('.//input[not(@type="submit")]|.//textarea', pr.form), function(el) {
		if(el.type === 'file') {
			prepareFiles(el, function(idx, blob) {
				if(blob != null) {
					arr[idx] = {name: el.name, val: blob};
				}
				ready++;
				cb();
			}, i);
			rNeeded++;
		} else if(!(el.type === 'checkbox' && !el.checked)) {
			arr[i] = {name: el.name, val: el.value};
		}
		i++;
	});
	done = true;
	cb();
}

function prepareFiles(el, fn, i) {
	var fr = new FileReader(),
		file = el.files[0];
	if(el.files.length === 0 || !/^image\/(?:png|jpeg)$/.test(file.type)) {
		fn(i, file);
		return;
	}
	fr.readAsArrayBuffer(file);
	fr.onload = function() {
		if(nav.Firefox < 13) {
			var bb = nav.Firefox ? new MozBlobBuilder() : new WebKitBlobBuilder();
			bb.append(this.result);
			bb.append(String(Math.round(Math.random()*1e6)));
			fn(i, bb.getBlob(file.type));
		} else {
			fn(i, new Blob([this.result, String(Math.round(Math.random()*1e6))], {type: file.type}));
		}
	};
}

/*------------------------------Quick Reply under post------------------------*/

function showQuickReply(post) {
	var tNum = post.thr.Num;
	pr.isQuick = true;
	pr.tNum = tNum;
	if(qArea.hasChildNodes()) {
		if(post.nextElementSibling === qArea) {
			$disp(qArea);
			showMainReply();
			return;
		}
	} else {
		qArea.appendChild($id('DESU_pform'));
		$disp($id('DESU_toggleReply'));
		$disp(qArea);
		if(!TNum && !aib.kus && !aib.hana) {
			$del($x('.//input[@id="thr_id" or @name="parent"]', pr.form));
			$before(pr.form.firstChild, [
				$add('<input type="hidden" id="thr_id" value="' + tNum + '" name="' + (
					aib.fch || aib.gazo ? 'resto'
					: aib.tiny ? 'thread'
					: 'parent'
				) + '">')
			]);
		}
	}
	$after($x('ancestor::table', post) || post, qArea);
	if(!TNum && Cfg.tform !== 0) {
		pArea.style.display = 'none';
	}
	qArea.style.display = 'block';
	if(pr.cap && !pr.recap && !aib.kus) {
		refreshCapImg(tNum);
	}
	if(!TNum) {
		toggleQuickReply(tNum);
	}
	if(aib._420 && pr.txta.value === 'Comment') {
		pr.txta.value = '';
	}
	insertInto(pr.txta, '>>' + post.Num + quotetxt.replace(/(^|\n)(.)/gm, '\n>$2') + '\n');
}

function showMainReply() {
	var el = $id('DESU_toggleReply');
	if(pr.isQuick) {
		pr.isQuick = false;
		if(!TNum) {
			toggleQuickReply(0);
			$del($x('.//input[@id="thr_id"]', pr.form));
		}
		$disp(el);
		qArea.style.display = 'none';
		$after(el, $id('DESU_pform'));
	}
}

function toggleQuickReply(tNum) {
	$x('.//input[@id="thr_id" or @name="thread_id" or @name="replythread"]', pr.form).value = tNum;
	if(aib.pony) {
		$x('.//input[@name="quickreply"]', pr.form).value = tNum || '';
	}
}

function toggleMainReply(e) {
	$pd(e);
	if(pr.isQuick) {
		pArea.style.display = '';
		showMainReply();
	} else {
		$disp(pArea);
	}
	$focus(pArea);
}

function insertRefLink(e) {
	var pNum = getPost(e.target).Num;
	if(!/Reply|Ответ/.test(e.target.textContent)) {
		e.stopPropagation(); $pd(e);
		if(!TNum && Cfg.tform !== 0 && !pr.isQuick) {
			pArea.style.display = '';
		}
		if(TNum && Cfg.pform === 2 && !pr.isQuick) {
			showQuickReply(pByNum[pNum]);
		} else {
			if(aib._420 && pr.txta.value === 'Comment') {
				pr.txta.value = '';
			}
			insertInto(pr.txta, '>>' + pNum);
		}
	}
}

/*-----------------------------Text formatting buttons------------------------*/

function tfBtn(id, title, wktag, bbtag, val) {
	var x = pr.txta,
		btn = $new('span', {'id': id, 'title': title}, null);
	if(Cfg.txtbtn === 2) {
		btn.innerHTML = '<a href="#">' + val + '</a>' + (val !== '&gt;' ? ' / ' : '');
	}
	if(Cfg.txtbtn === 3) {
		btn.innerHTML = '<input type="button" value="' + val + '" style="font-weight: bold;" />';
	}
	if(val !== '&gt;') {
		$event(btn, {
			'click': function(e) {
				var tag1, tag2, j, len,
					start = x.selectionStart,
					end = x.selectionEnd,
					scrtop = x.scrollTop,
					text = x.value.substring(start, end).split('\n'),
					i = text.length;
				$pd(e);
				if(aib.kus || aib.abu || aib.krau || aib._420 || aib.fch && wktag === '%%') {
					tag1 = '[' + bbtag + ']';
					tag2 = '[/' + bbtag + ']';
				} else {
					tag1 = tag2 = wktag;
				}
				while(i--) {
					if(tag1 === '') {
						j = text[i].trim().length;
						while(j--) {
							tag2 += '^H';
						}
					}
					len = end + tag1.length + tag2.length;
					if(text[i].match(/^\s+/)) {
						tag1 = text[i].match(/^\s+/)[0] + tag1;
					}
					if(text[i].match(/\s+$/)) {
						tag2 += text[i].match(/\s+$/)[0];
					}
					text[i] = tag1 + text[i].trim() + tag2;
				}
				x.value = x.value.substr(0, start) + text.join('\n') + x.value.substr(end);
				x.setSelectionRange(len, len);
				x.focus();
				x.scrollTop = scrtop;
			}
		});
	} else {
		$event(btn, {
			'mouseover': function() {
				quotetxt = txtSelection();
			},
			'click': function(e) {
				var start = x.selectionStart,
					end = x.selectionEnd;
				$pd(e);
				insertInto(x,
					'> ' + (start === end ? quotetxt: x.value.substring(start, end)).replace(/\n/gm, '\n> ')
				);
			}
		});
	}
	return btn;
}

function addTextPanel() {
	$del($id('DESU_txtPanel'));
	if(Cfg.txtbtn !== 0 && pr.txta) {
		$after(aib._420 ? $c('popup', pr.form) : pr.subm, $New('span', {'id': 'DESU_txtPanel'}, [
			$txt(unescape('%u00A0')),
			$if(Cfg.txtbtn === 2, $txt('[ ')),
			tfBtn('DESU_btnBold', Lng.bold[lCode], '**', aib._420 ? '**' : 'b', 'B'),
			tfBtn('DESU_btnItalic', Lng.italic[lCode], '*', aib._420 ? '*' : 'i', 'i'),
			$if(!aib._420, tfBtn('DESU_btnUnder', Lng.underlined[lCode], '__', 'u', 'U')),
			$if(!aib._420, tfBtn('DESU_btnStrike', Lng.strike[lCode], aib._410 ? '^^' : '', 's', 'S')),
			tfBtn('DESU_btnSpoiler', Lng.spoiler[lCode], '%%', aib._420 ? '%' : 'spoiler', '%'),
			tfBtn('DESU_btnCode', Lng.code[lCode], '`', aib.krau ? 'aa' : aib._420 ? 'pre' : 'code', 'C'),
			tfBtn('DESU_btnQuote', Lng.quote[lCode], '', '', '&gt;'),
			$if(Cfg.txtbtn === 2, $txt(' ]'))
		]));
	}
}

/*---------------------------------Time correction-----------------------------*/

function toggleTimeSettings() {
	var el = $id('DESU_ctime');
	if(el.checked && (!/^[+-]\d{1,2}$/.test(Cfg.ctmofs) || !parseTimePattern())) {
		$alert(Lng.cTimeError[lCode], '');
		saveCfg('ctime', 0);
		el.checked = false;
	}
}

function parseTimePattern() {
	if(/[^\?\-\+sihdmny]|mm/.test(Cfg.ctmpat)) {
		return false;
	}
	timeRegex = Cfg.ctmpat.replace(/\-/g, '[^<]').replace(/\+/g, '[^0-9]').replace(/([sihdny]+)/g, '($1)')
		.replace(/[sihdny]/g, '\\d').replace(/\m/g, '([a-zA-Zа-яА-Я]+)');
	timePattern = Cfg.ctmpat.replace(/[\?\-\+]+/g, '').replace(/([a-z])\1+/g, '$1');
	return true;
}

function fixTime(txt) {
	var a, t, second, minute, hour, day, month, year, dtime;
	return txt.replace(new RegExp(timeRegex, 'g'), function(str, a1, a2, a3, a4, a5, a6) {
		for(var i = 0, arr = [a1, a2, a3, a4, a5, a6]; i < 6; i++) {
			a = arr[i];
			t = timePattern[i];
			t === 's' ? second = a
			: t === 'i' ? minute = a
			: t === 'h' ? hour = a
			: t === 'd' ? day = a
			: t === 'n' ? month = a - 1
			: t === 'y' ? year = a
			: t === 'm' && (month =
				/янв|jan/i.test(a) ? 0
				: /фев|feb/i.test(a) ? 1
				: /мар|mar/i.test(a) ? 2
				: /апр|apr/i.test(a) ? 3
				: /май|may/i.test(a) ? 4
				: /июн|jun/i.test(a) ? 5
				: /июл|jul/i.test(a) ? 6
				: /авг|aug/i.test(a) ? 7
				: /сен|sep/i.test(a) ? 8
				: /окт|oct/i.test(a) ? 9
				: /ноя|nov/i.test(a) ? 10
				: /дек|dec/i.test(a) && 11
			);
		}
		dtime = new Date(year.length === 2 ? '20' + year : year, month, day, hour, minute, second);
		dtime.setHours(dtime.getHours() + parseInt(Cfg.ctmofs, 10));
		return dtime.toString().replace(/GMT.*$/, '');
	});
}

/*----------------------------Append CSS for elements-------------------------*/

function scriptCSS() {
	var x = [],
		p = 'background: ' + (Cfg.sstyle === 0
			? 'url( data:image/gif;base64,R0lGODlhAQAZAMQAABkqTSRDeRsxWBcoRh48axw4ZChOixs0Xi1WlihMhRkuUQwWJiBBcSpTkS9bmxAfNSdKgDJfoQ0YKRElQQ4bLRAjOgsWIg4fMQsVHgAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAQAZAEAFFWDETJghUAhUAM/iNElAHMpQXZIVAgA7)'
			: '#777'
		) + '; ',
		gif = function(nm, src) {
			x.push(nm + ' { background: url(data:image/gif;base64,' + src + ') no-repeat center !important; }');
		},
		brCssFix = nav.Firefox > 3 ? '' : cssFix;

	// Settings window
	x.push(
		'#DESU_cfgWindow { float: left; ' + brCssFix + 'border-radius: 10px 10px 0 0; width: auto; min-width: 0; padding: 0; margin: 5px 20px; overflow: hidden; }\
		#DESU_cfgHead { padding: 3px; ' + p + 'color: #fff; text-align: center; font: bold 14px arial; cursor: default; }\
		.DESU_cfgBody { min-width: 412px; min-height: 250px; padding: 11px 7px 7px; margin-top: -1px; font: 13px sans-serif; }\
		.DESU_cfgBody input[value=">"] { width: 20px; }\
		.DESU_cfgBody, #DESU_cfgBtns { border: 1px solid #555; border-top: none; }\
		#DESU_cfgBtns { padding: 7px 2px 2px; }\
		#DESU_cfgBar { height: 25px; padding-top: 3px; width: 100%; display: table; background-color: ' + (Cfg.sstyle === 0 ? '#0c1626' : '#777') + '; }\
		.DESU_cfgTab, .DESU_cfgTab_sel { padding: 4px 9px; border: 1px solid #555; ' + brCssFix + 'border-radius: 4px 4px 0 0; font: bold 14px arial; text-align: center; cursor: default; }\
		.DESU_cfgTab { background-color: rgba(0,0,0,.2); }\
		.DESU_cfgTab:hover { background-color: rgba(99,99,99,.2); }\
		.DESU_cfgTab_sel { border-bottom: none; }\
		.DESU_cfgTabBack { display: table-cell !important; float: none !important; min-width: 0; padding: 0 !important; box-shadow: none !important; border: none !important; ' + brCssFix + 'border-radius: 4px 4px 0 0; }\
		#DESU_spellPanel { float: right; }\
		#DESU_spellPanel a { padding: 0 7px; text-align: center; }'
	);

	// Main panel
	x.push(
		'#DESU_panel { ' + (Cfg.attach === 0 ? 'float: right;' : 'position: fixed; right: 0; bottom: 0;') + ' height: 25px; z-index: 9999; ' + p + brCssFix + 'border-radius: 15px 0 0 0; cursor: default; }\
		#DESU_panel a { display: inline-block; padding: 0 25px 25px 0; margin: 0 1px 0 1px; border: none; ' + brCssFix + 'border-radius: 5px; }\
		#DESU_panelBtns { display: inline-block; padding: 0 3px; margin-left: 4px; border-left: 1px solid ' + (Cfg.sstyle === 0 ? '#79c' : '#ccc') + '; }\
		#DESU_panelBtns a:hover { padding: 0 21px 21px 0 !important; border: 2px solid ' + (Cfg.sstyle === 0 ? '#9be' : '#444') + '; }\
		#DESU_panelInfo { display: inline-block; height: 25px; vertical-align: top; padding: 2px 4px 0 6px; border-left: 1px solid ' + (Cfg.sstyle === 0 ? '#79c' : '#ccc') + '; color: #fff; font: 18px serif; }'
	);
	if(Cfg.icount === 0) {
		x.push('#DESU_panelInfo { display: none; }');
	}
	if(Cfg.showmp === 0) {
		x.push('#DESU_panelBtns, #DESU_panelInfo { display: none; }');
	}
	p = 'R0lGODlhGQAZAIAAAPDw8P///yH5BAEAAAEALAAAAAAZABkAQA';
	gif('#DESU_btnLogo', p + 'I5jI+pywEPWoIIRomz3tN6K30ixZXM+HCgtjpk1rbmTNc0erHvLOt4vvj1KqnD8FQ0HIPCpbIJtB0KADs=');
	gif('#DESU_btnSettings', p + 'JAjI+pa+API0Mv1Ymz3hYuiQHHFYjcOZmlM3Jkw4aeAn7R/aL6zuu5VpH8aMJaKtZR2ZBEZnMJLM5kIqnP2csUAAA7');
	gif('#DESU_btnHidden', p + 'I5jI+pa+CeHmRHgmCp3rxvO3WhMnomUqIXl2UmuLJSNJ/2jed4Tad96JLBbsEXLPbhFRc8lU8HTRQAADs=');
	gif('#DESU_btnFavor', p + 'IzjI+py+AMjZs02ovzobzb1wDaeIkkwp3dpLEoeMbynJmzG6fYysNh3+IFWbqPb3OkKRUFADs=');
	gif('#DESU_btnRefresh', p + 'JAjI+pe+AfHmRGLkuz3rzN+1HS2JWbhWlpVIXJ+roxSpr2jedOBIu0rKjxhEFgawcCqJBFZlPJIA6d0ZH01MtRCgA7');
	gif('#DESU_btnGoback', p + 'IrjI+pmwAMm4u02gud3lzjD4biJgbd6VVPybbua61lGqIoY98ZPcvwD4QUAAA7');
	gif('#DESU_btnGonext', p + 'IrjI+pywjQonuy2iuf3lzjD4Zis0Xd6YnQyLbua61tSqJnbXcqHVLwD0QUAAA7');
	gif('#DESU_btnGoup', p + 'IsjI+pm+DvmDRw2ouzrbq9DmKcBpVfN4ZpyLYuCbgmaK7iydpw1OqZf+O9LgUAOw==');
	gif('#DESU_btnGodown', p + 'ItjI+pu+DA4ps02osznrq9DnZceIxkYILUd7bue6WhrLInLdokHq96tnI5YJoCADs=');
	gif('#DESU_btnNewthr', p + 'IyjI+pG+APQYMsWsuy3rzeLy2g05XcGJqqgmJiS63yTHtgLaPTY8Np4uO9gj0YbqM7bgoAOw==');
	gif('#DESU_btnExpimg', p + 'I9jI+pGwDn4GPL2Wep3rxXFEFel42mBE6kcYXqFqYnVc72jTPtS/KNr5OJOJMdq4diAXWvS065NNVwseehAAA7');
	gif('#DESU_btnMaskimg', p + 'JQjI+pGwD3TGxtJgezrKz7DzLYRlKj4qTqmoYuysbtgk02ZCG1Rkk53gvafq+i8QiSxTozIY7IcZJOl9PNBx1de1Sdldeslq7dJ9gsUq6QnwIAOw==');
	if(aib.nul) {
		gif('#DESU_btnCatalog', p + 'I2jI+pa+DhAHyRNYpltbz7j1Rixo0aCaaJOZ2SxbIwKTMxqub6zuu32wP9WsHPcFMs0XDJ5qEAADs=');
	}
	p = 'Dw8P///wAAACH5BAEAAAIALAAAAAAZABkAQAJElI+pe2EBoxOTNYmr3bz7OwHiCDzQh6bq06QSCUhcZMCmNrfrzvf+XsF1MpjhCSainBg0AbKkFCJko6g0MSGyftwuowAAOw==';
	gif('#DESU_btnUpdOn', 'R0lGODlhGQAZAJEAADL/Mv' + p);
	gif('#DESU_btnUpdOff', 'R0lGODlhGQAZAJEAAP8yMv' + p);
	gif('#DESU_btnUpdWarn', 'R0lGODlhGQAZAJEAAP/0Qf' + p);

	// Post buttons
	x.push(
		'a[class^="DESU_btn"] { display: inline-block; padding: 0 14px 14px 0; margin: 0 4px -2px 0 !important; }\
		span[class^="DESU_postPanel"] { margin-left: 4px; font-weight: bold; }'
	);
	p = 'R0lGODlhDgAOAKIAAPDw8KCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM';
	gif('.DESU_btnHide', p + '8SLLcS2MNQGsUMYi6uB5BKI5hFgojel5YBbDDNcmvpJLkcgLq1jcuSgPmgkUmlJgFAyqNmoEBJEatxggJADs=');
	gif('.DESU_btnUnhide', p + '5SLLcS2ONCcCMIoYdRBVcN4Qkp4ULmWVV20ZTM1SYBJbqvXmA3jk8IMzlgtVYFtkoNCENIJdolJAAADs=');
	gif('.DESU_btnRep', p + '4SLLcS2MNQGsUMQRRwdLbAI5kpn1kKHUWdk3AcDFmOqKcJ5AOq0srX0QWpBAlIo3MNoDInlAZIQEAOw==');
	gif('.DESU_btnExpthr', p + '7SLLcS6MNACKLIQjKgcjCkI2DOAbYuHlnKFHWUl5dnKpfm2vd7iyUXywEk1gmnYrMlEEyUZCSdFoiJAAAOw==');
	gif('.DESU_btnFav', p + '5SLLcS2MNQGsUl1XgRvhg+EWhQAllNG0WplLXqqIlDS7lWZvsJkm92Au2Aqg8gQFyhBxAlNCokpAAADs=');
	gif('.DESU_btnFavSel', 'R0lGODlhDgAOAKIAAP/hAKCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM5SLLcS2MNQGsUl1XgRvhg+EWhQAllNG0WplLXqqIlDS7lWZvsJkm92Au2Aqg8gQFyhBxAlNCokpAAADs=');
	gif('.DESU_btnSage', 'R0lGODlhDgAOAJEAAPDw8EtLS////wAAACH5BAEAAAIALAAAAAAOAA4AQAIZVI55duDvFIKy2vluoJfrD4Yi5lWRwmhCAQA7');

	// Search images buttons
	x.push(
		'.DESU_btnSrc { padding: 0 16px 0 0; background: url(data:image/gif;base64,R0lGODlhDgAOAKIAAPDw8KCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM9SLLcS0MMQMesUoQg6PKbtFnDaI0a53VAml2ARcVSFC0WY6ecyy+hFajnWDVssyQtB5NhTs1mYAAhWa2EBAA7) no-repeat; cursor: pointer; }\
		a[class^=DESU_src]:before { content: ""; padding: 0 16px 0 0; margin: 0 4px; }\
		.DESU_srcGoogle:before { background: url(http://google.ru/favicon.ico); }\
		.DESU_srcTineye:before { background: url(http://tineye.com/favicon.ico); }\
		.DESU_srcIqdb:before { background: url(http://iqdb.org/favicon.ico); ' + brCssFix + 'background-size: cover; }\
		.DESU_srcSaucenao:before { background: url(http://saucenao.com/favicon.ico); }'
	);

	// Posts counter
	if(TNum) x.push(
		'form div.DESU_thread { counter-reset: i 1; }\
		form div.DESU_thread .DESU_postPanel:after { counter-increment: i 1; content: counter(i, decimal); vertical-align: 1px; color: #4f7942; font: italic bold 13px serif; cursor: default; }\
		form div.DESU_thread .DESU_postPanel_del:after { content: "' + Lng.deleted[lCode] + '"; color: #727579; font: italic bold 13px serif; cursor: default; }'
	);

	// text format buttons
	x.push('#DESU_txtPanel { display: ' + (Cfg.txtpos === 0 ? 'inline' : 'block') + '; font-weight: bold; cursor: pointer; }');
	if(Cfg.txtbtn === 1) {
		x.push('#DESU_txtPanel span { padding: 4px 27px 4px 0; }');
		p = 'R0lGODlhFwAWAJEAAPDw8GRkZAAAAP///yH5BAEAAAMALAAAAAAXABYAQAJ';
		gif('#DESU_btnBold', p + 'T3IKpq4YAoZgR0KqqnfzipIUikFWc6ZHBwbQtG4zyonW2Vkb2iYOo8Ps8ZLOV69gYEkU5yQ7YUzqhzmgsOLXWnlRIc9PleX06rnbJ/KITDqTLUAAAOw==');
		gif('#DESU_btnItalic', p + 'K3IKpq4YAYxRCSmUhzTfx3z3c9iEHg6JnAJYYSFpvRlXcLNUg3srBmgr+RL0MzxILsYpGzyepfEIjR43t5kResUQmtdpKOIQpQwEAOw==');
		gif('#DESU_btnUnder', p + 'V3IKpq4YAoRARzAoV3hzoDnoJNlGSWSEHw7JrEHILiVp1NlZXtKe5XiptPrFh4NVKHh9FI5NX60WIJ6ATZoVeaVnf8xSU4r7NMRYcFk6pzYRD2TIUAAA7');
		gif('#DESU_btnStrike', p + 'S3IKpq4YAoRBR0qqqnVeD7IUaKHIecjCqmgbiu3jcfCbAjOfTZ0fmVnu8YIHW6lgUDkOkCo7Z8+2AmCiVqHTSgi6pZlrN3nJQ8TISO4cdyJWhAAA7');
		gif('#DESU_btnSpoiler', 'R0lGODlhFwAWAJEAAPDw8GRkZP///wAAACH5BAEAAAIALAAAAAAXABYAQAJBlIKpq4YAmHwxwYtzVrprXk0LhBziGZiBx44hur4kTIGsZ99fSk+mjrMAd7XerEg7xnpLIVM5JMaiFxc14WBiBQUAOw==');
		gif('#DESU_btnCode', p + 'O3IKpq4YAoZgR0KpqnFxokH2iFm7eGCEHw7JrgI6L2F1YotloKek6iIvJAq+WkfgQinjKVLBS45CePSXzt6RaTjHmNjpNNm9aq6p4XBgKADs=');
		gif('#DESU_btnQuote', p + 'L3IKpq4YAYxRUSKguvRzkDkZfWFlicDCqmgYhuGjVO74zlnQlnL98uwqiHr5ODbDxHSE7Y490wxF90eUkepoysRxrMVaUJBzClaEAADs=');
	}

	// Show/close animation
	if(!nav.Opera) {
		x.push(
			'@' + cssFix + 'keyframes DESU_aOpen { from { ' + cssFix + 'transform: translate(0,-50%) scaleY(0); opacity: 0; } to { opacity: 1; } }\
			@' + cssFix + 'keyframes DESU_aClose { to { ' + cssFix + 'transform: translate(0,-50%) scaleY(0); opacity: 0; } }\
			@' + cssFix + 'keyframes DESU_cfgOpen { from { ' + cssFix + 'transform: translate(0,50%) scaleY(0); opacity: 0; } to { opacity: 1; } }\
			@' + cssFix + 'keyframes DESU_cfgClose { to { ' + cssFix + 'transform: translate(0,50%) scaleY(0); opacity: 0; } }\
			@' + cssFix + 'keyframes DESU_pOpenTL { from { ' + cssFix + 'transform: translate(-50%,-50%) scale(0); opacity: 0; } to { opacity: 1; } }\
			@' + cssFix + 'keyframes DESU_pOpenBL { from { ' + cssFix + 'transform: translate(-50%,50%) scale(0); opacity: 0; } to { opacity: 1; } }\
			@' + cssFix + 'keyframes DESU_pOpenTR { from { ' + cssFix + 'transform: translate(50%,-50%) scale(0); opacity: 0; } to { opacity: 1; } }\
			@' + cssFix + 'keyframes DESU_pOpenBR { from { ' + cssFix + 'transform: translate(50%,50%) scale(0); opacity: 0; } to { opacity: 1; } }\
			@' + cssFix + 'keyframes DESU_pCloseTL { from { opacity: 1; } to { ' + cssFix + 'transform: translate(-50%,-50%) scale(0); opacity: 0; } }\
			@' + cssFix + 'keyframes DESU_pCloseBL { from { opacity: 1; } to { ' + cssFix + 'transform: translate(-50%,50%) scale(0); opacity: 0; } }\
			@' + cssFix + 'keyframes DESU_pCloseTR { from { opacity: 1; } to { ' + cssFix + 'transform: translate(50%,-50%) scale(0); opacity: 0; } }\
			@' + cssFix + 'keyframes DESU_pCloseBR { from { opacity: 1; } to { ' + cssFix + 'transform: translate(50%,50%) scale(0); opacity: 0; } }'
		);
	}

	// Embedders
	x.push(
		'.DESU_preImg, .DESU_fullImg { display: block; margin: ' + (aib.krau ? 0 : '2px 10px') + '; border: none; outline: none; cursor: pointer; }\
		.DESU_mp3, .DESU_ytObj { margin: 5px 20px; }\
		.DESU_post a + .DESU_mp3, .DESU_post a + .DESU_ytObj { display: inline; }\
		.DESU_ytLink:before { content: ""; padding: 0 16px 0 0; margin: 0 4px; background: url(http://youtube.com/favicon.ico) no-repeat; }\
		.DESU_ytObj > img { cursor: pointer; }'
	);
	if(Cfg.mask !== 0) {
		x.push(
			'.DESU_preImg, .DESU_ytObj, img[src*="spoiler"], img[src*="thumb"] { opacity: 0.07 !important; }\
			.DESU_preImg:hover, .DESU_ytObj:hover, img[src*="spoiler"]:hover, img[src*="thumb"]:hover { opacity: 1 !important; }'
		);
	}

	// Other
	x.push(
		'.DESU_alertWait:before, .DESU_icnWait, #DESU_updRes_check:before { content: " "; padding: 0 16px 16px 0; background: url( data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7) no-repeat; }\
		#DESU_alertBox { position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }\
		#DESU_alertBox > div { float: right; clear: both; width: auto; min-width: 0pt; padding: 10px; margin: 1px; border: 1px solid grey; white-space: pre-wrap; }\
		#DESU_cfgEdit, #DESU_favEdit, #DESU_hidTEdit, #DESU_spellEdit { display: block; margin: 2px 0; font: 12px courier new; }\
		#DESU_content { ' + (Cfg.attach === 0 ? 'width: 100%;' : 'position: fixed; right: 0; bottom: 25px; z-index: 9999; max-height: 95%; overflow: auto;') + ' text-align: left; }\
		#DESU_content > table { ' + (Cfg.attach === 0 ? 'margin: 5px 20px; font-size: 16px;' : 'padding: 5px 10px; border: 1px solid grey; font-size: 16px;') + ' }\
		.DESU_favData .DESU_thread { padding-left: 15px; border: 1px solid grey; }\
		.DESU_favData a, .DESU_hidTData a { text-decoration: none; }\
		.DESU_favHead a { color: inherit; font-weight: bold; }\
		.DESU_favPCount { float: right; margin: 0 5px 0 15px; font: bold 16px serif; }\
		.DESU_favPCount span { color: #4f7942; }\
		#DESU_iframe { display: none; width: 0px; height: 0px; border: none; }\
		.DESU_omitted { color: grey; font-style: italic; }\
		.DESU_postNote { color: inherit; font-size: 12px; font-style: italic; }\
		#DESU_qarea { float: none; clear: left; width: 100%; padding: 3px 0 3px 3px; margin: 2px 0; }\
		.DESU_refHid { text-decoration: line-through !important; }\
		.DESU_refMap { margin: 10px 4px 4px 4px; font-size: 70%; font-style: italic; }\
		.DESU_refMap:before { content: "' + Lng.replies[lCode] + ' "; }\
		.DESU_refMap a { text-decoration: none; }\
		#DESU_sageBtn { cursor: pointer; }\
		#DESU_select { padding: 0 !important; margin: 0 !important; }\
		#DESU_select a { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; }\
		#DESU_select a:hover { background-color: ' + (Cfg.sstyle === 0 ? '#1b345e' : '#444') + '; color: #fff; }\
		.DESU_selected { ' + (nav.Opera ? 'border-left: 4px solid red; border-right: 4px solid red; }' : brCssFix + 'box-shadow: 6px 0 2px -2px red, -6px 0 2px -2px red; }') + '\
		#DESU_txtResizer { display: inline-block !important; float: none !important; padding: 5px; margin: 0 0 -' + (nav.Opera ? 8 : nav.Chrome ? 2 : 3) + 'px -12px; border-bottom: 2px solid #555; border-right: 2px solid #444; cursor: se-resize; }\
		.DESU_viewed, .DESU_viewed .reply { color: #888 !important; }\
		.reply { width: auto; }\
		a[href="#"] { text-decoration: none !important; outline: none; }\
		.DESU_pPost { font-weight: bold; }\
		.DESU_info { padding: 3px 6px !important; }\
		.DESU_pView { position: absolute; width: auto; min-width: 0; z-index: 9999; opacity: 0; border: 1px solid grey; }'
	);
	if(Cfg.delhd === 2) {
		x.push('div[id^=DESU_hidThr_], div[id^=DESU_hidThr_] + div + br, div[id^=DESU_hidThr_] + div + br + hr { display: none; }');
	}
	if(Cfg.noname !== 0) {
		x.push('.commentpostername, .postername, .postertrip { display: none; }');
	}
	if(Cfg.ospoil !== 0) {
		x.push('.spoiler { background: #888 !important; color: #ccc !important; }');
	}
	if(Cfg.noscrl !== 0) {
		x.push('blockquote { max-height: 100% !important; overflow: visible !important; }');
	}
	if(Cfg.norule !== 0) {
		x.push((aib.gazo ? '.chui' : '.rules, #rules, #rules_row') + ' { display: none; }');
	}
	if(aib.kus) {
		x.push(
			'.extrabtns, .ui-resizable-handle, .DESU_oppost > a[onclick]:not([target]) { display: none !important; }\
			.ui-wrapper { display: inline-block; width: auto !important; height: auto !important; padding: 0 !important; }'
		);
	}
	if(aib.hana) {
		x.push('#hideinfotd, .reply_ { display: none; }');
	}
	if(aib.abu) {
		x.push(
			'.postpanel, .highslide, div[id^="post_video"], a[onclick^="window.open"] { display: none; }\
			a[id^="DESU_"] { -moz-transition: none; -o-transition: none; -webkit-transition: none; transition: none; }'
		);
	}
	if(aib.tiny) {
		x.push('form, form table { margin: 0; }');
	}
	if(aib.nul) {
		x.push(
			'#newposts_get, #postform nobr, .DESU_thread span[style="float: right;"] { display: none; }\
			.voiceplay { float: none; }'
		);
	}
	if(aib._7ch) {
		x.push('.reply { background-color: ' + getStyle(doc.body, 'background-color') + '; }');
	}
	if(aib.gazo) {
		x.push(
			'#DESU_content, #DESU_cfgBody { font-family: arial; }\
			.ftbl { width: auto; margin: 0; }\
			.reply { background: #f0e0d6; }'
		);
	}
	if(aib.krau) {
		x.push(
			'img[id^="translate_button"]' + (liteMode ? ', div[id^="disclaimer"]' : '') + ' { display: none !important; }\
			div[id^="Wz"] { z-index: 10000 !important; }\
			div[id^="DESU_hidThr_"] { margin-bottom: ' + (!TNum ? '7' : '2') + 'px; }\
			.file_reply + .DESU_ytObj { float: left; margin: 5px 20px 5px 5px; }\
			.DESU_ytObj + div:not(.file_reply) { clear: both; }'
		);
	}
	if(aib._420) {
		x.push(
			'.opqrbtn, .qrbtn, .ignorebtn, .hidethread, noscript { display: none; }\
			div[id^="DESU_hidThr_"] { margin: 1em 0; }'
		);
	}
	if(aib.brit) {
		x.push(
			'.DESU_postPanel, .DESU_postPanel_op { float: left; margin-top: 0.4em; }\
			.postthreadlinks, .pagethreadlinks, .pwpostblock { display: none; }\
			.DESU_btnSrc { padding: 0px 10px 10px 0px !important; ' + brCssFix + 'background-size: cover; }'
		);
	}

	if(!$id('DESU_css')) {
		doc.head.appendChild($new('style', {
			'id': 'DESU_css',
			'type': 'text/css',
			'text': x.join(' ')
		}, null));
		if(nav.Chrome) {
			$disp(dForm);
		}
	} else {
		$id('DESU_css').textContent = x.join(' ');
	}
}

/*==============================================================================
							FOR POSTS AND THREADS
==============================================================================*/

function forAll(fn) {
	for(var post, i = 0; post = Posts[i++];) {
		fn(post);
	}
}

function getPost(el) {
	return $x('ancestor::*[contains(@class," DESU_post") or contains(@class," DESU_oppost")]', el);
}

function getImages(post) {
	return $X('.//img[@class="thumb" or contains(@src,"thumb") or contains(@src,"/spoiler")]', post);
}

function getText(el) {
	return (el.innerText
		|| el.innerHTML.replace(/<\/?(?:br|p|li)[^>]*?>/gi,'\n')
			.replace(/<[^>]+?>/g,'').replace(/&gt;/g, '>').replace(/&lt;/g, '<')
	).trim();
}

function getImgInfo(post) {
	return $t('em', post) || $c('filesize', post) || $c('fileinfo', post);
}

function getImgWeight(post) {
	var inf = getImgInfo(post).textContent.match(/\d+[\.\d\s|m|k|к]*[b|б]/i)[0],
		w = parseFloat(inf.match(/[\d|\.]+/));
	if(/MB/.test(inf)) {
		w = w*1e3;
	}
	if(/\d[\s]*B/.test(inf)) {
		w = (w/1e3).toFixed(2);
	}
	return +w;
}

function getImgSize(post) {
	var el = getImgInfo(post),
		m = el ? el.textContent.match(/\d+[x×]\d+/) : false;
	return m ? m[0].split(/[x×]/) : [null, null];
}

function isSage(post) {
	var a;
	return !pr.mail ? false
		: aib.hana ? $xb('.//img[@alt="Сажа"]', post)
		: aib.krau ? $c('sage', post)
		: aib._410 ? $xb('.//span[@class="filetitle" and contains(text(),"' + unescape('%u21E9') + '")]', post)
		: (a = $x('.//a[starts-with(@href,"mailto:") or @href="sage"]', post)) && /sage/i.test(a.href);
}

/*--------------------------------Post buttons--------------------------------*/

function addPostButtons(post) {
	var el, h,
		ref = aib.getRef(post);
	post.Btns = (!post.isOp ? pPanel : opPanel).cloneNode(true);
	el = post.Btns.firstChild;
	$event(el, {
		'click': function(e) {
			$pd(e);
			togglePostVisib(post);
		},
		'mouseover': function() {
			selectPostHider(post);
		},
		'mouseout': removeSelMenu
	});
	if(pr.on || oeForm) {
		el = el.nextSibling;
		$event(el, {
			'click': function(e) {
				$pd(e);
				showQuickReply(post);
			},
			'mouseover': function() {
				quotetxt = txtSelection();
			}
		});
	}
	if(post.isOp){
		if(!TNum) {
			el = el.nextSibling;
			$event(el, {
				'click': function(e) {
					$pd(e);
					loadThread(post, 1, null);
				},
				'mouseover': function() {
					selectExpandThread(post);
				},
				'mouseout': removeSelMenu
			});
		}
		el = el.nextSibling;
		$event(el, {
			'click': function(e) {
				$pd(e);
				toggleFavorites(post, this);
			}
		});
		h = aib.host;
		if(Favor[h] && Favor[h][brd] && Favor[h][brd][post.Num]) {
			el.className = 'DESU_btnFavSel';
			Favor[h][brd][post.Num].cnt = post.thr.pCount;
			setStored('DESU_Favorites', $uneval(Favor));
		}
	}
	if(isSage(post)) {
		post.Btns.appendChild($new('a', {
			'Class': 'DESU_btnSage',
			'title': 'SAGE',
			'href': '#'}, {
			'click': function(e) {
				$pd(e);
				applySpells('#sage');
			}
		}));
	}
	$after(ref, post.Btns);
	if(pr.on && Cfg.insnum !== 0) {
		if(aib.nul || aib.futr) {
			$each($X('.//a', ref), function(el) {
				$rattr(el, 'onclick');
			});
		}
		if(!aib.brit) $event(ref, {'click': insertRefLink});
	}
	if(Cfg.viewhd !== 0) {
		$event(ref, {
			'mouseover': function() {
				if(post.Vis === 0) {
					togglePost(post, 1);
				}
			},
			'mouseout': function() {
				if(post.Vis === 0) {
					togglePost(post, 0);
				}
			}
		});
	}
}

/*-----------------------------HTML links players-----------------------------*/

function getTubeVideoLinks(id, fn) {
	id = 'http://www.youtube.com/watch?v=' + id;
	GM_xmlhttpRequest({method: 'GET', url: id, onload: function(xhr) {
		var i, group, len, elem, result1, result2, src,
			sep1 = '%2C',
			sep2 = '%26',
			sep3 = '%3D',
			url = [],
			formats = xhr.responseText.match(/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
		if(!formats) {
			fn(false);
			return;
		}
		formats = formats[1];
		if(formats.indexOf(',') >= 0) {
			sep1 = ',';
			sep2 = formats.indexOf('&') >= 0 ? '&' : '\\u0026';
			sep3 = '=';
		}
		for(i = 0, group = formats.split(sep1), len = group.length; i < len; i++) {
			elem = group[i].split(sep2);
			if(elem.length < 5) {
				continue;
			}
			result1 = elem[0].split(sep3);
			if(result1.length < 2) {
				continue;
			}
			src = unescape(unescape(result1[1])).replace(/\\\//g, '/').replace(/\\u0026/g, '&');
			result2 = elem[4].split(sep3);
			if(result2.length < 2) {
				continue;
			}
			if(src.toLowerCase().indexOf('http') === 0) {
				url[result2[1]] = src;
			}
		}
		fn(url);
	}});
}

function addTubeEmbed(el, id, time) {
	var wh = ' width="' + Cfg.ywidth + '" height="' + Cfg.yheigh + '" />';
	el.innerHTML = Cfg.yptype === 1
		? '<iframe type="text/html" src="http://www.youtube.com/embed/' + id
			+ (Cfg.yhdvid !== 0 ? '?hd=1&' : '?') + 'start=' + time + '&html5=1" frameborder="0"' + wh
		: '<embed type="application/x-shockwave-flash" src="http://www.youtube.com/v/' + id
			+ (Cfg.yhdvid !== 0 ? '?hd=1&' : '?') + 'start=' + time + '" wmode="transparent"' + wh;
}

function addTubePlayer(el, m) {
	var id = m[1],
		time = (m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? m[4] : 0);
	if(Cfg.yptype !== 2) {
		addTubeEmbed(el, id, time);
		return;
	}
	getTubeVideoLinks(id, function(url) {
		var src = url ? (Cfg.yhdvid === 0 ? url[43] : url[45] || url[44] || url[43]) : false;
		if(!src) {
			addTubeEmbed(el, id, time);
			return;
		}
		el.innerHTML = '<video poster="http://i.ytimg.com/vi/' + id
			+ '/0.jpg" controls="controls" preload="none" src="' + src
			+ (nav.Firefox && nav.Firefox < 14 ? '&' + Math.random() : '')
			+ '" width="' + Cfg.ywidth + '" height="' + Cfg.yheigh + '" />';
		if(time !== 0) {
			$event($x('.//video', el), {
				'loadedmetadata': function() {
					this.currentTime = time;
				}
			});
		}
	});
}

function addTubePreview(el, m) {
	el.innerHTML = '<a href="http://www.youtube.com/watch?v=' + m[1]
		+ '" target="_blank"><img src="http://i.ytimg.com/vi/' + m[1]
		+ '/0.jpg" width="360" height="270" /></a>';
	$event(el.firstChild, {
		'click': function(e) {
			if(Cfg.ytube !== 4) {
				$pd(e);
				addTubePlayer(this.parentNode, m);
			}
		}
	});
}

function getTubePattern() {
	return /https?:\/\/(?:www\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([^&#?]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?)?$/;
}

function clickTubeLink(e) {
	var m = this.href.match(getTubePattern()),
		el = $c('DESU_ytObj', getPost(this));
	$pd(e);
	if($xb('node()[contains(@src,"' + m[1] + '")]|video[contains(@poster,"' + m[1] + '")]', el)) {
		el.innerHTML = '';
	} else if(Cfg.ytube > 2 && !$xb('a[contains(@href,"' + m[1] + '")]', el)) {
		addTubePreview(el, m);
	} else {
		addTubePlayer(el, m);
	}
}

function addLinkTube(post) {
	if(Cfg.ytube === 0) {
		return;
	}
	$each($X('.//embed', post || dForm), function(el) {
		var src,
			m = el.src.match(getTubePattern());
		if(!m) {
			return;
		}
		src = 'http://www.youtube.com/watch?v=' + m[1];
		if(m[4] || m[3] || m[2]) {
			src += '#t=' + (m[2] ? m[2] + 'h' : '') + (m[3] ? m[3] + 'm' : '') + (m[4] ? m[4] + 's' : '');
		}
		aib.getMsg(post || getPost(el)).appendChild($add('<p><a href="' + src + '">' + src + '</a></p>'));
		$del(el.parentNode);
	});
	$each($X('.//a[contains(@href,"youtu")]', post || dForm), function(link) {
		var pst, el, msg,
			m = link.href.match(getTubePattern());
		if(!m) {
			return;
		}
		pst = post || getPost(link);
		if(!(el = $c('DESU_ytObj', pst))) {
			el = $new('div', {'Class': 'DESU_ytObj'}, null);
			if(Cfg.ytube > 2) {
				addTubePreview(el, m);
			} else if(Cfg.ytube === 2) {
				addTubePlayer(el, m);
			}
			msg = pst.Msg || aib.getMsg(pst);
			if(aib.krau) {
				$after($x('div[@class="file_thread" or @class="file_reply"][last()]', pst)
					|| $c('postheader', pst), el);
			} else if(msg) {
				$before(msg, [el]);
			} else {
				pst.appendChild(el);
			}
		}
		link.className = 'DESU_ytLink';
		$event(link, {'click': clickTubeLink});
		if(!nav.Opera && Cfg.ytitle !== 0) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'https://gdata.youtube.com/feeds/api/videos/' + m[1]
					+ '?alt=json&fields=title/text(),yt:noembed,app:control/yt:state/@reasonCode',
				onload: function(xhr) {
					try {
						link.textContent = JSON.parse(xhr.responseText)['entry']['title']['$t'];
						filterTextTube(pst, link.textContent);
					} catch(e) {}
				}
			});
		}
	});
}

function filterTextTube(post, text) {
	var t,
		i = 0,
		fHide = (function(a) {
			return a ? hidePost : function(b, c) {};
		})(Cfg.spells === 1);
	for(;t = oSpells.video[i++];) {
		if(strToRegexp(t).test(text)) {
			fHide(post, '#video ' + t);
			post.tHide = 1;
			if(tubeHidTimeout) {
				clearTimeout(tubeHidTimeout);
			}
			tubeHidTimeout = setTimeout(saveHiddenPosts, 500);
			return;
		}
	}
}

function unHideTextTube() {
	forAll(function(post) {
		if(post.tHide === 1) {
			unhidePost(post);
			post.tHide = 0;
		}
	});
}

function hideTextTube() {
	if(Cfg.ytitle === 0) {
		return;
	}
	$each($X('.//a[contains(@href,"youtu")]', dForm), function(link) {
		for(var i = 0, t, post; t = oSpells.video[i++];) {
			if(strToRegexp(t).test(link.textContent)) {
				post = getPost(link);
				hidePost(post, '#video ' + t);
				post.tHide = 1;
				break;
			}
		}
	});
}

function addLinkMP3(post) {
	if(Cfg.mp3 === 0) {
		return;
	}
	$each($X('.//a[contains(@href,".mp3")]', post || dForm), function(link) {
		var pst, el, msg;
		if(!(link.target === '_blank' || link.rel === 'nofollow')) {
			return;
		}
		pst = post || getPost(link);
		el = $c('DESU_mp3', pst);
		if(!el) {
			el = $new('div', {'Class': 'DESU_mp3'}, null);
			msg = pst.Msg || aib.getMsg(pst);
			if(msg) {
				$before(msg, [el]);
			} else {
				pst.appendChild(el);
			}
		}
		if(!$xb('.//object[contains(@FlashVars,"' + link.href + '")]', el)) {
			$html(el, el.innerHTML + '<object data="http://junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" wmode="transparent" width="220" height="16"  FlashVars="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + link.href + '"></object><br>');
		}
	});
}

/*------------------------------Image view functions--------------------------*/

function makeMoveable(el) {
	var elMove = function(e) {
			el.style.left = e.clientX - el.curX  + 'px';
			el.style.top = e.clientY - el.curY + 'px';
			el.moved = true;
		},
		elStop = function() {
			$revent(doc.body, {'mousemove': elMove, 'mouseup': elStop});
		};
	$event(el, {
		'mousedown': function(e) {
			$pd(e);
			el.curX = e.clientX - parseInt(el.style.left, 10);
			el.curY = e.clientY - parseInt(el.style.top, 10);
			$event(doc.body, {
				'mousemove': elMove,
				'mouseup': elStop
			});
		}
	});
}

function resizeImg(e) {
	var curX = e.clientX,
		curY = e.clientY,
		oldL = parseInt(this.style.left, 10),
		oldT = parseInt(this.style.top, 10),
		oldW = this.width,
		oldH = this.height,
		d = nav.Opera || nav.Chrome ? e.wheelDelta : -e.detail,
		newW = parseInt(this.width*(d > 0 ? 1.25 : 0.8), 10),
		newH = parseInt(this.height*(d > 0 ? 1.25 : 0.8), 10);
	$pd(e);
	this.width = newW;
	this.height = newH;
	this.style.left = parseInt(curX - (newW/oldW)*(curX - oldL), 10) + 'px';
	this.style.top = parseInt(curY - (newH/oldH)*(curY - oldT), 10) + 'px';
}

function addFullImg(a, sz, isExp) {
	var newW = '',
		newH = '',
		fullW = +sz[0],
		fullH = +sz[1],
		scrW = doc.body.clientWidth,
		scrH = window.innerHeight,
		full = $c('DESU_fullImg', a);
	if(full && isExp || !full && isExp === false) {
		return;
	}
	if(Cfg.expimg === 1 && !$xb('img[contains(@style,"fixed")]', a)) {
		$disp($t('img', a));
	}
	if(full) {
		if(!full.moved) {
			$disp(full);
			setTimeout(function() {
				$del(full);
			}, 0);
		} else {
			full.moved = false;
		}
		return;
	}
	full = $new('img', null, null);
	if(Cfg.expimg === 2) {
		$del($c('DESU_fullImg', doc));
		full.addEventListener(nav.Opera || nav.Chrome ? 'mousewheel' : 'DOMMouseScroll', resizeImg, false);
		makeMoveable(full);
	}
	if(Cfg.expimg === 1) {
		scrW -= $offset(a).left + 25;
	}
	if(fullW && fullH) {
		newW = fullW < scrW ? fullW : scrW;
		newH = newW*fullH/fullW;
		if(Cfg.expimg === 2 && newH > scrH) {
			newH = scrH;
			newW = newH*fullW/fullH;
		}
	}
	a.appendChild($attr(full, {
		'Class': 'DESU_fullImg',
		'src': a.href,
		'alt': a.href,
		'width': newW,
		'height': newH,
		'style': (Cfg.expimg === 2
			? 'position: fixed; z-index: 5000; border: 1px solid black; left: '
				+ parseInt((scrW - newW)/2, 10) + 'px; top: ' + parseInt((scrH - newH)/2, 10) + 'px;'
			: ''
		)
	}));
}

function addLinkImg(addBr, node) {
	if(Cfg.addimg === 0) {
		return;
	}
	$each($X(
		aib.xMsg + '//a[contains(@href,".jpg") or contains(@href,".png") or contains(@href,".gif")]',
		node
	), function(link) {
		var a;
		if($xb('ancestor::small', link)) {
			return;
		}
		a = link.cloneNode(false);
		a.target = '_blank';
		$disp(a);
		a.appendChild($new('img', {
			'Class': 'DESU_preImg',
			'src': a.href,
			'alt': a.href}, {
			'load': function() {
				var fullW, fullH, k;
				$disp(a);
				fullW = this.width;
				fullH = this.height;
				this.title = fullW + 'x' + fullH;
				if(fullW <= 200 && fullH <= 200) {
					return;
				}
				k = fullW/fullH;
				this.width = k < 1 ? 200*k : 200;
				this.height = k < 1 ? 200 : 200/k;
			}
		}));
		$event(a, {
			'click': function(e) {
				if(Cfg.expimg !== 0 && e.button !== 1) {
					$pd(e);
					addFullImg(this, this.firstChild.title.split('x'), null);
				}
			}
		});
		$before(link, [a, $if(addBr, $new('br', null, null))]);
	});
}

function addImgSearch(node) {
	if(!Cfg.imgsrc) {
		return;
	}
	$each($X((
			aib.brit ? './/a[@class="fileinfo"]'
			: (
				(
					aib.gazo ? '.'
					: aib.tiny ? './/p[@class="fileinfo"]'
					: aib.hana ? './/div[starts-with(@class,"fileinfo")]'
					: './/span[@class="' + (aib.krau ? 'filename' : 'filesize') + '"]'
				) + '//a[contains(@href,".jpg") or contains(@href,".png") or contains(@href,".gif")]'
				+ (aib.nul ? '[1]' : '')
			)
		), node
	), function(link) {
		if(/google\.|tineye\.com|iqdb\.org/.test(link.href)) {
			$del(link);
			return;
		}
		if(link.innerHTML.indexOf('<') >= 0) {
			return;
		}
		$before(link, [
			$new('a', {
				'Class': 'DESU_btnSrc'}, {
				'mouseover': function() {
					selectImgSearch(this, escape(link.href));
				},
				'mouseout': removeSelMenu
			})
		]);
	});
}

function expandPostImg(a, post, isExp) {
	if(/\.jpg|\.jpeg|\.png|.\gif/i.test(a.href)) {
		addFullImg(a, getImgSize(
			post.Img.snapshotLength > 1 ? $x('ancestor::node()[self::div or self::td][1]', a) : post
		), isExp);
	}
}

function expandAllPostImg(post, isExp) {
	$each(post.Img, function(img) {
		expandPostImg($x('ancestor::a[1]', img), post, isExp);
	});
}

function eventPostImg(post) {
	$each(post.Img, function(img) {
		var a = $x('ancestor::a[1]', img);
		if(a) {
			$rattr(a, 'onclick');
			$rattr(img, 'onclick');
			if(aib.dfwk) {
				$rattr(img.parentNode, 'onclick');
			}
			a.addEventListener('click', function(e) {
				if(Cfg.expimg !== 0 && e.button !== 1) {
					$pd(e);
					expandPostImg(this, post, null);
				}
			}, false);
		}
	});
}

/*---------------------------->>RefLinks map functions------------------------*/

function getRefMap(pNum, rNum) {
	if(refMap[rNum]) {
		if(refMap[rNum].indexOf(pNum) < 0) {
			refMap[rNum].push(pNum);
		}
	} else {
		refMap[rNum] = [pNum];
	}
}

function showRefMap(post, rNum, uEv) {
	var el, msg, txt;
	if(typeof refMap[rNum] !== 'object' || !post) {
		return;
	}
	el = $c('DESU_refMap', post);
	txt = refMap[rNum].join(',').replace(/(\d+)/g, ' <a href="#$1">&gt;&gt;$1</a>');
	if(!el) {
		msg = post.Msg || aib.getMsg(post);
		if(!msg) {
			return;
		}
		el = $add('<div class="DESU_refMap">' + txt + '</div>');
		if(uEv) {
			eventRefLink(el);
		}
		$after(msg, el);
	} else {
		eventRefLink($html(el, txt));
	}
}

function addRefMap(post, uEv) {
	var rNum, pst;
	if(Cfg.navig !== 2) {
		return;
	}
	$each($X('.//a[starts-with(text(),">>")]', post ? post.Msg : dForm), function(link) {
		if(/\//.test(link.textContent)) {
			return;
		}
		rNum = (link.hash || link.textContent || link.pathname.substring(link.pathname.lastIndexOf('/')))
			.match(/\d+/)[0];
		pst = post || getPost(link);
		if(pByNum[rNum] && pst) {
			getRefMap(pst.Num, rNum);
		}
	});
	for(rNum in refMap) {
		showRefMap(pByNum[rNum], rNum, uEv);
	}
}

/*------------------------>>RefLinks posts preview functions------------------*/

function addNode(parent, pView, e) {
	var el = pView.node = {parent: null, kid: null, lastkid: null, post: pView};
	parent = parent.node;
	dForm.appendChild(pView);
	setPreviewPostion(e, pView, false);
	$event(pView, {
		'mouseover': function() {
			markPost(this.node, false);
		},
		'mouseout': markDelete
	});
	if(curView && parent) {
		if(parent.kid) {
			deleteNodes(parent.kid);
		}
		el.parent = parent;
		curView.lastkid = parent.kid = el;
	} else {
		deleteNodes(curView);
		curView = el;
	}
	markPost(el, false);
	showPreview(pView);
	return el;
}

function markDelete() {
	if(curView) {
		markPost(curView.lastkid || curView, true);
	}
}

function markPost(el, forDel) {
	if(el) {
		clearTimeout(pViewTimeout);
		do {
			el.forDel = forDel;
		} while(el = el.parent);
		pViewTimeout = setTimeout(function() {
			for(el = curView; el; el = el.kid) {
				if(el.forDel) {
					return deleteNodes(el);
				}
			}
		}, +Cfg.navdel);
	}
}

function deleteNodes(el) {
	var lk;
	if(!el) {
		return;
	}
	lk = curView.lastkid || curView;
	if(el.parent) {
		el.parent.kid = null;
		curView.lastkid = el.parent;
	} else {
		curView = null;
	}
	do {
		clearTimeout(lk.post.marker);
		closePreview(lk.post);
	} while((lk = lk.parent) !== el.parent && lk);
}

function waitForAnim(pView, fn) {
	var it;
	if(!pView.inUse) {
		fn();
		return;
	}
	it = setInterval(function() {
		if(!pView.inUse) {
			fn();
			clearInterval(it);
		}
	}, 20);
}

function showPreview(el) {
	if(Cfg.animp === 0 || !(nav.Chrome || nav.Firefox > 4)) {
		el.style.opacity = 1;
		return;
	}
	waitForAnim(el, function() {
		el.addEventListener(nav.Firefox ? 'animationend' : 'webkitAnimationEnd', function() {
			el.style.opacity = 1;
		}, false);
		el.style[(nav.Firefox ? 'Moz' : 'webkit') + 'Animation'] =
			(el.aTop ? 'DESU_pOpenT' : 'DESU_pOpenB') + (el.aLeft ? 'L' : 'R') + ' 0.2s 1 ease-out';
	});
}

function closePreview(el) {
	if(Cfg.animp === 0 || !(nav.Chrome || nav.Firefox > 4)) {
		$del(el);
		return;
	}
	waitForAnim(el, function() {
		el.addEventListener(nav.Firefox ? 'animationend' : 'webkitAnimationEnd', function() {
			el.style.opacity = 0;
			$del(el);
		}, false);
		el.style[(nav.Firefox ? 'Moz' : 'webkit') + 'Animation'] =
			(el.aTop ? 'DESU_pCloseT' : 'DESU_pCloseB') + (el.aLeft ? 'L' : 'R') + ' 0.2s 1 ease-in';
	});
}

function setPreviewPostion(e, pView, anim) {
	var scrW = doc.body.clientWidth,
		scrH = window.innerHeight,
		x = $offset(e.target).left + e.target.offsetWidth/2,
		y = $offset(e.target).top,
		left,
		top = e.target.getBoundingClientRect().top + e.target.offsetHeight, width = 'auto',
		uId,
		setPos = function() {
			pView.style.left = left;
			pView.style.top = top;
		},
		getNum = function(s) {
			return +s.substring(0, s.length - 2);
		};
	if(x < scrW/2) {
		left = x;
		pView.aLeft = true;
		if(left + pView.offsetWidth >= scrW - 10) {
			width = (scrW - left - 10) + 'px';
		}
	} else {
		left = x - pView.offsetWidth;
		pView.aLeft = false;
		if(left < 10) {
			left = '10';
			width = (x - 10) + 'px';
		}
	}
	left += 'px'; pView.style.width = width; uId = pView.offsetHeight;
	if(top + uId < scrH - 10 || top - uId < 10) {
		top = (y + e.target.offsetHeight) + 'px';
		pView.aTop = true;
	} else {
		top = (y - uId) + 'px';
		pView.aTop = false;
	}
	if(Cfg.animp === 0 || !anim || aib.hid) {
		setPos();
		return;
	}
	waitForAnim(pView, function() {
		if(left === pView.style.left && top === pView.style.top) {
			return;
		}
		pView.inUse = true;
		uId = 'DESU_mCSS' + Math.round(Math.random()*1e3);
		doc.head.appendChild($new('style', {
			'id': uId,
			'type': 'text/css',
			'text': '@' + cssFix + 'keyframes ' + uId + ' { to { left: ' + left + '; top: ' + top + '; } }'
		}, null));
		pView.addEventListener(nav.Firefox ? 'animationend' : 'webkitAnimationEnd', function() {
			setPos();
			pView.inUse = false;
			$del($id(uId));
		}, false);
		pView.style[(nav.Firefox ? 'Moz' : 'webkit') + 'Animation'] =
			uId + ' ' + (Math.log(Math.sqrt(Math.pow(getNum(left) - getNum(pView.style.left), 2)
			+ Math.pow(getNum(top) - getNum(pView.style.top), 2))) / 22) + 's 1 ease-in-out';
	});
}

function markRefMap(pView, pNum) {
	($c('DESU_pPost', pView) || {}).className = '';
	($x('.//a[starts-with(text(),">>") and contains(text(),"' + pNum + '")]', pView) || {}).className =
		'DESU_pPost';
}

function funcPostPreview(post, pNum, parent, e, txt) {
	var el, pView;
	if(!post) {
		if(!txt) {
			pDel[pNum] = true;
		}
		return addNode(parent, $new('div', {
			'Class': aib.pClass + ' DESU_info DESU_pView',
			'html': txt || Lng.postNotFound[lCode]
		}, null), e);
	}
	pView = post.cloneNode(true);
	if(post.Vis === 0) {
		togglePost(pView, 1);
	}
	pView.className += ' DESU_post DESU_pView ' + aib.pClass;
	if(aib._7ch) {
		pView.firstElementChild.style.cssText = 'max-width: 100%; margin: 0;';
		$del($c('doubledash', pView));
	}
	pView.Num = pNum;
	$Del(
		'.//img[@class="DESU_preImg"]/ancestor::a|.//img[@class="DESU_fullImg"]|.//div[@class="DESU_refMap"'
			+ (Cfg.ytube !== 2 ? 'or @class="DESU_ytObj"' : '')
			+ ']|.//span[starts-with(@class,"DESU_postPanel")]|.//a[@class="DESU_btnSrc"]',
		pView
	);
	addPostButtons(pView);
	if(!pByNum[pNum]) {
		addLinkMP3(pView);
	}
	if(!pByNum[pNum] || Cfg.ytube !== 2) {
		addLinkTube(pView);
	}
	pView.Img = getImages(pView);
	$each(pView.Img, function(img) {
		img.style.display = '';
	});
	eventPostImg(pView);
	addLinkImg(false, pView);
	addImgSearch(pView);
	if(Cfg.navig === 2) {
		showRefMap(pView, pNum, null);
		markRefMap(pView, parent.Num);
	}
	eventRefLink(pView);
	if(Cfg.navmrk !== 0) {
		pView.marker = setTimeout(function() {
			markViewedPost(pNum);
			saveViewedPosts(pNum);
		}, 3e3);
	}
	return addNode(parent, pView, e);
}

function showPostPreview(e) {
	var b = this.pathname.match(/^\/*(.*?)\/*(?:res|thread-|$)/)[1],
		tNum = (this.pathname.match(/[^\/]+\/[^\d]*(\d+)/) || [,0])[1],
		pNum = (this.hash.match(/\d+/) || [tNum])[0],
		post = pByNum[pNum] || importPreview(b, pNum),
		parent = getPost(e.target),
		el = parent.node ? parent.node.kid : curView;
	if(Cfg.navig === 0 || /^>>$/.test(this.textContent) || (Cfg.navdis === 1 && post && post.Vis === 0)) {
		return;
	}
	setTimeout(function() {
		$del($x('.//div[starts-with(@id,"preview") or starts-with(@id,"pstprev")]', doc));
	}, 0);
	if(pDel[pNum]) {
		funcPostPreview(null, pNum, parent, e, Lng.postNotFound[lCode]);
		return;
	}
	if(el && el.post.Num === pNum) {
		markPost(el, false);
		deleteNodes(el.kid);
		setPreviewPostion(e, el.post, true);
		markRefMap(el.post, parent.Num);
		return;
	}
	if(post) {
		funcPostPreview(post, pNum, parent, e, '');
		return;
	}
	el = funcPostPreview(null, pNum, parent, e, '<span class="DESU_icnWait">&nbsp;</span>' + Lng.loading[lCode]);
	ajaxGetPosts(null, b, tNum, function(err) {
		if(el && !el.forDel) {
			funcPostPreview(importPreview(b, pNum), pNum, parent, e, err);
		}
	});
}

function eventRefLink(node) {
	var lnk,
		erf = function() {
			if(Cfg.navig === 0) {
				return;
			}
			$each($X('.//a[starts-with(text(),">>")]', node), function(link) {
				if(aib.tiny) {
					$before(link, [lnk = link.cloneNode(true)]);
					$del(link);
					link = lnk;
				} else {
					$rattr(link, 'onmouseover');
					$rattr(link, 'onmouseout');
				}
				$event(link, {
					'mouseover': showPostPreview,
					'mouseout': markDelete
				});
			});
		};
	if(aib.tiny) {
		setTimeout(erf, 500);
	} else {
		erf();
	}
}

/*==============================================================================
								AJAX FUNCTIONS
==============================================================================*/

function parseHTMLdata(html, b, tNum) {
	var dc, thrd, pNum, om;
	if(!pr.on && oeForm) {
		pr = replyForm($x('.//textarea/ancestor::form[1]', $add(html).parentNode));
		$before($id('DESU_pform').firstChild, [pr.form]);
	}
	dc = HTMLtoDOM(aib.hana
		? '<html><head></head><body><div id="' + tNum + '" class="thread">' + html + '</div></body></html>'
		: html
	);
	parseDelform(!aib.hana ? $$x(aib.xDForm, dc, dc) : dc, dc, function(thr) {
		thrd = thr;
		if(!ajThrds[b]) {
			ajThrds[b] = {};
			ajPosts[b] = {};
		}
		ajThrds[b][thr.Num] = [];
	}, function(post, i) {
		if(i === 0 && aib.kus && $c('omittedposts', thrd)) {
			post.appendChild(om);
		}
		pNum = post.Num;
		ajThrds[b][thrd.Num].push(pNum);
		ajPosts[b][pNum] = post;
		$each($$X(aib.xMsg + '//a[starts-with(text(),">>")]', post, dc), function(link) {
			getRefMap(pNum, link.textContent.match(/\d+/)[0]);
		});
	});
}

function ajaxGetPosts(url, b, tNum, fn) {
	if(!url) {
		url = aib.hana
			? '/api/thread/expand/' + b + '/' + tNum
			: '/' + (b === '' ? '': b + '/') + res + tNum + (aib.tire ? '.html' : docExt);
	}
	GM_xmlhttpRequest({method: 'GET', url: url, onreadystatechange: function(xhr) {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				parseHTMLdata(xhr.responseText, b, tNum);
				fn();
			} else {
				fn(xhr.status === 0 ? Lng.noConnect[lCode] : 'HTTP [' + xhr.status + '] ' + xhr.statusText);
			}
		}
	}});
}

function addPostFunc(post) {
	doPostFilters(post);
	addRefMap(post, true);
	eventRefLink(post);
	addLinkMP3(post);
	addLinkTube(post);
	addLinkImg(true, post);
	addImgSearch(post);
	if(post.Vis === 0) {
		setPostVisib(post, 0);
	}
	if(Cfg.delhd === 1) {
		mergeHidden(post);
	}
	if(isExpImg) {
		expandAllPostImg(post, false);
	}
}

function importPreview(b, pNum) {
	var nNode;
	if(!imPosts[b]) {
		imPosts[b] = {};
	}
	if(!(nNode = imPosts[b][pNum])) {
		imPosts[b][pNum] = nNode = importPost(b, pNum);
	}
	return nNode;
}

function importPost(b, pNum) {
	var nNode;
	if(ajPosts[b] && ajPosts[b][pNum]) {
		nNode = doc.importNode(ajPosts[b][pNum], true);
		nNode.Num = pNum;
		replaceDelform(nNode);
		return nNode;
	}
	return false;
}

function newPost(thr, b, tNum, i, isDel) {
	var pNum = ajThrds[b][tNum][i],
		post = importPost(b, pNum);
	pushPost(post, i);
	post.Vis = getVisib(pNum);
	post.isDel = isDel;
	thr.pCount = ajThrds[b][tNum].length;
	post.thr = thr;
	insertPost(thr, post);
	addPostButtons(post);
	if(Cfg.expimg !== 0) {
		eventPostImg(post);
	}
	addPostFunc(post);
	if(Cfg.expost !== 0 && !TNum) {
		expandPost(post);
	}
	if(aib.tiny) {
		thr.appendChild($new('br', null, null));
	}
}

function insertPost(thr, post) {
	var pst, el;
	if(postWrapper) {
		el = $c('DESU_post', pst = postWrapper.cloneNode(true));
		if(el) {
			el.parentNode.replaceChild(post, el);
		} else {
			pst = post;
		}
	} else {
		pst = post;
	}
	thr.appendChild(pst);
}

function getFullMsg(post, tNum, a) {
	ajaxGetPosts(null, brd, tNum, function(err) {
		if(!err) {
			$del(a);
			post.Msg = $html(post.Msg, aib.getMsg(importPost(brd, post.Num)).innerHTML);
			post.Text = getText(post.Msg);
			$del($c('DESU_btnSrc', post));
			addPostFunc(post);
		}
	});
}

function expandPost(post) {
	var a, tNum;
	if(post.Vis !== 0) {
		a = $x(aib.krau
			? './/p[starts-with(@id,"post_truncated")]'
			: './/div[@class="abbrev"]|.//span[@class="abbr" or @class="omittedposts" or @class="shortened"]',
			post
		);
		if(a && /long|full comment|gekürzt|слишком|длинн|мног/i.test(a.textContent)) {
			tNum = post.thr.Num;
			if(Cfg.expost === 1) {
				getFullMsg(post, tNum, a);
			} else {
				$event(a, {
					'click': function(e) {
						$pd(e);
						getFullMsg(post, tNum, e.target);
					}
				});
			}
		}
	}
}

function expandThread(thr, b, tNum, last, isDel) {
	var i,
		len = ajThrds[b][tNum].length;
	if(last !== 1) {
		last = len - last;
	}
	if(last < 1) {
		last = 1;
	}
	if(last > 1) {
		thr.appendChild($new('div', {
			'Class': 'DESU_omitted',
			'text': Lng.postsOmitted[lCode] + (last - 1)
		}, null));
	}
	for(i = last; i < len; i++) {
		newPost(thr, b, tNum, i, isDel);
	}
	savePostsVisib();
	$close($id('DESU_alertWait'));
}

function loadThread(post, last, fn) {
	$alert(Lng.loading[lCode], 'Wait');
	ajaxGetPosts(null, brd, post.Num, function(err) {
		if(err) {
			$close($id('DESU_alertWait'));
			$alert(err, '');
		} else {
			$delNx(post.Msg);
			$delNx(post);
			if(aib.krau) {
				$del($c('omittedinfo', post));
			}
			expandThread(post.thr, brd, post.Num, last, false);
			$focus(pByNum[post.Num]);
			if(last > 5 || last === 1) {
				post.parentNode.appendChild($event($add(
					'<span>[<a href="#">' + Lng.collapseThrd[lCode] + '</a>]</span>'
				), {
					'click': function(e) {
						$pd(e);
						loadThread(post, 5, null);
					}
				}));
			}
		}
		if(fn) {
			fn();
		}
	});
}

function loadFavorThread(e) {
	var el = this.parentNode.parentNode,
		thr = $x('.//div[contains(@class," DESU_thread")]', el),
		arr = el.id.substr(13).split('|'),
		url = $if(arr[0] !== aib.host, this.nextElementSibling.href),
		b = arr[1],
		tNum = arr[2];
	$pd(e);
	if(thr.style.display !== 'none') {
		$disp(thr);
		$del($c('DESU_favIframe', doc));
		return;
	}
	if(pByNum[tNum] && pByNum[tNum].offsetHeight) {
		$focus(pByNum[tNum]);
		return;
	}
	if(url) {
		thr.appendChild($new('iframe', {
			'name': 'DESU_favIframe',
			'Class': 'DESU_favIframe',
			'src': url,
			'style': 'border: none; width: ' + (doc.body.clientWidth - 65)
				+ 'px; height: ' + (window.innerHeight - 100) + 'px;'
		}, null));
		$disp(thr);
		return;
	}
	$alert(Lng.loading[lCode], 'Wait');
	ajaxGetPosts(null, b, tNum, function(err) {
		if(err) {
			$close($id('DESU_alertWait'));
			$alert(err, '');
			return;
		}
		newPost(thr, b, tNum, 0, true);
		expandThread(thr, b, tNum, 5, true);
		$x('.//tr[@id="DESU_favData_' + aib.host + '|' + b + '|' + tNum
			+ '"]//span[@class="DESU_favPCount"]/span', doc).textContent = thr.pCount;
		setStored('DESU_Favorites', $uneval(Favor));
		$disp(thr);
	});
}

function getDelPosts(err) {
	var del = 0;
	if(err) {
		return false;
	}
	forAll(function(post) {
		if(ajThrds[brd][TNum].indexOf(post.Num) < 0) {
			if(!post.isDel) {
				post.Btns.className += '_del';
				post.isDel = true;
			}
			del++;
		}
	});
	return del;
}

function setUpdButtonState(state) {
	if(TNum && Cfg.updthr !== 3) {
		$x('.//a[starts-with(@id,"DESU_btnUpd")]', doc).id = 'DESU_btnUpd' + state;
	}
}

function endPostsUpdate() {
	setUpdButtonState('Off');
	clearInterval(ajaxInt);
	ajaxInt = undefined;
}

function infoNewPosts(err, del) {
	var inf, old;
	if(err) {
		if(err !== Lng.noConnect[lCode]) {
			$alert(Lng.thrdNotFound[lCode] + TNum + '): \n' + err, '');
			doc.title = '{' + err.match(/(?:\[)(\d+)(?:\])/)[1] + '} ' + doc.title;
			endPostsUpdate();
		} else {
			$alert(Lng.noConnect[lCode], 'Warn');
			setUpdButtonState('Warn');
		}
		return;
	}
	if(Cfg.updthr === 3) {
		return;
	}
	setUpdButtonState('On');
	$close($id('DESU_alertWarn'));
	inf = ajThrds[brd][TNum].length - Posts.length + del;
	if(Cfg.updthr === 1) {
		if(doc.body.className === 'focused') {
			return;
		}
		old = doc.title.match(/^\[(\d+)\]/);
		if(old) {
			inf += +old[1];
		}
	}
	if(Cfg.updfav !== 0 && favIcon) {
		clearInterval(favIconTimeout);
		if(inf > 0) {
			favIconTimeout = setInterval(function() {
				var href = $xb('.//link[@href="' + favIcon + '"]', doc.head)
						? 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII='
						: favIcon;
				$Del('.//link[@rel="shortcut icon"]', doc.head);
				doc.head.appendChild($new('link', {
					'href': href,
					'rel': 'shortcut icon'
				}, null));
			}, 800);
		}
	}
	doc.title = (inf > 0 ? ' [' + inf + '] ' : '') + docTitle;
}

function loadNewPosts(inf, fn) {
	if(inf) {
		$alert(Lng.loading[lCode], 'Wait');
	}
	ajaxGetPosts(null, brd, TNum, function(err) {
		var i, len,
			del = getDelPosts(err);
		if(!inf) {
			infoNewPosts(err, del);
		}
		if(!err) {
			for(i = Posts.length - del, len = ajThrds[brd][TNum].length; i < len; i++) {
				newPost($x('.//div[contains(@class," DESU_thread")]', dForm), brd, TNum, i, false);
			}
			savePostsVisib();
			$id('DESU_panelInfo').firstChild.textContent = len + '/' + getImages(dForm).snapshotLength;
		}
		if(inf) {
			$close($id('DESU_alertWait'));
			infoNewPosts(err, del);
		}
		if(fn) {
			fn();
		}
	});
}

function initPostsUpdate() {
	var C = Cfg.updint,
		t = 6e4*(C === 0 ? 0.5 : C === 1 ? 1 : C === 2 ? 1.5 : C === 3 ? 2 : C === 4 ? 5 : C === 5 ? 15 : 30);
	if(Cfg.updthr === 1) {
		ajaxInt = setInterval(function() {
			loadNewPosts(false, null);
		}, t);
	}
	if(Cfg.updthr === 2) {
		ajaxInt = setInterval(function() {
			ajaxGetPosts(null, brd, TNum, function(err) {
				infoNewPosts(err, getDelPosts(err));
			});
		}, t);
	}
}

function loadPages(len) {
	var p, url;
	$alert(Lng.loading[lCode], 'Wait');
	dForm.innerHTML = '';
	for(p = 0, Posts = [], refMap = [], ajPosts[brd] = {}, ajThrds[brd] = {}; p < len; p++) {
		$append(dForm, [
			$new('center', {
				'text': p + Lng.page[lCode],
				'style': 'font-size: 2em;'
			}, null),
			$new('hr', null, null),
			$new('div', {'id': 'DESU_page' + p}, null)
		]);
		url = '/' + (brd === '' ? '' : brd + '/') + (
			p > 0 ? p + docExt
			: aib.hana ? 'index' + docExt
			: ''
		);
		ajaxGetPosts(url, brd, null, function(p, len) {
			return function() {
				var tNum, thr, i, pLen,
					page = $id('DESU_page' + p);
				for(tNum in ajThrds[brd]) {
					thr = $new('div', {
						'Class': ' DESU_thread',
						'id': 'thread-' + tNum
					}, null);
					$append(page, [
						thr,
						$new('br', {'clear': 'left'}, null),
						$new('hr', null, null)
					]);
					for(i = 0, pLen = ajThrds[brd][tNum].length; i < pLen; i++) {
						newPost(thr, brd, tNum, i, false);
					}
					delete ajThrds[brd][tNum];
				}
				savePostsVisib();
				readHiddenThreads();
				if(p === len - 1) {
					$close($id('DESU_alertWait'));
				}
			}
		}(p, len));
	}
}


/*==============================================================================
								HIDERS / FILTERS
==============================================================================*/

function doPostFilters(post) {
	hideByWipe(post);
	if(Cfg.spells !== 0) {
		hideBySpells(post);
	}
}

function togglePostVisib(post) {
	setPostVisib(post, post.Vis !== 0 ? 0 : 1);
	savePostsVisib();
}

function togglePost(post, vis) {
	if(post.isOp) {
		post.thr.style.display = vis === 0 ? 'none' : '';
		return;
	}
	$each($X('following-sibling::*', $c(
		aib.krau ? 'postheader'
		: aib.tiny ? 'intro'
		: aib._420 ? 'replyheader'
		: 'DESU_postPanel',
		post
	)), function(el) {
		el.style.display = vis === 0 ? 'none' : '';
	});
}

function applyPostVisib(post, vis, note) {
	var el,
		pNum = post.Num;
	if(post.isOp) {
		el = $id('DESU_hidThr_' + pNum);
		if(vis === 1 && el) {
			$del(el);
			toggleHiddenThread(post, 1);
		}
		if(vis === 0 && !el) {
			el = $add(
				'<div class="' + aib.pClass + '" id="DESU_hidThr_' + post.Num + '">'
					+ Lng.hiddenThrd[lCode] + ' <a href="#">№' + pNum + '</a><i> ('
					+ (note !== '' ? 'autohide: ' + note : post.thr.dTitle) + ')</i></div>'
			);
			$event($t('a', el), {
				'click': function(e) {
					$pd(e);
					togglePostVisib(post);
				}
			});
			$before(post.parentNode, [el]);
			toggleHiddenThread(post, 0);
			post.thr.Vis = vis;
		}
	} else if(Cfg.delhd === 2) {
		post.style.display = vis === 0 ? 'none' : '';
	}
	if(!sav.cookie) {
		Visib[brd + pNum] = vis;
		Expires[brd + pNum] = (new Date()).getTime() + storageLife;
	} else if(TNum) {
		Visib[post.Count] = vis;
	}
	post.Vis = vis;
}

function setPostVisib(post, vis) {
	post.Btns.firstChild.className = vis === 0 ? 'DESU_btnUnhide' : 'DESU_btnHide';
	togglePost(post, vis);
	applyPostVisib(post, vis, '');
	if(Cfg.navhid !== 0) {
		setTimeout(function() {
			$each($X('.//a[contains(@href,"#' + post.Num + '")]', dForm), function(el) {
				el.className = vis === 0 ? 'DESU_refHid' : '';
			});
		}, 0);
	}
}

function hidePost(post, note) {
	if(!post.noHide) {
		if(post.Vis !== 0) {
			post.Btns.appendChild($new('a', {
				'Class': 'DESU_postNote',
				'text': ' autohide: ' + note + ' ',
				'href': '#'}, {
				'click': function(e) {
					$pd(e);
					$del(this);
				}
			}));
		}
		applyPostVisib(post, 0, note);
	}
}

function unhidePost(post) {
	if(!detectWipe(post)) {
		setPostVisib(post, 1);
		$del($c('DESU_postNote', post));
		hideByWipe(post);
	}
}

function saveHiddenPosts() {
	forAll(function(post) {
		if(post.Vis === 0) {
			setPostVisib(post, 0);
		}
	});
	savePostsVisib();
}

function mergeHidden(post) {
	var el, next;
	if(post.Vis !== 0 || post.isOp) {
		return;
	}
	el = post.previousElementSibling;
	if(!el) {
		return;
	}
	if(!/merged/.test(el.id)) {
		el = $new('span', {
			'id': 'DESU_merged_' + post.Num,
			'style': 'display: none;'
		}, null);
		$before(post, [
			$new('span', {
				'style': 'display: ; cursor: pointer;'}, {
				'click': function(e) {
					var hDiv = $id('DESU_merged_' + post.Num);
					$pd(e);
					hDiv.previousElementSibling.innerHTML =
						unescape(hDiv.style.display === 'none' ? '%u25BC' : '%u25B2') + '[<i><a href="#">'
						+ Lng.hiddenPosts[lCode] + '</a>:&nbsp;' + hDiv.childNodes.length + '</i>]';
					$disp(hDiv);
				}
			}),
			el
		]);
	}
	el.appendChild(post);
	next = post.nextElementSibling;
	if(!next || getVisib(next.Num) === 1) {
		el.previousElementSibling.innerHTML = unescape('%u25B2') + '[<i><a href="#">' + Lng.hiddenPosts[lCode] + '</a>:&nbsp;'
			+ el.childNodes.length + '</i>]';
	}
}

function processHidden(newCfg, oldCfg) {
	if(newCfg === 2 || oldCfg === 2) {
		forAll(function(post) {
			if(post.Vis === 0 && !post.isOp) {
				$disp(post);
			}
		});
	}
	if(oldCfg === 1) {
		$each($X('.//span[starts-with(@id,"DESU_merged")]', doc), function(el) {
			var px = el.childNodes,
				i = px.length;
			while(i--) {
				$after(el, px[i]);
			}
			$del(el.previousElementSibling);
			$del(el);
		});
	}
	if(newCfg === 1) {
		forAll(mergeHidden);
	}
	saveCfg('delhd', newCfg);
	scriptCSS();
}

/*-----------------------Hide/change posts by expressions---------------------*/

function getSpellObj() {
	return {
		words: [], exp: [], exph: [], img: [], imgn: [], name: [], theme: [], tmax: [],
		sage: false, notxt: false, noimg: false, trip: false
	};
}

function initSpells() {
	var i, x, b, n, t, p, j, Spells;
	pSpells = getSpellObj();
	tSpells = getSpellObj();
	oSpells = {rep: [], skip: [], num: [], outrep: [], video: []};
	for(i = 0; x = spellsList[i++];) {
		Spells = pSpells;
		x = x.toString();
		if(/^#(?:[^\s]+\/)?(?:\d+)? /.test(x)) {
			b = x.match(/^#([^\/]+)\//);
			n = x.match(/(\d+)\s/);
			if(TNum && b && n && b[1] === brd && n[1] === TNum
				|| TNum && !b && n && n[1] === TNum || b && !n && b[1] === brd) {
				x = x.replace(/^#[^\s]+ /, '');
			} else {
				continue;
			}
		}
		if(/^#op /.test(x)) {
			if(!TNum) {
				Spells = tSpells;
				x = x.substr(4);
			} else {
				continue;
			}
		}
		if(!/^#/.test(x)) {
			Spells.words.push(x);
			continue;
		}
		t = x.split(' ')[0];
		p = x.replace(/^#[^\s]+ /, '');
		if(TNum && (t === '#skip' || t === '#num')) {
			p = p.split(', ');
			j = p.length;
			while(j--) {
				if(p[j].indexOf('-') < 0) {
					p[j] += '-' + p[j];
				}
				t === '#num' ? oSpells.num.push(p[j]) : oSpells.skip.push(p[j]);
			}
		}
		t === '#rep' ? oSpells.rep.push(p)
		: t === '#exp' ? Spells.exp.push(strToRegexp(p))
		: t === '#exph' ? Spells.exph.push(strToRegexp(p))
		: t === '#img' ? Spells.img.push(p)
		: t === '#imgn' ? Spells.imgn.push(strToRegexp(p))
		: t === '#name' ? Spells.name.push(p)
		: t === '#theme' ? Spells.theme.push(strToRegexp(p))
		: t === '#tmax' ? Spells.tmax.push(p)
		: t === '#sage' ? Spells.sage = true
		: t === '#notxt' ? Spells.notxt = true
		: t === '#noimg' ? Spells.noimg = true
		: t === '#trip' ? Spells.trip = true
		: t === '#outrep' ? oSpells.outrep.push(p)
		: t === '#video' && oSpells.video.push(p);
	}
}

function doReplace(arr, txt) {
	var re,
		i = arr.length;
	while(i--) {
		re = strToRegexp(arr[i]);
		txt = txt.replace(re, arr[i].substr(re.toString().length + 1));
	}
	return txt;
}

function getImgSpell(imgW, imgH, imgK, exp) {
	var s, stat, expK, x, expW, expH;
	if(exp === '') {
		return false;
	}
	s = exp.split('@');
	stat = s[0][0];
	expK = s[0].substr(1).split('-');
	if(!expK[1]) {
		expK[1] = expK[0];
	}
	if(expK[0] !== '') {
		if((stat === '<' && imgK < +expK[0])
			|| (stat === '>' && imgK > +expK[0])
			|| (stat === '=' && imgK >= +expK[0] && imgK <= +expK[1])) {
			if(!s[1]) {
				return 'image ' + exp;
			}
		} else {
			return false;
		}
	}
	if(s[1]) {
		x = s[1].split(/[x×]/);
		expW = x[0].split('-');
		expH = x[1].split('-');
		if(!expW[1]) {
			expW[1] = expW[0];
		}
		if(!expH[1]) {
			expH[1] = expH[0];
		}
		if((stat === '<' && imgW < +expW[0] && imgH < +expH[0])
			|| (stat === '>' && imgW > +expW[0] && imgH > +expH[0])
			|| (stat === '=' && imgW >= +expW[0] && imgW <= +expW[1]
				&& imgH >= +expH[0] && imgH <= +expH[1])) {
			return 'image ' + exp;
		}
	}
	return false;
}

function getSpells(x, post) {
	var inf, i, t, _t, pTitle, pName, pTrip, sz, imgW, imgH, imgK;
	post.noHide = false;
	if(oSpells.skip[0] && TNum) {
		inf = post.Count + 1;
		for(i = 0; t = oSpells.skip[i++];) {
			t = t.split('-');
			if(inf >= +t[0] && inf <= +t[1]) {
				post.noHide = true;
				return false;
			}
		}
	}
	if(x.words[0] || x.theme[0]) {
		pTitle = $c('replytitle', post) || $c('filetitle', post);
		pTitle = pTitle ? pTitle.textContent.toLowerCase() : '';
	}
	if(x.words[0]) {
		for(i = 0, inf = post.Text.toLowerCase(); t = x.words[i++];) {
			_t = t;
			t = t.toLowerCase();
			if(inf.indexOf(t) >= 0 || pTitle.indexOf(t) >= 0) {
				return _t;
			}
		}
	}
	if(x.theme[0]) {
		for(i = 0; t = x.theme[i++];) {
			if(t.test(pTitle)) {
				return '#theme ' + t.toString();
			}
		}
	}
	if(x.exp[0]) {
		for(i = 0, inf = post.Text; t = x.exp[i++];) {
			if(t.test(inf)) {
				return '#exp ' + t.toString();
			}
		}
	}
	if(x.exph[0]) {
		for(i = 0, inf = post.innerHTML; t = x.exph[i++];) {
			if(t.test(inf)) {
				return '#exph ' + t.toString();
			}
		}
	}
	if(x.name[0] || x.trip) {
		pName = $c('commentpostername', post) || $c('postername', post);
		pTrip = $c('postertrip', post);
	}
	if(x.trip && pTrip) {
		return '#trip';
	}
	if(x.name[0]) {
		pName = pName ? pName.textContent : '';
		pTrip = pTrip ? pTrip.textContent : '';
		for(i = 0; t = x.name[i++];) {
			_t = t;
			t = t.split(/!+/);
			if(t[0] !== '' && pName.indexOf(t[0]) >= 0 || t[1] !== '' && pTrip.indexOf(t[1]) >= 0) {
				return '#name ' + _t;
			}
		}
	}
	if(post.Img.snapshotLength > 0) {
		if(x.img[0]) {
			sz = getImgSize(post);
			imgW = +sz[0];
			imgH = +sz[1];
			imgK = getImgWeight(post);
			for(i = 0; t = x.img[i++];) {
				if(getImgSpell(imgW, imgH, imgK, t)) {
					return '#img ' + t;
				}
			}
		}
		if(x.imgn[0]) {
			inf = getImgInfo(post);
			if(inf) {
				for(i = 0, inf = inf.textContent; t = x.imgn[i++];) {
					if(t.test(inf)) {
						return '#imgn ' + t;
					}
				}
			}
		}
	}
	if(oSpells.num[0]) {
		for(i = 0, inf = post.Count + 1; t = oSpells.num[i++];) {
			_t = t;
			t = t.split('-');
			if(inf >= +t[0] && inf <= +t[1]) {
				return '#num ' + _t;
			}
		}
	}
	if(x.tmax[0]) {
		for(i = 0, inf = post.Text.replace(/\n/g, '').length; t = x.tmax[i++];) {
			if(inf >= t) {
				return '#tmax ' + t;
			}
		}
	}
	if(x.sage && isSage(post)) {
		return '#sage';
	}
	if(x.notxt && post.Text === '') {
		return '#no text';
	}
	if(x.noimg && post.Img.snapshotLength === 0) {
		return '#no image';
	}
	return false;
}

function checkSpells(post) {
	if(!TNum && post.isOp) {
		return getSpells(tSpells, post) || getSpells(pSpells, post);
	}
	return getSpells(pSpells, post);
}

function hideBySpells(post) {
	var exp;
	if(Cfg.filthr === 0 && post.isOp) {
		return;
	}
	exp = checkSpells(post);
	if(post.Vis === 0) {
		if(post.noHide) {
			unhidePost(post);
		}
	} else if(exp) {
		hidePost(post, exp.substring(0, 70));
	}
}

function verifyRegExp(txt) {
	var i, t, rep,
		re = /#exp |#exph |#rep |#outrep |#imgn |#video |#theme /;
	txt = txt.split('\n');
	i = txt.length;
	while(i--) {
		t = txt[i];
		rep = t.match(re);
		if(rep) {
			try {
				strToRegexp(t.substr(t.indexOf(rep)));
			} catch(e) {
				return t;
			}
		}
	}
	return false;
}

function toggleSpells() {
	var fld = $id('DESU_spellEdit'),
		val = (fld ? fld.value : spellsList.join('\n')).replace(/[\r\n]+/g, '\n').replace(/^\n|\n$/g, ''),
		wrong = verifyRegExp(val);
	if(!wrong) {
		saveSpells(val);
	}
	if(val !== '' && !wrong) {
		if(fld) {
			fld.value = val;
		}
		if(Cfg.spells !== 0) {
			forAll(hideBySpells);
			hideTextTube();
		} else {
			unHideTextTube();
			forAll(function(post) {
				if(checkSpells(post)) {
					unhidePost(post);
				}
			})
		}
		saveHiddenPosts();
	} else {
		if(wrong) {
			$alert(Lng.error[lCode] + ' ' + wrong, '');
		}
		if(fld) {
			$id('DESU_spellChk').checked = false;
		}
		saveCfg('spells', 0);
	}
}

function applySpells(txt) {
	var nval, ntxt, wrong,
		fld = $id('DESU_spellEdit'),
		val = fld ? fld.value : spellsList.join('\n');
	if(txt !== '') {
		if(txt.trim() === '') {
			return;
		}
		if(TNum) {
			txt = '#' + brd + '/' + TNum + ' ' + txt;
		}
		toggleSpells();
		nval = '\n' + val;
		ntxt = '\n' + txt;
		val = nval.indexOf(ntxt) >= 0 ? nval.split(ntxt).join('') : val + ntxt;
	}
	val = val.replace(/[\r\n]+/g, '\n').replace(/^\n|\n$/g, '');
	wrong = verifyRegExp(val);
	if(wrong) {
		$alert(Lng.error[lCode] + ' ' + wrong, '');
		return;
	}
	if(fld) {
		fld.value = val;
		$id('DESU_spellChk').checked = val !== '';
	}
	forAll(function(post) {
		if(checkSpells(post)) {
			unhidePost(post);
		}
	})
	unHideTextTube();
	saveSpells(val);
	if(val !== '') {
		saveCfg('spells', 1);
		forAll(hideBySpells);
		hideTextTube();
	} else {
		saveCfg('spells', 0);
	}
	saveHiddenPosts();
}

/*--------------------------Hide posts with similar text----------------------*/

function getWrds(post) {
	return post.Text.replace(/\s+/g, ' ')
		.replace(/[\?\.\\\/\+\*\$\^\(\)\|\{\}\[\]!@#%_=:;<,-]/g, '')
		.substring(0, 800).split(' ');
}

function findSameText(post, oNum, oVis, oWords) {
	var j,
		words = getWrds(post),
		len = words.length,
		i = oWords.length,
		olen = i,
		_olen = i,
		n = 0;
	if(len < olen*0.4 || len > olen*3) {
		return;
	}
	while(i--) {
		if(olen > 6 && oWords[i].length < 3) {
			_olen--;
			continue;
		}
		j = len;
		while(j--) {
			if(words[j] === oWords[i] || oWords[i].match(/>>\d+/) && words[j].match(/>>\d+/)) {
				n++;
			}
		}
	}
	if(n < _olen*0.4 || len > _olen*3) {
		return;
	}
	$del($c('DESU_postNote', post));
	if(oVis !== 0) {
		hidePost(post, 'similar to >>' + oNum);
	} else {
		unhidePost(post);
	}
}

function hideBySameText(post) {
	var vis = post.Vis;
	if(post.Text !== '') {
		forAll(function(target) {
			findSameText(target, post.Num, vis, getWrds(post));
		});
		saveHiddenPosts();
	} else {
		applySpells('#notxt');
	}
}

/*---------------------------------Wipe detectors-----------------------------*/

function detectWipe_sameLines(txt) {
	var lines, i, x,
		arr = [],
		n = 0;
	if(Cfg.samel === 0) {
		return false;
	}
	lines = txt.replace(/> /g, '').split(/\s*\n\s*/);
	i = lines.length;
	if(i < 6) {
		return false;
	}
	while(i--) {
		x = lines[i];
		if(x.length === 0) {
			continue;
		}
		if(arr[x]) {
			arr[x]++;
		} else {
			arr[x] = 1;
		}
		n++;
	}
	n = n/4;
	for(x in arr) {
		if(arr[x] > n && arr[x] > 4) {
			return 'same lines: "' + x.substr(0, 20) + '" x' + (arr[x] + 1);
		}
	}
	return false;
}

function detectWipe_sameWords(txt) {
	var words, i, x,
		arr = [],
		n = 0,
		keys = 0,
		pop = '',
		mpop = -1;
	if(Cfg.samew === 0) {
		return false;
	}
	words = txt.replace(/[\s\.\?\!,>]+/g, ' ').toUpperCase().split(' ');
	i = words.length;
	if(i <= 13) {
		return false;
	}
	while(i--) {
		x = words[i];
		if(x.length < 2) {
			continue;
		}
		if(arr[x]) {
			arr[x]++;
		} else {
			arr[x] = 1;
		}
		n++;
	}
	if(n < 10) {
		return false;
	}
	for(x in arr) {
		keys++;
		if(arr[x] > mpop) {
			mpop = arr[x];
			pop = x;
		}
		if(n > 25 && arr[x] > n/3.5) {
			return 'same words: "' + x.substr(0, 20) + '" x' + arr[x];
		}
	}
	return n > 80 && keys <= 20 || n/keys > 7
		? 'same words: "' + pop.substr(0, 20) + '" x' + mpop
		: false;
}

function detectWipe_longColumn(txt) {
	var rows, i,
		n = 0;
	if(Cfg.longp === 0) {
		return false;
	}
	rows = txt.split(/\s*\n\s*/);
	i = rows.length;
	if(i > 50) {
		return 'long text x' + i;
	}
	while(i--) {
		if(rows[i].length < 9) {
			n++;
		} else {
			return false;
		}
	}
	return n > 5 ? 'columns x' + n : false;
}

function detectWipe_longWords(txt) {
	var words, i, x,
		all = '',
		longest = '',
		n = 0;
	if(Cfg.longw === 0) {
		return false;
	}
	words = txt.replace(/https*:\/\/.*?(\s|$)/g, '').replace(/[\s\.\?!,>:;-]+/g, ' ').split(' ');
	i = words.length;
	while(i--) {
		x = words[i];
		if(x.length < 2) {
			continue;
		}
		all += x;
		longest = x.length > longest.length ? x : longest;
		n++;
	}
	return n === 1 && longest.length > 70 || n > 1 && all.length/n > 12
		? 'long words: "' + longest.substr(0, 20) + '.."'
		: false;
}

function detectWipe_caseWords(txt) {
	var words, i, x,
		capsw = 0,
		casew = 0,
		n = 0;
	if(Cfg.caps === 0) {
		return false;
	}
	words = txt.replace(/[\s\.\?!;,-]+/g, ' ').trim().split(' ');
	if(words.length < 5) {
		return false;
	}
	for(i = 0; x = words[i++];) {
		if((x.match(/[a-zа-я]/ig) || []).length < 5) {
			continue;
		}
		if((x.match(/[A-ZА-Я]/g) || []).length > 2) {
			casew++;
		}
		if(x === x.toUpperCase()) {
			capsw++;
		}
		n++;
	}
	return (capsw/n >= 0.3 && n > 4) ? ('CAPSLOCK: ' + parseInt(capsw/words.length*100, 10) + '%')
		: (casew/n >= 0.3 && n > 8) ? ('cAsE words: ' + parseInt(casew/words.length*100, 10) + '%')
		: false;
}

function detectWipe_specSymbols(txt) {
	var len, proc;
	if(Cfg.specs === 0) {
		return false;
	}
	txt = txt.replace(/\s+/g, '');
	len = txt.length;
	proc = txt.replace(/[0-9a-zа-я\.\?!,]/ig, '').length/len;
	return len > 30 && proc > 0.4 ? 'specsymbols: ' + parseInt(proc*100, 10) + '%' : false;
}

function detectWipe_numbers(txt) {
	var len, proc;
	if(Cfg.nums === 0) {
		return false;
	}
	txt = txt.replace(/\s+/g, ' ').replace(/((>>\d+)+|https*:\/\/.*?)(\s|$)/g, '');
	len = txt.length;
	proc = (len - txt.replace(/\d/g, '').length)/len;
	return len > 30 && proc > 0.4 ? 'numbers: ' + parseInt(proc*100, 10) + '%' : false;
}

function detectWipe(post) {
	var arr, i, x;
	if(Cfg.awipe === 0) {
		return false;
	}
	arr = [
		detectWipe_sameLines,
		detectWipe_sameWords,
		detectWipe_longColumn,
		detectWipe_longWords,
		detectWipe_caseWords,
		detectWipe_specSymbols,
		detectWipe_numbers
	];
	for(i = 0; i < 7; i++) {
		x = arr[i](post.Text);
		if(x) {
			return x;
		}
	}
	return false;
}

function hideByWipe(post) {
	var note;
	if(Cfg.filthr === 0 && post.isOp || post.Vis === 0 || post.Vis === 1) {
		return;
	}
	note = detectWipe(post);
	if(note) {
		hidePost(post, note);
	} else {
		applyPostVisib(post, 1, '');
	}
}


/*==============================================================================
									UPDATING
==============================================================================*/

function checkForUpdates(force, onlyIfNew, fn) {
	if(Cfg.supdint === 6) return;
	var t = +(new Date()).getTime(), updInt, day = 2*1000*60*60*24;
	switch(Cfg.supdint) {
	case 0:
		updInt = 0;
		break;
	case 1:
		updInt = day;
		break;
	case 2:
		updInt = day * 2;
		break;
	case 3:
		updInt = day * 7;
		break;
	case 4:
		updInt = day * 14;
		break;
	case 5:
		updInt = day * 30;
		break;
	}	
	if(force || t - +Cfg.lupdchk >= updInt) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/' + 
				(Cfg.betaupd ? 'master' : 'stable') + '/Dollchan_Extension_Tools.meta.js',
			headers: {
				'Content-Type': 'text/plain'
			},
			onreadystatechange: function(xhr) {
				if(xhr.readyState === 4) {
					if(xhr.status === 200) {
						var dVer = xhr.responseText.match(/@version\s+([0-9.]+)/)[1].split('.'),
							cVer = Cfg.version.substring(2).split('.'),
							len = cVer.length > dVer.length ? cVer.length : dVer.length,
							i = 0, upd = false;
						if(!dVer) {
							if(!onlyIfNew) {
								fn('<div style="color: red; font-weigth: bold;">' + Lng.noConnect[lCode] + '</div>');
							}
							return;
						}
						Cfg.lupdchk = t;
						while(i < len) {
							if((+dVer[i] || 0) > (+cVer[i] || 0)) {
								upd = true;
								break;
							}
							i++;
						}
						if(upd) {
							fn('<a style="color: blue; font-weight: bold;" href="' +
								'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/' + 
								(Cfg.betaupd ? 'master' : 'stable') + '/Dollchan_Extension_Tools.user.js">' +
								Lng.upd[11][lCode] + '</a>');
						} else if(!onlyIfNew) {
							fn(Lng.upd[12][lCode]);
						}
					} else if(!onlyIfNew) {
						fn('<div style="color: red; font-weigth: bold;">' + Lng.noConnect[lCode] + '</div>');
					}
				}
			}
		});
	}
}

/*==============================================================================
								INITIALIZATION
==============================================================================*/

function replyForm(f) {
	var rf = {},
		tr = aib._7ch ? 'li' : 'tr',
		pre = './/' + tr + '[not(contains(@style,"none"))]//input[not(@type="hidden") and ';
	if(!f) {
		return;
	}
	rf.on = true;
	rf.isQuick = false;
	rf.tNum = TNum;
	rf.form = f;
	rf.tr = 'ancestor::' + tr + '[1]';
	rf.recap = $x('.//input[@id="recaptcha_response_field"]', f);
	rf.cap = $x('.//input[contains(@name,"aptcha") and not(@name="recaptcha_challenge_field")]', f)
		|| rf.recap;
	rf.txta = $x('.//' + tr + '//textarea' + (aib.krau ? '[@name="internal_t"]' : '[last()]'), f);
	rf.subm = $x('.//' + tr + '//input[@type="submit"]', f);
	rf.file = $x('.//' + tr + '//input[@type="file"]', f);
	rf.passw = $x('.//' + tr + '//input[@type="password"]', f);
	rf.gothr = $x('.//tr[@id="trgetback"]|.//input[@type="radio" or @name="gotothread"]/ancestor::tr[1]', f);
	rf.name = $x(pre + '(@name="field1" or @name="name" or @name="internal_n" '
		+ 'or @name="nya1" or @name="akane")]', f);
	rf.mail = $x(pre + (
		aib._410 ? '@name="sage"]'
		: aib.futr ? '@name="denshimeru"]'
		: '(@name="field2" or @name="em" or @name="sage" '
			+ 'or @name="email" or @name="nabiki" or @name="dont_bump")]'
	), f);
	rf.subj = $x(pre + '(@name="kasumi" or @name="nya3" or @name="internal_s" '
		+ 'or @name="subject" or @name="field3" or @name="sub")]', f);
	return rf;
}

function aibDetector(host, dc) {
	var h = host.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/)[0],
		ai = {};
	ai.dm = h;
	ai.hana = $$xb('.//script[contains(@src,"hanabira")]', dc, dc);
	ai.krau = h === 'krautchan.net';
	ai.tiny = $$xb('.//p[@class="unimportant"]/a[@href="http://tinyboard.org/"]', dc, dc);
	ai.gazo = h === '2chan.net';
	ai.brit = h === 'britfa.gs';
	ai.xDForm =
		ai.brit ? './/div[@class="threadz"]'
		: './/form[' + (
			ai.hana || ai.krau ? 'contains(@action,"delete")]'
			: ai.tiny ? '@name="postcontrols"]'
			: ai.gazo ? '2]'
			: '@id="delform" or @name="delform"]'
		);
	if(dc === doc && !(dForm = $x(ai.xDForm, doc))) {
		return ai;
	}
	ai.host = host;
	ai.kus = $$xb('.//script[contains(@src,"kusaba")]', dc, dc);
	ai.abu = $$xb('.//script[contains(@src,"wakaba_new.js")]', dc, dc);
	ai.fch = h === '4chan.org';
	ai.nul = h === '0chan.ru';
	ai._7ch = h === '7chan.org';
	ai._410 = h === '410chan.ru';
	ai.sib = h === 'sibirchan.ru';
	ai._5ch = h === '5channel.net';
	ai.hid = h === 'hiddenchan.i2p';
	ai.tire = h === '2--ch.ru' || h === '78.108.183.53';
	ai.dfwk = h === 'dfwk.ru';
	ai.pony = h === 'ponychan.net';
	ai.vomb = h === 'vombatov.net';
	ai.ment = h === '02ch.org' || h === '02ch.net';
	ai.futr = h === '2chan.su';
	ai._420 = h === '420chan.org';
	ai.xThreads = ai.sib ? 'div' : ('.//div[' + (
		$$xb('.//div[contains(@id,"_info") and contains(@style,"float")]', dc, dc)
			? 'starts-with(@id,"t") and not(contains(@id,"_info"))'
		: ai._420 ? 'contains(@id,"thread")'
		: 'starts-with(@id,"thread")' + (ai._7ch ? 'and not(@id="thread_controls")' : '')
	) + ']');
	ai.waka = $$xb('.//p[@class="footer"]/a[@href="http://wakaba.c3.cx/"]|.//a[starts-with(@href,"wakaba.pl")]', dc, dc)
		|| !$$xb(ai.xThreads, dc, dc);
	ai.xRef =
		ai.tiny ? 'p[@class="intro"]/a[@class="post_no"][2]|div/p[@class="intro"]/a[@class="post_no"][2]'
		: ai.fch ? 'span[starts-with(@id,"no")]'
		: false;
	ai.cRef =
		ai.krau ? 'postnumber'
		: ai.gazo ? 'del'
		: 'reflink';
	ai.xMsg =
		ai.hana ? './/div[@class="postbody"]'
		: ai.tiny ? './/p[@class="body"]'
		: ai._7ch ? './/p[@class="message"]'
		: './/blockquote';
	ai.cMsg =
		ai.hana ? 'postbody'
		: ai.tiny ? 'body'
		: ai._7ch ? 'message'
		: false;
	ai.cOPosts =
		ai.krau ? 'omittedinfo'
		: ai.hana ? 'abbrev'
		: 'omittedposts';
	ai.cTitle =
		ai.krau ? 'postsubject'
		: ai.tiny ? 'subject'
		: ai.hana ? 'replytitle'
		: 'filetitle';
	ai.pClass =
		ai.krau ? 'postreply'
		: ai.tiny ? 'post reply'
		: 'reply';
	ai.tClass = ai.krau ? 'thread_body' : 'thread';
	ai.xTNum = ai.gazo || ai.fch ? 'input[@type="checkbox"]' : 'a[@name]' + (ai.sib ? '[2]' : '');
	ai.rTNum = '\\d+' + (ai._420 ? '$' : '');
	ai.table =
		ai.fch ? 'table[not(@class="exif")]'
		: ai.tire ? 'table[not(@class="postfiles")]'
		: 'table';
	ai.xWrapper =
		ai.brit ? 'div[contains(@class,"DESU_thread")]/table[2]|div[contains(@class,"DESU_thread")]/div/table'
		: './/div[contains(@class," DESU_thread")]//' + ai.table;
	ai.opClass =
		ai.kus ? 'postnode'
		: ai.brit ? 'originalpost'
		: 'oppost';
	ai.getMsg = ai.cMsg
		? function(el) {
			return $c(ai.cMsg, el);
		}
		: function(el) {
			return $t('blockquote', el);
		};
	ai.getRef =
		ai.xRef ? function(el) {
			return $x(ai.xRef, el);
		}
		: ai.sib ? function(el) {
			return $c(ai.cRef, el) || $c('filesize', el);
		}
		: function(el) {
			return $c(ai.cRef, el);
		};
	ai.getOmPosts = ai.gazo
		? function(el, dc) {
			return $$x('.//font[@color="#707070"]', el, dc);
		}
		: function(el) {
			return $c(ai.cOPosts, el);
		};
	ai.getTNum =
		ai.fch || ai.gazo || ai.sib || ai.brit || (ai.waka && !ai.abu) ? function(op, dc) {
			return ($$x(ai.xTNum, op, dc).name).match(/\d+/)[0];
		}
		: ai.krau ? function(op, dc) {
			return op.parentNode.previousElementSibling.name;
		}
		: function(op, dc) {
			return op.parentNode.id.match(ai.rTNum)[0];
		};
	ai.getOp = (ai.abu || ai.hana || ai.kus || ai.brit) && $c(ai.opClass, doc)
		? function(thr, dc) {
			return $c(ai.opClass, thr);
		}
		: function(thr, dc) {
			var i,
				op = $$new('div', null, null, dc),
				opEnd = $$x(ai.table + '|div[starts-with(@id,"repl")]', thr, dc);
			while((i = thr.firstChild) !== opEnd) {
				op.appendChild(i);
			}
			if(ai._7ch) {
				(i = $$new('div', null, null, dc)).appendChild(op);
				op.className = 'post'; op = i;
			}
			if(thr.childElementCount) {
				$before(thr.firstChild, [op]);
			} else {
				thr.appendChild(op);
			}
			return op;
		};
	ai.getPNum = ai.gazo
		? function(post) {
			return $t('input', post).name;
		}
		: function(post) {
			return post.id.match(/\d+/)[0];
		};
	return ai;
}

function getThrdUrl(h, b, tNum) {
	return 'http://' + h + '/' + b + '/'
		+ ((h.indexOf('krautchan.net') + 1) ? 'thread-' : 'res/') + tNum + (
			(h.indexOf('dobrochan.') + 1) ? '.xhtml'
			: (h.indexOf('2chan.net') + 1) ? '.htm'
			: (h.indexOf('420chan.org') + 1) ? '.php'
			: '.html'
		);
}

function fixDomain() {
	try {
		doc.domain = aib.dm;
	} catch(e) {
		aib.dm = doc.domain;
	}
}

function fixUneval() {
	if(typeof uneval !== 'function') {
		(function(){var f=[],g={"\t":"t","\n":"n","\u000b":"v","\u000c":"f","\r":"\r","'":"'",'"':'"',"\\":"\\"},h=function(b){if(b in g)return"\\"+g[b];var c=b.charCodeAt(0);return c<32?"\\x0"+c.toString(16):c<127?"\\"+b:c<256?"\\x"+c.toString(16):c<4096?"\\u0"+c.toString(16):"\\u"+c.toString(16)},i=function(b){return b.toString()},j={"boolean":i,number:i,string:function(b){return"'"+b.toString().replace(/[\x00-\x1F\'\"\\\u007F-\uFFFF]/g,h)+"'"},undefined:function(){return"undefined"},"function":i}, k=function(b,c){var a=[],d;for(d in b)b.hasOwnProperty(d)&&(a[a.length]=uneval(d)+":"+uneval(b[d],1));return c?"{"+a.toString()+"}":"({"+a.toString()+"})"},uneval_set=function(b,c,a){f[f.length]=[b,c];j[c]=a||k};uneval_set(Array,"array",function(b){for(var c=[],a=0,d=b.length;a<d;a++)c[a]=uneval(b[a]);return"["+String(c)+"]"});uneval_set(RegExp,"regexp",i);uneval_set(Date,"date",function(b){return"(new Date("+b.valueOf()+"))"});window.uneval=function(b,c){var a;if(b===void 0)a="undefined";else if(b===null)a= "null";else{a:if(a=typeof b,a=="object"){a=0;for(var d=f.length;a<d;a++)if(b instanceof f[a][0]){a=f[a][1];break a}a="object"}a=(j[a]||k)(b,c)}return a}})();
	}
}

function fixGM() {
	if(!('GM_log' in window)) {
		window.GM_log = function() {};
	}
	if(!('GM_xmlhttpRequest' in window)) {
		window.GM_xmlhttpRequest = function(obj) {
			var xhr = new window.XMLHttpRequest();
			xhr.onreadystatechange = function() {
				obj.onreadystatechange(xhr);
			};
			xhr.onload = function() {
				try{
					obj.onload(xhr);
				} catch(e) {}
			};
			xhr.open(obj.method, obj.url, true);
			xhr.setRequestHeader('Accept-Encoding', 'deflate, gzip, x-gzip');
			xhr.finalUrl = obj.url;
			xhr.send(null);
		};
	}
}

function initBoard() {
	var ua, gs, ss, ls, se, url;
	if(/^(?:about|chrome|opera|res)/i.test(window.location)) {
		return false;
	}
	aib = aibDetector(window.location.hostname, doc);
	if(/DESU_iframe/.test(window.name)) {
		fixDomain();
		return false;
	}
	if(/DESU_favIframe/.test(window.name)) {
		liteMode = true;
	}
	if(!dForm || $id('DESU_panel')) {
		return false;
	}
	if(aib.hid) {
		window.setTimeout = function(fn, num) {
			if(typeof fn === 'function') fn();
			return 1;
		};
	}
	fixDomain();
	fixUneval();
	fixGM();
	ua = window.navigator.userAgent;
	nav = {
		Firefox: +(ua.match(/mozilla.*? rv:(\d+)/i) || [0, 0])[1],
		Opera: +(ua.match(/opera(?:.*version)?[ \/]([\d.]+)/i) || [0, 0])[1],
		Chrome: /chrome/i.test(ua)
	};
	gs = nav.Firefox && typeof GM_setValue === 'function';
	ss = nav.Opera && !!scriptStorage;
	ls = 'localStorage' in window && typeof localStorage === 'object';
	se = 'sessionStorage' in window && (sessionStorage.test = 1) === 1;
	sav = {
		GM: !!gs,
		script: ss,
		local: ls,
		cookie: !ls && !ss && !gs,
		session: se,
		isGlobal: gs || ss
	};
	url = (window.location.pathname || '')
		.match(/^\/?(?:(.*?)\/*)?(res\/|thread-)?(\d+|index|wakaba)?(\.(?:[xme]*html?|php))?$/);
	brd = url[1] || (aib.dfwk ? 'df' : '');
	res = aib.krau ? 'thread-' : 'res/';
	TNum = url[2] ? url[3] : false;
	pageNum = url[3] && !TNum ? +url[3] || 0 : 0;
	docExt = url[4] || (
		aib.gazo ? '.htm'
		: aib._420 ? '.php'
		: '.html'
	);
	favIcon = $x('.//head//link[@rel="shortcut icon"]', doc);
	if(favIcon) {
		favIcon = favIcon.href;
	}
	cssFix =
		nav.Firefox ? '-moz-'
		: nav.Chrome ? '-webkit-'
		: '';
	dummy = $new('div', null, null);
	pr = replyForm($x('.//textarea/ancestor::form[1]', doc));
	oeForm = $x('.//form[contains(@action,"paint") or @name="oeform"]', doc);
	$Del(
		'preceding-sibling::node()' + (aib.fch ? '[not(self::center)]' : '')
			+ '[preceding-sibling::*[descendant-or-self::*['
			+ (aib.abu ? 'self::form' : 'self::div[@class="logo"]') + ' or self::h1]]]',
		dForm
	);
	if(aib.krau) {
		$del($t('hr', dForm));
		$del($t('hr', dForm.previousElementSibling));
	}
	pPanel = $New('span', {'Class': 'DESU_postPanel'}, [
		$new('a', {
			'Class': 'DESU_btnHide',
			'href': '#'
		}, null),
		$if(pr.on || oeForm, $new('a', {
			'Class': 'DESU_btnRep',
			'href': '#'
		}, null))
	]);
	opPanel = pPanel.cloneNode(true);
	opPanel.className += '_op';
	$append(opPanel, [
		$if(!TNum, $new('a', {
			'Class': 'DESU_btnExpthr',
			'href': '#'
		}, null)),
		$new('a', {
			'Class': 'DESU_btnFav',
			'href': '#'
		}, null)
	]);
	return true;
}

function pushPost(post, i) {
	Posts.push(post);
	post.isOp = i === 0;
	post.Count = i;
	post.Msg = aib.getMsg(post);
	post.Text = getText(post.Msg);
	post.Img = getImages(post);
	pByNum[post.Num] = post;
	if(i === 0) {
		tByCnt.push(post);
	}
}

function forEachThread(node, dc, fn) {
	var threads, el, tEl,
		pThr = false;
	if((threads = node.getElementsByClassName(aib.tClass)).length === 0) {
		threads = $$X(aib.xThreads, node, dc);
		if(threads.snapshotLength !== 0) {
			$each(threads, fn);
		} else {
			el = node.firstChild;
			while(1) {
				threads = $$new('div', null, null, dc);
				while(el && (tEl = el.nextSibling) && tEl.tagName !== 'HR') {
					threads.appendChild(el); el = tEl;
				}
				if(pThr) {
					$after(pThr, threads);
				} else {
					$before(node.firstChild, [threads]);
				}
				if(!el || !tEl) {
					return;
				}
				if(threads.childElementCount) {
					fn(threads);
				}
				pThr = tEl; el = tEl.nextSibling;
			}
		}
	} else {
		for(el = 0, tEl = threads.length; el < tEl; el++) {
			fn(threads[el]);
		}
	}
}

function parseDelform(node, dc, tFn, pFn) {
	var i, len, op, post, psts;
	for(i = node.getElementsByTagName('script'), len = i.length; len--;) {
		$del(i[len]);
	}
	forEachThread(node, dc, function(thr) {
		if(aib.tiny || aib._420) {
			$after(thr, thr.lastChild);
		}
		op = aib.getOp(thr, dc);
		if(aib.brit) {
			$before($t('blockquote', op), [$new('div', null, null), post = $new('br', null, null)]);
			while((i = thr.firstChild).tagName !== 'TABLE') {
				$after(post, i);
				post = i;
			}
			$before(thr.firstChild, [len = $new('div', null, null)]);
			$each($$X('node()', op, dc), function(el) {
				len.appendChild(el);
			});
			$del($t('table', thr));
			op = len;
		}
		thr.className += ' DESU_thread';
		op.className += ' DESU_oppost';
		op.Num = thr.Num = aib.getTNum(op, dc);
		op.thr = thr;
		if(tFn) {
			tFn(thr);
		}
		pFn(op, 0);
		if(aib.gazo) {
			psts = [];
			$each($$X('table/tbody/tr/td[2]', thr, dc), function(el) {
				psts.push(el);
			});
		} else {
			psts = thr.getElementsByClassName(aib.pClass);
		}
		if((thr.pCount = psts.length) > 0) {
			for(i = 0, len = psts.length; i < len; i++) {
				post = psts[i]; post.thr = thr;
				post.className += ' DESU_post';
				post.Num = aib.getPNum(post);
				pFn(post, i + 1);
			}
		}
		if(!tFn) {
			if(!TNum) {
				thr.pCount += (i = aib.getOmPosts(thr, dc)) && (i = i.textContent)
					? +(i.match(/\d+/) || [0])[0]
					: 0;
			}
			thr.dTitle = ((i = $c(aib.cTitle, op)) && i.textContent.trim() || op.Text)
				.substring(0, 70).replace(/\s+/g, ' ');
		}
	});
	if(window.location.hash && (post = pByNum[window.location.hash.substring(1)])) {
		$event(window, {
			'load': function() {
				setTimeout(function() {
					post.className += ' DESU_post';
				}, 1e3);
			}
		});
	}
	if(liteMode) {
		$$Del('preceding-sibling::node()|following-sibling::node()', dForm, dc);
	}
	if(!aib._7ch && !aib.tiny && !postWrapper) {
		postWrapper = $$x(aib.xWrapper, node, dc);
		if(dc !== doc && postWrapper) {
			postWrapper = doc.importNode(postWrapper, true);
		}
	}
	return node;
}

function replaceDelform(node) {
	var txt;
	if(aib.fch || aib.krau || Cfg.ctime && timeRegex || Cfg.spells !== 0 && oSpells.rep[0]) {
		txt = node.innerHTML;
		if(Cfg.ctime && timeRegex) {
			txt = fixTime(txt);
		}
		if(aib.fch || aib.krau) {
			txt = txt.replace(/(^|>|\s|&gt;)(https*:\/\/.*?)(?=$|<|\s)/ig, '$1<a href="$2">$2</a>');
		}
		if(Cfg.spells !== 0 && oSpells.rep[0]) {
			txt = doReplace(oSpells.rep, txt);
		}
		node.innerHTML = txt;
	}
}

function initDelform() {
	dForm.id = '';
	$disp(dForm);
	try {
		parseDelform(dForm, doc, false, pushPost);
	} catch(e) {
		$disp(dForm);
		return false;
	}
	if(!nav.Chrome) {
		$disp(dForm);
	}
	return true;
}

/*==============================================================================
									MAIN
==============================================================================*/

function doScript() {
	var initTime = (new Date()).getTime();
	oldTime = initTime;
	if(!initBoard()) {
		return;
	}
	Log('initBoard');
	readCfg();
	Log('readCfg');
	replaceDelform(dForm);
	Log('replaceDelform');
	if(!initDelform()) {
		return;
	}
	Log('initDelform');
	if(Cfg.keynav !== 0) {
		initKeyNavig();
		Log('initKeyNavig');
	}
	if(!liteMode) {
		addPanel();
		Log('addPanel');
	}
	doChanges();
	Log('doChanges');
	if(!liteMode) {
		readFavorites();
		Log('readFavorites');
	}
	forAll(addPostButtons);
	Log('addPostButtons');
	readPostsVisib();
	Log('readPostsVisib');
	if(Cfg.navmrk !== 0) {
		readViewedPosts();
		Log('readViewedPosts');
	}
	forAll(doPostFilters);
	Log('doPostFilters');
	if(Cfg.delhd === 1) {
		forAll(mergeHidden);
		Log('mergeHidden');
	}
	if(Cfg.expimg !== 0) {
		forAll(eventPostImg);
		Log('eventPostImg');
	}
	if(Cfg.expost !== 0 && !TNum) {
		forAll(expandPost);
		Log('expandPost');
	}
	if(Cfg.mp3 !== 0) {
		addLinkMP3(null);
		Log('addLinkMP3');
	}
	if(Cfg.ytube !== 0) {
		addLinkTube(null);
		Log('addLinkTube');
	}
	if(Cfg.addimg !== 0) {
		addLinkImg(true, dForm);
		Log('addLinkImg');
	}
	if(Cfg.imgsrc !== 0) {
		addImgSearch(dForm);
		Log('addImgSearch');
	}
	if(Cfg.navig === 2) {
		addRefMap(null, false);
		Log('addRefMap');
	}
	if(Cfg.navig !== 0) {
		eventRefLink(dForm);
		Log('eventRefLink');
	}
	saveHiddenPosts();
	Log('saveHiddenPosts');
	scriptCSS();
	Log('scriptCSS');
	endTime = (new Date()).getTime() - initTime;
	if(Cfg.enupd !== 0) {
		checkForUpdates(false, true, function(html) {
			$alert(html);
		});
	}
}

if(window.opera) $event(doc, {'DOMContentLoaded': doScript});
else doScript();
})(window.opera ? window.opera.scriptStorage : null);
