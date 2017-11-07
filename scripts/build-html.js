#!/usr/bin/env node

const Path = require('path')
const Fs = require('fs')
const jsdom = require('jsdom')
const mkdirp = require('mkdirp')
const cmdwatcher = require('./util/cmdwatcher')
const LANGS = Path.join(__dirname, '../languages/languages.json')
const FOOTER = Path.join(__dirname, '../footer.html')

function createLangButton(dom, file, lang, langName) {
var li = dom.createElement('li')
  li.className = 'nav-lang-' + lang
  li.innerHTML = '<a href="/' + (lang === 'en' ? '' : lang + '/') + (file === 'index.html' ? '' : file) + '" class="switch-lang" lang="' + lang + '">' + langName + '</a>'
  return li
}

function createSkipButton(dom) {
  var a = dom.createElement('a')
  a.className = 'skip'
  a.href = '#main'
  a.innerHTML = 'Skip to Content'
  return a
}

function addTranslationNav(dom, file, languages) {
	var items = [];
  var nav = dom.createElement('ul')
  nav.className = "nav-lang"

  Object.keys(languages).sort(function (a, b) {
  	return languages[a] > languages[b] ? 1 : -1
  }).forEach(function(lang) {
  	var button = createLangButton(dom, file, lang, languages[lang])
  	items.push(button.firstChild)
    nav.appendChild(button)
  })
  var node = dom.querySelector('header > *:first-child')
  if (node) {
  	node.parentNode.insertBefore(createSkipButton(dom), node)	
  	node.parentNode.insertBefore(nav, node)
  }
  return items
}

function createLanguageLink(dom, href, locale) {
  var link = dom.createElement('link')
  link.setAttribute('rel', 'alternate')
  link.setAttribute('href', href)
  link.setAttribute('hreflang', locale)
  return link
}

function addLanguageLinks(dom, file, locales) {
  var head = dom.querySelector('head')
  return Object.keys(locales).map(function (locale) {
		var link = createLanguageLink(dom, (locale != 'en' ? '/' + locale : '') + '/' + (file === 'index.html' ? '' : file), locale)
		head.appendChild(link)
		return link
  })
}

function getNodeByLanguage(nodes, lang) {
	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i]
		var attr = (node.attributes.lang || node.attributes.hreflang)
		if (attr.nodeValue === lang) {
			return node
		}
	}
}

cmdwatcher('build-html'
	     , '!(node_modules).html'
	     , 'languages/**'
	     , function processFiles(files)
{
	var languages
	try {
		languages = JSON.parse(Fs.readFileSync(LANGS, 'utf8'))
	} catch (e) {
		return console.log('Error while processing %s:\n%s', LANGS, e)
	}
	var translations = {}
	Object.keys(languages).forEach(function (lang) {
		var raw
		  , translationPath = Path.join(__dirname, '../languages/', lang + '.json')
		try {
			raw = Fs.readFileSync(translationPath, 'utf8')
		} catch (e) {
			delete languages[lang]
			console.log('Error while loading language definition %s:\n%s', translationPath, e)
			return
		}
		try {
			translations[lang] = JSON.parse(raw)
		} catch (e) {
			delete languages[lang]
			console.log('Error while parsing language definition %s:\n%s', translationPath, e)
			return
		}
	})
	languages['en'] = 'English'
	files.forEach(function (file) {
		var raw
		  , dom
		  , original
		try {
			raw = Fs.readFileSync(file, 'utf8')
		} catch(e) {
			return console.log('Error while reading %s:\n%s', file, e)
		}
		try {
			dom = jsdom.jsdom(raw)
		} catch(e) {
			return console.log('Error while domify %s:\n%s', file, e)
		}

		var footer = dom.querySelector('footer')
		if(footer) {
			var footerHtml = Fs.readFileSync(FOOTER, 'utf8')
			footer.innerHTML = footerHtml
		}
		
		var list = dom.querySelectorAll('[data-i18n]')
		if (list) {
			original = {}
			for (var i = 0; i < list.length; i++) {
				var node = list[i]
				var key = node.attributes['data-i18n'].value
				original[key] = node.innerHTML
			}
		}
		translations['en'] = original

		var html = dom.querySelector('html')
		var localeLinks = addLanguageLinks(dom, file, languages)
		var nav = addTranslationNav(dom, file, languages)

		Object.keys(languages).forEach(function (lang) {
			var translation = translations[lang]
			  , outputPath = Path.join('.build/', (lang === 'en' ? '' : lang + '/'), file)
			  , outputDir = Path.dirname(outputPath)
			  , output
			html.setAttribute('lang', lang)
			if (list) {
				try {
					for (var i = 0; i < list.length; i++) {
						var node = list[i]
						var key = node.attributes['data-i18n'].value
						var newValue = translation[key]
						node.innerHTML = typeof newValue === 'string' ? newValue : original[key] 
					}
					
					var langButton = getNodeByLanguage(nav, lang).parentNode;
					var langLink = getNodeByLanguage(localeLinks, lang)
					var _className = langButton.className
					var _html = langButton.innerHTML
					var _linkParent = langLink.parentNode
					_linkParent.removeChild(langLink)
					langButton.className += 'selected'
					langButton.innerHTML = languages[lang]
					output = jsdom.serializeDocument(dom)
					langButton.className = _className
					langButton.innerHTML = _html
					_linkParent.appendChild(langLink)
				} catch (e) {
					return console.log('Couldn\'t process the %s [lang %s]:\n%s', file, lang, e)
				}
			} else {
				output = raw
			}
			try {
				mkdirp.sync(outputDir);
			} catch (e) {
				return console.log('Error trying to create directory %s for %s [lang %s]:\n%s', outputDir, outputPath, lang, e)
			}
			try {
				Fs.writeFileSync(outputPath, output)	
			} catch (e) {
				return console.log('Couldn\'t write %s -> %s [lang %s]:\n%s', file, outputPath, lang, e)
			}
		});
	})
})