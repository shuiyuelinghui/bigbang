!function e(t, n, i) {
    function o(r, s) {
        if (!n[r]) {
            if (!t[r]) {
                var l = "function" == typeof require && require;
                if (!s && l)return l(r, !0);
                if (a)return a(r, !0);
                throw new Error("Cannot find module '" + r + "'")
            }
            var d = n[r] = {exports: {}};
            t[r][0].call(d.exports, function (e) {
                var n = t[r][1][e];
                return o(n ? n : e)
            }, d, d.exports, e, t, n, i)
        }
        return n[r].exports
    }

    for (var a = "function" == typeof require && require, r = 0; r < i.length; r++)o(i[r]);
    return o
}({
    1: [function (e, t, n) {
        t.exports = {
            //暂时借用现勘的登录
            prjName: "xcky3",
            restfuls: ["192.168.40.22:52181"],
            subPrj: {
                wz: {prjName: "wzgl", restfuls: ["http://192.168.1.211:8888"]},
                xk: {prjName: "xcky3", restfuls: ["http://192.168.1.211:8888"]},
                lib: {prjName: "lib", restfuls: ["http://192.168.1.211:8888"]}
            },
            version: "0.9.2",
            maxTabCount: 9,
            scrollBarWidth: 5,
            indexStyle: "adds",
            useFullWrap: !1,
            tabLength: null,
            holdToken: !1,
            mapVersion: 2,
            autoCustomCol: 1,
            mapServerPath: "http://192.168.1.168:8101",
            mock: 1,
            test: 0,
            useLocalAgent: 1,
            defaultImports: ["xtp", "xTable", "fixTable", "customCol", "scope", "filter", "widget"],
            plugins: {
                hsmap: "hsmap/hsmap.js",
                fullscreen: "fullscreen/jquery.fullscreen.js",
                autocomplete: "autocomplete/autocomplete.js",
                mappicker: "mappicker/mappicker.js",
                datepicker: "date/my97/datepicker.js",
                ztree: "ztree/ztree.js",
                echarts: "echarts/echarts3110.js",
                echarts2: "echarts/echarts225.js",
                echarts3: "echarts/echarts3110.js",
                china: "echarts/china.js",
                jqgrid: "jqgrid/jquery.jqGrid.min.js",
                dataTable: "dataTable/jquery.dataTables.js",
                fixDataTable: "dataTable/dataTables.fixedColumns.js",
                dict: "dict/dict.js",
                socket: "socket/socket.io.js",
                ckeditor: "ckeditor/ckeditor.js",
                moment: "date/moment.js",
                daterangepicker: {path: "date/daterangepicker/daterangepicker2124.js", depending: ["moment"]},
                currentDate: "date/currentDate.js",
                "bs-popover": "bootstrap/bs-popover.js",
                "bs-tooltip": "bootstrap/bs-tooltip.js",
                bootstrap: {depending: ["bootstrap-css", "bootstrap-js"]},
                "bootstrap-js": "bootstrap/bootstrap.3.31.js",
                "bootstrap-css": "bootstrap/bootstrap.3.31.css",
                datetimepicker: {path: "date/bs.datetimepicker/bootstrap-datetimepicker.min.js", depending: ["moment"]},
                "adminDesign.main": "admindesign/main.js",
                colorBox: "admindesign/colorbox.js",
                panelCtrls: "admindesign/panel.ctrls.js",
                slick: "slick/slick.min.js",
                bowser: "bowser.min.js",
                tooltips: "tooltips/tooltipster.bundle.min.js",
                jui: "jui/jquery-ui.js",
                popover: "popover/jquery.webui-popover.min.js",
                previewBox: "preview/previewbox.js",
                previewPro: {path: "preview/previewpro.js", depending: ["plugin/preview/previewpro.htm", "jui"]},
                barcode: "barcode/jsbarcode-all.js"
            },
            restDesc: "上方为restful服务器路径,会自动加上项目名对应到xcky3,下方为具体的业务action登记,登记后使用makeAct('login')就可以得到完整的服务url, 如未登记,则用makeAct('sys/login/login')也能生成全路径",
            actions: {
                login: "sys/login/login",
                logout: "sys/login/logout",
                sysUserUpd: "sys/sysUser/upd",
                sysOrgDict: "sys/sysOrganization/dict_unit"
            },
            mockActions: {
                login: "",
                logout: "",
                sysUserUpd: "sys/sysUser/upd",
                sysOrgDict: "sys/sysOrganization/dict_unit",
                "message/list": ""
            }
        }
    }, {}], 2: [function (e, t, n) {
        window.sysParams = window.sysParams || localData.get("sysParams") || {};
        var i = window.sysParams.cobwebPath || "http://10.130.151.151:8088/cobweb", o = i.replace("http://", "").replace("/cobweb", ""), a = getViewPath("page-cobweb.html") + "&shortPath={0}&phoneNo={1}".format(o, 12345);
        "object" == typeof t && "object" == typeof t.exports && (t.exports = {
            openDoc: function (e, t, n, i, o, a, r, s) {
                var l = arguments[0], d = "object" == typeof l ? [l.docID, l.tableID, l.tableName, l.title, l.allowEdit, l.showCustomBar, l.showMenuBar] : arguments, c = top.config.wordJspPath || top.path + "/jsp/word.jsp", u = c + "?docID={0}&tableID={1}&tableName={2}&title={3}&allowEdit={4}&showCustomBar={5}&showMenuBar={6}".format(d[0], d[1], d[2] || "", d[3] || "", d[4] || "0", d[5] || "0", d[6] || "0");
                return "object" == typeof s ? s.src = u : top.$open(u, {
                    title: i,
                    width: top.innerWidth - 120,
                    height: top.innerHeight - 20
                })
            }, openDocInFrame: function (e, t, n, i, o, a, r, s) {
                return openDoc(t, n, i, o, a, r, s, e)
            }, cobwebInit: function (e) {
                window.open(a)
            }, cobwebDirect: function (e) {
                info("蛛网页面地址:" + e);
                var t = document.createElement("iframe");
                t.height = 0, t.width = 0, document.body.appendChild(t), t.onload = function () {
                    setTimeout(function () {
                        window.open(e), setTimeout(function () {
                            document.body.removeChild(t)
                        }, 2e3)
                    }, 360)
                }, t.src = a
            }, cobwebSearch: function (e, t) {
                e = e || "", t = t || "handsetNum", "id" == t && (t = "identification");
                var n = e ? "{0}/oneSearch/searchResult?keyType={1}&keyWord={2}".format(i, t, e) : "{0}/oneSearch/searchPage".format(i);
                cobwebDirect(n)
            }, sisInit: function () {
                cobwebDirect(i + "/sisSearch/getIndex")
            }
        })
    }, {}], 3: [function (e, t, n) {
        window.$extractor("rangeDate", function (e) {
            var t = $(this), n = t.data(), i = t.attr("x-name"), o = t.val().split(","), a = n.bname || i + "Begin", r = n.ename || i + "End";
            return e ? (e[a] = o[0].trim(), void(e[r] = (o[1] || "").trim())) : t.val()
        })("dict", function (e) {
            var t = $(this), n = t.attr("dict-name"), i = t.attr("dict-id"), o = t.find("#" + i).val();
            return e ? void(e[n] = o) : o
        })
    }, {}], 4: [function (e, t, n) {
        e("./lib/defineding.js"), window.extending({
            voidFn: function () {
            }
        });
        var i = e("../data/config.json");
        i.isClient = ("file:" == location.protocol || "chrome-extension:" == location.protocol) && "function" == typeof window.require, i.isLocal = i.isClient || i.useLocalAgent && location.href.indexOf("webapp/dist/") > -1, window.extending({
            config: i,
            setSubPrj: function (e) {
                var t = i.subPrj[e];
                i.prjName = t.prjName, i.restfuls = t.restfuls || i.restfuls
            }
        });
        var o = e("./lib/locals");
        window.extending(o, !0), window.extending({_staticCache: Object.create(null)}), window.extending({
            $cache: function (e, t) {
                var n = arguments.length;
                return 2 == n ? window._staticCache[e] = t : 1 == n ? window._staticCache[e] : 0 == n ? window._staticCache : void 0
            }
        }), e("./lib/path.js");
        var a = e("./lib/jquery");
        window.extending({$: a, jQuery: a}, !0), e("./lib/jquery.extend");
        var r = e("./lib/eui");
        r(a);
        var s = e("./lib/jquery.cookie");
        s(a);
        var l = e("./lib/exy");
        window.extending(l, !0), e("./lib/proto");
        var d = e("./lib/xtp");
        window.extending(d);
        var c = e("./lib/pub");
        window.extending(c, !0);
        var u = e("./business/pub-business");
        window.extending(u);
        e("./lib/paging.js"), e("./lib/validate.js");
        top.molKeys && window.localParamsInit(top.molKeys), e("./lib/mock-register.js"), e("./filter.js"), e("./extractor.js"), e("./injector.js"), e("./widget.js"), window == top && (window.extending("$state", e("./lib/naving.state.js")), window.$state = window.$state), e("./lib/patch.js"), window.makeAct = window.makeAct, window.queryParse = window.queryParse, window.typeOf = window.typeOf, window.obj2str = window.obj2str, window.str2obj = window.str2obj, window.byid = window.byid, window.bytag = window.bytag, window.dash2camel = window.dash2camel, window.camel2dash = window.camel2dash, window.getRect = window.getRect, window.toast = window.toast, window.$alert = window.$alert, window.$confirm = window.$confirm, window.$open = window.$open, window.$append = window.$append, window.$post = window.$post, window.$get = window.$get, window.$compile = window.$compile, window.$widget = window.$widget, window.$behavior = window.$behavior, window.$cache = window.$cache, window.localData = localData, window.$filter = window.$filter, window.$injector = window.$injector, window.$extractor = window.$extractor, "object" == typeof t && "object" == typeof t.exports && (t.exports = {
            checkDtd: function () {
                if ("BackCompat" == document.compatMode)throw new Error("BackCompat！please check DTD！")
            }
        })
    }, {
        "../data/config.json": 1,
        "./business/pub-business": 2,
        "./extractor.js": 3,
        "./filter.js": 5,
        "./injector.js": 6,
        "./lib/defineding.js": 7,
        "./lib/eui": 8,
        "./lib/exy": 9,
        "./lib/jquery": 14,
        "./lib/jquery.cookie": 12,
        "./lib/jquery.extend": 13,
        "./lib/locals": 16,
        "./lib/mock-register.js": 17,
        "./lib/naving.state.js": 18,
        "./lib/paging.js": 19,
        "./lib/patch.js": 20,
        "./lib/path.js": 21,
        "./lib/proto": 22,
        "./lib/pub": 23,
        "./lib/validate.js": 25,
        "./lib/xtp": 30,
        "./widget.js": 33
    }], 5: [function (e, t, n) {
        function i(e, t, n) {
            var i = parseInt(this);
            return 1 === i ? e : 0 === i ? t : "undefined" != typeof n ? n : this.valueOf()
        }

        window.$filter("asNumber", function () {
            return 1 == this.valueOf() ? 1 : 0
        }, Boolean), window.$filter("sub16", function () {
            return this.trim().slice(0, 16)
        }, String), window.$filter("asDate16", function () {
            return this.valueOf() ? new Date(this).format("YYYY-M-D hh:mm") : ""
        }), window.$filter("asCnTime", function () {
            return this.valueOf() ? new Date(this).format("YYYY年M月D日 hh:mm") : window.config.emptyDate || "--"
        }), window.$filter("asCnDate", function () {
            return new Date(this).format("YYYY年M月D日")
        }), window.$filter("asRead", function () {
            return i.apply(this, ["已读", "未读"])
        }), window.$filter("asEnable", function () {
            return i.apply(this, ["启用", "禁用", "禁用"])
        }), window.$filter("asSolved", function () {
            return i.apply(this, ["已解决", "未解决"])
        }), window.$filter("asActive", function () {
            return i.apply(this, ["active", "no-active", ""])
        }), window.$filter("toInt", function () {
            return parseInt(this.valueOf())
        }), window.$filter("asSex", function () {
            return this.toString().trim().replace("1", "男").replace("2", "女").replace("0", "未知")
        }), window.$filter("exNum", function () {
            return 1 === parseInt(this) ? 0 : 1
        }), window.$filter("asYes", function () {
            return 1 === parseInt(this) ? "是" : "否"
        }), window.$filter("asUndefined", function () {
            return "undefined" == this.toString() ? void 0 : this
        }), window.$filter("html2txt", function () {
            return this.toString().replace(/<\/?.*?>/g, "")
        })
    }, {}], 6: [function (e, t, n) {
        window.$injector("rangeDate", function (e, t) {
            var n = $(this), i = n.data(), o = n.attr("x-name"), a = i.bname || o + "Begin", r = i.ename || o + "End";
            return t ? n.val(e) : n.val(t[a] + "," + t[r])
        })
    }, {}], 7: [function (e, t, n) {
        !function (e) {
            Object.defineProperty(Object.prototype, "extending", {
                value: function () {
                    var e = {};
                    "object" == typeof arguments[0] ? e = arguments[0] : e[arguments[0]] = arguments[1];
                    for (var t in e)e.hasOwnProperty(t) && Object.defineProperty(this, t, {
                        value: e[t],
                        writable: !1,
                        enumerable: arguments[arguments.length - 1] === !0,
                        configurable: !1
                    });
                    return this
                }, writable: !1, enumerable: !1, configurable: !1
            }), Object.defineProperty(Object.prototype, "getting", {
                value: function () {
                    var e = {};
                    "object" == typeof arguments[0] ? e = arguments[0] : e[arguments[0]] = arguments[1];
                    for (var t in e)Object.defineProperty(this, t, {
                        get: e[t],
                        enumerable: arguments[arguments.length - 1] === !0,
                        configurable: !1
                    });
                    return this
                }, writable: !1, enumerable: !1, configurable: !1
            })
        }(window), Object.prototype.extending("fixing", function (e) {
            Object.defineProperty(this, e, {writable: !1, configurable: !1})
        }), window.extending(window === top ? {_mol_wins: {}, _opener_wins: {}} : {
            $window: top.$window,
            $document: top.$document,
            $$: top.$$
        }), window.getting({
            doc: function () {
                return document.documentElement
            }, width: function () {
                return this.innerWidth
            }, height: function () {
                return this.innerHeight
            }, scrollTop: function () {
                return document.documentElement.scrollTop || document.body.scrollTop
            }, scrollLeft: function () {
                return document.documentElement.scrollLeft || document.body.scrollLeft
            }, iframe: function () {
                return window.frameElement
            }, $opener: function () {
                var e = this.iframe.getAttribute("opener-id");
                return top._opener_wins[e]
            }
        }), window.extending("getPrjName", function () {
            return window.config.prjName
        })
    }, {}], 8: [function (require, module, exports) {
        var _eui = function (jQuery) {
            !function (e) {
                e.parser = {
                    auto: !0,
                    onComplete: function (e) {
                    },
                    plugins: ["_draggable", "_droppable", "_resizable", "pagination", "etooltip", "linkbutton", "menu", "menubutton", "splitbutton", "progressbar", "tree", "textbox", "filebox", "combo", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "spinner", "numberspinner", "timespinner", "datetimespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "epanel", "datagrid", "propertygrid", "treegrid", "datalist", "tabs", "accordion", "window", "dialog", "form"],
                    parse: function (t) {
                        for (var n = [], i = 0; i < e.parser.plugins.length; i++) {
                            var o = e.parser.plugins[i], a = e(".eui-" + o, t);
                            a.length && (a[o] ? a[o]() : n.push({name: o, jq: a}))
                        }
                        if (n.length && window.easyloader) {
                            for (var r = [], i = 0; i < n.length; i++)r.push(n[i].name);
                            easyloader.load(r, function () {
                                for (var i = 0; i < n.length; i++) {
                                    var o = n[i].name, a = n[i].jq;
                                    a[o]()
                                }
                                e.parser.onComplete.call(e.parser, t)
                            })
                        } else e.parser.onComplete.call(e.parser, t)
                    },
                    parseValue: function (t, n, i, o) {
                        o = o || 0;
                        var a = e.trim(String(n || "")), r = a.substr(a.length - 1, 1);
                        return "%" == r ? (a = parseInt(a.substr(0, a.length - 1)), a = t.toLowerCase().indexOf("width") >= 0 ? Math.floor((i.width() - o) * a / 100) : Math.floor((i.height() - o) * a / 100)) : a = parseInt(a) || void 0, a
                    },
                    parseOptions: function (t, n) {
                        var i = e(t), o = {}, a = e.trim(i.attr("data-options"));
                        if (a && ("{" != a.substring(0, 1) && (a = "{" + a + "}"), o = new Function("return " + a)()), e.map(["width", "height", "left", "top", "minWidth", "maxWidth", "minHeight", "maxHeight"], function (n) {
                                var i = e.trim(t.style[n] || "");
                                i && (i.indexOf("%") == -1 && (i = parseInt(i) || void 0), o[n] = i)
                            }), n) {
                            for (var r = {}, s = 0; s < n.length; s++) {
                                var l = n[s];
                                if ("string" == typeof l)r[l] = i.attr(l); else for (var d in l) {
                                    var c = l[d];
                                    "boolean" == c ? r[d] = i.attr(d) ? "true" == i.attr(d) : void 0 : "number" == c && (r[d] = "0" == i.attr(d) ? 0 : parseFloat(i.attr(d)) || void 0)
                                }
                            }
                            e.extend(o, r)
                        }
                        return o
                    }
                }, e(function () {
                    var t = e('<div style="position:absolute;top:-1000px;width:100px;height:100px;padding:5px"></div>').appendTo("body");
                    e._boxModel = 100 != t.outerWidth(), t.remove(), !window.easyloader && e.parser.auto && e.parser.parse()
                }), e.fn._outerWidth = function (e) {
                    return void 0 == e ? this[0] == window ? this.width() || document.body.clientWidth : this.outerWidth() || 0 : this._size("width", e)
                }, e.fn._outerHeight = function (e) {
                    return void 0 == e ? this[0] == window ? this.height() || document.body.clientHeight : this.outerHeight() || 0 : this._size("height", e)
                }, e.fn._scrollLeft = function (t) {
                    return void 0 == t ? this.scrollLeft() : this.each(function () {
                        e(this).scrollLeft(t)
                    })
                }, e.fn._propAttr = e.fn.prop || e.fn.attr, e.fn._size = function (t, n) {
                    function i(t, n, i) {
                        if (!n.length)return !1;
                        var o = e(t)[0], a = n[0], r = a.fcount || 0;
                        return i ? (o.fitted || (o.fitted = !0, a.fcount = r + 1, e(a).addClass("epanel-noscroll"), "BODY" == a.tagName && e("html").addClass("epanel-fit")), {
                            width: e(a).width() || 1,
                            height: e(a).height() || 1
                        }) : (o.fitted && (o.fitted = !1, a.fcount = r - 1, 0 == a.fcount && (e(a).removeClass("epanel-noscroll"), "BODY" == a.tagName && e("html").removeClass("epanel-fit"))), !1)
                    }

                    function o(t, n, i, o) {
                        var a = e(t), r = n, s = r.substr(0, 1).toUpperCase() + r.substr(1), l = e.parser.parseValue("min" + s, o["min" + s], i), d = e.parser.parseValue("max" + s, o["max" + s], i), c = e.parser.parseValue(r, o[r], i), u = String(o[r] || "").indexOf("%") >= 0;
                        if (isNaN(c))a._size(r, ""), a._size("min" + s, l), a._size("max" + s, d); else {
                            var f = Math.min(Math.max(c, l || 0), d || 99999);
                            u || (o[r] = f), a._size("min" + s, ""), a._size("max" + s, ""), a._size(r, f)
                        }
                        return u || o.fit
                    }

                    function a(t, n, i) {
                        function o() {
                            return n.toLowerCase().indexOf("width") >= 0 ? a.outerWidth() - a.width() : a.outerHeight() - a.height()
                        }

                        var a = e(t);
                        if (void 0 == i) {
                            if (i = parseInt(t.style[n]), isNaN(i))return;
                            return e._boxModel && (i += o()), i
                        }
                        "" === i ? a.css(n, "") : (e._boxModel && (i -= o(), i < 0 && (i = 0)), a.css(n, i + "px"))
                    }

                    return "string" == typeof t ? "clear" == t ? this.each(function () {
                        e(this).css({width: "", minWidth: "", maxWidth: "", height: "", minHeight: "", maxHeight: ""})
                    }) : "fit" == t ? this.each(function () {
                        i(this, "BODY" == this.tagName ? e("body") : e(this).parent(), !0)
                    }) : "unfit" == t ? this.each(function () {
                        i(this, e(this).parent(), !1)
                    }) : void 0 == n ? a(this[0], t) : this.each(function () {
                        a(this, t, n)
                    }) : this.each(function () {
                        n = n || e(this).parent(), e.extend(t, i(this, n, t.fit) || {});
                        var a = o(this, "width", n, t), r = o(this, "height", n, t);
                        a || r ? e(this).addClass("eui-fluid") : e(this).removeClass("eui-fluid")
                    })
                }
            }(jQuery), function (e) {
                function t(t) {
                    1 == t.touches.length && (r ? (clearTimeout(dblClickTimer), r = !1, o(t, "dblclick")) : (r = !0, dblClickTimer = setTimeout(function () {
                        r = !1
                    }, 500)), a = setTimeout(function () {
                        o(t, "contextmenu", 3)
                    }, 1e3), o(t, "mousedown"), (e.fn._draggable.isDragging || e.fn._resizable.isResizing) && t.preventDefault())
                }

                function n(t) {
                    1 == t.touches.length && (a && clearTimeout(a), o(t, "mousemove"), (e.fn._draggable.isDragging || e.fn._resizable.isResizing) && t.preventDefault())
                }

                function i(t) {
                    a && clearTimeout(a), o(t, "mouseup"), (e.fn._draggable.isDragging || e.fn._resizable.isResizing) && t.preventDefault()
                }

                function o(t, n, i) {
                    var o = new e.Event(n);
                    o.pageX = t.changedTouches[0].pageX, o.pageY = t.changedTouches[0].pageY, o.which = i || 1, e(t.target).trigger(o)
                }

                var a = null, r = !1;
                document.addEventListener && (document.addEventListener("touchstart", t, !0), document.addEventListener("touchmove", n, !0), document.addEventListener("touchend", i, !0))
            }(jQuery), function (e) {
                function t(t) {
                    var n = e.data(t.data.target, "_draggable"), i = n.options, o = n.proxy, a = t.data, r = a.startLeft + t.pageX - a.startX, s = a.startTop + t.pageY - a.startY;
                    o && (o.parent()[0] == document.body ? (r = null != i.deltaX && void 0 != i.deltaX ? t.pageX + i.deltaX : t.pageX - t.data.offsetWidth, s = null != i.deltaY && void 0 != i.deltaY ? t.pageY + i.deltaY : t.pageY - t.data.offsetHeight) : (null != i.deltaX && void 0 != i.deltaX && (r += t.data.offsetWidth + i.deltaX), null != i.deltaY && void 0 != i.deltaY && (s += t.data.offsetHeight + i.deltaY))), t.data.parent != document.body && (r += e(t.data.parent).scrollLeft(), s += e(t.data.parent).scrollTop()), "h" == i.axis ? a.left = r : "v" == i.axis ? a.top = s : (a.left = r, a.top = s)
                }

                function n(t) {
                    var n = e.data(t.data.target, "_draggable"), i = n.options, o = n.proxy;
                    o || (o = e(t.data.target)), o.css({
                        left: t.data.left,
                        top: t.data.top
                    }), e("body").css("cursor", i.cursor)
                }

                function i(i) {
                    if (!e.fn._draggable.isDragging)return !1;
                    var o = e.data(i.data.target, "_draggable"), a = o.options, r = e("._droppable").filter(function () {
                        return i.data.target != this
                    }).filter(function () {
                        var t = e.data(this, "_droppable").options.accept;
                        return !t || e(t).filter(function () {
                                return this == i.data.target
                            }).length > 0
                    });
                    o._droppables = r;
                    var s = o.proxy;
                    return s || (a.proxy ? (s = "clone" == a.proxy ? e(i.data.target).clone().insertAfter(i.data.target) : a.proxy.call(i.data.target, i.data.target), o.proxy = s) : s = e(i.data.target)), s.css("position", "absolute"), t(i), n(i), a.onStartDrag.call(i.data.target, i), !1
                }

                function o(i) {
                    if (!e.fn._draggable.isDragging)return !1;
                    var o = e.data(i.data.target, "_draggable");
                    t(i), 0 != o.options.onDrag.call(i.data.target, i) && n(i);
                    var a = i.data.target;
                    return o._droppables.each(function () {
                        var t = e(this);
                        if (!t._droppable("options").disabled) {
                            var n = t.offset();
                            i.pageX > n.left && i.pageX < n.left + t.outerWidth() && i.pageY > n.top && i.pageY < n.top + t.outerHeight() ? (this.entered || (e(this).trigger("_dragenter", [a]), this.entered = !0), e(this).trigger("_dragover", [a])) : this.entered && (e(this).trigger("_dragleave", [a]), this.entered = !1)
                        }
                    }), !1
                }

                function a(t) {
                    function n() {
                        s && s.remove(), a.proxy = null
                    }

                    function i() {
                        var i = !1;
                        return a._droppables.each(function () {
                            var o = e(this);
                            if (!o._droppable("options").disabled) {
                                var a = o.offset();
                                return t.pageX > a.left && t.pageX < a.left + o.outerWidth() && t.pageY > a.top && t.pageY < a.top + o.outerHeight() ? (l.revert && e(t.data.target).css({
                                    position: t.data.startPosition,
                                    left: t.data.startLeft,
                                    top: t.data.startTop
                                }), e(this).trigger("_drop", [t.data.target]), n(), i = !0, this.entered = !1, !1) : void 0
                            }
                        }), i || l.revert || n(), i
                    }

                    if (!e.fn._draggable.isDragging)return r(), !1;
                    o(t);
                    var a = e.data(t.data.target, "_draggable"), s = a.proxy, l = a.options;
                    if (l.revert)if (1 == i())e(t.data.target).css({
                        position: t.data.startPosition,
                        left: t.data.startLeft,
                        top: t.data.startTop
                    }); else if (s) {
                        var d, c;
                        s.parent()[0] == document.body ? (d = t.data.startX - t.data.offsetWidth, c = t.data.startY - t.data.offsetHeight) : (d = t.data.startLeft, c = t.data.startTop), s.animate({
                            left: d,
                            top: c
                        }, function () {
                            n()
                        })
                    } else e(t.data.target).animate({left: t.data.startLeft, top: t.data.startTop}, function () {
                        e(t.data.target).css("position", t.data.startPosition)
                    }); else e(t.data.target).css({position: "absolute", left: t.data.left, top: t.data.top}), i();
                    return l.onStopDrag.call(t.data.target, t), r(), !1
                }

                function r() {
                    e.fn._draggable.timer && (clearTimeout(e.fn._draggable.timer), e.fn._draggable.timer = void 0), e(document).unbind("._draggable"), e.fn._draggable.isDragging = !1, setTimeout(function () {
                        e("body").css("cursor", "")
                    }, 100)
                }

                e.fn._draggable = function (t, n) {
                    return "string" == typeof t ? e.fn._draggable.methods[t](this, n) : this.each(function () {
                        function n(t) {
                            var n = e.data(t.data.target, "_draggable"), i = n.handle, o = e(i).offset(), a = e(i).outerWidth(), r = e(i).outerHeight(), s = t.pageY - o.top, l = o.left + a - t.pageX, d = o.top + r - t.pageY, c = t.pageX - o.left;
                            return Math.min(s, l, d, c) > n.options.edge
                        }

                        var r, s = e.data(this, "_draggable");
                        s ? (s.handle.unbind("._draggable"), r = e.extend(s.options, t)) : r = e.extend({}, e.fn._draggable.defaults, e.fn._draggable.parseOptions(this), t || {});
                        var l = r.handle ? "string" == typeof r.handle ? e(r.handle, this) : r.handle : e(this);
                        return e.data(this, "_draggable", {
                            options: r,
                            handle: l
                        }), r.disabled ? void e(this).css("cursor", "") : void l.unbind("._draggable").bind("mousemove._draggable", {target: this}, function (t) {
                            if (!e.fn._draggable.isDragging) {
                                var i = e.data(t.data.target, "_draggable").options;
                                n(t) ? e(this).css("cursor", i.cursor) : e(this).css("cursor", "")
                            }
                        }).bind("mouseleave._draggable", {target: this}, function (t) {
                            e(this).css("cursor", "")
                        }).bind("mousedown._draggable", {target: this}, function (t) {
                            if (0 != n(t)) {
                                e(this).css("cursor", "");
                                var r = e(t.data.target).position(), s = e(t.data.target).offset(), l = {
                                    startPosition: e(t.data.target).css("position"),
                                    startLeft: r.left,
                                    startTop: r.top,
                                    left: r.left,
                                    top: r.top,
                                    startX: t.pageX,
                                    startY: t.pageY,
                                    offsetWidth: t.pageX - s.left,
                                    offsetHeight: t.pageY - s.top,
                                    target: t.data.target,
                                    parent: e(t.data.target).parent()[0]
                                };
                                e.extend(t.data, l);
                                var d = e.data(t.data.target, "_draggable").options;
                                if (0 != d.onBeforeDrag.call(t.data.target, t))return e(document).bind("mousedown._draggable", t.data, i), e(document).bind("mousemove._draggable", t.data, o), e(document).bind("mouseup._draggable", t.data, a), e.fn._draggable.timer = setTimeout(function () {
                                    e.fn._draggable.isDragging = !0, i(t)
                                }, d.delay), !1
                            }
                        })
                    })
                }, e.fn._draggable.methods = {
                    options: function (t) {
                        return e.data(t[0], "_draggable").options
                    }, proxy: function (t) {
                        return e.data(t[0], "_draggable").proxy
                    }, enable: function (t) {
                        return t.each(function () {
                            e(this)._draggable({disabled: !1})
                        })
                    }, disable: function (t) {
                        return t.each(function () {
                            e(this)._draggable({disabled: !0})
                        })
                    }
                }, e.fn._draggable.parseOptions = function (t) {
                    var n = e(t);
                    return e.extend({}, e.parser.parseOptions(t, ["cursor", "handle", "axis", {
                        revert: "boolean",
                        deltaX: "number",
                        deltaY: "number",
                        edge: "number",
                        delay: "number"
                    }]), {disabled: !!n.attr("disabled") || void 0})
                }, e.fn._draggable.defaults = {
                    proxy: null,
                    revert: !1,
                    cursor: "move",
                    deltaX: null,
                    deltaY: null,
                    handle: null,
                    disabled: !1,
                    edge: 0,
                    axis: null,
                    delay: 100,
                    onBeforeDrag: function (e) {
                    },
                    onStartDrag: function (e) {
                    },
                    onDrag: function (e) {
                    },
                    onStopDrag: function (e) {
                    }
                }, e.fn._draggable.isDragging = !1
            }(jQuery), function (e) {
                function t(t) {
                    e(t).addClass("_droppable"), e(t).bind("_dragenter", function (n, i) {
                        e.data(t, "_droppable").options.onDragEnter.apply(t, [n, i])
                    }), e(t).bind("_dragleave", function (n, i) {
                        e.data(t, "_droppable").options.onDragLeave.apply(t, [n, i])
                    }), e(t).bind("_dragover", function (n, i) {
                        e.data(t, "_droppable").options.onDragOver.apply(t, [n, i])
                    }), e(t).bind("_drop", function (n, i) {
                        e.data(t, "_droppable").options.onDrop.apply(t, [n, i])
                    })
                }

                e.fn._droppable = function (n, i) {
                    return "string" == typeof n ? e.fn._droppable.methods[n](this, i) : (n = n || {}, this.each(function () {
                        var i = e.data(this, "_droppable");
                        i ? e.extend(i.options, n) : (t(this), e.data(this, "_droppable", {options: e.extend({}, e.fn._droppable.defaults, e.fn._droppable.parseOptions(this), n)}))
                    }))
                }, e.fn._droppable.methods = {
                    options: function (t) {
                        return e.data(t[0], "_droppable").options
                    }, enable: function (t) {
                        return t.each(function () {
                            e(this)._droppable({disabled: !1})
                        })
                    }, disable: function (t) {
                        return t.each(function () {
                            e(this)._droppable({disabled: !0})
                        })
                    }
                }, e.fn._droppable.parseOptions = function (t) {
                    var n = e(t);
                    return e.extend({}, e.parser.parseOptions(t, ["accept"]), {disabled: !!n.attr("disabled") || void 0})
                }, e.fn._droppable.defaults = {
                    accept: null, disabled: !1, onDragEnter: function (e, t) {
                    }, onDragOver: function (e, t) {
                    }, onDragLeave: function (e, t) {
                    }, onDrop: function (e, t) {
                    }
                }
            }(jQuery), function (e) {
                e.fn._resizable = function (t, n) {
                    function i(t) {
                        var n = t.data, i = e.data(n.target, "_resizable").options;
                        if (n.dir.indexOf("e") != -1) {
                            var o = n.startWidth + t.pageX - n.startX;
                            o = Math.min(Math.max(o, i.minWidth), i.maxWidth), n.width = o
                        }
                        if (n.dir.indexOf("s") != -1) {
                            var a = n.startHeight + t.pageY - n.startY;
                            a = Math.min(Math.max(a, i.minHeight), i.maxHeight), n.height = a
                        }
                        if (n.dir.indexOf("w") != -1) {
                            var o = n.startWidth - t.pageX + n.startX;
                            o = Math.min(Math.max(o, i.minWidth), i.maxWidth), n.width = o, n.left = n.startLeft + n.startWidth - n.width
                        }
                        if (n.dir.indexOf("n") != -1) {
                            var a = n.startHeight - t.pageY + n.startY;
                            a = Math.min(Math.max(a, i.minHeight), i.maxHeight), n.height = a, n.top = n.startTop + n.startHeight - n.height
                        }
                    }

                    function o(t) {
                        var n = t.data, i = e(n.target);
                        i.css({
                            left: n.left,
                            top: n.top
                        }), i.outerWidth() != n.width && i._outerWidth(n.width), i.outerHeight() != n.height && i._outerHeight(n.height)
                    }

                    function a(t) {
                        return e.fn._resizable.isResizing = !0, e.data(t.data.target, "_resizable").options.onStartResize.call(t.data.target, t), !1
                    }

                    function r(t) {
                        return i(t), 0 != e.data(t.data.target, "_resizable").options.onResize.call(t.data.target, t) && o(t), !1
                    }

                    function s(t) {
                        return e.fn._resizable.isResizing = !1, i(t, !0), o(t), e.data(t.data.target, "_resizable").options.onStopResize.call(t.data.target, t), e(document).unbind("._resizable"), e("body").css("cursor", ""), !1
                    }

                    return "string" == typeof t ? e.fn._resizable.methods[t](this, n) : this.each(function () {
                        function n(t) {
                            var n = e(t.data.target), o = "", a = n.offset(), r = n.outerWidth(), s = n.outerHeight(), l = i.edge;
                            t.pageY > a.top && t.pageY < a.top + l ? o += "n" : t.pageY < a.top + s && t.pageY > a.top + s - l && (o += "s"), t.pageX > a.left && t.pageX < a.left + l ? o += "w" : t.pageX < a.left + r && t.pageX > a.left + r - l && (o += "e");
                            for (var d = i.handles.split(","), c = 0; c < d.length; c++) {
                                var u = d[c].replace(/(^\s*)|(\s*$)/g, "");
                                if ("all" == u || u == o)return o
                            }
                            return ""
                        }

                        var i = null, o = e.data(this, "_resizable");
                        o ? (e(this).unbind("._resizable"), i = e.extend(o.options, t || {})) : (i = e.extend({}, e.fn._resizable.defaults, e.fn._resizable.parseOptions(this), t || {}), e.data(this, "_resizable", {options: i})), 1 != i.disabled && e(this).bind("mousemove._resizable", {target: this}, function (t) {
                            if (!e.fn._resizable.isResizing) {
                                var i = n(t);
                                "" == i ? e(t.data.target).css("cursor", "") : e(t.data.target).css("cursor", i + "-resize")
                            }
                        }).bind("mouseleave._resizable", {target: this}, function (t) {
                            e(t.data.target).css("cursor", "")
                        }).bind("mousedown._resizable", {target: this}, function (t) {
                            function i(n) {
                                var i = parseInt(e(t.data.target).css(n));
                                return isNaN(i) ? 0 : i
                            }

                            var o = n(t);
                            if ("" != o) {
                                var l = {
                                    target: t.data.target,
                                    dir: o,
                                    startLeft: i("left"),
                                    startTop: i("top"),
                                    left: i("left"),
                                    top: i("top"),
                                    startX: t.pageX,
                                    startY: t.pageY,
                                    startWidth: e(t.data.target).outerWidth(),
                                    startHeight: e(t.data.target).outerHeight(),
                                    width: e(t.data.target).outerWidth(),
                                    height: e(t.data.target).outerHeight(),
                                    deltaWidth: e(t.data.target).outerWidth() - e(t.data.target).width(),
                                    deltaHeight: e(t.data.target).outerHeight() - e(t.data.target).height()
                                };
                                e(document).bind("mousedown._resizable", l, a), e(document).bind("mousemove._resizable", l, r), e(document).bind("mouseup._resizable", l, s), e("body").css("cursor", o + "-resize")
                            }
                        })
                    })
                }, e.fn._resizable.methods = {
                    options: function (t) {
                        return e.data(t[0], "_resizable").options
                    }, enable: function (t) {
                        return t.each(function () {
                            e(this)._resizable({disabled: !1})
                        })
                    }, disable: function (t) {
                        return t.each(function () {
                            e(this)._resizable({disabled: !0})
                        })
                    }
                }, e.fn._resizable.parseOptions = function (t) {
                    var n = e(t);
                    return e.extend({}, e.parser.parseOptions(t, ["handles", {
                        minWidth: "number",
                        minHeight: "number",
                        maxWidth: "number",
                        maxHeight: "number",
                        edge: "number"
                    }]), {disabled: !!n.attr("disabled") || void 0})
                }, e.fn._resizable.defaults = {
                    disabled: !1,
                    handles: "n, e, s, w, ne, se, sw, nw, all",
                    minWidth: 10,
                    minHeight: 10,
                    maxWidth: 1e4,
                    maxHeight: 1e4,
                    edge: 5,
                    onStartResize: function (e) {
                    },
                    onResize: function (e) {
                    },
                    onStopResize: function (e) {
                    }
                }, e.fn._resizable.isResizing = !1
            }(jQuery), function (e) {
                function t(t, n) {
                    var i = e.data(t, "linkbutton").options;
                    if (n && e.extend(i, n), i.width || i.height || i.fit) {
                        var o = e(t), a = o.parent(), r = o.is(":visible");
                        if (!r) {
                            var s = e('<div style="display:none"></div>').insertBefore(t), l = {
                                position: o.css("position"),
                                display: o.css("display"),
                                left: o.css("left")
                            };
                            o.appendTo("body"), o.css({position: "absolute", display: "inline-block", left: -2e4})
                        }
                        o._size(i, a);
                        var d = o.find(".l-btn-left");
                        d.css("margin-top", 0), d.css("margin-top", parseInt((o.height() - d.height()) / 2) + "px"), r || (o.insertAfter(s), o.css(l), s.remove())
                    }
                }

                function n(t) {
                    var n = e.data(t, "linkbutton").options, a = e(t).empty();
                    a.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected l-btn-outline"), a.removeClass("l-btn-small l-btn-medium l-btn-large").addClass("l-btn-" + n.size), n.plain && a.addClass("l-btn-plain"), n.outline && a.addClass("l-btn-outline"), n.selected && a.addClass(n.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected"), a.attr("group", n.group || ""), a.attr("id", n.id || "");
                    var r = e('<span class="l-btn-left"></span>').appendTo(a);
                    n.text ? e('<span class="l-btn-text"></span>').html(n.text).appendTo(r) : e('<span class="l-btn-text l-btn-empty">&nbsp;</span>').appendTo(r), n.iconCls && (e('<span class="l-btn-icon">&nbsp;</span>').addClass(n.iconCls).appendTo(r), r.addClass("l-btn-icon-" + n.iconAlign)), a.unbind(".linkbutton").bind("focus.linkbutton", function () {
                        n.disabled || e(this).addClass("l-btn-focus")
                    }).bind("blur.linkbutton", function () {
                        e(this).removeClass("l-btn-focus")
                    }).bind("click.linkbutton", function () {
                        n.disabled || (n.toggle && (n.selected ? e(this).linkbutton("unselect") : e(this).linkbutton("select")), n.onClick.call(this))
                    }), i(t, n.selected), o(t, n.disabled)
                }

                function i(t, n) {
                    var i = e.data(t, "linkbutton").options;
                    n ? (i.group && e('a.l-btn[group="' + i.group + '"]').each(function () {
                        var t = e(this).linkbutton("options");
                        t.toggle && (e(this).removeClass("l-btn-selected l-btn-plain-selected"), t.selected = !1)
                    }), e(t).addClass(i.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected"), i.selected = !0) : i.group || (e(t).removeClass("l-btn-selected l-btn-plain-selected"), i.selected = !1)
                }

                function o(t, n) {
                    var i = e.data(t, "linkbutton"), o = i.options;
                    if (e(t).removeClass("l-btn-disabled l-btn-plain-disabled"), n) {
                        o.disabled = !0;
                        var a = e(t).attr("href");
                        a && (i.href = a, e(t).attr("href", "javascript:void(0)")), t.onclick && (i.onclick = t.onclick, t.onclick = null), o.plain ? e(t).addClass("l-btn-disabled l-btn-plain-disabled") : e(t).addClass("l-btn-disabled")
                    } else o.disabled = !1, i.href && e(t).attr("href", i.href), i.onclick && (t.onclick = i.onclick)
                }

                e.fn.linkbutton = function (i, o) {
                    return "string" == typeof i ? e.fn.linkbutton.methods[i](this, o) : (i = i || {}, this.each(function () {
                        var o = e.data(this, "linkbutton");
                        o ? e.extend(o.options, i) : (e.data(this, "linkbutton", {options: e.extend({}, e.fn.linkbutton.defaults, e.fn.linkbutton.parseOptions(this), i)}), e(this).removeAttr("disabled"), e(this).bind("_resize", function (n, i) {
                            return (e(this).hasClass("eui-fluid") || i) && t(this), !1
                        })), n(this), t(this)
                    }))
                }, e.fn.linkbutton.methods = {
                    options: function (t) {
                        return e.data(t[0], "linkbutton").options
                    }, resize: function (e, n) {
                        return e.each(function () {
                            t(this, n)
                        })
                    }, enable: function (e) {
                        return e.each(function () {
                            o(this, !1)
                        })
                    }, disable: function (e) {
                        return e.each(function () {
                            o(this, !0)
                        })
                    }, select: function (e) {
                        return e.each(function () {
                            i(this, !0)
                        })
                    }, unselect: function (e) {
                        return e.each(function () {
                            i(this, !1)
                        })
                    }
                }, e.fn.linkbutton.parseOptions = function (t) {
                    var n = e(t);
                    return e.extend({}, e.parser.parseOptions(t, ["id", "iconCls", "iconAlign", "group", "size", {
                        plain: "boolean",
                        toggle: "boolean",
                        selected: "boolean",
                        outline: "boolean"
                    }]), {
                        disabled: !!n.attr("disabled") || void 0,
                        text: e.trim(n.html()),
                        iconCls: n.attr("icon") || n.attr("iconCls")
                    })
                }, e.fn.linkbutton.defaults = {
                    id: null,
                    disabled: !1,
                    toggle: !1,
                    selected: !1,
                    outline: !1,
                    group: null,
                    plain: !1,
                    text: "",
                    iconCls: null,
                    iconAlign: "left",
                    size: "small",
                    onClick: function () {
                    }
                }
            }(jQuery), function (e) {
                function t(t) {
                    e(t).addClass("etooltip-f")
                }

                function n(t) {
                    var n = e.data(t, "etooltip").options;
                    e(t).unbind(".etooltip").bind(n.showEvent + ".etooltip", function (n) {
                        e(t).etooltip("show", n)
                    }).bind(n.hideEvent + ".etooltip", function (n) {
                        e(t).etooltip("hide", n)
                    }).bind("mousemove.etooltip", function (i) {
                        n.trackMouse && (n.trackMouseX = i.pageX, n.trackMouseY = i.pageY, e(t).etooltip("reposition"))
                    })
                }

                function i(t) {
                    var n = e.data(t, "etooltip");
                    n.showTimer && (clearTimeout(n.showTimer), n.showTimer = null), n.hideTimer && (clearTimeout(n.hideTimer), n.hideTimer = null)
                }

                function o(t) {
                    function n(n) {
                        o.position = n || "bottom", a.removeClass("etooltip-top etooltip-bottom etooltip-left etooltip-right").addClass("etooltip-" + o.position);
                        var i, r;
                        if (o.trackMouse)s = e(), i = o.trackMouseX + o.deltaX, r = o.trackMouseY + o.deltaY; else {
                            var s = e(t);
                            i = s.offset().left + o.deltaX, r = s.offset().top + o.deltaY
                        }
                        switch (o.position) {
                            case"right":
                                i += s._outerWidth() + 12 + (o.trackMouse ? 12 : 0), r -= (a._outerHeight() - s._outerHeight()) / 2;
                                break;
                            case"left":
                                i -= a._outerWidth() + 12 + (o.trackMouse ? 12 : 0), r -= (a._outerHeight() - s._outerHeight()) / 2;
                                break;
                            case"top":
                                i -= (a._outerWidth() - s._outerWidth()) / 2, r -= a._outerHeight() + 12 + (o.trackMouse ? 12 : 0);
                                break;
                            case"bottom":
                                i -= (a._outerWidth() - s._outerWidth()) / 2, r += s._outerHeight() + 12 + (o.trackMouse ? 12 : 0)
                        }
                        return {left: i, top: r}
                    }

                    var i = e.data(t, "etooltip");
                    if (i && i.tip) {
                        var o = i.options, a = i.tip, r = {left: -1e5, top: -1e5};
                        if (e(t).is(":visible"))if (r = n(o.position), "top" == o.position && r.top < 0 ? r = n("bottom") : "bottom" == o.position && r.top + a._outerHeight() > e(window)._outerHeight() + e(document).scrollTop() && (r = n("top")),
                            r.left < 0)"left" == o.position ? r = n("right") : (e(t).etooltip("arrow").css("left", a._outerWidth() / 2 + r.left), r.left = 0); else if (r.left + a._outerWidth() > e(window)._outerWidth() + e(document)._scrollLeft())if ("right" == o.position)r = n("left"); else {
                            var s = r.left;
                            r.left = e(window)._outerWidth() + e(document)._scrollLeft() - a._outerWidth(), e(t).etooltip("arrow").css("left", a._outerWidth() / 2 - (r.left - s))
                        }
                        a.css({
                            left: r.left,
                            top: r.top,
                            zIndex: void 0 != o.zIndex ? o.zIndex : e.fn.window ? e.fn.window.defaults.zIndex++ : ""
                        }), o.onPosition.call(t, r.left, r.top)
                    }
                }

                function a(t, n) {
                    var o = e.data(t, "etooltip"), a = o.options, r = o.tip;
                    r || (r = e('<div tabindex="-1" class="etooltip"><div class="etooltip-content"></div><div class="etooltip-arrow-outer"></div><div class="etooltip-arrow"></div></div>').appendTo("body"), o.tip = r, s(t)), i(t), o.showTimer = setTimeout(function () {
                        e(t).etooltip("reposition"), r.show(), a.onShow.call(t, n);
                        var i = r.children(".etooltip-arrow-outer"), o = r.children(".etooltip-arrow"), s = "border-" + a.position + "-color";
                        i.add(o).css({
                            borderTopColor: "",
                            borderBottomColor: "",
                            borderLeftColor: "",
                            borderRightColor: ""
                        }), i.css(s, r.css(s)), o.css(s, r.css("backgroundColor"))
                    }, a.showDelay)
                }

                function r(t, n) {
                    var o = e.data(t, "etooltip");
                    o && o.tip && (i(t), o.hideTimer = setTimeout(function () {
                        o.tip.hide(), o.options.onHide.call(t, n)
                    }, o.options.hideDelay))
                }

                function s(t, n) {
                    var i = e.data(t, "etooltip"), o = i.options;
                    if (n && (o.content = n), i.tip) {
                        var a = "function" == typeof o.content ? o.content.call(t) : o.content;
                        i.tip.children(".etooltip-content").html(a), o.onUpdate.call(t, a)
                    }
                }

                function l(t) {
                    var n = e.data(t, "etooltip");
                    if (n) {
                        i(t);
                        var o = n.options;
                        n.tip && n.tip.remove(), o._title && e(t).attr("title", o._title), e.removeData(t, "etooltip"), e(t).unbind(".etooltip").removeClass("etooltip-f"), o.onDestroy.call(t)
                    }
                }

                e.fn.etooltip = function (i, o) {
                    return "string" == typeof i ? e.fn.etooltip.methods[i](this, o) : (i = i || {}, this.each(function () {
                        var o = e.data(this, "etooltip");
                        o ? e.extend(o.options, i) : (e.data(this, "etooltip", {options: e.extend({}, e.fn.etooltip.defaults, e.fn.etooltip.parseOptions(this), i)}), t(this)), n(this), s(this)
                    }))
                }, e.fn.etooltip.methods = {
                    options: function (t) {
                        return e.data(t[0], "etooltip").options
                    }, tip: function (t) {
                        return e.data(t[0], "etooltip").tip
                    }, arrow: function (e) {
                        return e.etooltip("tip").children(".etooltip-arrow-outer,.etooltip-arrow")
                    }, show: function (e, t) {
                        return e.each(function () {
                            a(this, t)
                        })
                    }, hide: function (e, t) {
                        return e.each(function () {
                            r(this, t)
                        })
                    }, update: function (e, t) {
                        return e.each(function () {
                            s(this, t)
                        })
                    }, reposition: function (e) {
                        return e.each(function () {
                            o(this)
                        })
                    }, destroy: function (e) {
                        return e.each(function () {
                            l(this)
                        })
                    }
                }, e.fn.etooltip.parseOptions = function (t) {
                    var n = e(t), i = e.extend({}, e.parser.parseOptions(t, ["position", "showEvent", "hideEvent", "content", {
                        trackMouse: "boolean",
                        deltaX: "number",
                        deltaY: "number",
                        showDelay: "number",
                        hideDelay: "number"
                    }]), {_title: n.attr("title")});
                    return n.attr("title", ""), i.content || (i.content = i._title), i
                }, e.fn.etooltip.defaults = {
                    position: "bottom",
                    content: null,
                    trackMouse: !1,
                    deltaX: 0,
                    deltaY: 0,
                    showEvent: "mouseenter",
                    hideEvent: "mouseleave",
                    showDelay: 200,
                    hideDelay: 100,
                    onShow: function (e) {
                    },
                    onHide: function (e) {
                    },
                    onUpdate: function (e) {
                    },
                    onPosition: function (e, t) {
                    },
                    onDestroy: function () {
                    }
                }
            }(jQuery), function ($) {
                function _20b(e) {
                    e._remove()
                }

                function _20c(e, t) {
                    var n = $.data(e, "epanel"), i = n.options, o = n.epanel, a = o.children(".epanel-header"), r = o.children(".epanel-body"), s = o.children(".epanel-footer");
                    if (t && $.extend(i, {
                            width: t.width,
                            height: t.height,
                            minWidth: t.minWidth,
                            maxWidth: t.maxWidth,
                            minHeight: t.minHeight,
                            maxHeight: t.maxHeight,
                            left: t.left,
                            top: t.top
                        }), o._size(i), a.add(r)._outerWidth(o.width()), isNaN(parseInt(i.height))) {
                        r.css("height", "");
                        var l = $.parser.parseValue("minHeight", i.minHeight, o.parent()), d = $.parser.parseValue("maxHeight", i.maxHeight, o.parent()), c = a._outerHeight() + s._outerHeight() + o._outerHeight() - o.height();
                        r._size("minHeight", l ? l - c : ""), r._size("maxHeight", d ? d - c : "")
                    } else r._outerHeight(o.height() - a._outerHeight() - s._outerHeight());
                    o.css({
                        height: "",
                        minHeight: "",
                        maxHeight: "",
                        left: i.left,
                        top: i.top
                    }), i.onResize.apply(e, [i.width, i.height]), $(e).epanel("doLayout")
                }

                function _215(e, t) {
                    var n = $.data(e, "epanel").options, i = $.data(e, "epanel").epanel;
                    t && (null != t.left && (n.left = t.left), null != t.top && (n.top = t.top)), i.css({
                        left: n.left,
                        top: n.top
                    }), n.onMove.apply(e, [n.left, n.top])
                }

                function _219(e) {
                    $(e).addClass("epanel-body")._size("clear");
                    var t = $('<div class="epanel"></div>').insertBefore(e);
                    return t[0].appendChild(e), t.bind("_resize", function (t, n) {
                        return ($(this).hasClass("eui-fluid") || n) && _20c(e), !1
                    }), t
                }

                function _21d(_21e) {
                    function _221() {
                        if (opts.noheader || !opts.title && !opts.header)_20b(_220.children(".epanel-header")), _220.children(".epanel-body").addClass("epanel-body-noheader"); else {
                            if (opts.header)$(opts.header).addClass("epanel-header").prependTo(_220); else {
                                var _225 = _220.children(".epanel-header");
                                _225.length || (_225 = $('<div class="epanel-header"></div>').prependTo(_220)), $.isArray(opts.tools) || _225.find("div.epanel-tool .epanel-tool-a").appendTo(opts.tools), _225.empty();
                                var _226 = $('<div class="epanel-title"></div>').html(opts.title).appendTo(_225);
                                opts.iconCls && (_226.addClass("epanel-with-icon"), $('<div class="epanel-icon"></div>').addClass(opts.iconCls).appendTo(_225));
                                var tool = $('<div class="epanel-tool"></div>').appendTo(_225);
                                tool.bind("click", function (e) {
                                    e.stopPropagation()
                                }), opts.tools && ($.isArray(opts.tools) ? $.map(opts.tools, function (t) {
                                    _227(tool, t.iconCls, eval(t.handler))
                                }) : $(opts.tools).children().each(function () {
                                    $(this).addClass($(this).attr("iconCls")).addClass("epanel-tool-a").appendTo(tool)
                                })), opts.collapsible && _227(tool, "epanel-tool-collapse", function () {
                                    1 == opts.collapsed ? _245(_21e, !0) : _238(_21e, !0)
                                }), opts.minimizable && _227(tool, "epanel-tool-min", function () {
                                    _24b(_21e)
                                }), opts.maximizable && _227(tool, "epanel-tool-max", function () {
                                    1 == opts.maximized ? _24e(_21e) : _237(_21e)
                                }), opts.closable && _227(tool, "epanel-tool-close", function () {
                                    _239(_21e)
                                })
                            }
                            _220.children("div.epanel-body").removeClass("epanel-body-noheader")
                        }
                    }

                    function _227(e, t, n) {
                        var i = $('<a href="javascript:void(0)"></a>').addClass(t).appendTo(e);
                        i.bind("click", n)
                    }

                    function _222() {
                        opts.footer ? ($(opts.footer).addClass("epanel-footer").appendTo(_220), $(_21e).addClass("epanel-body-nobottom")) : (_220.children(".epanel-footer").remove(), $(_21e).removeClass("epanel-body-nobottom"))
                    }

                    var _21f = $.data(_21e, "epanel"), opts = _21f.options, _220 = _21f.epanel;
                    _220.css(opts.style), _220.addClass(opts.cls), _221(), _222();
                    var _223 = $(_21e).epanel("header"), body = $(_21e).epanel("body"), _224 = $(_21e).siblings(".epanel-footer");
                    opts.border ? (_223.removeClass("epanel-header-noborder"), body.removeClass("epanel-body-noborder"), _224.removeClass("epanel-footer-noborder")) : (_223.addClass("epanel-header-noborder"), body.addClass("epanel-body-noborder"), _224.addClass("epanel-footer-noborder")), _223.addClass(opts.headerCls), body.addClass(opts.bodyCls), $(_21e).attr("id", opts.id || ""), opts.content && ($(_21e).epanel("clear"), $(_21e).html(opts.content), $.parser.parse($(_21e)))
                }

                function _229(e, t) {
                    var n = $.data(e, "epanel"), i = n.options;
                    if (o && (i.queryParams = t), i.href && (!n.isLoaded || !i.cache)) {
                        var o = $.extend({}, i.queryParams);
                        if (0 == i.onBeforeLoad.call(e, o))return;
                        n.isLoaded = !1, $(e).epanel("clear"), i.loadingMessage && $(e).html($('<div class="epanel-loading"></div>').html(i.loadingMessage)), i.loader.call(e, o, function (t) {
                            var o = i.extractor.call(e, t);
                            $(e).html(o), $.parser.parse($(e)), i.onLoad.apply(e, arguments), n.isLoaded = !0
                        }, function () {
                            i.onLoadError.apply(e, arguments)
                        })
                    }
                }

                function _22f(e) {
                    var t = $(e);
                    t.find(".combo-f").each(function () {
                        $(this).combo("destroy")
                    }), t.find(".m-btn").each(function () {
                        $(this).menubutton("destroy")
                    }), t.find(".s-btn").each(function () {
                        $(this).splitbutton("destroy")
                    }), t.find(".etooltip-f").each(function () {
                        $(this).etooltip("destroy")
                    }), t.children("div").each(function () {
                        $(this)._size("unfit")
                    }), t.empty()
                }

                function _231(e) {
                    $(e).epanel("doLayout", !0)
                }

                function _233(e, t) {
                    function n() {
                        i.closed = !1, i.minimized = !1;
                        var t = o.children(".epanel-header").find("a.epanel-tool-restore");
                        t.length && (i.maximized = !0), i.onOpen.call(e), 1 == i.maximized && (i.maximized = !1, _237(e)), 1 == i.collapsed && (i.collapsed = !1, _238(e)), i.collapsed || (_229(e), _231(e))
                    }

                    var i = $.data(e, "epanel").options, o = $.data(e, "epanel").epanel;
                    if (1 == t || 0 != i.onBeforeOpen.call(e))if (o.stop(!0, !0), $.isFunction(i.openAnimation))i.openAnimation.call(e, n); else switch (i.openAnimation) {
                        case"slide":
                            o.slideDown(i.openDuration, n);
                            break;
                        case"fade":
                            o.fadeIn(i.openDuration, n);
                            break;
                        case"show":
                            o.show(i.openDuration, n);
                            break;
                        default:
                            o.show(), n()
                    }
                }

                function _239(e, t) {
                    function n() {
                        i.closed = !0, i.onClose.call(e)
                    }

                    var i = $.data(e, "epanel").options, o = $.data(e, "epanel").epanel;
                    if (1 == t || 0 != i.onBeforeClose.call(e))if (o.stop(!0, !0), o._size("unfit"), $.isFunction(i.closeAnimation))i.closeAnimation.call(e, n); else switch (i.closeAnimation) {
                        case"slide":
                            o.slideUp(i.closeDuration, n);
                            break;
                        case"fade":
                            o.fadeOut(i.closeDuration, n);
                            break;
                        case"hide":
                            o.hide(i.closeDuration, n);
                            break;
                        default:
                            o.hide(), o.children(".epanel-body")[0].hasAttribute("dynamic") ? o.next(".window-shadow").next(".window-mask").remove() && o.next(".window-shadow").remove() && o.remove() : o.removeClass("animated"), top.hideMask(), n()
                    }
                }

                function _23d(e, t) {
                    var n = $.data(e, "epanel"), i = n.options, o = n.epanel;
                    1 != t && 0 == i.onBeforeDestroy.call(e) || ($(e).epanel("clear").epanel("clear", "footer"), _20b(o), i.onDestroy.call(e))
                }

                function _238(e, t) {
                    var n = $.data(e, "epanel").options, i = $.data(e, "epanel").epanel, o = i.children(".epanel-body"), a = i.children(".epanel-header").find("a.epanel-tool-collapse");
                    1 != n.collapsed && (o.stop(!0, !0), 0 != n.onBeforeCollapse.call(e) && (a.addClass("epanel-tool-expand"), 1 == t ? o.slideUp("normal", function () {
                        n.collapsed = !0, n.onCollapse.call(e)
                    }) : (o.hide(), n.collapsed = !0, n.onCollapse.call(e))))
                }

                function _245(e, t) {
                    var n = $.data(e, "epanel").options, i = $.data(e, "epanel").epanel, o = i.children(".epanel-body"), a = i.children(".epanel-header").find("a.epanel-tool-collapse");
                    0 != n.collapsed && (o.stop(!0, !0), 0 != n.onBeforeExpand.call(e) && (a.removeClass("epanel-tool-expand"), 1 == t ? o.slideDown("normal", function () {
                        n.collapsed = !1, n.onExpand.call(e), _229(e), _231(e)
                    }) : (o.show(), n.collapsed = !1, n.onExpand.call(e), _229(e), _231(e))))
                }

                function _237(e) {
                    var t = $.data(e, "epanel").options, n = $.data(e, "epanel").epanel, i = n.children(".epanel-header").find("a.epanel-tool-max");
                    1 != t.maximized && (i.addClass("epanel-tool-restore"), $.data(e, "epanel").original || ($.data(e, "epanel").original = {
                        width: t.width,
                        height: t.height,
                        left: t.left,
                        top: t.top,
                        fit: t.fit
                    }), t.left = 0, t.top = 0, t.fit = !0, _20c(e), t.minimized = !1, t.maximized = !0, t.onMaximize.call(e))
                }

                function _24b(e) {
                    var t = $.data(e, "epanel").options, n = $.data(e, "epanel").epanel;
                    n._size("unfit"), n.hide(), t.minimized = !0, t.maximized = !1, t.onMinimize.call(e)
                }

                function _24e(e) {
                    var t = $.data(e, "epanel").options, n = $.data(e, "epanel").epanel, i = n.children(".epanel-header").find("a.epanel-tool-max");
                    0 != t.maximized && (n.show(), i.removeClass("epanel-tool-restore"), $.extend(t, $.data(e, "epanel").original), _20c(e), t.minimized = !1, t.maximized = !1, $.data(e, "epanel").original = null, t.onRestore.call(e))
                }

                function _251(e, t) {
                    $.data(e, "epanel").options.title = t, $(e).epanel("header").find("div.epanel-title").html(t)
                }

                $.fn._remove = function () {
                    return this.each(function () {
                        $(this).remove();
                        try {
                            this.outerHTML = ""
                        } catch (e) {
                        }
                    })
                };
                var _254 = null;
                $(window).unbind(".epanel").bind("resize.epanel", function () {
                    _254 && clearTimeout(_254), _254 = setTimeout(function () {
                        var e = $("body.layout");
                        e.length ? (e.layout("resize"), $("body").children(".eui-fluid:visible").each(function () {
                            $(this).triggerHandler("_resize")
                        })) : $("body").epanel("doLayout"), _254 = null
                    }, 100)
                }), $.fn.epanel = function (e, t) {
                    return "string" == typeof e ? $.fn.epanel.methods[e](this, t) : (e = e || {}, this.each(function () {
                        var t, n = $.data(this, "epanel");
                        n ? (t = $.extend(n.options, e), n.isLoaded = !1) : (t = $.extend({}, $.fn.epanel.defaults, $.fn.epanel.parseOptions(this), e), $(this).attr("title", ""), n = $.data(this, "epanel", {
                            options: t,
                            epanel: _219(this),
                            isLoaded: !1
                        })), _21d(this), 1 == t.doSize && (n.epanel.css("display", "block"), _20c(this)), 1 == t.closed || 1 == t.minimized ? n.epanel.hide() : _233(this)
                    }))
                }, $.fn.epanel.methods = {
                    options: function (e) {
                        return $.data(e[0], "epanel").options
                    }, epanel: function (e) {
                        return $.data(e[0], "epanel").epanel
                    }, header: function (e) {
                        return $.data(e[0], "epanel").epanel.children(".epanel-header")
                    }, footer: function (e) {
                        return e.epanel("epanel").children(".epanel-footer")
                    }, body: function (e) {
                        return $.data(e[0], "epanel").epanel.children(".epanel-body")
                    }, setTitle: function (e, t) {
                        return e.each(function () {
                            _251(this, t)
                        })
                    }, open: function (e, t) {
                        return e.each(function () {
                            _233(this, t)
                        })
                    }, close: function (e, t) {
                        return e.each(function () {
                            _239(this, t)
                        })
                    }, destroy: function (e, t) {
                        return e.each(function () {
                            _23d(this, t)
                        })
                    }, clear: function (e, t) {
                        return e.each(function () {
                            _22f("footer" == t ? $(this).epanel("footer") : this)
                        })
                    }, refresh: function (e, t) {
                        return e.each(function () {
                            var e = $.data(this, "epanel");
                            e.isLoaded = !1, t && ("string" == typeof t ? e.options.href = t : e.options.queryParams = t), _229(this)
                        })
                    }, resize: function (e, t) {
                        return e.each(function () {
                            _20c(this, t)
                        })
                    }, doLayout: function (e, t) {
                        return e.each(function () {
                            function e(e, n) {
                                if (e) {
                                    var i = e == $("body")[0], o = $(e).find("div.epanel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.eui-fluid:visible").filter(function (t, o) {
                                        var a = $(o).parents(".epanel-" + n + ":first");
                                        return i ? 0 == a.length : a[0] == e
                                    });
                                    o.each(function () {
                                        $(this).triggerHandler("_resize", [t || !1])
                                    })
                                }
                            }

                            e(this, "body"), e($(this).siblings(".epanel-footer")[0], "footer")
                        })
                    }, move: function (e, t) {
                        return e.each(function () {
                            _215(this, t)
                        })
                    }, maximize: function (e) {
                        return e.each(function () {
                            _237(this)
                        })
                    }, minimize: function (e) {
                        return e.each(function () {
                            _24b(this)
                        })
                    }, restore: function (e) {
                        return e.each(function () {
                            _24e(this)
                        })
                    }, collapse: function (e, t) {
                        return e.each(function () {
                            _238(this, t)
                        })
                    }, expand: function (e, t) {
                        return e.each(function () {
                            _245(this, t)
                        })
                    }
                }, $.fn.epanel.parseOptions = function (e) {
                    var t = $(e), n = t.children(".epanel-header,header"), i = t.children(".epanel-footer,footer");
                    return $.extend({}, $.parser.parseOptions(e, ["id", "width", "height", "left", "top", "title", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href", "method", "header", "footer", {
                        cache: "boolean",
                        fit: "boolean",
                        border: "boolean",
                        noheader: "boolean"
                    }, {collapsible: "boolean", minimizable: "boolean", maximizable: "boolean"}, {
                        closable: "boolean",
                        collapsed: "boolean",
                        minimized: "boolean",
                        maximized: "boolean",
                        closed: "boolean"
                    }, "openAnimation", "closeAnimation", {
                        openDuration: "number",
                        closeDuration: "number"
                    }]), {
                        loadingMessage: void 0 != t.attr("loadingMessage") ? t.attr("loadingMessage") : void 0,
                        header: n.length ? n.removeClass("epanel-header") : void 0,
                        footer: i.length ? i.removeClass("epanel-footer") : void 0
                    })
                }, $.fn.epanel.defaults = {
                    id: null,
                    title: null,
                    iconCls: null,
                    width: "auto",
                    height: "auto",
                    left: null,
                    top: null,
                    cls: null,
                    headerCls: null,
                    bodyCls: null,
                    style: {},
                    href: null,
                    cache: !0,
                    fit: !1,
                    border: !0,
                    doSize: !0,
                    noheader: !1,
                    content: null,
                    collapsible: !1,
                    minimizable: !1,
                    maximizable: !1,
                    closable: !1,
                    collapsed: !1,
                    minimized: !1,
                    maximized: !1,
                    closed: !1,
                    openAnimation: !1,
                    openDuration: 400,
                    closeAnimation: !1,
                    closeDuration: 400,
                    tools: null,
                    footer: null,
                    header: null,
                    queryParams: {},
                    method: "get",
                    href: null,
                    loadingMessage: "Loading...",
                    loader: function (e, t, n) {
                        var i = $(this).epanel("options");
                        return !!i.href && void $.ajax({
                                type: i.method,
                                url: i.href,
                                cache: !1,
                                data: e,
                                dataType: "html",
                                success: function (e) {
                                    t(e)
                                },
                                error: function () {
                                    n.apply(this, arguments)
                                }
                            })
                    },
                    extractor: function (e) {
                        var t = /<body[^>]*>((.|[\n\r])*)<\/body>/im, n = t.exec(e);
                        return n ? n[1] : e
                    },
                    onBeforeLoad: function (e) {
                    },
                    onLoad: function () {
                    },
                    onLoadError: function () {
                    },
                    onBeforeOpen: function () {
                    },
                    onOpen: function () {
                    },
                    onBeforeClose: function () {
                    },
                    onClose: function () {
                    },
                    onBeforeDestroy: function () {
                    },
                    onDestroy: function () {
                    },
                    onResize: function (e, t) {
                    },
                    onMove: function (e, t) {
                    },
                    onMaximize: function () {
                    },
                    onRestore: function () {
                    },
                    onMinimize: function () {
                    },
                    onBeforeCollapse: function () {
                    },
                    onBeforeExpand: function () {
                    },
                    onCollapse: function () {
                    },
                    onExpand: function () {
                    }
                }
            }(jQuery), function (e) {
                function t(t, n) {
                    var i = e.data(t, "window");
                    n && (null != n.left && (i.options.left = n.left), null != n.top && (i.options.top = n.top)), e(t).epanel("move", i.options), i.shadow && i.shadow.css({
                        left: i.options.left,
                        top: i.options.top
                    })
                }

                function n(n, i) {
                    var o = e.data(n, "window").options, a = e(n).window("epanel"), r = a._outerWidth();
                    if (o.inline) {
                        var s = a.parent();
                        o.left = Math.ceil((s.width() - r) / 2 + s.scrollLeft())
                    } else o.left = Math.ceil((e(window)._outerWidth() - r) / 2 + e(document).scrollLeft());
                    i && t(n)
                }

                function i(n, i) {
                    var o = e.data(n, "window").options, a = e(n).window("epanel"), r = a._outerHeight();
                    if (o.inline) {
                        var s = a.parent();
                        o.top = Math.ceil((s.height() - r) / 2 + s.scrollTop())
                    } else o.top = Math.ceil((e(window)._outerHeight() - r) / 2 + e(document).scrollTop());
                    i && t(n)
                }

                function o(o) {
                    var a = e.data(o, "window"), s = a.options, l = e(o).epanel(e.extend({}, a.options, {
                        border: !1,
                        doSize: !0,
                        closed: !0,
                        cls: "window",
                        headerCls: "window-header",
                        bodyCls: "window-body " + (s.noheader ? "window-body-noheader" : ""),
                        onBeforeDestroy: function () {
                            return 0 != s.onBeforeDestroy.call(o) && (a.shadow && a.shadow.remove(), void(a.mask && a.mask.remove()))
                        },
                        onClose: function () {
                            a.shadow && a.shadow.hide(), a.mask && a.mask.hide(), s.onClose.call(o)
                        },
                        onOpen: function () {
                            a.mask && a.mask.css({
                                display: "block",
                                zIndex: e.fn.window.defaults.zIndex++
                            }), a.shadow && a.shadow.css({
                                display: "block",
                                zIndex: e.fn.window.defaults.zIndex++,
                                left: s.left,
                                top: s.top,
                                width: a.window._outerWidth(),
                                height: a.window._outerHeight()
                            }), a.window.css("z-index", e.fn.window.defaults.zIndex++), s.onOpen.call(o)
                        },
                        onResize: function (t, n) {
                            var i = e(this).epanel("options");
                            e.extend(s, {
                                width: i.width,
                                height: i.height,
                                left: i.left,
                                top: i.top
                            }), a.shadow && a.shadow.css({
                                left: s.left,
                                top: s.top,
                                width: a.window._outerWidth(),
                                height: a.window._outerHeight()
                            }), s.onResize.call(o, t, n)
                        },
                        onMinimize: function () {
                            a.shadow && a.shadow.hide(), a.mask && a.mask.hide(), a.options.onMinimize.call(o)
                        },
                        onBeforeCollapse: function () {
                            return 0 != s.onBeforeCollapse.call(o) && void(a.shadow && a.shadow.hide())
                        },
                        onExpand: function () {
                            a.shadow && a.shadow.show(), s.onExpand.call(o)
                        }
                    }));
                    a.window = l.epanel("epanel"), a.mask && a.mask.remove(), 1 == s.modal && (a.mask = e('<div class="window-mask"></div>').insertAfter(a.window), a.mask.css({
                        width: s.inline ? a.mask.parent().width() : r().width,
                        height: s.inline ? a.mask.parent().height() : r().height,
                        display: "none"
                    })), a.shadow && a.shadow.remove(), 1 == s.shadow && (a.shadow = e('<div class="window-shadow"></div>').insertAfter(a.window), a.shadow.css({display: "none"})), null == s.left && n(o), null == s.top && i(o), t(o), s.closed || l.window("open")
                }

                function a(t) {
                    var n = e.data(t, "window");
                    n.window._draggable({
                        handle: ">div.epanel-header>div.epanel-title",
                        disabled: 0 == n.options._draggable,
                        onStartDrag: function (t) {
                            n.mask && n.mask.css("z-index", e.fn.window.defaults.zIndex++), n.shadow && n.shadow.css("z-index", e.fn.window.defaults.zIndex++), n.window.css("z-index", e.fn.window.defaults.zIndex++), n.proxy || (n.proxy = e('<div class="window-proxy"></div>').insertAfter(n.window)), n.proxy.css({
                                display: "none",
                                zIndex: e.fn.window.defaults.zIndex++,
                                left: t.data.left,
                                top: t.data.top
                            }), n.proxy._outerWidth(n.window._outerWidth()), n.proxy._outerHeight(n.window._outerHeight()), setTimeout(function () {
                                n.proxy && n.proxy.show()
                            }, 500)
                        },
                        onDrag: function (e) {
                            return n.proxy.css({display: "block", left: e.data.left, top: e.data.top}), !1
                        },
                        onStopDrag: function (i) {
                            n.options.left = i.data.left, n.options.top = i.data.top, e(t).window("move"), n.proxy.remove(), n.proxy = null
                        }
                    }), n.window._resizable({
                        disabled: 0 == n.options._resizable, onStartResize: function (t) {
                            n.pmask && n.pmask.remove(), n.pmask = e('<div class="window-proxy-mask"></div>').insertAfter(n.window), n.pmask.css({
                                zIndex: e.fn.window.defaults.zIndex++,
                                left: t.data.left,
                                top: t.data.top,
                                width: n.window._outerWidth(),
                                height: n.window._outerHeight()
                            }), n.proxy && n.proxy.remove(), n.proxy = e('<div class="window-proxy"></div>').insertAfter(n.window), n.proxy.css({
                                zIndex: e.fn.window.defaults.zIndex++,
                                left: t.data.left,
                                top: t.data.top
                            }), n.proxy._outerWidth(t.data.width)._outerHeight(t.data.height)
                        }, onResize: function (e) {
                            return n.proxy.css({
                                left: e.data.left,
                                top: e.data.top
                            }), n.proxy._outerWidth(e.data.width), n.proxy._outerHeight(e.data.height), !1
                        }, onStopResize: function (i) {
                            e(t).window("resize", i.data), n.pmask.remove(), n.pmask = null, n.proxy.remove(), n.proxy = null
                        }
                    })
                }

                function r() {
                    return "BackCompat" == document.compatMode ? {
                        width: Math.max(document.body.scrollWidth, document.body.clientWidth),
                        height: Math.max(document.body.scrollHeight, document.body.clientHeight)
                    } : {
                        width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
                        height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
                    }
                }

                e(window).resize(function () {
                    e("body>div.window-mask").css({
                        width: e(window)._outerWidth(),
                        height: e(window)._outerHeight()
                    }), setTimeout(function () {
                        e("body>div.window-mask").css({width: r().width, height: r().height})
                    }, 50)
                }), e.fn.window = function (t, n) {
                    if ("string" == typeof t) {
                        var i = e.fn.window.methods[t];
                        return i ? i(this, n) : this.epanel(t, n)
                    }
                    return t = t || {}, this.each(function () {
                        var n = e.data(this, "window");
                        n ? e.extend(n.options, t) : (n = e.data(this, "window", {options: e.extend({}, e.fn.window.defaults, e.fn.window.parseOptions(this), t)}), n.options.inline || document.body.appendChild(this)), o(this), a(this)
                    })
                }, e.fn.window.methods = {
                    options: function (t) {
                        var n = t.epanel("options"), i = e.data(t[0], "window").options;
                        return e.extend(i, {
                            closed: n.closed,
                            collapsed: n.collapsed,
                            minimized: n.minimized,
                            maximized: n.maximized
                        })
                    }, window: function (t) {
                        return e.data(t[0], "window").window
                    }, move: function (e, n) {
                        return e.each(function () {
                            t(this, n)
                        })
                    }, hcenter: function (e) {
                        return e.each(function () {
                            n(this, !0)
                        })
                    }, vcenter: function (e) {
                        return e.each(function () {
                            i(this, !0)
                        })
                    }, center: function (e) {
                        return e.each(function () {
                            n(this), i(this), t(this)
                        })
                    }
                }, e.fn.window.parseOptions = function (t) {
                    return e.extend({}, e.fn.epanel.parseOptions(t), e.parser.parseOptions(t, [{
                        _draggable: "boolean",
                        _resizable: "boolean",
                        shadow: "boolean",
                        modal: "boolean",
                        inline: "boolean"
                    }]))
                }, e.fn.window.defaults = e.extend({}, e.fn.epanel.defaults, {
                    zIndex: 9e3,
                    _draggable: !0,
                    _resizable: !0,
                    shadow: !0,
                    modal: !1,
                    inline: !1,
                    title: "  ",
                    collapsible: !0,
                    minimizable: !0,
                    maximizable: !0,
                    closable: !0,
                    closed: !1
                })
            }(jQuery), function ($) {
                function _28f(_290) {
                    var opts = $.data(_290, "dialog").options;
                    opts.inited = !1, $(_290).window($.extend({}, opts, {
                        onResize: function (e, t) {
                            opts.inited && (_295(this), opts.onResize.call(this, e, t))
                        }
                    }));
                    var win = $(_290).window("window");
                    if (opts.toolbar)if ($.isArray(opts.toolbar)) {
                        $(_290).siblings("div.dialog-toolbar").remove();
                        for (var _291 = $('<div class="dialog-toolbar"><table cellspacing="0" cellpadding="0"><tr></tr></table></div>').appendTo(win), tr = _291.find("tr"), i = 0; i < opts.toolbar.length; i++) {
                            var btn = opts.toolbar[i];
                            if ("-" == btn)$('<td><div class="dialog-tool-separator"></div></td>').appendTo(tr); else {
                                var td = $("<td></td>").appendTo(tr), tool = $('<a href="javascript:void(0)"></a>').appendTo(td);
                                tool[0].onclick = eval(btn.handler || function () {
                                    }), tool.linkbutton($.extend({}, btn, {plain: !0}))
                            }
                        }
                    } else $(opts.toolbar).addClass("dialog-toolbar").appendTo(win), $(opts.toolbar).show(); else $(_290).siblings("div.dialog-toolbar").remove();
                    if (opts.buttons)if ($.isArray(opts.buttons)) {
                        $(_290).siblings("div.dialog-button").remove();
                        for (var _292 = $('<div class="dialog-button"></div>').appendTo(win), i = 0; i < opts.buttons.length; i++) {
                            var p = opts.buttons[i], _293 = $('<a href="javascript:void(0)"></a>').appendTo(_292);
                            p.handler && (_293[0].onclick = p.handler), _293.linkbutton(p)
                        }
                    } else $(opts.buttons).addClass("dialog-button").appendTo(win), $(opts.buttons).show(); else $(_290).siblings("div.dialog-button").remove();
                    opts.inited = !0;
                    var _294 = opts.closed;
                    win.show(), $(_290).window("resize"), _294 && win.hide()
                }

                function _295(e, t) {
                    var n = $(e), i = n.dialog("options"), o = i.noheader, a = n.siblings(".dialog-toolbar"), r = n.siblings(".dialog-button");
                    a.insertBefore(e).css({
                        position: "relative",
                        borderTopWidth: o ? 1 : 0,
                        top: o ? a.length : 0
                    }), r.insertAfter(e).css({
                        position: "relative",
                        top: -1
                    }), a.add(r)._outerWidth(n._outerWidth()).find(".eui-fluid:visible").each(function () {
                        $(this).triggerHandler("_resize")
                    }), isNaN(parseInt(i.height)) || n._outerHeight(n._outerHeight() - a._outerHeight() - r._outerHeight());
                    var s = $.data(e, "window").shadow;
                    if (s) {
                        var l = n.epanel("epanel");
                        s.css({width: l._outerWidth(), height: l._outerHeight()})
                    }
                }

                $.fn.dialog = function (e, t) {
                    if ("string" == typeof e) {
                        var n = $.fn.dialog.methods[e];
                        return n ? n(this, t) : this.window(e, t)
                    }
                    return e = e || {}, this.each(function () {
                        var t = $.data(this, "dialog");
                        t ? $.extend(t.options, e) : $.data(this, "dialog", {options: $.extend({}, $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), e)}), _28f(this)
                    })
                }, $.fn.dialog.methods = {
                    options: function (e) {
                        var t = $.data(e[0], "dialog").options, n = e.epanel("options");
                        return $.extend(t, {
                            width: n.width,
                            height: n.height,
                            left: n.left,
                            top: n.top,
                            closed: n.closed,
                            collapsed: n.collapsed,
                            minimized: n.minimized,
                            maximized: n.maximized
                        }), t
                    }, dialog: function (e) {
                        return e.window("window")
                    }
                }, $.fn.dialog.parseOptions = function (e) {
                    var t = $(e);
                    return $.extend({}, $.fn.window.parseOptions(e), $.parser.parseOptions(e, ["toolbar", "buttons"]), {
                        toolbar: t.children(".dialog-toolbar").length ? t.children(".dialog-toolbar").removeClass("dialog-toolbar") : void 0,
                        buttons: t.children(".dialog-button").length ? t.children(".dialog-button").removeClass("dialog-button") : void 0
                    })
                }, $.fn.dialog.defaults = $.extend({}, $.fn.window.defaults, {
                    title: "New Dialog",
                    collapsible: !1,
                    minimizable: !1,
                    maximizable: !1,
                    _resizable: !1,
                    toolbar: null,
                    buttons: null
                })
            }(jQuery), function (e) {
                function t() {
                    e(document).unbind(".messager").bind("keydown.messager", function (t) {
                        if (27 == t.keyCode)e("body").children("div.messager-window").children("div.messager-body").each(function () {
                            e(this).window("close")
                        }); else if (9 == t.keyCode) {
                            var n = e("body").children("div.messager-window").children("div.messager-body");
                            if (!n.length)return;
                            for (var i = n.find(".messager-input,.messager-button .l-btn"), o = 0; o < i.length; o++)if (e(i[o]).is(":focus"))return e(i[o >= i.length - 1 ? 0 : o + 1]).focus(), !1
                        }
                    })
                }

                function n() {
                    e(document).unbind(".messager")
                }

                function i(t) {
                    var n = e.extend({}, e.messager.defaults, {
                        modal: !1,
                        shadow: !1,
                        _draggable: !1,
                        _resizable: !1,
                        closed: !0,
                        style: {
                            left: "",
                            top: "",
                            right: 0,
                            zIndex: e.fn.window.defaults.zIndex++,
                            bottom: -document.body.scrollTop - document.documentElement.scrollTop
                        },
                        title: "",
                        width: 250,
                        height: 100,
                        showType: "slide",
                        showSpeed: 600,
                        msg: "",
                        timeout: 4e3
                    }, t), i = e('<div class="messager-body"></div>').html(n.msg).appendTo("body");
                    return i.window(e.extend({}, n, {
                        openAnimation: n.showType,
                        closeAnimation: "show" == n.showType ? "hide" : n.showType,
                        openDuration: n.showSpeed,
                        closeDuration: n.showSpeed,
                        onOpen: function () {
                            function e() {
                                n.timeout > 0 && (n.timer = setTimeout(function () {
                                    i.length && i.data("window") && i.window("close")
                                }, n.timeout))
                            }

                            i.window("window").hover(function () {
                                n.timer && clearTimeout(n.timer)
                            }, function () {
                                e()
                            }), e(), t.onOpen ? t.onOpen.call(this) : n.onOpen.call(this)
                        },
                        onClose: function () {
                            n.timer && clearTimeout(n.timer), t.onClose ? t.onClose.call(this) : n.onClose.call(this), i.window("destroy")
                        }
                    })), i.window("window").css(n.style), i.window("open"), i
                }

                function o(i) {
                    t();
                    var o = e('<div class="messager-body"></div>').appendTo("body");
                    if (o.window(e.extend({}, i, {
                            doSize: !1, noheader: !i.title, onClose: function () {
                                n(), i.onClose && i.onClose.call(this), setTimeout(function () {
                                    o.window("destroy")
                                }, 100)
                            }
                        })), i.buttons && i.buttons.length) {
                        var a = e('<div class="messager-button"></div>').appendTo(o);
                        e.map(i.buttons, function (t) {
                            e('<a href="javascript:void(0)" style="margin-left:10px"></a>').appendTo(a).linkbutton(t)
                        })
                    }
                    return o.window("window").addClass("messager-window"), o.window("resize"), o.children("div.messager-button").children("a:first").focus(), o
                }

                e.messager = {
                    show: function (e) {
                        return i(e)
                    }, alert: function (t, n, i, a) {
                        var r = "object" == typeof t ? t : {
                            title: t,
                            msg: n,
                            icon: i,
                            fn: a
                        }, s = r.icon ? "messager-icon messager-" + r.icon : "";
                        r = e.extend({}, e.messager.defaults, {
                            content: '<div class="' + s + '"></div><div>' + r.msg + '</div><div style="clear:both;"/>',
                            buttons: [{
                                text: e.messager.defaults.ok, onClick: function () {
                                    l.window("close"), r.fn()
                                }
                            }]
                        }, r);
                        var l = o(r);
                        return l
                    }, confirm: function (t, n, i) {
                        var a = "object" == typeof t ? t : {title: t, msg: n, fn: i};
                        a = e.extend({}, e.messager.defaults, {
                            content: '<div class="messager-icon messager-question"></div><div>' + a.msg + '</div><div style="clear:both;"/>',
                            buttons: [{
                                text: e.messager.defaults.ok, onClick: function () {
                                    r.window("close"), a.fn(!0)
                                }
                            }, {
                                text: e.messager.defaults.cancel, onClick: function () {
                                    r.window("close"), a.fn(!1)
                                }
                            }]
                        }, a);
                        var r = o(a);
                        return r
                    }, prompt: function (t, n, i) {
                        var a = "object" == typeof t ? t : {title: t, msg: n, fn: i};
                        a = e.extend({}, e.messager.defaults, {
                            content: '<div class="messager-icon messager-question"></div><div>' + a.msg + '</div><br/><div style="clear:both;"/><div><input class="messager-input" type="text"/></div>',
                            buttons: [{
                                text: e.messager.defaults.ok, onClick: function () {
                                    r.window("close"), a.fn(r.find(".messager-input").val())
                                }
                            }, {
                                text: e.messager.defaults.cancel, onClick: function () {
                                    r.window("close"), a.fn()
                                }
                            }]
                        }, a);
                        var r = o(a);
                        return r.find("input.messager-input").focus(), r
                    }, progress: function (t) {
                        var n = {
                            bar: function () {
                                return e("body>div.messager-window").find("div.messager-p-bar")
                            }, close: function () {
                                var t = e("body>div.messager-window>div.messager-body:has(div.messager-progress)");
                                t.length && t.window("close")
                            }
                        };
                        if ("string" == typeof t) {
                            var i = n[t];
                            return i()
                        }
                        var a = e.extend({}, {
                            title: "",
                            content: void 0,
                            msg: "",
                            text: void 0,
                            interval: 300
                        }, t || {}), r = o(e.extend({}, e.messager.defaults, {
                            content: '<div class="messager-progress"><div class="messager-p-msg">' + a.msg + '</div><div class="messager-p-bar"></div></div>',
                            closable: !1,
                            doSize: !1
                        }, a, {
                            onClose: function () {
                                this.timer && clearInterval(this.timer), t.onClose ? t.onClose.call(this) : e.messager.defaults.onClose.call(this)
                            }
                        })), s = r.find("div.messager-p-bar");
                        return s.progressbar({text: a.text}), r.window("resize"), a.interval && (r[0].timer = setInterval(function () {
                            var e = s.progressbar("getValue");
                            e += 10, e > 100 && (e = 0), s.progressbar("setValue", e)
                        }, a.interval)), r
                    }
                }, e.messager.defaults = e.extend({}, e.fn.window.defaults, {
                    ok: "确定",
                    cancel: "取消",
                    width: 300,
                    height: "auto",
                    modal: !0,
                    collapsible: !1,
                    minimizable: !1,
                    maximizable: !1,
                    _resizable: !1,
                    fn: function () {
                    }
                })
            }(jQuery), function (e) {
                function t(t, n) {
                    function i(e, t) {
                        for (var n = 0, i = 0; i < r.length; i++) {
                            var o = r[i], a = o.epanel("header")._outerHeight(l);
                            if (o.epanel("options").collapsible == e) {
                                var d = isNaN(t) ? void 0 : t + l * a.length;
                                o.epanel("resize", {
                                    width: s.width(),
                                    height: e ? d : void 0
                                }), n += o.epanel("epanel").outerHeight() - l * a.length
                            }
                        }
                        return n
                    }

                    var o = e.data(t, "accordion"), a = o.options, r = o.epanels, s = e(t);
                    n && e.extend(a, {width: n.width, height: n.height}), s._size(a);
                    var l = 0, d = "auto", c = s.find(">.epanel>.accordion-header");
                    c.length && (l = e(c[0]).css("height", "")._outerHeight()), isNaN(parseInt(a.height)) || (d = s.height() - l * c.length), i(!0, d - i(!1) + 1)
                }

                function n(t, n, i, o) {
                    for (var a = e.data(t, "accordion").epanels, r = [], s = 0; s < a.length; s++) {
                        var l = a[s];
                        if (n)l.epanel("options")[n] == i && r.push(l); else if (l[0] == e(i)[0])return s
                    }
                    return n ? o ? r : r.length ? r[0] : null : -1
                }

                function i(e) {
                    return n(e, "collapsed", !1, !0)
                }

                function o(e) {
                    var t = i(e);
                    return t.length ? t[0] : null
                }

                function a(e, t) {
                    return n(e, null, t)
                }

                function r(t, i) {
                    var o = e.data(t, "accordion").epanels;
                    return "number" == typeof i ? i < 0 || i >= o.length ? null : o[i] : n(t, "title", i)
                }

                function s(t) {
                    var n = e.data(t, "accordion").options, i = e(t);
                    n.border ? i.removeClass("accordion-noborder") : i.addClass("accordion-noborder")
                }

                function l(n) {
                    var i = e.data(n, "accordion"), o = e(n);
                    o.addClass("accordion"), i.epanels = [], o.children("div").each(function () {
                        var t = e.extend({}, e.parser.parseOptions(this), {selected: !!e(this).attr("selected") || void 0}), o = e(this);
                        i.epanels.push(o), d(n, o, t)
                    }), o.bind("_resize", function (i, o) {
                        return (e(this).hasClass("eui-fluid") || o) && t(n), !1
                    })
                }

                function d(t, n, o) {
                    function r(e) {
                        var n = e.epanel("options");
                        if (n.collapsible) {
                            var i = a(t, e);
                            n.collapsed ? c(t, i) : u(t, i)
                        }
                    }

                    var s = e.data(t, "accordion").options;
                    n.epanel(e.extend({}, {
                        collapsible: !0,
                        minimizable: !1,
                        maximizable: !1,
                        closable: !1,
                        doSize: !1,
                        collapsed: !0,
                        headerCls: "accordion-header",
                        bodyCls: "accordion-body"
                    }, o, {
                        onBeforeExpand: function () {
                            if (o.onBeforeExpand && 0 == o.onBeforeExpand.call(this))return !1;
                            if (!s.multiple)for (var n = e.grep(i(t), function (e) {
                                return e.epanel("options").collapsible
                            }), r = 0; r < n.length; r++)u(t, a(t, n[r]));
                            var l = e(this).epanel("header");
                            l.addClass("accordion-header-selected"), l.find(".accordion-collapse").removeClass("accordion-expand")
                        }, onExpand: function () {
                            o.onExpand && o.onExpand.call(this), s.onSelect.call(t, e(this).epanel("options").title, a(t, this))
                        }, onBeforeCollapse: function () {
                            if (o.onBeforeCollapse && 0 == o.onBeforeCollapse.call(this))return !1;
                            var t = e(this).epanel("header");
                            t.removeClass("accordion-header-selected"), t.find(".accordion-collapse").addClass("accordion-expand")
                        }, onCollapse: function () {
                            o.onCollapse && o.onCollapse.call(this), s.onUnselect.call(t, e(this).epanel("options").title, a(t, this))
                        }
                    }));
                    var l = n.epanel("header"), d = l.children("div.epanel-tool");
                    d.children("a.epanel-tool-collapse").hide();
                    var f = e('<a href="javascript:void(0)"></a>').addClass("accordion-collapse accordion-expand").appendTo(d);
                    f.bind("click", function () {
                        return r(n), !1
                    }), n.epanel("options").collapsible ? f.show() : f.hide(), l.click(function () {
                        return r(n), !1
                    })
                }

                function c(t, n) {
                    var i = r(t, n);
                    if (i) {
                        p(t);
                        var o = e.data(t, "accordion").options;
                        i.epanel("expand", o.animate)
                    }
                }

                function u(t, n) {
                    var i = r(t, n);
                    if (i) {
                        p(t);
                        var o = e.data(t, "accordion").options;
                        i.epanel("collapse", o.animate)
                    }
                }

                function f(t) {
                    function i(e) {
                        var n = o.animate;
                        o.animate = !1, c(t, e), o.animate = n
                    }

                    var o = e.data(t, "accordion").options, r = n(t, "selected", !0);
                    i(r ? a(t, r) : o.selected)
                }

                function p(t) {
                    for (var n = e.data(t, "accordion").epanels, i = 0; i < n.length; i++)n[i].stop(!0, !0)
                }

                function h(n, i) {
                    var o = e.data(n, "accordion"), a = o.options, r = o.epanels;
                    void 0 == i.selected && (i.selected = !0), p(n);
                    var s = e("<div></div>").appendTo(n);
                    r.push(s), d(n, s, i), t(n), a.onAdd.call(n, i.title, r.length - 1), i.selected && c(n, r.length - 1)
                }

                function m(n, i) {
                    var s = e.data(n, "accordion"), l = s.options, d = s.epanels;
                    p(n);
                    var u = r(n, i), f = u.epanel("options").title, h = a(n, u);
                    if (u && 0 != l.onBeforeRemove.call(n, f, h)) {
                        if (d.splice(h, 1), u.epanel("destroy"), d.length) {
                            t(n);
                            var m = o(n);
                            m || c(n, 0)
                        }
                        l.onRemove.call(n, f, h)
                    }
                }

                e.fn.accordion = function (n, i) {
                    return "string" == typeof n ? e.fn.accordion.methods[n](this, i) : (n = n || {}, this.each(function () {
                        var i = e.data(this, "accordion");
                        i ? e.extend(i.options, n) : (e.data(this, "accordion", {
                            options: e.extend({}, e.fn.accordion.defaults, e.fn.accordion.parseOptions(this), n),
                            accordion: e(this).addClass("accordion"),
                            epanels: []
                        }), l(this)), s(this), t(this), f(this)
                    }))
                }, e.fn.accordion.methods = {
                    options: function (t) {
                        return e.data(t[0], "accordion").options
                    }, epanels: function (t) {
                        return e.data(t[0], "accordion").epanels
                    }, resize: function (e, n) {
                        return e.each(function () {
                            t(this, n)
                        })
                    }, getSelections: function (e) {
                        return i(e[0])
                    }, getSelected: function (e) {
                        return o(e[0])
                    }, getepanel: function (e, t) {
                        return r(e[0], t)
                    }, getepanelIndex: function (e, t) {
                        return a(e[0], t)
                    }, select: function (e, t) {
                        return e.each(function () {
                            c(this, t)
                        })
                    }, unselect: function (e, t) {
                        return e.each(function () {
                            u(this, t)
                        })
                    }, add: function (e, t) {
                        return e.each(function () {
                            h(this, t)
                        })
                    }, remove: function (e, t) {
                        return e.each(function () {
                            m(this, t)
                        })
                    }
                }, e.fn.accordion.parseOptions = function (t) {
                    e(t);
                    return e.extend({}, e.parser.parseOptions(t, ["width", "height", {
                        fit: "boolean",
                        border: "boolean",
                        animate: "boolean",
                        multiple: "boolean",
                        selected: "number"
                    }]))
                }, e.fn.accordion.defaults = {
                    width: "auto",
                    height: "auto",
                    fit: !1,
                    border: !0,
                    animate: !0,
                    multiple: !1,
                    selected: 0,
                    onSelect: function (e, t) {
                    },
                    onUnselect: function (e, t) {
                    },
                    onAdd: function (e, t) {
                    },
                    onBeforeRemove: function (e, t) {
                    },
                    onRemove: function (e, t) {
                    }
                }
            }(jQuery), function ($) {
                function _30a(e) {
                    var t = 0;
                    return $(e).children().each(function () {
                        t += $(this).outerWidth(!0)
                    }), t
                }

                function _30b(e) {
                    var t = $.data(e, "tabs").options;
                    if ("left" != t.tabPosition && "right" != t.tabPosition && t.showHeader) {
                        var n = $(e).children("div.tabs-header"), i = n.children("div.tabs-tool"), o = n.children("div.tabs-scroller-left"), a = n.children("div.tabs-scroller-right"), r = n.children("div.tabs-wrap"), s = n.outerHeight();
                        t.plain && (s -= s - n.height()), i._outerHeight(s);
                        var l = _30a(n.find("ul.tabs")), d = n.width() - i._outerWidth();
                        l > d ? (o.add(a).show()._outerHeight(s), "left" == t.toolPosition ? (i.css({
                            left: o.outerWidth(),
                            right: ""
                        }), r.css({
                            marginLeft: o.outerWidth() + i._outerWidth(),
                            marginRight: a._outerWidth(),
                            width: d - o.outerWidth() - a.outerWidth()
                        })) : (i.css({left: "", right: a.outerWidth()}), r.css({
                            marginLeft: o.outerWidth(),
                            marginRight: a.outerWidth() + i._outerWidth(),
                            width: d - o.outerWidth() - a.outerWidth()
                        }))) : (o.add(a).hide(), "left" == t.toolPosition ? (i.css({
                            left: 0,
                            right: ""
                        }), r.css({marginLeft: i._outerWidth(), marginRight: 0, width: d})) : (i.css({
                            left: "",
                            right: 0
                        }), r.css({marginLeft: 0, marginRight: i._outerWidth(), width: d})))
                    }
                }

                function _313(_314) {
                    var opts = $.data(_314, "tabs").options, _315 = $(_314).children("div.tabs-header");
                    if (opts.tools)if ("string" == typeof opts.tools)$(opts.tools).addClass("tabs-tool").appendTo(_315), $(opts.tools).show(); else {
                        _315.children("div.tabs-tool").remove();
                        for (var _316 = $('<div class="tabs-tool"><table cellspacing="0" cellpadding="0" style="height:100%"><tr></tr></table></div>').appendTo(_315), tr = _316.find("tr"), i = 0; i < opts.tools.length; i++) {
                            var td = $("<td></td>").appendTo(tr), tool = $('<a href="javascript:void(0);"></a>').appendTo(td);
                            tool[0].onclick = eval(opts.tools[i].handler || function () {
                                }), tool.linkbutton($.extend({}, opts.tools[i], {plain: !0}))
                        }
                    } else _315.children("div.tabs-tool").remove()
                }

                function _317(e, t) {
                    function n(e, t) {
                        var n = e.epanel("options"), i = n.tab.find("a.tabs-inner"), t = t ? t : parseInt(n.tabWidth || o.tabWidth || void 0);
                        t ? i._outerWidth(t) : i.css("width", ""), i._outerHeight(o.tabHeight), i.css("lineHeight", i.height() + "px"), i.find(".eui-fluid:visible").triggerHandler("_resize")
                    }

                    var i = $.data(e, "tabs"), o = i.options, a = $(e);
                    if (o.doSize) {
                        t && $.extend(o, {width: t.width, height: t.height}), a._size(o);
                        var r = a.children("div.tabs-header"), s = a.children("div.tabs-epanels"), l = r.find("div.tabs-wrap"), d = l.find(".tabs");
                        if (d.children("li").removeClass("tabs-first tabs-last"), d.children("li:first").addClass("tabs-first"), d.children("li:last").addClass("tabs-last"), "left" == o.tabPosition || "right" == o.tabPosition ? (r._outerWidth(o.showHeader ? o.headerWidth : 0), s._outerWidth(a.width() - r.outerWidth()), r.add(s)._outerHeight(o.height), l._outerWidth(r.width()), d._outerWidth(l.width()).css("height", "")) : (r.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool").css("display", o.showHeader ? "block" : "none"), r._outerWidth(a.width()).css("height", ""), o.showHeader ? (r.css("background-color", ""), l.css("height", "")) : (r.css("background-color", "transparent"), r._outerHeight(0), l._outerHeight(0)), d._outerHeight(o.tabHeight).css("width", ""), d._outerHeight(d.outerHeight() - d.height() - 1 + o.tabHeight).css("width", ""), s._size("height", isNaN(o.height) ? "" : o.height - r.outerHeight()), s._size("width", isNaN(o.width) ? "" : o.width)), i.tabs.length) {
                            var c = d.outerWidth(!0) - d.width(), u = d.children("li:first"), f = u.outerWidth(!0) - u.width(), p = r.width() - r.children(".tabs-tool")._outerWidth(), h = Math.floor((p - c - f * i.tabs.length) / i.tabs.length);
                            if ($.map(i.tabs, function (e) {
                                    n(e, o.justified && $.inArray(o.tabPosition, ["top", "bottom"]) >= 0 ? h : void 0)
                                }), o.justified && $.inArray(o.tabPosition, ["top", "bottom"]) >= 0) {
                                var m = p - c - _30a(d);
                                n(i.tabs[i.tabs.length - 1], h + m)
                            }
                        }
                        _30b(e)
                    }
                }

                function _323(e) {
                    var t = $.data(e, "tabs").options, n = _325(e);
                    if (n) {
                        var i = $(e).children("div.tabs-epanels"), o = "auto" == t.width ? "auto" : i.width(), a = "auto" == t.height ? "auto" : i.height();
                        n.epanel("resize", {width: o, height: a})
                    }
                }

                function _329(e) {
                    var t = ($.data(e, "tabs").tabs, $(e).addClass("tabs-container")), n = $('<div class="tabs-epanels"></div>').insertBefore(t);
                    t.children("div").each(function () {
                        n[0].appendChild(this)
                    }), t[0].appendChild(n[0]), $('<div class="tabs-header"><div class="tabs-scroller-left"></div><div class="tabs-scroller-right"></div><div class="tabs-wrap"><ul class="tabs"></ul></div></div>').prependTo(e), t.children("div.tabs-epanels").children("div").each(function (t) {
                        var n = $.extend({}, $.parser.parseOptions(this), {selected: !!$(this).attr("selected") || void 0});
                        _338(e, n, $(this))
                    }), t.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function () {
                        $(this).addClass("tabs-scroller-over")
                    }, function () {
                        $(this).removeClass("tabs-scroller-over")
                    }), t.bind("_resize", function (t, n) {
                        return ($(this).hasClass("eui-fluid") || n) && (_317(e), _323(e)), !1
                    })
                }

                function _32d(e) {
                    function t(e) {
                        var t = 0;
                        return e.parent().children("li").each(function (n) {
                            if (e[0] == this)return t = n, !1
                        }), t
                    }

                    var n = $.data(e, "tabs"), i = n.options;
                    $(e).children("div.tabs-header").unbind().bind("click", function (o) {
                        if ($(o.target).hasClass("tabs-scroller-left"))$(e).tabs("scrollBy", -i.scrollIncrement); else {
                            if (!$(o.target).hasClass("tabs-scroller-right")) {
                                var a = $(o.target).closest("li");
                                if (a.hasClass("tabs-disabled"))return !1;
                                var r = $(o.target).closest("a.tabs-close");
                                if (r.length)_351(e, t(a)); else if (a.length) {
                                    var s = t(a), l = n.tabs[s].epanel("options");
                                    l.collapsible ? l.closed ? _348(e, s) : _365(e, s) : _348(e, s)
                                }
                                return !1
                            }
                            $(e).tabs("scrollBy", i.scrollIncrement)
                        }
                    }).bind("contextmenu", function (n) {
                        var o = $(n.target).closest("li");
                        o.hasClass("tabs-disabled") || o.length && i.onContextMenu.call(e, n, o.find("span.tabs-title").html(), t(o))
                    })
                }

                function _334(e) {
                    var t = $.data(e, "tabs").options, n = $(e).children("div.tabs-header"), i = $(e).children("div.tabs-epanels");
                    n.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right"), i.removeClass("tabs-epanels-top tabs-epanels-bottom tabs-epanels-left tabs-epanels-right"), "top" == t.tabPosition ? n.insertBefore(i) : "bottom" == t.tabPosition ? (n.insertAfter(i), n.addClass("tabs-header-bottom"), i.addClass("tabs-epanels-top")) : "left" == t.tabPosition ? (n.addClass("tabs-header-left"), i.addClass("tabs-epanels-right")) : "right" == t.tabPosition && (n.addClass("tabs-header-right"), i.addClass("tabs-epanels-left")), 1 == t.plain ? n.addClass("tabs-header-plain") : n.removeClass("tabs-header-plain"), n.removeClass("tabs-header-narrow").addClass(t.narrow ? "tabs-header-narrow" : "");
                    var o = n.find(".tabs");
                    o.removeClass("tabs-pill").addClass(t.pill ? "tabs-pill" : ""), o.removeClass("tabs-narrow").addClass(t.narrow ? "tabs-narrow" : ""), o.removeClass("tabs-justified").addClass(t.justified ? "tabs-justified" : ""), 1 == t.border ? (n.removeClass("tabs-header-noborder"), i.removeClass("tabs-epanels-noborder")) : (n.addClass("tabs-header-noborder"), i.addClass("tabs-epanels-noborder")), t.doSize = !0
                }

                function _338(e, t, n) {
                    t = t || {};
                    var i = $.data(e, "tabs"), o = i.tabs;
                    (void 0 == t.index || t.index > o.length) && (t.index = o.length), t.index < 0 && (t.index = 0);
                    var a = $(e).children("div.tabs-header").find("ul.tabs"), r = $(e).children("div.tabs-epanels"), s = $('<li><a href="javascript:void(0)" class="tabs-inner"><span class="tabs-title"></span><span class="tabs-icon"></span></a></li>');
                    n || (n = $("<div></div>")), t.index >= o.length ? (s.appendTo(a), n.appendTo(r), o.push(n)) : (s.insertBefore(a.children("li:eq(" + t.index + ")")), n.insertBefore(r.children("div.epanel:eq(" + t.index + ")")), o.splice(t.index, 0, n)), n.epanel($.extend({}, t, {
                        tab: s,
                        border: !1,
                        noheader: !0,
                        closed: !0,
                        doSize: !1,
                        iconCls: t.icon ? t.icon : void 0,
                        onLoad: function () {
                            t.onLoad && t.onLoad.call(this, arguments), i.options.onLoad.call(e, $(this))
                        },
                        onBeforeOpen: function () {
                            if (t.onBeforeOpen && 0 == t.onBeforeOpen.call(this))return !1;
                            var n = $(e).tabs("getSelected");
                            if (n) {
                                if (n[0] == this)return _323(e), !1;
                                if ($(e).tabs("unselect", _343(e, n)), n = $(e).tabs("getSelected"))return !1
                            }
                            var i = $(this).epanel("options");
                            i.tab.addClass("tabs-selected");
                            var o = $(e).find(">div.tabs-header>div.tabs-wrap"), a = i.tab.position().left, r = a + i.tab.outerWidth();
                            if (a < 0 || r > o.width()) {
                                var s = a - (o.width() - i.tab.width()) / 2;
                                $(e).tabs("scrollBy", s)
                            } else $(e).tabs("scrollBy", 0);
                            var l = $(this).epanel("epanel");
                            l.css("display", "block"), _323(e), l.css("display", "none")
                        },
                        onOpen: function () {
                            t.onOpen && t.onOpen.call(this);
                            var n = $(this).epanel("options");
                            i.selectHis.push(n.title), i.options.onSelect.call(e, n.title, _343(e, this))
                        },
                        onBeforeClose: function () {
                            return (!t.onBeforeClose || 0 != t.onBeforeClose.call(this)) && void $(this).epanel("options").tab.removeClass("tabs-selected")
                        },
                        onClose: function () {
                            t.onClose && t.onClose.call(this);
                            var n = $(this).epanel("options");
                            i.options.onUnselect.call(e, n.title, _343(e, this))
                        }
                    })), $(e).tabs("update", {tab: n, options: n.epanel("options"), type: "header"})
                }

                function _344(e, t) {
                    var n = $.data(e, "tabs"), i = n.options;
                    void 0 == t.selected && (t.selected = !0), _338(e, t), i.onAdd.call(e, t.title, t.index), t.selected && _348(e, t.index)
                }

                function _349(e, t) {
                    t.type = t.type || "all";
                    var n = $.data(e, "tabs").selectHis, i = t.tab, o = i.epanel("options").title;
                    if ("all" != t.type && "body" != t || i.epanel($.extend({}, t.options, {iconCls: t.options.icon ? t.options.icon : void 0})), "all" == t.type || "header" == t.type) {
                        var a = i.epanel("options"), r = a.tab;
                        if (a.header)r.find(".tabs-inner").html($(a.header)); else {
                            var s = r.find("span.tabs-title"), l = r.find("span.tabs-icon");
                            if (s.html(a.title), l.attr("class", "tabs-icon"), r.find("a.tabs-close").remove(), a.closable ? (s.addClass("tabs-closable"), $('<a href="javascript:void(0)" class="tabs-close"></a>').appendTo(r)) : s.removeClass("tabs-closable"), a.iconCls ? (s.addClass("tabs-with-icon"), l.addClass(a.iconCls)) : s.removeClass("tabs-with-icon"), a.tools) {
                                var d = r.find("span.tabs-p-tool");
                                if (!d.length)var d = $('<span class="tabs-p-tool"></span>').insertAfter(r.find("a.tabs-inner"));
                                if ($.isArray(a.tools))for (var c = 0; c < a.tools.length; c++) {
                                    var u = $('<a href="javascript:void(0)"></a>').appendTo(d);
                                    u.addClass(a.tools[c].iconCls), a.tools[c].handler && u.bind("click", {handler: a.tools[c].handler}, function (e) {
                                        $(this).parents("li").hasClass("tabs-disabled") || e.data.handler.call(this)
                                    })
                                } else $(a.tools).children().appendTo(d);
                                var f = 12 * d.children().length;
                                a.closable ? f += 8 : (f -= 3, d.css("right", "5px")), s.css("padding-right", f + "px")
                            } else r.find("span.tabs-p-tool").remove(), s.css("padding-right", "")
                        }
                        if (o != a.title)for (var c = 0; c < n.length; c++)n[c] == o && (n[c] = a.title)
                    }
                    _317(e), $.data(e, "tabs").options.onUpdate.call(e, a.title, _343(e, i))
                }

                function _351(e, t) {
                    var n = $.data(e, "tabs").options, i = $.data(e, "tabs").tabs, o = $.data(e, "tabs").selectHis;
                    if (_355(e, t)) {
                        var a = _356(e, t), r = a.epanel("options").title, s = _343(e, a);
                        if (0 != n.onBeforeClose.call(e, r, s)) {
                            var a = _356(e, t, !0);
                            a.epanel("options").tab.remove(), a.epanel("destroy"), n.onClose.call(e, r, s), _317(e);
                            for (var l = 0; l < o.length; l++)o[l] == r && (o.splice(l, 1), l--);
                            var d = o.pop();
                            d ? _348(e, d) : i.length && _348(e, 0)
                        }
                    }
                }

                function _356(e, t, n) {
                    var i = $.data(e, "tabs").tabs;
                    if ("number" == typeof t) {
                        if (t < 0 || t >= i.length)return null;
                        var o = i[t];
                        return n && i.splice(t, 1), o
                    }
                    for (var a = 0; a < i.length; a++) {
                        var o = i[a];
                        if (o.epanel("options").title == t)return n && i.splice(a, 1), o
                    }
                    return null
                }

                function _343(e, t) {
                    for (var n = $.data(e, "tabs").tabs, i = 0; i < n.length; i++)if (n[i][0] == $(t)[0])return i;
                    return -1
                }

                function _325(e) {
                    for (var t = $.data(e, "tabs").tabs, n = 0; n < t.length; n++) {
                        var i = t[n];
                        if (i.epanel("options").tab.hasClass("tabs-selected"))return i
                    }
                    return null
                }

                function _35f(e) {
                    for (var t = $.data(e, "tabs"), n = t.tabs, i = 0; i < n.length; i++)if (n[i].epanel("options").selected)return void _348(e, i);
                    _348(e, t.options.selected)
                }

                function _348(e, t) {
                    var n = _356(e, t);
                    n && !n.is(":visible") && (_364(e), n.epanel("open"))
                }

                function _365(e, t) {
                    var n = _356(e, t);
                    n && n.is(":visible") && (_364(e), n.epanel("close"))
                }

                function _364(e) {
                    $(e).children("div.tabs-epanels").each(function () {
                        $(this).stop(!0, !0)
                    })
                }

                function _355(e, t) {
                    return null != _356(e, t)
                }

                function _36b(e, t) {
                    var n = $.data(e, "tabs").options;
                    n.showHeader = t, $(e).tabs("resize")
                }

                $.fn.tabs = function (e, t) {
                    return "string" == typeof e ? $.fn.tabs.methods[e](this, t) : (e = e || {}, this.each(function () {
                        var t = $.data(this, "tabs");
                        t ? $.extend(t.options, e) : ($.data(this, "tabs", {
                            options: $.extend({}, $.fn.tabs.defaults, $.fn.tabs.parseOptions(this), e),
                            tabs: [],
                            selectHis: []
                        }), _329(this)), _313(this), _334(this), _317(this), _32d(this), _35f(this)
                    }))
                }, $.fn.tabs.methods = {
                    options: function (e) {
                        var t = e[0], n = $.data(t, "tabs").options, i = _325(t);
                        return n.selected = i ? _343(t, i) : -1, n
                    }, tabs: function (e) {
                        return $.data(e[0], "tabs").tabs
                    }, resize: function (e, t) {
                        return e.each(function () {
                            _317(this, t), _323(this)
                        })
                    }, add: function (e, t) {
                        return e.each(function () {
                            _344(this, t)
                        })
                    }, close: function (e, t) {
                        return e.each(function () {
                            _351(this, t)
                        })
                    }, getTab: function (e, t) {
                        return _356(e[0], t)
                    }, getTabIndex: function (e, t) {
                        return _343(e[0], t)
                    }, getSelected: function (e) {
                        return _325(e[0])
                    }, select: function (e, t) {
                        return e.each(function () {
                            _348(this, t)
                        })
                    }, unselect: function (e, t) {
                        return e.each(function () {
                            _365(this, t)
                        })
                    }, exists: function (e, t) {
                        return _355(e[0], t)
                    }, update: function (e, t) {
                        return e.each(function () {
                            _349(this, t)
                        })
                    }, enableTab: function (e, t) {
                        return e.each(function () {
                            $(this).tabs("getTab", t).epanel("options").tab.removeClass("tabs-disabled")
                        })
                    }, disableTab: function (e, t) {
                        return e.each(function () {
                            $(this).tabs("getTab", t).epanel("options").tab.addClass("tabs-disabled")
                        })
                    }, showHeader: function (e) {
                        return e.each(function () {
                            _36b(this, !0)
                        })
                    }, hideHeader: function (e) {
                        return e.each(function () {
                            _36b(this, !1)
                        })
                    }, scrollBy: function (e, t) {
                        return e.each(function () {
                            function e() {
                                var e = 0, t = i.children("ul");
                                return t.children("li").each(function () {
                                    e += $(this).outerWidth(!0)
                                }), e - i.width() + (t.outerWidth() - t.width())
                            }

                            var n = $(this).tabs("options"), i = $(this).find(">div.tabs-header>div.tabs-wrap"), o = Math.min(i._scrollLeft() + t, e());
                            i.animate({scrollLeft: o}, n.scrollDuration)
                        })
                    }
                }, $.fn.tabs.parseOptions = function (e) {
                    return $.extend({}, $.parser.parseOptions(e, ["tools", "toolPosition", "tabPosition", {
                        fit: "boolean",
                        border: "boolean",
                        plain: "boolean"
                    }, {
                        headerWidth: "number",
                        tabWidth: "number",
                        tabHeight: "number",
                        selected: "number"
                    }, {showHeader: "boolean", justified: "boolean", narrow: "boolean", pill: "boolean"}]))
                }, $.fn.tabs.defaults = {
                    width: "auto",
                    height: "auto",
                    headerWidth: 150,
                    tabWidth: "auto",
                    tabHeight: 27,
                    selected: 0,
                    showHeader: !0,
                    plain: !1,
                    fit: !1,
                    border: !0,
                    justified: !1,
                    narrow: !1,
                    pill: !1,
                    tools: null,
                    toolPosition: "right",
                    tabPosition: "top",
                    scrollIncrement: 100,
                    scrollDuration: 400,
                    onLoad: function (e) {
                    },
                    onSelect: function (e, t) {
                    },
                    onUnselect: function (e, t) {
                    },
                    onBeforeClose: function (e, t) {
                    },
                    onClose: function (e, t) {
                    },
                    onAdd: function (e, t) {
                    },
                    onUpdate: function (e, t) {
                    },
                    onContextMenu: function (e, t, n) {
                    }
                }
            }(jQuery), function (e) {
                function t(t, n) {
                    function i(e, t) {
                        if (e.length && s(e)) {
                            var n = e.epanel("options");
                            e.epanel("resize", {width: d.width(), height: n.height});
                            var i = e.epanel("epanel").outerHeight();
                            e.epanel("move", {
                                left: 0,
                                top: "n" == t ? 0 : d.height() - i
                            }), c.height -= i, "n" == t && (c.top += i, !n.split && n.border && c.top--), !n.split && n.border && c.height++
                        }
                    }

                    function o(e, t) {
                        if (e.length && s(e)) {
                            var n = e.epanel("options");
                            e.epanel("resize", {width: n.width, height: c.height});
                            var i = e.epanel("epanel").outerWidth();
                            e.epanel("move", {
                                left: "e" == t ? d.width() - i : 0,
                                top: c.top
                            }), c.width -= i, "w" == t && (c.left += i, !n.split && n.border && c.left--), !n.split && n.border && c.width++
                        }
                    }

                    var a = e.data(t, "layout"), r = a.options, l = a.epanels, d = e(t);
                    n && e.extend(r, {
                        width: n.width,
                        height: n.height
                    }), "body" == t.tagName.toLowerCase() ? d._size("fit") : d._size(r);
                    var c = {top: 0, left: 0, width: d.width(), height: d.height()};
                    i(s(l.expandNorth) ? l.expandNorth : l.north, "n"), i(s(l.expandSouth) ? l.expandSouth : l.south, "s"), o(s(l.expandEast) ? l.expandEast : l.east, "e"), o(s(l.expandWest) ? l.expandWest : l.west, "w"), l.center.epanel("resize", c)
                }

                function n(n) {
                    function o(t) {
                        t.children("div").each(function () {
                            var t = e.fn.layout.parseepanelOptions(this);
                            "north,south,east,west,center".indexOf(t.region) >= 0 && i(n, t, this)
                        })
                    }

                    var a = e(n);
                    a.addClass("layout"), o(a.children("form").length ? a.children("form") : a), a.append('<div class="layout-split-proxy-h"></div><div class="layout-split-proxy-v"></div>'), a.bind("_resize", function (i, o) {
                        return (e(this).hasClass("eui-fluid") || o) && t(n), !1
                    })
                }

                function i(n, i, o) {
                    i.region = i.region || "center";
                    var r = e.data(n, "layout").epanels, s = e(n), l = i.region;
                    if (!r[l].length) {
                        var d = e(o);
                        d.length || (d = e("<div></div>").appendTo(s));
                        var u = e.extend({}, e.fn.layout.epaneldefaults, {
                            width: d.length ? parseInt(d[0].style.width) || d.outerWidth() : "auto",
                            height: d.length ? parseInt(d[0].style.height) || d.outerHeight() : "auto",
                            doSize: !1,
                            collapsible: !0,
                            cls: "layout-epanel layout-epanel-" + l,
                            bodyCls: "layout-body",
                            onOpen: function () {
                                var t = e(this).epanel("header").children("div.epanel-tool");
                                t.children("a.epanel-tool-collapse").hide();
                                var i = {north: "up", south: "down", east: "right", west: "left"};
                                if (i[l]) {
                                    var o = "layout-button-" + i[l], r = t.children("a." + o);
                                    r.length || (r = e('<a href="javascript:void(0)"></a>').addClass(o).appendTo(t), r.bind("click", {dir: l}, function (e) {
                                        return a(n, e.data.dir), !1
                                    })), e(this).epanel("options").collapsible ? r.show() : r.hide()
                                }
                            }
                        }, i);
                        d.epanel(u), r[l] = d;
                        var f = {north: "s", south: "n", east: "w", west: "e"}, p = d.epanel("epanel");
                        d.epanel("options").split && p.addClass("layout-split-" + l), p._resizable(e.extend({}, {
                            handles: f[l] || "",
                            disabled: !d.epanel("options").split,
                            onStartResize: function (t) {
                                if (c = !0, "north" == l || "south" == l)var i = e(">div.layout-split-proxy-v", n); else var i = e(">div.layout-split-proxy-h", n);
                                var o = {display: "block"};
                                "north" == l ? (o.top = parseInt(p.css("top")) + p.outerHeight() - i.height(), o.left = parseInt(p.css("left")), o.width = p.outerWidth(), o.height = i.height()) : "south" == l ? (o.top = parseInt(p.css("top")), o.left = parseInt(p.css("left")), o.width = p.outerWidth(), o.height = i.height()) : "east" == l ? (o.top = parseInt(p.css("top")) || 0, o.left = parseInt(p.css("left")) || 0, o.width = i.width(), o.height = p.outerHeight()) : "west" == l && (o.top = parseInt(p.css("top")) || 0, o.left = p.outerWidth() - i.width(), o.width = i.width(), o.height = p.outerHeight()), i.css(o), e('<div class="layout-mask"></div>').css({
                                    left: 0,
                                    top: 0,
                                    width: s.width(),
                                    height: s.height()
                                }).appendTo(s)
                            },
                            onResize: function (t) {
                                if ("north" == l || "south" == l) {
                                    var i = e(">div.layout-split-proxy-v", n);
                                    i.css("top", t.pageY - e(n).offset().top - i.height() / 2)
                                } else {
                                    var i = e(">div.layout-split-proxy-h", n);
                                    i.css("left", t.pageX - e(n).offset().left - i.width() / 2)
                                }
                                return !1
                            },
                            onStopResize: function (e) {
                                s.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide(), d.epanel("resize", e.data), t(n), c = !1, s.find(">div.layout-mask").remove()
                            }
                        }, i))
                    }
                }

                function o(t, n) {
                    var i = e.data(t, "layout").epanels;
                    if (i[n].length) {
                        i[n].epanel("destroy"), i[n] = e();
                        var o = "expand" + n.substring(0, 1).toUpperCase() + n.substring(1);
                        i[o] && (i[o].epanel("destroy"), i[o] = void 0)
                    }
                }

                function a(t, n, i) {
                    function o(i) {
                        var o;
                        "east" == i ? o = "layout-button-left" : "west" == i ? o = "layout-button-right" : "north" == i ? o = "layout-button-down" : "south" == i && (o = "layout-button-up");
                        var a = e("<div></div>").appendTo(t);
                        return a.epanel(e.extend({}, e.fn.layout.epaneldefaults, {
                            cls: "layout-expand layout-expand-" + i,
                            title: "&nbsp;",
                            closed: !0,
                            minWidth: 0,
                            minHeight: 0,
                            doSize: !1,
                            tools: [{
                                iconCls: o, handler: function () {
                                    return r(t, n), !1
                                }
                            }]
                        })), a.epanel("epanel").hover(function () {
                            e(this).addClass("layout-expand-over")
                        }, function () {
                            e(this).removeClass("layout-expand-over")
                        }), a
                    }

                    function l() {
                        var i = e(t), o = d.center.epanel("options"), a = f.collapsedSize;
                        if ("east" == n) {
                            var r = u.epanel("epanel")._outerWidth(), l = o.width + r - a;
                            return !f.split && f.border || l++, {
                                resizeC: {width: l},
                                expand: {left: i.width() - r},
                                expandP: {top: o.top, left: i.width() - a, width: a, height: o.height},
                                collapse: {left: i.width(), top: o.top, height: o.height}
                            }
                        }
                        if ("west" == n) {
                            var r = u.epanel("epanel")._outerWidth(), l = o.width + r - a;
                            return !f.split && f.border || l++, {
                                resizeC: {width: l, left: a - 1},
                                expand: {left: 0},
                                expandP: {left: 0, top: o.top, width: a, height: o.height},
                                collapse: {left: -r, top: o.top, height: o.height}
                            }
                        }
                        if ("north" == n) {
                            var c = u.epanel("epanel")._outerHeight(), p = o.height;
                            return s(d.expandNorth) || (p += c - a + (f.split || !f.border ? 1 : 0)), d.east.add(d.west).add(d.expandEast).add(d.expandWest).epanel("resize", {
                                top: a - 1,
                                height: p
                            }), {
                                resizeC: {top: a - 1, height: p},
                                expand: {top: 0},
                                expandP: {top: 0, left: 0, width: i.width(), height: a},
                                collapse: {top: -c, width: i.width()}
                            }
                        }
                        if ("south" == n) {
                            var c = u.epanel("epanel")._outerHeight(), p = o.height;
                            return s(d.expandSouth) || (p += c - a + (f.split || !f.border ? 1 : 0)), d.east.add(d.west).add(d.expandEast).add(d.expandWest).epanel("resize", {height: p}), {
                                resizeC: {height: p},
                                expand: {top: i.height() - c},
                                expandP: {top: i.height() - a, left: 0, width: i.width(), height: a},
                                collapse: {top: i.height(), width: i.width()}
                            }
                        }
                    }

                    void 0 == i && (i = "normal");
                    var d = e.data(t, "layout").epanels, u = d[n], f = u.epanel("options");
                    if (0 != f.onBeforeCollapse.call(u)) {
                        var p = "expand" + n.substring(0, 1).toUpperCase() + n.substring(1);
                        d[p] || (d[p] = o(n), d[p].epanel("epanel").bind("click", function () {
                            u.epanel("expand", !1).epanel("open");
                            var i = l();
                            return u.epanel("resize", i.collapse), u.epanel("epanel").animate(i.expand, function () {
                                e(this).unbind(".layout").bind("mouseleave.layout", {region: n}, function (n) {
                                    1 != c && (e("body>div.combo-p>div.combo-epanel:visible").length || a(t, n.data.region))
                                })
                            }), !1
                        }));
                        var h = l();
                        s(d[p]) || d.center.epanel("resize", h.resizeC), u.epanel("epanel").animate(h.collapse, i, function () {
                            u.epanel("collapse", !1).epanel("close"), d[p].epanel("open").epanel("resize", h.expandP), e(this).unbind(".layout")
                        })
                    }
                }

                function r(n, i) {
                    function o() {
                        var t = e(n), o = a.center.epanel("options");
                        return "east" == i && a.expandEast ? {
                            collapse: {left: t.width(), top: o.top, height: o.height},
                            expand: {left: t.width() - r.epanel("epanel")._outerWidth()}
                        } : "west" == i && a.expandWest ? {
                            collapse: {
                                left: -r.epanel("epanel")._outerWidth(),
                                top: o.top,
                                height: o.height
                            }, expand: {left: 0}
                        } : "north" == i && a.expandNorth ? {
                            collapse: {
                                top: -r.epanel("epanel")._outerHeight(),
                                width: t.width()
                            }, expand: {top: 0}
                        } : "south" == i && a.expandSouth ? {
                            collapse: {top: t.height(), width: t.width()},
                            expand: {top: t.height() - r.epanel("epanel")._outerHeight()}
                        } : void 0
                    }

                    var a = e.data(n, "layout").epanels, r = a[i], s = r.epanel("options");
                    if (0 != s.onBeforeExpand.call(r)) {
                        var l = "expand" + i.substring(0, 1).toUpperCase() + i.substring(1);
                        if (a[l]) {
                            a[l].epanel("close"), r.epanel("epanel").stop(!0, !0), r.epanel("expand", !1).epanel("open");
                            var d = o();
                            r.epanel("resize", d.collapse), r.epanel("epanel").animate(d.expand, function () {
                                t(n)
                            })
                        }
                    }
                }

                function s(e) {
                    return !!e && (!!e.length && e.epanel("epanel").is(":visible"))
                }

                function l(t) {
                    function n(e) {
                        var n = i[e];
                        n.length && n.epanel("options").collapsed && a(t, e, 0)
                    }

                    var i = e.data(t, "layout").epanels;
                    n("east"), n("west"), n("north"), n("south")
                }

                function d(n, i, o) {
                    var a = e(n).layout("epanel", i);
                    a.epanel("options").split = o;
                    var r = "layout-split-" + i, s = a.epanel("epanel").removeClass(r);
                    o && s.addClass(r), s._resizable({disabled: !o}), t(n)
                }

                var c = !1;
                e.fn.layout = function (i, o) {
                    return "string" == typeof i ? e.fn.layout.methods[i](this, o) : (i = i || {}, this.each(function () {
                        var o = e.data(this, "layout");
                        if (o)e.extend(o.options, i); else {
                            var a = e.extend({}, e.fn.layout.defaults, e.fn.layout.parseOptions(this), i);
                            e.data(this, "layout", {
                                options: a,
                                epanels: {center: e(), north: e(), south: e(), east: e(), west: e()}
                            }), n(this)
                        }
                        t(this), l(this)
                    }))
                }, e.fn.layout.methods = {
                    options: function (t) {
                        return e.data(t[0], "layout").options
                    }, resize: function (e, n) {
                        return e.each(function () {
                            t(this, n)
                        })
                    }, epanel: function (t, n) {
                        return e.data(t[0], "layout").epanels[n]
                    }, collapse: function (e, t) {
                        return e.each(function () {
                            a(this, t)
                        })
                    }, expand: function (e, t) {
                        return e.each(function () {
                            r(this, t)
                        })
                    }, add: function (n, o) {
                        return n.each(function () {
                            i(this, o), t(this), e(this).layout("epanel", o.region).epanel("options").collapsed && a(this, o.region, 0)
                        })
                    }, remove: function (e, n) {
                        return e.each(function () {
                            o(this, n), t(this)
                        })
                    }, split: function (e, t) {
                        return e.each(function () {
                            d(this, t, !0)
                        })
                    }, unsplit: function (e, t) {
                        return e.each(function () {
                            d(this, t, !1)
                        })
                    }
                }, e.fn.layout.parseOptions = function (t) {
                    return e.extend({}, e.parser.parseOptions(t, [{fit: "boolean"}]))
                }, e.fn.layout.defaults = {fit: !1}, e.fn.layout.parseepanelOptions = function (t) {
                    e(t);
                    return e.extend({}, e.fn.epanel.parseOptions(t), e.parser.parseOptions(t, ["region", {
                        split: "boolean",
                        collpasedSize: "number",
                        minWidth: "number",
                        minHeight: "number",
                        maxWidth: "number",
                        maxHeight: "number"
                    }]))
                }, e.fn.layout.epaneldefaults = e.extend({}, e.fn.epanel.defaults, {
                    region: null,
                    split: !1,
                    collapsedSize: 28,
                    minWidth: 10,
                    minHeight: 10,
                    maxWidth: 1e4,
                    maxHeight: 1e4
                })
            }(jQuery), function ($) {
                function init(e) {
                    function t(e) {
                        var n = [];
                        return e.addClass("menu"), n.push(e), e.hasClass("menu-content") || e.children("div").each(function () {
                            var e = $(this).children("div");
                            if (e.length) {
                                e.appendTo("body"), this.submenu = e;
                                var i = t(e);
                                n = n.concat(i)
                            }
                        }), n
                    }

                    function n(t) {
                        var n = $.parser.parseOptions(t[0], ["width", "height"]);
                        t[0].originalHeight = n.height || 0, t.hasClass("menu-content") ? t[0].originalWidth = n.width || t._outerWidth() : (t[0].originalWidth = n.width || 0, t.children("div").each(function () {
                            var t = $(this), n = $.extend({}, $.parser.parseOptions(this, ["name", "iconCls", "href", {separator: "boolean"}]), {disabled: !!t.attr("disabled") || void 0});
                            if (n.separator && t.addClass("menu-sep"), !t.hasClass("menu-sep")) {
                                t[0].itemName = n.name || "", t[0].itemHref = n.href || "";
                                var i = t.addClass("menu-item").html();
                                t.empty().append($('<div class="menu-text"></div>').html(i)), n.iconCls && $('<div class="menu-icon"></div>').addClass(n.iconCls).appendTo(t), n.disabled && _3e6(e, t[0], !0), t[0].submenu && $('<div class="menu-rightarrow"></div>').appendTo(t), _3e7(e, t)
                            }
                        }), $('<div class="menu-line"></div>').prependTo(t)), _3e8(e, t), t.hasClass("menu-inline") || t.hide(), _3e9(e, t)
                    }

                    var i = $.data(e, "menu").options;
                    $(e).addClass("menu-top"), i.inline ? $(e).addClass("menu-inline") : $(e).appendTo("body"), $(e).bind("_resize", function (t, n) {
                        return ($(this).hasClass("eui-fluid") || n) && $(e).menu("resize", e), !1
                    });
                    for (var o = t($(e)), a = 0; a < o.length; a++)n(o[a])
                }

                function _3e8(e, t) {
                    var n = $.data(e, "menu").options, i = t.attr("style") || "";
                    t.css({
                        display: "block",
                        left: -1e4,
                        height: "auto",
                        overflow: "hidden"
                    }), t.find(".menu-item").each(function () {
                        $(this)._outerHeight(n.itemHeight), $(this).find(".menu-text").css({
                            height: n.itemHeight - 2 + "px",
                            lineHeight: n.itemHeight - 2 + "px"
                        })
                    }), t.removeClass("menu-noline").addClass(n.noline ? "menu-noline" : "");
                    var o = t[0].originalWidth || "auto";
                    isNaN(parseInt(o)) && (o = 0, t.find("div.menu-text").each(function () {
                        o < $(this)._outerWidth() && (o = $(this)._outerWidth())
                    }), o += 40);
                    var a = t.outerHeight(), r = t[0].originalHeight || "auto";
                    if (isNaN(parseInt(r)))if (r = a, t.hasClass("menu-top") && n.alignTo) {
                        var s = $(n.alignTo), l = s.offset().top - $(document).scrollTop(), d = $(window)._outerHeight() + $(document).scrollTop() - s.offset().top - s._outerHeight();
                        r = Math.min(r, Math.max(l, d))
                    } else r > $(window)._outerHeight() && (r = $(window).height());
                    t.attr("style", i), t._size({
                        fit: t[0] == e && n.fit,
                        width: o,
                        minWidth: n.minWidth,
                        height: r
                    }), t.css("overflow", t.outerHeight() < a ? "auto" : "hidden"), t.children("div.menu-line")._outerHeight(a - 2)
                }

                function _3e9(e, t) {
                    if (!t.hasClass("menu-inline")) {
                        var n = $.data(e, "menu");
                        t.unbind(".menu").bind("mouseenter.menu", function () {
                            n.timer && (clearTimeout(n.timer), n.timer = null)
                        }).bind("mouseleave.menu", function () {
                            n.options.hideOnUnhover && (n.timer = setTimeout(function () {
                                _3f1(e, $(e).hasClass("menu-inline"))
                            }, n.options.duration))
                        })
                    }
                }

                function _3e7(e, t) {
                    t.hasClass("menu-item") && (t.unbind(".menu"), t.bind("click.menu", function () {
                        if (!$(this).hasClass("menu-item-disabled")) {
                            if (!this.submenu) {
                                _3f1(e, $(e).hasClass("menu-inline"));
                                var t = this.itemHref;
                                t && (location.href = t)
                            }
                            $(this).trigger("mouseenter");
                            var n = $(e).menu("getItem", this);
                            $.data(e, "menu").options.onClick.call(e, n)
                        }
                    }).bind("mouseenter.menu", function (n) {
                        if (t.siblings().each(function () {
                                this.submenu && _3dd(this.submenu), $(this).removeClass("menu-active")
                            }), t.addClass("menu-active"), $(this).hasClass("menu-item-disabled"))return void t.addClass("menu-active-disabled");
                        var i = t[0].submenu;
                        i && $(e).menu("show", {menu: i, parent: t})
                    }).bind("mouseleave.menu", function (e) {
                        t.removeClass("menu-active menu-active-disabled");
                        var n = t[0].submenu;
                        n ? e.pageX >= parseInt(n.css("left")) ? t.addClass("menu-active") : _3dd(n) : t.removeClass("menu-active")
                    }))
                }

                function _3f1(e, t) {
                    var n = $.data(e, "menu");
                    return n && $(e).is(":visible") && (_3dd($(e)), t ? $(e).show() : n.options.onHide.call(e)), !1
                }

                function _3f8(e, t) {
                    function n(e, t) {
                        return e + a.outerHeight() > $(window)._outerHeight() + $(document).scrollTop() && (e = t ? $(t).offset().top - a._outerHeight() : $(window)._outerHeight() + $(document).scrollTop() - a.outerHeight()), e < 0 && (e = 0), e
                    }

                    var i, o;
                    t = t || {};
                    var a = $(t.menu || e);
                    if ($(e).menu("resize", a[0]), a.hasClass("menu-top")) {
                        var r = $.data(e, "menu").options;
                        if ($.extend(r, t), i = r.left, o = r.top, r.alignTo) {
                            var s = $(r.alignTo);
                            i = s.offset().left, o = s.offset().top + s._outerHeight(), "right" == r.align && (i += s.outerWidth() - a.outerWidth())
                        }
                        i + a.outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft() && (i = $(window)._outerWidth() + $(document).scrollLeft() - a.outerWidth() - 5), i < 0 && (i = 0), o = n(o, r.alignTo)
                    } else {
                        var l = t.parent;
                        i = l.offset().left + l.outerWidth() - 2, i + a.outerWidth() + 5 > $(window)._outerWidth() + $(document).scrollLeft() && (i = l.offset().left - a.outerWidth() + 2), o = n(l.offset().top - 3)
                    }
                    a.css({left: i, top: o}), a.show(0, function () {
                        a[0].shadow || (a[0].shadow = $('<div class="menu-shadow"></div>').insertAfter(a)), a[0].shadow.css({
                            display: a.hasClass("menu-inline") ? "none" : "block",
                            zIndex: $.fn.menu.defaults.zIndex++,
                            left: a.css("left"),
                            top: a.css("top"),
                            width: a.outerWidth(),
                            height: a.outerHeight()
                        }), a.css("z-index", $.fn.menu.defaults.zIndex++), a.hasClass("menu-top") && $.data(a[0], "menu").options.onShow.call(a[0])
                    })
                }

                function _3dd(e) {
                    function t(e) {
                        e.stop(!0, !0), e[0].shadow && e[0].shadow.hide(), e.hide()
                    }

                    e && e.length && (t(e), e.find("div.menu-item").each(function () {
                        this.submenu && _3dd(this.submenu), $(this).removeClass("menu-active");
                    }))
                }

                function _3ff(e, t) {
                    function n(a) {
                        a.children("div.menu-item").each(function () {
                            var a = $(e).menu("getItem", this), r = o.empty().html(a.text).text();
                            t == $.trim(r) ? i = a : this.submenu && !i && n(this.submenu)
                        })
                    }

                    var i = null, o = $("<div></div>");
                    return n($(e)), o.remove(), i
                }

                function _3e6(e, t, n) {
                    var i = $(t);
                    i.hasClass("menu-item") && (n ? (i.addClass("menu-item-disabled"), t.onclick && (t.onclick1 = t.onclick, t.onclick = null)) : (i.removeClass("menu-item-disabled"), t.onclick1 && (t.onclick = t.onclick1, t.onclick1 = null)))
                }

                function _405(_406, _407) {
                    var opts = $.data(_406, "menu").options, menu = $(_406);
                    if (_407.parent) {
                        if (!_407.parent.submenu) {
                            var _408 = $('<div class="menu"><div class="menu-line"></div></div>').appendTo("body");
                            _408.hide(), _407.parent.submenu = _408, $('<div class="menu-rightarrow"></div>').appendTo(_407.parent)
                        }
                        menu = _407.parent.submenu
                    }
                    if (_407.separator)var item = $('<div class="menu-sep"></div>').appendTo(menu); else {
                        var item = $('<div class="menu-item"></div>').appendTo(menu);
                        $('<div class="menu-text"></div>').html(_407.text).appendTo(item)
                    }
                    _407.iconCls && $('<div class="menu-icon"></div>').addClass(_407.iconCls).appendTo(item), _407.id && item.attr("id", _407.id), _407.name && (item[0].itemName = _407.name), _407.href && (item[0].itemHref = _407.href), _407.onclick && ("string" == typeof _407.onclick ? item.attr("onclick", _407.onclick) : item[0].onclick = eval(_407.onclick)), _407.handler && (item[0].onclick = eval(_407.handler)), _407.disabled && _3e6(_406, item[0], !0), _3e7(_406, item), _3e9(_406, menu), _3e8(_406, menu)
                }

                function _409(e, t) {
                    function n(e) {
                        if (e.submenu) {
                            e.submenu.children("div.menu-item").each(function () {
                                n(this)
                            });
                            var t = e.submenu[0].shadow;
                            t && t.remove(), e.submenu.remove()
                        }
                        $(e).remove()
                    }

                    var i = $(t).parent();
                    n(t), _3e8(e, i)
                }

                function _40e(e, t, n) {
                    var i = $(t).parent();
                    n ? $(t).show() : $(t).hide(), _3e8(e, i)
                }

                function _412(e) {
                    $(e).children("div.menu-item").each(function () {
                        _409(e, this)
                    }), e.shadow && e.shadow.remove(), $(e).remove()
                }

                $(function () {
                    $(document).unbind(".menu").bind("mousedown.menu", function (e) {
                        var t = $(e.target).closest("div.menu,div.combo-p");
                        t.length || ($("body>div.menu-top:visible").not(".menu-inline").menu("hide"), _3dd($("body>div.menu:visible").not(".menu-inline")))
                    })
                }), $.fn.menu = function (e, t) {
                    return "string" == typeof e ? $.fn.menu.methods[e](this, t) : (e = e || {}, this.each(function () {
                        var t = $.data(this, "menu");
                        t ? $.extend(t.options, e) : (t = $.data(this, "menu", {options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), e)}), init(this)), $(this).css({
                            left: t.options.left,
                            top: t.options.top
                        })
                    }))
                }, $.fn.menu.methods = {
                    options: function (e) {
                        return $.data(e[0], "menu").options
                    }, show: function (e, t) {
                        return e.each(function () {
                            _3f8(this, t)
                        })
                    }, hide: function (e) {
                        return e.each(function () {
                            _3f1(this)
                        })
                    }, destroy: function (e) {
                        return e.each(function () {
                            _412(this)
                        })
                    }, setText: function (e, t) {
                        return e.each(function () {
                            $(t.target).children("div.menu-text").html(t.text)
                        })
                    }, setIcon: function (e, t) {
                        return e.each(function () {
                            $(t.target).children("div.menu-icon").remove(), t.iconCls && $('<div class="menu-icon"></div>').addClass(t.iconCls).appendTo(t.target)
                        })
                    }, getItem: function (e, t) {
                        var n = $(t), i = {
                            target: t,
                            id: n.attr("id"),
                            text: $.trim(n.children("div.menu-text").html()),
                            disabled: n.hasClass("menu-item-disabled"),
                            name: t.itemName,
                            href: t.itemHref,
                            onclick: t.onclick
                        }, o = n.children("div.menu-icon");
                        if (o.length) {
                            for (var a = [], r = o.attr("class").split(" "), s = 0; s < r.length; s++)"menu-icon" != r[s] && a.push(r[s]);
                            i.iconCls = a.join(" ")
                        }
                        return i
                    }, findItem: function (e, t) {
                        return _3ff(e[0], t)
                    }, appendItem: function (e, t) {
                        return e.each(function () {
                            _405(this, t)
                        })
                    }, removeItem: function (e, t) {
                        return e.each(function () {
                            _409(this, t)
                        })
                    }, enableItem: function (e, t) {
                        return e.each(function () {
                            _3e6(this, t, !1)
                        })
                    }, disableItem: function (e, t) {
                        return e.each(function () {
                            _3e6(this, t, !0)
                        })
                    }, showItem: function (e, t) {
                        return e.each(function () {
                            _40e(this, t, !0)
                        })
                    }, hideItem: function (e, t) {
                        return e.each(function () {
                            _40e(this, t, !1)
                        })
                    }, resize: function (e, t) {
                        return e.each(function () {
                            _3e8(this, $(t))
                        })
                    }
                }, $.fn.menu.parseOptions = function (e) {
                    return $.extend({}, $.parser.parseOptions(e, [{
                        minWidth: "number",
                        itemHeight: "number",
                        duration: "number",
                        hideOnUnhover: "boolean"
                    }, {fit: "boolean", inline: "boolean", noline: "boolean"}]))
                }, $.fn.menu.defaults = {
                    zIndex: 11e4,
                    left: 0,
                    top: 0,
                    alignTo: null,
                    align: "left",
                    minWidth: 120,
                    itemHeight: 22,
                    duration: 100,
                    hideOnUnhover: !0,
                    inline: !1,
                    fit: !1,
                    noline: !1,
                    onShow: function () {
                    },
                    onHide: function () {
                    },
                    onClick: function (e) {
                    }
                }
            }(jQuery), function (e) {
                function t(t) {
                    var n = e.data(t, "menubutton").options, i = e(t);
                    if (i.linkbutton(n), n.hasDownArrow) {
                        i.removeClass(n.cls.btn1 + " " + n.cls.btn2).addClass("m-btn"), i.removeClass("m-btn-small m-btn-medium m-btn-large").addClass("m-btn-" + n.size);
                        var o = i.find(".l-btn-left");
                        e("<span></span>").addClass(n.cls.arrow).appendTo(o), e("<span></span>").addClass("m-btn-line").appendTo(o)
                    }
                    if (e(t).menubutton("resize"), n.menu) {
                        e(n.menu).menu({duration: n.duration});
                        var a = e(n.menu).menu("options"), r = a.onShow, s = a.onHide;
                        e.extend(a, {
                            onShow: function () {
                                var t = e(this).menu("options"), n = e(t.alignTo), i = n.menubutton("options");
                                n.addClass(1 == i.plain ? i.cls.btn2 : i.cls.btn1), r.call(this)
                            }, onHide: function () {
                                var t = e(this).menu("options"), n = e(t.alignTo), i = n.menubutton("options");
                                n.removeClass(1 == i.plain ? i.cls.btn2 : i.cls.btn1), s.call(this)
                            }
                        })
                    }
                }

                function n(t) {
                    function n() {
                        return e(t).linkbutton("options").disabled
                    }

                    var o = e.data(t, "menubutton").options, a = e(t), r = a.find("." + o.cls.trigger);
                    r.length || (r = a), r.unbind(".menubutton");
                    var s = null;
                    r.bind("click.menubutton", function () {
                        if (!n())return i(t), !1
                    }).bind("mouseenter.menubutton", function () {
                        if (!n())return s = setTimeout(function () {
                            i(t)
                        }, o.duration), !1
                    }).bind("mouseleave.menubutton", function () {
                        s && clearTimeout(s), e(o.menu).triggerHandler("mouseleave")
                    })
                }

                function i(t) {
                    var n = e(t).menubutton("options");
                    if (!n.disabled && n.menu) {
                        e("body>div.menu-top").menu("hide");
                        var i = e(t), o = e(n.menu);
                        o.length && (o.menu("options").alignTo = i, o.menu("show", {
                            alignTo: i,
                            align: n.menuAlign
                        })), i.blur()
                    }
                }

                e.fn.menubutton = function (i, o) {
                    if ("string" == typeof i) {
                        var a = e.fn.menubutton.methods[i];
                        return a ? a(this, o) : this.linkbutton(i, o)
                    }
                    return i = i || {}, this.each(function () {
                        var o = e.data(this, "menubutton");
                        o ? e.extend(o.options, i) : (e.data(this, "menubutton", {options: e.extend({}, e.fn.menubutton.defaults, e.fn.menubutton.parseOptions(this), i)}), e(this).removeAttr("disabled")), t(this), n(this)
                    })
                }, e.fn.menubutton.methods = {
                    options: function (t) {
                        var n = t.linkbutton("options");
                        return e.extend(e.data(t[0], "menubutton").options, {
                            toggle: n.toggle,
                            selected: n.selected,
                            disabled: n.disabled
                        })
                    }, destroy: function (t) {
                        return t.each(function () {
                            var t = e(this).menubutton("options");
                            t.menu && e(t.menu).menu("destroy"), e(this).remove()
                        })
                    }
                }, e.fn.menubutton.parseOptions = function (t) {
                    e(t);
                    return e.extend({}, e.fn.linkbutton.parseOptions(t), e.parser.parseOptions(t, ["menu", {
                        plain: "boolean",
                        hasDownArrow: "boolean",
                        duration: "number"
                    }]))
                }, e.fn.menubutton.defaults = e.extend({}, e.fn.linkbutton.defaults, {
                    plain: !0,
                    hasDownArrow: !0,
                    menu: null,
                    menuAlign: "left",
                    duration: 100,
                    cls: {btn1: "m-btn-active", btn2: "m-btn-plain-active", arrow: "m-btn-downarrow", trigger: "m-btn"}
                })
            }(jQuery), function (e) {
                function t(t) {
                    var n = e.data(t, "splitbutton").options;
                    e(t).menubutton(n), e(t).addClass("s-btn")
                }

                e.fn.splitbutton = function (n, i) {
                    if ("string" == typeof n) {
                        var o = e.fn.splitbutton.methods[n];
                        return o ? o(this, i) : this.menubutton(n, i)
                    }
                    return n = n || {}, this.each(function () {
                        var i = e.data(this, "splitbutton");
                        i ? e.extend(i.options, n) : (e.data(this, "splitbutton", {options: e.extend({}, e.fn.splitbutton.defaults, e.fn.splitbutton.parseOptions(this), n)}), e(this).removeAttr("disabled")), t(this)
                    })
                }, e.fn.splitbutton.methods = {
                    options: function (t) {
                        var n = t.menubutton("options"), i = e.data(t[0], "splitbutton").options;
                        return e.extend(i, {disabled: n.disabled, toggle: n.toggle, selected: n.selected}), i
                    }
                }, e.fn.splitbutton.parseOptions = function (t) {
                    e(t);
                    return e.extend({}, e.fn.linkbutton.parseOptions(t), e.parser.parseOptions(t, ["menu", {
                        plain: "boolean",
                        duration: "number"
                    }]))
                }, e.fn.splitbutton.defaults = e.extend({}, e.fn.linkbutton.defaults, {
                    plain: !0,
                    menu: null,
                    duration: 100,
                    cls: {
                        btn1: "m-btn-active s-btn-active",
                        btn2: "m-btn-plain-active s-btn-plain-active",
                        arrow: "m-btn-downarrow",
                        trigger: "m-btn-line"
                    }
                })
            }(jQuery), function ($) {
                function init(e) {
                    $(e).addClass("validatebox-text")
                }

                function _43e(e) {
                    var t = $.data(e, "validatebox");
                    t.validating = !1, t.timer && clearTimeout(t.timer), $(e).etooltip("destroy"), $(e).unbind(), $(e).remove()
                }

                function _441(e) {
                    var t = $.data(e, "validatebox").options, n = $(e);
                    if (n.unbind(".validatebox"), !t.novalidate && !n.is(":disabled"))for (var i in t.events)$(e).bind(i + ".validatebox", {target: e}, t.events[i])
                }

                function _444(e) {
                    var t = e.data.target, n = $.data(t, "validatebox"), i = $(t);
                    $(t).attr("readonly") || (n.validating = !0, n.value = void 0, function () {
                        n.validating && (n.value != i.val() ? (n.value = i.val(), n.timer && clearTimeout(n.timer), n.timer = setTimeout(function () {
                            $(t).validatebox("validate")
                        }, n.options.delay)) : _447(t), setTimeout(arguments.callee, 200))
                    }())
                }

                function _448(e) {
                    var t = e.data.target, n = $.data(t, "validatebox");
                    n.timer && (clearTimeout(n.timer), n.timer = void 0), n.validating = !1, _44b(t)
                }

                function _44c(e) {
                    var t = e.data.target;
                    $(t).hasClass("validatebox-invalid") && _44e(t)
                }

                function _44f(e) {
                    var t = e.data.target, n = $.data(t, "validatebox");
                    n.validating || _44b(t)
                }

                function _44e(e) {
                    var t = $.data(e, "validatebox"), n = t.options;
                    $(e).etooltip($.extend({}, n.tipOptions, {
                        content: t.message,
                        position: n.tipPosition,
                        deltaX: n.deltaX
                    })).etooltip("show"), t.tip = !0
                }

                function _447(e) {
                    var t = $.data(e, "validatebox");
                    t && t.tip && $(e).etooltip("reposition")
                }

                function _44b(e) {
                    var t = $.data(e, "validatebox");
                    t.tip = !1, $(e).etooltip("hide")
                }

                function _458(_459) {
                    function _45d(e) {
                        _45a.message = e
                    }

                    function _45e(_45f, _460) {
                        var _461 = box.val(), _462 = /([a-zA-Z_]+)(.*)/.exec(_45f), rule = opts.rules[_462[1]];
                        if (rule && _461) {
                            var _463 = _460 || opts.validParams || eval(_462[2]);
                            if (!rule.validator.call(_459, _461, _463)) {
                                box.addClass("validatebox-invalid");
                                var _464 = rule.message;
                                if (_463)for (var i = 0; i < _463.length; i++)_464 = _464.replace(new RegExp("\\{" + i + "\\}", "g"), _463[i]);
                                return _45d(opts.invalidMessage || _464), _45a.validating && _44e(_459), !1
                            }
                        }
                        return !0
                    }

                    function _45c() {
                        if (box.removeClass("validatebox-invalid"), _44b(_459), opts.novalidate || box.is(":disabled"))return !0;
                        if (opts.required && ("" == box.val() && !box.attr("contenteditable") || box.attr("contenteditable") && "" == $.trim(box.html())))return box.addClass("validatebox-invalid"), _45d(opts.missingMessage), _45a.validating && _44e(_459), !1;
                        if (opts.validType)if ($.isArray(opts.validType)) {
                            for (var e = 0; e < opts.validType.length; e++)if (!_45e(opts.validType[e]))return !1
                        } else if ("string" == typeof opts.validType) {
                            if (!_45e(opts.validType))return !1
                        } else for (var t in opts.validType) {
                            var n = opts.validType[t];
                            if (!_45e(t, n))return !1
                        }
                        return !0
                    }

                    var _45a = $.data(_459, "validatebox"), opts = _45a.options, box = $(_459);
                    opts.onBeforeValidate.call(_459);
                    var _45b = _45c();
                    return opts.onValidate.call(_459, _45b), _45b
                }

                function _467(e, t) {
                    var n = $.data(e, "validatebox").options;
                    void 0 != t && (n.novalidate = t), n.novalidate && ($(e).removeClass("validatebox-invalid"), _44b(e)), _458(e), _441(e)
                }

                $.fn.validatebox = function (e, t) {
                    return "string" == typeof e ? $.fn.validatebox.methods[e](this, t) : (e = e || {}, this.each(function () {
                        var t = $.data(this, "validatebox");
                        t ? $.extend(t.options, e) : (init(this), $.data(this, "validatebox", {options: $.extend({}, $.fn.validatebox.defaults, $.fn.validatebox.parseOptions(this), e)})), _467(this), _458(this)
                    }))
                }, $.fn.validatebox.methods = {
                    options: function (e) {
                        return $.data(e[0], "validatebox").options
                    }, destroy: function (e) {
                        return e.each(function () {
                            _43e(this)
                        })
                    }, validate: function (e) {
                        return e.each(function () {
                            _458(this)
                        })
                    }, isValid: function (e) {
                        return _458(e[0])
                    }, enableValidation: function (e) {
                        return e.each(function () {
                            _467(this, !1)
                        })
                    }, disableValidation: function (e) {
                        return e.each(function () {
                            _467(this, !0)
                        })
                    }
                }, $.fn.validatebox.parseOptions = function (e) {
                    var t = $(e);
                    return $.extend({}, $.parser.parseOptions(e, ["validType", "missingMessage", "invalidMessage", "tipPosition", {
                        delay: "number",
                        deltaX: "number"
                    }]), {
                        required: !!t.attr("required") || void 0,
                        novalidate: void 0 != t.attr("novalidate") || void 0
                    })
                }, $.fn.validatebox.defaults = {
                    required: !1,
                    validType: null,
                    validParams: null,
                    delay: 200,
                    missingMessage: "该项必须填写",
                    invalidMessage: null,
                    tipPosition: "right",
                    deltaX: 0,
                    novalidate: !1,
                    events: {
                        focus: _444, blur: _448, mouseenter: _44c, mouseleave: _44f, click: function (e) {
                            var t = $(e.data.target);
                            t.is(":focus") || t.trigger("focus")
                        }
                    },
                    tipOptions: {
                        showEvent: "none",
                        hideEvent: "none",
                        showDelay: 0,
                        hideDelay: 0,
                        zIndex: "",
                        onShow: function () {
                            $(this).etooltip("tip").css({
                                color: "#000",
                                borderColor: "#CC9933",
                                backgroundColor: "#FFFFCC"
                            })
                        },
                        onHide: function () {
                            $(this).etooltip("destroy")
                        }
                    },
                    rules: {
                        chinese: {
                            validator: function (e) {
                                return /^[\u0391-\uFFE5]+$/.test(e)
                            }, message: "请输入纯中文"
                        }, mobile: {
                            validator: function (e) {
                                var t = /^1\d{10}$/;
                                return t.test(e)
                            }, message: "手机号码格式错误"
                        }, zipCode: {
                            validator: function (e) {
                                var t = /^[0-9]\d{5}$/;
                                return t.test(e)
                            }, message: "邮编格式错误"
                        }, number: {
                            validator: function (e) {
                                var t = /^[0-9]*$/;
                                return t.test(e)
                            }, message: "请输入纯数字"
                        }, email: {
                            validator: function (e) {
                                return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(e)
                            }, message: "Email格式错误"
                        }, url: {
                            validator: function (e) {
                                return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)
                            }, message: "网址格式错误"
                        }, length: {
                            validator: function (e, t) {
                                var n = $.trim(e).length;
                                return n >= t[0] && n <= t[1]
                            }, message: "请输入{0}个到{1}个字符"
                        }, remote: {
                            validator: function (e, t) {
                                var n = {};
                                n[t[1]] = e;
                                var i = $.ajax({
                                    url: t[0],
                                    dataType: "json",
                                    data: n,
                                    async: !1,
                                    cache: !1,
                                    type: "post"
                                }).responseText;
                                return "true" == i
                            }, message: "填写错误, 请更正"
                        }
                    },
                    onBeforeValidate: function () {
                    },
                    onValidate: function (e) {
                    }
                }, $.extendValidateRules = function (e) {
                    return $.extend($.fn.validatebox.defaults.rules, e)
                }
            }(jQuery), function (e) {
                function t(t) {
                    e(t).addClass("textbox-f").hide();
                    var n = e('<span class="textbox"><input class="textbox-text" autocomplete="off"><input type="hidden" class="textbox-value"></span>').insertAfter(t), i = e(t).attr("name");
                    return i && (n.find("input.textbox-value").attr("name", i), e(t).removeAttr("name").attr("textboxName", i)), n
                }

                function n(t) {
                    var n = e.data(t, "textbox"), i = n.options, o = n.textbox;
                    o.find(".textbox-text").remove(), i.multiline ? e('<textarea class="textbox-text" autocomplete="off"></textarea>').prependTo(o) : e('<input type="' + i.type + '" class="textbox-text" autocomplete="off">').prependTo(o), o.find(".textbox-addon").remove();
                    var a = i.icons ? e.extend(!0, [], i.icons) : [];
                    if (i.iconCls && a.push({iconCls: i.iconCls, disabled: !0}), a.length) {
                        var r = e('<span class="textbox-addon"></span>').prependTo(o);
                        r.addClass("textbox-addon-" + i.iconAlign);
                        for (var d = 0; d < a.length; d++)r.append('<a href="javascript:void(0)" class="textbox-icon ' + a[d].iconCls + '" icon-index="' + d + '" tabindex="-1"></a>')
                    }
                    if (o.find(".textbox-button").remove(), i.buttonText || i.buttonIcon) {
                        var c = e('<a href="javascript:void(0)" class="textbox-button"></a>').prependTo(o);
                        c.addClass("textbox-button-" + i.buttonAlign).linkbutton({
                            text: i.buttonText,
                            iconCls: i.buttonIcon
                        })
                    }
                    s(t, i.disabled), l(t, i.readonly)
                }

                function i(t) {
                    var n = e.data(t, "textbox").textbox;
                    n.find(".textbox-text").validatebox("destroy"), n.remove(), e(t).remove()
                }

                function o(t, n) {
                    function i(e) {
                        return (a.iconAlign == e ? f._outerWidth() : 0) + (a.buttonAlign == e ? u._outerWidth() : 0)
                    }

                    var o = e.data(t, "textbox"), a = o.options, r = o.textbox, s = r.parent();
                    if (n && (a.width = n), isNaN(parseInt(a.width))) {
                        var l = e(t).clone();
                        l.css("visibility", "hidden"), l.insertAfter(t), a.width = l.outerWidth(), l.remove()
                    }
                    var d = r.is(":visible");
                    d || r.appendTo("body");
                    var c = r.find(".textbox-text"), u = r.find(".textbox-button"), f = r.find(".textbox-addon"), p = f.find(".textbox-icon");
                    if (r._size(a, s), u.linkbutton("resize", {height: r.height()}), u.css({
                            left: "left" == a.buttonAlign ? 0 : "",
                            right: "right" == a.buttonAlign ? 0 : ""
                        }), f.css({
                            left: "left" == a.iconAlign ? "left" == a.buttonAlign ? u._outerWidth() : 0 : "",
                            right: "right" == a.iconAlign ? "right" == a.buttonAlign ? u._outerWidth() : 0 : ""
                        }), p.css({
                            width: a.iconWidth + "px",
                            height: r.height() + "px"
                        }), c.css({
                            paddingLeft: t.style.paddingLeft || "",
                            paddingRight: t.style.paddingRight || "",
                            marginLeft: i("left"),
                            marginRight: i("right")
                        }), a.multiline)c.css({
                        paddingTop: t.style.paddingTop || "",
                        paddingBottom: t.style.paddingBottom || ""
                    }), c._outerHeight(r.height()); else {
                        var h = Math.floor((r.height() - c.height()) / 2);
                        c.css({paddingTop: h + "px", paddingBottom: h + "px"})
                    }
                    c._outerWidth(r.width() - p.length * a.iconWidth - u._outerWidth()), d || r.insertAfter(t), a.onResize.call(t, a.width, a.height)
                }

                function a(t) {
                    var n = e(t).textbox("options"), i = e(t).textbox("textbox");
                    i.validatebox(e.extend({}, n, {
                        deltaX: e(t).textbox("getTipX"), onBeforeValidate: function () {
                            var t = e(this);
                            t.is(":focus") || (n.oldInputValue = t.val(), t.val(n.value))
                        }, onValidate: function (t) {
                            var i = e(this);
                            void 0 != n.oldInputValue && (i.val(n.oldInputValue), n.oldInputValue = void 0);
                            var o = i.parent();
                            t ? o.removeClass("textbox-invalid") : o.addClass("textbox-invalid")
                        }
                    }))
                }

                function r(t) {
                    var n = e.data(t, "textbox"), i = n.options, a = n.textbox, r = a.find(".textbox-text");
                    if (r.attr("placeholder", i.prompt), r.unbind(".textbox"), !i.disabled && !i.readonly) {
                        r.bind("blur.textbox", function (t) {
                            a.hasClass("textbox-focused") && (i.value = e(this).val(), "" == i.value ? e(this).val(i.prompt).addClass("textbox-prompt") : e(this).removeClass("textbox-prompt"), a.removeClass("textbox-focused"))
                        }).bind("focus.textbox", function (t) {
                            a.hasClass("textbox-focused") || (e(this).val() != i.value && e(this).val(i.value), e(this).removeClass("textbox-prompt"), a.addClass("textbox-focused"))
                        });
                        for (var s in i.inputEvents)r.bind(s + ".textbox", {target: t}, i.inputEvents[s])
                    }
                    var l = a.find(".textbox-addon");
                    l.unbind().bind("click", {target: t}, function (n) {
                        var o = e(n.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
                        if (o.length) {
                            var a = parseInt(o.attr("icon-index")), r = i.icons[a];
                            r && r.handler && (r.handler.call(o[0], n), i.onClickIcon.call(t, a))
                        }
                    }), l.find(".textbox-icon").each(function (t) {
                        var n = i.icons[t], o = e(this);
                        !n || n.disabled || i.disabled || i.readonly ? o.addClass("textbox-icon-disabled") : o.removeClass("textbox-icon-disabled")
                    });
                    var d = a.find(".textbox-button");
                    d.unbind(".textbox").bind("click.textbox", function () {
                        d.linkbutton("options").disabled || i.onClickButton.call(t)
                    }), d.linkbutton(i.disabled || i.readonly ? "disable" : "enable"), a.unbind(".textbox").bind("_resize.textbox", function (n, i) {
                        return (e(this).hasClass("eui-fluid") || i) && o(t), !1
                    })
                }

                function s(t, n) {
                    var i = e.data(t, "textbox"), o = i.options, a = i.textbox;
                    n ? (o.disabled = !0, e(t).attr("disabled", "disabled"), a.addClass("textbox-disabled"), a.find(".textbox-text,.textbox-value").attr("disabled", "disabled")) : (o.disabled = !1, a.removeClass("textbox-disabled"), e(t).removeAttr("disabled"), a.find(".textbox-text,.textbox-value").removeAttr("disabled"))
                }

                function l(t, n) {
                    var i = e.data(t, "textbox"), o = i.options;
                    o.readonly = void 0 == n || n, i.textbox.removeClass("textbox-readonly").addClass(o.readonly ? "textbox-readonly" : "");
                    var a = i.textbox.find(".textbox-text");
                    a.removeAttr("readonly"), !o.readonly && o.editable || a.attr("readonly", "readonly")
                }

                e.fn.textbox = function (i, s) {
                    if ("string" == typeof i) {
                        var l = e.fn.textbox.methods[i];
                        return l ? l(this, s) : this.each(function () {
                            var t = e(this).textbox("textbox");
                            t.validatebox(i, s)
                        })
                    }
                    return i = i || {}, this.each(function () {
                        var s = e.data(this, "textbox");
                        s ? (e.extend(s.options, i), void 0 != i.value && (s.options.originalValue = i.value)) : (s = e.data(this, "textbox", {
                            options: e.extend({}, e.fn.textbox.defaults, e.fn.textbox.parseOptions(this), i),
                            textbox: t(this)
                        }), s.options.originalValue = s.options.value), n(this), r(this), o(this), a(this), e(this).textbox("initValue", s.options.value)
                    })
                }, e.fn.textbox.methods = {
                    options: function (t) {
                        return e.data(t[0], "textbox").options
                    }, cloneFrom: function (t, n) {
                        return t.each(function () {
                            var t = e(this);
                            if (!t.data("textbox")) {
                                e(n).data("textbox") || e(n).textbox();
                                var i = t.attr("name") || "";
                                t.addClass("textbox-f").hide(), t.removeAttr("name").attr("textboxName", i);
                                var o = e(n).next().clone().insertAfter(t);
                                o.find("input.textbox-value").attr("name", i), e.data(this, "textbox", {
                                    options: e.extend(!0, {}, e(n).textbox("options")),
                                    textbox: o
                                });
                                var s = e(n).textbox("button");
                                s.length && t.textbox("button").linkbutton(e.extend(!0, {}, s.linkbutton("options"))), r(this), a(this)
                            }
                        })
                    }, textbox: function (t) {
                        return e.data(t[0], "textbox").textbox.find(".textbox-text")
                    }, button: function (t) {
                        return e.data(t[0], "textbox").textbox.find(".textbox-button")
                    }, destroy: function (e) {
                        return e.each(function () {
                            i(this)
                        })
                    }, resize: function (e, t) {
                        return e.each(function () {
                            o(this, t)
                        })
                    }, disable: function (e) {
                        return e.each(function () {
                            s(this, !0), r(this)
                        })
                    }, enable: function (e) {
                        return e.each(function () {
                            s(this, !1), r(this)
                        })
                    }, readonly: function (e, t) {
                        return e.each(function () {
                            l(this, t), r(this)
                        })
                    }, isValid: function (e) {
                        return e.textbox("textbox").validatebox("isValid")
                    }, clear: function (t) {
                        return t.each(function () {
                            e(this).textbox("setValue", "")
                        })
                    }, setText: function (t, n) {
                        return t.each(function () {
                            var t = e(this).textbox("options"), i = e(this).textbox("textbox");
                            e(this).textbox("getText") != n && (t.value = n, i.val(n)), i.is(":focus") || (n ? i.removeClass("textbox-prompt") : i.val(t.prompt).addClass("textbox-prompt")), e(this).textbox("validate")
                        })
                    }, initValue: function (t, n) {
                        return t.each(function () {
                            var t = e.data(this, "textbox");
                            t.options.value = "", e(this).textbox("setText", n), t.textbox.find(".textbox-value").val(n), e(this).val(n)
                        })
                    }, setValue: function (t, n) {
                        return t.each(function () {
                            var t = e.data(this, "textbox").options, i = e(this).textbox("getValue");
                            e(this).textbox("initValue", n), i != n && (t.onChange.call(this, n, i), e(this).closest("form").trigger("_change", [this]))
                        })
                    }, getText: function (e) {
                        var t = e.textbox("textbox");
                        return t.is(":focus") ? t.val() : e.textbox("options").value
                    }, getValue: function (e) {
                        return e.data("textbox").textbox.find(".textbox-value").val()
                    }, reset: function (t) {
                        return t.each(function () {
                            var t = e(this).textbox("options");
                            e(this).textbox("setValue", t.originalValue)
                        })
                    }, getIcon: function (e, t) {
                        return e.data("textbox").textbox.find(".textbox-icon:eq(" + t + ")")
                    }, getTipX: function (e) {
                        var t = e.data("textbox"), n = t.options, i = t.textbox, o = (i.find(".textbox-text"), i.find(".textbox-addon")._outerWidth()), a = i.find(".textbox-button")._outerWidth();
                        return "right" == n.tipPosition ? ("right" == n.iconAlign ? o : 0) + ("right" == n.buttonAlign ? a : 0) + 1 : "left" == n.tipPosition ? ("left" == n.iconAlign ? -o : 0) + ("left" == n.buttonAlign ? -a : 0) - 1 : o / 2 * ("right" == n.iconAlign ? 1 : -1)
                    }
                }, e.fn.textbox.parseOptions = function (t) {
                    var n = e(t);
                    return e.extend({}, e.fn.validatebox.parseOptions(t), e.parser.parseOptions(t, ["prompt", "iconCls", "iconAlign", "buttonText", "buttonIcon", "buttonAlign", {
                        multiline: "boolean",
                        editable: "boolean",
                        iconWidth: "number"
                    }]), {
                        value: n.val() || void 0,
                        type: n.attr("type") ? n.attr("type") : void 0,
                        disabled: !!n.attr("disabled") || void 0,
                        readonly: !!n.attr("readonly") || void 0
                    })
                }, e.fn.textbox.defaults = e.extend({}, e.fn.validatebox.defaults, {
                    width: "auto",
                    height: 22,
                    prompt: "",
                    value: "",
                    type: "text",
                    multiline: !1,
                    editable: !0,
                    disabled: !1,
                    readonly: !1,
                    icons: [],
                    iconCls: null,
                    iconAlign: "right",
                    iconWidth: 18,
                    buttonText: "",
                    buttonIcon: null,
                    buttonAlign: "right",
                    inputEvents: {
                        blur: function (t) {
                            var n = e(t.data.target), i = n.textbox("options");
                            n.textbox("setValue", i.value)
                        }, keydown: function (t) {
                            if (13 == t.keyCode) {
                                var n = e(t.data.target);
                                n.textbox("setValue", n.textbox("getText"))
                            }
                        }
                    },
                    onChange: function (e, t) {
                    },
                    onResize: function (e, t) {
                    },
                    onClickButton: function () {
                    },
                    onClickIcon: function (e) {
                    }
                })
            }(jQuery), function (e) {
                function t(t) {
                    var i = e.data(t, "filebox"), o = i.options, a = "filebox_file_id_" + ++n;
                    e(t).addClass("filebox-f").textbox(o), e(t).textbox("textbox").attr("readonly", "readonly"), i.filebox = e(t).next().addClass("filebox"), i.filebox.find(".textbox-value").remove(), o.oldValue = "";
                    var r = e('<input type="file" class="textbox-value">').appendTo(i.filebox);
                    r.attr("id", a).attr("name", e(t).attr("textboxName") || ""), r.change(function () {
                        e(t).filebox("setText", this.value), o.onChange.call(t, this.value, o.oldValue), o.oldValue = this.value
                    });
                    var s = e(t).filebox("button");
                    s.length && (e('<label class="filebox-label" for="' + a + '"></label>').appendTo(s), s.linkbutton("options").disabled ? r.attr("disabled", "disabled") : r.removeAttr("disabled"))
                }

                var n = 0;
                e.fn.filebox = function (n, i) {
                    if ("string" == typeof n) {
                        var o = e.fn.filebox.methods[n];
                        return o ? o(this, i) : this.textbox(n, i)
                    }
                    return n = n || {}, this.each(function () {
                        var i = e.data(this, "filebox");
                        i ? e.extend(i.options, n) : e.data(this, "filebox", {options: e.extend({}, e.fn.filebox.defaults, e.fn.filebox.parseOptions(this), n)}), t(this)
                    })
                }, e.fn.filebox.methods = {
                    options: function (t) {
                        var n = t.textbox("options");
                        return e.extend(e.data(t[0], "filebox").options, {
                            width: n.width,
                            value: n.value,
                            originalValue: n.originalValue,
                            disabled: n.disabled,
                            readonly: n.readonly
                        })
                    }
                }, e.fn.filebox.parseOptions = function (t) {
                    return e.extend({}, e.fn.textbox.parseOptions(t), {})
                }, e.fn.filebox.defaults = e.extend({}, e.fn.textbox.defaults, {
                    buttonIcon: null,
                    buttonText: "Choose File",
                    buttonAlign: "right",
                    inputEvents: {}
                })
            }(jQuery), function ($) {
                function _4bf(e) {
                    function t() {
                        if (a.menu) {
                            o.menu = $(a.menu).menu();
                            var e = o.menu.menu("options"), t = e.onClick;
                            e.onClick = function (e) {
                                i(e), t.call(this, e)
                            }
                        } else o.menu && o.menu.menu("destroy"), o.menu = null
                    }

                    function n() {
                        if (o.menu) {
                            var e = o.menu.children("div.menu-item:first");
                            return o.menu.children("div.menu-item").each(function () {
                                var t = $.extend({}, $.parser.parseOptions(this), {selected: !!$(this).attr("selected") || void 0});
                                if (t.selected)return e = $(this), !1
                            }), o.menu.menu("getItem", e[0])
                        }
                        return null
                    }

                    function i(t) {
                        t && ($(e).textbox("button").menubutton({
                            text: t.text,
                            iconCls: t.iconCls || null,
                            menu: o.menu,
                            menuAlign: a.buttonAlign,
                            plain: !1
                        }), o.searchbox.find("input.textbox-value").attr("name", t.name || t.text), $(e).searchbox("resize"))
                    }

                    var o = $.data(e, "searchbox"), a = o.options, r = $.extend(!0, [], a.icons);
                    r.push({
                        iconCls: "searchbox-button", handler: function (e) {
                            var t = $(e.data.target), n = t.searchbox("options");
                            n.searcher.call(e.data.target, t.searchbox("getValue"), t.searchbox("getName"))
                        }
                    }), t();
                    var s = n();
                    $(e).addClass("searchbox-f").textbox($.extend({}, a, {
                        icons: r,
                        buttonText: s ? s.text : ""
                    })), $(e).attr("searchboxName", $(e).attr("textboxName")), o.searchbox = $(e).next(), o.searchbox.addClass("searchbox"), i(s)
                }

                $.fn.searchbox = function (e, t) {
                    if ("string" == typeof e) {
                        var n = $.fn.searchbox.methods[e];
                        return n ? n(this, t) : this.textbox(e, t)
                    }
                    return e = e || {}, this.each(function () {
                        var t = $.data(this, "searchbox");
                        t ? $.extend(t.options, e) : $.data(this, "searchbox", {options: $.extend({}, $.fn.searchbox.defaults, $.fn.searchbox.parseOptions(this), e)}), _4bf(this)
                    })
                }, $.fn.searchbox.methods = {
                    options: function (e) {
                        var t = e.textbox("options");
                        return $.extend($.data(e[0], "searchbox").options, {
                            width: t.width,
                            value: t.value,
                            originalValue: t.originalValue,
                            disabled: t.disabled,
                            readonly: t.readonly
                        })
                    }, menu: function (e) {
                        return $.data(e[0], "searchbox").menu
                    }, getName: function (e) {
                        return $.data(e[0], "searchbox").searchbox.find("input.textbox-value").attr("name")
                    }, selectName: function (e, t) {
                        return e.each(function () {
                            var e = $.data(this, "searchbox").menu;
                            e && e.children("div.menu-item").each(function () {
                                var n = e.menu("getItem", this);
                                if (n.name == t)return $(this).triggerHandler("click"), !1
                            })
                        })
                    }, destroy: function (e) {
                        return e.each(function () {
                            var e = $(this).searchbox("menu");
                            e && e.menu("destroy"), $(this).textbox("destroy")
                        })
                    }
                }, $.fn.searchbox.parseOptions = function (_4ce) {
                    var t = $(_4ce);
                    return $.extend({}, $.fn.textbox.parseOptions(_4ce), $.parser.parseOptions(_4ce, ["menu"]), {searcher: t.attr("searcher") ? eval(t.attr("searcher")) : void 0})
                }, $.fn.searchbox.defaults = $.extend({}, $.fn.textbox.defaults, {
                    inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                        keydown: function (e) {
                            if (13 == e.keyCode) {
                                e.preventDefault();
                                var t = $(e.data.target), n = t.searchbox("options");
                                return t.searchbox("setValue", $(this).val()), n.searcher.call(e.data.target, t.searchbox("getValue"), t.searchbox("getName")), !1
                            }
                        }
                    }), buttonAlign: "left", menu: null, searcher: function (e, t) {
                    }
                })
            }(jQuery), function (e) {
                function t(t) {
                    var n = e.data(t, "numberbox"), i = n.options;
                    e(t).addClass("numberbox-f").textbox(i), e(t).textbox("textbox").css({imeMode: "disabled"}), e(t).attr("numberboxName", e(t).attr("textboxName")), n.numberbox = e(t).next(), n.numberbox.addClass("numberbox");
                    var o = i.parser.call(t, i.value), a = i.formatter.call(t, o);
                    e(t).numberbox("initValue", o).numberbox("setText", a)
                }

                function n(t, n) {
                    var i = e.data(t, "numberbox"), o = i.options, n = o.parser.call(t, n), a = o.formatter.call(t, n);
                    o.value = n, e(t).textbox("setText", a).textbox("setValue", n), a = o.formatter.call(t, e(t).textbox("getValue")), e(t).textbox("setText", a)
                }

                e.fn.numberbox = function (n, i) {
                    if ("string" == typeof n) {
                        var o = e.fn.numberbox.methods[n];
                        return o ? o(this, i) : this.textbox(n, i)
                    }
                    return n = n || {}, this.each(function () {
                        var i = e.data(this, "numberbox");
                        i ? e.extend(i.options, n) : i = e.data(this, "numberbox", {options: e.extend({}, e.fn.numberbox.defaults, e.fn.numberbox.parseOptions(this), n)}), t(this)
                    })
                }, e.fn.numberbox.methods = {
                    options: function (t) {
                        var n = t.data("textbox") ? t.textbox("options") : {};
                        return e.extend(e.data(t[0], "numberbox").options, {
                            width: n.width,
                            originalValue: n.originalValue,
                            disabled: n.disabled,
                            readonly: n.readonly
                        })
                    }, fix: function (t) {
                        return t.each(function () {
                            e(this).numberbox("setValue", e(this).numberbox("getText"))
                        })
                    }, setValue: function (e, t) {
                        return e.each(function () {
                            n(this, t)
                        })
                    }, clear: function (t) {
                        return t.each(function () {
                            e(this).textbox("clear"), e(this).numberbox("options").value = ""
                        })
                    }, reset: function (t) {
                        return t.each(function () {
                            e(this).textbox("reset"), e(this).numberbox("setValue", e(this).numberbox("getValue"))
                        })
                    }
                }, e.fn.numberbox.parseOptions = function (t) {
                    var n = e(t);
                    return e.extend({}, e.fn.textbox.parseOptions(t), e.parser.parseOptions(t, ["decimalSeparator", "groupSeparator", "suffix", {
                        min: "number",
                        max: "number",
                        precision: "number"
                    }]), {prefix: n.attr("prefix") ? n.attr("prefix") : void 0})
                }, e.fn.numberbox.defaults = e.extend({}, e.fn.textbox.defaults, {
                    inputEvents: {
                        keypress: function (t) {
                            var n = t.data.target, i = e(n).numberbox("options");
                            return i.filter.call(n, t)
                        }, blur: function (t) {
                            var n = t.data.target;
                            e(n).numberbox("setValue", e(n).numberbox("getText"))
                        }, keydown: function (t) {
                            if (13 == t.keyCode) {
                                var n = t.data.target;
                                e(n).numberbox("setValue", e(n).numberbox("getText"))
                            }
                        }
                    },
                    min: null,
                    max: null,
                    precision: 0,
                    decimalSeparator: ".",
                    groupSeparator: "",
                    prefix: "",
                    suffix: "",
                    filter: function (t) {
                        var n = e(this).numberbox("options"), i = e(this).numberbox("getText");
                        if (13 == t.which)return !0;
                        if (45 == t.which)return i.indexOf("-") == -1;
                        var o = String.fromCharCode(t.which);
                        return o == n.decimalSeparator ? i.indexOf(o) == -1 : o == n.groupSeparator || (t.which >= 48 && t.which <= 57 && 0 == t.ctrlKey && 0 == t.shiftKey || 0 == t.which || 8 == t.which || 1 == t.ctrlKey && (99 == t.which || 118 == t.which))
                    },
                    formatter: function (t) {
                        if (!t)return t;
                        t += "";
                        var n = e(this).numberbox("options"), i = t, o = "", a = t.indexOf(".");
                        if (a >= 0 && (i = t.substring(0, a), o = t.substring(a + 1, t.length)), n.groupSeparator)for (var r = /(\d+)(\d{3})/; r.test(i);)i = i.replace(r, "$1" + n.groupSeparator + "$2");
                        return o ? n.prefix + i + n.decimalSeparator + o + n.suffix : n.prefix + i + n.suffix
                    },
                    parser: function (t) {
                        t += "";
                        var n = e(this).numberbox("options");
                        parseFloat(t) != t && (n.prefix && (t = e.trim(t.replace(new RegExp("\\" + e.trim(n.prefix), "g"), ""))), n.suffix && (t = e.trim(t.replace(new RegExp("\\" + e.trim(n.suffix), "g"), ""))), n.groupSeparator && (t = e.trim(t.replace(new RegExp("\\" + n.groupSeparator, "g"), ""))), n.decimalSeparator && (t = e.trim(t.replace(new RegExp("\\" + n.decimalSeparator, "g"), "."))), t = t.replace(/\s/g, ""));
                        var i = parseFloat(t).toFixed(n.precision);
                        return isNaN(i) ? i = "" : "number" == typeof n.min && i < n.min ? i = n.min.toFixed(n.precision) : "number" == typeof n.max && i > n.max && (i = n.max.toFixed(n.precision)), i
                    }
                })
            }(jQuery), function (e) {
                function t(t) {
                    var i = e.data(t, "spinner"), o = i.options, a = e.extend(!0, [], o.icons);
                    a.push({
                        iconCls: "spinner-arrow", handler: function (e) {
                            n(e)
                        }
                    }), e(t).addClass("spinner-f").textbox(e.extend({}, o, {icons: a}));
                    var r = e(t).textbox("getIcon", a.length - 1);
                    r.append('<a href="javascript:void(0)" class="spinner-arrow-up" tabindex="-1"></a>'), r.append('<a href="javascript:void(0)" class="spinner-arrow-down" tabindex="-1"></a>'), e(t).attr("spinnerName", e(t).attr("textboxName")), i.spinner = e(t).next(), i.spinner.addClass("spinner")
                }

                function n(t) {
                    var n = t.data.target, i = e(n).spinner("options"), o = e(t.target).closest("a.spinner-arrow-up");
                    o.length && (i.spin.call(n, !1), i.onSpinUp.call(n), e(n).spinner("validate"));
                    var a = e(t.target).closest("a.spinner-arrow-down");
                    a.length && (i.spin.call(n, !0), i.onSpinDown.call(n), e(n).spinner("validate"))
                }

                e.fn.spinner = function (n, i) {
                    if ("string" == typeof n) {
                        var o = e.fn.spinner.methods[n];
                        return o ? o(this, i) : this.textbox(n, i)
                    }
                    return n = n || {}, this.each(function () {
                        var i = e.data(this, "spinner");
                        i ? e.extend(i.options, n) : i = e.data(this, "spinner", {options: e.extend({}, e.fn.spinner.defaults, e.fn.spinner.parseOptions(this), n)}), t(this)
                    })
                }, e.fn.spinner.methods = {
                    options: function (t) {
                        var n = t.textbox("options");
                        return e.extend(e.data(t[0], "spinner").options, {
                            width: n.width,
                            value: n.value,
                            originalValue: n.originalValue,
                            disabled: n.disabled,
                            readonly: n.readonly
                        })
                    }
                }, e.fn.spinner.parseOptions = function (t) {
                    return e.extend({}, e.fn.textbox.parseOptions(t), e.parser.parseOptions(t, ["min", "max", {increment: "number"}]))
                }, e.fn.spinner.defaults = e.extend({}, e.fn.textbox.defaults, {
                    min: null,
                    max: null,
                    increment: 1,
                    spin: function (e) {
                    },
                    onSpinUp: function () {
                    },
                    onSpinDown: function () {
                    }
                })
            }(jQuery), function (e) {
                function t(t) {
                    e(t).addClass("numberspinner-f");
                    var n = e.data(t, "numberspinner").options;
                    e(t).numberbox(n).spinner(n), e(t).numberbox("setValue", n.value)
                }

                function n(t, n) {
                    var i = e.data(t, "numberspinner").options, o = parseFloat(e(t).numberbox("getValue") || i.value) || 0;
                    n ? o -= i.increment : o += i.increment, e(t).numberbox("setValue", o)
                }

                e.fn.numberspinner = function (n, i) {
                    if ("string" == typeof n) {
                        var o = e.fn.numberspinner.methods[n];
                        return o ? o(this, i) : this.numberbox(n, i)
                    }
                    return n = n || {}, this.each(function () {
                        var i = e.data(this, "numberspinner");
                        i ? e.extend(i.options, n) : e.data(this, "numberspinner", {options: e.extend({}, e.fn.numberspinner.defaults, e.fn.numberspinner.parseOptions(this), n)}), t(this)
                    })
                }, e.fn.numberspinner.methods = {
                    options: function (t) {
                        var n = t.numberbox("options");
                        return e.extend(e.data(t[0], "numberspinner").options, {
                            width: n.width,
                            value: n.value,
                            originalValue: n.originalValue,
                            disabled: n.disabled,
                            readonly: n.readonly
                        })
                    }
                }, e.fn.numberspinner.parseOptions = function (t) {
                    return e.extend({}, e.fn.spinner.parseOptions(t), e.fn.numberbox.parseOptions(t), {})
                }, e.fn.numberspinner.defaults = e.extend({}, e.fn.spinner.defaults, e.fn.numberbox.defaults, {
                    spin: function (e) {
                        n(this, e)
                    }
                })
            }(jQuery), function (e) {
                function t(e) {
                    var t = 0;
                    if (e.selectionStart)t = e.selectionStart; else if (e.createTextRange) {
                        var n = e.createTextRange(), i = document.selection.createRange();
                        i.setEndPoint("StartToStart", n), t = i.text.length
                    }
                    return t
                }

                function n(e, t, n) {
                    if (e.selectionStart)e.setSelectionRange(t, n); else if (e.createTextRange) {
                        var i = e.createTextRange();
                        i.collapse(), i.moveEnd("character", n), i.moveStart("character", t), i.select()
                    }
                }

                function i(t) {
                    var n = e.data(t, "timespinner").options;
                    e(t).addClass("timespinner-f").spinner(n);
                    var i = n.formatter.call(t, n.parser.call(t, n.value));
                    e(t).timespinner("initValue", i)
                }

                function o(n) {
                    for (var i = n.data.target, o = e.data(i, "timespinner").options, r = t(this), s = 0; s < o.selections.length; s++) {
                        var l = o.selections[s];
                        if (r >= l[0] && r <= l[1])return void a(i, s)
                    }
                }

                function a(t, i) {
                    var o = e.data(t, "timespinner").options;
                    void 0 != i && (o.highlight = i);
                    var a = o.selections[o.highlight];
                    if (a) {
                        var r = e(t).timespinner("textbox");
                        n(r[0], a[0], a[1]), r.focus()
                    }
                }

                function r(t, n) {
                    var i = e.data(t, "timespinner").options, n = i.parser.call(t, n), o = i.formatter.call(t, n);
                    e(t).spinner("setValue", o)
                }

                function s(t, n) {
                    var i = e.data(t, "timespinner").options, o = e(t).timespinner("getValue"), r = i.selections[i.highlight], s = o.substring(0, r[0]), l = o.substring(r[0], r[1]), d = o.substring(r[1]), c = s + ((parseInt(l) || 0) + i.increment * (n ? -1 : 1)) + d;
                    e(t).timespinner("setValue", c), a(t)
                }

                e.fn.timespinner = function (t, n) {
                    if ("string" == typeof t) {
                        var o = e.fn.timespinner.methods[t];
                        return o ? o(this, n) : this.spinner(t, n)
                    }
                    return t = t || {}, this.each(function () {
                        var n = e.data(this, "timespinner");
                        n ? e.extend(n.options, t) : e.data(this, "timespinner", {options: e.extend({}, e.fn.timespinner.defaults, e.fn.timespinner.parseOptions(this), t)}), i(this)
                    })
                }, e.fn.timespinner.methods = {
                    options: function (t) {
                        var n = t.data("spinner") ? t.spinner("options") : {};
                        return e.extend(e.data(t[0], "timespinner").options, {
                            width: n.width,
                            value: n.value,
                            originalValue: n.originalValue,
                            disabled: n.disabled,
                            readonly: n.readonly
                        })
                    }, setValue: function (e, t) {
                        return e.each(function () {
                            r(this, t)
                        })
                    }, getHours: function (t) {
                        var n = e.data(t[0], "timespinner").options, i = t.timespinner("getValue").split(n.separator);
                        return parseInt(i[0], 10)
                    }, getMinutes: function (t) {
                        var n = e.data(t[0], "timespinner").options, i = t.timespinner("getValue").split(n.separator);
                        return parseInt(i[1], 10)
                    }, getSeconds: function (t) {
                        var n = e.data(t[0], "timespinner").options, i = t.timespinner("getValue").split(n.separator);
                        return parseInt(i[2], 10) || 0
                    }
                }, e.fn.timespinner.parseOptions = function (t) {
                    return e.extend({}, e.fn.spinner.parseOptions(t), e.parser.parseOptions(t, ["separator", {
                        showSeconds: "boolean",
                        highlight: "number"
                    }]))
                }, e.fn.timespinner.defaults = e.extend({}, e.fn.spinner.defaults, {
                    inputEvents: e.extend({}, e.fn.spinner.defaults.inputEvents, {
                        click: function (e) {
                            o.call(this, e)
                        }, blur: function (t) {
                            var n = e(t.data.target);
                            n.timespinner("setValue", n.timespinner("getText"))
                        }, keydown: function (t) {
                            if (13 == t.keyCode) {
                                var n = e(t.data.target);
                                n.timespinner("setValue", n.timespinner("getText"))
                            }
                        }
                    }),
                    formatter: function (t) {
                        function n(e) {
                            return (e < 10 ? "0" : "") + e
                        }

                        if (!t)return "";
                        var i = e(this).timespinner("options"), o = [n(t.getHours()), n(t.getMinutes())];
                        return i.showSeconds && o.push(n(t.getSeconds())), o.join(i.separator)
                    },
                    parser: function (t) {
                        function n(e) {
                            if (!e)return null;
                            var t = e.split(i.separator);
                            return new Date(1900, 0, 0, parseInt(t[0], 10) || 0, parseInt(t[1], 10) || 0, parseInt(t[2], 10) || 0)
                        }

                        var i = e(this).timespinner("options"), o = n(t);
                        if (o) {
                            var a = n(i.min), r = n(i.max);
                            a && a > o && (o = a), r && r < o && (o = r)
                        }
                        return o
                    },
                    selections: [[0, 2], [3, 5], [6, 8]],
                    separator: ":",
                    showSeconds: !1,
                    highlight: 0,
                    spin: function (e) {
                        s(this, e)
                    }
                })
            }(jQuery), function (e) {
                function t(t) {
                    var n = e.data(t, "combo"), a = n.options;
                    n.epanel || (n.epanel = e('<div class="combo-epanel"></div>').appendTo("body"), n.epanel.epanel({
                        minWidth: a.epanelMinWidth,
                        maxWidth: a.epanelMaxWidth,
                        minHeight: a.epanelMinHeight,
                        maxHeight: a.epanelMaxHeight,
                        doSize: !1,
                        closed: !0,
                        cls: "combo-p",
                        style: {position: "absolute", zIndex: 10},
                        onOpen: function () {
                            var t = e(this).epanel("options").comboTarget, n = e.data(t, "combo");
                            n && n.options.onShowepanel.call(t)
                        },
                        onBeforeClose: function () {
                            o(this)
                        },
                        onClose: function () {
                            var t = e(this).epanel("options").comboTarget, n = e(t).data("combo");
                            n && n.options.onHideepanel.call(t)
                        }
                    }));
                    var r = e.extend(!0, [], a.icons);
                    a.hasDownArrow && r.push({
                        iconCls: "combo-arrow", handler: function (e) {
                            i(e.data.target)
                        }
                    }), e(t).addClass("combo-f").textbox(e.extend({}, a, {
                        icons: r, onChange: function () {
                        }
                    })), e(t).attr("comboName", e(t).attr("textboxName")), n.combo = e(t).next(), n.combo.addClass("combo")
                }

                function n(t) {
                    var n = e.data(t, "combo"), i = n.options, o = n.epanel;
                    o.is(":visible") && o.epanel("close"), i.cloned || o.epanel("destroy"), e(t).textbox("destroy")
                }

                function i(t) {
                    var n = e.data(t, "combo").epanel;
                    if (n.is(":visible"))l(t); else {
                        var i = e(t).closest("div.combo-epanel");
                        e("div.combo-epanel:visible").not(n).not(i).epanel("close"), e(t).combo("showepanel")
                    }
                    e(t).combo("textbox").focus()
                }

                function o(t) {
                    e(t).find(".combo-f").each(function () {
                        var t = e(this).combo("epanel");
                        t.is(":visible") && t.epanel("close")
                    })
                }

                function a(t) {
                    var n = t.data.target, o = e.data(n, "combo"), a = o.options, r = o.epanel;
                    if (a.editable) {
                        var s = e(n).closest("div.combo-epanel");
                        e("div.combo-epanel:visible").not(r).not(s).epanel("close")
                    } else i(n)
                }

                function r(t) {
                    var n = t.data.target, i = e(n), o = i.data("combo"), a = i.combo("options");
                    switch (t.keyCode) {
                        case 38:
                            a.keyHandler.up.call(n, t);
                            break;
                        case 40:
                            a.keyHandler.down.call(n, t);
                            break;
                        case 37:
                            a.keyHandler.left.call(n, t);
                            break;
                        case 39:
                            a.keyHandler.right.call(n, t);
                            break;
                        case 13:
                            return t.preventDefault(), a.keyHandler.enter.call(n, t), !1;
                        case 9:
                        case 27:
                            l(n);
                            break;
                        default:
                            a.editable && (o.timer && clearTimeout(o.timer), o.timer = setTimeout(function () {
                                var e = i.combo("getText");
                                o.previousText != e && (o.previousText = e, i.combo("showepanel"), a.keyHandler.query.call(n, e, t), i.combo("validate"))
                            }, a.delay))
                    }
                }

                function s(t) {
                    function n() {
                        var t = a.offset().left;
                        return "right" == s.epanelAlign && (t += a._outerWidth() - r._outerWidth()), t + r._outerWidth() > e(window)._outerWidth() + e(document).scrollLeft() && (t = e(window)._outerWidth() + e(document).scrollLeft() - r._outerWidth()), t < 0 && (t = 0), t
                    }

                    function i() {
                        var t = a.offset().top + a._outerHeight();
                        return t + r._outerHeight() > e(window)._outerHeight() + e(document).scrollTop() && (t = a.offset().top - r._outerHeight()), t < e(document).scrollTop() && (t = a.offset().top + a._outerHeight()), t
                    }

                    var o = e.data(t, "combo"), a = o.combo, r = o.epanel, s = e(t).combo("options"), l = r.epanel("options");
                    l.comboTarget = t, l.closed && (r.epanel("epanel").show().css({
                        zIndex: e.fn.menu ? e.fn.menu.defaults.zIndex++ : e.fn.window.defaults.zIndex++,
                        left: -999999
                    }), r.epanel("resize", {
                        width: s.epanelWidth ? s.epanelWidth : a._outerWidth(),
                        height: s.epanelHeight
                    }), r.epanel("epanel").hide(), r.epanel("open")), function () {
                        r.is(":visible") && (r.epanel("move", {left: n(), top: i()}), setTimeout(arguments.callee, 200))
                    }()
                }

                function l(t) {
                    var n = e.data(t, "combo").epanel;
                    n.epanel("close")
                }

                function d(t, n) {
                    var i = e.data(t, "combo"), o = e(t).textbox("getText");
                    o != n && (e(t).textbox("setText", n), i.previousText = n)
                }

                function c(t) {
                    var n = [], i = e.data(t, "combo").combo;
                    return i.find(".textbox-value").each(function () {
                        n.push(e(this).val())
                    }), n
                }

                function u(t, n) {
                    var i = e.data(t, "combo"), o = i.options, a = i.combo;
                    e.isArray(n) || (n = n.split(o.separator));
                    var r = c(t);
                    a.find(".textbox-value").remove();
                    for (var s = e(t).attr("textboxName") || "", l = 0; l < n.length; l++) {
                        var d = e('<input type="hidden" class="textbox-value">').appendTo(a);
                        d.attr("name", s), o.disabled && d.attr("disabled", "disabled"), d.val(n[l])
                    }
                    var u = function () {
                        if (r.length != n.length)return !0;
                        var t = e.extend(!0, [], r), i = e.extend(!0, [], n);
                        t.sort(), i.sort();
                        for (var o = 0; o < t.length; o++)if (t[o] != i[o])return !0;
                        return !1
                    }();
                    u && (o.multiple ? o.onChange.call(t, n, r) : o.onChange.call(t, n[0], r[0]), e(t).closest("form").trigger("_change", [t]))
                }

                function f(e) {
                    var t = c(e);
                    return t[0]
                }

                function p(e, t) {
                    u(e, [t])
                }

                function h(t) {
                    var n = e.data(t, "combo").options, i = n.onChange;
                    n.onChange = function () {
                    }, n.multiple ? u(t, n.value ? n.value : []) : p(t, n.value), n.onChange = i
                }

                e(function () {
                    e(document).unbind(".combo").bind("mousedown.combo mousewheel.combo", function (t) {
                        var n = e(t.target).closest("span.combo,div.combo-p,div.menu");
                        return n.length ? void o(n) : void e("body>div.combo-p>div.combo-epanel:visible").epanel("close")
                    })
                }), e.fn.combo = function (n, i) {
                    if ("string" == typeof n) {
                        var o = e.fn.combo.methods[n];
                        return o ? o(this, i) : this.textbox(n, i)
                    }
                    return n = n || {}, this.each(function () {
                        var i = e.data(this, "combo");
                        i ? (e.extend(i.options, n), void 0 != n.value && (i.options.originalValue = n.value)) : (i = e.data(this, "combo", {
                            options: e.extend({}, e.fn.combo.defaults, e.fn.combo.parseOptions(this), n),
                            previousText: ""
                        }), i.options.originalValue = i.options.value), t(this), h(this)
                    })
                }, e.fn.combo.methods = {
                    options: function (t) {
                        var n = t.textbox("options");
                        return e.extend(e.data(t[0], "combo").options, {
                            width: n.width,
                            height: n.height,
                            disabled: n.disabled,
                            readonly: n.readonly
                        })
                    }, cloneFrom: function (t, n) {
                        return t.each(function () {
                            e(this).textbox("cloneFrom", n), e.data(this, "combo", {
                                options: e.extend(!0, {cloned: !0}, e(n).combo("options")),
                                combo: e(this).next(),
                                epanel: e(n).combo("epanel")
                            }), e(this).addClass("combo-f").attr("comboName", e(this).attr("textboxName"))
                        })
                    }, epanel: function (t) {
                        return e.data(t[0], "combo").epanel
                    }, destroy: function (e) {
                        return e.each(function () {
                            n(this)
                        })
                    }, showepanel: function (e) {
                        return e.each(function () {
                            s(this)
                        })
                    }, hideepanel: function (e) {
                        return e.each(function () {
                            l(this)
                        })
                    }, clear: function (t) {
                        return t.each(function () {
                            e(this).textbox("setText", "");
                            var t = e.data(this, "combo").options;
                            t.multiple ? e(this).combo("setValues", []) : e(this).combo("setValue", "")
                        })
                    }, reset: function (t) {
                        return t.each(function () {
                            var t = e.data(this, "combo").options;
                            t.multiple ? e(this).combo("setValues", t.originalValue) : e(this).combo("setValue", t.originalValue)
                        })
                    }, setText: function (e, t) {
                        return e.each(function () {
                            d(this, t)
                        })
                    }, getValues: function (e) {
                        return c(e[0])
                    }, setValues: function (e, t) {
                        return e.each(function () {
                            u(this, t)
                        })
                    }, getValue: function (e) {
                        return f(e[0])
                    }, setValue: function (e, t) {
                        return e.each(function () {
                            p(this, t)
                        })
                    }
                }, e.fn.combo.parseOptions = function (t) {
                    var n = e(t);
                    return e.extend({}, e.fn.textbox.parseOptions(t), e.parser.parseOptions(t, ["separator", "epanelAlign", {
                        epanelWidth: "number",
                        hasDownArrow: "boolean",
                        delay: "number",
                        selectOnNavigation: "boolean"
                    }, {
                        epanelMinWidth: "number",
                        epanelMaxWidth: "number",
                        epanelMinHeight: "number",
                        epanelMaxHeight: "number"
                    }]), {
                        epanelHeight: "auto" == n.attr("epanelHeight") ? "auto" : parseInt(n.attr("epanelHeight")) || void 0,
                        multiple: !!n.attr("multiple") || void 0
                    })
                }, e.fn.combo.defaults = e.extend({}, e.fn.textbox.defaults, {
                    inputEvents: {
                        click: a,
                        keydown: r,
                        paste: r,
                        drop: r
                    },
                    epanelWidth: null,
                    epanelHeight: 200,
                    epanelMinWidth: null,
                    epanelMaxWidth: null,
                    epanelMinHeight: null,
                    epanelMaxHeight: null,
                    epanelAlign: "left",
                    multiple: !1,
                    selectOnNavigation: !0,
                    separator: ",",
                    hasDownArrow: !0,
                    delay: 200,
                    keyHandler: {
                        up: function (e) {
                        }, down: function (e) {
                        }, left: function (e) {
                        }, right: function (e) {
                        }, enter: function (e) {
                        }, query: function (e, t) {
                        }
                    },
                    onShowepanel: function () {
                    },
                    onHideepanel: function () {
                    },
                    onChange: function (e, t) {
                    }
                })
            }(jQuery), function (e) {
                function t(t, n) {
                    for (var i = e.data(t, "combobox"), o = i.options, a = i.data, r = 0; r < a.length; r++)if (a[r][o.valueField] == n)return r;
                    return -1
                }

                function n(t, n) {
                    var i = e.data(t, "combobox").options, o = e(t).combo("epanel"), a = i.finder.getEl(t, n);
                    if (a.length)if (a.position().top <= 0) {
                        var r = o.scrollTop() + a.position().top;
                        o.scrollTop(r)
                    } else if (a.position().top + a.outerHeight() > o.height()) {
                        var r = o.scrollTop() + a.position().top + a.outerHeight() - o.height();
                        o.scrollTop(r)
                    }
                }

                function i(t, i) {
                    var a = e.data(t, "combobox").options, r = e(t).combobox("epanel"), s = r.children("div.combobox-item-hover");
                    s.length || (s = r.children("div.combobox-item-selected")), s.removeClass("combobox-item-hover");
                    var l = "div.combobox-item:visible:not(.combobox-item-disabled):first", d = "div.combobox-item:visible:not(.combobox-item-disabled):last";
                    if (s.length ? "next" == i ? (s = s.nextAll(l), s.length || (s = r.children(l))) : (s = s.prevAll(l), s.length || (s = r.children(d))) : s = r.children("next" == i ? l : d), s.length) {
                        s.addClass("combobox-item-hover");
                        var c = a.finder.getRow(t, s);
                        c && (n(t, c[a.valueField]), a.selectOnNavigation && o(t, c[a.valueField]))
                    }
                }

                function o(t, n) {
                    var i = e.data(t, "combobox").options, o = e(t).combo("getValues");
                    e.inArray(n + "", o) == -1 && (i.multiple ? o.push(n) : o = [n], r(t, o), i.onSelect.call(t, i.finder.getRow(t, n)))
                }

                function a(t, n) {
                    var i = e.data(t, "combobox").options, o = e(t).combo("getValues"), a = e.inArray(n + "", o);
                    a >= 0 && (o.splice(a, 1), r(t, o), i.onUnselect.call(t, i.finder.getRow(t, n)))
                }

                function r(t, n, i) {
                    var o = e.data(t, "combobox").options, a = e(t).combo("epanel");
                    e.isArray(n) || (n = n.split(o.separator)), a.find("div.combobox-item-selected").removeClass("combobox-item-selected");
                    for (var r = [], s = [], l = 0; l < n.length; l++) {
                        var d = n[l], c = d;
                        o.finder.getEl(t, d).addClass("combobox-item-selected");
                        var u = o.finder.getRow(t, d);
                        u && (c = u[o.textField]), r.push(d), s.push(c)
                    }
                    i || e(t).combo("setText", s.join(o.separator)), e(t).combo("setValues", r)
                }

                function s(t, n, i) {
                    var o = e.data(t, "combobox"), a = o.options;
                    o.data = a.loadFilter.call(t, n), o.groups = [], n = o.data;
                    for (var s = e(t).combobox("getValues"), l = [], d = void 0, c = 0; c < n.length; c++) {
                        var u = n[c], f = u[a.valueField] + "", p = u[a.textField], h = u[a.groupField];
                        h ? d != h && (d = h, o.groups.push(h), l.push('<div id="' + (o.groupIdPrefix + "_" + (o.groups.length - 1)) + '" class="combobox-group">'), l.push(a.groupFormatter ? a.groupFormatter.call(t, h) : h), l.push("</div>")) : d = void 0;
                        var m = "combobox-item" + (u.disabled ? " combobox-item-disabled" : "") + (h ? " combobox-gitem" : "");
                        l.push('<div id="' + (o.itemIdPrefix + "_" + c) + '" class="' + m + '">'), l.push(a.formatter ? a.formatter.call(t, u) : p), l.push("</div>"), u.selected && e.inArray(f, s) == -1 && s.push(f)
                    }
                    e(t).combo("epanel").html(l.join("")), a.multiple ? r(t, s, i) : r(t, s.length ? [s[s.length - 1]] : [], i), a.onLoadSuccess.call(t, n)
                }

                function l(t, n, i, o) {
                    var a = e.data(t, "combobox").options;
                    n && (a.url = n), i = e.extend({}, a.queryParams, i || {}), 0 != a.onBeforeLoad.call(t, i) && a.loader.call(t, i, function (e) {
                        s(t, e, o)
                    }, function () {
                        a.onLoadError.apply(this, arguments)
                    })
                }

                function d(t, n) {
                    function i(e) {
                        r(t, a.multiple ? n ? e : [] : e, !0)
                    }

                    var o = e.data(t, "combobox"), a = o.options, s = a.multiple ? n.split(a.separator) : [n];
                    if ("remote" == a.mode)i(s), l(t, null, {q: n}, !0); else {
                        var d = e(t).combo("epanel");
                        d.find("div.combobox-item-selected,div.combobox-item-hover").removeClass("combobox-item-selected combobox-item-hover"), d.find("div.combobox-item,div.combobox-group").hide();
                        var c = o.data, u = [];
                        e.map(s, function (n) {
                            n = e.trim(n);
                            for (var i = n, r = void 0, s = 0; s < c.length; s++) {
                                var l = c[s];
                                if (a.filter.call(t, n, l)) {
                                    var d = l[a.valueField], f = l[a.textField], p = l[a.groupField], h = a.finder.getEl(t, d).show();
                                    f.toLowerCase() == n.toLowerCase() && (i = d, h.addClass("combobox-item-selected")), a.groupField && r != p && (e("#" + o.groupIdPrefix + "_" + e.inArray(p, o.groups)).show(), r = p)
                                }
                            }
                            u.push(i)
                        }), i(u)
                    }
                }

                function c(n) {
                    var i = e(n), o = i.combobox("options"), a = i.combobox("epanel"), r = a.children("div.combobox-item-hover");
                    if (r.length) {
                        var s = o.finder.getRow(n, r), l = s[o.valueField];
                        o.multiple && r.hasClass("combobox-item-selected") ? i.combobox("unselect", l) : i.combobox("select", l)
                    }
                    var d = [];
                    e.map(i.combobox("getValues"), function (e) {
                        t(n, e) >= 0 && d.push(e)
                    }), i.combobox("setValues", d), o.multiple || i.combobox("hideepanel")
                }

                function u(t) {
                    var i = e.data(t, "combobox"), r = i.options;
                    f++, i.itemIdPrefix = "_eui_combobox_i" + f, i.groupIdPrefix = "_eui_combobox_g" + f, e(t).addClass("combobox-f"), e(t).combo(e.extend({}, r, {
                        onShowepanel: function () {
                            e(t).combo("epanel").find("div.combobox-item,div.combobox-group").show(), n(t, e(t).combobox("getValue")), r.onShowepanel.call(t)
                        }
                    })), e(t).combo("epanel").unbind().bind("mouseover", function (t) {
                        e(this).children("div.combobox-item-hover").removeClass("combobox-item-hover");
                        var n = e(t.target).closest("div.combobox-item");
                        n.hasClass("combobox-item-disabled") || n.addClass("combobox-item-hover"), t.stopPropagation()
                    }).bind("mouseout", function (t) {
                        e(t.target).closest("div.combobox-item").removeClass("combobox-item-hover"), t.stopPropagation()
                    }).bind("click", function (n) {
                        var i = e(n.target).closest("div.combobox-item");
                        if (i.length && !i.hasClass("combobox-item-disabled")) {
                            var s = r.finder.getRow(t, i);
                            if (s) {
                                var l = s[r.valueField];
                                r.multiple ? i.hasClass("combobox-item-selected") ? a(t, l) : o(t, l) : (o(t, l), e(t).combo("hideepanel")), n.stopPropagation()
                            }
                        }
                    })
                }

                var f = 0;
                e.fn.combobox = function (t, n) {
                    if ("string" == typeof t) {
                        var i = e.fn.combobox.methods[t];
                        return i ? i(this, n) : this.combo(t, n)
                    }
                    return t = t || {}, this.each(function () {
                        var n = e.data(this, "combobox");
                        if (n)e.extend(n.options, t), u(this); else {
                            n = e.data(this, "combobox", {
                                options: e.extend({}, e.fn.combobox.defaults, e.fn.combobox.parseOptions(this), t),
                                data: []
                            }), u(this);
                            var i = e.fn.combobox.parseData(this);
                            i.length && s(this, i)
                        }
                        n.options.data && s(this, n.options.data), l(this)
                    })
                }, e.fn.combobox.methods = {
                    options: function (t) {
                        var n = t.combo("options");
                        return e.extend(e.data(t[0], "combobox").options, {
                            width: n.width,
                            height: n.height,
                            originalValue: n.originalValue,
                            disabled: n.disabled,
                            readonly: n.readonly
                        })
                    }, getData: function (t) {
                        return e.data(t[0], "combobox").data
                    }, setValues: function (e, t) {
                        return e.each(function () {
                            r(this, t)
                        })
                    }, setValue: function (e, t) {
                        return e.each(function () {
                            r(this, [t])
                        })
                    }, clear: function (t) {
                        return t.each(function () {
                            e(this).combo("clear");
                            var t = e(this).combo("epanel");
                            t.find("div.combobox-item-selected").removeClass("combobox-item-selected")
                        })
                    }, reset: function (t) {
                        return t.each(function () {
                            var t = e(this).combobox("options");
                            t.multiple ? e(this).combobox("setValues", t.originalValue) : e(this).combobox("setValue", t.originalValue)
                        })
                    }, loadData: function (e, t) {
                        return e.each(function () {
                            s(this, t)
                        })
                    }, reload: function (t, n) {
                        return t.each(function () {
                            if ("string" == typeof n)l(this, n); else {
                                if (n) {
                                    var t = e(this).combobox("options");
                                    t.queryParams = n
                                }
                                l(this)
                            }
                        })
                    }, select: function (e, t) {
                        return e.each(function () {
                            o(this, t)
                        })
                    }, unselect: function (e, t) {
                        return e.each(function () {
                            a(this, t)
                        })
                    }
                }, e.fn.combobox.parseOptions = function (t) {
                    e(t);
                    return e.extend({}, e.fn.combo.parseOptions(t), e.parser.parseOptions(t, ["valueField", "textField", "groupField", "mode", "method", "url"]))
                }, e.fn.combobox.parseData = function (t) {
                    function n(t, n) {
                        var a = e(t), r = {};
                        r[o.valueField] = void 0 != a.attr("value") ? a.attr("value") : a.text(), r[o.textField] = a.text(), r.selected = a.is(":selected"), r.disabled = a.is(":disabled"), n && (o.groupField = o.groupField || "group", r[o.groupField] = n), i.push(r)
                    }

                    var i = [], o = e(t).combobox("options");
                    return e(t).children().each(function () {
                        if ("optgroup" == this.tagName.toLowerCase()) {
                            var t = e(this).attr("label");
                            e(this).children().each(function () {
                                n(this, t)
                            })
                        } else n(this)
                    }), i
                }, e.fn.combobox.defaults = e.extend({}, e.fn.combo.defaults, {
                    valueField: "value",
                    textField: "text",
                    groupField: null,
                    groupFormatter: function (e) {
                        return e
                    },
                    mode: "local",
                    method: "post",
                    url: null,
                    data: null,
                    queryParams: {},
                    keyHandler: {
                        up: function (e) {
                            i(this, "prev"), e.preventDefault()
                        }, down: function (e) {
                            i(this, "next"), e.preventDefault()
                        }, left: function (e) {
                        }, right: function (e) {
                        }, enter: function (e) {
                            c(this)
                        }, query: function (e, t) {
                            d(this, e)
                        }
                    },
                    filter: function (t, n) {
                        var i = e(this).combobox("options");
                        return 0 == n[i.textField].toLowerCase().indexOf(t.toLowerCase())
                    },
                    formatter: function (t) {
                        var n = e(this).combobox("options");
                        return t[n.textField]
                    },
                    loader: function (t, n, i) {
                        var o = e(this).combobox("options");
                        return !!o.url && void e.ajax({
                                type: o.method,
                                url: o.url,
                                data: t,
                                dataType: "json",
                                success: function (e) {
                                    n(e)
                                },
                                error: function () {
                                    i.apply(this, arguments)
                                }
                            })
                    },
                    loadFilter: function (e) {
                        return e
                    },
                    finder: {
                        getEl: function (n, i) {
                            var o = t(n, i), a = e.data(n, "combobox").itemIdPrefix + "_" + o;
                            return e("#" + a)
                        }, getRow: function (n, i) {
                            var o = e.data(n, "combobox"), a = i instanceof jQuery ? i.attr("id").substr(o.itemIdPrefix.length + 1) : t(n, i);
                            return o.data[parseInt(a)]
                        }
                    },
                    onBeforeLoad: function (e) {
                    },
                    onLoadSuccess: function () {
                    },
                    onLoadError: function () {
                    },
                    onSelect: function (e) {
                    },
                    onUnselect: function (e) {
                    }
                })
            }(jQuery)
        };
        "object" == typeof module && "object" == typeof module.exports ? module.exports = _eui : _eui(window.jQuery)
    }, {}], 9: [function (require, module, exports) {
        var scrollFunc = function (e) {
            return e = e || window.event, e.preventDefault ? (e.preventDefault(), e.stopPropagation()) : (e.cancelBubble = !0, e.returnValue = !1), !1
        };
        module.exports = {
            obj2str: function (e) {
                return "object" == typeof e ? JSON.stringify(e) : e
            }, str2obj: function (str, b) {
                var obj;
                return obj = "string" == typeof str ? b ? eval("(" + str + ")") : JSON.parse(str) : str
            }, dash2camel: function (e) {
                for (var t = e.split("-"), n = 1; n < t.length; n++)t[n] && (t[0] = t[0] + t[n][0].toUpperCase() + t[n].slice(1));
                return t[0]
            }, camel2dash: function (e) {
                for (var t = 1; t < e.length; t++)e[t].match(/[A-Z]/) && (e = e.slice(0, t) + "-" + e[t].toLowerCase() + e.slice(t + 1));
                return e
            }, byid: function (e, t) {
                return (t || document).getElementById(e)
            }, bytag: function (e, t) {
                return (t || document).getElementsByTagName(e)
            }, byName: function (e, t) {
                return (t || document).getElementsByName(e)
            }, getRect: function (e) {
                return e.getBoundingClientRect()
            }, hasScroll: function (e, t) {
                var n = getComputedStyle(e), i = "y" == t ? parseInt(n.borderLeftWidth) + parseInt(n.borderRightWidth) : parseInt(n.borderTopWidth) + parseInt(n.borderBottomWidth), o = "y" == t ? e.offsetWidth - e.clientWidth - i : e.offsetHeight - e.clientHeight - i;
                return o
            }, log: function (e) {
                "undefined" != typeof console && console.log(e)
            }, info: function (e) {
                "undefined" != typeof console && console.info(e)
            }, warn: function (e) {
                "undefined" != typeof console && console.warn(e)
            }, error: function (e) {
                "undefined" != typeof console && console.error(e)
            }, logEx: function (e, t) {
                t = t ? "font-size:16px;" + t : "font-size:16px;color:red;", console.log("%c" + e, t)
            }, typeOf: function () {
                var e = {
                    "[object Object]": "object",
                    "[object RegExp]": "regexp",
                    "[object Date]": "date",
                    "[object Array]": "array",
                    "[object String]": "string",
                    "[object Number]": "number",
                    "[object Boolean]": "boolean",
                    "[object Error]": "error",
                    "[object Window]": "window"
                }, t = Object.prototype.toString;
                return function (n, i) {
                    return "object" != typeof n ? typeof n : null === n ? "null" : i ? e[t.apply(n)] || t.call(n).slice(8, -1).toLowerCase() || "object" : e[t.apply(n)] || "object"
                }
            }(), queryParse: function (e) {
                var e = e || location.search, t = e.match(new RegExp("[?&][^?&]+=[^?&]*", "g"));
                if (null == t)return !1;
                for (var n = t.length, i = {}, o = [], a = 0; a < n; a++)o = t[a].slice(1).split("="), i[o[0]] = o[1];
                return i
            }, getJspData: function (e) {
                return e || null
            }, replaceDDD: function (e) {
                return e.replace(/\<ddd\>/gim, "'")
            }, disabledMouseWheel: function (e) {
                var e = e || document;
                e.addEventListener && document.addEventListener("DOMMouseScroll", scrollFunc, !1), e.onmousewheel = scrollFunc
            }, enabledMouseWheel: function (e, t) {
                var e = e || document;
                e.removeEventListener && e.removeEventListener("DOMMouseScroll", scrollFunc, !1), e.onmousewheel = t || function () {
                    }
            }, open2: function () {
                var e = "", t = {
                    status: 0,
                    width: top.getWidth() - 40,
                    height: top.getHeight() - 70,
                    top: 20,
                    left: 20,
                    scrollbars: 1,
                    resizable: 1,
                    fullscreen: 0,
                    channelmode: 0,
                    directories: 1,
                    help: 0,
                    menubar: 0,
                    toolbar: 0,
                    location: 0
                }, n = "object" == typeof arguments[0] ? arguments[0] : {
                    url: arguments[0],
                    name: arguments[1],
                    width: arguments[2],
                    height: arguments[3],
                    left: arguments[4],
                    top: arguments[5]
                };
                for (var i in n)"undefined" != typeof n[i] && (t[i] = n[i]);
                for (var o in t)"url" == o && "name" == o || (e += "," + o + "=" + t[o]);
                var a = window.open(t.url, t.name || "_blank", e.slice(1));
                return a
            }, removeTag: function (e, t) {
                var n = document.head.getElementsByTagName(t || "script");
                e = e.replace("../", "").replace("..\\", "").replace(".\\", "").replace("./", "") + "?version=" + config.version;
                for (var i = 0; i < n.length; i++)0 == ("link" == t ? n[i].href : n[i].src).split("").reverse().join("").indexOf(e.split("").reverse().join("")) && document.head.removeChild(n[i])
            }, checkExistTag: function (e, t) {
                var n = document.head.getElementsByTagName(t || "script");
                e = e.replace("../", "").replace("..\\", "").replace(".\\", "").replace("./", "") + "?version=" + config.version;
                for (var i = 0; i < n.length; i++)if (0 == ("link" == t ? n[i].href : n[i].src).split("").reverse().join("").indexOf(e.split("").reverse().join("")))return n[i];
                return !1
            }, $style: function (e, t, n) {
                null != e.match(/\.css$/i) || (e += ".css");
                var i = window.checkExistTag(e, "link");
                if (i && !n)return "function" == typeof t && t();
                i && document.head.removeChild(i);
                var o = document.createElement("link");
                return o.rel = "stylesheet", o.type = "text/css", o.media = "screen", o.href = e + (window.config.version ? "?version=" + window.config.version : ""), document.head.appendChild(o), t && t.call(o), o
            }, $script: function (e, t, n) {
                var i = !1, o = document.createElement("script"), a = checkExistTag(e);
                return a && !n ? "function" == typeof t && t() : (a && document.head.removeChild(a), o.type = "text/javascript", o.language = "javascript", null != e.match(/\.js$/i) || (e += ".js"), o.src = e + (window.config.version ? "?version=" + window.config.version : ""), o.onload = o.onreadystatechange = function () {
                    i || o.readyState && "loaded" != o.readyState && "complete" != o.readyState || (i = !0, o.onload = o.onreadystatechange = null, t && t())
                }, document.head.appendChild(o), o)
            }, $loadHTML: function (e, t) {
                return $loadTEXT(e, t, "HTML")
            }, $loadJSON: function (e, t) {
                return $loadTEXT(e, t, "JSON")
            }, $loadTEXT: function (e, t, n) {
                var i = e.replace(/\?.*$/, "");
                i.match(/\.html?$/i) ? i = window.getViewPath(e) : i.match(/\.json$|\.txt$|\.md$/i) && (i = window.getSrcPath(e)), window.$cache(e) ? "function" == typeof t && t() : $.get(i, function (i) {
                    window.$cache(e, "JSON" == n ? str2obj(i) : i), "function" == typeof t && t()
                })
            }, importing: require("./importing.js")
        }
    }, {"./importing.js": 10}], 10: [function (e, t, n) {
        var i = "auto-bind", o = "x-app", a = e("./scope")(), r = e("./xtp.widget");
        "object" == typeof t && "object" == typeof t.exports && (t.exports = function () {
            var e = arguments, t = e[0], n = typeOf(t);
            if ("function" == n || "boolean" == n || 0 == e.length) {
                var s = r.reg.call(this, [].slice.call(e));
                return s ? s() : (r.init(), $(function () {
                    $("body,body>.body-agent").removeClass("unready"), "function" == n && (window.doc.hasAttribute(i) && a.scan(document, "true" == window.doc.getAttribute(i)) && window.doc.removeAttribute(i), window.doc.hasAttribute(o) && a.scanEx(), t(a))
                }), !1)
            }
            if ("array" == n)return window.importing.apply(this, t.concat([].slice.call(e, 1)));
            var l = window.config.plugins;
            if (l[t]) {
                if ("object" == typeof l[t])return t = (l[t].depending || []).concat(l[t].path ? window.getDistPath("plugin/" + l[t].path) : []), window.importing.apply(this, t.concat([].slice.call(e, 1)));
                t = window.getDistPath("plugin/" + l[t])
            } else {
                if ("" == t || "null" == String(t))return window.importing.apply(this, [].slice.call(e, 1));
                if (0 != t.indexOf("http")) {
                    if (t.replace(/\?.*$/, "").match(/\.html?$|\.json$|\.txt$/i))return window.$loadTEXT(t, function () {
                        window.importing.apply(this, [].slice.call(e, 1))
                    }, e[e.length - 1] === !0);
                    t.indexOf("/") < 0 ? t.match(/.*.css$/i) ? t = window.getDistPath() + "css/" + t : t.match(/.*.js$/i) && (t = window.getDistPath() + "js/" + t) : t = t.indexOf(window.getDistPath()) > -1 ? t : window.getDistPath() + t
                }
            }
            window[t.match(/.*\/css\/.+|.css$/i) ? "$style" : "$script"](t, function () {
                window.importing.apply(this, [].slice.call(e, 1))
            }, e[e.length - 1] === !0)
        })
    }, {"./scope": 24, "./xtp.widget": 32}], 11: [function (e, t, n) {
        var i = Object.create(null), o = Object.create(null), a = function (e, t) {
            return Object.defineProperty(i, e, {value: t, writable: !1, enumerable: !0, configurable: !1}), a
        }, r = function (e, t) {
            return Object.defineProperty(o, e, {value: t, writable: !1, enumerable: !0, configurable: !1}), r
        };
        $.fn.injector = function (e) {
            return arguments.length ? this.data("x-injector", "string" == typeof e ? i[e] : e) : this.data("x-injector")
        }, $.fn.extractor = function (e) {
            return arguments.length ? this.data("x-extractor", "string" == typeof e ? o[e] : e) : this.data("x-extractor")
        }, window.extending({
            $injector: a,
            $extractor: r
        }), "object" == typeof t && "object" == typeof t.exports && (t.exports = {xInjectors: i, xExtractors: o})
    }, {}], 12: [function (e, t, n) {
        !function (e) {
            "object" == typeof t && "object" == typeof t.exports ? t.exports = e : "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof n || e(jQuery)
        }(function (e) {
            function t(e) {
                return s.raw ? e : encodeURIComponent(e)
            }

            function n(e) {
                return s.raw ? e : decodeURIComponent(e)
            }

            function i(e) {
                return t(s.json ? JSON.stringify(e) : String(e))
            }

            function o(e) {
                0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
                try {
                    return e = decodeURIComponent(e.replace(r, " ")), s.json ? JSON.parse(e) : e
                } catch (e) {
                }
            }

            function a(t, n) {
                var i = s.raw ? t : o(t);
                return e.isFunction(n) ? n(i) : i
            }

            var r = /\+/g, s = e.cookie = function (o, r, l) {
                if (void 0 !== r && !e.isFunction(r)) {
                    if (l = e.extend({}, s.defaults, l), "number" == typeof l.expires) {
                        var d = l.expires, c = l.expires = new Date;
                        c.setTime(+c + 864e5 * d)
                    }
                    return document.cookie = [t(o), "=", i(r), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
                }
                for (var u = o ? void 0 : {}, f = document.cookie ? document.cookie.split("; ") : [], p = 0, h = f.length; p < h; p++) {
                    var m = f[p].split("="), g = n(m.shift()), b = m.join("=");
                    if (o && o === g) {
                        u = a(b, r);
                        break
                    }
                    o || void 0 === (b = a(b)) || (u[g] = b)
                }
                return u
            };
            s.defaults = {}, e.removeCookie = function (t, n) {
                return void 0 !== e.cookie(t) && (e.cookie(t, "", e.extend({}, n, {expires: -1})), !e.cookie(t))
            }
        })
    }, {}], 13: [function (e, t, n) {
        window.$.noOutline = function (e) {
            $(e || "a").on("focus", function () {
                this.blur()
            })
        }, window.$.fn.serializeObject = function () {
            var e = function (e) {
                for (var t = e.length, n = {}; t--;)"undefined" == typeof n[e[t].name] ? n[e[t].name] = e[t].value : n[e[t].name] += "," + e[t].value;
                return n
            };
            return function () {
                return e(this.serializeArray())
            }
        }(), window.$.fn.val2 = function () {
            return this.is(":text") || this.is("textarea") ? this.val().trim() : this.val()
        }, window.$.fn.checkRow = function (e, t) {
            $(this).find('tbody:not("td>tbale>tbody")').children("tr:nth-child({0})".format(e + 1))[t === !1 ? "removeClass" : "addClass"]("checked")
        }, $.fn.cssPlus = function () {
            var e = arguments;
            if ("object" == typeof e[0])for (var t in e[0])this.cssPlus(t, e[0][t]); else this.each(function (t, n) {
                var i = n.getAttribute("style") || "";
                i.lastIndexOf(";") == i.length - 1 || (i += ";"), i += "{0}:{1}!important;".format(e[0], e[1]), n.setAttribute("style", i)
            });
            return this
        }, $.fn.hidden = function () {
            return this.cssPlus("visibility", "hidden")
        }, $.fn.visible = function () {
            return this.cssPlus("visibility", "visible")
        }, $.random = function () {
            return ("" + $.now() + Math.random()).replace(".", "").slice(8)
        }
    }, {}], 14: [function (e, t, n) {
        !function (e, n) {
            "object" == typeof t && "object" == typeof t.exports ? t.exports = e.document ? n(e, !0) : function (e) {
                if (!e.document)throw new Error("jQuery requires a window with a document");
                return n(e)
            } : n(e)
        }("undefined" != typeof window ? window : this, function (e, t) {
            function n(e) {
                var t = !!e && "length"in e && e.length, n = ae.type(e);
                return "function" !== n && !ae.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
            }

            function i(e, t, n) {
                if (ae.isFunction(t))return ae.grep(e, function (e, i) {
                    return !!t.call(e, i, e) !== n
                });
                if (t.nodeType)return ae.grep(e, function (e) {
                    return e === t !== n
                });
                if ("string" == typeof t) {
                    if (me.test(t))return ae.filter(t, e, n);
                    t = ae.filter(t, e)
                }
                return ae.grep(e, function (e) {
                    return Z.call(t, e) > -1 !== n
                })
            }

            function o(e, t) {
                for (; (e = e[t]) && 1 !== e.nodeType;);
                return e
            }

            function a(e) {
                var t = {};
                return ae.each(e.match(ye) || [], function (e, n) {
                    t[n] = !0
                }), t
            }

            function r() {
                Q.removeEventListener("DOMContentLoaded", r), e.removeEventListener("load", r), ae.ready()
            }

            function s() {
                this.expando = ae.expando + s.uid++
            }

            function l(e, t, n) {
                var i;
                if (void 0 === n && 1 === e.nodeType)if (i = "data-" + t.replace(De, "-$&").toLowerCase(), n = e.getAttribute(i), "string" == typeof n) {
                    try {
                        n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : je.test(n) ? ae.parseJSON(n) : n)
                    } catch (e) {
                    }
                    Te.set(e, t, n)
                } else n = void 0;
                return n
            }

            function d(e, t, n, i) {
                var o, a = 1, r = 20, s = i ? function () {
                    return i.cur()
                } : function () {
                    return ae.css(e, t, "")
                }, l = s(), d = n && n[3] || (ae.cssNumber[t] ? "" : "px"), c = (ae.cssNumber[t] || "px" !== d && +l) && Oe.exec(ae.css(e, t));
                if (c && c[3] !== d) {
                    d = d || c[3], n = n || [], c = +l || 1;
                    do a = a || ".5", c /= a, ae.style(e, t, c + d); while (a !== (a = s() / l) && 1 !== a && --r)
                }
                return n && (c = +c || +l || 0, o = n[1] ? c + (n[1] + 1) * n[2] : +n[2], i && (i.unit = d, i.start = c, i.end = o)), o
            }

            function c(e, t) {
                var n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
                return void 0 === t || t && ae.nodeName(e, t) ? ae.merge([e], n) : n
            }

            function u(e, t) {
                for (var n = 0, i = e.length; n < i; n++)ke.set(e[n], "globalEval", !t || ke.get(t[n], "globalEval"))
            }

            function f(e, t, n, i, o) {
                for (var a, r, s, l, d, f, p = t.createDocumentFragment(), h = [], m = 0, g = e.length; m < g; m++)if (a = e[m], a || 0 === a)if ("object" === ae.type(a))ae.merge(h, a.nodeType ? [a] : a); else if (We.test(a)) {
                    for (r = r || p.appendChild(t.createElement("div")), s = (Ee.exec(a) || ["", ""])[1].toLowerCase(), l = Ne[s] || Ne._default, r.innerHTML = l[1] + ae.htmlPrefilter(a) + l[2], f = l[0]; f--;)r = r.lastChild;
                    ae.merge(h, r.childNodes), r = p.firstChild, r.textContent = ""
                } else h.push(t.createTextNode(a));
                for (p.textContent = "", m = 0; a = h[m++];)if (i && ae.inArray(a, i) > -1)o && o.push(a); else if (d = ae.contains(a.ownerDocument, a), r = c(p.appendChild(a), "script"), d && u(r), n)for (f = 0; a = r[f++];)Ae.test(a.type || "") && n.push(a);
                return p
            }

            function p() {
                return !0
            }

            function h() {
                return !1
            }

            function m() {
                try {
                    return Q.activeElement
                } catch (e) {
                }
            }

            function g(e, t, n, i, o, a) {
                var r, s;
                if ("object" == typeof t) {
                    "string" != typeof n && (i = i || n, n = void 0);
                    for (s in t)g(e, s, n, i, t[s], a);
                    return e
                }
                if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, i = void 0) : (o = i, i = n, n = void 0)), o === !1)o = h; else if (!o)return this;
                return 1 === a && (r = o, o = function (e) {
                    return ae().off(e), r.apply(this, arguments)
                }, o.guid = r.guid || (r.guid = ae.guid++)), e.each(function () {
                    ae.event.add(this, t, o, i, n)
                })
            }

            function b(e, t) {
                return ae.nodeName(e, "table") && ae.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e : e
            }

            function v(e) {
                return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
            }

            function x(e) {
                var t = Be.exec(e.type);
                return t ? e.type = t[1] : e.removeAttribute("type"), e
            }

            function w(e, t) {
                var n, i, o, a, r, s, l, d;
                if (1 === t.nodeType) {
                    if (ke.hasData(e) && (a = ke.access(e), r = ke.set(t, a), d = a.events)) {
                        delete r.handle, r.events = {};
                        for (o in d)for (n = 0, i = d[o].length; n < i; n++)ae.event.add(t, o, d[o][n])
                    }
                    Te.hasData(e) && (s = Te.access(e), l = ae.extend({}, s), Te.set(t, l))
                }
            }

            function y(e, t) {
                var n = t.nodeName.toLowerCase();
                "input" === n && He.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
            }

            function $(e, t, n, i) {
                t = J.apply([], t);
                var o, a, r, s, l, d, u = 0, p = e.length, h = p - 1, m = t[0], g = ae.isFunction(m);
                if (g || p > 1 && "string" == typeof m && !ie.checkClone && Re.test(m))return e.each(function (o) {
                    var a = e.eq(o);
                    g && (t[0] = m.call(this, o, a.html())), $(a, t, n, i)
                });
                if (p && (o = f(t, e[0].ownerDocument, !1, e, i), a = o.firstChild, 1 === o.childNodes.length && (o = a), a || i)) {
                    for (r = ae.map(c(o, "script"), v), s = r.length; u < p; u++)l = o, u !== h && (l = ae.clone(l, !0, !0), s && ae.merge(r, c(l, "script"))), n.call(e[u], l, u);
                    if (s)for (d = r[r.length - 1].ownerDocument, ae.map(r, x), u = 0; u < s; u++)l = r[u], Ae.test(l.type || "") && !ke.access(l, "globalEval") && ae.contains(d, l) && (l.src ? ae._evalUrl && ae._evalUrl(l.src) : ae.globalEval(l.textContent.replace(Ve, "")))
                }
                return e
            }

            function _(e, t, n) {
                for (var i, o = t ? ae.filter(t, e) : e, a = 0; null != (i = o[a]); a++)n || 1 !== i.nodeType || ae.cleanData(c(i)), i.parentNode && (n && ae.contains(i.ownerDocument, i) && u(c(i, "script")), i.parentNode.removeChild(i));
                return e
            }

            function C(e, t) {
                var n = ae(t.createElement(e)).appendTo(t.body), i = ae.css(n[0], "display");
                return n.detach(), i
            }

            function k(e) {
                var t = Q, n = Xe[e];
                return n || (n = C(e, t), "none" !== n && n || (Ye = (Ye || ae("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Ye[0].contentDocument, t.write(), t.close(), n = C(e, t), Ye.detach()), Xe[e] = n), n
            }

            function T(e, t, n) {
                var i, o, a, r, s = e.style;
                return n = n || Ge(e), n && (r = n.getPropertyValue(t) || n[t], "" !== r || ae.contains(e.ownerDocument, e) || (r = ae.style(e, t)), !ie.pixelMarginRight() && Qe.test(r) && Ue.test(t) && (i = s.width, o = s.minWidth, a = s.maxWidth, s.minWidth = s.maxWidth = s.width = r, r = n.width, s.width = i, s.minWidth = o, s.maxWidth = a)), void 0 !== r ? r + "" : r
            }

            function j(e, t) {
                return {
                    get: function () {
                        return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                    }
                }
            }

            function D(e) {
                if (e in it)return e;
                for (var t = e[0].toUpperCase() + e.slice(1), n = nt.length; n--;)if (e = nt[n] + t, e in it)return e
            }

            function F(e, t, n) {
                var i = Oe.exec(t);
                return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
            }

            function O(e, t, n, i, o) {
                for (var a = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, r = 0; a < 4; a += 2)"margin" === n && (r += ae.css(e, n + Se[a], !0, o)), i ? ("content" === n && (r -= ae.css(e, "padding" + Se[a], !0, o)), "margin" !== n && (r -= ae.css(e, "border" + Se[a] + "Width", !0, o))) : (r += ae.css(e, "padding" + Se[a], !0, o), "padding" !== n && (r += ae.css(e, "border" + Se[a] + "Width", !0, o)));
                return r
            }

            function S(t, n, i) {
                var o = !0, a = "width" === n ? t.offsetWidth : t.offsetHeight, r = Ge(t), s = "border-box" === ae.css(t, "boxSizing", !1, r);
                if (Q.msFullscreenElement && e.top !== e && t.getClientRects().length && (a = Math.round(100 * t.getBoundingClientRect()[n])), a <= 0 || null == a) {
                    if (a = T(t, n, r), (a < 0 || null == a) && (a = t.style[n]), Qe.test(a))return a;
                    o = s && (ie.boxSizingReliable() || a === t.style[n]), a = parseFloat(a) || 0
                }
                return a + O(t, n, i || (s ? "border" : "content"), o, r) + "px"
            }

            function z(e, t) {
                for (var n, i, o, a = [], r = 0, s = e.length; r < s; r++)i = e[r], i.style && (a[r] = ke.get(i, "olddisplay"), n = i.style.display, t ? (a[r] || "none" !== n || (i.style.display = ""), "" === i.style.display && ze(i) && (a[r] = ke.access(i, "olddisplay", k(i.nodeName)))) : (o = ze(i), "none" === n && o || ke.set(i, "olddisplay", o ? n : ae.css(i, "display"))));
                for (r = 0; r < s; r++)i = e[r], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? a[r] || "" : "none"));
                return e
            }

            function H(e, t, n, i, o) {
                return new H.prototype.init(e, t, n, i, o)
            }

            function E() {
                return e.setTimeout(function () {
                    ot = void 0
                }), ot = ae.now()
            }

            function A(e, t) {
                var n, i = 0, o = {height: e};
                for (t = t ? 1 : 0; i < 4; i += 2 - t)n = Se[i], o["margin" + n] = o["padding" + n] = e;
                return t && (o.opacity = o.width = e), o
            }

            function N(e, t, n) {
                for (var i, o = (L.tweeners[t] || []).concat(L.tweeners["*"]), a = 0, r = o.length; a < r; a++)if (i = o[a].call(n, t, e))return i
            }

            function W(e, t, n) {
                var i, o, a, r, s, l, d, c, u = this, f = {}, p = e.style, h = e.nodeType && ze(e), m = ke.get(e, "fxshow");
                n.queue || (s = ae._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () {
                    s.unqueued || l()
                }), s.unqueued++, u.always(function () {
                    u.always(function () {
                        s.unqueued--, ae.queue(e, "fx").length || s.empty.fire()
                    })
                })), 1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], d = ae.css(e, "display"), c = "none" === d ? ke.get(e, "olddisplay") || k(e.nodeName) : d, "inline" === c && "none" === ae.css(e, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", u.always(function () {
                    p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
                }));
                for (i in t)if (o = t[i], rt.exec(o)) {
                    if (delete t[i], a = a || "toggle" === o, o === (h ? "hide" : "show")) {
                        if ("show" !== o || !m || void 0 === m[i])continue;
                        h = !0
                    }
                    f[i] = m && m[i] || ae.style(e, i)
                } else d = void 0;
                if (ae.isEmptyObject(f))"inline" === ("none" === d ? k(e.nodeName) : d) && (p.display = d); else {
                    m ? "hidden"in m && (h = m.hidden) : m = ke.access(e, "fxshow", {}), a && (m.hidden = !h), h ? ae(e).show() : u.done(function () {
                        ae(e).hide()
                    }), u.done(function () {
                        var t;
                        ke.remove(e, "fxshow");
                        for (t in f)ae.style(e, t, f[t])
                    });
                    for (i in f)r = N(h ? m[i] : 0, i, u), i in m || (m[i] = r.start, h && (r.end = r.start, r.start = "width" === i || "height" === i ? 1 : 0))
                }
            }

            function P(e, t) {
                var n, i, o, a, r;
                for (n in e)if (i = ae.camelCase(n), o = t[i], a = e[n], ae.isArray(a) && (o = a[1], a = e[n] = a[0]), n !== i && (e[i] = a, delete e[n]), r = ae.cssHooks[i], r && "expand"in r) {
                    a = r.expand(a), delete e[i];
                    for (n in a)n in e || (e[n] = a[n], t[n] = o)
                } else t[i] = o
            }

            function L(e, t, n) {
                var i, o, a = 0, r = L.prefilters.length, s = ae.Deferred().always(function () {
                    delete l.elem
                }), l = function () {
                    if (o)return !1;
                    for (var t = ot || E(), n = Math.max(0, d.startTime + d.duration - t), i = n / d.duration || 0, a = 1 - i, r = 0, l = d.tweens.length; r < l; r++)d.tweens[r].run(a);
                    return s.notifyWith(e, [d, a, n]), a < 1 && l ? n : (s.resolveWith(e, [d]), !1)
                }, d = s.promise({
                    elem: e,
                    props: ae.extend({}, t),
                    opts: ae.extend(!0, {specialEasing: {}, easing: ae.easing._default}, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: ot || E(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function (t, n) {
                        var i = ae.Tween(e, d.opts, t, n, d.opts.specialEasing[t] || d.opts.easing);
                        return d.tweens.push(i), i
                    },
                    stop: function (t) {
                        var n = 0, i = t ? d.tweens.length : 0;
                        if (o)return this;
                        for (o = !0; n < i; n++)d.tweens[n].run(1);
                        return t ? (s.notifyWith(e, [d, 1, 0]), s.resolveWith(e, [d, t])) : s.rejectWith(e, [d, t]), this
                    }
                }), c = d.props;
                for (P(c, d.opts.specialEasing); a < r; a++)if (i = L.prefilters[a].call(d, e, c, d.opts))return ae.isFunction(i.stop) && (ae._queueHooks(d.elem, d.opts.queue).stop = ae.proxy(i.stop, i)), i;
                return ae.map(c, N, d), ae.isFunction(d.opts.start) && d.opts.start.call(e, d), ae.fx.timer(ae.extend(l, {
                    elem: e,
                    anim: d,
                    queue: d.opts.queue
                })), d.progress(d.opts.progress).done(d.opts.done, d.opts.complete).fail(d.opts.fail).always(d.opts.always)
            }

            function I(e) {
                return e.getAttribute && e.getAttribute("class") || ""
            }

            function M(e) {
                return function (t, n) {
                    "string" != typeof t && (n = t, t = "*");
                    var i, o = 0, a = t.toLowerCase().match(ye) || [];
                    if (ae.isFunction(n))for (; i = a[o++];)"+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
                }
            }

            function q(e, t, n, i) {
                function o(s) {
                    var l;
                    return a[s] = !0, ae.each(e[s] || [], function (e, s) {
                        var d = s(t, n, i);
                        return "string" != typeof d || r || a[d] ? r ? !(l = d) : void 0 : (t.dataTypes.unshift(d), o(d), !1)
                    }), l
                }

                var a = {}, r = e === kt;
                return o(t.dataTypes[0]) || !a["*"] && o("*")
            }

            function R(e, t) {
                var n, i, o = ae.ajaxSettings.flatOptions || {};
                for (n in t)void 0 !== t[n] && ((o[n] ? e : i || (i = {}))[n] = t[n]);
                return i && ae.extend(!0, e, i), e
            }

            function B(e, t, n) {
                for (var i, o, a, r, s = e.contents, l = e.dataTypes; "*" === l[0];)l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                if (i)for (o in s)if (s[o] && s[o].test(i)) {
                    l.unshift(o);
                    break
                }
                if (l[0]in n)a = l[0]; else {
                    for (o in n) {
                        if (!l[0] || e.converters[o + " " + l[0]]) {
                            a = o;
                            break
                        }
                        r || (r = o)
                    }
                    a = a || r
                }
                if (a)return a !== l[0] && l.unshift(a), n[a]
            }

            function V(e, t, n, i) {
                var o, a, r, s, l, d = {}, c = e.dataTypes.slice();
                if (c[1])for (r in e.converters)d[r.toLowerCase()] = e.converters[r];
                for (a = c.shift(); a;)if (e.responseFields[a] && (n[e.responseFields[a]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = a, a = c.shift())if ("*" === a)a = l; else if ("*" !== l && l !== a) {
                    if (r = d[l + " " + a] || d["* " + a], !r)for (o in d)if (s = o.split(" "), s[1] === a && (r = d[l + " " + s[0]] || d["* " + s[0]])) {
                        r === !0 ? r = d[o] : d[o] !== !0 && (a = s[0], c.unshift(s[1]));
                        break
                    }
                    if (r !== !0)if (r && e.throws)t = r(t); else try {
                        t = r(t)
                    } catch (e) {
                        return {state: "parsererror", error: r ? e : "No conversion from " + l + " to " + a}
                    }
                }
                return {state: "success", data: t}
            }

            function Y(e, t, n, i) {
                var o;
                if (ae.isArray(t))ae.each(t, function (t, o) {
                    n || Ft.test(e) ? i(e, o) : Y(e + "[" + ("object" == typeof o && null != o ? t : "") + "]", o, n, i)
                }); else if (n || "object" !== ae.type(t))i(e, t); else for (o in t)Y(e + "[" + o + "]", t[o], n, i)
            }

            function X(e) {
                return ae.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
            }

            var U = [], Q = e.document, G = U.slice, J = U.concat, K = U.push, Z = U.indexOf, ee = {}, te = ee.toString, ne = ee.hasOwnProperty, ie = {}, oe = "2.2.0", ae = function (e, t) {
                return new ae.fn.init(e, t)
            }, re = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, se = /^-ms-/, le = /-([\da-z])/gi, de = function (e, t) {
                return t.toUpperCase()
            };
            ae.fn = ae.prototype = {
                jquery: oe, constructor: ae, selector: "", length: 0, toArray: function () {
                    return G.call(this)
                }, get: function (e) {
                    return null != e ? e < 0 ? this[e + this.length] : this[e] : G.call(this)
                }, pushStack: function (e) {
                    var t = ae.merge(this.constructor(), e);
                    return t.prevObject = this, t.context = this.context, t
                }, each: function (e) {
                    return ae.each(this, e)
                }, map: function (e) {
                    return this.pushStack(ae.map(this, function (t, n) {
                        return e.call(t, n, t)
                    }))
                }, slice: function () {
                    return this.pushStack(G.apply(this, arguments))
                }, first: function () {
                    return this.eq(0)
                }, last: function () {
                    return this.eq(-1)
                }, eq: function (e) {
                    var t = this.length, n = +e + (e < 0 ? t : 0);
                    return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
                }, end: function () {
                    return this.prevObject || this.constructor()
                }, push: K, sort: U.sort, splice: U.splice
            }, ae.extend = ae.fn.extend = function () {
                var e, t, n, i, o, a, r = arguments[0] || {}, s = 1, l = arguments.length, d = !1;
                for ("boolean" == typeof r && (d = r, r = arguments[s] || {}, s++), "object" == typeof r || ae.isFunction(r) || (r = {}), s === l && (r = this, s--); s < l; s++)if (null != (e = arguments[s]))for (t in e)n = r[t], i = e[t], r !== i && (d && i && (ae.isPlainObject(i) || (o = ae.isArray(i))) ? (o ? (o = !1, a = n && ae.isArray(n) ? n : []) : a = n && ae.isPlainObject(n) ? n : {}, r[t] = ae.extend(d, a, i)) : void 0 !== i && (r[t] = i));
                return r
            }, ae.extend({
                expando: "jQuery" + (oe + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function (e) {
                    throw new Error(e)
                },
                noop: function () {
                },
                isFunction: function (e) {
                    return "function" === ae.type(e)
                },
                isArray: Array.isArray,
                isWindow: function (e) {
                    return null != e && e === e.window
                },
                isNumeric: function (e) {
                    var t = e && e.toString();
                    return !ae.isArray(e) && t - parseFloat(t) + 1 >= 0
                },
                isPlainObject: function (e) {
                    return "object" === ae.type(e) && !e.nodeType && !ae.isWindow(e) && !(e.constructor && !ne.call(e.constructor.prototype, "isPrototypeOf"))
                },
                isEmptyObject: function (e) {
                    var t;
                    for (t in e)return !1;
                    return !0
                },
                type: function (e) {
                    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ee[te.call(e)] || "object" : typeof e
                },
                globalEval: function (e) {
                    var t, n = eval;
                    e = ae.trim(e), e && (1 === e.indexOf("use strict") ? (t = Q.createElement("script"), t.text = e, Q.head.appendChild(t).parentNode.removeChild(t)) : n(e))
                },
                camelCase: function (e) {
                    return e.replace(se, "ms-").replace(le, de)
                },
                nodeName: function (e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                },
                each: function (e, t) {
                    var i, o = 0;
                    if (n(e))for (i = e.length; o < i && t.call(e[o], o, e[o]) !== !1; o++); else for (o in e)if (t.call(e[o], o, e[o]) === !1)break;
                    return e
                },
                trim: function (e) {
                    return null == e ? "" : (e + "").replace(re, "")
                },
                makeArray: function (e, t) {
                    var i = t || [];
                    return null != e && (n(Object(e)) ? ae.merge(i, "string" == typeof e ? [e] : e) : K.call(i, e)), i
                },
                inArray: function (e, t, n) {
                    return null == t ? -1 : Z.call(t, e, n)
                },
                merge: function (e, t) {
                    for (var n = +t.length, i = 0, o = e.length; i < n; i++)e[o++] = t[i];
                    return e.length = o, e
                },
                grep: function (e, t, n) {
                    for (var i, o = [], a = 0, r = e.length, s = !n; a < r; a++)i = !t(e[a], a), i !== s && o.push(e[a]);
                    return o
                },
                map: function (e, t, i) {
                    var o, a, r = 0, s = [];
                    if (n(e))for (o = e.length; r < o; r++)a = t(e[r], r, i), null != a && s.push(a); else for (r in e)a = t(e[r], r, i), null != a && s.push(a);
                    return J.apply([], s)
                },
                guid: 1,
                proxy: function (e, t) {
                    var n, i, o;
                    if ("string" == typeof t && (n = e[t], t = e, e = n), ae.isFunction(e))return i = G.call(arguments, 2), o = function () {
                        return e.apply(t || this, i.concat(G.call(arguments)))
                    }, o.guid = e.guid = e.guid || ae.guid++, o
                },
                now: Date.now,
                support: ie
            }), "function" == typeof Symbol && (ae.fn[Symbol.iterator] = U[Symbol.iterator]), ae.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
                ee["[object " + t + "]"] = t.toLowerCase()
            });
            var ce = function (e) {
                function t(e, t, n, i) {
                    var o, a, r, s, l, d, u, p, h = t && t.ownerDocument, m = t ? t.nodeType : 9;
                    if (n = n || [], "string" != typeof e || !e || 1 !== m && 9 !== m && 11 !== m)return n;
                    if (!i && ((t ? t.ownerDocument || t : I) !== z && S(t), t = t || z, E)) {
                        if (11 !== m && (d = be.exec(e)))if (o = d[1]) {
                            if (9 === m) {
                                if (!(r = t.getElementById(o)))return n;
                                if (r.id === o)return n.push(r), n
                            } else if (h && (r = h.getElementById(o)) && P(t, r) && r.id === o)return n.push(r), n
                        } else {
                            if (d[2])return K.apply(n, t.getElementsByTagName(e)), n;
                            if ((o = d[3]) && y.getElementsByClassName && t.getElementsByClassName)return K.apply(n, t.getElementsByClassName(o)), n
                        }
                        if (y.qsa && !V[e + " "] && (!A || !A.test(e))) {
                            if (1 !== m)h = t, p = e; else if ("object" !== t.nodeName.toLowerCase()) {
                                for ((s = t.getAttribute("id")) ? s = s.replace(xe, "\\$&") : t.setAttribute("id", s = L), u = k(e), a = u.length, l = fe.test(s) ? "#" + s : "[id='" + s + "']"; a--;)u[a] = l + " " + f(u[a]);
                                p = u.join(","), h = ve.test(e) && c(t.parentNode) || t
                            }
                            if (p)try {
                                return K.apply(n, h.querySelectorAll(p)), n
                            } catch (e) {
                            } finally {
                                s === L && t.removeAttribute("id")
                            }
                        }
                    }
                    return j(e.replace(se, "$1"), t, n, i)
                }

                function n() {
                    function e(n, i) {
                        return t.push(n + " ") > $.cacheLength && delete e[t.shift()], e[n + " "] = i
                    }

                    var t = [];
                    return e
                }

                function i(e) {
                    return e[L] = !0, e
                }

                function o(e) {
                    var t = z.createElement("div");
                    try {
                        return !!e(t)
                    } catch (e) {
                        return !1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), t = null
                    }
                }

                function a(e, t) {
                    for (var n = e.split("|"), i = n.length; i--;)$.attrHandle[n[i]] = t
                }

                function r(e, t) {
                    var n = t && e, i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || X) - (~e.sourceIndex || X);
                    if (i)return i;
                    if (n)for (; n = n.nextSibling;)if (n === t)return -1;
                    return e ? 1 : -1
                }

                function s(e) {
                    return function (t) {
                        var n = t.nodeName.toLowerCase();
                        return "input" === n && t.type === e
                    }
                }

                function l(e) {
                    return function (t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }

                function d(e) {
                    return i(function (t) {
                        return t = +t, i(function (n, i) {
                            for (var o, a = e([], n.length, t), r = a.length; r--;)n[o = a[r]] && (n[o] = !(i[o] = n[o]))
                        })
                    })
                }

                function c(e) {
                    return e && "undefined" != typeof e.getElementsByTagName && e
                }

                function u() {
                }

                function f(e) {
                    for (var t = 0, n = e.length, i = ""; t < n; t++)i += e[t].value;
                    return i
                }

                function p(e, t, n) {
                    var i = t.dir, o = n && "parentNode" === i, a = q++;
                    return t.first ? function (t, n, a) {
                        for (; t = t[i];)if (1 === t.nodeType || o)return e(t, n, a)
                    } : function (t, n, r) {
                        var s, l, d, c = [M, a];
                        if (r) {
                            for (; t = t[i];)if ((1 === t.nodeType || o) && e(t, n, r))return !0
                        } else for (; t = t[i];)if (1 === t.nodeType || o) {
                            if (d = t[L] || (t[L] = {}), l = d[t.uniqueID] || (d[t.uniqueID] = {}), (s = l[i]) && s[0] === M && s[1] === a)return c[2] = s[2];
                            if (l[i] = c, c[2] = e(t, n, r))return !0
                        }
                    }
                }

                function h(e) {
                    return e.length > 1 ? function (t, n, i) {
                        for (var o = e.length; o--;)if (!e[o](t, n, i))return !1;
                        return !0
                    } : e[0]
                }

                function m(e, n, i) {
                    for (var o = 0, a = n.length; o < a; o++)t(e, n[o], i);
                    return i
                }

                function g(e, t, n, i, o) {
                    for (var a, r = [], s = 0, l = e.length, d = null != t; s < l; s++)(a = e[s]) && (n && !n(a, i, o) || (r.push(a), d && t.push(s)));
                    return r
                }

                function b(e, t, n, o, a, r) {
                    return o && !o[L] && (o = b(o)), a && !a[L] && (a = b(a, r)), i(function (i, r, s, l) {
                        var d, c, u, f = [], p = [], h = r.length, b = i || m(t || "*", s.nodeType ? [s] : s, []), v = !e || !i && t ? b : g(b, f, e, s, l), x = n ? a || (i ? e : h || o) ? [] : r : v;
                        if (n && n(v, x, s, l), o)for (d = g(x, p), o(d, [], s, l), c = d.length; c--;)(u = d[c]) && (x[p[c]] = !(v[p[c]] = u));
                        if (i) {
                            if (a || e) {
                                if (a) {
                                    for (d = [], c = x.length; c--;)(u = x[c]) && d.push(v[c] = u);
                                    a(null, x = [], d, l)
                                }
                                for (c = x.length; c--;)(u = x[c]) && (d = a ? ee(i, u) : f[c]) > -1 && (i[d] = !(r[d] = u))
                            }
                        } else x = g(x === r ? x.splice(h, x.length) : x), a ? a(null, r, x, l) : K.apply(r, x)
                    })
                }

                function v(e) {
                    for (var t, n, i, o = e.length, a = $.relative[e[0].type], r = a || $.relative[" "], s = a ? 1 : 0, l = p(function (e) {
                        return e === t
                    }, r, !0), d = p(function (e) {
                        return ee(t, e) > -1
                    }, r, !0), c = [function (e, n, i) {
                        var o = !a && (i || n !== D) || ((t = n).nodeType ? l(e, n, i) : d(e, n, i));
                        return t = null, o
                    }]; s < o; s++)if (n = $.relative[e[s].type])c = [p(h(c), n)]; else {
                        if (n = $.filter[e[s].type].apply(null, e[s].matches), n[L]) {
                            for (i = ++s; i < o && !$.relative[e[i].type]; i++);
                            return b(s > 1 && h(c), s > 1 && f(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(se, "$1"), n, s < i && v(e.slice(s, i)), i < o && v(e = e.slice(i)), i < o && f(e))
                        }
                        c.push(n)
                    }
                    return h(c)
                }

                function x(e, n) {
                    var o = n.length > 0, a = e.length > 0, r = function (i, r, s, l, d) {
                        var c, u, f, p = 0, h = "0", m = i && [], b = [], v = D, x = i || a && $.find.TAG("*", d), w = M += null == v ? 1 : Math.random() || .1, y = x.length;
                        for (d && (D = r === z || r || d); h !== y && null != (c = x[h]); h++) {
                            if (a && c) {
                                for (u = 0, r || c.ownerDocument === z || (S(c), s = !E); f = e[u++];)if (f(c, r || z, s)) {
                                    l.push(c);
                                    break
                                }
                                d && (M = w)
                            }
                            o && ((c = !f && c) && p--, i && m.push(c))
                        }
                        if (p += h, o && h !== p) {
                            for (u = 0; f = n[u++];)f(m, b, r, s);
                            if (i) {
                                if (p > 0)for (; h--;)m[h] || b[h] || (b[h] = G.call(l));
                                b = g(b)
                            }
                            K.apply(l, b), d && !i && b.length > 0 && p + n.length > 1 && t.uniqueSort(l)
                        }
                        return d && (M = w, D = v), m
                    };
                    return o ? i(r) : r
                }

                var w, y, $, _, C, k, T, j, D, F, O, S, z, H, E, A, N, W, P, L = "sizzle" + 1 * new Date, I = e.document, M = 0, q = 0, R = n(), B = n(), V = n(), Y = function (e, t) {
                    return e === t && (O = !0), 0
                }, X = 1 << 31, U = {}.hasOwnProperty, Q = [], G = Q.pop, J = Q.push, K = Q.push, Z = Q.slice, ee = function (e, t) {
                    for (var n = 0, i = e.length; n < i; n++)if (e[n] === t)return n;
                    return -1
                }, te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", oe = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]", ae = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)", re = new RegExp(ne + "+", "g"), se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"), le = new RegExp("^" + ne + "*," + ne + "*"), de = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"), ue = new RegExp(ae), fe = new RegExp("^" + ie + "$"), pe = {
                    ID: new RegExp("^#(" + ie + ")"),
                    CLASS: new RegExp("^\\.(" + ie + ")"),
                    TAG: new RegExp("^(" + ie + "|[*])"),
                    ATTR: new RegExp("^" + oe),
                    PSEUDO: new RegExp("^" + ae),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + te + ")$", "i"),
                    needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                }, he = /^(?:input|select|textarea|button)$/i, me = /^h\d$/i, ge = /^[^{]+\{\s*\[native \w/, be = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ve = /[+~]/, xe = /'|\\/g, we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"), ye = function (e, t, n) {
                    var i = "0x" + t - 65536;
                    return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                }, $e = function () {
                    S()
                };
                try {
                    K.apply(Q = Z.call(I.childNodes), I.childNodes), Q[I.childNodes.length].nodeType
                } catch (e) {
                    K = {
                        apply: Q.length ? function (e, t) {
                            J.apply(e, Z.call(t))
                        } : function (e, t) {
                            for (var n = e.length, i = 0; e[n++] = t[i++];);
                            e.length = n - 1
                        }
                    }
                }
                y = t.support = {}, C = t.isXML = function (e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return !!t && "HTML" !== t.nodeName
                }, S = t.setDocument = function (e) {
                    var t, n, i = e ? e.ownerDocument || e : I;
                    return i !== z && 9 === i.nodeType && i.documentElement ? (z = i, H = z.documentElement, E = !C(z), (n = z.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", $e, !1) : n.attachEvent && n.attachEvent("onunload", $e)), y.attributes = o(function (e) {
                        return e.className = "i", !e.getAttribute("className")
                    }), y.getElementsByTagName = o(function (e) {
                        return e.appendChild(z.createComment("")), !e.getElementsByTagName("*").length
                    }), y.getElementsByClassName = ge.test(z.getElementsByClassName), y.getById = o(function (e) {
                        return H.appendChild(e).id = L, !z.getElementsByName || !z.getElementsByName(L).length
                    }), y.getById ? ($.find.ID = function (e, t) {
                        if ("undefined" != typeof t.getElementById && E) {
                            var n = t.getElementById(e);
                            return n ? [n] : []
                        }
                    }, $.filter.ID = function (e) {
                        var t = e.replace(we, ye);
                        return function (e) {
                            return e.getAttribute("id") === t
                        }
                    }) : (delete $.find.ID, $.filter.ID = function (e) {
                        var t = e.replace(we, ye);
                        return function (e) {
                            var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }), $.find.TAG = y.getElementsByTagName ? function (e, t) {
                        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : y.qsa ? t.querySelectorAll(e) : void 0
                    } : function (e, t) {
                        var n, i = [], o = 0, a = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = a[o++];)1 === n.nodeType && i.push(n);
                            return i
                        }
                        return a
                    }, $.find.CLASS = y.getElementsByClassName && function (e, t) {
                            if ("undefined" != typeof t.getElementsByClassName && E)return t.getElementsByClassName(e)
                        }, N = [], A = [], (y.qsa = ge.test(z.querySelectorAll)) && (o(function (e) {
                        H.appendChild(e).innerHTML = "<a id='" + L + "'></a><select id='" + L + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && A.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || A.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + L + "-]").length || A.push("~="), e.querySelectorAll(":checked").length || A.push(":checked"), e.querySelectorAll("a#" + L + "+*").length || A.push(".#.+[+~]")
                    }), o(function (e) {
                        var t = z.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && A.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || A.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), A.push(",.*:")
                    })), (y.matchesSelector = ge.test(W = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && o(function (e) {
                        y.disconnectedMatch = W.call(e, "div"), W.call(e, "[s!='']:x"), N.push("!=", ae)
                    }), A = A.length && new RegExp(A.join("|")), N = N.length && new RegExp(N.join("|")), t = ge.test(H.compareDocumentPosition), P = t || ge.test(H.contains) ? function (e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
                        return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                    } : function (e, t) {
                        if (t)for (; t = t.parentNode;)if (t === e)return !0;
                        return !1
                    }, Y = t ? function (e, t) {
                        if (e === t)return O = !0, 0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !y.sortDetached && t.compareDocumentPosition(e) === n ? e === z || e.ownerDocument === I && P(I, e) ? -1 : t === z || t.ownerDocument === I && P(I, t) ? 1 : F ? ee(F, e) - ee(F, t) : 0 : 4 & n ? -1 : 1)
                    } : function (e, t) {
                        if (e === t)return O = !0, 0;
                        var n, i = 0, o = e.parentNode, a = t.parentNode, s = [e], l = [t];
                        if (!o || !a)return e === z ? -1 : t === z ? 1 : o ? -1 : a ? 1 : F ? ee(F, e) - ee(F, t) : 0;
                        if (o === a)return r(e, t);
                        for (n = e; n = n.parentNode;)s.unshift(n);
                        for (n = t; n = n.parentNode;)l.unshift(n);
                        for (; s[i] === l[i];)i++;
                        return i ? r(s[i], l[i]) : s[i] === I ? -1 : l[i] === I ? 1 : 0
                    }, z) : z
                }, t.matches = function (e, n) {
                    return t(e, null, null, n)
                }, t.matchesSelector = function (e, n) {
                    if ((e.ownerDocument || e) !== z && S(e), n = n.replace(ce, "='$1']"), y.matchesSelector && E && !V[n + " "] && (!N || !N.test(n)) && (!A || !A.test(n)))try {
                        var i = W.call(e, n);
                        if (i || y.disconnectedMatch || e.document && 11 !== e.document.nodeType)return i
                    } catch (e) {
                    }
                    return t(n, z, null, [e]).length > 0
                }, t.contains = function (e, t) {
                    return (e.ownerDocument || e) !== z && S(e), P(e, t)
                }, t.attr = function (e, t) {
                    (e.ownerDocument || e) !== z && S(e);
                    var n = $.attrHandle[t.toLowerCase()], i = n && U.call($.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
                    return void 0 !== i ? i : y.attributes || !E ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
                }, t.error = function (e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, t.uniqueSort = function (e) {
                    var t, n = [], i = 0, o = 0;
                    if (O = !y.detectDuplicates, F = !y.sortStable && e.slice(0), e.sort(Y), O) {
                        for (; t = e[o++];)t === e[o] && (i = n.push(o));
                        for (; i--;)e.splice(n[i], 1)
                    }
                    return F = null, e
                }, _ = t.getText = function (e) {
                    var t, n = "", i = 0, o = e.nodeType;
                    if (o) {
                        if (1 === o || 9 === o || 11 === o) {
                            if ("string" == typeof e.textContent)return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling)n += _(e)
                        } else if (3 === o || 4 === o)return e.nodeValue
                    } else for (; t = e[i++];)n += _(t);
                    return n
                }, $ = t.selectors = {
                    cacheLength: 50,
                    createPseudo: i,
                    match: pe,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {dir: "parentNode", first: !0},
                        " ": {dir: "parentNode"},
                        "+": {dir: "previousSibling", first: !0},
                        "~": {dir: "previousSibling"}
                    },
                    preFilter: {
                        ATTR: function (e) {
                            return e[1] = e[1].replace(we, ye), e[3] = (e[3] || e[4] || e[5] || "").replace(we, ye), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        }, CHILD: function (e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                        }, PSEUDO: function (e) {
                            var t, n = !e[6] && e[2];
                            return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && ue.test(n) && (t = k(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function (e) {
                            var t = e.replace(we, ye).toLowerCase();
                            return "*" === e ? function () {
                                return !0
                            } : function (e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        }, CLASS: function (e) {
                            var t = R[e + " "];
                            return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && R(e, function (e) {
                                    return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                                })
                        }, ATTR: function (e, n, i) {
                            return function (o) {
                                var a = t.attr(o, e);
                                return null == a ? "!=" === n : !n || (a += "", "=" === n ? a === i : "!=" === n ? a !== i : "^=" === n ? i && 0 === a.indexOf(i) : "*=" === n ? i && a.indexOf(i) > -1 : "$=" === n ? i && a.slice(-i.length) === i : "~=" === n ? (" " + a.replace(re, " ") + " ").indexOf(i) > -1 : "|=" === n && (a === i || a.slice(0, i.length + 1) === i + "-"))
                            }
                        }, CHILD: function (e, t, n, i, o) {
                            var a = "nth" !== e.slice(0, 3), r = "last" !== e.slice(-4), s = "of-type" === t;
                            return 1 === i && 0 === o ? function (e) {
                                return !!e.parentNode
                            } : function (t, n, l) {
                                var d, c, u, f, p, h, m = a !== r ? "nextSibling" : "previousSibling", g = t.parentNode, b = s && t.nodeName.toLowerCase(), v = !l && !s, x = !1;
                                if (g) {
                                    if (a) {
                                        for (; m;) {
                                            for (f = t; f = f[m];)if (s ? f.nodeName.toLowerCase() === b : 1 === f.nodeType)return !1;
                                            h = m = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [r ? g.firstChild : g.lastChild], r && v) {
                                        for (f = g, u = f[L] || (f[L] = {}), c = u[f.uniqueID] || (u[f.uniqueID] = {}), d = c[e] || [], p = d[0] === M && d[1], x = p && d[2], f = p && g.childNodes[p]; f = ++p && f && f[m] || (x = p = 0) || h.pop();)if (1 === f.nodeType && ++x && f === t) {
                                            c[e] = [M, p, x];
                                            break
                                        }
                                    } else if (v && (f = t, u = f[L] || (f[L] = {}), c = u[f.uniqueID] || (u[f.uniqueID] = {}), d = c[e] || [], p = d[0] === M && d[1], x = p), x === !1)for (; (f = ++p && f && f[m] || (x = p = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== b : 1 !== f.nodeType) || !++x || (v && (u = f[L] || (f[L] = {}), c = u[f.uniqueID] || (u[f.uniqueID] = {}), c[e] = [M, x]), f !== t)););
                                    return x -= o, x === i || x % i === 0 && x / i >= 0
                                }
                            }
                        }, PSEUDO: function (e, n) {
                            var o, a = $.pseudos[e] || $.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                            return a[L] ? a(n) : a.length > 1 ? (o = [e, e, "", n], $.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, t) {
                                for (var i, o = a(e, n), r = o.length; r--;)i = ee(e, o[r]), e[i] = !(t[i] = o[r])
                            }) : function (e) {
                                return a(e, 0, o)
                            }) : a
                        }
                    },
                    pseudos: {
                        not: i(function (e) {
                            var t = [], n = [], o = T(e.replace(se, "$1"));
                            return o[L] ? i(function (e, t, n, i) {
                                for (var a, r = o(e, null, i, []), s = e.length; s--;)(a = r[s]) && (e[s] = !(t[s] = a))
                            }) : function (e, i, a) {
                                return t[0] = e, o(t, null, a, n), t[0] = null, !n.pop()
                            }
                        }), has: i(function (e) {
                            return function (n) {
                                return t(e, n).length > 0
                            }
                        }), contains: i(function (e) {
                            return e = e.replace(we, ye), function (t) {
                                return (t.textContent || t.innerText || _(t)).indexOf(e) > -1
                            }
                        }), lang: i(function (e) {
                            return fe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(we, ye).toLowerCase(), function (t) {
                                var n;
                                do if (n = E ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                        }), target: function (t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        }, root: function (e) {
                            return e === H
                        }, focus: function (e) {
                            return e === z.activeElement && (!z.hasFocus || z.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        }, enabled: function (e) {
                            return e.disabled === !1
                        },
                        disabled: function (e) {
                            return e.disabled === !0
                        }, checked: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        }, selected: function (e) {
                            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                        }, empty: function (e) {
                            for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
                            return !0
                        }, parent: function (e) {
                            return !$.pseudos.empty(e)
                        }, header: function (e) {
                            return me.test(e.nodeName)
                        }, input: function (e) {
                            return he.test(e.nodeName)
                        }, button: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        }, text: function (e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                        }, first: d(function () {
                            return [0]
                        }), last: d(function (e, t) {
                            return [t - 1]
                        }), eq: d(function (e, t, n) {
                            return [n < 0 ? n + t : n]
                        }), even: d(function (e, t) {
                            for (var n = 0; n < t; n += 2)e.push(n);
                            return e
                        }), odd: d(function (e, t) {
                            for (var n = 1; n < t; n += 2)e.push(n);
                            return e
                        }), lt: d(function (e, t, n) {
                            for (var i = n < 0 ? n + t : n; --i >= 0;)e.push(i);
                            return e
                        }), gt: d(function (e, t, n) {
                            for (var i = n < 0 ? n + t : n; ++i < t;)e.push(i);
                            return e
                        })
                    }
                }, $.pseudos.nth = $.pseudos.eq;
                for (w in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})$.pseudos[w] = s(w);
                for (w in{submit: !0, reset: !0})$.pseudos[w] = l(w);
                return u.prototype = $.filters = $.pseudos, $.setFilters = new u, k = t.tokenize = function (e, n) {
                    var i, o, a, r, s, l, d, c = B[e + " "];
                    if (c)return n ? 0 : c.slice(0);
                    for (s = e, l = [], d = $.preFilter; s;) {
                        i && !(o = le.exec(s)) || (o && (s = s.slice(o[0].length) || s), l.push(a = [])), i = !1, (o = de.exec(s)) && (i = o.shift(), a.push({
                            value: i,
                            type: o[0].replace(se, " ")
                        }), s = s.slice(i.length));
                        for (r in $.filter)!(o = pe[r].exec(s)) || d[r] && !(o = d[r](o)) || (i = o.shift(), a.push({
                            value: i,
                            type: r,
                            matches: o
                        }), s = s.slice(i.length));
                        if (!i)break
                    }
                    return n ? s.length : s ? t.error(e) : B(e, l).slice(0)
                }, T = t.compile = function (e, t) {
                    var n, i = [], o = [], a = V[e + " "];
                    if (!a) {
                        for (t || (t = k(e)), n = t.length; n--;)a = v(t[n]), a[L] ? i.push(a) : o.push(a);
                        a = V(e, x(o, i)), a.selector = e
                    }
                    return a
                }, j = t.select = function (e, t, n, i) {
                    var o, a, r, s, l, d = "function" == typeof e && e, u = !i && k(e = d.selector || e);
                    if (n = n || [], 1 === u.length) {
                        if (a = u[0] = u[0].slice(0), a.length > 2 && "ID" === (r = a[0]).type && y.getById && 9 === t.nodeType && E && $.relative[a[1].type]) {
                            if (t = ($.find.ID(r.matches[0].replace(we, ye), t) || [])[0], !t)return n;
                            d && (t = t.parentNode), e = e.slice(a.shift().value.length)
                        }
                        for (o = pe.needsContext.test(e) ? 0 : a.length; o-- && (r = a[o], !$.relative[s = r.type]);)if ((l = $.find[s]) && (i = l(r.matches[0].replace(we, ye), ve.test(a[0].type) && c(t.parentNode) || t))) {
                            if (a.splice(o, 1), e = i.length && f(a), !e)return K.apply(n, i), n;
                            break
                        }
                    }
                    return (d || T(e, u))(i, t, !E, n, !t || ve.test(e) && c(t.parentNode) || t), n
                }, y.sortStable = L.split("").sort(Y).join("") === L, y.detectDuplicates = !!O, S(), y.sortDetached = o(function (e) {
                    return 1 & e.compareDocumentPosition(z.createElement("div"))
                }), o(function (e) {
                    return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                }) || a("type|href|height|width", function (e, t, n) {
                    if (!n)return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                }), y.attributes && o(function (e) {
                    return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                }) || a("value", function (e, t, n) {
                    if (!n && "input" === e.nodeName.toLowerCase())return e.defaultValue
                }), o(function (e) {
                    return null == e.getAttribute("disabled")
                }) || a(te, function (e, t, n) {
                    var i;
                    if (!n)return e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
                }), t
            }(e);
            ae.find = ce, ae.expr = ce.selectors, ae.expr[":"] = ae.expr.pseudos, ae.uniqueSort = ae.unique = ce.uniqueSort, ae.text = ce.getText, ae.isXMLDoc = ce.isXML, ae.contains = ce.contains;
            var ue = function (e, t, n) {
                for (var i = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)if (1 === e.nodeType) {
                    if (o && ae(e).is(n))break;
                    i.push(e)
                }
                return i
            }, fe = function (e, t) {
                for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
                return n
            }, pe = ae.expr.match.needsContext, he = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, me = /^.[^:#\[\.,]*$/;
            ae.filter = function (e, t, n) {
                var i = t[0];
                return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? ae.find.matchesSelector(i, e) ? [i] : [] : ae.find.matches(e, ae.grep(t, function (e) {
                    return 1 === e.nodeType
                }))
            }, ae.fn.extend({
                find: function (e) {
                    var t, n = this.length, i = [], o = this;
                    if ("string" != typeof e)return this.pushStack(ae(e).filter(function () {
                        for (t = 0; t < n; t++)if (ae.contains(o[t], this))return !0
                    }));
                    for (t = 0; t < n; t++)ae.find(e, o[t], i);
                    return i = this.pushStack(n > 1 ? ae.unique(i) : i), i.selector = this.selector ? this.selector + " " + e : e, i
                }, filter: function (e) {
                    return this.pushStack(i(this, e || [], !1))
                }, not: function (e) {
                    return this.pushStack(i(this, e || [], !0))
                }, is: function (e) {
                    return !!i(this, "string" == typeof e && pe.test(e) ? ae(e) : e || [], !1).length
                }
            });
            var ge, be = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ve = ae.fn.init = function (e, t, n) {
                var i, o;
                if (!e)return this;
                if (n = n || ge, "string" == typeof e) {
                    if (i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : be.exec(e), !i || !i[1] && t)return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                    if (i[1]) {
                        if (t = t instanceof ae ? t[0] : t, ae.merge(this, ae.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : Q, !0)), he.test(i[1]) && ae.isPlainObject(t))for (i in t)ae.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                        return this
                    }
                    return o = Q.getElementById(i[2]), o && o.parentNode && (this.length = 1, this[0] = o), this.context = Q, this.selector = e, this
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ae.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(ae) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), ae.makeArray(e, this))
            };
            ve.prototype = ae.fn, ge = ae(Q);
            var xe = /^(?:parents|prev(?:Until|All))/, we = {children: !0, contents: !0, next: !0, prev: !0};
            ae.fn.extend({
                has: function (e) {
                    var t = ae(e, this), n = t.length;
                    return this.filter(function () {
                        for (var e = 0; e < n; e++)if (ae.contains(this, t[e]))return !0
                    })
                }, closest: function (e, t) {
                    for (var n, i = 0, o = this.length, a = [], r = pe.test(e) || "string" != typeof e ? ae(e, t || this.context) : 0; i < o; i++)for (n = this[i]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (r ? r.index(n) > -1 : 1 === n.nodeType && ae.find.matchesSelector(n, e))) {
                        a.push(n);
                        break
                    }
                    return this.pushStack(a.length > 1 ? ae.uniqueSort(a) : a)
                }, index: function (e) {
                    return e ? "string" == typeof e ? Z.call(ae(e), this[0]) : Z.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                }, add: function (e, t) {
                    return this.pushStack(ae.uniqueSort(ae.merge(this.get(), ae(e, t))))
                }, addBack: function (e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                }
            }), ae.each({
                parent: function (e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t : null
                }, parents: function (e) {
                    return ue(e, "parentNode")
                }, parentsUntil: function (e, t, n) {
                    return ue(e, "parentNode", n)
                }, next: function (e) {
                    return o(e, "nextSibling")
                }, prev: function (e) {
                    return o(e, "previousSibling")
                }, nextAll: function (e) {
                    return ue(e, "nextSibling")
                }, prevAll: function (e) {
                    return ue(e, "previousSibling")
                }, nextUntil: function (e, t, n) {
                    return ue(e, "nextSibling", n)
                }, prevUntil: function (e, t, n) {
                    return ue(e, "previousSibling", n)
                }, siblings: function (e) {
                    return fe((e.parentNode || {}).firstChild, e)
                }, children: function (e) {
                    return fe(e.firstChild)
                }, contents: function (e) {
                    return e.contentDocument || ae.merge([], e.childNodes)
                }
            }, function (e, t) {
                ae.fn[e] = function (n, i) {
                    var o = ae.map(this, t, n);
                    return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = ae.filter(i, o)), this.length > 1 && (we[e] || ae.uniqueSort(o), xe.test(e) && o.reverse()), this.pushStack(o)
                }
            });
            var ye = /\S+/g;
            ae.Callbacks = function (e) {
                e = "string" == typeof e ? a(e) : ae.extend({}, e);
                var t, n, i, o, r = [], s = [], l = -1, d = function () {
                    for (o = e.once, i = t = !0; s.length; l = -1)for (n = s.shift(); ++l < r.length;)r[l].apply(n[0], n[1]) === !1 && e.stopOnFalse && (l = r.length, n = !1);
                    e.memory || (n = !1), t = !1, o && (r = n ? [] : "")
                }, c = {
                    add: function () {
                        return r && (n && !t && (l = r.length - 1, s.push(n)), function t(n) {
                            ae.each(n, function (n, i) {
                                ae.isFunction(i) ? e.unique && c.has(i) || r.push(i) : i && i.length && "string" !== ae.type(i) && t(i)
                            })
                        }(arguments), n && !t && d()), this
                    }, remove: function () {
                        return ae.each(arguments, function (e, t) {
                            for (var n; (n = ae.inArray(t, r, n)) > -1;)r.splice(n, 1), n <= l && l--
                        }), this
                    }, has: function (e) {
                        return e ? ae.inArray(e, r) > -1 : r.length > 0
                    }, empty: function () {
                        return r && (r = []), this
                    }, disable: function () {
                        return o = s = [], r = n = "", this
                    }, disabled: function () {
                        return !r
                    }, lock: function () {
                        return o = s = [], n || (r = n = ""), this
                    }, locked: function () {
                        return !!o
                    }, fireWith: function (e, n) {
                        return o || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || d()), this
                    }, fire: function () {
                        return c.fireWith(this, arguments), this
                    }, fired: function () {
                        return !!i
                    }
                };
                return c
            }, ae.extend({
                Deferred: function (e) {
                    var t = [["resolve", "done", ae.Callbacks("once memory"), "resolved"], ["reject", "fail", ae.Callbacks("once memory"), "rejected"], ["notify", "progress", ae.Callbacks("memory")]], n = "pending", i = {
                        state: function () {
                            return n
                        }, always: function () {
                            return o.done(arguments).fail(arguments), this
                        }, then: function () {
                            var e = arguments;
                            return ae.Deferred(function (n) {
                                ae.each(t, function (t, a) {
                                    var r = ae.isFunction(e[t]) && e[t];
                                    o[a[1]](function () {
                                        var e = r && r.apply(this, arguments);
                                        e && ae.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[a[0] + "With"](this === i ? n.promise() : this, r ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        }, promise: function (e) {
                            return null != e ? ae.extend(e, i) : i
                        }
                    }, o = {};
                    return i.pipe = i.then, ae.each(t, function (e, a) {
                        var r = a[2], s = a[3];
                        i[a[1]] = r.add, s && r.add(function () {
                            n = s
                        }, t[1 ^ e][2].disable, t[2][2].lock), o[a[0]] = function () {
                            return o[a[0] + "With"](this === o ? i : this, arguments), this
                        }, o[a[0] + "With"] = r.fireWith
                    }), i.promise(o), e && e.call(o, o), o
                }, when: function (e) {
                    var t, n, i, o = 0, a = G.call(arguments), r = a.length, s = 1 !== r || e && ae.isFunction(e.promise) ? r : 0, l = 1 === s ? e : ae.Deferred(), d = function (e, n, i) {
                        return function (o) {
                            n[e] = this, i[e] = arguments.length > 1 ? G.call(arguments) : o, i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                        }
                    };
                    if (r > 1)for (t = new Array(r), n = new Array(r), i = new Array(r); o < r; o++)a[o] && ae.isFunction(a[o].promise) ? a[o].promise().progress(d(o, n, t)).done(d(o, i, a)).fail(l.reject) : --s;
                    return s || l.resolveWith(i, a), l.promise()
                }
            });
            var $e;
            ae.fn.ready = function (e) {
                return ae.ready.promise().done(e), this
            }, ae.extend({
                isReady: !1, readyWait: 1, holdReady: function (e) {
                    e ? ae.readyWait++ : ae.ready(!0)
                }, ready: function (e) {
                    (e === !0 ? --ae.readyWait : ae.isReady) || (ae.isReady = !0, e !== !0 && --ae.readyWait > 0 || ($e.resolveWith(Q, [ae]), ae.fn.triggerHandler && (ae(Q).triggerHandler("ready"), ae(Q).off("ready"))))
                }
            }), ae.ready.promise = function (t) {
                return $e || ($e = ae.Deferred(), "complete" === Q.readyState || "loading" !== Q.readyState && !Q.documentElement.doScroll ? e.setTimeout(ae.ready) : (Q.addEventListener("DOMContentLoaded", r), e.addEventListener("load", r))), $e.promise(t)
            }, ae.ready.promise();
            var _e = function (e, t, n, i, o, a, r) {
                var s = 0, l = e.length, d = null == n;
                if ("object" === ae.type(n)) {
                    o = !0;
                    for (s in n)_e(e, t, s, n[s], !0, a, r)
                } else if (void 0 !== i && (o = !0, ae.isFunction(i) || (r = !0), d && (r ? (t.call(e, i), t = null) : (d = t, t = function (e, t, n) {
                        return d.call(ae(e), n)
                    })), t))for (; s < l; s++)t(e[s], n, r ? i : i.call(e[s], s, t(e[s], n)));
                return o ? e : d ? t.call(e) : l ? t(e[0], n) : a
            }, Ce = function (e) {
                return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
            };
            s.uid = 1, s.prototype = {
                register: function (e, t) {
                    var n = t || {};
                    return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                        value: n,
                        writable: !0,
                        configurable: !0
                    }), e[this.expando]
                }, cache: function (e) {
                    if (!Ce(e))return {};
                    var t = e[this.expando];
                    return t || (t = {}, Ce(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                        value: t,
                        configurable: !0
                    }))), t
                }, set: function (e, t, n) {
                    var i, o = this.cache(e);
                    if ("string" == typeof t)o[t] = n; else for (i in t)o[i] = t[i];
                    return o
                }, get: function (e, t) {
                    return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
                }, access: function (e, t, n) {
                    var i;
                    return void 0 === t || t && "string" == typeof t && void 0 === n ? (i = this.get(e, t), void 0 !== i ? i : this.get(e, ae.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
                }, remove: function (e, t) {
                    var n, i, o, a = e[this.expando];
                    if (void 0 !== a) {
                        if (void 0 === t)this.register(e); else {
                            ae.isArray(t) ? i = t.concat(t.map(ae.camelCase)) : (o = ae.camelCase(t), t in a ? i = [t, o] : (i = o, i = i in a ? [i] : i.match(ye) || [])), n = i.length;
                            for (; n--;)delete a[i[n]]
                        }
                        (void 0 === t || ae.isEmptyObject(a)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                    }
                }, hasData: function (e) {
                    var t = e[this.expando];
                    return void 0 !== t && !ae.isEmptyObject(t)
                }
            };
            var ke = new s, Te = new s, je = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, De = /[A-Z]/g;
            ae.extend({
                hasData: function (e) {
                    return Te.hasData(e) || ke.hasData(e)
                }, data: function (e, t, n) {
                    return Te.access(e, t, n)
                }, removeData: function (e, t) {
                    Te.remove(e, t)
                }, _data: function (e, t, n) {
                    return ke.access(e, t, n)
                }, _removeData: function (e, t) {
                    ke.remove(e, t)
                }
            }), ae.fn.extend({
                data: function (e, t) {
                    var n, i, o, a = this[0], r = a && a.attributes;
                    if (void 0 === e) {
                        if (this.length && (o = Te.get(a), 1 === a.nodeType && !ke.get(a, "hasDataAttrs"))) {
                            for (n = r.length; n--;)r[n] && (i = r[n].name, 0 === i.indexOf("data-") && (i = ae.camelCase(i.slice(5)), l(a, i, o[i])));
                            ke.set(a, "hasDataAttrs", !0)
                        }
                        return o
                    }
                    return "object" == typeof e ? this.each(function () {
                        Te.set(this, e)
                    }) : _e(this, function (t) {
                        var n, i;
                        if (a && void 0 === t) {
                            if (n = Te.get(a, e) || Te.get(a, e.replace(De, "-$&").toLowerCase()), void 0 !== n)return n;
                            if (i = ae.camelCase(e), n = Te.get(a, i), void 0 !== n)return n;
                            if (n = l(a, i, void 0), void 0 !== n)return n
                        } else i = ae.camelCase(e), this.each(function () {
                            var n = Te.get(this, i);
                            Te.set(this, i, t), e.indexOf("-") > -1 && void 0 !== n && Te.set(this, e, t)
                        })
                    }, null, t, arguments.length > 1, null, !0)
                }, removeData: function (e) {
                    return this.each(function () {
                        Te.remove(this, e)
                    })
                }
            }), ae.extend({
                queue: function (e, t, n) {
                    var i;
                    if (e)return t = (t || "fx") + "queue", i = ke.get(e, t), n && (!i || ae.isArray(n) ? i = ke.access(e, t, ae.makeArray(n)) : i.push(n)), i || []
                }, dequeue: function (e, t) {
                    t = t || "fx";
                    var n = ae.queue(e, t), i = n.length, o = n.shift(), a = ae._queueHooks(e, t), r = function () {
                        ae.dequeue(e, t)
                    };
                    "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete a.stop, o.call(e, r, a)), !i && a && a.empty.fire()
                }, _queueHooks: function (e, t) {
                    var n = t + "queueHooks";
                    return ke.get(e, n) || ke.access(e, n, {
                            empty: ae.Callbacks("once memory").add(function () {
                                ke.remove(e, [t + "queue", n])
                            })
                        })
                }
            }), ae.fn.extend({
                queue: function (e, t) {
                    var n = 2;
                    return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? ae.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                        var n = ae.queue(this, e, t);
                        ae._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && ae.dequeue(this, e)
                    })
                }, dequeue: function (e) {
                    return this.each(function () {
                        ae.dequeue(this, e)
                    })
                }, clearQueue: function (e) {
                    return this.queue(e || "fx", [])
                }, promise: function (e, t) {
                    var n, i = 1, o = ae.Deferred(), a = this, r = this.length, s = function () {
                        --i || o.resolveWith(a, [a])
                    };
                    for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; r--;)n = ke.get(a[r], e + "queueHooks"), n && n.empty && (i++, n.empty.add(s));
                    return s(), o.promise(t)
                }
            });
            var Fe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Oe = new RegExp("^(?:([+-])=|)(" + Fe + ")([a-z%]*)$", "i"), Se = ["Top", "Right", "Bottom", "Left"], ze = function (e, t) {
                return e = t || e, "none" === ae.css(e, "display") || !ae.contains(e.ownerDocument, e)
            }, He = /^(?:checkbox|radio)$/i, Ee = /<([\w:-]+)/, Ae = /^$|\/(?:java|ecma)script/i, Ne = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
            Ne.optgroup = Ne.option, Ne.tbody = Ne.tfoot = Ne.colgroup = Ne.caption = Ne.thead, Ne.th = Ne.td;
            var We = /<|&#?\w+;/;
            !function () {
                var e = Q.createDocumentFragment(), t = e.appendChild(Q.createElement("div")), n = Q.createElement("input");
                n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), ie.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", ie.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
            }();
            var Pe = /^key/, Le = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Ie = /^([^.]*)(?:\.(.+)|)/;
            ae.event = {
                global: {},
                add: function (e, t, n, i, o) {
                    var a, r, s, l, d, c, u, f, p, h, m, g = ke.get(e);
                    if (g)for (n.handler && (a = n, n = a.handler, o = a.selector), n.guid || (n.guid = ae.guid++), (l = g.events) || (l = g.events = {}), (r = g.handle) || (r = g.handle = function (t) {
                        return "undefined" != typeof ae && ae.event.triggered !== t.type ? ae.event.dispatch.apply(e, arguments) : void 0
                    }), t = (t || "").match(ye) || [""], d = t.length; d--;)s = Ie.exec(t[d]) || [], p = m = s[1], h = (s[2] || "").split(".").sort(), p && (u = ae.event.special[p] || {}, p = (o ? u.delegateType : u.bindType) || p, u = ae.event.special[p] || {}, c = ae.extend({
                        type: p,
                        origType: m,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: o,
                        needsContext: o && ae.expr.match.needsContext.test(o),
                        namespace: h.join(".")
                    }, a), (f = l[p]) || (f = l[p] = [], f.delegateCount = 0, u.setup && u.setup.call(e, i, h, r) !== !1 || e.addEventListener && e.addEventListener(p, r)), u.add && (u.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), o ? f.splice(f.delegateCount++, 0, c) : f.push(c), ae.event.global[p] = !0)
                },
                remove: function (e, t, n, i, o) {
                    var a, r, s, l, d, c, u, f, p, h, m, g = ke.hasData(e) && ke.get(e);
                    if (g && (l = g.events)) {
                        for (t = (t || "").match(ye) || [""], d = t.length; d--;)if (s = Ie.exec(t[d]) || [], p = m = s[1], h = (s[2] || "").split(".").sort(), p) {
                            for (u = ae.event.special[p] || {}, p = (i ? u.delegateType : u.bindType) || p, f = l[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), r = a = f.length; a--;)c = f[a], !o && m !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (f.splice(a, 1), c.selector && f.delegateCount--, u.remove && u.remove.call(e, c));
                            r && !f.length && (u.teardown && u.teardown.call(e, h, g.handle) !== !1 || ae.removeEvent(e, p, g.handle), delete l[p])
                        } else for (p in l)ae.event.remove(e, p + t[d], n, i, !0);
                        ae.isEmptyObject(l) && ke.remove(e, "handle events")
                    }
                },
                dispatch: function (e) {
                    e = ae.event.fix(e);
                    var t, n, i, o, a, r = [], s = G.call(arguments), l = (ke.get(this, "events") || {})[e.type] || [], d = ae.event.special[e.type] || {};
                    if (s[0] = e, e.delegateTarget = this, !d.preDispatch || d.preDispatch.call(this, e) !== !1) {
                        for (r = ae.event.handlers.call(this, e, l), t = 0; (o = r[t++]) && !e.isPropagationStopped();)for (e.currentTarget = o.elem, n = 0; (a = o.handlers[n++]) && !e.isImmediatePropagationStopped();)e.rnamespace && !e.rnamespace.test(a.namespace) || (e.handleObj = a, e.data = a.data, i = ((ae.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, s), void 0 !== i && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                        return d.postDispatch && d.postDispatch.call(this, e), e.result
                    }
                },
                handlers: function (e, t) {
                    var n, i, o, a, r = [], s = t.delegateCount, l = e.target;
                    if (s && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))for (; l !== this; l = l.parentNode || this)if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                        for (i = [], n = 0; n < s; n++)a = t[n], o = a.selector + " ", void 0 === i[o] && (i[o] = a.needsContext ? ae(o, this).index(l) > -1 : ae.find(o, this, null, [l]).length), i[o] && i.push(a);
                        i.length && r.push({elem: l, handlers: i})
                    }
                    return s < t.length && r.push({elem: this, handlers: t.slice(s)}), r
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function (e, t) {
                        var n, i, o, a = t.button;
                        return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || Q, i = n.documentElement, o = n.body, e.pageX = t.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)), e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
                    }
                },
                fix: function (e) {
                    if (e[ae.expando])return e;
                    var t, n, i, o = e.type, a = e, r = this.fixHooks[o];
                    for (r || (this.fixHooks[o] = r = Le.test(o) ? this.mouseHooks : Pe.test(o) ? this.keyHooks : {}), i = r.props ? this.props.concat(r.props) : this.props, e = new ae.Event(a), t = i.length; t--;)n = i[t], e[n] = a[n];
                    return e.target || (e.target = Q), 3 === e.target.nodeType && (e.target = e.target.parentNode), r.filter ? r.filter(e, a) : e
                },
                special: {
                    load: {noBubble: !0}, focus: {
                        trigger: function () {
                            if (this !== m() && this.focus)return this.focus(), !1
                        }, delegateType: "focusin"
                    }, blur: {
                        trigger: function () {
                            if (this === m() && this.blur)return this.blur(), !1
                        }, delegateType: "focusout"
                    }, click: {
                        trigger: function () {
                            if ("checkbox" === this.type && this.click && ae.nodeName(this, "input"))return this.click(), !1
                        }, _default: function (e) {
                            return ae.nodeName(e.target, "a")
                        }
                    }, beforeunload: {
                        postDispatch: function (e) {
                            void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                        }
                    }
                }
            }, ae.removeEvent = function (e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n)
            }, ae.Event = function (e, t) {
                return this instanceof ae.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? p : h) : this.type = e, t && ae.extend(this, t), this.timeStamp = e && e.timeStamp || ae.now(), void(this[ae.expando] = !0)) : new ae.Event(e, t)
            }, ae.Event.prototype = {
                constructor: ae.Event,
                isDefaultPrevented: h,
                isPropagationStopped: h,
                isImmediatePropagationStopped: h,
                preventDefault: function () {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = p, e && e.preventDefault()
                },
                stopPropagation: function () {
                    var e = this.originalEvent;
                    this.isPropagationStopped = p, e && e.stopPropagation()
                },
                stopImmediatePropagation: function () {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = p, e && e.stopImmediatePropagation(), this.stopPropagation()
                }
            }, ae.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function (e, t) {
                ae.event.special[e] = {
                    delegateType: t, bindType: t, handle: function (e) {
                        var n, i = this, o = e.relatedTarget, a = e.handleObj;
                        return o && (o === i || ae.contains(i, o)) || (e.type = a.origType, n = a.handler.apply(this, arguments), e.type = t), n
                    }
                }
            }), ae.fn.extend({
                on: function (e, t, n, i) {
                    return g(this, e, t, n, i)
                }, one: function (e, t, n, i) {
                    return g(this, e, t, n, i, 1)
                }, off: function (e, t, n) {
                    var i, o;
                    if (e && e.preventDefault && e.handleObj)return i = e.handleObj, ae(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                    if ("object" == typeof e) {
                        for (o in e)this.off(o, t, e[o]);
                        return this
                    }
                    return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = h), this.each(function () {
                        ae.event.remove(this, e, n, t)
                    })
                }
            });
            var Me = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, qe = /<script|<style|<link/i, Re = /checked\s*(?:[^=]|=\s*.checked.)/i, Be = /^true\/(.*)/, Ve = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
            ae.extend({
                htmlPrefilter: function (e) {
                    return e.replace(Me, "<$1></$2>")
                }, clone: function (e, t, n) {
                    var i, o, a, r, s = e.cloneNode(!0), l = ae.contains(e.ownerDocument, e);
                    if (!(ie.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ae.isXMLDoc(e)))for (r = c(s), a = c(e), i = 0, o = a.length; i < o; i++)y(a[i], r[i]);
                    if (t)if (n)for (a = a || c(e), r = r || c(s), i = 0, o = a.length; i < o; i++)w(a[i], r[i]); else w(e, s);
                    return r = c(s, "script"), r.length > 0 && u(r, !l && c(e, "script")), s
                }, cleanData: function (e) {
                    for (var t, n, i, o = ae.event.special, a = 0; void 0 !== (n = e[a]); a++)if (Ce(n)) {
                        if (t = n[ke.expando]) {
                            if (t.events)for (i in t.events)o[i] ? ae.event.remove(n, i) : ae.removeEvent(n, i, t.handle);
                            n[ke.expando] = void 0
                        }
                        n[Te.expando] && (n[Te.expando] = void 0)
                    }
                }
            }), ae.fn.extend({
                domManip: $, detach: function (e) {
                    return _(this, e, !0)
                }, remove: function (e) {
                    return _(this, e)
                }, text: function (e) {
                    return _e(this, function (e) {
                        return void 0 === e ? ae.text(this) : this.empty().each(function () {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                        })
                    }, null, e, arguments.length)
                }, append: function () {
                    return $(this, arguments, function (e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = b(this, e);
                            t.appendChild(e)
                        }
                    })
                }, prepend: function () {
                    return $(this, arguments, function (e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = b(this, e);
                            t.insertBefore(e, t.firstChild)
                        }
                    })
                }, before: function () {
                    return $(this, arguments, function (e) {
                        this.parentNode && this.parentNode.insertBefore(e, this)
                    })
                }, after: function () {
                    return $(this, arguments, function (e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                    })
                }, empty: function () {
                    for (var e, t = 0; null != (e = this[t]); t++)1 === e.nodeType && (ae.cleanData(c(e, !1)), e.textContent = "");
                    return this
                }, clone: function (e, t) {
                    return e = null != e && e, t = null == t ? e : t, this.map(function () {
                        return ae.clone(this, e, t)
                    })
                }, html: function (e) {
                    return _e(this, function (e) {
                        var t = this[0] || {}, n = 0, i = this.length;
                        if (void 0 === e && 1 === t.nodeType)return t.innerHTML;
                        if ("string" == typeof e && !qe.test(e) && !Ne[(Ee.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = ae.htmlPrefilter(e);
                            try {
                                for (; n < i; n++)t = this[n] || {}, 1 === t.nodeType && (ae.cleanData(c(t, !1)), t.innerHTML = e);
                                t = 0
                            } catch (e) {
                            }
                        }
                        t && this.empty().append(e)
                    }, null, e, arguments.length)
                }, replaceWith: function () {
                    var e = [];
                    return $(this, arguments, function (t) {
                        var n = this.parentNode;
                        ae.inArray(this, e) < 0 && (ae.cleanData(c(this)), n && n.replaceChild(t, this))
                    }, e)
                }
            }), ae.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function (e, t) {
                ae.fn[e] = function (e) {
                    for (var n, i = [], o = ae(e), a = o.length - 1, r = 0; r <= a; r++)n = r === a ? this : this.clone(!0), ae(o[r])[t](n), K.apply(i, n.get());
                    return this.pushStack(i)
                }
            });
            var Ye, Xe = {
                HTML: "block",
                BODY: "block"
            }, Ue = /^margin/, Qe = new RegExp("^(" + Fe + ")(?!px)[a-z%]+$", "i"), Ge = function (t) {
                var n = t.ownerDocument.defaultView;
                return n.opener || (n = e), n.getComputedStyle(t)
            }, Je = function (e, t, n, i) {
                var o, a, r = {};
                for (a in t)r[a] = e.style[a], e.style[a] = t[a];
                o = n.apply(e, i || []);
                for (a in t)e.style[a] = r[a];
                return o
            }, Ke = Q.documentElement;
            !function () {
                function t() {
                    s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", s.innerHTML = "", Ke.appendChild(r);
                    var t = e.getComputedStyle(s);
                    n = "1%" !== t.top, a = "2px" === t.marginLeft, i = "4px" === t.width, s.style.marginRight = "50%", o = "4px" === t.marginRight, Ke.removeChild(r)
                }

                var n, i, o, a, r = Q.createElement("div"), s = Q.createElement("div");
                s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", ie.clearCloneStyle = "content-box" === s.style.backgroundClip, r.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", r.appendChild(s), ae.extend(ie, {
                    pixelPosition: function () {
                        return t(), n
                    }, boxSizingReliable: function () {
                        return null == i && t(), i
                    }, pixelMarginRight: function () {
                        return null == i && t(), o
                    }, reliableMarginLeft: function () {
                        return null == i && t(), a
                    }, reliableMarginRight: function () {
                        var t, n = s.appendChild(Q.createElement("div"));
                        return n.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", s.style.width = "1px", Ke.appendChild(r), t = !parseFloat(e.getComputedStyle(n).marginRight), Ke.removeChild(r), s.removeChild(n), t
                    }
                }))
            }();
            var Ze = /^(none|table(?!-c[ea]).+)/, et = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }, tt = {
                letterSpacing: "0",
                fontWeight: "400"
            }, nt = ["Webkit", "O", "Moz", "ms"], it = Q.createElement("div").style;
            ae.extend({
                cssHooks: {
                    opacity: {
                        get: function (e, t) {
                            if (t) {
                                var n = T(e, "opacity");
                                return "" === n ? "1" : n
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {float: "cssFloat"},
                style: function (e, t, n, i) {
                    if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                        var o, a, r, s = ae.camelCase(t), l = e.style;
                        return t = ae.cssProps[s] || (ae.cssProps[s] = D(s) || s), r = ae.cssHooks[t] || ae.cssHooks[s], void 0 === n ? r && "get"in r && void 0 !== (o = r.get(e, !1, i)) ? o : l[t] : (a = typeof n, "string" === a && (o = Oe.exec(n)) && o[1] && (n = d(e, t, o), a = "number"), null != n && n === n && ("number" === a && (n += o && o[3] || (ae.cssNumber[s] ? "" : "px")), ie.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), r && "set"in r && void 0 === (n = r.set(e, n, i)) || (l[t] = n)), void 0)
                    }
                },
                css: function (e, t, n, i) {
                    var o, a, r, s = ae.camelCase(t);
                    return t = ae.cssProps[s] || (ae.cssProps[s] = D(s) || s), r = ae.cssHooks[t] || ae.cssHooks[s], r && "get"in r && (o = r.get(e, !0, n)), void 0 === o && (o = T(e, t, i)), "normal" === o && t in tt && (o = tt[t]), "" === n || n ? (a = parseFloat(o), n === !0 || isFinite(a) ? a || 0 : o) : o
                }
            }), ae.each(["height", "width"], function (e, t) {
                ae.cssHooks[t] = {
                    get: function (e, n, i) {
                        if (n)return Ze.test(ae.css(e, "display")) && 0 === e.offsetWidth ? Je(e, et, function () {
                            return S(e, t, i)
                        }) : S(e, t, i)
                    }, set: function (e, n, i) {
                        var o, a = i && Ge(e), r = i && O(e, t, i, "border-box" === ae.css(e, "boxSizing", !1, a), a);
                        return r && (o = Oe.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n, n = ae.css(e, t)), F(e, n, r)
                    }
                }
            }), ae.cssHooks.marginLeft = j(ie.reliableMarginLeft, function (e, t) {
                if (t)return (parseFloat(T(e, "marginLeft")) || e.getBoundingClientRect().left - Je(e, {marginLeft: 0}, function () {
                        return e.getBoundingClientRect().left
                    })) + "px"
            }), ae.cssHooks.marginRight = j(ie.reliableMarginRight, function (e, t) {
                if (t)return Je(e, {display: "inline-block"}, T, [e, "marginRight"])
            }), ae.each({margin: "", padding: "", border: "Width"}, function (e, t) {
                ae.cssHooks[e + t] = {
                    expand: function (n) {
                        for (var i = 0, o = {}, a = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++)o[e + Se[i] + t] = a[i] || a[i - 2] || a[0];
                        return o
                    }
                }, Ue.test(e) || (ae.cssHooks[e + t].set = F)
            }), ae.fn.extend({
                css: function (e, t) {
                    return _e(this, function (e, t, n) {
                        var i, o, a = {}, r = 0;
                        if (ae.isArray(t)) {
                            for (i = Ge(e), o = t.length; r < o; r++)a[t[r]] = ae.css(e, t[r], !1, i);
                            return a
                        }
                        return void 0 !== n ? ae.style(e, t, n) : ae.css(e, t)
                    }, e, t, arguments.length > 1)
                }, show: function () {
                    return z(this, !0)
                }, hide: function () {
                    return z(this)
                }, toggle: function (e) {
                    return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                        ze(this) ? ae(this).show() : ae(this).hide()
                    })
                }
            }), ae.Tween = H, H.prototype = {
                constructor: H, init: function (e, t, n, i, o, a) {
                    this.elem = e, this.prop = n, this.easing = o || ae.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = a || (ae.cssNumber[n] ? "" : "px")
                }, cur: function () {
                    var e = H.propHooks[this.prop];
                    return e && e.get ? e.get(this) : H.propHooks._default.get(this)
                }, run: function (e) {
                    var t, n = H.propHooks[this.prop];
                    return this.options.duration ? this.pos = t = ae.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : H.propHooks._default.set(this), this
                }
            }, H.prototype.init.prototype = H.prototype, H.propHooks = {
                _default: {
                    get: function (e) {
                        var t;
                        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = ae.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
                    }, set: function (e) {
                        ae.fx.step[e.prop] ? ae.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[ae.cssProps[e.prop]] && !ae.cssHooks[e.prop] ? e.elem[e.prop] = e.now : ae.style(e.elem, e.prop, e.now + e.unit)
                    }
                }
            }, H.propHooks.scrollTop = H.propHooks.scrollLeft = {
                set: function (e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                }
            }, ae.easing = {
                linear: function (e) {
                    return e
                }, swing: function (e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                }, _default: "swing"
            }, ae.fx = H.prototype.init, ae.fx.step = {};
            var ot, at, rt = /^(?:toggle|show|hide)$/, st = /queueHooks$/;
            ae.Animation = ae.extend(L, {
                tweeners: {
                    "*": [function (e, t) {
                        var n = this.createTween(e, t);
                        return d(n.elem, e, Oe.exec(t), n), n
                    }]
                }, tweener: function (e, t) {
                    ae.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(ye);
                    for (var n, i = 0, o = e.length; i < o; i++)n = e[i], L.tweeners[n] = L.tweeners[n] || [], L.tweeners[n].unshift(t)
                }, prefilters: [W], prefilter: function (e, t) {
                    t ? L.prefilters.unshift(e) : L.prefilters.push(e)
                }
            }), ae.speed = function (e, t, n) {
                var i = e && "object" == typeof e ? ae.extend({}, e) : {
                    complete: n || !n && t || ae.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !ae.isFunction(t) && t
                };
                return i.duration = ae.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ae.fx.speeds ? ae.fx.speeds[i.duration] : ae.fx.speeds._default, null != i.queue && i.queue !== !0 || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
                    ae.isFunction(i.old) && i.old.call(this), i.queue && ae.dequeue(this, i.queue)
                }, i
            }, ae.fn.extend({
                fadeTo: function (e, t, n, i) {
                    return this.filter(ze).css("opacity", 0).show().end().animate({opacity: t}, e, n, i)
                }, animate: function (e, t, n, i) {
                    var o = ae.isEmptyObject(e), a = ae.speed(t, n, i), r = function () {
                        var t = L(this, ae.extend({}, e), a);
                        (o || ke.get(this, "finish")) && t.stop(!0)
                    };
                    return r.finish = r, o || a.queue === !1 ? this.each(r) : this.queue(a.queue, r)
                }, stop: function (e, t, n) {
                    var i = function (e) {
                        var t = e.stop;
                        delete e.stop, t(n)
                    };
                    return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                        var t = !0, o = null != e && e + "queueHooks", a = ae.timers, r = ke.get(this);
                        if (o)r[o] && r[o].stop && i(r[o]); else for (o in r)r[o] && r[o].stop && st.test(o) && i(r[o]);
                        for (o = a.length; o--;)a[o].elem !== this || null != e && a[o].queue !== e || (a[o].anim.stop(n), t = !1, a.splice(o, 1));
                        !t && n || ae.dequeue(this, e)
                    })
                }, finish: function (e) {
                    return e !== !1 && (e = e || "fx"), this.each(function () {
                        var t, n = ke.get(this), i = n[e + "queue"], o = n[e + "queueHooks"], a = ae.timers, r = i ? i.length : 0;
                        for (n.finish = !0, ae.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = a.length; t--;)a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0), a.splice(t, 1));
                        for (t = 0; t < r; t++)i[t] && i[t].finish && i[t].finish.call(this);
                        delete n.finish
                    })
                }
            }), ae.each(["toggle", "show", "hide"], function (e, t) {
                var n = ae.fn[t];
                ae.fn[t] = function (e, i, o) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(A(t, !0), e, i, o)
                }
            }), ae.each({
                slideDown: A("show"),
                slideUp: A("hide"),
                slideToggle: A("toggle"),
                fadeIn: {opacity: "show"},
                fadeOut: {opacity: "hide"},
                fadeToggle: {opacity: "toggle"}
            }, function (e, t) {
                ae.fn[e] = function (e, n, i) {
                    return this.animate(t, e, n, i)
                }
            }), ae.timers = [], ae.fx.tick = function () {
                var e, t = 0, n = ae.timers;
                for (ot = ae.now(); t < n.length; t++)e = n[t], e() || n[t] !== e || n.splice(t--, 1);
                n.length || ae.fx.stop(), ot = void 0
            }, ae.fx.timer = function (e) {
                ae.timers.push(e), e() ? ae.fx.start() : ae.timers.pop()
            }, ae.fx.interval = 13, ae.fx.start = function () {
                at || (at = e.setInterval(ae.fx.tick, ae.fx.interval))
            }, ae.fx.stop = function () {
                e.clearInterval(at), at = null
            }, ae.fx.speeds = {slow: 600, fast: 200, _default: 400}, ae.fn.delay = function (t, n) {
                return t = ae.fx ? ae.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function (n, i) {
                    var o = e.setTimeout(n, t);
                    i.stop = function () {
                        e.clearTimeout(o)
                    }
                })
            }, function () {
                var e = Q.createElement("input"), t = Q.createElement("select"), n = t.appendChild(Q.createElement("option"));
                e.type = "checkbox", ie.checkOn = "" !== e.value, ie.optSelected = n.selected, t.disabled = !0, ie.optDisabled = !n.disabled, e = Q.createElement("input"), e.value = "t", e.type = "radio", ie.radioValue = "t" === e.value
            }();
            var lt, dt = ae.expr.attrHandle;
            ae.fn.extend({
                attr: function (e, t) {
                    return _e(this, ae.attr, e, t, arguments.length > 1)
                }, removeAttr: function (e) {
                    return this.each(function () {
                        ae.removeAttr(this, e)
                    })
                }
            }), ae.extend({
                attr: function (e, t, n) {
                    var i, o, a = e.nodeType;
                    if (3 !== a && 8 !== a && 2 !== a)return "undefined" == typeof e.getAttribute ? ae.prop(e, t, n) : (1 === a && ae.isXMLDoc(e) || (t = t.toLowerCase(), o = ae.attrHooks[t] || (ae.expr.match.bool.test(t) ? lt : void 0)), void 0 !== n ? null === n ? void ae.removeAttr(e, t) : o && "set"in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : o && "get"in o && null !== (i = o.get(e, t)) ? i : (i = ae.find.attr(e, t), null == i ? void 0 : i))
                }, attrHooks: {
                    type: {
                        set: function (e, t) {
                            if (!ie.radioValue && "radio" === t && ae.nodeName(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t), n && (e.value = n), t
                            }
                        }
                    }
                }, removeAttr: function (e, t) {
                    var n, i, o = 0, a = t && t.match(ye);
                    if (a && 1 === e.nodeType)for (; n = a[o++];)i = ae.propFix[n] || n, ae.expr.match.bool.test(n) && (e[i] = !1), e.removeAttribute(n)
                }
            }), lt = {
                set: function (e, t, n) {
                    return t === !1 ? ae.removeAttr(e, n) : e.setAttribute(n, n), n
                }
            }, ae.each(ae.expr.match.bool.source.match(/\w+/g), function (e, t) {
                var n = dt[t] || ae.find.attr;
                dt[t] = function (e, t, i) {
                    var o, a;
                    return i || (a = dt[t], dt[t] = o, o = null != n(e, t, i) ? t.toLowerCase() : null, dt[t] = a), o
                }
            });
            var ct = /^(?:input|select|textarea|button)$/i, ut = /^(?:a|area)$/i;
            ae.fn.extend({
                prop: function (e, t) {
                    return _e(this, ae.prop, e, t, arguments.length > 1)
                }, removeProp: function (e) {
                    return this.each(function () {
                        delete this[ae.propFix[e] || e]
                    })
                }
            }), ae.extend({
                prop: function (e, t, n) {
                    var i, o, a = e.nodeType;
                    if (3 !== a && 8 !== a && 2 !== a)return 1 === a && ae.isXMLDoc(e) || (t = ae.propFix[t] || t, o = ae.propHooks[t]), void 0 !== n ? o && "set"in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get"in o && null !== (i = o.get(e, t)) ? i : e[t]
                }, propHooks: {
                    tabIndex: {
                        get: function (e) {
                            var t = ae.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : ct.test(e.nodeName) || ut.test(e.nodeName) && e.href ? 0 : -1
                        }
                    }
                }, propFix: {for: "htmlFor", class: "className"}
            }), ie.optSelected || (ae.propHooks.selected = {
                get: function (e) {
                    var t = e.parentNode;
                    return t && t.parentNode && t.parentNode.selectedIndex, null
                }
            }), ae.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                ae.propFix[this.toLowerCase()] = this
            });
            var ft = /[\t\r\n\f]/g;
            ae.fn.extend({
                addClass: function (e) {
                    var t, n, i, o, a, r, s, l = 0;
                    if (ae.isFunction(e))return this.each(function (t) {
                        ae(this).addClass(e.call(this, t, I(this)))
                    });
                    if ("string" == typeof e && e)for (t = e.match(ye) || []; n = this[l++];)if (o = I(n), i = 1 === n.nodeType && (" " + o + " ").replace(ft, " ")) {
                        for (r = 0; a = t[r++];)i.indexOf(" " + a + " ") < 0 && (i += a + " ");
                        s = ae.trim(i), o !== s && n.setAttribute("class", s)
                    }
                    return this
                }, removeClass: function (e) {
                    var t, n, i, o, a, r, s, l = 0;
                    if (ae.isFunction(e))return this.each(function (t) {
                        ae(this).removeClass(e.call(this, t, I(this)))
                    });
                    if (!arguments.length)return this.attr("class", "");
                    if ("string" == typeof e && e)for (t = e.match(ye) || []; n = this[l++];)if (o = I(n), i = 1 === n.nodeType && (" " + o + " ").replace(ft, " ")) {
                        for (r = 0; a = t[r++];)for (; i.indexOf(" " + a + " ") > -1;)i = i.replace(" " + a + " ", " ");
                        s = ae.trim(i), o !== s && n.setAttribute("class", s)
                    }
                    return this
                }, toggleClass: function (e, t) {
                    var n = typeof e;
                    return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : ae.isFunction(e) ? this.each(function (n) {
                        ae(this).toggleClass(e.call(this, n, I(this), t), t)
                    }) : this.each(function () {
                        var t, i, o, a;
                        if ("string" === n)for (i = 0, o = ae(this), a = e.match(ye) || []; t = a[i++];)o.hasClass(t) ? o.removeClass(t) : o.addClass(t); else void 0 !== e && "boolean" !== n || (t = I(this), t && ke.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : ke.get(this, "__className__") || ""))
                    })
                }, hasClass: function (e) {
                    var t, n, i = 0;
                    for (t = " " + e + " "; n = this[i++];)if (1 === n.nodeType && (" " + I(n) + " ").replace(ft, " ").indexOf(t) > -1)return !0;
                    return !1
                }
            });
            var pt = /\r/g;
            ae.fn.extend({
                val: function (e) {
                    var t, n, i, o = this[0];
                    {
                        if (arguments.length)return i = ae.isFunction(e), this.each(function (n) {
                            var o;
                            1 === this.nodeType && (o = i ? e.call(this, n, ae(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : ae.isArray(o) && (o = ae.map(o, function (e) {
                                return null == e ? "" : e + ""
                            })), t = ae.valHooks[this.type] || ae.valHooks[this.nodeName.toLowerCase()], t && "set"in t && void 0 !== t.set(this, o, "value") || (this.value = o))
                        });
                        if (o)return t = ae.valHooks[o.type] || ae.valHooks[o.nodeName.toLowerCase()], t && "get"in t && void 0 !== (n = t.get(o, "value")) ? n : (n = o.value, "string" == typeof n ? n.replace(pt, "") : null == n ? "" : n)
                    }
                }
            }), ae.extend({
                valHooks: {
                    option: {
                        get: function (e) {
                            return ae.trim(e.value)
                        }
                    }, select: {
                        get: function (e) {
                            for (var t, n, i = e.options, o = e.selectedIndex, a = "select-one" === e.type || o < 0, r = a ? null : [], s = a ? o + 1 : i.length, l = o < 0 ? s : a ? o : 0; l < s; l++)if (n = i[l], (n.selected || l === o) && (ie.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !ae.nodeName(n.parentNode, "optgroup"))) {
                                if (t = ae(n).val(), a)return t;
                                r.push(t)
                            }
                            return r
                        }, set: function (e, t) {
                            for (var n, i, o = e.options, a = ae.makeArray(t), r = o.length; r--;)i = o[r], (i.selected = ae.inArray(ae.valHooks.option.get(i), a) > -1) && (n = !0);
                            return n || (e.selectedIndex = -1), a
                        }
                    }
                }
            }), ae.each(["radio", "checkbox"], function () {
                ae.valHooks[this] = {
                    set: function (e, t) {
                        if (ae.isArray(t))return e.checked = ae.inArray(ae(e).val(), t) > -1
                    }
                }, ie.checkOn || (ae.valHooks[this].get = function (e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                })
            });
            var ht = /^(?:focusinfocus|focusoutblur)$/;
            ae.extend(ae.event, {
                trigger: function (t, n, i, o) {
                    var a, r, s, l, d, c, u, f = [i || Q], p = ne.call(t, "type") ? t.type : t, h = ne.call(t, "namespace") ? t.namespace.split(".") : [];
                    if (r = s = i = i || Q, 3 !== i.nodeType && 8 !== i.nodeType && !ht.test(p + ae.event.triggered) && (p.indexOf(".") > -1 && (h = p.split("."), p = h.shift(), h.sort()), d = p.indexOf(":") < 0 && "on" + p, t = t[ae.expando] ? t : new ae.Event(p, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = h.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : ae.makeArray(n, [t]), u = ae.event.special[p] || {}, o || !u.trigger || u.trigger.apply(i, n) !== !1)) {
                        if (!o && !u.noBubble && !ae.isWindow(i)) {
                            for (l = u.delegateType || p, ht.test(l + p) || (r = r.parentNode); r; r = r.parentNode)f.push(r), s = r;
                            s === (i.ownerDocument || Q) && f.push(s.defaultView || s.parentWindow || e)
                        }
                        for (a = 0; (r = f[a++]) && !t.isPropagationStopped();)t.type = a > 1 ? l : u.bindType || p, c = (ke.get(r, "events") || {})[t.type] && ke.get(r, "handle"), c && c.apply(r, n), c = d && r[d], c && c.apply && Ce(r) && (t.result = c.apply(r, n), t.result === !1 && t.preventDefault());
                        return t.type = p, o || t.isDefaultPrevented() || u._default && u._default.apply(f.pop(), n) !== !1 || !Ce(i) || d && ae.isFunction(i[p]) && !ae.isWindow(i) && (s = i[d], s && (i[d] = null), ae.event.triggered = p, i[p](), ae.event.triggered = void 0, s && (i[d] = s)), t.result
                    }
                }, simulate: function (e, t, n) {
                    var i = ae.extend(new ae.Event, n, {type: e, isSimulated: !0});
                    ae.event.trigger(i, null, t), i.isDefaultPrevented() && n.preventDefault()
                }
            }), ae.fn.extend({
                trigger: function (e, t) {
                    return this.each(function () {
                        ae.event.trigger(e, t, this)
                    })
                }, triggerHandler: function (e, t) {
                    var n = this[0];
                    if (n)return ae.event.trigger(e, t, n, !0)
                }
            }), ae.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
                ae.fn[t] = function (e, n) {
                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                }
            }), ae.fn.extend({
                hover: function (e, t) {
                    return this.mouseenter(e).mouseleave(t || e)
                }
            }), ie.focusin = "onfocusin"in e, ie.focusin || ae.each({
                focus: "focusin",
                blur: "focusout"
            }, function (e, t) {
                var n = function (e) {
                    ae.event.simulate(t, e.target, ae.event.fix(e))
                };
                ae.event.special[t] = {
                    setup: function () {
                        var i = this.ownerDocument || this, o = ke.access(i, t);
                        o || i.addEventListener(e, n, !0), ke.access(i, t, (o || 0) + 1)
                    }, teardown: function () {
                        var i = this.ownerDocument || this, o = ke.access(i, t) - 1;
                        o ? ke.access(i, t, o) : (i.removeEventListener(e, n, !0), ke.remove(i, t))
                    }
                }
            });
            var mt = e.location, gt = ae.now(), bt = /\?/;
            ae.parseJSON = function (e) {
                return JSON.parse(e + "")
            }, ae.parseXML = function (t) {
                var n;
                if (!t || "string" != typeof t)return null;
                try {
                    n = (new e.DOMParser).parseFromString(t, "text/xml")
                } catch (e) {
                    n = void 0
                }
                return n && !n.getElementsByTagName("parsererror").length || ae.error("Invalid XML: " + t), n
            };
            var vt = /#.*$/, xt = /([?&])_=[^&]*/, wt = /^(.*?):[ \t]*([^\r\n]*)$/gm, yt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, $t = /^(?:GET|HEAD)$/, _t = /^\/\//, Ct = {}, kt = {}, Tt = "*/".concat("*"), jt = Q.createElement("a");
            jt.href = mt.href, ae.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: mt.href,
                    type: "GET",
                    isLocal: yt.test(mt.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Tt,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/data, text/javascript"
                    },
                    contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
                    responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                    converters: {"* text": String, "text html": !0, "text json": ae.parseJSON, "text xml": ae.parseXML},
                    flatOptions: {url: !0, context: !0}
                },
                ajaxSetup: function (e, t) {
                    return t ? R(R(e, ae.ajaxSettings), t) : R(ae.ajaxSettings, e)
                },
                ajaxPrefilter: M(Ct),
                ajaxTransport: M(kt),
                ajax: function (t, n) {
                    function i(t, n, i, s) {
                        var d, u, v, x, y, _ = n;
                        2 !== w && (w = 2, l && e.clearTimeout(l), o = void 0, r = s || "", $.readyState = t > 0 ? 4 : 0, d = t >= 200 && t < 300 || 304 === t, i && (x = B(f, $, i)), x = V(f, x, $, d), d ? (f.ifModified && (y = $.getResponseHeader("Last-Modified"), y && (ae.lastModified[a] = y), y = $.getResponseHeader("etag"), y && (ae.etag[a] = y)), 204 === t || "HEAD" === f.type ? _ = "nocontent" : 304 === t ? _ = "notmodified" : (_ = x.state, u = x.data, v = x.error, d = !v)) : (v = _, !t && _ || (_ = "error", t < 0 && (t = 0))), $.status = t, $.statusText = (n || _) + "", d ? m.resolveWith(p, [u, _, $]) : m.rejectWith(p, [$, _, v]), $.statusCode(b), b = void 0, c && h.trigger(d ? "ajaxSuccess" : "ajaxError", [$, f, d ? u : v]), g.fireWith(p, [$, _]), c && (h.trigger("ajaxComplete", [$, f]), --ae.active || ae.event.trigger("ajaxStop")))
                    }

                    "object" == typeof t && (n = t, t = void 0), n = n || {};
                    var o, a, r, s, l, d, c, u, f = ae.ajaxSetup({}, n), p = f.context || f, h = f.context && (p.nodeType || p.jquery) ? ae(p) : ae.event, m = ae.Deferred(), g = ae.Callbacks("once memory"), b = f.statusCode || {}, v = {}, x = {}, w = 0, y = "canceled", $ = {
                        readyState: 0,
                        getResponseHeader: function (e) {
                            var t;
                            if (2 === w) {
                                if (!s)for (s = {}; t = wt.exec(r);)s[t[1].toLowerCase()] = t[2];
                                t = s[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function () {
                            return 2 === w ? r : null
                        },
                        setRequestHeader: function (e, t) {
                            var n = e.toLowerCase();
                            return w || (e = x[n] = x[n] || e, v[e] = t), this
                        },
                        overrideMimeType: function (e) {
                            return w || (f.mimeType = e), this
                        },
                        statusCode: function (e) {
                            var t;
                            if (e)if (w < 2)for (t in e)b[t] = [b[t], e[t]]; else $.always(e[$.status]);
                            return this
                        },
                        abort: function (e) {
                            var t = e || y;
                            return o && o.abort(t), i(0, t), this
                        }
                    };
                    if (m.promise($).complete = g.add, $.success = $.done, $.error = $.fail, f.url = ((t || f.url || mt.href) + "").replace(vt, "").replace(_t, mt.protocol + "//"), f.type = n.method || n.type || f.method || f.type, f.dataTypes = ae.trim(f.dataType || "*").toLowerCase().match(ye) || [""], null == f.crossDomain) {
                        d = Q.createElement("a");
                        try {
                            d.href = f.url, d.href = d.href, f.crossDomain = jt.protocol + "//" + jt.host != d.protocol + "//" + d.host
                        } catch (e) {
                            f.crossDomain = !0
                        }
                    }
                    if (f.data && f.processData && "string" != typeof f.data && (f.data = ae.param(f.data, f.traditional)), q(Ct, f, n, $), 2 === w)return $;
                    c = ae.event && f.global, c && 0 === ae.active++ && ae.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !$t.test(f.type), a = f.url, f.hasContent || (f.data && (a = f.url += (bt.test(a) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = xt.test(a) ? a.replace(xt, "$1_=" + gt++) : a + (bt.test(a) ? "&" : "?") + "_=" + gt++)), f.ifModified && (ae.lastModified[a] && $.setRequestHeader("If-Modified-Since", ae.lastModified[a]), ae.etag[a] && $.setRequestHeader("If-None-Match", ae.etag[a])), (f.data && f.hasContent && f.contentType !== !1 || n.contentType) && $.setRequestHeader("Content-Type", f.contentType), $.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Tt + "; q=0.01" : "") : f.accepts["*"]);
                    for (u in f.headers)$.setRequestHeader(u, f.headers[u]);
                    if (f.beforeSend && (f.beforeSend.call(p, $, f) === !1 || 2 === w))return $.abort();
                    y = "abort";
                    for (u in{success: 1, error: 1, complete: 1})$[u](f[u]);
                    if (o = q(kt, f, n, $)) {
                        if ($.readyState = 1, c && h.trigger("ajaxSend", [$, f]), 2 === w)return $;
                        f.async && f.timeout > 0 && (l = e.setTimeout(function () {
                            $.abort("timeout")
                        }, f.timeout));
                        try {
                            w = 1, o.send(v, i)
                        } catch (e) {
                            if (!(w < 2))throw e;
                            i(-1, e)
                        }
                    } else i(-1, "No Transport");
                    return $
                },
                getJSON: function (e, t, n) {
                    return ae.get(e, t, n, "json")
                },
                getScript: function (e, t) {
                    return ae.get(e, void 0, t, "script")
                }
            }), ae.each(["get", "post"], function (e, t) {
                ae[t] = function (e, n, i, o) {
                    return ae.isFunction(n) && (o = o || i, i = n, n = void 0), ae.ajax(ae.extend({
                        url: e,
                        type: t,
                        dataType: o,
                        data: n,
                        success: i
                    }, ae.isPlainObject(e) && e))
                }
            }), ae._evalUrl = function (e) {
                return ae.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, throws: !0})
            }, ae.fn.extend({
                wrapAll: function (e) {
                    var t;
                    return ae.isFunction(e) ? this.each(function (t) {
                        ae(this).wrapAll(e.call(this, t))
                    }) : (this[0] && (t = ae(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                        for (var e = this; e.firstElementChild;)e = e.firstElementChild;
                        return e
                    }).append(this)), this)
                }, wrapInner: function (e) {
                    return ae.isFunction(e) ? this.each(function (t) {
                        ae(this).wrapInner(e.call(this, t))
                    }) : this.each(function () {
                        var t = ae(this), n = t.contents();
                        n.length ? n.wrapAll(e) : t.append(e)
                    })
                }, wrap: function (e) {
                    var t = ae.isFunction(e);
                    return this.each(function (n) {
                        ae(this).wrapAll(t ? e.call(this, n) : e)
                    })
                }, unwrap: function () {
                    return this.parent().each(function () {
                        ae.nodeName(this, "body") || ae(this).replaceWith(this.childNodes)
                    }).end()
                }
            }), ae.expr.filters.hidden = function (e) {
                return !ae.expr.filters.visible(e)
            }, ae.expr.filters.visible = function (e) {
                return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
            };
            var Dt = /%20/g, Ft = /\[\]$/, Ot = /\r?\n/g, St = /^(?:submit|button|image|reset|file)$/i, zt = /^(?:input|select|textarea|keygen)/i;
            ae.param = function (e, t) {
                var n, i = [], o = function (e, t) {
                    t = ae.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
                if (void 0 === t && (t = ae.ajaxSettings && ae.ajaxSettings.traditional), ae.isArray(e) || e.jquery && !ae.isPlainObject(e))ae.each(e, function () {
                    o(this.name, this.value)
                }); else for (n in e)Y(n, e[n], t, o);
                return i.join("&").replace(Dt, "+")
            }, ae.fn.extend({
                serialize: function () {
                    return ae.param(this.serializeArray())
                }, serializeArray: function () {
                    return this.map(function () {
                        var e = ae.prop(this, "elements");
                        return e ? ae.makeArray(e) : this
                    }).filter(function () {
                        var e = this.type;
                        return this.name && !ae(this).is(":disabled") && zt.test(this.nodeName) && !St.test(e) && (this.checked || !He.test(e))
                    }).map(function (e, t) {
                        var n = ae(this).val();
                        return null == n ? null : ae.isArray(n) ? ae.map(n, function (e) {
                            return {name: t.name, value: e.replace(Ot, "\r\n")}
                        }) : {name: t.name, value: n.replace(Ot, "\r\n")}
                    }).get()
                }
            }), ae.ajaxSettings.xhr = function () {
                try {
                    return new e.XMLHttpRequest
                } catch (e) {
                }
            };
            var Ht = {0: 200, 1223: 204}, Et = ae.ajaxSettings.xhr();
            ie.cors = !!Et && "withCredentials"in Et, ie.ajax = Et = !!Et, ae.ajaxTransport(function (t) {
                var n, i;
                if (ie.cors || Et && !t.crossDomain)return {
                    send: function (o, a) {
                        var r, s = t.xhr();
                        if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)for (r in t.xhrFields)s[r] = t.xhrFields[r];
                        t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest");
                        for (r in o)s.setRequestHeader(r, o[r]);
                        n = function (e) {
                            return function () {
                                n && (n = i = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? a(0, "error") : a(s.status, s.statusText) : a(Ht[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {binary: s.response} : {text: s.responseText}, s.getAllResponseHeaders()))
                            }
                        }, s.onload = n(), i = s.onerror = n("error"), void 0 !== s.onabort ? s.onabort = i : s.onreadystatechange = function () {
                            4 === s.readyState && e.setTimeout(function () {
                                n && i()
                            })
                        }, n = n("abort");
                        try {
                            s.send(t.hasContent && t.data || null)
                        } catch (e) {
                            if (n)throw e
                        }
                    }, abort: function () {
                        n && n()
                    }
                }
            }), ae.ajaxSetup({
                accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
                contents: {script: /\b(?:java|ecma)script\b/},
                converters: {
                    "text script": function (e) {
                        return ae.globalEval(e), e
                    }
                }
            }), ae.ajaxPrefilter("script", function (e) {
                void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
            }), ae.ajaxTransport("script", function (e) {
                if (e.crossDomain) {
                    var t, n;
                    return {
                        send: function (i, o) {
                            t = ae("<script>").prop({
                                charset: e.scriptCharset,
                                src: e.url
                            }).on("load error", n = function (e) {
                                t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
                            }), Q.head.appendChild(t[0])
                        }, abort: function () {
                            n && n()
                        }
                    }
                }
            });
            var At = [], Nt = /(=)\?(?=&|$)|\?\?/;
            ae.ajaxSetup({
                jsonp: "callback", jsonpCallback: function () {
                    var e = At.pop() || ae.expando + "_" + gt++;
                    return this[e] = !0, e
                }
            }), ae.ajaxPrefilter("data jsonp", function (t, n, i) {
                var o, a, r, s = t.jsonp !== !1 && (Nt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Nt.test(t.data) && "data");
                if (s || "jsonp" === t.dataTypes[0])return o = t.jsonpCallback = ae.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Nt, "$1" + o) : t.jsonp !== !1 && (t.url += (bt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function () {
                    return r || ae.error(o + " was not called"), r[0]
                }, t.dataTypes[0] = "json", a = e[o], e[o] = function () {
                    r = arguments
                }, i.always(function () {
                    void 0 === a ? ae(e).removeProp(o) : e[o] = a, t[o] && (t.jsonpCallback = n.jsonpCallback, At.push(o)), r && ae.isFunction(a) && a(r[0]), r = a = void 0
                }), "script"
            }), ie.createHTMLDocument = function () {
                var e = Q.implementation.createHTMLDocument("").body;
                return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
            }(), ae.parseHTML = function (e, t, n) {
                if (!e || "string" != typeof e)return null;
                "boolean" == typeof t && (n = t, t = !1), t = t || (ie.createHTMLDocument ? Q.implementation.createHTMLDocument("") : Q);
                var i = he.exec(e), o = !n && [];
                return i ? [t.createElement(i[1])] : (i = f([e], t, o), o && o.length && ae(o).remove(), ae.merge([], i.childNodes))
            };
            var Wt = ae.fn.load;
            ae.fn.load = function (e, t, n) {
                if ("string" != typeof e && Wt)return Wt.apply(this, arguments);
                var i, o, a, r = this, s = e.indexOf(" ");
                return s > -1 && (i = ae.trim(e.slice(s)), e = e.slice(0, s)), ae.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), r.length > 0 && ae.ajax({
                    url: e,
                    type: o || "GET",
                    dataType: "html",
                    data: t
                }).done(function (e) {
                    a = arguments, r.html(i ? ae("<div>").append(ae.parseHTML(e)).find(i) : e)
                }).always(n && function (e, t) {
                        r.each(function () {
                            n.apply(r, a || [e.responseText, t, e])
                        })
                    }), this
            }, ae.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
                ae.fn[t] = function (e) {
                    return this.on(t, e)
                }
            }), ae.expr.filters.animated = function (e) {
                return ae.grep(ae.timers, function (t) {
                    return e === t.elem
                }).length
            }, ae.offset = {
                setOffset: function (e, t, n) {
                    var i, o, a, r, s, l, d, c = ae.css(e, "position"), u = ae(e), f = {};
                    "static" === c && (e.style.position = "relative"), s = u.offset(), a = ae.css(e, "top"), l = ae.css(e, "left"), d = ("absolute" === c || "fixed" === c) && (a + l).indexOf("auto") > -1, d ? (i = u.position(), r = i.top, o = i.left) : (r = parseFloat(a) || 0, o = parseFloat(l) || 0), ae.isFunction(t) && (t = t.call(e, n, ae.extend({}, s))), null != t.top && (f.top = t.top - s.top + r), null != t.left && (f.left = t.left - s.left + o), "using"in t ? t.using.call(e, f) : u.css(f)
                }
            }, ae.fn.extend({
                offset: function (e) {
                    if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                        ae.offset.setOffset(this, e, t)
                    });
                    var t, n, i = this[0], o = {top: 0, left: 0}, a = i && i.ownerDocument;
                    if (a)return t = a.documentElement, ae.contains(t, i) ? (o = i.getBoundingClientRect(), n = X(a), {
                        top: o.top + n.pageYOffset - t.clientTop,
                        left: o.left + n.pageXOffset - t.clientLeft
                    }) : o
                }, position: function () {
                    if (this[0]) {
                        var e, t, n = this[0], i = {top: 0, left: 0};
                        return "fixed" === ae.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ae.nodeName(e[0], "html") || (i = e.offset()), i.top += ae.css(e[0], "borderTopWidth", !0) - e.scrollTop(), i.left += ae.css(e[0], "borderLeftWidth", !0) - e.scrollLeft()), {
                            top: t.top - i.top - ae.css(n, "marginTop", !0),
                            left: t.left - i.left - ae.css(n, "marginLeft", !0)
                        }
                    }
                }, offsetParent: function () {
                    return this.map(function () {
                        for (var e = this.offsetParent; e && "static" === ae.css(e, "position");)e = e.offsetParent;
                        return e || Ke
                    })
                }
            }), ae.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
                var n = "pageYOffset" === t;
                ae.fn[e] = function (i) {
                    return _e(this, function (e, i, o) {
                        var a = X(e);
                        return void 0 === o ? a ? a[t] : e[i] : void(a ? a.scrollTo(n ? a.pageXOffset : o, n ? o : a.pageYOffset) : e[i] = o)
                    }, e, i, arguments.length)
                }
            }), ae.each(["top", "left"], function (e, t) {
                ae.cssHooks[t] = j(ie.pixelPosition, function (e, n) {
                    if (n)return n = T(e, t), Qe.test(n) ? ae(e).position()[t] + "px" : n
                })
            }), ae.each({Height: "height", Width: "width"}, function (e, t) {
                ae.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, i) {
                    ae.fn[i] = function (i, o) {
                        var a = arguments.length && (n || "boolean" != typeof i), r = n || (i === !0 || o === !0 ? "margin" : "border");
                        return _e(this, function (t, n, i) {
                            var o;
                            return ae.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? ae.css(t, n, r) : ae.style(t, n, i, r)
                        }, t, a ? i : void 0, a, null)
                    }
                })
            }), ae.fn.extend({
                bind: function (e, t, n) {
                    return this.on(e, null, t, n)
                }, unbind: function (e, t) {
                    return this.off(e, null, t)
                }, delegate: function (e, t, n, i) {
                    return this.on(t, e, n, i)
                }, undelegate: function (e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                }, size: function () {
                    return this.length
                }
            }), ae.fn.andSelf = ae.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
                return ae
            });
            var Pt = e.jQuery, Lt = e.$;
            return ae.noConflict = function (t) {
                return e.$ === ae && (e.$ = Lt), t && e.jQuery === ae && (e.jQuery = Pt), ae
            }, t || (e.jQuery = e.$ = ae), ae
        })
    }, {}], 15: [function (require, module, exports) {
        var $lambda = window.$lambda = function (e) {
            var t, n, i, o;
            if (!e)return function (e) {
                return e
            };
            if ("function" == typeof e)return e;
            t = e.source ? e.source.replace(/^\s+|\s+$/g, "") : e.replace(/^\s+|\s+$/g, "");
            var n = t.indexOf("=>");
            return n == -1 ? new Function(t) : (i = t.slice(0, n).replace(/\s+/gm, ""), o = t.slice(n + 2).replace(/^\s+|\s+$/g, ""), o = 0 == o.indexOf("<") ? o.slice(1, -1) : "return " + o, "args" == i && (o = "var args=arguments;" + o, i = ""), new Function(i, o))
        };
        module.exports = {
            indexAs: function (e) {
                for (var t = this.length, n = 0; n < t; n++)if (JSON.equal(e, this[n]))return n;
                return -1
            }, lastIndexAs: function (e) {
                for (var t = this.length - 1; t > -1; t--)if (JSON.equal(e, this[t]))return t;
                return -1
            }, each: function (e, t) {
                return this.forEach($lambda(e), t), this
            }, remove: function (e) {
                return this.splice(e, 1)
            }, has: function (e, t) {
                return t === !1 ? this.indexOf(e) + 1 : this.indexAs(e) + 1
            }, any: function (e, t) {
                return this.some($lambda(e), t)
            }, where: function (e, t) {
                return this.filter($lambda(e), t)
            }, select: function (e, t) {
                return this.map($lambda(e), t)
            }, update: function (e, t) {
                return this.forEach(function (t, n, i) {
                    i[n] = $lambda(e)(t, n, i)
                }, t), this
            }, distinct: function (e) {
                var t, n;
                for (t = this.length - 1; t > 0; t--)n = e ? this.indexAs(this[t]) : this.indexOf(this[t]), n > -1 && n < t && this.remove(t);
                return this.where('x => typeof x !="undefined" ')
            }, orderby: function (e, t) {
                var n, i = this.slice(), o = function (e) {
                    return e
                }, a = {
                    number: function (e, t) {
                        return o(e) - o(t)
                    }, string: function (e, t) {
                        return o(e).localeCompare(o(t))
                    }, boolean: function (e, t) {
                        return !o(e)
                    }
                };
                if (this.length < 2)return i;
                o = $lambda(e), n = a[typeof o(i[0])];
                try {
                    i.sort(n || null)
                } catch (e) {
                    throw new Error("排序失败,请检测方法和数组内容")
                }
                return t && i.reverse(), i
            }, max: function (e) {
                var t, n = this.length, i = $lambda(e);
                if (0 == n)return null;
                if (1 == n)return i(this[0]);
                t = i(this[0]);
                for (var o = 1; o < n; o++)t = Math.max(t, i(this[o]));
                return t
            }, min: function (e) {
                var t, n = this.length, i = $lambda(e);
                if (0 == n)return null;
                if (1 == n)return i(this[0]);
                t = i(this[0]);
                for (var o = 1; o < n; o++)t = Math.min(t, i(this[o]));
                return t
            }, sum: function (e) {
                var t, n = this.length, i = $lambda(e);
                if (0 == n)return null;
                if (1 == n)return i(this[0]);
                t = i(this[0]);
                for (var o = 1; o < n; o++)next = i(this[o]), t = null == t ? next : null == next ? t : t + next;
                return t
            }, linq: function (query) {
                var dataInfo = query.match(/\sfrom\s+([^\s]+\s+\w)/)[1].split(/\s+/), dataName = dataInfo[0], dataMark = dataInfo[1], columns = [], where_clause = "", order_clause = "", desc = "", cond = query.match(/\swhere\s+(.+)(order\sby){0,1}/);
                if (cond.length && cond.length > 1) {
                    var clause = cond[1].split(" order by ");
                    where_clause = clause[0], clause.length > 1 && (order_clause = clause[1], desc = " desc" == order_clause.slice(-5), desc && (order_clause = order_clause.slice(0, -5)))
                } else if (cond = query.match(new RegExp("\\s#\\s+*\\s+order\\sby(.+)".replace("#", dataName).replace("*", dataMark))), cond.length && cond.length > 1) {
                    var index = cond[0].indexOf(" order by ");
                    order_clause = cond[0].slice(index + 10)
                }
                where_clause.trim() && (where_clause = dataMark + "=>" + where_clause), order_clause.trim() && (order_clause = dataMark + "=>" + order_clause);
                var cols = query.match(/^select\s+(.+)\s+from/);
                if (cols.length && cols.length > 1)if (cols = cols[1].trim(), "*" == cols.trim())columns[0] = ""; else {
                    columns = cols.split(/,\s+/gm);
                    for (var j = columns.length, i = 0; i < j; i++)columns[i] = dataMark + "=>" + columns[i]
                }
                return eval("var data=" + dataName), function () {
                    return [].select.apply(data.where(where_clause).orderby(order_clause, desc), columns)
                }
            }
        }
    }, {}], 16: [function (e, t, n) {
        var i = "@prj:" + window.getPrjName() + "-", o = function (e) {
            var t = {}, n = function (e, n, i) {
                return t.set(e + n, i)
            }, o = function (e, n, i) {
                return t.get(e + n, i)
            }, a = {
                set: function (e, t) {
                    return e = i + e, localStorage["params@" + e] = t, !0
                }, get: function (e) {
                    return e = i + e, localStorage["params@" + e]
                }
            };
            e.push("global");
            for (var r = 0; r < e.length; r++) {
                var s = "global" == e[r] ? "" : e[r] + "@";
                a[dash2camel(e[r])] = {
                    get: function (e) {
                        return function (t, n) {
                            return o(e, t)
                        }
                    }(s), set: function (e) {
                        return function (t, i) {
                            return n(e, t, i)
                        }
                    }(s)
                }
            }
            t.extending(a), window.extending({localParams: t}), window.localParams = window.localParams
        }, a = {};
        a.extending({
            set: function (e, t) {
                if (e = i + e, null == t && (localStorage[e] = "null"), "string" == typeof t && (localStorage[e] = t), "number" == typeof t && (localStorage[e] = "[number]:" + t), "boolean" == typeof t && (localStorage[e] = "[boolean]:" + t), "date" == typeOf(t))localStorage[e] = "[date]:" + t.getTime(); else try {
                    localStorage[e] = JSON.stringify(t)
                } catch (n) {
                    localStorage[e] = String(t)
                }
                return !0
            }, get: function (e) {
                e = i + e;
                var t, n = localStorage[e];
                if ("string" != typeof n)return n;
                if ("null" === n)return null;
                if (0 == n.indexOf("[number]:"))return +n.slice(9);
                if (0 == n.indexOf("[boolean]:"))return "true" === n.slice(10);
                if (0 == n.indexOf("[date]:"))return new Date((+n.slice(7)));
                try {
                    t = JSON.parse(n)
                } catch (e) {
                    t = String(n)
                }
                return t
            }
        });
        var r = function () {
            window == top && window.extending({
                registry: function () {
                    for (var e = {}, t = 0; t < window.molDatas.length; t++)e.extending(dash2camel(window.molDatas[t].molNo), {});
                    return e.extending("global", {}), e
                }()
            })
        };
        t.exports = {localData: a, localParamsInit: o, registryInit: r}
    }, {}], 17: [function (e, t, n) {
        !function () {
            var e = window.getDistPath() + "mock/", t = window.config.mockActions;
            for (var n in t)t[n] = e + (t[n] || n).replace(/\//g, "-") + ".json"
        }()
    }, {}], 18: [function (e, t, n) {
        var i = Object.create(null), o = {
            go: function (t) {
                var n = i[t], a = n.importing || [], r = n.view, s = !r.match(/\.htm$|\.htm\?/);
                if (o.current = top.currentPageNo = t, s)o.ct.addClass("hide-plus").empty(), o.frame.removeClass("hide-plus"), o.frame[0].src = getViewPath(r), o.frame.attr("page-no", t); else {
                    var l = e("./scope")();
                    window.importing.apply(null, a.concat(r).concat(function (e) {
                        o.frame.addClass("hide-plus"), o.ct.removeClass("hide-plus").tpsource(r).template(), "function" == typeof n.init && n.init(l)
                    }))
                }
                return o
            }, on: function (e, t) {
                return "string" == typeof arguments[1] && (t = {view: arguments[1]}), i[e] ? $.extend(i[e], t) : i[e] = t, o
            }, current: null, ct: null, frame: null
        };
        "object" == typeof t && "object" == typeof t.exports && (t.exports = o)
    }, {"./scope": 24}], 19: [function (e, t, n) {
        !function (e) {
            e.PaginationCalculator = function (e, t) {
                this.maxentries = e, this.opts = t
            }, e.extend(e.PaginationCalculator.prototype, {
                numPages: function () {
                    return Math.ceil(this.maxentries / this.opts.pageOnce)
                }, getInterval: function (e) {
                    var t = Math.floor(this.opts.num_display_entries / 2), n = this.numPages(), i = n - this.opts.num_display_entries, o = e > t ? Math.max(Math.min(e - t, i), 0) : 0, a = e > t ? Math.min(e + t + this.opts.num_display_entries % 2, n) : Math.min(this.opts.num_display_entries, n);
                    return {start: o, end: a}
                }
            }), e.PaginationRenderers = {}, e.PaginationRenderers.defaultRenderer = function (t, n) {
                this.maxentries = t, this.opts = n, this.pc = new e.PaginationCalculator(t, n)
            }, e.extend(e.PaginationRenderers.defaultRenderer.prototype, {
                createLink: function (t, n, i) {
                    var o, a = this.pc.numPages();
                    return t = t < 0 ? 0 : t < a ? t : a - 1, i = e.extend({
                        text: t + 1,
                        classes: ""
                    }, i || {}), o = t == n ? e("<span class='current'>" + i.text + "</span>") : e("<a>" + i.text + "</a>").attr("href", this.opts.link_to.replace(/__id__/, t)), i.classes && o.addClass(i.classes), i.rel && o.attr("rel", i.rel), o.data("page_id", t), o
                }, appendRange: function (e, t, n, i, o) {
                    var a;
                    for (a = n; a < i; a++)this.createLink(a, t, o).appendTo(e)
                }, getLinks: function (t, n) {
                    var i, o, a = this.pc.getInterval(t), r = this.pc.numPages(), s = e("<div>");
                    return this.opts.prev_text && (t > 0 || this.opts.prev_show_always) && s.append(this.createLink(t - 1, t, {
                        text: this.opts.prev_text,
                        classes: "prev",
                        rel: "prev"
                    })), a.start > 0 && this.opts.num_edge_entries > 0 && (o = Math.min(this.opts.num_edge_entries, a.start), this.appendRange(s, t, 0, o, {classes: "sp"}), this.opts.num_edge_entries < a.start && this.opts.ellipse_text && e("<span>" + this.opts.ellipse_text + "</span>").appendTo(s)), this.appendRange(s, t, a.start, a.end), a.end < r && this.opts.num_edge_entries > 0 && (r - this.opts.num_edge_entries > a.end && this.opts.ellipse_text && e("<span>" + this.opts.ellipse_text + "</span>").appendTo(s), i = Math.max(r - this.opts.num_edge_entries, a.end), this.appendRange(s, t, i, r, {classes: "ep"})), this.opts.next_text && (t < r - 1 || this.opts.next_show_always) && s.append(this.createLink(t + 1, t, {
                        text: this.opts.next_text,
                        classes: "next",
                        rel: "next"
                    })), e("a", s).click(n), s
                }
            }), e.fn._pagination = function (t, n) {
                function i(t) {
                    var n = e(t.target).data("page_id"), i = o(n);
                    return i || t.stopPropagation(), i
                }

                function o(e) {
                    u.data("currentPage", e), r = a.getLinks(e, i), d > c ? l.empty() : u.empty(), r.appendTo(l);
                    var t = n.callback(e, u);
                    return t
                }

                n = e.extend({
                    pageOnce: 10,
                    num_display_entries: 11,
                    currentPage: 0,
                    num_edge_entries: 0,
                    link_to: "javascript:void(0);",
                    prev_text: "<",
                    next_text: ">",
                    ellipse_text: "...",
                    prev_show_always: !0,
                    next_show_always: !0,
                    renderer: "defaultRenderer",
                    show_if_single_page: !1,
                    loadFirstPage: !0,
                    callback: function () {
                        return !1
                    }
                }, n || {});
                var a, r, s, l, d = t, c = n.pageOnce, u = this;
                if (u.children("div:not(.select-pageonce)").length || u.append("<div></div>"), l = u.children("div:not(.select-pageonce)"), s = parseInt(n.currentPage, 10), u.data("currentPage", s), t = !t || t < 0 ? 1 : t, n.pageOnce = !n.pageOnce || n.pageOnce < 0 ? 1 : n.pageOnce, !e.PaginationRenderers[n.renderer])throw new ReferenceError("Pagination renderer '" + n.renderer + "' was not found in jQuery.PaginationRenderers object.");
                a = new e.PaginationRenderers[n.renderer](t, n);
                var f = new e.PaginationCalculator(t, n), p = f.numPages();
                return u.off("setPage").on("setPage", {numPages: p}, function (e, t) {
                    if (t >= 0 && t < e.data.numPages)return o(t), !1
                }), u.off("prevPage").on("prevPage", function (t) {
                    var n = e(this).data("currentPage");
                    return n > 0 && o(n - 1), !1
                }), u.off("nextPage").on("nextPage", {
                    numPages: p
                }, function (t) {
                    var n = e(this).data("currentPage");
                    return n < t.data.numPages - 1 && o(n + 1), !1
                }), u.off("currentPage").on("currentPage", function () {
                    var t = e(this).data("currentPage");
                    return o(t), !1
                }), r = a.getLinks(s, i), d > c ? l.empty() : u.empty(), (p > 1 || n.show_if_single_page) && r.appendTo(l), u.is(":empty") && r.appendTo(u), n.loadFirstPage && n.callback(s, u, !0), this
            }, e.fn.paging = function (t, n) {
                this.children(".paging").empty();
                var i = '<div class="select-pageonce"><label>每页显示</label><select name="datatable_length"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select>条</div>';
                "number" == typeof t && (t = {count: t});
                var o = t.pageOnce = t.pageOnce || 10, a = t.currentPage || 0, r = e(this), s = {
                    pageOnce: o,
                    loadFirstPage: t.loadFirstPage !== !1,
                    num_display_entries: t.num_display_entries || 5,
                    num_edge_entries: t.num_edge_entries || 1,
                    currentPage: a,
                    callback: function (i, a, s) {
                        var l = i * o, d = Math.min((i + 1) * o, t.count);
                        s && r.children(".paging").children(".select-pageonce").length && (r.children(".paging").children(".select-pageonce").children("select")[0].options.selected = !0), n(l + 1, d, s, i, o, t.count), !s && t.autoHash !== !1 && e(a.parent()[0].scrollIntoView()).hide().show()
                    }
                };
                r.children(".paging")._pagination(t.count, s), r.find(".total-count").html(t.count), t.name && r.find(".table-name,.list-name").html(t.name), r.find(".list-title-bar").show();
                var l = e(i);
                r.children(".paging").append(l);
                for (var d = l.children("select")[0].options, c = 0; c < d.length; c++)if (d[c].value == o) {
                    d[c].selected = !0;
                    break
                }
                return l.children("select").on("change", function () {
                    t.pageOnce = +this.value, t.count = null, r.pagingList(t)
                }), 0 == t.count && r.children(".select-pageonce").remove(), r
            };
            var t = {}, n = window.config.paingListCommonHTML || '<div class="new-color-bar list-title-bar"> <b>▌</b><u class="table-name"></u><span class="table-desc">共查找到<u class="total-count"></u>条数据</span></div><div class="search-result"  tpsource="#search-result-tp"></div><div class="paging"></div>', i = function (e, t, n) {
                var i = "";
                if ("number" == typeof t && "number" == typeof e || (i = "缓存参数设置错误，非数字！"), t > e && (i = "缓存参数设置错误，单次缓存数大于总体缓存数!"), t < n && (i = "缓存参数设置错误，单次缓存数小于单页条数!"), i)throw new Error(i + " cacheMax,cacheOnce,pageOnce: " + [e, t, n].join(","));
                return !0
            }, o = function (e) {
                t[e] = [], t[e].size = 0, t[e].time = (new Date).getTime()
            }, a = function (e, n, i, a, r) {
                r = r || 1, (a || t[e].size + i.length > n) && o(e);
                for (var s = i.length - 1; s > -1; s--)t[e][r - 1 + s] = i[s];
                return t[e].size += i.length, !0
            };
            e.fn.setCache = function (t, n, i, o) {
                var r = this[0].id || this.attr("cache-id");
                return a(r, o || 1600, t, i !== !1, n || 1), e(this)
            }, e.fn.pagingList = function (r) {
                var s = 18e4, l = this[0].id || this.attr("cache-id");
                t[l] = [], t[l].size = 0;
                var d = this, c = r.newSearch !== !1, u = r.pageOnce || 10, f = (r.cacheOnce || 4) * u, p = Math.min((r.cacheMax || 16) * u, window.config.pagingCacheMaxCount || 1600), h = r.useCache !== !1, m = r.begin || 1, g = r.end || m - 1 + u, b = (r.name, r.action || r.url), v = r.jsonObj || window.jsonObj || Object.create(null), x = r.params || r.data, w = r.callback, y = r.method || r.type || "post";
                r.commonHTML && d.html(n);
                var $ = function (n, i, o, s) {
                    h ? (v.pageSizeTest = f, v.pageNumTest = Math.ceil(o / v.pageSizeTest), v.begin = Math.floor(o / f) * f + 1, v.end = v.begin + f - 1) : (v.pageSize = u, v.pageNum = Math.ceil(o / v.pageSize), v.begin = o, v.end = s), x = x || Object.create(null), "string" == typeof b && b.match(/\/mock\/.+\.json/i) && (y = "GET");
                    var d;
                    if (r.loading !== !1) {
                        var c = r.beforeSend || function () {
                            };
                        r.beforeSend = function () {
                            c.apply(null, [].slice.apply(arguments)), d = showLoading()
                        }
                    }
                    e.ajax(e.extend({
                        url: b,
                        type: y,
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                            token: window.token || (window.token = localData.get("token"))
                        },
                        data: "GET" == y ? e.extend(v, x) : obj2str(e.extend(v, x))
                    }, r || null)).always(function (c, u) {
                        if (d && d.fadeOut && d.fadeOut(150), "success" == u) {
                            if (!window.config.mock && ("string" == typeof c && c.length > 204800 || "array" == typeOf(c.data) && c.data.length > 2e3))return warn("result's length too long, check the end－begin,or other params wrong？"), !1;
                            c = str2obj(c), 1 == c.flag ? (h && a(l, p, c.data, !1, v.begin), n(h ? {
                                flag: 1,
                                data: t[l].slice(o - 1, s),
                                totalCount: c.totalCount
                            } : c), i && c.extraRes && r.extraCb && r.extraCb(c.extraRes)) : c.flag == -1 ? toast("登录状态过期,请重新登录", function () {
                                top.logout()
                            }) : (toast(c.msg || "后台请求失败").err(), warn("ajax请求失败!\n请求路径为:{0}\n请求参数为:{1}\n后台返回的错误信息为:{2}".format(b, obj2str(e.extend(v, x)), c.msg || "")))
                        } else warn("paing请求地址错误或网络问题, status: {0}, action:{1} ".format(u, b))
                    })
                }, _ = function (e, n, i, a, d, c) {
                    return 0 == r.count ? (w([], e, n, i, a, d, c), !1) : (t[l].time + s > (new Date).getTime() || o(l), void(t[l][e - 1] && t[l][n - 1] ? w(t[l].slice(e - 1, n), e, n, !1, a, d, c) : $(function (t) {
                        w(t.data.slice(0, d), e, n, i, a, d, c)
                    }, i, e, n)))
                };
                i(p, f, u), c && o(l), r.count ? d.paging(r, _) : $(function (e) {
                    r.count = e.totalCount, h ? d.paging(r, _) : (r.loadFirstPage = !1, d.paging(r, r, _), w(e.data, m, g, c, 0, u, r.count))
                }, c, m, g);
                var C = function (e, t) {
                    var n = this.getAttribute("sort-name"), i = this.getAttribute("sort-order") || "asc";
                    return !!n && (e.jsonObj.sortName = n, e.jsonObj.sortOrder = i, t.pagingList(e), void("desc" == i ? (t.find("[sort-name={0}]".format(n)).attr("sort-order", "asc"), t.find("[sort-name={0}]".format(n)).removeClass("sort-asc").addClass("sort-desc")) : (t.find("[sort-name={0}]".format(n)).attr("sort-order", "desc"), t.find("[sort-name={0}]".format(n)).removeClass("sort-desc").addClass("sort-asc"))))
                };
                if (c) {
                    var k = d.closest(".all-fix-wrap"), T = k.length ? k : d;
                    T.off("click", "[sort-name]").on("click", "[sort-name]", function () {
                        C.apply(this, [r, T])
                    })
                }
                return d
            }
        }(window.jQuery)
    }, {}], 20: [function (e, t, n) {
        !function () {
            window !== top && !config.isLocal && (window.originSrc = window.iframe.getAttribute("o-src")) && location.pathname + location.search !== originSrc && (console.info(location.pathname + location.search), console.error("状态过期,请刷新页面\n" + originSrc), top.document.body.innerHTML = "<br><h2>状态过期,请刷新页面\n</h2>");
            var e = function (e) {
                var t = e || window.event, n = t.target || t.srcElement, i = n.type || n.getAttribute("type"), o = n.hasAttribute("contenteditable"), a = n.getAttribute("readonly"), r = n.getAttribute("enabled");
                a = null != a && a, r = null == r || r;
                var s = !(8 != t.keyCode || "password" != i && "text" != i && "textarea" != i || 1 != a && 1 == r), l = 8 == t.keyCode && "password" != i && "text" != i && "textarea" != i && !o;
                return !l && (!s && void 0)
            };
            document.onkeydown = e, $(".query-block").each(function () {
                this.addEventListener("click", function () {
                    var e = $(this), t = e[0].scrollHeight;
                    setTimeout(function () {
                        var n = e[0].scrollHeight;
                        n == t || $(".query-result").find(".native-fix-wrap>table").each(function () {
                            var e = $(this), t = e.attr("fixed-mode");
                            t && e.fixTable(t)
                        })
                    }, 500)
                }, !1)
            })
        }()
    }, {}], 21: [function (e, t, n) {
        window.path = window.path || localData.get("path") || "", window.getDistPath = function (e) {
            if (e = e || "", config.isLocal) {
                var t = location.href, n = "", i = t.indexOf("/view/"), o = t.indexOf("/plugin/");
                if (i > -1)for (i += 6; i < t.length; i++)"/" == t[i] && (n += "../"); else if (o > -1)for (o += 8; o < t.length; o++)"/" == t[o] && (n += "../");
                return (location.pathname.match(/\/index\.html|\/login\.html|\\index\.html|\\login\.html/) ? "./" : n + "../") + e
            }
            return window.path + "/dist/" + e
        }, window.getSrcPath = function (e) {
            return e.match(/^https?|^\.|^\//i) ? e : e.match(/.css$/i) ? window.getDistPath() + "css/" + e : e.match(/.js$/i) ? window.getDistPath() + "js/" + e : e.match(/.html?$/i) ? window.getDistPath() + "view/" + e : window.getDistPath() + e
        }, window.getViewPath = function (e, t) {
            var n;
            if (e.match(/^https?|^\.|^\//i))return e;
            n = t ? t : 0 == e.indexOf("plugin/") ? window.getDistPath() : window.getDistPath("view/");
            var i = n.indexOf("?") > -1 ? "&" : "?";
            return n + (e || "404.html") + i + "version=" + window.config.version
        }, window.getMap_server = function () {
            var e = localData.get("sysParams") ? localData.get("sysParams").defaultMapServer : "";
            if (e = e || window.config.mapServerPath, !e)throw new Error("the mapServerPath is empty or undefined!");
            return e
        }
    }, {}], 22: [function (e, t, n) {
        JSON.extending({
            equal: function (e, t) {
                return e === t || typeof e == typeof t && JSON.stringify(e) === JSON.stringify(t)
            }, clone: function (e) {
                return !e || "object" != typeOf(e, !0) && "array" != typeOf(e, !0) ? e : window.str2obj(window.obj2str(e))
            }
        });
        var i = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], o = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        Date.prototype.extending({
            getDayAs: function (e) {
                return "星期" == e ? i[this.getDay()] : "周" == e ? o[this.getDay()] : this.getDay()
            }, addMonth: function (e) {
                var t = this.getMonth(), n = this.getFullYear();
                return e > 0 ? e > 11 && (n += Math.floor(e / 12)) : e < -11 && (n += Math.ceil(e / 12)), t += e % 12, this.setMonth(t), this.setFullYear(n), this
            }, format: function (e) {
                var t = {
                    "M+": this.getMonth() + 1,
                    "D+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "Q+": Math.floor((this.getMonth() + 3) / 3),
                    S: this.getMilliseconds()
                };
                e = e || "YYYY-MM-DD hh:mm:ss";
                for (var n in{
                    8: 8,
                    10: 10
                })"YYYYMMDD" == e.slice(0, +n).toUpperCase().replace(/\-|\.|\s|\//g, "") && (e = e.slice(0, +n).toUpperCase() + e.slice(+n));
                /(Y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
                for (var i in t)new RegExp("(" + i + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[i] : ("00" + t[i]).substr(("" + t[i]).length)));
                return e
            }
        }), Date.extending({
            format: function (e) {
                return (new Date).format(e)
            }, getDayAs: function (e) {
                return (new Date).getDayAs(e)
            }, weeks: i, weeks2: o
        }), String.prototype.extending({
            isEmpty: function () {
                return 0 === this.replace(/\s+/gm, "").length
            }, format: function () {
                var e, t = "\\{i\\}", n = this;
                if ("object" == typeof arguments[0])return $compile(this, arguments[0], !0);
                for (var i = arguments.length - 1; i > -1; i--)e = t.replace("i", i), n = n.replace(RegExp(e, "g"), arguments[i]);
                return n
            }, inside: function (e) {
                var t = this.valueOf();
                if ("string" == typeof e)return e.indexOf(t) > -1;
                for (var n = e.length - 1; n > -1; n--)if (t === e[n].valueOf())return n + 1;
                return !1
            }, like: function (e) {
                var t = 0 == e.indexOf("%"), n = e.lastIndexOf("%") == e.length - 1;
                return t && n ? this.indexOf(e.slice(1, -1)) != -1 : t ? this.lastIndexOf(e.slice(1)) == this.length - e.length + 1 : n ? 0 == this.indexOf(e.slice(0, -1)) : String(this) === String(e)
            }, trimL: function () {
                return this.trimLeft()
            }, trimR: function () {
                return this.trimRight()
            }, lower: function () {
                return this.toLowerCase()
            }, upper: function () {
                return this.toUpperCase()
            }, lowEqual: function (e) {
                return this.toLowerCase() == e.toLowerCase()
            }
        }), Number.prototype.extending({
            prev: function () {
                return this - 1
            }, next: function () {
                return this + 1
            }
        });
        var a = e("./lambda");
        Array.prototype.extending(a).extending("fire", function (e) {
            return !!this.length && ("function" == typeof this[0] && this[0](), this.shift(), void arguments.callee.call(this, e))
        }), "object" == typeof t && "object" == typeof t.exports
    }, {"./lambda": 15}], 23: [function (e, t, n) {
        top._rootTabUrls = top._rootTabUrls || Object.create(null), window.getting({
            currentTab: function () {
                return top.rootTabs.tabs("getSelected")
            }, currentTabWin: function () {
                return top.$(".tabs-panels>.epanel:not(hide)").find(".tab-content-frame")[0].contentWindow
            }
        }), window.$.fn.$close = function () {
            var e = this[0].id;
            if (e && 0 == e.indexOf("root-tab")) {
                var t = top.rootTabs.tabs("getTabIndex", this);
                top.rootTabs.tabs("close", t)
            } else this.window("close");
            return this
        }, window.$.fn.$select = function () {
            if (this.hasClass("epanel-body")) {
                var e = top.rootTabs.tabs("getTabIndex", this);
                top.rootTabs.tabs("select", e)
            }
            return this
        }, window.$.fn.$open = function (e) {
            return window.$open(this, e || this.data("open-params") || {})
        }, t.exports = {
            showLoading: function (e) {
                var t = $(".loading-mask");
                return t.length || (t = $('<div class="loading-mask"><div class="loading"><i class="icon-spinner"></i><p>加载中...</p></div></div>').appendTo("body")), t[e === !1 ? "addClass" : "removeClass"]("transparent").show()
            }, hideLoading: function () {
                return $(".loading-mask").fadeOut(150)
            }, showMask: function () {
                var e = $(".common-mask.preview-mask");
                return e.length || (e = $('<div class="common-mask preview-mask">')), e.appendTo("body").show()
            }, hideMask: function () {
                return $(".common-mask.preview-mask").fadeOut(150)
            }, toast: function (e) {
                var t, n, i, o;
                e = String(e);
                var a = e.length > 15, r = a ? e.length : 15;
                "number" == typeof arguments[1] ? (t = arguments[1], "function" == typeof arguments[2] && (n = arguments[2])) : "function" == typeof arguments[1] && (n = arguments[1]);
                (new Date).getTime();
                t = t || 1600 + 30 * (r - 15);
                var s = jQuery("<div><p>str</p></div>".replace("str", e)), l = function () {
                    o || (s.animate({opacity: 0}, 500, function () {
                        n && n(s), s.remove()
                    }), o = !0)
                };
                return jQuery(".toast").hide(), document.body.addEventListener("click", l, !0), s.addClass("toast").appendTo("body").css({"text-align": a ? "left" : "center"}).bind("mouseenter", function () {
                    clearTimeout(i)
                }).bind("mouseleave", function () {
                    i = setTimeout(l, 200)
                }).extend({
                    ok: function () {
                        return s.addClass("ok")
                    }, err: function () {
                        return s.addClass("err")
                    }, warn: function () {
                        return s.addClass("warn")
                    }
                }).fadeIn(function () {
                    i = setTimeout(l, t || 900)
                })
            }, tabsInit: function (e) {
                $(e || document.body).find(".tabs-list").find("li").on("click", function (e) {
                    var t = this.parentNode, n = t.parentNode;
                    t.find(".current").removeClass("current"), n.find(".tabs-content").hide(), $(this).addClass("current"), $(this.getAttribute("direct")).show()
                })
            }, $open: e("./win").$open, _$alert: function (e) {
                var t, n = "提示", i = "info", o = function () {
                };
                "object" != typeof e ? (t = e, o = arguments[1] || o) : (n = e.title || n, i = e.icon || i, o = e.callback || o, t = e.msg);
                var a = jQuery.messager.alert(n, t, i, o);
                return jQuery(".messager-window, .messager-window+.window-shadow").css("top", function (e, t) {
                    return Math.max(100, parseInt(t, 10) - 60)
                }), $.noOutline(), a.parent()
            }, _$confirm: function (e) {
                var t, n = "提示", i = function () {
                };
                "object" != typeof e ? (t = e, i = arguments[1] || i) : (n = e.title || n, i = e.callback || i, t = e.msg);
                var o = jQuery.messager.confirm(n, t, i);
                return jQuery(".messager-window, .messager-window+.window-shadow").css("top", function (e, t) {
                    return Math.max(100, parseInt(t, 10) - 60)
                }), $.noOutline(), o.parent()
            }, $alert: function () {
                return top._$alert.apply(this, [].slice.call(arguments))
            }, $confirm: function () {
                return top._$confirm.apply(this, [].slice.call(arguments))
            }, $show: function (e) {
                return jQuery.messager.show({
                    title: "提示",
                    msg: e,
                    showType: "fade",
                    timeout: 1500,
                    showSpeed: 500,
                    width: 220,
                    height: 120,
                    style: {right: "50%", top: "50%", margin: "-120px -110px 0  0 "}
                })
            }, $msg: function (e) {
                return "string" == typeof e && (e = {msg: e}), $.messager.show({
                    title: e.title || '<i class="icon-envelope-alt"></i> 新消息提醒',
                    msg: e.msg,
                    timeout: e.timeout || 8e3,
                    width: e.width || 380,
                    height: e.height || 210,
                    showType: "slide"
                }).closest(".window").addClass("corner-msg " + (e.className || ""))
            }, $close: function (e) {
                if (e) {
                    var t = top.rootTabs || top.$("#root-tabs"), n = t.tabs("getSelected");
                    if (n) {
                        var i = t.tabs("getTabIndex", n);
                        0 !== i && t.tabs("close", i)
                    }
                } else {
                    var o = window.iframe;
                    if (o) {
                        var a = top._mol_wins[o.getAttribute("win-id")];
                        a && a.window("close")
                    }
                }
            }, $select: function () {
                var e = $(this.iframe).parentsUntil(".epanel", ".epanel-body");
                return e.$select()
            }, $append: function (e, t, n, i, o) {
                var a = top.rootTabs || top.$("#root-tabs");
                a.data("tab-urls") || a.data("tab-urls", {});
                var r = a.data("tab-urls");
                if (n !== !1 && r[e]) {
                    var s, l = a.find(">.tabs-epanels>.epanel>.epanel-body");
                    if (l.each(function () {
                            if (!s) {
                                var t = top.$(this).data("tab-src");
                                e == t && (s = top.$(this).$select())
                            }
                        }), s)return s
                }
                r[e] = !0;
                var d = "root-tab-" + (new Date).getTime(), c = "opener-" + d;
                top._opener_wins[c] = this;
                var u = function (n) {
                    a.tabs("add", {
                        title: t,
                        id: n,
                        content: '<iframe class="tab-content-frame" src="{0}" opener-id="{1}" frameborder="0"></iframe>'.format(e, c),
                        iconCls: o || null,
                        closable: i !== !1
                    })
                };
                return a.tabs("tabs").length > (parseInt(window.config.maxTabCount) || 9) ? top.$confirm("页签窗口过多!<br>将关闭最先打开的页签, 再打开新窗口。<br>是否继续?", function (e) {
                    e && (a.tabs("close", 1), u(d))
                }) : u(d), top.$("#" + d).data("tab-src", e).addClass("root-tab-one")
            }, $ajax: function (e, t, n, i, o, a) {
                var r = arguments[0];
                "object" == typeof r && (e = r.url, t = r.data || r.params, n = r.success || r.callback, i = r.type || i, o = r.beforeSend, a = r.complete), "string" == typeof e && e.match(/\/mock\/.+\.json/i) && (i = "GET"), t = t || {};
                var s = function () {
                };
                o === !1 ? o = s : "function" != typeof o && (o = function () {
                    showLoading()
                }), a = o == s ? s : "function" == typeof a ? a : function () {
                    hideLoading()
                };
                var l = {token: window.token || (window.token = localData.get("token"))};
                return window.config && window.config.exToken && (l.exToken = window.config.exToken), "GET" == i && ("string" == typeof t && e.lastIndexOf("/") == e.length - 1 ? (e += t, t = null) : e.indexOf("{") > -1 && e.indexOf("}") > 0 && (e = e.format(t), t = null)), $.ajax($.extend({
                    type: i || "POST",
                    url: e,
                    headers: l,
                    contentType: "application/json; charset=UTF-8",
                    dataType: "json",
                    data: "GET" == i ? t : obj2str(t),
                    beforeSend: o
                }, "object" == typeof arguments[0] ? arguments[0] : null)).always(function (i, o) {
                    a(i, o), "success" == o ? 1 == i.flag ? "function" == typeof n && n(i) : 0 == i.flag ? (toast(i.msg || "后台请求失败").err(), warn("ajax请求失败!\n请求路径为:{0}\n请求参数为:{1}\n后台返回的错误信息为:{2}".format(e, obj2str(t), i.msg || ""))) : i.flag == -1 && toast("登录状态过期,请重新登录", function () {
                        top.logout()
                    }) : 404 == i.status || warn("$ajax请求地址错误或网络问题, status: {0}, action:{1} ".format(o, e))
                })
            }, $post: function (e, t, n, i, o) {
                return $ajax(e, t, n, "POST", i, o)
            }, $get: function (e, t, n, i, o) {
                return $ajax(e, t, n, "GET", i, o)
            }, action2link: function (e) {
                return e + (e.indexOf("?") > -1 ? "&token={0}".format(top.token) : "?token={0}".format(top.token))
            }, act2link: this.action2link, makeAct: function (e, t) {
                var n = window.config.mock ? window.config.mockActions : window.config.actions, i = arguments[1] || "api", o = window.config.restfuls[0] + "/" + window.getPrjName() + "/" + i + "/";
                return e = e.replace(/^\//, "").replace(/\?.+/, ""), n[e] || (n[e] = window.config.mock ? window.getDistPath("mock/{0}.json".format(e.replace(/\/$/, "").replace(/\/|\./g, "-"))) : e), 0 == n[e].indexOf("http") ? n[e] : window.config.mock ? n[e] : o + n[e]
            }, isShowMore: function (e) {
                var t = $(e || document.body), n = 140, i = function (e, n) {
                    var i = e.innerHTML.replace(/\n/gm, "<br>"), n = n, o = "", a = i.length, r = $(e), s = r.next(), l = s.attr("moreId");
                    i.match(/<br/gm);
                    a > n && (o = i.substring(0, n), r.html(o), s.show(), s.on("click", function () {
                        toggleMore(this, l, n, i, o), t.find(".native-fix-wrap>table").trigger("refitFix")
                    }))
                };
                $(e || "body").find("p.brief-content").each(function (e, t) {
                    i(t, n)
                }), t.find(".native-fix-wrap>table").trigger("refitFix"), n = null
            }, toggleMore: function () {
                var e = [];
                return function (t, n, i, o, a) {
                    for (var r = e.length, s = n, l = !1, d = 0, t = $(t); d < r; d++)e[d].id === s && (e[d].show ? (t.text("收起").prev().html(o), e[d].show = !1) : (t.text("更多").prev().html(a), e[d].show = !0), l = !0);
                    l || (t.text("收起").prev().html(o), e.push({id: s, show: !1}))
                }
            }()
        }
    }, {"./win": 26}], 24: [function (e, t, n) {
        function i(e) {
            var t = function (e, t) {
                this.selector = t, this.ele = $(t), this.key = e
            };
            return t.prototype.set = function (t, n) {
                return e.set(this.key, t, n !== !1), this
            }, t.prototype.get = function () {
                return e.get(this.key)
            }, t.prototype.update = function (t, n) {
                return e.update(this.key, t, n)
            }, t
        }

        function o(e) {
            return function () {
                var t, n, i, o, a, r = this;
                return arguments[0].isScope ? (t = arguments[0], i = arguments[1], o = arguments[2], a = arguments[3]) : (n = arguments[0], t = n.scope, i = n.key, o = n.helper, a = n.allowHTML), r.each(function () {
                    var n = $(this), r = n.prop("id"), s = i || r, l = t[e](s, n, o, a);
                    n.data("x-couple", l)
                }), this
            }
        }

        e("./injector-extractor");
        var a = "x-bind", r = "s-bind", s = $.random(), l = function (e) {
            return e
        }, d = function (e, t) {
            var n = this, i = $(n), o = i.data("current-data"), a = i.injector();
            return "function" == typeof a ? a.apply(i, [e, null, t]) : void(i.is(":checkbox") || i.is(":radio") ? i[0].checked = e === !0 : i.is(":input") ? i.val(e) : i.is("img") ? i[0].src = e : i.is("[x-form]") ? i.inject(e) : o && o === e && !t || (i.is("[x-map]") ? i.inject(e, !0) : i.is("[x-table]") ? i.table(e) : i.is("[x-tp]") || i.is("[x-list]") || i.is("[tpsource]") || "object" == typeof e ? i.template(e, i.data("helper"), i.data("allow-html"), e) : i.html(e)))
        }, c = function () {
            var e = $(this), t = e.data("current-data"), n = e.extractor();
            return "function" == typeof n ? n.call(e, null) : e.is(":checkbox") || e.is(":radio") ? e[0].checked : e.is(":input") ? e[0].value : e.is("img") ? e[0].src : e.is("[x-form]") ? e.extract() : e.is("[x-map]") ? t : e.is("[x-tp]") || e.is("[x-list]") ? t : e.is("[x-table]") ? t : t ? t : e.html()
        }, u = function (e, t, n, i) {
            return "function" == typeof i ? e.valueAt(t, i) : e.valueAt(t, n)
        }, f = function (e, t, n) {
            for (var i = e.split("."), o = i.length, a = t, r = 0; r < o; r++) {
                var s = i[r], l = r == i.length - 1;
                if ("function" == typeof a.hasOwnProperty && !a.hasOwnProperty(s) && "undefined" != typeof a[s])throw new Error("can not set a prefix property is not ownProperty");
                if (l)a[s] = n; else {
                    if ("undefined" == typeof a[s])a[s] = Object.create(null); else if ("object" != typeof a[s] || null === a[s])throw new Error("can not set a prefix property is null or typeof Number,Boolean,Function");
                    a = a[s]
                }
            }
            return t
        }, p = "[x-name],[x-key]", h = "[x-name]";
        $.fn.checkIn = $.fn.inject = function (e, t) {
            return this.filter("[x-form],[x-map]").each(function (n, i) {
                var o = $(i), a = o.find(p);
                if (0 == a.length) {
                    o.find("*").each(function (n, i) {
                        [].slice.call(i.attributes).each(function (n) {
                            var o = i.getAttribute(n);
                            "string" == typeof o && o && ("#" == o[0] && (o = o.replace(/^#/, "replace4compile#ID")), i.setAttribute(n, window.$compile(o, e, t).replace(/^replace4compile#ID/, "#")))
                        }), 0 == i.children.length && (i.innerHTML = window.$compile(i.innerHTML, e, t))
                    })
                }
                a.each(function (n, i) {
                    var o = $(i), a = o.attr("x-name") || o.attr("x-key"), r = o.attr("x-hide"), s = o.attr("x-show");
                    r && u(r, e) && o.hide().addClass("hide-plus"), s && (o.addClass("hide-plus"), u(s, e) && o.show().removeClass("hide-plus"));
                    var c;
                    c = "x-key" == a ? u(a, e, t) : u(a, e, t, l);
                    var f = o.injector();
                    "function" == typeof f ? f.apply(o, [c, e]) : d.call(i, c)
                }), o.is("[x-map]") && o.data("current-data", e)
            }), this
        }, $.fn.checkOut = $.fn.extract = function (e) {
            if (0 == this.filter("[x-form]").length)return console.info(["the selector has no elements", this]), !1;
            if (!this.eq(0).is("[x-form]"))throw console.info(this), new Error("the element is not a [x-form]");
            var t = this.eq(0), n = t.attr("x-outside"), i = t.data("x-query-obj"), o = t.find(h);
            if (i)for (var a in i)i.hasOwnProperty(a) && (i[a] = s); else i = {}, t.data("x-query-obj", i);
            (n ? o.add($(n)) : o).each(function (e, t) {
                var n = $(t), o = n.extractor();
                if ("function" == typeof o)o.call(n, i); else {
                    var a = n.attr("x-name"), r = c.call(n);
                    f(a, i, r)
                }
            });
            for (var a in i)!i.hasOwnProperty(a) || null != i[a] && i[a] != s || (i[a] = "");
            return i
        };
        var m = function (e, t, n, i, o, a, r) {
            if (a > 5 || r > 99887766)return !1;
            var l = "_shadow_" + e;
            if (n.hasOwnProperty(e) && !n.hasOwnProperty(l) && (Object.defineProperty(n, l, {
                    value: n[e],
                    writable: !0,
                    enumerable: !1,
                    configurable: !1
                }), Object.defineProperty(n, e, {
                    set: function (e) {
                        e === s ? n[l] = null : n[l] !== e || "object" == typeof e ? (n[l] = e, o.check(t, i, !0)) : n[l] = e
                    }, get: function () {
                        return n[l]
                    }, enumerable: !0, configurable: !1
                }), "object" == typeof n[e]))for (var d in n[e])m(d, t, n[e], i, o, a + 1, r + 1)
        }, g = function (e, t, n) {
            if ("object" == typeof t)for (var i in t)m(i, e, t, t, n, 0, 0)
        };
        $.fn.bind2 = o("bind"), $.fn.binding = o("binding"), $.fn.getData = $.fn.Get = function () {
            var e = this.data("x-couple");
            return e ? e.get() : c.call(this)
        }, $.fn.setData = $.fn.Set = function (e, t) {
            return this.each(function () {
                var n = $(this), i = n.data("x-couple");
                i ? i.set(e, t) : d.apply(n, [e, t])
            }), this
        }, $.fn.upData = $.fn.update = function (e, t) {
            return this.each(function () {
                var n = $(this), i = n.data("x-couple");
                if (i)i.update(e, t); else {
                    var o, a = this.getData();
                    t ? a && a.each(e) : (o = e(a), a = "undefined" == typeof o ? a : o), this.setData(a)
                }
            }), this
        }, $.fn.xData = function () {
            var e = arguments;
            return 0 == e.length ? this.getData() : "function" == typeof e[0] ? this.update(e[0], e[1]) : this.setData(e[0], e[1])
        }, "object" == typeof t && "object" == typeof t.exports && (t.exports = function () {
            var e = {}, t = Object.create(null), n = Object.create(null), o = i(e);
            return e.extending({
                get: function (e) {
                    if (e in n) {
                        var i = n[e], o = $(i).eq(0);
                        t[e] = c.call(o)
                    }
                    return t[e]
                }, check: function (t, i, o) {
                    var a = n[t];
                    return a && $(a).each(function (e, t) {
                        d.apply(t, [i, o])
                    }), e
                }, set: function (n, i, o) {
                    return t[n] = i, o !== !1 && e.check(n, i, o), g(n, i, e), e
                }, scan: function (t, n) {
                    var i = $(t).find("[{0}]".format(a));
                    if (i.each(function (t, n) {
                            var i = $(n), o = i.attr(a);
                            o && e.bind(o, i)
                        }), i.removeAttr(a), n) {
                        var o = $(t).find("[{0}]".format(r));
                        o.each(function (t, n) {
                            var i = $(n), o = i.attr(r);
                            e.binding(o, i)
                        }), o.removeAttr(r)
                    }
                }, scanEx: function (t, n) {
                    var t = t || document, i = $(t).find("[x-tp],[x-list],[x-map],[x-form],[x-table]");
                    i.each(function (t, n) {
                        var i = $(n).filter(":not(.x-bind-done)"), o = i.attr("x-tp") || i.attr("x-list") || i.attr("x-map") || i.attr("x-form") || i.attr("x-table");
                        o && i.addClass("x-bind-done") && console.log(e.bind(o, i))
                    })
                }, binding: function (t, i, o, a) {
                    if (!t)return !1;
                    var r = "_shadow_" + t;
                    n[r] || Object.defineProperty(e, t, {
                        set: function (n) {
                            e.set(r, n), g(t, n, e)
                        }, get: function () {
                            return e.get(r)
                        }, enumerable: !0, configurable: !1
                    });
                    var s = e.bind(r, i, !1, o, a);
                    return s
                }, bind: function (i, a, r, s, l) {
                    "boolean" != typeof arguments[2] && (s = arguments[2], l = arguments[3]);
                    var d;
                    r ? (d = i, i = (new Date).getTime(), t[i] = d) : d = t[i], n[i] = $(n[i]).add(a), $(a).data("helper", s).data("allow-html", l), i in t && e.set(i, d);
                    var c = new o(i, a, s, l, (!0));
                    return c
                }, unbind: function (t, i) {
                    return null === t || "" === t ? i && $(i).each(function (n, i) {
                        var o = $(i);
                        t = o.attr(a), t && e.unbind(t, o)
                    }) : i ? n[t] && (n[t] = n[t].not(i)) : n[t] = null, e
                }, update: function (n, i, o) {
                    var a, r = t[n];
                    return i = $lambda(i), n in t && (1 == arguments.length ? a = r : "function" != typeof i ? a = r : o && Array.isArray(r) ? (r.each(i), a = r) : (a = i(r), a = "undefined" == typeof a ? r : a), e.set(n, a, !0)), a
                }, isScope: !0
            }, !0), e
        })
    }, {"./injector-extractor": 11}], 25: [function (e, t, n) {
        $.extend($.fn.validatebox.defaults.rules, {
            ip: {
                validator: function (e) {
                    return /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/.test(e)
                }, message: "请输入正确的IP地址"
            }, contact: {
                validator: function (e) {
                    return /^1\d{10}$|^0\d{2,3}-?\d{7,8}$/.test(e)
                }, message: "请输入正确的固定电话或手机号码"
            }, port: {
                validator: function (e) {
                    return /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(e)
                }, message: "端口号必须在1-65535之间"
            }, noChinese: {
                validator: function (e) {
                    return !/^[\u0391-\uFFE5]+$/.test(e)
                }, message: "账号密码不能包含中文"
            }, extLength: {
                validator: function (e, t) {
                    e = e.trim();
                    var n = /[\u0391-\uFFE5]+/gm, i = /[^\u0391-\uFFE5]+/gm, o = e.match(n), a = e.match(i), r = (o ? 2 * o.join("").length : 0) + (a ? a.join("").length : 0);
                    return t[2] = Math.ceil((r - t[1]) / 2), r >= t[0] && r <= t[1]
                }, message: "已超出{2}字"
            }, longitude: {
                validator: function (e) {
                    var t = parseFloat(e);
                    return /^-?\d\d?\d?(\.\d\d?\d?\d?)?$/.test(e) && t <= 180 && t >= -180
                }, message: "请输入-180到180之间的数字，可包括四位小数"
            }, latitude: {
                validator: function (e) {
                    var t = parseFloat(e);
                    return /^-?\d\d?(\.\d\d?\d?\d?)?$/.test(e) && t <= 90 && t >= -90
                }, message: "请输入-90到90之间的数字，可包括四位小数"
            }, isChineseID: {
                validator: function (e) {
                    var t = "11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91", n = 0, i = e.length, o = "", a = 0;
                    if (!/^\d{17}(\d|x)$/i.test(e) && !/^\d{15}$/i.test(e))return !1;
                    e = e.replace(/x$/i, "a");
                    var r = e.substr(0, 2);
                    if (!(t.indexOf(r) > 0))return !1;
                    if (18 == i) {
                        if (o = e.substr(6, 4) + "-" + Number(e.substr(10, 2)) + "-" + Number(e.substr(12, 2)), a = new Date(o.replace(/-/g, "/")), o != a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate())return !1;
                        for (var s = 17; s >= 0; s--)n += Math.pow(2, s) % 11 * parseInt(e.charAt(17 - s), 11);
                        if (n % 11 != 1)return !1
                    } else if (15 == i) {
                        o = "19" + e.substr(6, 2) + "-" + Number(e.substr(8, 2)) + "-" + Number(e.substr(10, 2)), a = new Date(o.replace(/-/g, "/"));
                        var l = a.getFullYear().toString() + "-" + (a.getMonth() + 1) + "-" + a.getDate();
                        if (o != l)return !1
                    }
                    return !0
                }, message: "请输入正确的身份证号"
            }
        })
    }, {}], 26: [function (e, t, n) {
        t.exports = {
            $open: function (e, t, n, i) {
                var o, a, r = document.body, s = {}, l = {}, d = top.byid("root-menu") || {}, c = function (e) {
                    var t = e.closest(".window"), n = t.children(".epanel-header"), i = e.children(".win-fix-bar");
                    if (t.addClass("hidden"), l = {maxHeight: a}, s = {
                            maxHeight: a,
                            overflowY: "auto"
                        }, l.maxHeight = l.maxHeight - 5, s.maxHeight = s.maxHeight - 5, n.length) {
                        var o = getRect(n[0]).height;
                        s.maxHeight = s.maxHeight - o
                    }
                    if (i.length) {
                        var r = getRect(i[0]).height;
                        s.maxHeight = s.maxHeight - r, l.paddingBottom = r
                    }
                    t.css(l), e.css(s), t.removeClass("hidden"), e.on("click", ".cm-cancel-btn,.win-close-btn", function () {
                        $(this).closest(".window-body").$close()
                    })
                }, u = function (e) {
                    "max" == t.width ? t.width = e.width - 20 : "full" == t.width && (t.width = e.width), "max" == t.height ? (t.height = e.height - 20, t.top = 10) : "full" == t.height || parseInt(t.height) > e.height ? (t.height = e.height, t.top = 0) : t.top = t.top || Math.min((e.height - ~~t.height) / 2, e == top ? 60 : 0), a = e.height - t.top
                };
                if ("string" == typeof t)return window.$append.apply(this, [].slice.call(arguments));
                "maximizable"in t || (t.maximizable = !1), "minimizable"in t || (t.minimizable = !1), "collapsible"in t || (t.collapsible = !1), "resizable"in t || (t._resizable = !1), "scroll"in t || (t.scroll = !0), "modal"in t || (t.modal = !0), "cache"in t || (t.cache = !1), "doSize"in t || (t.doSize = !0), "shadow"in t || (t.shadow = !1), "title"in t || (t.title = " "), "height"in t || (t.height = "auto"), "mask"in t || (t.mask = "global"), "style"in t || (t.style = {}), "center"in t || (t.center = "global");
                var f = t.onClose || window.voidFn;
                if (window != top) {
                    var p = top.$("#admin-design-main"), h = top.$("#main-wrap"), m = $(r).children(".body-agent")[0] || $(r).children(":first-child")[0];
                    if (window._cancelGlobalReFixTbTime = (new Date).getTime(), p.hasClass("full-win-mode") ? t.mode = "full-win" : p.hasClass("help-mask-mode") ? t.mode = "help-mask" : t.mode = t.mode || "trans-agent", p.addClass(t.mode + "-mode"), "help-mask" == t.mode) {
                        u(window);
                        var g = r.scrollTop, b = function () {
                            r.scrollTop = g
                        };
                        $(window).on("scroll", b), t.onClose = function () {
                            0 == $(r).children(".window-mask:visible").length && ($(window).off("scroll", b), p.removeClass("trans-agent-mode help-mask-mode full-win-mode")), f(o)
                        };
                        var v = getRect(d).width, x = window.innerWidth - parseInt(t.width), w = t.width ? x / -2 : -(1 / 0), y = Math.max(v / -2, x < v ? 0 : Math.min(w, 0));
                        "margin-left"in t.style || (t.style["margin-left"] = y)
                    } else if ("full-win" == t.mode)u(top), h.addClass("full-wrap"), t.top = t.top || 50, t.onClose = function () {
                        p.removeClass("trans-agent-mode help-mask-mode full-win-mode"), h.removeClass("full-wrap"), $(r).removeClass("overflowHidden").removeClass("holdScrollWidth"), f(o)
                    }; else {
                        u(top);
                        var _ = r.scrollTop, C = r.scrollLeft;
                        $(r).addClass(top.$("body").hasClass("sb-l-m") ? "in-sb-l-m-full-wrap" : "in-full-wrap"), h.addClass("full-wrap mock-agent"), m.scrollTop = _, $("[refix]").each(function () {
                            var e = $(this), t = e.attr("refix");
                            t = t || "y", "x" == t && (t = "refix-x"), "y" == t && (t = "refix-y"), "x,y" == t && (t = "refix-x refix-y"), e.attr("refix", t), e.addClass(t)
                        }), t.onClose = function () {
                            0 == $(r).children(".window.animated").length && (p.removeClass("trans-agent-mode help-mask-mode full-win-mode"), h.removeClass("full-wrap"), $(r).removeClass("in-full-wrap in-sb-l-m-full-wrap"), r.scrollTop = _, r.scrollLeft = C, $("[refix]").each(function () {
                                var e = $(this), t = e.attr("refix");
                                e.removeClass(t)
                            })), f(o)
                        }
                    }
                }
                if (o = arguments[0].jquery ? arguments[0] : null, o || 0 == e.indexOf("#"))o = $(e).addClass("e-win-wrap"), o.show().window(t).window("hcenter").parent().addClass("animated fadeInDown").end(), c(o); else if (n)o = $('<div class="e-win-wrap" dynamic>').css({overflow: t.scroll ? "auto" : "hidden"}), window.$cache(e) ? (o.window(t).css(l).html(window.$cache(e)).parent().addClass("animated fadeInDown").css(s).end(), setTimeout(function () {
                    i && i()
                }, 0), c(o)) : o.window(t).css(l).load(getViewPath(e), function (t) {
                    window.$cache(e, t), i && i(), c(o)
                }).parent().addClass("animated fadeInDown").css(s).end(); else {
                    e = getViewPath(e);
                    var k = "" + Date.format("MMDDhhmmssS");
                    o = $('<div class="e-win-wrap overhide" dynamic win-id="{1}"><iframe scrolling="{0}" win-id="{1}"></iframe></div>'.format(t.scroll ? "auto" : "no", k)), top._mol_wins[k] = o.window(t).css(l).find("iframe").attr("src", e).end().parent().addClass("animated fadeInDown").css(s).end()
                }
                return o.data("open-params", t), o
            }
        }
    }, {}], 27: [function (e, t, n) {
        var i = "custom-col-hide", o = [].slice, a = function (e) {
            return e.hasClass("need-fix") || e.hasClass("need-fix-end")
        }, r = function (e, t) {
            if (window._cancelGlobalReFixTbTime = (new Date).getTime(), !e.length)return !1;
            var n = $(e[0].parentNode), i = o.call(e).orderby('o => +o.getAttribute("sort-index")');
            window._cancelGlobalReFixTbTime = (new Date).getTime(), e.remove(), i.each(function (e) {
                n.append(e)
            })
        }, s = function (e, t) {
            var n, o, a = e.children("thead").children("tr"), s = a.children("th");
            window._cancelGlobalReFixTbTime = (new Date).getTime(), e.hide(), e.find(" >thead>tr>th , >tbody>tr>td ").each(function () {
                this.hasAttribute("native-index") || this.setAttribute("native-index", $(this).index())
            }), n = s.toArray().orderby('th => +th.getAttribute("native-index")'), n.each(function (n, a) {
                var r = $(n), s = r.text(), l = t.where('o => o.cn=="{0}"'.format(s))[0], d = 0 == l.custom ? "addClass" : "removeClass", c = l.sortIndex;
                o = e.find(">tbody>tr>td").filter('[native-index="{0}"]'.format(a)), r.add(o)[d](i).attr("sort-index", c)
            }), r(s, !0), e.find(">tbody>tr").each(function (e, t) {
                var n = $(t).children("td");
                r(n)
            }), e.show();
            var l = e.attr("fixed-mode");
            l && e.fixTable(l)
        }, l = '<div class="custom-tool"><i class="fa icon-cogs" title="自定义列"></i></div>', d = '<div id="{0}" class="custom-setting-modal"><ul class="custom-col-options">{1}</ul><div class="btn-bar"><b class="cm-save-btn"></b><b class="cm-cancel-btn"></b></div></div>', c = '<li class="{2}"><input type="checkbox" id="{1}"/><label for="{1}"></label><u>{0}</u><label for="{1}" class="custom-col-switch" data-on="显示" data-off="隐藏"></label></li>';
        $.fn.customCol = function (e) {
            if (!this.children().length)return this;
            if (this.hasClass("no-custom"))return this;
            e = e || "custom";
            var t = this, n = t.closest(".query-result"), i = "cs-" + (window.iframe ? window.iframe.getAttribute("page-no") : $(".spa-view")[0] || {}.id) + (t.prop("id") || "table"), r = t.children("thead"), u = r.children("tr").children("th"), f = localData.get(i);
            if (!i || !t.is("table"))return this;
            if (f)if (f.length != u.length)f = null; else {
                f = f.orderby("r => r.cn");
                var p = o.call(u).orderby("th => $(th).text()"), h = "列名改变? {0},  自定义项改变?{1} , 自定义固定列改变?{2}", m = f.some(function (t, n) {
                    var i = t.cn != $(p[n]).text(), o = null == t.custom && p[n].hasAttribute(e), r = null != t.custom && !p[n].hasAttribute(e), s = t.needFix != (a($(p[n])) ? "fixed-item" : "");
                    return h = h.format(i, o || r, s), i || o || r || s
                });
                m && console.info(["custom表格结构变化,更新custom设置...", h, t.prop("id"), t]), m && (f = null)
            }
            if (f || (f = [], u.each(function (t, n) {
                    var i = $(n);
                    f[t] = {
                        cn: i.text(),
                        custom: this.hasAttribute(e) ? "false" === this.getAttribute("cs-init") ? 0 : 1 : null,
                        nativeIndex: t,
                        needFix: a(i) ? "fixed-item" : "",
                        sortIndex: this.getAttribute("sort-index") || t
                    }, n.setAttribute("sort-index", f[t].sortIndex)
                }), localData.set(i, f)), s(t, f), !n.hasClass("has-custom-btn")) {
                var g = $(l);
                g.appendTo(n.addClass("has-custom-btn")), g.on("click", function () {
                    var e = "", o = localData.get(i);
                    o = o.orderby("r => +r.sortIndex"), o.each(function (t, n) {
                        e += c.format(t.cn, i + "-" + n, t.needFix)
                    });
                    var a = "temp-" + (new Date).getTime(), r = $(d.format(a, e));
                    r.hide().appendTo(n), window.$open("#" + a, {
                        width: 350,
                        title: "自定义列"
                    }).focus(), r.find(":checkbox").each(function (e, t) {
                        t.checked = 0 != o[e].custom, t.disabled = null == o[e].custom
                    }), r.on("click", ".cm-save-btn", function () {
                        r.find("li").each(function (e) {
                            var t, n = $(this), i = n.find(":checkbox")[0];
                            i.disabled || (t = i.checked ? 1 : 0), o[e] = {
                                cn: n.children("u").text(),
                                custom: t,
                                needFix: n.hasClass("fixed-item") ? "fixed-item" : "",
                                sortIndex: e
                            }
                        }), localData.set(i, o), s(t, o), r.$close().remove()
                    }).on("click", ".cm-cancel-btn", function () {
                        window._cancelGlobalReFixTbTime = (new Date).getTime(), r.$close().remove()
                    }).on("click", "li", function (e) {
                        $(e.target).is("input,label") || $(this).find("input")[0].click()
                    }), importing("jui", function () {
                        r.children(".custom-col-options").sortable({
                            cancel: "li:first-child,li:last-child,.fixed-item",
                            cursor: "move",
                            items: "li:not(:first-child,:last-child,.fixed-item)",
                            axis: "y"
                        }).on("sortstart", function (e, t) {
                        }).disableSelection()
                    })
                })
            }
            return this
        }, $(function () {
            config.autoCustomCol && $('.query-result table:has("tbody"):not("[x-table]")').eq(0).customCol("cs")
        })
    }, {}], 28: [function (e, t, n) {
        window.extending("$filter", function (e, t, n) {
            n ? n.prototype.extending(e, t) : (String.prototype.extending(e, t), Number.prototype.extending(e, t), Boolean.prototype.extending(e, t))
        })
    }, {}], 29: [function (e, t, n) {
        window.$.fn.fixTable = function (e, t) {
            var n = this, i = n.closest(".query-result"), o = n.children("thead").find("th.need-fix").length > 0, a = n.children("thead").find("th.need-fix-end").length > 0, r = n.children("thead.need-fix").length > 0;
            return n.is(":empty") ? (n.closest(".all-fix-wrap").replaceWith(n), n.wrap('<div class="native-fix-wrap">').parent().wrap('<div class="all-fix-wrap">'), n) : !n[0] || n.hasClass("no-fix") || "all" == e && !(o || r || a) || "col" == e && !o && !a || "head" == e && !r ? (n.closest(".query-result").children(":not(.new-color-bar)").add(n).css("visibility", "visible"), n.closest(".query-result").children(".all-fix-wrap").find(".head-fix-wrap>table, table.cross-fix-cols-head, .col-fix-wrap>table").css("visibility", "visible"), n) : (n.hasClass("no-fix-head") ? "all" == e && "all" == e && (e = "col") : n.hasClass("no-fix-col") && "all" == e && (e = "head"), i.addClass("changing"), setTimeout(function () {
                n.closest(".all-fix-wrap").replaceWith(n);
                var s, l, d, c, u, f = getRect(n[0]).width, p = (getRect(n[0]).height, getRect(n.parent()[0]).width), h = (getRect(n.parent()[0]).height, f > p), m = n.attr("wrap-height"), g = n.children("thead").children("tr").length > 1;
                if (h)"head" == e && (e = "all"); else {
                    if ("col" == e)return n.closest(".query-result").removeClass("changing"), n;
                    "all" == e && (e = "head")
                }
                if (n.wrap('<div class="native-fix-wrap">').parent().wrap('<div class="all-fix-wrap">'), s = n.closest(".all-fix-wrap"), l = n.closest(".native-fix-wrap"), !g && n.children("thead").find("th").each(function (e, t) {
                        n.children("tbody").children("tr").each(function (n, i) {
                            var o = $(i).children("td").eq(e);
                            $(t).hasClass("need-fix") && o.addClass("need-fix"), $(t).hasClass("need-fix-end") && o.addClass("need-fix-end")
                        })
                    }), n.on("refitFix", function () {
                        d && d.add(u).children("tbody").children("tr").each(function (e, t) {
                            $(this).children("td").height(0);
                            var i = n.children("tbody").children("tr").eq(e);
                            i[0] && $(this).height(getComputedStyle(i[0]).height)
                        }), u && u.children("tbody").children("tr").each(function (e, t) {
                            $(this).children("td").height(0);
                            var i = n.children("tbody").children("tr").eq(e);
                            i[0] && $(this).height(getComputedStyle(i[0]).height)
                        })
                    }), $(window).resize(function () {
                        setTimeout(function () {
                            n.trigger("refitFix")
                        }, 120)
                    }), ("col" == e || "all" == e) && o) {
                    d = $(n.clone(!0)).width("auto"), d.prop("id", "").children("thead,tbody").prop("id", "");
                    var b = n.children("thead,tbody").children("tr"), v = d.children("thead,tbody").children("tr");
                    v.each(function (e, t) {
                        var n = b.eq(e);
                        $(t).children().each(function (t, i) {
                            var o = $(i);
                            if (o.hasClass("need-fix")) {
                                var a = n.children().eq(t);
                                o.width(getComputedStyle(a[0]).width), o.height(getComputedStyle(a[0]).height), n.hover(function () {
                                    o.addClass("hover-like")
                                }, function () {
                                    o.removeClass("hover-like")
                                }), o.hover(function () {
                                    s.find(">.col-end-fix-wrap>table>tbody>tr").eq(e - 1).add(n).addClass("hover-like")
                                }, function () {
                                    s.find(">.col-end-fix-wrap>table>tbody>tr").eq(e - 1).add(n).removeClass("hover-like")
                                })
                            } else o.remove()
                        })
                    }), d.wrap('<div class="col-fix-wrap">'), d.parent().appendTo(s)
                }
                if ("col" != e && "all" != e || !a || (u = $(n.clone(!0)).width("auto"), u[0].id = "", u.children("thead,tbody").each(function () {
                        this.id = ""
                    }), u.children("thead,tbody").children("tr").each(function (e, t) {
                        var i = n.children("thead,tbody").children("tr").eq(e);
                        $(this).children("th,td").each(function (e) {
                            var t = $(this);
                            if (t.hasClass("need-fix-end")) {
                                var n = i.children("th,td").eq(e);
                                t.width(getComputedStyle(n[0]).width), t.height(getComputedStyle(n[0]).height), i.hover(function () {
                                    t.addClass("hover-like")
                                }, function () {
                                    t.removeClass("hover-like")
                                }), t.hover(function () {
                                    i.addClass("hover-like")
                                }, function () {
                                    i.removeClass("hover-like")
                                })
                            } else t.remove()
                        })
                    }), u.wrap('<div class="col-end-fix-wrap">'), u.parent().appendTo(s)), ("head" == e || "all" == e) && r) {
                    if (c = $(n.clone(!0)).width("auto"), isNaN(m) && (m = window.innerHeight - getRect(n[0]).top - parseInt(getComputedStyle(document.body).paddingBottom) - parseInt(getComputedStyle(s.parent()[0] || s[0]).marginBottom) - (s.next().length ? getRect(s.next()[0]).height : 0) - 3), m = m > 300 ? m : window.height - 100, l.css({
                            "max-height": +m,
                            "min-height": 20
                        }), s.children(".col-fix-wrap,.col-end-fix-wrap").height(l[0].clientHeight), c[0].id = "", c.children("thead,tbody").each(function () {
                            this.id = ""
                        }), c.children(":not(thead)").remove(), c.children("thead").children("tr").each(function (e) {
                            var t = n.children("thead").children("tr").eq(e);
                            $(this).children("th").each(function (e) {
                                var n = $(this), i = t.children("th,td").eq(e), o = getComputedStyle(i[0]);
                                n.width(o.width), n.height(o.height)
                            })
                        }), o) {
                        var x = c.clone(!0).addClass("cross-fix-cols-head");
                        x[0].id = "", x.children("thead").children("tr").children("th:not(.need-fix)").remove(), x.appendTo(s)
                    }
                    if (a) {
                        var w = c.clone(!0).addClass("cross-fix-cols-head-end");
                        w[0].id = "", w.children("thead").children("tr").children("th:not(.need-fix-end)").remove();
                        var y = l[0].offsetWidth - l[0].clientWidth;
                        w.appendTo(s), u && u.parent().css({zIndex: 1, right: y}), w.css({zIndex: 1, right: y})
                    }
                    var _ = window.hasScroll(l[0], "y");
                    getComputedStyle(s[0]).width;
                    c.width(getComputedStyle(n[0]).width).wrap('<div class="head-fix-wrap">'), c.parent().css({
                        width: l.width() - y,
                        paddingRight: _,
                        minWidth: "auto",
                        background: "transparent"
                    }).appendTo(s);
                    var C = parseInt(getComputedStyle(c[0]).width), f = parseInt(getComputedStyle(n[0]).width), k = f - C;
                    k > 0 && k == _ && c.parent().css({paddingRight: 0});
                    var T = getRect(c.find("th")[0]).width, j = getRect(n.children("thead").find("th")[0]).width;
                    if (Math.abs(T - j)) {
                        console.info([T, j]);
                        var D = $(".native-fix-wrap>table>thead"), F = $(".head-fix-wrap>table>thead");
                        F.replaceWith(D.clone())
                    }
                }
                var O = $(d).add(u), S = s ? s.height() : "";
                "head" == e && c && l.scroll(function () {
                    c.css("right", this.scrollLeft)
                }) && $(x).add(w).remove(), "col" == e && O.length && l.scroll(function () {
                    O.css("bottom", this.scrollTop)
                }), "all" == e && (c || O.length) && l.scroll(function () {
                    c && c.css("right", this.scrollLeft), O.length && O.css("bottom", this.scrollTop)
                }), n.children("tbody").children().length || s.height(S + 1), n.attr("fixed-mode", e), e && !n[0].hasAttribute("resize-reg") && $(window).resize(function () {
                    var e = +n.attr("resize-reg"), t = (new Date).getTime(), o = t - window._cancelGlobalReFixTbTime || t - 9;
                    if (o < 300 || 9 == o)return log("global resize-reg cancel before ...."), !1;
                    e = e || t - 9;
                    var a = t - e;
                    if (a > 300 || 9 == a) {
                        var r = n.find(">tbody>tr:first>td"), s = !1;
                        i.find(">.all-fix-wrap>.head-fix-wrap>table>thead").children("tr").each(function () {
                            var e = $(this), t = e.children("th");
                            return t.length == r.length && void t.each(function (e, t) {
                                    if (s)return !1;
                                    var n = getRect(t).width, i = getRect(r[e]).width;
                                    Math.abs(parseFloat(n - i)) && (s = !0)
                                })
                        }), s && (i.animate({opacity: 0}, 60), n.attr("resize-reg", (new Date).getTime()), setTimeout(function () {
                            n.fixTable(n.attr("fixed-mode"), function () {
                                setTimeout(function () {
                                    i.animate({opacity: 1}, 80)
                                }, 90)
                            })
                        }, 90), info("window resize before {0}ms, {1}".format(a, " reFixed table:{0}".format(n.prop("id")))))
                    } else log("just resize...")
                }), n.attr("resize-reg", ""), i.removeClass("changing"), "function" == typeof t && t(s)
            }, 50), n)
        }
    }, {}], 30: [function (e, t, n) {
        function i(e, t) {
            var n = {"<": "&lt;", ">": "&gt;", '"': "&quot", "'": "‘", ":": "：", "{": "&#123;", "}": "&#125;"};
            return null == e || "null" == e || "NULL" == e || 0 === e || e === !1 ? "" : (e = t ? String(e).replace(/\<\/?script[^\>]*\>/gim, function (e) {
                return e.replace(/\<|\>/gm, function (e) {
                    return n[e]
                })
            }) : String(e).replace(/\<|\>/gm, function (e) {
                return n[e]
            }), i.tranSymbol ? e.replace(/\"\'\{\}\:/gm, function (e) {
                return n[e]
            }) : e)
        }

        function o(e, t, n, o) {
            for (var a = t, r = e.split("."), s = this, l = 0; l < r.length; l++) {
                if (0 == l) {
                    if ("this" == r[l]) {
                        a = s;
                        continue
                    }
                    if ("undefined" != typeof o) {
                        if ("$index" == r[l]) {
                            a = o;
                            continue
                        }
                        if ("$rownum" == r[l]) {
                            a = o + 1;
                            continue
                        }
                        if ("$nth" == r[l]) {
                            a = o % 2 == 1 ? "nth-even" : "nth-odd", o % 3 == 2 && (a += " nth-third");
                            continue
                        }
                    }
                }
                "number" == typeof a && "length" == r[l] || (a = "function" == typeof a[r[l]] ? a[r[l]].toString().indexOf("[native code]") > -1 ? a[r[l]]() : a[r[l]].apply(a, [t, o]) : a[r[l]]), null != a && "null" != a && "NULL" != a || "undefined" == typeof r[l + 1] || (a = "")
            }
            return "function" == typeof arguments[2] ? arguments[2](a) : i(a, n)
        }

        function a(e, t, n, i) {
            var a = this, s = function (e) {
                return o.apply(a, [e, t, i, n])
            };
            return e = e.replace(/&amp;&amp;/g, "&&").replace(/{{!?\w+(\.\w+)*\s?&{2}\s?#[\w\-]+}}|{{!?\w+(\.\w+)*\s?&{2}\s?#[^#].+}}|{{\w+(\.\w+)*\s?:?\s?#[\w\-]+}}|{{\w*\s?:?\s?#[^#].+#}}|{{!?[A-z]+(\.\w+)*\s?&{2}\s?\n[^\xdd]+\n\s*}}/g, function (e) {
                e = e.replace(/^{{|}}$/g, "");
                var n = e.indexOf("\n"), o = e.indexOf("#");
                if (n > -1 && o > -1 && n < o || n > -1 && o == -1) {
                    var l = e.lastIndexOf("\n");
                    e = e.replace(/\n/, "#"), e = e.slice(0, l) + "#" + e.slice(l + 1)
                }
                e = e.trim();
                var d, c, u, f, p = e.indexOf(":"), h = e.indexOf("&&");
                if (p == -1 && h == -1)return $(e).html() || "object" == typeof console && console.error("can`t find the inlaid template: " + id) || "";
                u = e.indexOf(":") > 0 && e.indexOf(":") < e.indexOf("#") ? 1 : 2, d = 1 == u ? e.slice(0, p).trim() : e.slice(0, h).trim(), f = 1 == u ? p : h;
                var m = e.slice(f + u).trim();
                return c = e.lastIndexOf("#") == e.length - 1 ? m.slice(1, -1) : 0 == m.indexOf("#") ? $(m).html() : m.slice(1, -1), 1 === u ? s(d) ? r.apply(a, [c, t[d], function (e) {
                    return "object" == typeof e && !e.$super && e.extending("$super", t), !1
                }, i]) : "" : 0 == d.indexOf("!") ? s(d.slice(1)) ? "" : r.apply(a, [c, t, i]) : s(d) ? r.apply(a, [c, t, i]) : ""
            }), e = e.replace(/{\$?[A-z]+(\.?\w+)*}/gm, function (e) {
                return e = e.slice(1, -1), s(e)
            })
        }

        function r(e, t, n, i) {
            var o, r, s = this, l = typeOf(t);
            if (null == t || "array" == l && 0 == t.length)return "";
            if ("object" == typeof t && 0 == Object.keys(t).length)return "";
            if (t = "array" == l ? t : [t], "boolean" == typeof n ? o = n : (r = n, o = i), "string" == typeof e && "#" == e[0] && (e = $(e).html()), !e)throw new Error("source undefined! please checkout the template source,id or url!");
            for (var d = 0, c = t.length, u = []; d < c; d++)"function" == typeof r && !t[d]._xtp_helper_done_ && r(t[d], d) && t[d].extending({_xtp_helper_done_: !0}), u.push(a.apply(s, [e, t[d], d, o]));
            return u.join("")
        }

        var s = '<option value="{val}" selected="{selected}">{txt}</option>', l = function (e) {
            var t = $cache();
            return function (n, i, o, a, l) {
                var d = arguments, c = e(n), u = "";
                if ("string" != typeof i) {
                    u = c.attr("tpsource") || "";
                    var f = c.attr("id") || "", p = c.selector || "", h = c.attr("tpcache") || c.attr("tpcache", e.random()).attr("tpcache");
                    if (!u && f && byid(f + "-tp") && (u = "#{0}-tp".format(f)), u = u || (f ? "#" + f : p), u = u || (h ? "[tpcache={0}]".format(h) : ""), !u)throw new Error("The template tpsource was not found! check the container selector or id or attr:tpcache")
                }
                var m = function () {
                    var n, s, l = typeOf(i);
                    return 1 == d.length ? c.html(t[u]) : ("string" == l ? (c.html(i), s = 5 == d.length ? d[4] : i) : c.is("[x-map]") ? (c.inject(i), s = i) : (s = i, c.html(r.apply(this, [t[u], i, o, a])).removeClass("xtp-hide").addClass("xtp-done")), c.is("tbody") ? c.parent("table").customCol("cs").fixTable("all") : c.is("table") && c.customCol("cs").fixTable("all"), c.hasClass("has-checkbox") && c.find("[checked]").each(function () {
                        this.checked = this.checked || "true" == String(e(this).attr("checked"))
                    }), c.data("current-data", s), c.is("table") ? (n = c.find(">tbody>tr"), "array" == l ? s = i : i.tbodyDataKey && (s = i[i.tbodyDataKey])) : "array" == l && (n = c.children(), s = i), n && s && n.each(function (t) {
                        e(this).data("current-data", s[t])
                    }), c.find("[xtp-behavior]").behavior())
                };
                if (c.is("select"))t[u] = s, m.call(this); else if (t[u])m.call(this); else if (u.indexOf(".htm") > 0)e.get(u, function (e) {
                    t[u] = e, m.call(this)
                }); else {
                    var g = e(u).eq(0);
                    g.is("table") || g.is("tbody") || g.is("thead") || g.is("[x-list]") || g.is("[x-tp]") ? t[u] = g.html().trim().replace(/^\<\!\-\-/, "").replace(/\-\-\>$/, "") : t[u] = g.html(), m.call(this)
                }
                return c
            }
        }(window.jQuery);
        window.$.fn.template = function (e, t, n) {
            var i = arguments;
            return this.each(function () {
                l.apply($(this).data("fix-data") || window, [this].concat([].slice.call(i)))
            })
        }, window.$.fn.fixData = window.$.fn.thisData = function (e) {
            return 0 == arguments.length ? this.data("fix-data") : this.each(function () {
                $(this).data("fix-data", e)
            })
        }, window.$.fn.tpsource = function (e) {
            return 0 == arguments.length ? this[0].getAttribute("tpsource") : this.each(function () {
                $(this).attr("tpsource", "function" == typeof e ? e($(this)) : e)
            })
        }, e("./xtp.filter"), e("./xtp.table"), e("./xtp.fixtable"), e("./xtp.customcols");
        var d = {$encode: i, $compile: r, $template: l};
        String.prototype.extending("valueAt", function (e, t, n) {
            return o(this.valueOf(), e, t, n)
        }), "object" == typeof t && "object" == typeof t.exports && (t.exports = d)
    }, {"./xtp.customcols": 27, "./xtp.filter": 28, "./xtp.fixtable": 29, "./xtp.table": 31}], 31: [function (e, t, n) {
        $.fn.table = function (e) {
            var t = this;
            if ("array" == typeOf(arguments[0])) {
                var n = t.data("table-config");
                return "object" == typeof n ? (n.data = arguments[0], t.table(n)) : t
            }
            var i = e.cols, o = e.data, a = e.helper, r = e.allowHTML !== !1;
            if (!t.length || !i.length)return t;
            if (e && !e.hasOwnProperty("data"))return t.data("table-config", e).attr("x-table", "");
            if (!o || !o.length)return t.template(o, a, r);
            var s = i.length, l = '<th class="xtp-{0}-th-{1} {2} {3}" {4} {6} {8}>{7}{5}</th>', d = '<td class="xtp-{0}-td-{1} {2} {3} {6}" rowspan="{7}">{5}{{4}}</td>';
            if ("string" == typeof i[0] && (i = i.select("r => {title:r,map:r}")), i.any("o => o.rowspan")) {
                var c;
                o.where("o => o.rowspan").each(function (e, t) {
                    c || (c = e.rownum || e.rowNum || t + 1), e.extending("$rowspanNum", c + t)
                })
            }
            if (e.fixCols) {
                var u = e.fixCols.left, f = e.fixCols.right;
                u && i.slice(0, u).each('o => o.fix="left",o.custom=false'), f && i.slice(s - f).each('o => o.fix="right",o.custom=false')
            }
            var p = "<tr>", h = "<tr>", m = "", g = "";
            i.each(function (n, i) {
                n.hide || ("rownum" == n.map.lower().replace("$", "") && (n.cls = "tleft " + n.cls), m = l.format(t[0].id || "", n.map.split(".")[0], n.fix ? "left" == n.fix ? "need-fix" : "need-fix-end" : "", n.cls || "", n.sort ? 'sort-name="{0}"'.format(n.sort) : "", n.title, n.custom !== !1 ? "string" == typeof n.custom ? n.custom : "cs" : "", e.check && 0 == i ? '<input type="checkbox" class="xtp-check-tr-all"/>' : "", n.customInit === !1 ? 'cs-init="false"' : ""), g = d.format(t[0].id || "", n.map.split(".")[0], n.fix ? "left" == n.fix ? "need-fix" : "need-fix-end" : "", n.cls || "", (n.key || n.map) + (n.filter ? "." + n.filter : ""), e.check && 0 == i ? '<input type="checkbox" class="xtp-check-tr" tr-param="{{0}}" tr-index="{$index.toString}" tr-rownum="{{1}}" xtp-checked="{_trChecked}"/>'.format("string" == typeof e.check ? e.check : "", n.map) : "", n.rowspan ? "hideplus{rowspan}" : "", n.rowspan ? "{rowspan}" : ""), p += m, h += g)
            }), p += "</tr>", h += "</tr>";
            var b, v = '<thead class="{0}">{1}</thead><tbody>{2}</tbody>'.format(e.fixHead !== !1 ? "need-fix" : "", p, $compile(h, o, a, r));
            if (!t.is("table"))throw new Error("the element is not a table!");
            b = t.attr("x-table", "").addClass("typical-tb " + (e.cls || "")).template(v, null, null, o).data("table-config", e), b.hasClass("has-checkbox") && b.find("[xtp-checked]").each(function () {
                this.checked = $(this).attr("xtp-checked")
            });
            var x = b.closest(".query-result");
            return x.length > 0 || (x = $("body")), x.on("click", ".xtp-check-tr-all", function () {
                var e = this.checked;
                x.find(".xtp-check-tr").prop("checked", !!e), x.find('tbody:not("td>tbale>tbody")').children().each(function () {
                    $(this)[e === !1 ? "removeClass" : "addClass"]("checked")
                })
            }).on("click", ".xtp-check-tr", function () {
                var e = $(this).closest("tr").index();
                x.checkRow(e, this.checked)
            }), e.fixCols === !1 || b.fixTable("all"), e.custom === !1 ? t : t.customCol("cs")
        }
    }, {}], 32: [function (e, t, n) {
        var i = {_null_: ""}, o = function (e) {
            return $.extend(e, i)
        }, a = function (e, t) {
            return $($compile(e, t))
        };
        window.extending({_widgets_: Object.create(null)}), window._widgets_ = window._widgets_, window.$widget = window.$widget || function (e, t) {
                return window._widgets_[e] = window._widgets_[e] || t(), window.$widget
            }, window.$behavior = window.$behavior || window.$widget;
        var r = {
            behavior: function (e, t, n) {
                var i = e.trim().split(" ");
                return i.each(function (e) {
                    e = e.trim();
                    var t = window._widgets_[e];
                    if (!t)throw new Error("there is not such behavior: " + e);
                    n = n.concat(t.importing || [])
                }), n
            }, widget: function (e, t, n) {
                var i = window._widgets_[e];
                return "string" == typeof i.template && 0 != i.template.indexOf("<") && n.push(i.template), n.concat(i.importing || [])
            }, includeOrReplace: function (e, t, n) {
                return n.push(e), n.concat((t.attr("importing") || "").split(","))
            }, include: function (e, t, n) {
                return r.includeOrReplace(e, t, n)
            }, replace: function (e, t, n) {
                return r.includeOrReplace(e, t, n)
            }
        }, s = {
            behavior: function (e, t, n, i) {
                var o = e.trim().split(" ");
                return o.each(function (e) {
                    e = e.trim();
                    var o = window._widgets_[e];
                    if (!o)throw new Error("there has not behavior: " + e);
                    i.push(function () {
                        o.init.call(t, n)
                    })
                }), t
            }, widget: function (e, t, n, i) {
                var o = window._widgets_[e];
                if (!o)throw new Error("can not find the widget/behavior:" + e);
                var r = t.attr("behavior"), s = t[0].id, l = t[0].className, d = o.boot || a;
                i.push(function () {
                    var e = window.$cache(o.template) || o.template, i = d.apply(t[0], [e, n]).addClass(l).prop("id", s);
                    t.replaceWith(i), o.init.call(i, n), i.scanSubWidget(), i.behavior(r)
                })
            }, includeOrReplace: function (e, t, n, i, o) {
                o.push(function () {
                    var o, a = n.attr("behavior"), r = window.$cache(t);
                    if (!r)throw new Error("the replace/include source is undefined in cahe");
                    "replace" == e ? (o = $($compile(r, i, !0)), n.replaceWith(o)) : (n.html($compile(r, i, !0)).removeAttr("include"), o = n), o.scanSubWidget(), o.behavior(a)
                })
            }, replace: function (e, t, n, i) {
                return s.includeOrReplace("replace", e, t, n, i)
            }, include: function (e, t, n, i) {
                return s.includeOrReplace("include", e, t, n, i)
            }
        }, l = function (e, t, n) {
            var i = "string" == typeof t ? t : null, a = "function" == typeof t ? t : n, l = $.Deferred(), d = [], c = [];
            return this.each(function (t, n) {
                var a = $(n), l = o(a.data()), u = i || a.attr(e) || a.attr("xtp-" + e);
                u && (d = r[e](u, a, d), s[e](u, a, l, c)), a.removeAttr(e)
            }), window.importing.apply(window, d.concat(function () {
                c.fire(), "function" == typeof a ? a() : l.resolve()
            })), l.promise()
        };
        ["replace", "include", "behavior", "widget"].forEach(function (e) {
            $.fn[e] = function () {
                return l.apply(this, [e, arguments[0], arguments[1]])
            }
        }), $.fn.scanSubWidget = function (e) {
            var t = this;
            return t.find("[replace]").addBack().replace().done(function () {
                return t.find("[include]").addBack().include()
            }).done(function () {
                return t.find("[widget]").addBack().widget()
            }).done(function () {
                return t.find("[behavior]").addBack().behavior()
            }).done(function () {
                return "function" == typeof e && e()
            })
        }, "object" == typeof t && "object" == typeof t.exports && (t.exports = {
            reg: function (e) {
                if (window.importing._widgetRegDone)return null;
                var t = this == window ? $("body") : $(this), n = [];
                if (window._widgetElements = $(window._widgetElements).add(t.find("[widget]")).add(t.find("[replace],[include]")).add(t.find("[behavior]")), window._widgetElements.each(function (e, t) {
                        var i = $(t), o = i.attr("widget"), a = i.attr("behavior"), s = i.attr("replace"), l = i.attr("include");
                        return !i.attr("widget-reg-done") && (s || l ? n = r.includeOrReplace(s || l, i, n) : o && (n = r.widget(o, i, n)), a && (n = r.behavior(a, i, n)), void i.attr("widget-reg-done", !0))
                    }), window.importing._widgetRegDone = !0, n.where(" v => v ").length) {
                    var i = n.concat(e).distinct();
                    return function () {
                        window.importing.apply(null, i)
                    }
                }
                return null
            }, init: function () {
                var e = [], t = window._widgetElements.not("[widget-init-done]").length;
                return !(window.importing._widgetInitDone || !t) && (window._widgetElements.each(function (t, n) {
                        var i = $(n), a = o(i.data()), r = i.attr("widget"), l = i.attr("behavior"), d = i.attr("replace"), c = i.attr("include");
                        return !i.attr("widget-init-done") && (r ? s.widget(r, i, a, e) : d ? s.replace(d, i, a, e) : c ? s.include(c, i, a, e) : l && s.behavior(l, i, a, e), void i.removeAttr("widget").removeAttr("behavior").removeAttr("include").removeAttr("replace").attr("widget-init-done", !0))
                    }), window.importing._widgetInitDone = !0, void e.fire())
            }
        })
    }, {}], 33: [function (e, t, n) {
        function i(e) {
            var t = $(this), n = t.find("i.toggle-icon");
            t.on("click", function () {
                $(".query-condition-hide").slideToggle(), n.toggleClass("icon-angle-down");
                var e = n.is(".icon-angle-down") ? "展开查询条件" : "折叠查询条件";
                t.attr("title", e).find("span").html(e)
            }), "open" == e.default && $(function () {
                "展开查询条件" == t.attr("title") && t.click()
            })
        }

        function o(e) {
            var t = $(this);
            (e.selector ? t.find(e.selector) : t).on("click", function () {
                $(".query-condition-hide").slideUp()
            })
        }

        function a() {
            var e = $(this);
            e.on("click", function () {
                $(".query-condition-hide").slideDown()
            })
        }

        var r = function () {
            var e = $(this), t = e.find("u");
            e.find("input");
            e.on("x-default", function (e) {
                t.each(function (e, t) {
                    $(t).hasClass("default") && $(t).click()
                })
            }), e.on("x-select", function (e, n) {
                t.each(function (e, t) {
                    $(t).attr("val") == n && $(t).click()
                })
            })
        }, s = {
            empty: "不限",
            today: "当天",
            "3days": "近三天",
            week: "本周",
            month: "本月",
            season: "本季度",
            year: "本年"
        }, l = function (e) {
            var t = $(this), n = s[e.default];
            t.find(".date-range-picker");
            t.find(".date-select").children().click(function () {
                var e = $(this);
                e.addClass("active").siblings("u").removeClass("active");
                var t = e.text(), n = e.parent().siblings(".text-time").children("input");
                "不限" == t ? n.val("") : "当天" == t ? n.val(DTU.today + "," + DTU.today) : "近三天" == t ? n.val(DTU.threeDaysBefore + "," + DTU.today) : "本周" == t ? n.val(DTU.weekBegin + "," + DTU.weekEnd) : "本月" == t ? n.val(DTU.monthBegin + "," + DTU.monthEnd) : "本季度" == t ? n.val(DTU.seasonBegin + "," + DTU.seasonEnd) : "本年" == t && n.val(DTU.yearBegin + "," + DTU.yearEnd)
            }), parseInt(e.default) ? t.find("input").val(e.default) : t.find(".date-select").children().each(function () {
                $(this).text() == n && $(this).click()
            }), r.call(this)
        };
        window.$widget("date-options", function () {
            return {template: "_temp/date-options.htm", importing: ["daterangepicker", "currentDate"], init: l}
        }), window.$widget("date-options2", function () {
            return {template: "_temp/date-options2.htm", importing: ["daterangepicker", "currentDate"], init: l}
        }), window.$widget("inline-select", function () {
            return {
                template: '<div class="inline-select-wrap  x-select "><span class="qc-label-m {labelcls} hideplus{label.length}">{label}：</span><span class="inline-select option"></span><input name="{name}" x-name="{name}" type="hidden"></div>',
                init: function (e) {
                    var t = $(this), n = t.children(".inline-select"), i = t.children("input"), o = '&nbsp;<u class="{selected.asActive} {default} " val="{val}">{txt}</u>', a = e.default, s = e.ops.split(","), l = s.select('o => { txt:o.split(":")[0].trim(), val:o.split(":")[1].trim() }');
                    if ("undefined" != typeof a) {
                        var d = l.where("o => o.val==this", a);
                        d[0] && (d[0].selected = 1) && (d[0].default = "default"), i.val(a)
                    }
                    n.html(window.$compile(o, l));
                    var c = n.children("u");
                    c.on("click", function () {
                        c.removeClass("active"), $(this).addClass("active"), i.val($(this).attr("val"))
                    }), r.call(this)
                }
            }
        });
        var d = function (e, t) {
            var n = $(this), i = {}, o = (n.data("btns") || "").split(",");
            o.each(function (e) {
                i[e + "Limit"] = !0
            }), t.title = t.title || "查询结果", t = $.extend(t, i)
        }, c = function (e) {
            var t = $(this);
            $.colorBox(e.share ? null : this), t.parent().fullPanel()
        };
        window.$widget("query-title", function () {
            return {
                template: "_temp/query-title.htm", importing: "panelCtrls", boot: function (e, t) {
                    return d.apply(this, [e, t]), $($compile(e, t))
                }, init: function (e) {
                    c.call(this, e)
                }
            }
        }), window.$widget("query-result", function () {
            return {
                template: "_temp/query-result.htm", importing: "panelCtrls", boot: function (e, t) {
                    return d.apply(this, [e, t]), t.id = t.id || this.getAttribute("id"), t.cls = t.cls || this.className, $($compile(e, t))
                }, init: function (e) {
                    var t = $(this);
                    c.call(t.children(".query-title")[0], e), e.tablehtml && t.find(".qr-tb").html("#" == e.tablehtml.slice(0, 1) ? $(e.tablehtml).html() : window.$cache(e.tablehtml)), t.on("up-count", function (e, n) {
                        t.children("div").find(".total-count").html(n)
                    }), t.on("x-check", function (e, n, i) {
                        var o = [].concat(n);
                        o.each(function (e) {
                            t.checkRow(e, i)
                        })
                    })
                }
            }
        });
        var u = function (e, t) {
            var n = $(this);
            n.click(function () {
                n.closest(".query-block").trigger(e)
            })
        };
        window.$behavior("query", function () {
            return {
                init: function (e) {
                    u.call(this, "x-query", e)
                }
            }
        }), window.$behavior("reset", function () {
            return {
                init: function (e) {
                    u.call(this, "x-reset", e)
                }
            }
        }), window.$widget("query-btns", function () {
            return {
                template: "_temp/query-btns.htm", init: function (e) {
                    var t = $(this);
                    u.call(t.find(".cm-query-btn"), "x-query", e), u.call(t.find(".cm-reset-btn"), "x-reset", e)
                }
            }
        }), window.$behavior("query-block", function () {
            return {
                init: function (e) {
                    var t = $(this);
                    u.call(t.find(".cm-query-btn").not(".query-widget-wrap *"), "x-query", e), u.call(t.find(".cm-reset-btn").not(".query-widget-wrap *"), "x-reset", e)
                }
            }
        }), window.$widget("more-condition", function () {
            return {
                template: '<div class="more-condition" title="展开查询条件"><span>展开查询条件</span><i class="toggle-icon icon-angle-up icon-angle-down"></i></div>',
                init: function (e) {
                    i.call(this, e)
                }
            }
        }), window.$behavior("toggle-more-condition", function () {
            return {
                init: function (e) {
                    i.call(this, e)
                }
            }
        }), window.$behavior("hide-more-condition", function () {
            return {
                init: function (e) {
                    o.call(this, e)
                }
            }
        }), window.$behavior("show-more-condition", function () {
            return {
                init: function (e) {
                    a.call(this, e)
                }
            }
        }), window.$behavior("info-childNodes", function () {
            return {
                init: function (e) {
                    var t = $(this), n = e.selector || "*", i = e.all;
                    t.click(function () {
                        var e = t[i ? "find" : "children"](n).toArray();
                        log("子元素:{0}个,  选择器:{1},  查找范围:{2}".format(e.length, n, i ? "所有子孙元素" : "直接子元素")), console.info(e)
                    })
                }
            }
        }), window.$widget("common-panel-heading", function () {
            return {
                template: '<div class="common-panel-heading"><ul class="clearfix"><li class="active">查询条件</li><li>已保存条件</li></ul></div><div class="cq-condition al-save-condition"></div>',
                init: function (e) {
                    var t = $(this), n = t.filter(".al-save-condition"), i = t.find("li");
                    "hide" == e.saved && t.find("ul>li:eq(1)").hide(), i.click(function () {
                        i.removeClass("active"), $(this).addClass("active");
                        var e = $(this).text();
                        "查询条件" == e ? n.hide().next().show() : "已保存条件" == e && n.show().next().hide()
                    })
                }
            }
        }), window.$behavior("dict", function () {
            return {
                importing: ["dict"], init: function (e) {
                    var t = $(this).addClass("dict").attr("x-dict", ""), n = t.attr("dict-name"), i = t.attr("x-name");
                    if (!n && !i)throw new Error("the dict has no dict-name or x-name");
                    n && t.attr("x-name", n), i && t.attr("dict-name", i), e.act ? window["$" + (e.act.split("@")[1] || "get")](window.makeAct(e.act.split("@")[0]), null, function (e) {
                        t.dict(e.data)
                    }) : t.dict(), t.extractor("dict")
                }
            }
        }), window.$behavior("date-range", function () {
            return {
                importing: ["daterangepicker"], init: function (e) {
                    var t = $(this), n = e.timepicker;
                    t.addClass("cm-input date-range-picker").daterangepicker({timePicker: "true" == String(n)}).extractor("rangeDate")
                }
            }
        }), window.$behavior("kyjcry-picker", function () {
            return {
                importing: ["dict"], init: function (e) {
                    var t = $(this).attr("x-dict", "");
                    t.extractor(function (e) {
                        var n = t.attr("dict-name"), i = t.attr("dict-id"), o = t.find("#" + i).val(), a = t.find("#query-kyjcry-input-hidden").val(), r = o || a;
                        return e ? void(e[n] = r) : r
                    })
                }
            }
        }), window.$behavior("in-wrap", function () {
            return {
                init: function (e) {
                    var t = $(this);
                    t.wrap('<div class="{0}">'.format(e.wrapcls || "all-fix-wrap"))
                }
            }
        })
    }, {}]
}, {}, [4]);