// CSV method from https://github.com/knrz/CSV.js Copyright (c) 2014 Kash Nouroozi
!function(){"use strict";function t(t){var n=typeof t;return"function"===n||"object"===n&&!!t}function n(t){return"[object Array]"==toString.call(t)}function e(t){return"[object String]"===toString.call(t)}function i(t){return!isNaN(Number(t))}function r(t){return 0==t||1==t}function o(t){return null==t}function c(t){return null!=t}function u(t,n){return c(t)?t:n}function l(t,n){for(var e=0,i=t.length;i>e&&n(t[e],e)!==!1;)e++;return t}function a(t){return"attrs["+t+"]"}function s(t,n){return i(t)?"Number("+a(n)+")":r(t)?"Boolean("+a(n)+" == true)":"String("+a(n)+")"}function f(t,e,i){var r=[];return 2==arguments.length?(t?n(t)?l(e,function(n,e){r.push(t[e]+"("+a(e)+")")}):l(e,function(t,n){r.push(s(t,n))}):l(e,function(t,n){r.push(a(n))}),r="return ["+r.join(",")+"]"):(t?n(t)?l(e,function(n,e){r.push('"'+i[e]+'": '+t[e]+"("+a(e)+")")}):l(e,function(t,n){r.push('"'+i[n]+'": '+s(t,n))}):l(e,function(t,n){r.push('"'+i[n]+'": '+a(n))}),r="return {"+r.join(",")+"}"),new Function("attrs",r)}function h(t,n){var e,i=0;return l(n,function(n){var r,o=n;-1!=p.indexOf(n)&&(o="\\"+o),r=t.match(new RegExp(o,"g")),r&&r.length>i&&(i=r.length,e=n)}),e||n[0]}var p=["|","^"],d=[",",";"," ","|","^"],m=["\r\n","\r","\n"],g=function(){function i(t,i){if(i||(i={}),n(t))this.mode="encode";else{if(!e(t))throw new Error("Incompatible format!");this.mode="parse"}this.data=t,this.options={header:u(i.header,!1),cast:u(i.cast,!0)};var r=i.lineDelimiter||i.line,o=i.cellDelimiter||i.delimiter;this.isParser()?(this.options.lineDelimiter=r||h(this.data,m),this.options.cellDelimiter=o||h(this.data,d),this.data=c(this.data,this.options.lineDelimiter)):this.isEncoder()&&(this.options.lineDelimiter=r||"\r\n",this.options.cellDelimiter=o||",")}function r(t,n,e){t(new n(e))}function c(t,n){return t.slice(-n.length)!=n&&(t+=n),t}function a(i){return n(i)?"array":t(i)?"object":e(i)?"string":o(i)?"null":"primitive"}return i.prototype.set=function(t,n){return this.options[t]=n},i.prototype.isParser=function(){return"parse"==this.mode},i.prototype.isEncoder=function(){return"encode"==this.mode},i.prototype.parse=function(t){function e(){a={escaped:!1,quote:!1,cell:!0}}function i(){g.cell=""}function o(){g.line=[]}function c(t){g.line.push(a.escaped?t.slice(1,-1).replace(/""/g,'"'):t),i(),e()}function u(t){c(t.slice(0,1-d.lineDelimiter.length))}function l(){m?n(m)?(s=f(d.cast,g.line,m),(l=function(){r(t,s,g.line)})()):m=g.line:(s||(s=f(d.cast,g.line)),(l=function(){r(t,s,g.line)})())}if("parse"==this.mode){if(0===this.data.trim().length)return[];var a,s,h,p=this.data,d=this.options,m=d.header,g={cell:"",line:[]};t||(h=[],t=function(t){h.push(t)}),e(),1==d.lineDelimiter.length&&(u=c);var y,v,j,w=p.length,D=d.cellDelimiter.charCodeAt(0),b=d.lineDelimiter.charCodeAt(d.lineDelimiter.length-1);for(y=0,v=0;w>y;y++)j=p.charCodeAt(y),a.cell&&(a.cell=!1,34==j)?a.escaped=!0:a.escaped&&34==j?a.quote=!a.quote:(a.escaped&&a.quote||!a.escaped)&&(j==D?(c(g.cell+p.slice(v,y)),v=y+1):j==b&&(u(g.cell+p.slice(v,y)),v=y+1,l(),o()));return h?h:this}},i.prototype.serialize={object:function(t){var n=this,e=Object.keys(t),i=Array(e.length);return l(e,function(e,r){i[r]=n[a(t[e])](t[e])}),i},array:function(t){var n=this,e=Array(t.length);return l(t,function(t,i){e[i]=n[a(t)](t)}),e},string:function(t){return'"'+String(t).replace(/"/g,'""')+'"'},"null":function(){return""},primitive:function(t){return t}},i.prototype.encode=function(t){function e(t){return t.join(c.cellDelimiter)}if("encode"==this.mode){if(0==this.data.length)return"";var i,r,o=this.data,c=this.options,u=c.header,s=o[0],f=this.serialize,h=0;t||(r=Array(o.length),t=function(t,n){r[n+h]=t}),u&&(n(u)||(i=Object.keys(s),u=i),t(e(f.array(u)),0),h=1);var p,d=a(s);return"array"==d?(n(c.cast)?(p=Array(c.cast.length),l(c.cast,function(t,n){p[n]=t.toLowerCase()})):(p=Array(s.length),l(s,function(t,n){p[n]=a(t)})),l(o,function(n,i){var r=Array(p.length);l(n,function(t,n){r[n]=f[p[n]](t)}),t(e(r),i)})):"object"==d&&(i=Object.keys(s),n(c.cast)?(p=Array(c.cast.length),l(c.cast,function(t,n){p[n]=t.toLowerCase()})):(p=Array(i.length),l(i,function(t,n){p[n]=a(s[t])})),l(o,function(n,r){var o=Array(i.length);l(i,function(t,e){o[e]=f[p[e]](n[t])}),t(e(o),r)})),r?r.join(c.lineDelimiter):this}},i.prototype.forEach=function(t){return this[this.mode](t)},i}();g.parse=function(t,n){return new g(t,n).parse()},g.encode=function(t,n){return new g(t,n).encode()},g.forEach=function(t,n,e){return 2==arguments.length&&(e=n),new g(t,n).forEach(e)},"function"==typeof define&&define.amd?define("CSV",[],function(){return g}):"object"==typeof module&&module.exports?module.exports=g:window&&(window.CSV=g)}();

!function () {
  var cssMap = {
      ".nav>li>a[href='$@.html']": {
        "index": "menu-index",
        "events": "menu-events",
        "chapters": "menu-chapters",
        "about": "menu-about",
        "building-workshops": "menu-building-workshops",
        "host": "menu-host"
      },
      "footer>div:nth-child$@": {
        "(2) ul:nth-child$@": {
          "(1) $@": {
            "li:first-child strong": "footer-contact-header"
          },
          "(2) li:nth-child$@": {
            "(1) strong": "footer-contribute-header",
            "(2) a": "footer-contribute-question",
            "(3) a": "footer-contribute-answer"
          },
          "(3) li:nth-child$@": {
            "(1) strong": "footer-about-header",
            "(2) a": "footer-about-build",
            "(3) a": "footer-about-host"
          }
        }
      },
      ".index $@": {
        "header h3": 'index-header',
        ".get-started h2": 'index-get-started',
        ".workshop-header $@": {
          "h1": "index-workshop-header",
          "p": "index-workshop-info",
          "ul a[href='$@']": {
            "host.html": "index-workshop-links-host",
            "events.html": "index-workshop-links-events",
            "host.html#writeups": "index-workshop-links-writeups"
          }
        },
        ".upcoming-workshoppers $@": {
          "h2": "index-upcoming-header",
          ".loading": "index-upcoming-loading",
          ".error": "index-upcoming-error",
          "a.all-events": "index-upcoming-all-events",
          ".empty $@": {
            "span:first-child": "index-upcoming-no-events",
            "a": "index-upcoming-past-events",
            "span:last-child": "index-upcoming-past-events2"
          }
        },
        ".anyone-can-host $@": {
          "h2": "index-host-header",
          "#event-count $@": {
            "span:first-child": "index-host-past",
            "span:last-child": "index-host-past2",
          },
          "p:last-child $@": {
            "span:first-child": "index-host-want-to-host",
            "a": "index-host-want-to-host3",
            "span:last-child": "index-host-want-to-host3"
          }
        },
        "#workshoppers>.container:nth-child$@": {
          "(1) $@": {
            "h1": "index-workshopper-header",
            "p": "index-workshopper-info",
            "ul $@": {
              "li:first-child>a": "index-workshopper-list-problem",
              "li:nth-child(2)>a": "index-workshopper-list-faq",
              "li:last-child>a": "index-workshopper-list-host"
            }
          },
          "(2) #get-going $@": {
            "h2": "index-get-going-header",
            "span:nth-child$@": {
              "(1)": "index-get-going-info",
              "(3)": "index-get-going-info2",
              "(5)": "index-get-going-info3"
            }
          }
        },
        ".core-workshoppers>div:first-child $@": {
          "h1": "index-workshoppers-core-header",
          "p:nth-child(2)": "index-workshoppers-core-info",
          "p:nth-child(3) $@": {
            "span:nth-child$@":  {
              "(1)": "index-workshoppers-core-link-pre",
              "(3)": "index-workshoppers-core-link-post"
            },
            "a": "index-workshoppers-core-link-post"
          }
        },
        ".elective-workshoppers>div:first-child $@": {
          "h1": "index-workshoppers-elective-header",
          "p:nth-child(2)": "index-workshoppers-elective-info",
          "p:nth-child(3) $@": {
            "span:nth-child$@":  {
              "(1)": "index-workshoppers-elective-link-pre",
              "(3)": "index-workshoppers-elective-link-post"
            },
            "a": "index-workshoppers-elective-link-text"
          }
        },
        "#learnyounode p": "workshopper-learnyounode",
        "#gitit p": "workshopper-gitit",
        "#streamadventure p span:$@": {
          "first-child": "workshopper-streamadventure",
          "last-child": "workshopper-streamadventure2"
        },
        "#functionaljavascript p": "workshopper-functionaljavascript",
        "#levelmeup p": "workshopper-levelmeup",
        "#expressworks p": "workshopper-expressworks",
        "#makemehapi p": "workshopper-makemehapi",
        "#promise-it-wont-hurt p": "workshopper-promise-it-wont-hurt",
        "#async-you p": "workshopper-async-you",
        "#nodebot-workshop p": "workshopper-nodebot-workshop",
        "#goingnative p": "workshopper-goingnative",
        "#planetproto p": "workshopper-planetproto",
        "#shader-school p": "workshopper-shader-school",
        "#bytewiser p": "workshopper-bytewiser",
        "#bug-clinic p": "workshopper-bug-clinic",
        "#browserify-adventure p": "workshopper-browserify-adventure",
        "#introtowebgl p": "workshopper-introtowebgl",
        "#count-to-6 p": "workshopper-count-to-6",
        "#kick-off-koa p": "workshopper-kick-off-koa",
        "#lololodash p": "workshopper-lololodash"
      },
      ".events $@": {
        ".workshops div.full:eq$@": {
          "(0) $@": {
            "h1": "events-header",
            ".key $@": {
              ".key-past": "events-past",
              ".key-future": "events-future"
            }
          },
          "(1) $@":{
            "h2": "events-header2",
            "h3": "events-header3"
          }
        }
      },
      ".chapters .container div.full p": "chapters-header",
      ".about $@": {
        ".container:eq$@": {
          "(1) div.full p":"about-header",
          "(2) div:nth-child(2) p:nth-child$@": {
            "(1)": "about-history",
            "(2)": "about-history2",
            "(3)": "about-history3",
            "(4)": "about-history4"
          },
          "(3) div:nth-child(2) p:nth-child$@": {
            "(1)": "about-philosophy",
            "(2)": "about-philosophy2"
          },
          "$@ div:nth-child(2) p:nth-child(1)": {
            "(4)": "about-info",
            "(5)": "about-info2",
            "(6)": "about-info3"
          }
        }
      },
      ".building-workshops body>div:eq(0)>div:eq$@": {
        "(0) $@": {
          "h1": "building-workshops-header",
          "p": "building-workshops-subtitle"
        },
        "(1)>div:eq(1) span": "building-workshops-info",
        "(2)>div:eq(1) span": "building-workshops-info2",
        "(3)$@": {
          " h3": "building-workshops-info3",
          ">div:eq(1)>p>span:eq$@": {
            "(0)": "building-workshops-info3A",
            "(1)": "building-workshops-info3B",
            "(2)": "building-workshops-info3C"
          }
        }
      },
      ".host body>div:eq(1)>div:eq$@": {
        "(0) $@": {
          "h1": "host-header",
          "p": "host-info"
        },
        "(1) $@": {
          "h3": "host-chapter-header",
          "p $@": {
            "span:eq$@": {
              "(0)":"host-chapter-info",
              "(1)":"host-chapter-info2",
              "(2)":"host-chapter-info3",
              "(3)":"host-chapter-info4"
            },
            "a:eq$@": {
              "(0)": "host-chapter-link",
              "(1)": "host-chapter-link2"
            }
          }
        },
        "(2) $@": {
          "h3": "host-attend-header",
          "p $@": {
            "span:eq$@": {
              "(0)":"host-attend-info",
              "(1)":"host-attend-info2",
            },
            "a:eq$@": {
              "(0)": "host-attend-link"
            }
          }
        },
        "(3) $@": {
          "h3": "host-recommendation-header",
          "p": "host-recommendation-info",
          "li:eq$@": {
            "(0)": "host-recommendation-list-1",
            "(1)": "host-recommendation-list-2",
            "(2)": "host-recommendation-list-3",
            "(3)": "host-recommendation-list-4",
            "(4)": "host-recommendation-list-5",
            "(5)": "host-recommendation-list-6"
          }
        },
        "(4) $@": {
          "h3": "host-reports-header",
          "p": "host-reports-info"
        }
      }
    };

  function translateHTML(parent, translation) {
    for (section in translation) {
      var value = translation[section]
      var selector = parent.replace("$@", section)
      if (typeof value === "string")
        $(selector).html(value)
      else
        translateHTML(selector, value)
    }
  }

  function getQuery(variable) {
    var query = document.location.search
    var result = {}
    if (query) {
      query = query.substr(1)
      var vars = query.split("&")
      for (var i = 0; i < vars.length; i += 1) {
        var pair = vars[i].split('=')
        if (decodeURIComponent(pair[0]) === variable)
          return decodeURIComponent(pair[1])
      }
    }
    return null
  }

  function createLangButton(lang, langName, selectedLang) {
    var parts = /^([^#?]+)(\?[^#]*)?(\#.*)?$/.exec(document.location.href)
    var origin = parts[1]
    var query = parts[2] || "?"
    var hash = parts[3] || ""

    // Remove the lang part from the query
    query = query.substr(1).replace(/(^|&)\s*lang\s*=[^\&]*/, "");

    if (lang != "en") {
      query = (query == "" ? "?" : "&") + "lang=" + lang
    }
    return $('<li class="nav-lang-' + lang + '">').toggleClass("selected", lang === selectedLang).html(lang === selectedLang ? langName : '<a href="' + origin + query + hash + '"">' + langName + '</a>')
  }

  function addTranslationNav(selectedLang, csv) {
    $(document.body).addClass("lang-" + selectedLang)
    var nav = $('<ul class="nav-lang"></ul>')
    createLangButton("en", "English", selectedLang).appendTo(nav)
    for (var lang in csv) {
      createLangButton(lang, csv[lang].language, selectedLang).appendTo(nav)
    }
    nav.insertBefore("header>*:first-child")
  }

  function modifyLinks(lang) {
    $("a[href]").each(function () {
      var href = this.attributes.href.value

      // Only relative links (that don't start with http)
      if (!/^https?:\/\//.test(href)) {

        var urlHashSplit = /^([^#]*)#?(.*)/.exec(href)
        var url = urlHashSplit[1]
        url += (/\?/.test(url) ? "&" : "?") + "lang=" + lang

        var hash = urlHashSplit[2]
        hash = hash ? "#" + hash : ""

        this.href = url + hash
      }
    })
  }

  function parseCSV(raw) {
    var levels = []
    var csv = {}

    new CSV(raw, {
      cast: false,
      header: true,
      cellDelimiter: "\t"
    }).parse().filter(function (line) {
      // Ignoring empty lines and comments #
      return line.key != "" && line.key.charAt(0) != "#"        
    }).forEach(function (line) {
      // Transforming "_" notation to combined - notation
      var parts = /^(_*)(.*)/.exec(line.key)
      var depth = parts[1].length
      var name = parts[2]
      while (depth < levels.length && levels.length > 0) {
        levels.pop()
      }
      levels.push(name)
      var key = levels.join("-")
      // Pollute all languages
      for (var lang in line) {
        if (lang != "key" && lang != "") {
          var langObj = csv[lang]
          if (!langObj) {
            langObj = {}
            csv[lang] = langObj
          }
          if (line[lang] != "") {
            langObj[key] = line[lang]
          }
        }
      }
    })

    return csv;
  }

  function mapKeys(keys, map) {
    if (!map)
      map = cssMap

    var result = {};
    for (var field in map) {
      var value = map[field]
      if (typeof value === "object") {
        result[field] = mapKeys(keys, value)
      } else if(typeof value === "string") {
        var newValue = keys[value]
        if (typeof newValue !== "string") {
          console.log("Warning: Translation missing: " + value)
        } else {
          result[field] = newValue 
        }
      } else {
        console.log("Warning: Why is there: " + value + "in the translation map?")
      }
    }
    return result;
  }

  var csv = null;
  var domLoaded = false;

  function translate() {
    if (domLoaded && csv) {

      var lang = getQuery("lang")

      // Map 
      if (lang) {
        lang = lang.toLowerCase()
        var keys = csv[lang]
        if (!keys)
          lang = null
      }

      if (!lang)
        lang = "en"

      addTranslationNav(lang, csv)

      if (keys) {
        var translation = mapKeys(keys)
        translateHTML("$@", translation)
      }

      if (lang !== "en")
        modifyLinks(lang)
    }
  }

  jQuery.get("lang.csv", function (raw) {
    csv = parseCSV(raw)
    translate()
  })

  jQuery(function () {
    domLoaded = true
    translate()
  })
}()