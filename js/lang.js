var xhr = require('xhr')
var runParallel = require('run-parallel')
var locale = require('browser-locale')() || 'en-US'
var userLang = locale.toLowerCase()

// fetch translation data files
runParallel([
  function(done) {
    xhr({url: 'languages/languages.json', json: true}, function(err, resp, languages) {
      if (err) console.error('could not fetch languages.json', err)
      done(err, languages)
    })
  },
  function(done) {
    xhr({url: 'languages/selectors.json', json: true}, function(err, resp, selectors) {
      if (err) console.error('could not fetch languages/selectors.json', err)
      done(err, selectors)
    })
  }],
  function(errors, results) {
    if (errors) return
    var languages = results[0]
    var selectors = results[1]

    translate(languages, selectors)
    
    $(document.body).on( "click", "a.switch-lang", function(e) {
      e.preventDefault()
      var lang = $(e.target).attr('data-lang')
      translateToLang(lang, languages, selectors)
      return false
    })
  }
)

function translate(languages, selectors) {
  var lang = localStorage.getItem('lang') || userLang
  
  var supported = languages[lang]
  if (!supported) supported = languages[lang.substr(0, 2)]
  if (!supported) lang = null

  if (!lang) {
    lang = "en"
    $(document.body).attr("data-lang", 'en')
  }
  
  translateToLang(lang, languages, selectors)
}

function resetLang() {
  localStorage.setItem('lang', 'en')
  window.location.reload()
}

function translateToLang(lang, languages, selectors) {
  addTranslationNav(lang, languages)

  if (lang === $(document.body).attr("data-lang")) return
  if (lang === 'en') return resetLang()
  
  xhr({url: 'languages/' + lang + '.json', json: true}, function(err, resp, keys) {
    if (err) return console.error('Could not fetch translation json for', lang)
    $(document.body).attr("data-lang", lang)
    localStorage.setItem('lang', lang)  
    translateHTML(lang, keys, selectors)
  })
}

function translateHTML(lang, translation, selectors) {
  Object.keys(selectors).forEach(function(selector) {
    var value = translation[selectors[selector]]
    if (!value) return console.log("Warning: Translation missing: " + selector, lang)
    $(selector).html(value)
  })
}

function createLangButton(lang, langName, selectedLang) {
  return $('<li class="nav-lang-' + lang + '">')
    .toggleClass("selected", lang === selectedLang)
    .html(lang === selectedLang ? langName : '<a href="#" class="switch-lang" data-lang="' + lang + '">' + langName + '</a>')
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
  nav.insertBefore("header > *:first-child")
}
