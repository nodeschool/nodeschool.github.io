jQuery(function () {
  var translations = {
      ja: {
        ".nav>li>a[href='$@.html']": {
          "index": "ホーム",
          "events": "イベント",
          "chapters": "チャプター",
          "about": "...について",
          "building-workshops": "ビルド",
          "host": "ホスト"
        },
        "footer>div:nth-child$@": {
          "(1) small span:first-child": "写真家",
          "(2) ul:nth-child$@": {
            "(1) $@": {
              "li:first-child strong": "連絡方法"
            },
            "(2) li:nth-child$@": {
              "(1) strong": "貢献",
              "(2) a": "質問を書く",
              "(3) a": "質問に返事する"
            },
            "(3) li:nth-child$@": {
              "(1) strong": "...について",
              "(2) a": "ワークショッパーを作る",
              "(3) a": "ワークショップをホストする"
            }
          }
        },
        ".index $@": {
          "header h3": '<span class="no-break">ターミナル</span>をつかってできる<span class="no-break">ノード</span>の<span class="no-break">オーペンソース</span><span class="no-break">ワークショップ。</span><span class="no-break">一人で頑張って</span><span class="no-break">または近い</span><span class="no-break">ワークショップ</span>で<span class="no-break">ほかの人と勉強して下さい。</span>',
          ".get-started h2": "スタートならは「<a href=\"#learnyounode\">Learn You Node</a>」<br/>というワークショッパーがあります:",
          ".workshop-header $@": {
            "h1": "ワークショップ",
            "p": "...はグループのマンツーマンワークショップ（通常は無料）。<br/>ワークショッパーというアプリはカリキュラムとして使われています。メンターは参加者があるチャンレンジーをできるためにいます。",
            "ul a[href='$@']": {
              "host.html": "ホストになる",
              "events.html": "すべてのイベント",
              "host.html#writeups": "今までのイベントサマリー" 
            }
          },
          ".upcoming-workshoppers $@": {
            "h2": "ワークショップイベント",
            ".loading": "ローディング...",
            ".error": "イベントリストロードできなかった",
            "a.all-events": "すべてのイベント",
            ".empty $@": {
              "span:first-child": "今の所はイベントがありません。",
              "a": "過去のイベント",
              "span:last-child": "をチェックしてください。"
            }
          },
          ".anyone-can-host $@": {
            "h2": "誰でもホストになります",
            "#event-count $@": {
              "span:first-child": "今まではまとめて",
              "span:last-child": "のイベントがありました。",
            },
            "p:last-child $@": {
              "span:first-child": "NodeSchoolは分権的に動いています。オーペンソウースベースやボランティアシステムです。イベントほホストに興味がありますか？",
              "a": "リソースやヒント",
              "span:last-child": "を使ってください。"
            }
          },
          "#workshoppers>.container:nth-child$@": {
            "(1) $@": {
              "h1": "ワークショッパー",
              "p": "ワークショッパーということはNodeSchoolと関係あるオーペンソースモジュールです。すべてのワークショッパーは自動誘導式です（ワークショップ参加しなくても勉強できます！）。そうしてほとんどのはオフラインでも動いてます。",
              "ul $@": {
                "li:first-child>a": "進むのができない場合、質問して下さい",
                "li:nth-child(2)>a": "一般的な質問のため",
                "li:last-child>a": "ワークショップを作るため"
              } 
            },
            "(2) #get-going $@": {
              "h2": "ファーストステップ",
              "span:nth-child$@": {
                "(1)": "まずは",
                "(3)": "が必要です。その後は",
                "(5)": "（Node.jsと一緒にインストールされている）を使ってモジュールの下に書いてあるコマンドでインストールしてください。一雄インストールしたらワークショッパーの名前を使ってスタートできます。"
              }
            }
          },
          ".core-workshoppers>div:first-child $@": {
            "h1": "基本",
            "p:nth-child(2)": "このワークショッパーはベーシックスのNode.jsスキルが勉強できるためです。",
            "p:nth-child(3) $@": {
              "span:nth-child$@":  {
                "(1)": "困っているなら",
                "(3)": "。"
              },
              "a": "質問を聞いてください"
            }
          },
          ".elective-workshoppers>div:first-child $@": {
            "h1": "選択科目",
            "p:nth-child(2)": "人気のライブラリや開発スタイルのワークショッパー",
            "p:nth-child(3) $@": {
              "span:nth-child$@":  {
                "(1)": "困っているなら",
                "(3)": "。"
              },
              "a": "質問を聞いてください"
            }
          },
          "#learnyounode p": "Node.jsの基本: 非同期 I/Oやhttp。",
          "#gitit p": "GitやGithubの基本。",
          "#streamadventure p span:$@": {
            "first-child": "ストリームのインタフェースを",
            "last-child": "を使っての構成を勉強するため。"
          },
          "#functionaljavascript p": "EcmaScript 5の基本的な関数型プログラミングを勉強のため。",
          "#levelmeup p": "格好いいパッケージのkey/valueストーレジのleveldbを勉強するため。",
          "#expressworks p": "Express.jsフレームワークのベーシックを勉強するため。",
          "#makemehapi p": "チャレンジを頑張りながらhapiを勉強できます。",
          "#promise-it-wont-hurt p": "Promiseを使って非同期な開発を勉強するため。",
          "#async-you p": "Asyncパッケージを勉強するため。",
          "#nodebot-workshop p": "johnny-fiveのAPIを使ってロボットを作る。",
          "#goingnative p": "Node.jsの裏側の探査:C++のネーティブアドオン。",
          "#planetproto p": "JavaScriptのPrototypeをわかるように。",
          "#shader-school p": "GLSLのシェーダを使って基本のグラフィックスプログラミングを勉強するため。",
          "#bytewiser p": "Node.jsまたはブラウザを使ってバイナリデータ操作。",
          "#bug-clinic p": "デバッギングのツールを勉強しながらデバッギングスキルレベルアップ。",
          "#browserify-adventure p": "npmモジュールやノードスタイルのrequire()をブラウザーでも使えるように。",
          "#introtowebgl p": "WebGLやthree.jsのイントロダクション。",
          "#count-to-6 p": "JavaScriptの次のバーション:EcmaScript6の新しいフィーチャーを勉強するため。",
          "#kick-off-koa p": "KOA,次の世代のwebフレームワークをやり始めるため。",
          "#lololodash p": "Lo-Dash (underscoreのフォーク)を使ったArrayやObjectをもっと簡単使えるため。"
        }
      }
    }
  var langNames　= {
      en: "English",
      ja: "日本語"
    }

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

  function addTranslationNav(selectedLang) {
    $(document.body).addClass("lang-" + selectedLang)
    var nav = $('<ul class="nav-lang"></ul>')
    for (var lang in langNames) {
      createLangButton(lang, langNames[lang], selectedLang).appendTo(nav)
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

  function translate(lang) {
    if (lang) {
      lang = lang.toLowerCase()
      var translation = translations[lang]
      if (!translation)
        lang = null
    }

    if (!lang)
      lang = "en"

    addTranslationNav(lang)

    if (translation) 
      translateHTML("$@", translation)

    if (lang !== "en")
      modifyLinks(lang)
  }
  
  translate(getQuery("lang"))
})