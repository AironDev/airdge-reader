"use strict";

var DocumentViewerDependencyLoader = function(e) {
    function t(t) {
        var r = $.extend({}, e, t);
        n = [], a[r.dependency]() ? r.callback() : yepnope({
            load: i[r.dependency],
            complete: function() {
                a[r.dependency]() ? $.isFunction(r.callback) && r.callback() : r.errorHandler("There was an error loading the dependency (" + i[r.dependency] + ") Please check your options.path value");
            }
        });
    }
    var n, i, a;
    if (i = {
        pdfjs: [ "libs/pdfjs/compatibility.js", "libs/pdfjs/pdf.js" ],
        prettify: [ "libs/google-code-prettify/prettify.js", "libs/google-code-prettify/prettify.css" ],
        flowplayer: [ "libs/flowplayer/flowplayer-3.2.6.min.js" ],
        jplayer: [ "libs/jPlayer/jquery.jplayer.min.js" ]
    }, yepnope.errorTimeout = e.errorTimeout || 4e3, a = {
        pdfjs: function() {
            return "undefined" != typeof PDFJS;
        },
        prettify: function() {
            return "undefined" != typeof prettyPrint;
        },
        flowplayer: function() {
            return "undefined" != typeof flowplayer;
        },
        jplayer: function() {
            return "undefined" != typeof $.jPlayer;
        }
    }, e.path) {
        var r = {};
        $.each(i, function(t, n) {
            var i = [];
            $.each(n, function(t, n) {
                i.push(e.path + n);
            }), r[t] = i;
        }), i = r;
    }
    return {
        loadDependency: t
    };
}, DocumentViewer = function(e) {
    function t() {
        k = $.extend(!0, {}, j, e), m = new DocumentViewerDependencyLoader({
            path: k.path,
            errorHandler: a
        });
    }
    function n(e) {
        var t = !1;
        return "pdf" === e ? t = "pdf" : "txt" === e ? t = "txt" : -1 !== $.inArray(e, w) ? t = "code" : -1 !== $.inArray(e, P) ? t = "video" : -1 !== $.inArray(e, x) ? t = "audio" : -1 !== $.inArray(e, b) && (t = "image"), 
        t;
    }
    function i() {
        return new Date().getTime() + "-" + Math.floor(1e5 * Math.random()) + 1;
    }
    function a(e) {
        k.debug && window.console && console.log("DOCUMENT VIEWER: " + e);
    }
    function r(e) {
        var t = /(?:\.([^.]+))?$/;
        return t.exec(e)[1];
    }
    function s(e, t) {
        k.autoLoadDependencies ? m.loadDependency({
            dependency: e,
            callback: t
        }) : t();
    }
    function o() {
        C = language;
    }
    function d(e, t) {
        var n = c(e, t);
        return n.load(), n;
    }
    function l(e) {
        var t, n, i, a, r, s;
        return t = new InvisibleDom(!0), n = v(), i = '<div class="document-viewer audio">' + n + "</div>", 
        a = t.element($(i).width(e)), f = a.getSize().height, r = '<div class="document-viewer video">' + n + "</div>", 
        s = t.element($(r).width(e)), y = s.$element.find(".player-controls").outerHeight(!0), 
        t.destroy(), {
            audioPlayerHeight: f,
            videoPlayerHeight: y
        };
    }
    function c(e, t) {
        var n, i;
        return n = $.extend(!0, {}, k, t), i = new T(e, n), I[i.width] || (I[i.width] = l(i.width)), 
        i.renderPlaceHolder(), i;
    }
    function p(e) {
        return n(r(e));
    }
    function h(e) {
        return e.replace(/^.*[\\\/]/, "");
    }
    function u(e) {
        var t = {};
        return t.name = h(e), t.extension = r(e), t.type = n(t.extension), t;
    }
    function v() {
        return T.prototype.getJPlayerMarkup();
    }
    var m, f, y, g, w = [ "bsh", "c", "cc", "cpp", "cs", "csh", "css", "cyc", "cv", "htm", "html", "java", "js", "m", "mxml", "perl", "php", "pl", "pm", "py", "rb", "sh", "xhtml", "xml", "xsl", "sql", "vb" ], b = [ "png", "jpg", "jpeg", "gif" ], x = [ "mp3", "m4a", "oga", "webma", "fla" ], P = [ "mp4", "ogv", "ogg", "webmv", "flv" ], j = (P.concat(x), 
    {
        width: 500,
        height: "auto",
        debug: !1,
        autoPlay: !0,
        autoLoadDependencies: !0,
        enableTextAndCode: !1,
        jPlayer: {},
        timeoutValue: 4e3,
        path: "document-viewer/",
        isModal: !1,
        setUnsupportedSizeAsSquare: !0
    }), k = {}, C = {
        emptyText: '<div class="document-viewer-empty-text">No Document Loaded</div>',
        unsupportedBrowserText: '<div class="document-viewer-empty-text">This document can not be opened in this browser. Please upgrade.</div>',
        errorText: "An error occurred while loading the ",
        serverResponseText: "Unexpected server response of "
    }, I = {}, T = function(e, t) {
        this.filename = e, this.type = null, this.extension = null, this.$anchor = null, 
        this.$element = null, this.$inner = null, this.$loadingIndicator = null, this.loadEventId = null, 
        this.$jPlayerAnchor = null, this.isLoaded = null, this.hasPlaceholder = !1, this.$placeHolder = null, 
        this.leavePlaceholder = !1, $.extend(!0, this, k, t), this.init();
    };
    return T.prototype.initModal = function() {
        var e, t, n = this;
        e = $("body"), t = $('<div class="document-viewer-close"></div>'), this.$anchor = $('<div class="document-viewer-modal-overlay"></div>'), 
        e.prepend(this.$anchor), e.addClass("has-document-viewer-modal"), this.$element.addClass("document-viewer-modal"), 
        this.$element.append(t), t.on("click", function() {
            n.close(), e.removeClass("has-document-viewer-modal");
        }), this.$element.on("click", function(e) {
            e.stopPropagation();
        }), this.$anchor.on("click", function() {});
    }, T.prototype.close = function() {
        this.$anchor.empty().remove();
    }, T.prototype.init = function() {
        var e, t, a;
        e = {
            scrollable: ".scrollable",
            viewport: ".viewport",
            scrollContent: ".scroll-content",
            wrapper: ".document-viewer-wrapper",
            outer: ".document-viewer-outer",
            anchor: ".document-viewer"
        }, t = '<div class="document-viewer-wrapper dv-markup clearfix"><div class="document-viewer-outer dv-markup clearfix"><div class="document-viewer dv-markup clearfix"></div></div></div>', 
        this.$element = $(t), g = this.$element.find(".document-viewer"), this.isModal ? this.initModal() : this.$anchor.empty(), 
        this.$anchor.append(this.$element), this.$inner = this.$element.find(e.anchor), 
        this.innerHorizontalPadding = parseInt(this.$inner.css("padding-right"), 10) + parseInt(this.$inner.css("padding-left"), 10), 
        a = "document-viewer" + i(), this.$inner.attr("id", a), this.id = a, this.extension || (this.extension = r(this.filename)), 
        this.type || (this.type = n(this.extension)), this.$element.addClass(this.type), 
        this.loadEventId = i(), this.name = this.filename.split("/").pop(), $.isFunction(this.width) && (this.width = this.width(this)), 
        this.setSize(k), this.bindCallback();
    }, T.prototype.initMenu = function() {
        var e, t, n = this;
        e = '<div class="document-viewer-menu"><span class="document-viewer-download">Download</span><span class="document-viewer-expand">Expand</span></div>', 
        t = $(e), t.on("click", ".document-viewer-download", function() {
            n.download();
        }), t.on("click", ".document-viewer-expand", function() {
            n.fullScreen();
        }), this.$element.append(t);
    }, T.prototype.download = function() {
        var e, t = "hiddenDownloader";
        e = document.getElementById(t), null === e && (e = document.createElement("iframe"), 
        e.id = t, e.style.display = "none", document.body.appendChild(e)), e.src = this.filename;
    }, T.prototype.fullScreen = function() {
        ("audio" == this.type || "video" == this.type) && this.pause();
        var e = new T(this.filename, {
            isModal: !0,
            width: .95 * $(window).width()
        });
        e.load();
    }, T.prototype.bindCallback = function() {
        var e = this;
        e.callback && $.isFunction(e.callback) && e.$inner.bind(e.loadEventId, e.callback);
    }, T.prototype.calculateSixteenNine = function(e) {
        return Math.round(e / 16 * 9);
    }, T.prototype.renderPlaceHolder = function() {
        var e = this.getHeight();
        "video" == this.type ? e = this.height && "string" != typeof this.height ? this.height : Math.round(this.width / 16 * 9) + I[this.width].videoPlayerHeight : "audio" == this.type ? e = I[this.width].audioPlayerHeight : "image" == this.type ? e = this.width - this.innerHorizontalPadding : this.type === !1 ? (e = this.setUnsupportedSizeAsSquare === !0 ? this.width - this.innerHorizontalPadding : "auto", 
        this.leavePlaceholder = !0) : "txt" !== this.type && "code" != this.type || this.enableTextAndCode ? e = "90%" : (e = this.setUnsupportedSizeAsSquare === !0 ? this.width - this.innerHorizontalPadding : "auto", 
        this.leavePlaceholder = !0), this.hasPlaceholder = !0;
        var t = '<div class="document-viewer-placeholder"><div class="document-viewer-placeholder-inner"><div class="document-icon"></div><div class="placeholder-info"><div class="filename">' + this.name + '</div><div class="file-extension">' + this.extension + "</div></div></div></div>";
        this.$placeHolder = $(t).height(e).width(this.width - this.innerHorizontalPadding), 
        this.setContent(this.$placeHolder);
    }, T.prototype.removePlaceholder = function() {
        this.hasPlaceholder && !this.leavePlaceholder && this.$placeHolder.remove();
    }, T.prototype.getHeight = function(e, t) {
        var n;
        return "pdf" === t || "txt" === t || "code" === t ? (n = "string" != typeof this.height ? this.height : 1.3 * this.width, 
        "pdf" == t && (n += 20), "txt" != t && "code" != t || this.enableTextAndCode || (n = "auto")) : n = "video" === t ? "auto" : "image" === t ? this.height : "audio" === t ? "auto" : 0 == t ? !1 : "auto", 
        n;
    }, T.prototype.setSize = function(e) {
        var t = this.type;
        this.width = this.width || j.width, this.height = this.getHeight(e, t), this.$element.width(this.width + 2), 
        "pdf" == t ? this.$inner.height(this.height).parent().height(this.height) : "txt" === t || "code" === t ? this.$inner.parent().height(this.height) : this.$inner.height(this.height).parent().height(this.height);
    }, T.prototype.unsupportedType = function() {
        this.triggerLoadedEvent();
    }, T.prototype.load = function() {
        var e = this, t = '<div class="dv-loading"></div>';
        switch (this.isLoaded = new $.Deferred(), this.$loadingIndicator = $(t), this.$loadingIndicator.css({
            top: "10%"
        }), this.$inner.append(this.$loadingIndicator), setTimeout(function() {
            e.isLoaded.reject();
        }, e.timeoutValue), this.type) {
          case "pdf":
            this.loadPdf();
            break;

          case "code":
          case "txt":
            this.enableTextAndCode === !0 ? this.loadText() : this.unsupportedType();
            break;

          case "video":
            this.loadJPlayer();
            break;

          case "audio":
            this.loadJPlayer();
            break;

          case "image":
            this.loadImage();
            break;

          default:
            this.unsupportedType();
        }
    }, T.prototype.setContent = function(e, t) {
        t === !0 ? this.$inner.append(e) : this.$inner.html(e);
    }, T.prototype.hideLoadingIndicator = function() {
        this.$loadingIndicator.remove();
    }, T.prototype.getWidth = function() {
        return this.$inner.width();
    }, T.prototype.triggerLoadedEvent = function() {
        this.removePlaceholder(), this.$inner.trigger(this.loadEventId), this.$loadingIndicator.remove(), 
        this.isLoaded.resolve();
    }, T.prototype.error = function(e, t) {
        var n = "<br/><span>" + C.serverResponseText + " " + e + " (" + t + ")</span>";
        a("Error loading file (" + this.filename + "). Please make sure that the path is correct"), 
        this.setContent('<div class="dv-error">' + C.errorText + this.type + n + "</div>");
    }, T.prototype.loadPdf = function() {
        function e() {
            return !!document.createElement("canvas").getContext;
        }
        function t() {
            y.find("#pdf-num-pages").text(c.numPages);
        }
        function n() {
            g.val(h);
        }
        function i(e) {
            p.setContent(m), PDFJS.workerSrc = p.path + "libs/pdfjs/pdf.worker.js";
            var n = PDFJS.getDocument(e).then(function(e) {
                c = e, t(), a(h);
            });
            n.catch(function(e) {
                p.error(e.target.status, e.target.statusText);
            });
        }
        function a(e) {
            h = e, f.find("canvas").remove(), f.append(l(e)), r();
        }
        function r() {
            n(), o() ? b.addClass("disabled") : b.removeClass("disabled"), d() ? w.addClass("disabled") : w.removeClass("disabled");
        }
        function o() {
            return 1 == h;
        }
        function d() {
            return h == c.numPages;
        }
        function l(e) {
            var t = document.createElement("canvas");
            return t.id = "page" + e, c.getPage(e).then(function(e) {
                var n = p.$inner.width(), i = e.getViewport(1), a = n / i.width, r = e.getViewport(a), s = t.getContext("2d");
                t.height = r.height, t.width = r.width;
                var o = {
                    canvasContext: s,
                    viewport: r
                };
                e.render(o).then(function() {
                    x === !1 && (x = !0, p.triggerLoadedEvent());
                }), x === !1 && p.hideLoadingIndicator();
            }), t;
        }
        var c, p = this, h = 1, u = '<div class="pdf-menu"><div class="prev-page" >Prev Page</div><div class="next-page">Next Page</div><div class="go-to-page"><input> / <span id="pdf-num-pages"></span></div></div>', v = u + '<div class="pdf-page"></div>', m = $(v), f = m.filter(".pdf-page"), y = m.filter(".pdf-menu"), g = m.find("input"), w = m.find(".next-page"), b = m.find(".prev-page"), x = !1;
        return y.on("click", ".prev-page", function() {
            h > 1 && a(h - 1);
        }), y.on("click", ".next-page", function() {
            h < c.numPages && a(h + 1);
        }), y.on("keyup", "input", function() {
            var e = parseInt($(this).val(), 10);
            e > 0 && e <= c.numPages && a(e);
        }), e() ? (s([ "pdfjs" ], function() {
            i(p.filename);
        }), {
            load: i,
            setPage: a
        }) : void p.setContent(this.unsupportedBrowserText);
    }, T.prototype.loadText = function() {
        var e = this;
        $.ajax({
            url: e.path + "libs/getContents.php",
            type: "POST",
            data: {
                file: e.filename
            },
            success: function(t) {
                if (t = $.parseJSON(t), "success" === t.status) {
                    var n = $('<pre class="prettyprint linenums">' + t.response + "</pre>").css("opacity", 0);
                    e.hideLoadingIndicator(), e.setContent(n), n.animate({
                        opacity: 1
                    }), "code" === e.type && s([ "prettify" ], function() {
                        prettyPrint();
                    }), e.triggerLoadedEvent();
                } else e.error("404", "Not Found");
            },
            error: function() {
                e.error();
            }
        });
    }, T.prototype.loadJPlayer = function() {
        function e() {
            var e, t, i;
            return e = c.getJPlayerMarkup(), t = $(e).css({
                opacity: 0
            }), t.find(o.player).addClass(l), c.setContent(t), i = c.getWidth(), n.size.width = i, 
            n.size.height = d ? c.calculateSixteenNine(i) : 0, t.animate({
                opacity: 1
            }), t;
        }
        function t() {
            var t;
            d = -1 !== $.inArray(c.extension, P), n = $.extend(!0, {}, i, c.jPlayer), c.hideLoadingIndicator(), 
            t = e(), r = c.$inner.find(".jPlayer-container"), r.bind($.jPlayer.event.ready, function() {
                var e = {};
                e[c.extension] = c.filename, r.jPlayer("setMedia", e), a("jPlayer Ready"), c.autoPlay && r.jPlayer("play");
            }), r.bind($.jPlayer.event.loadstart, function() {
                c.triggerLoadedEvent();
            }), r.bind($.jPlayer.event.error, function(e) {
                a(e.jPlayer.error.message), a(e.jPlayer.error.hint), c.error("404", "Not Found");
            }), "mp4" == c.extension && (n.supplied = "m4v", c.extension = "m4v"), r.jPlayer(n), 
            c.$jPlayerAnchor = r;
        }
        var n, i, r, o, d, l, c = this;
        o = {
            jPlayer: "#jquery-jplayer-" + c.id,
            jPlayerContainer: ".jPlayer-container",
            playlist: ".playlist",
            playing: ".playing",
            progress: ".progress-wrapper",
            volume: ".volume-wrapper",
            player: ".player"
        }, l = "jp-interface-" + c.id, i = {
            swfPath: c.path + "libs/jPlayer",
            supplied: this.extension,
            solution: "html, flash",
            cssSelectorAncestor: "." + l,
            errorAlerts: c.debug,
            warningAlerts: c.debug,
            size: {
                height: c.height,
                width: c.width,
                cssClass: "show-video"
            },
            sizeFull: {
                width: "100%",
                height: "90%",
                cssClass: "show-video-full"
            },
            play: function() {
                $(this).jPlayer("pauseOthers");
            }
        }, s([ "jplayer" ], function() {
            t();
        });
    }, T.prototype.getJPlayerMarkup = function() {
        var e = '<div class="ttw-video-player"><div class="jPlayer-container"></div><div class="clear"></div><div class="player"><div class="player-controls"><div class="play jp-play button"></div><div class="pause jp-pause button"></div><div class="progress-wrapper"><div class="progress-bg"><div class="progress jp-seek-bar"><div class="elapsed jp-play-bar"></div></div></div></div><div class="volume-wrapper"><div class="volume jp-volume-bar"><div class="volume-value jp-volume-bar-value"></div></div></div></div><!-- These controls aren\'t used by this plugin, but jPlayer seems to require that they exist --><span class="unused-controls"><span class="previous jp-previous"></span><span class="next jp-next"></span><span class="jp-video-play"></span><span class="jp-stop"></span><span class="jp-mute"></span><span class="jp-unmute"></span><span class="jp-volume-max"></span><span class="jp-current-time"></span><span class="jp-duration"></span><span class="jp-repeat"></span><span class="jp-repeat-off"></span><span class="jp-gui"></span><span class="jp-restore-screen"></span><span class="jp-full-screen"></span><span class="jp-no-solution"></span><span class="jp-playback-rate-bar"></span><span class="jp-playback-rate-bar-value"></span><span class="jp-title"></span></span></div><div class="clear"></div></div>';
        return e;
    }, T.prototype.play = function() {
        this.$jPlayerAnchor.jPlayer("play");
    }, T.prototype.pause = function() {
        this.$jPlayerAnchor.jPlayer("pause");
    }, T.prototype.destroyPlayer = function() {
        this.$jPlayerAnchor.jPlayer("destroy");
    }, T.prototype.loadImage = function() {
        var e = this, t = $('<img class="dv-image">').css("opacity", 0);
        t.error(function() {
            e.error("404", "Not Found");
        }), t.attr("src", this.filename);
        var n = new Image();
        n.onload = function() {
            e.hideLoadingIndicator(), e.$inner.append(t), t.animate({
                opacity: 1
            }), e.triggerLoadedEvent();
        }, n.src = t.attr("src");
    }, t(), {
        initRender: c,
        load: d,
        close: close,
        getDocumentType: p,
        getDetails: u,
        setLanguage: o,
        getPlayerMarkup: v,
        testPlayerSizes: l
    };
}, DocumentLibrary = function(e) {
    function t(e) {
        P.debug && window.console && console.log("DOCUMENT LIBRARY: " + e);
    }
    function n() {
        return new Date().getTime() + "-" + Math.floor(1e5 * Math.random()) + 1;
    }
    function i(e) {
        var t = e ? !0 : !1, n = P.listType;
        T.empty(), t && $.isEmptyObject(e) ? a() : (r(), "previews" == n ? l(e) : "tiles" == n ? o(e) : d(e));
    }
    function a() {
        E = !0, T.addClass("empty");
    }
    function r() {
        E === !0 && (E = !1, T.removeClass("empty"));
    }
    function s() {
        var e = P.$anchor.width(), t = I[2e3];
        $.each(I, function(n, i) {
            return e <= parseInt(n, 10) ? (t = i, !1) : void 0;
        }), P.$anchor.attr("data-size", t), T.attr("data-size", t);
    }
    function o(e) {
        var t = e ? e : L.library, n = T;
        n.addClass("document-library-grid-list"), $.each(t, function(e, i) {
            var a, i;
            i = t[e], a = '<div class="document-library-item ' + i.details.type + " " + i.details.extension + '" data-index="' + e + '"><div class="document-library-item-inner"><div class="document-icon-extension">' + i.details.extension + '</div></div><div class="document-library-filename">' + i.details.name + "</div></div>", 
            n.append(a);
        });
    }
    function d(e) {
        var t = e ? e : L.library, n = T;
        n.addClass("document-library-line-item-list"), $.each(t, function(e) {
            var n, i;
            n = V.getDetails(t[e].path), i = '<div class="document-library-item ' + n.type + " " + n.extension + '" data-index="' + e + '"><div class="document-icon-extension">' + n.extension + '</div><div class="document-library-filename">' + n.name + "</div></div>", 
            T.append(i);
        });
    }
    function l(e) {
        function n() {
            for (var e = 0; d > e; e++) o.append(p), u.push(0);
        }
        function i() {
            for (var e = 0, t = 0; t < u.length; t++) {
                var n = u[t];
                n < u[e] && (e = t);
            }
            return e;
        }
        function a(e, t) {
            u[t] = e.height();
        }
        function r() {
            var e, t;
            $.each(m, function(n) {
                e = $('<div class="document-library-item" data-index="' + n + '"></div>');
                var r = i();
                t = o.children().eq(r), t.append(e);
                var s = V.initRender(m[n].path, {
                    $anchor: e,
                    autoPlay: !1,
                    width: c - h.total
                });
                g.push(s), a(t, r);
            });
        }
        function s() {
            y >= g.length || (g[y].load(), $.when(g[y].isLoaded).always(function() {
                y++, s();
            }));
        }
        var o, d, l, c, p, h, u, v, m = e ? e : L.library;
        o = T, k = new InvisibleDom(!0), d = P.previewTilesNumColumns, v = k.scrollbarWidth(), 
        l = o.width() - v, c = Math.floor(l / d), p = '<div class="document-library-column" style="width:' + c + 'px;"></div>', 
        u = [];
        var f = k.element($(p));
        if (h = f.getHorizontalPadding(), k.destroy(), 0 == l) return void t("Anchor width is 0. Please update your css to give your anchor a width");
        o.addClass("document-library"), o.addClass("document-library-preview-list");
        var y = 0, g = [];
        n(), r(), s();
    }
    function c() {
        var e, t;
        t = '<div class="document-library"><div class="document-library-filter"><div class="document-library-search"><input class="search-field" type="text" placeholder="Search"></div><div class="filter-types"><span class="filter-documents" data-type="document"></span><span class="filter-images" data-type="image"></span><span class="filter-audio" data-type="audio"></span><span class="filter-video" data-type="video"></span></div><div class="filter-message"><div class="filter-message-text"></div><span class="clear-message" title="Clear search results"></span></div></div><div class="document-library-list"></div><div class="document-library-no-results">No Results</div></div>', 
        e = $(t), T = e.find(".document-library-list"), A = e.find(".filter-message"), S = e.find(".filter-message-text"), 
        z = e.find("input"), H = e.find(".clear-message"), D = e.find(".filter-types"), 
        P.$anchor.append(e);
    }
    function p(e) {
        S.text(e), A.addClass("showing");
    }
    function h() {
        A.removeClass("showing");
    }
    function u(e) {
        if (e && e.length) {
            p("Search for '" + e + "'");
            var t = {};
            $.each(L.library, function(n, i) {
                -1 != i.details.name.toLowerCase().indexOf(e.toLowerCase()) && (t[n] = i);
            }), i(t);
        } else z.val(""), h(), i();
    }
    function v(e) {
        var t, n, a = {};
        t = "document" == e || "image" == e ? e + "s" : e, n = [ "pdf", "txt", "docx", "doc" ], 
        p("Showing " + t), $.each(L.library, function(t, i) {
            "document" == e ? -1 !== $.inArray(i.details.extension, n) && (a[t] = i) : i.details.type == e && (a[t] = i);
        }), i(a);
    }
    function m() {
        for (var e = 0; e < L.library.length; e++) {
            var t;
            t = V.getDetails(L.library[e].path), L.library[e].details = t;
        }
    }
    function f() {
        P.$anchor.on("click", ".document-library-item", function(e) {
            var t, n = $(this);
            $(e.target).is(".document-viewer-menu, .jp-play, .jp-pause, .progress-bg, .progress") || (t = n.data("index"), 
            g(t));
        }), P.$anchor.on("click", ".open-item-back", function() {
            y(), c(), i();
        }), P.$anchor.on("keyup", ".search-field", function() {
            u(z.val());
        }), P.$anchor.on("click", ".clear-message", function() {
            u();
        }), P.$anchor.on("click", ".filter-types span", function() {
            var e = $(this).data("type");
            v(e);
        }), $(window).on("resize." + x, function() {
            s(), i();
        });
    }
    function y() {
        P.$openItemAnchor.empty();
    }
    function g(e) {
        var n, i, a, r = C === !1 ? "list-and-open-in-separate-containers" : "", s = '<div class="document-library-open-item ' + r + '"><div class="open-item-menu"><span class="open-item-back">< Back</span><span class="open-item-name"></span></div><div class="open-item"></div></div>';
        if (n = $(s), i = n.find(".open-item-name"), a = n.find(".open-item"), !jQuery.contains(document, P.$openItemAnchor[0])) return t("Open Item Anchor does not exist in the document. Please check your value for the '$openItemAnchor' parameter and make sure it is a node that exists in the page"), 
        !1;
        P.openInModal !== !0 && (y(), P.$openItemAnchor.html(n));
        var o = V.load(L.library[e].path, {
            isModal: P.openInModal,
            $anchor: a,
            width: P.openItemWidth,
            setUnsupportedSizeAsSquare: !1
        });
        i.text(o.name);
    }
    function w(e) {
        M || (L.library = e, m(), c(), s(), i(), f(), M = !0);
    }
    function b() {
        $(window).off("resize." + x), P.$anchor.empty(), C || P.$openItemAnchor.empty();
    }
    var x, P, j, k, C, I, T, A, D, S, z, H, L = this, M = !1, E = !1;
    x = n(), I = {
        150: "tiny",
        250: "x-small",
        400: "small",
        600: "medium",
        800: "large",
        1200: "x-large",
        1600: "2x-large",
        2e3: "3x-large"
    }, j = {
        debug: !1,
        $anchor: null,
        previewTilesNumColumns: 4,
        listType: "list",
        $openItemAnchor: e.$anchor,
        openInModal: !1,
        path: "document-library/",
        openItemWidth: function(e) {
            return .8 * e.$anchor.width();
        },
        documentViewerOptions: {}
    }, P = $.extend(!0, {}, j, e);
    var N = $.extend({}, {
        path: P.path,
        debug: P.debug
    }, P.documentViewerOptions), V = new DocumentViewer(N);
    return C = P.$anchor[0] == P.$openItemAnchor[0], {
        load: w,
        destroy: b
    };
}, InvisibleDom = function(e) {
    function t() {
        r.empty(), r.remove();
    }
    function n(e) {
        return new s(e);
    }
    function i() {
        var e, t;
        return void 0 === a && (e = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), 
        t = e.children(), a = t.innerWidth() - t.height(99).innerWidth(), e.remove()), a;
    }
    var a, r;
    r = $("<div></div>").css({
        display: "block",
        position: "absolute",
        bottom: -99999,
        left: -99999,
        opacity: 0
    }), e === !0 && r.css({
        bottom: 0,
        left: 0,
        opacity: 1,
        "z-index": 99999
    }), $("body").append(r);
    var s = function(e) {
        this.$element = e, this.isAddedToDom = !1, this.add();
    };
    return s.prototype.add = function() {
        this.isAddedToDom || r.append(this.$element);
    }, s.prototype.getSize = function() {
        var e = {};
        return e.height = this.$element.height(), e.outerHeight = this.$element.outerHeight(!0), 
        e.width = this.$element.width(), e.outerWidth = this.$element.outerWidth(!0), e;
    }, s.prototype.getHorizontalPadding = function() {
        var e = {};
        return e.rightPadding = parseInt(this.$element.css("padding-right"), 10), e.leftPadding = parseInt(this.$element.css("padding-left"), 10), 
        e.total = e.rightPadding + e.leftPadding, e;
    }, s.prototype.getHorizontalMargin = function() {
        var e = {};
        return e.rightPadding = parseInt(this.$element.css("margin-right"), 10), e.leftPadding = parseInt(this.$element.css("margin-left"), 10), 
        e.total = e.rightPadding + e.leftPadding, e;
    }, {
        element: n,
        scrollbarWidth: i,
        destroy: t
    };
};