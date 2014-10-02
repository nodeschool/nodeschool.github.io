jQuery(function () {
    var translations = {
        ja: {
            ".nav>li>a[href='$@.html']": {
                "index": "ホーム",
                "events": "イベント",
                "chapters": "チャプター",
                "about": "概要",
                "building-workshops": "ビルド",
                "host": "ホスト"
            },
            "footer>div:nth-child$@": {
//          "(1) small span:first-child": "写真",
                "(2) ul:nth-child$@": {
                    "(1) $@": {
                        "li:first-child strong": "連絡方法"
                    },
                    "(2) li:nth-child$@": {
                        "(1) strong": "貢献",
                        "(2) a": "質問する",
                        "(3) a": "質問に答える"
                    },
                    "(3) li:nth-child$@": {
                        "(1) strong": "NodeSchoolついて",
                        "(2) a": "ワークショッパーを作る",
                        "(3) a": "ワークショップをホストする"
                    }
                }
            },
            ".index $@": {
                "header h3": '<span class="no-break">ターミナル</span>をつかってできる<span class="no-break">ノード</span>の<span class="no-break">オープンソース</span><span class="no-break">ワークショップ。</span><span class="no-break">一人で頑張って</span><span class="no-break">または近い</span><span class="no-break">ワークショップ</span>で<span class="no-break">仲間と勉強して下さい。</span>',
                ".get-started h2": "はじめてなら「<a href=\"#learnyounode\">Learn You Node</a>」<br/>というワークショッパーがあります:",
                ".workshop-header $@": {
                    "h1": "ワークショップ",
                    "p": "NodeSchoolはグループのマンツーマンワークショップ（通常は無料）。<br/>ワークショッパーというアプリをカリキュラムとして使っています。参加しやすいよう、メンターがいます。",
                    "ul a[href='$@']": {
                        "host.html": "ホストになる",
                        "events.html": "すべてのイベント",
                        "host.html#writeups": "今までのイベント"
                    }
                },
                ".upcoming-workshoppers $@": {
                    "h2": "ワークショップイベント",
                    ".loading": "ローディング...",
                    ".error": "イベントリストをロードできませんでした",
                    "a.all-events": "すべてのイベント",
                    ".empty $@": {
                        "span:first-child": "今の所はイベントがありません。",
                        "a": "過去のイベント",
                        "span:last-child": "をチェックしてください。"
                    }
                },
                ".anyone-can-host $@": {
                    "h2": "誰でもホストになれます",
                    "#event-count $@": {
                        "span:first-child": "今まで",
                        "span:last-child": "のイベントがありました。",
                    },
                    "p:last-child $@": {
                        "span:first-child": "NodeSchoolは分権的に動いています。オーペンソースベースやボランティアシステムです。イベントホストに興味がありますか？",
                        "a": "リソースやヒント",
                        "span:last-child": "を使ってください。"
                    }
                },
                "#workshoppers>.container:nth-child$@": {
                    "(1) $@": {
                        "h1": "ワークショッパー",
                        "p": "ワークショッパーはNodeSchoolと関係あるオープンソースモジュールです。すべてのワークショッパーは自動誘導式です（ワークショップに参加しなくても勉強できます！）。ほとんどはオフラインでも動いてます。",
                        "ul $@": {
                            "li:first-child>a": "困ったことがあれば、質問して下さい",
                            "li:nth-child(2)>a": "一般的な質問",
                            "li:last-child>a": "ワークショップを作る"
                        }
                    },
                    "(2) #get-going $@": {
                        "h2": "ファーストステップ",
                        "span:nth-child$@": {
                            "(1)": "まずは",
                            "(3)": "が必要です。その後は",
                            "(5)": "（Node.jsと一緒にインストールされている）を使ってモジュールの下に書いてあるコマンドでインストールしてください。一度インストールしたらワークショッパーの名前を使ってスタートできます。"
                        }
                    }
                },
                ".core-workshoppers>div:first-child $@": {
                    "h1": "Core/基本",
                    "p:nth-child(2)": "このワークショッパーは基本的なNode.jsスキルが勉強できます。",
                    "p:nth-child(3) $@": {
                        "span:nth-child$@": {
                            "(1)": "困っているなら",
                            "(3)": "。"
                        },
                        "a": "質問してください"
                    }
                },
                ".elective-workshoppers>div:first-child $@": {
                    "h1": "選択科目",
                    "p:nth-child(2)": "人気のライブラリや開発スタイルのワークショッパー",
                    "p:nth-child(3) $@": {
                        "span:nth-child$@": {
                            "(1)": "困っているなら",
                            "(3)": "。"
                        },
                        "a": "質問してください"
                    }
                },
                "#learnyounode p": "Node.jsの基本: 非同期 I/Oやhttp。",
                "#gitit p": "GitやGithubの基本。",
                "#streamadventure p span:$@": {
                    "first-child": "ストリームのインタフェースを",
                    "last-child": "を使っての構成を勉強する。"
                },
                "#functionaljavascript p": "EcmaScript 5の基本的な関数型プログラミングを勉強。",
                "#levelmeup p": "格好いいパッケージのkey/valueストレージのleveldbを勉強する。",
                "#expressworks p": "Express.jsフレームワークのベーシックを勉強する。",
                "#makemehapi p": "チャレンジを頑張りながらhapiを勉強できます。",
                "#promise-it-wont-hurt p": "Promiseを使って非同期な開発を勉強する。",
                "#async-you p": "Asyncパッケージを勉強する。",
                "#nodebot-workshop p": "johnny-fiveのAPIを使ってロボットを作る。",
                "#goingnative p": "Node.jsの裏側の探査:C++のネイティブアドオン。",
                "#planetproto p": "JavaScriptのPrototypeをわかるように。",
                "#shader-school p": "GLSLのシェーダを使って基本のグラフィックスプログラミングを勉強する。",
                "#bytewiser p": "Node.jsまたはブラウザを使ってバイナリデータ操作。",
                "#bug-clinic p": "デバッギングのツールを勉強しながらデバッギングスキルレベルアップ。",
                "#browserify-adventure p": "npmモジュールやノードスタイルのrequire()をブラウザーでも使えるように。",
                "#introtowebgl p": "WebGLやthree.jsのイントロダクション。",
                "#count-to-6 p": "JavaScriptの次のバーション:EcmaScript6を勉強する。",
                "#kick-off-koa p": "KOA/次世代のwebフレームワークを始める。",
                "#lololodash p": "Lo-Dash (underscoreのフォーク)を使ったArrayやObjectをもっと簡単に使う。"
            },
            ".events $@": {
                ".workshops div.full:eq$@": {
                    "(0) $@": {
                        "h1": "NodeSchool Events <br>（これから開催されるイベントや終了されたイベント情報）",
                        ".key $@": {
                            ".key-past": "開催終了",
                            ".key-future": "開催予定"
                        }
                    },
                    "(1) $@":{
                        "h2": "<span id=\"event-count\">たくさん</span>のイベントが開催!!",
                        "h3": "イベントを開催される方は<a target=\"_blank\" href=\"https://docs.google.com/forms/d/1vYW-Yw82kt_q7WDgBY6gQqFrg3zuD2rDPXEG-cbq7e4/viewform?usp=form_confirm\">こちら</a>で登録お願いします。"
                    }
                }
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