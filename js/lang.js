var xhr = require('xhr')
var locale = require('browser-locale')() || 'en-US'
var userLang = locale.toLowerCase()

xhr({url: 'languages/languages.json', json: true}, function (error, response, result) {
  if (error) console.error('could not fetch languages.json', error)
  var languages = result
  // colelct all data-i18n attributes values on page
  var i18nSpecifiers = $('[data-i18n]').toArray().map(function (node) {
    return $(node).attr('data-i18n')
  })
  translate(languages, i18nSpecifiers)
  
  $(document.body).on( "click", "a.switch-lang", function(e) {
    e.preventDefault()
    var lang = $(e.target).attr('lang')
    translateToLang(lang, languages, i18nSpecifiers)
    return false
  })
})
  
function translate(languages, i18nSpecifiers) {
  var lang = localStorage.getItem('lang') || userLang
  
  var supported = languages[lang]
  if (!supported) supported = languages[lang.substr(0, 2)]
  if (!supported) lang = null

  if (!lang) {
    lang = "en"
    $('html').attr("lang", 'en')
  }
  
  translateToLang(lang, languages, i18nSpecifiers)
}

function resetLang() {
  localStorage.setItem('lang', 'en')
  window.location.reload()
}

function translateToLang(lang, languages, i18nSpecifiers) {
  addTranslationNav(lang, languages)

  if (lang === $('html').attr("lang")) return
  if (lang === 'en') return resetLang()
  
  xhr({url: 'languages/' + lang + '.json', json: true}, function(err, resp, keys) {
    if (err) return console.error('Could not fetch translation json for', lang)
    $('html').attr("lang", lang)
    localStorage.setItem('lang', lang)  
    translateHTML(lang, keys, i18nSpecifiers)
  })
}

function selectorFor(i18nSpecifier) {
  return '[data-i18n="' + i18nSpecifier + '"]'
}

function translateHTML(lang, translation, i18nSpecifiers) {
  i18nSpecifiers.forEach(function(i18nSpecifier) {
    var value = translation[i18nSpecifier]
    if (!value) return console.log("Warning: Translation missing: " + i18nSpecifier, lang)
    $(selectorFor(i18nSpecifier)).html(value)
  })
}

function createLangButton(lang, langName, selectedLang) {
  return $('<li class="nav-lang-' + lang + '">')
    .toggleClass("selected", lang === selectedLang)
    .html(lang === selectedLang ? langName : '<a href="#" class="switch-lang" lang="' + lang + '">' + langName + '</a>')
}

function addTranslationNav(selectedLang, languages) {
  // remove existing nav if it's there
  $('ul.nav-lang').remove()
  // build new nav
  var nav = $('<ul class="nav-lang"></ul>')
  createLangButton("en", "English", selectedLang).appendTo(nav)
  Object.keys(languages).forEach(function(key) {
    createLangButton(key, languages[key], selectedLang).appendTo(nav)
  })
  $('header > *:first-child')
    .before('<a class="skip" href="#main">Skip to Content</a>')
    .before(nav)
}

// skip navigation polyfill, partly from: http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
$(window)
  .on('hashchange', function(event) {
    console.log(11)
    var element = document.getElementById(location.hash.substring(1))
    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1
      }
      element.focus()
    }
  })
  .trigger('hashchange')
