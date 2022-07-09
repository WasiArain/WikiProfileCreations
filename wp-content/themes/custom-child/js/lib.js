/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.7", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a("#" === f ? [] : f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.7", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target).closest(".btn");
        b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(a > this.$items.length - 1 || a < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    }, c.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    };
    var e = function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.7", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = b(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
        }))
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.3.7", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e),
                g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
            }
            return !1
        }
    }, g.prototype.keydown = function(c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d),
                    g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a",
                    i = e.find(".dropdown-menu" + h);
                if (i.length) {
                    var j = i.index(c.target);
                    38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.isInStateTrue = function() {
        for (var a in this.inState)
            if (this.inState[a]) return !0;
        return !1
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = window.SVGElement && c instanceof window.SVGElement,
            g = d ? {
                top: 0,
                left: 0
            } : f ? null : b.offset(),
            h = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            i = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, h, i, g)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.7", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.7", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return e < c && "top";
        if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom"
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery);

/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
! function(a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        }, this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        }, a.each(["onResize", "onThrottledResize"], a.proxy(function(b, c) {
            this._handlers[c] = a.proxy(this[c], this)
        }, this)), a.each(e.Plugins, a.proxy(function(a, b) {
            this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Workers, a.proxy(function(b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, e.Type = {
        Event: "event",
        State: "state"
    }, e.Plugins = {}, e.Workers = [{
        filter: ["width", "settings"],
        run: function() {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this.settings.margin || "",
                c = !this.settings.autoWidth,
                d = this.settings.rtl,
                e = {
                    width: "auto",
                    "margin-left": d ? b : "",
                    "margin-right": d ? "" : b
                };
            !c && this.$stage.children().css(e), a.css = e
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                c = null,
                d = this._items.length,
                e = !this.settings.autoWidth,
                f = [];
            for (a.items = {
                    merge: !1,
                    width: b
                }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
            this._widths = f
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var b = [],
                c = this._items,
                d = this.settings,
                e = Math.max(2 * d.items, 4),
                f = 2 * Math.ceil(c.length / 2),
                g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
                h = "",
                i = "";
            for (g /= 2; g--;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i;
            this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
            this._coordinates = f
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var a = this.settings.stagePadding,
                b = this._coordinates,
                c = {
                    width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                    "padding-left": a || "",
                    "padding-right": a || ""
                };
            this.$stage.css(c)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this._coordinates.length,
                c = !this.settings.autoWidth,
                d = this.$stage.children();
            if (c && a.items.merge)
                for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
            else c && (a.css.width = a.items.width, d.css(a.css))
        }
    }, {
        filter: ["items"],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current)
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f,
                h = g + this.width() * e,
                i = [];
            for (c = 0, d = this._coordinates.length; c < d; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
        }
    }], e.prototype.initialize = function() {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var b, c, e;
            b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && e <= 0 && this.preloadAutoWidthImages(b)
        }
        this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, e.prototype.setup = function() {
        var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c ? (a.each(c, function(a) {
            a <= b && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }, e.prototype.optionsLogic = function() {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function(b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
            content: c.data
        }), c.data
    }, e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
                return this[a]
            }, this._invalidated), e = {}; b < c;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function() {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function() {
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
    }, e.prototype.registerEventHandlers = function() {
        a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
    }, e.prototype.onDragStart = function(b) {
        var d = null;
        3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
            x: d[16 === d.length ? 12 : 4],
            y: d[16 === d.length ? 13 : 5]
        }) : (d = this.$stage.position(), d = {
            x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
            y: d.top
        }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, e.prototype.onDragMove = function(a) {
        var b = null,
            c = null,
            d = null,
            e = this.difference(this._drag.pointer, this.pointer(a)),
            f = this.difference(this._drag.stage.start, e);
        this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
    }, e.prototype.onDragEnd = function(b) {
        var d = this.difference(this._drag.pointer, this.pointer(b)),
            e = this._drag.stage.current,
            f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
        a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, e.prototype.closest = function(b, c) {
        var d = -1,
            e = 30,
            f = this.width(),
            g = this.coordinates();
        return this.settings.freeDrag || a.each(g, a.proxy(function(a, h) {
            return "left" === c && b > h - e && b < h + e ? d = a : "right" === c && b > h - f - e && b < h - f + e ? d = a + 1 : this.op(b, "<", h) && this.op(b, ">", g[a + 1] || h - f) && (d = "left" === c ? a + 1 : a), d === -1
        }, this)), this.settings.loop || (this.op(b, ">", g[this.minimum()]) ? d = b = this.minimum() : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())), d
    }, e.prototype.animate = function(b) {
        var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s"
        }) : c ? this.$stage.animate({
            left: b + "px"
        }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: b + "px"
        })
    }, e.prototype.is = function(a) {
        return this._states.current[a] && this._states.current[a] > 0
    }, e.prototype.current = function(a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function(b) {
        return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function(a, b) {
            return b
        })
    }, e.prototype.reset = function(a) {
        a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function(a, b) {
        var c = this._items.length,
            e = b ? 0 : this._clones.length;
        return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a
    }, e.prototype.relative = function(a) {
        return a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function(a) {
        var b, c, d, e = this.settings,
            f = this._coordinates.length;
        if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
        else if (e.autoWidth || e.merge) {
            for (b = this._items.length, c = this._items[--b].width(), d = this.$element.width(); b-- && (c += this._items[b].width() + this.settings.margin, !(c > d)););
            f = b + 1
        } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
        return a && (f -= this._clones.length / 2), Math.max(f, 0)
    }, e.prototype.minimum = function(a) {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function(a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function(a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function(b) {
        var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function(a) {
                return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
            };
        return b === d ? a.map(this._clones, function(a, b) {
            return f(b)
        }) : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function(a) {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function(b) {
        var c, e = 1,
            f = b - 1;
        return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c))
    }, e.prototype.duration = function(a, b, c) {
        return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function(a, b) {
        var c = this.current(),
            d = null,
            e = a - this.relative(c),
            f = (e > 0) - (e < 0),
            g = this._items.length,
            h = this.minimum(),
            i = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g), a = c + e, d = ((a - h) % g + g) % g + h, d !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.$element.is(":visible") && this.update()
    }, e.prototype.next = function(a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function(a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.onTransitionEnd = function(a) {
        if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating"), this.trigger("translated")
    }, e.prototype.viewport = function() {
        var d;
        return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d
    }, e.prototype.replace = function(b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
            return 1 === this.nodeType
        }).each(a.proxy(function(a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function(b, c) {
        var e = this.relative(this._current);
        c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
            content: b,
            position: c
        }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
            content: b,
            position: c
        })
    }, e.prototype.remove = function(a) {
        a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.preloadAutoWidthImages = function(b) {
        b.each(a.proxy(function(b, c) {
            this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function(a) {
                c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
        }, this))
    }, e.prototype.destroy = function() {
        this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), this.settings.responsive !== !1 && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
        for (var d in this._plugins) this._plugins[d].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case "<":
                return d ? a > c : a < c;
            case ">":
                return d ? a < c : a > c;
            case ">=":
                return d ? a <= c : a >= c;
            case "<=":
                return d ? a >= c : a <= c
        }
    }, e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function(b, c, d, f, g) {
        var h = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            i = a.camelCase(a.grep(["on", b, d], function(a) {
                return a
            }).join("-").toLowerCase()),
            j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                relatedTarget: this
            }, h, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(j)
        }), this.register({
            type: e.Type.Event,
            name: b
        }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j
    }, e.prototype.enter = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++
        }, this))
    }, e.prototype.leave = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b]--
        }, this))
    }, e.prototype.register = function(b) {
        if (b.type === e.Type.Event) {
            if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
                var c = a.event.special[b.name]._default;
                a.event.special[b.name]._default = function(a) {
                    return !c || !c.apply || a.namespace && a.namespace.indexOf("owl") !== -1 ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                }, a.event.special[b.name].owl = !0
            }
        } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) {
            return a.inArray(c, this._states.tags[b.name]) === d
        }, this)))
    }, e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b]
        }, this))
    }, e.prototype.pointer = function(a) {
        var c = {
            x: null,
            y: null
        };
        return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c
    }, e.prototype.isNumeric = function(a) {
        return !isNaN(parseFloat(a))
    }, e.prototype.difference = function(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    }, a.fn.owlCarousel = function(b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var d = a(this),
                f = d.data("owl.carousel");
            f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) {
                f.register({
                    type: e.Type.Event,
                    name: c
                }), f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) {
                    a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
                }, f))
            })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    }, e.prototype.watch = function() {
        this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, e.prototype.refresh = function() {
        this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, e.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                    for (var c = this._core.settings, e = c.center && Math.ceil(c.items / 2) || c.items, f = c.center && e * -1 || 0, g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f, h = this._core.clones().length, i = a.proxy(function(a, b) {
                            this.load(b)
                        }, this); f++ < e;) this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        lazyLoad: !1
    }, e.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c),
            e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
            var e, f = a(d),
                g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                f.css("opacity", 1), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() {
                f.css({
                    "background-image": 'url("' + g + '")',
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && "position" == a.property.name && this.update()
            }, this),
            "loaded.owl.lazy": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, e.prototype.update = function() {
        var b = this._core._current,
            c = b + this._core.settings.items,
            d = this._core.$stage.children().toArray().slice(b, c),
            e = [],
            f = 0;
        a.each(d, function(b, c) {
            e.push(a(c).height())
        }), f = Math.max.apply(null, e), this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" === a.property.name && this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
            this.play(a)
        }, this))
    };
    e.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, e.prototype.fetch = function(a, b) {
        var c = function() {
                return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
            }(),
            d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight,
            g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
        else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
        else {
            if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
            c = "vzaar"
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, e.prototype.thumbnail = function(b, c) {
        var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
            h = b.find("img"),
            i = "src",
            j = "",
            k = this._core.settings,
            l = function(a) {
                e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
            };
        if (b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
        "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a[0].thumbnail_large, l(f)
            }
        }) : "vzaar" === c.type && a.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a.framegrab_url, l(f)
            }
        })
    }, e.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, e.prototype.play = function(b) {
        var c, d = a(b.target),
            e = d.closest("." + this._core.settings.itemClass),
            f = this._videos[e.attr("data-video")],
            g = f.width || "100%",
            h = f.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), "youtube" === f.type ? c = '<iframe width="' + g + '" height="' + h + '" src="//www.youtube.com/embed/' + f.id + "?autoplay=1&rel=0&v=" + f.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === f.type ? c = '<iframe src="//player.vimeo.com/video/' + f.id + '?autoplay=1" width="' + g + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === f.type && (c = '<iframe frameborder="0"height="' + h + '"width="' + g + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + f.id + '/player?autoplay=true"></iframe>'), a('<div class="owl-video-frame">' + c + "</div>").insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
    }, e.prototype.isInFullScreen = function() {
        var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame")
    }, e.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                a.namespace && (this.swapping = "translated" == a.type)
            }, this),
            "translate.owl.carousel": a.proxy(function(a) {
                a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
            animateOut: !1,
            animateIn: !1
        }, e.prototype.swap = function() {
            if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
                this.core.speed(0);
                var b, c = a.proxy(this.clear, this),
                    d = this.core.$stage.children().eq(this.previous),
                    e = this.core.$stage.children().eq(this.next),
                    f = this.core.settings.animateIn,
                    g = this.core.settings.animateOut;
                this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
                    left: b + "px"
                }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
            }
        }, e.prototype.clear = function(b) {
            a(b.target).css({
                left: ""
            }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
        }, e.prototype.destroy = function() {
            var a, b;
            for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
            for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
        },
        a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._timeout = null, this._paused = !1, this._handlers = {
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.owl.autoplay": a.proxy(function(a, b, c) {
                a.namespace && this.play(b, c)
            }, this),
            "stop.owl.autoplay": a.proxy(function(a) {
                a.namespace && this.stop()
            }, this),
            "mouseover.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this),
            "touchstart.owl.core": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "touchend.owl.core": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options)
    };
    e.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, e.prototype.play = function(a, b) {
        this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
    }, e.prototype._getNextTimeout = function(d, e) {
        return this._timeout && b.clearTimeout(this._timeout), b.setTimeout(a.proxy(function() {
            this._paused || this._core.is("busy") || this._core.is("interacting") || c.hidden || this._core.next(e || this._core.settings.autoplaySpeed)
        }, this), d || this._core.settings.autoplayTimeout)
    }, e.prototype._setAutoPlayInterval = function() {
        this._timeout = this._getNextTimeout()
    }, e.prototype.stop = function() {
        this._core.is("rotating") && (b.clearTimeout(this._timeout), this._core.leave("rotating"))
    }, e.prototype.pause = function() {
        this._core.is("rotating") && (this._paused = !0)
    }, e.prototype.destroy = function() {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(b) {
        this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function(b) {
                b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
            }, this),
            "remove.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && this.draw()
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, e.prototype.initialize = function() {
        var b, c = this._core.settings;
        this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.prev(c.navSpeed)
        }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.next(c.navSpeed)
        }, this)), c.dotsData || (this._templates = [a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", a.proxy(function(b) {
            var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(d, c.dotsSpeed)
        }, this));
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
    }, e.prototype.destroy = function() {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, e.prototype.update = function() {
        var a, b, c, d = this._core.clones().length / 2,
            e = d + this._core.items().length,
            f = this._core.maximum(!0),
            g = this._core.settings,
            h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy)
            for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
                if (b >= h || 0 === b) {
                    if (this._pages.push({
                            start: Math.min(f, a - d),
                            end: a - d + h - 1
                        }), Math.min(f, a - d) === f) break;
                    b = 0, ++c
                }
                b += this._core.mergers(this._core.relative(a))
            }
    }, e.prototype.draw = function() {
        var b, c = this._core.settings,
            d = this._core.items().length <= c.items,
            e = this._core.relative(this._core.current()),
            f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
    }, e.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
        }
    }, e.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, a.proxy(function(a, c) {
            return a.start <= b && a.end >= b
        }, this)).pop()
    }, e.prototype.getPosition = function(b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, e.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, e.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, e.prototype.to = function(b, c, d) {
        var e;
        !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(c) {
        this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(c) {
                c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!c) return;
                    this._hashes[c] = b.content
                }
            }, this),
            "changed.owl.carousel": a.proxy(function(c) {
                if (c.namespace && "position" === c.property.name) {
                    var d = this._core.items(this._core.relative(this._core.current())),
                        e = a.map(this._hashes, function(a, b) {
                            return a === d ? b : null
                        }).join();
                    if (!e || b.location.hash.slice(1) === e) return;
                    b.location.hash = e
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function(a) {
            var c = b.location.hash.substring(1),
                e = this._core.$stage.children(),
                f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
        }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    }, e.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    function e(b, c) {
        var e = !1,
            f = b.charAt(0).toUpperCase() + b.slice(1);
        return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
            if (g[b] !== d) return e = !c || b, !1
        }), e
    }

    function f(a) {
        return e(a, !0)
    }
    var g = a("<support>").get(0).style,
        h = "Webkit Moz O ms".split(" "),
        i = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        },
        j = {
            csstransforms: function() {
                return !!e("transform")
            },
            csstransforms3d: function() {
                return !!e("perspective")
            },
            csstransitions: function() {
                return !!e("transition")
            },
            cssanimations: function() {
                return !!e("animation")
            }
        };
    j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);



/*! WOW - v1.0.2 - 2014-10-28
 * Copyright (c) 2014 Matthieu Aussaguel; Licensed MIT */
(function() {
    var a, b, c, d, e, f = function(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        },
        g = [].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
    b = function() {
        function a() {}
        return a.prototype.extend = function(a, b) {
            var c, d;
            for (c in b) d = b[c], null == a[c] && (a[c] = d);
            return a
        }, a.prototype.isMobile = function(a) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
        }, a.prototype.addEvent = function(a, b, c) {
            return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
        }, a.prototype.removeEvent = function(a, b, c) {
            return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
        }, a.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, a
    }(), c = this.WeakMap || this.MozWeakMap || (c = function() {
        function a() {
            this.keys = [], this.values = []
        }
        return a.prototype.get = function(a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                if (c = f[b], c === a) return this.values[b]
        }, a.prototype.set = function(a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                if (d = g[c], d === a) return void(this.values[c] = b);
            return this.keys.push(a), this.values.push(b)
        }, a
    }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {
        function a() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return a.notSupported = !0, a.prototype.observe = function() {}, a
    }()), d = this.getComputedStyle || function(a) {
        return this.getPropertyValue = function(b) {
            var c;
            return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) {
                return b.toUpperCase()
            }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
        }, this
    }, e = /(\-([a-z]){1})/g, this.WOW = function() {
        function e(a) {
            null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), this.animationNameCache = new c
        }
        return e.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0
        }, e.prototype.init = function() {
            var a;
            return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, e.prototype.start = function() {
            var b, c, d, e;
            if (this.stopped = !1, this.boxes = function() {
                    var a, c, d, e;
                    for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                    return e
                }.call(this), this.all = function() {
                    var a, c, d, e;
                    for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                    return e
                }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
            return this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function(a) {
                return function(b) {
                    var c, d, e, f, g;
                    for (g = [], e = 0, f = b.length; f > e; e++) d = b[e], g.push(function() {
                        var a, b, e, f;
                        for (e = d.addedNodes || [], f = [], a = 0, b = e.length; b > a; a++) c = e[a], f.push(this.doSync(c));
                        return f
                    }.call(a));
                    return g
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, e.prototype.stop = function() {
            return this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, e.prototype.sync = function() {
            return a.notSupported ? this.doSync(this.element) : void 0
        }, e.prototype.doSync = function(a) {
            var b, c, d, e, f;
            if (null == a && (a = this.element), 1 === a.nodeType) {
                for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
                return f
            }
        }, e.prototype.show = function(a) {
            return this.applyStyle(a), a.className = "" + a.className + " " + this.config.animateClass
        }, e.prototype.applyStyle = function(a, b) {
            var c, d, e;
            return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function(f) {
                return function() {
                    return f.customStyle(a, b, d, c, e)
                }
            }(this))
        }, e.prototype.animate = function() {
            return "requestAnimationFrame" in window ? function(a) {
                return window.requestAnimationFrame(a)
            } : function(a) {
                return a()
            }
        }(), e.prototype.resetStyle = function() {
            var a, b, c, d, e;
            for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
            return e
        }, e.prototype.customStyle = function(a, b, c, d, e) {
            return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
                animationDuration: c
            }), d && this.vendorSet(a.style, {
                animationDelay: d
            }), e && this.vendorSet(a.style, {
                animationIterationCount: e
            }), this.vendorSet(a.style, {
                animationName: b ? "none" : this.cachedAnimationName(a)
            }), a
        }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function(a, b) {
            var c, d, e, f;
            f = [];
            for (c in b) d = b[c], a["" + c] = d, f.push(function() {
                var b, f, g, h;
                for (g = this.vendors, h = [], b = 0, f = g.length; f > b; b++) e = g[b], h.push(a["" + e + c.charAt(0).toUpperCase() + c.substr(1)] = d);
                return h
            }.call(this));
            return f
        }, e.prototype.vendorCSS = function(a, b) {
            var c, e, f, g, h, i;
            for (e = d(a), c = e.getPropertyCSSValue(b), i = this.vendors, g = 0, h = i.length; h > g; g++) f = i[g], c = c || e.getPropertyCSSValue("-" + f + "-" + b);
            return c
        }, e.prototype.animationName = function(a) {
            var b;
            try {
                b = this.vendorCSS(a, "animation-name").cssText
            } catch (c) {
                b = d(a).getPropertyValue("animation-name")
            }
            return "none" === b ? "" : b
        }, e.prototype.cacheAnimationName = function(a) {
            return this.animationNameCache.set(a, this.animationName(a))
        }, e.prototype.cachedAnimationName = function(a) {
            return this.animationNameCache.get(a)
        }, e.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }, e.prototype.scrollCallback = function() {
            var a;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                var b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                return e
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, e.prototype.offsetTop = function(a) {
            for (var b; void 0 === a.offsetTop;) a = a.parentNode;
            for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
            return b
        }, e.prototype.isVisible = function(a) {
            var b, c, d, e, f;
            return c = a.getAttribute("data-wow-offset") || this.config.offset, f = window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
        }, e.prototype.util = function() {
            return null != this._util ? this._util : this._util = new b
        }, e.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, e
    }()
}).call(this);


/* Timecircle Js */
! function(t) {
    var e = window;
    Object.keys || (Object.keys = function() {
        "use strict";
        var t = Object.prototype.hasOwnProperty,
            e = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            i = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            a = i.length;
        return function(s) {
            if ("object" != typeof s && ("function" != typeof s || null === s)) throw new TypeError("Object.keys called on non-object");
            var n, r, o = [];
            for (n in s) t.call(s, n) && o.push(n);
            if (e)
                for (r = 0; r < a; r++) t.call(s, i[r]) && o.push(i[r]);
            return o
        }
    }());
    var i = !1;
    location.hash;
    var a = ["Days", "Hours", "Minutes", "Seconds"],
        s = {
            Seconds: "Minutes",
            Minutes: "Hours",
            Hours: "Days",
            Days: "Years"
        },
        n = {
            Seconds: 1,
            Minutes: 60,
            Hours: 3600,
            Days: 86400,
            Months: 2678400,
            Years: 31536e3
        };

    function r() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }

    function o(t, e, i, a, s) {
        for (var r = {}, o = {}, h = {}, d = {}, u = {}, l = {}, c = null, f = 0; f < a.length; f++) {
            var m, p = a[f];
            m = null === c ? i / n[p] : n[c] / n[p];
            var _ = t / n[p],
                b = e / n[p];
            s && (_ = _ > 0 ? Math.floor(_) : Math.ceil(_), b = b > 0 ? Math.floor(b) : Math.ceil(b)), "Days" !== p && (_ %= m, b %= m), r[p] = _, h[p] = Math.abs(_), o[p] = b, l[p] = Math.abs(b), d[p] = Math.abs(_) / m, u[p] = Math.abs(b) / m, c = p
        }
        return {
            raw_time: r,
            raw_old_time: o,
            time: h,
            old_time: l,
            pct: d,
            old_pct: u
        }
    }
    Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
        var e = this.length >>> 0,
            i = Number(arguments[1]) || 0;
        for ((i = i < 0 ? Math.ceil(i) : Math.floor(i)) < 0 && (i += e); i < e; i++)
            if (i in this && this[i] === t) return i;
        return -1
    });
    var h = {};

    function d() {
        void 0 !== e.TC_Instance_List ? h = e.TC_Instance_List : e.TC_Instance_List = h,
            function(t) {
                for (var e = ["webkit", "moz"], i = 0; i < e.length && !t.requestAnimationFrame; ++i) t.requestAnimationFrame = t[e[i] + "RequestAnimationFrame"], t.cancelAnimationFrame = t[e[i] + "CancelAnimationFrame"];
                t.requestAnimationFrame && t.cancelAnimationFrame || (t.requestAnimationFrame = function(e, i, a) {
                    void 0 === a && (a = {
                        data: {
                            last_frame: 0
                        }
                    });
                    var s = (new Date).getTime(),
                        n = Math.max(0, 16 - (s - a.data.last_frame)),
                        r = t.setTimeout(function() {
                            e(s + n)
                        }, n);
                    return a.data.last_frame = s + n, r
                }, t.cancelAnimationFrame = function(t) {
                    clearTimeout(t)
                })
            }(e)
    }
    var u = function(t, e) {
        this.element = t, this.container, this.listeners = null, this.data = {
            paused: !1,
            last_frame: 0,
            animation_frame: null,
            interval_fallback: null,
            timer: !1,
            total_duration: null,
            prev_time: null,
            drawn_units: [],
            text_elements: {
                Days: null,
                Hours: null,
                Minutes: null,
                Seconds: null
            },
            attributes: {
                canvas: null,
                context: null,
                item_size: null,
                line_width: null,
                radius: null,
                outer_radius: null
            },
            state: {
                fading: {
                    Days: !1,
                    Hours: !1,
                    Minutes: !1,
                    Seconds: !1
                }
            }
        }, this.config = null, this.setOptions(e), this.initialize()
    };
    u.prototype.clearListeners = function() {
        this.listeners = {
            all: [],
            visible: []
        }
    }, u.prototype.addTime = function(t) {
        if (this.data.attributes.ref_date instanceof Date) {
            var e = this.data.attributes.ref_date;
            e.setSeconds(e.getSeconds() + t)
        } else isNaN(this.data.attributes.ref_date) || (this.data.attributes.ref_date += 1e3 * t)
    }, u.prototype.initialize = function(a) {
        this.data.drawn_units = [];
        for (var s = 0; s < Object.keys(this.config.time).length; s++) {
            var n = Object.keys(this.config.time)[s];
            this.config.time[n].show && this.data.drawn_units.push(n)
        }
        t(this.element).children("div.time_circles").remove(), void 0 === a && (a = !0), (a || null === this.listeners) && this.clearListeners(), this.container = t("<div>"), this.container.addClass("time_circles"), this.container.appendTo(this.element);
        var r = this.element.offsetHeight,
            o = this.element.offsetWidth;
        0 === r && (r = t(this.element).height()), 0 === o && (o = t(this.element).width()), 0 === r && o > 0 ? r = o / this.data.drawn_units.length : 0 === o && r > 0 && (o = r * this.data.drawn_units.length);
        var h = document.createElement("canvas");
        h.width = o, h.height = r, this.data.attributes.canvas = t(h), this.data.attributes.canvas.appendTo(this.container);
        var d, u = !(!(d = document.createElement("canvas")).getContext || !d.getContext("2d"));
        u || "undefined" == typeof G_vmlCanvasManager || (G_vmlCanvasManager.initElement(h), i = !0, u = !0), u && (this.data.attributes.context = h.getContext("2d")), this.data.attributes.item_size = Math.min(o / this.data.drawn_units.length, r), this.data.attributes.line_width = this.data.attributes.item_size * this.config.fg_width, this.data.attributes.radius = (.8 * this.data.attributes.item_size - this.data.attributes.line_width) / 2, this.data.attributes.outer_radius = this.data.attributes.radius + .5 * Math.max(this.data.attributes.line_width, this.data.attributes.line_width * this.config.bg_width);
        s = 0;
        for (var l in this.data.text_elements)
            if (this.config.time[l].show) {
                var c = t("<div>");
                c.addClass("textDiv_" + l), c.css("top", Math.round(.35 * this.data.attributes.item_size)), c.css("left", Math.round(s++ * this.data.attributes.item_size)), c.css("width", this.data.attributes.item_size), c.appendTo(this.container);
                var f = t("<h4>");
                f.text(this.config.time[l].text), f.css("font-size", Math.round(this.config.text_size * this.data.attributes.item_size)), f.css("line-height", Math.round(this.config.text_size * this.data.attributes.item_size) + "px"), f.appendTo(c);
                var m = t("<span>");
                m.css("font-size", Math.round(3 * this.config.text_size * this.data.attributes.item_size)), m.css("line-height", Math.round(this.config.text_size * this.data.attributes.item_size) + "px"), m.appendTo(c), this.data.text_elements[l] = m
            }
        this.start(), this.config.start || (this.data.paused = !0);
        var p = this;
        this.data.interval_fallback = e.setInterval(function() {
            p.update.call(p, !0)
        }, 100)
    }, u.prototype.update = function(t) {
        if (void 0 === t) t = !1;
        else if (t && this.data.paused) return;
        var s, r;
        i && this.data.attributes.context.clearRect(0, 0, this.data.attributes.canvas[0].width, this.data.attributes.canvas[0].hright);
        var h = this.data.prev_time,
            d = new Date;
        if (this.data.prev_time = d, null === h && (h = d), !this.config.count_past_zero && d > this.data.attributes.ref_date) {
            for (var u = 0; u < this.data.drawn_units.length; u++) {
                var l = this.data.drawn_units[u];
                this.data.text_elements[l].text("0");
                var c = u * this.data.attributes.item_size + this.data.attributes.item_size / 2,
                    f = this.data.attributes.item_size / 2,
                    m = this.config.time[l].color;
                this.drawArc(c, f, m, 0)
            }
            this.stop()
        } else {
            s = (this.data.attributes.ref_date - d) / 1e3, r = (this.data.attributes.ref_date - h) / 1e3;
            var p = "smooth" !== this.config.animation,
                _ = o(s, r, this.data.total_duration, this.data.drawn_units, p),
                b = o(s, r, n.Years, a, p),
                v = (u = 0, 0),
                g = null,
                y = this.data.drawn_units.slice();
            for (var u in a) {
                l = a[u];
                if (Math.floor(b.raw_time[l]) !== Math.floor(b.raw_old_time[l]) && this.notifyListeners(l, Math.floor(b.time[l]), Math.floor(s), "all"), !(y.indexOf(l) < 0)) {
                    if (Math.floor(_.raw_time[l]) !== Math.floor(_.raw_old_time[l]) && this.notifyListeners(l, Math.floor(_.time[l]), Math.floor(s), "visible"), !t) {
                        this.data.text_elements[l].text(Math.floor(Math.abs(_.time[l])));
                        c = v * this.data.attributes.item_size + this.data.attributes.item_size / 2, f = this.data.attributes.item_size / 2, m = this.config.time[l].color;
                        "smooth" === this.config.animation ? (null === g || i || (Math.floor(_.time[g]) > Math.floor(_.old_time[g]) ? (this.radialFade(c, f, m, 1, l), this.data.state.fading[l] = !0) : Math.floor(_.time[g]) < Math.floor(_.old_time[g]) && (this.radialFade(c, f, m, 0, l), this.data.state.fading[l] = !0)), this.data.state.fading[l] || this.drawArc(c, f, m, _.pct[l])) : this.animateArc(c, f, m, _.pct[l], _.old_pct[l], (new Date).getTime() + 200)
                    }
                    g = l, v++
                }
            }
            if (!this.data.paused && !t) {
                var w = this,
                    M = function() {
                        w.update.call(w)
                    };
                if ("smooth" === this.config.animation) this.data.animation_frame = e.requestAnimationFrame(M, w.element, w);
                else {
                    var x = s % 1 * 1e3;
                    x < 0 && (x = 1e3 + x), x += 50, w.data.animation_frame = e.setTimeout(function() {
                        w.data.animation_frame = e.requestAnimationFrame(M, w.element, w)
                    }, x)
                }
            }
        }
    }, u.prototype.animateArc = function(t, i, a, s, n, r) {
        if (null !== this.data.attributes.context) {
            var o = n - s;
            if (Math.abs(o) > .5) 0 === s ? this.radialFade(t, i, a, 1) : this.radialFade(t, i, a, 0);
            else {
                var h = (200 - (r - (new Date).getTime())) / 200;
                h > 1 && (h = 1);
                var d = n * (1 - h) + s * h;
                if (this.drawArc(t, i, a, d), h >= 1) return;
                var u = this;
                e.requestAnimationFrame(function() {
                    u.animateArc(t, i, a, s, n, r)
                }, this.element)
            }
        }
    }, u.prototype.drawArc = function(t, e, a, s) {
        if (null !== this.data.attributes.context) {
            var n, r, o, h = Math.max(this.data.attributes.outer_radius, this.data.attributes.item_size / 2);
            i || this.data.attributes.context.clearRect(t - h, e - h, 2 * h, 2 * h), this.config.use_background && (this.data.attributes.context.beginPath(), this.data.attributes.context.arc(t, e, this.data.attributes.radius, 0, 2 * Math.PI, !1), this.data.attributes.context.lineWidth = this.data.attributes.line_width * this.config.bg_width, this.data.attributes.context.strokeStyle = this.config.circle_bg_color, this.data.attributes.context.stroke());
            var d = -.5 * Math.PI,
                u = 2 * Math.PI;
            n = d + this.config.start_angle / 360 * u;
            var l = 2 * s * Math.PI;
            "Both" === this.config.direction ? (o = !1, r = (n -= l / 2) + l) : "Clockwise" === this.config.direction ? (o = !1, r = n + l) : (o = !0, r = n - l), this.data.attributes.context.beginPath(), this.data.attributes.context.arc(t, e, this.data.attributes.radius, n, r, o), this.data.attributes.context.lineWidth = this.data.attributes.line_width, this.data.attributes.context.strokeStyle = a, this.data.attributes.context.stroke()
        }
    }, u.prototype.radialFade = function(t, i, a, s, n) {
        var r, o = function(t) {
                var e = /^rgba?\(([\d]+),([\d]+),([\d]+)(,([\d\.]+))?\)$/;
                if (e.test(t)) {
                    var i = e.exec(t);
                    return {
                        r: parseInt(i[1]),
                        g: parseInt(i[2]),
                        b: parseInt(i[3]),
                        a: parseInt(i[5] ? i[5] : 1)
                    }
                }
                return t = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(t, e, i, a) {
                    return e + e + i + i + a + a
                }), (i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t)) ? {
                    r: parseInt(i[1], 16),
                    g: parseInt(i[2], 16),
                    b: parseInt(i[3], 16)
                } : null
            }(a),
            h = this,
            d = .2 * (1 === s ? -1 : 1);
        for (r = 0; s <= 1 && s >= 0; r++) ! function() {
            var a = 50 * r,
                n = "rgba(" + o.r + ", " + o.g + ", " + o.b + ", " + Math.round(10 * s) / 10 + ")";
            e.setTimeout(function() {
                h.drawArc(t, i, n, 1)
            }, a)
        }(), s += d;
        void 0 !== typeof n && e.setTimeout(function() {
            h.data.state.fading[n] = !1
        }, 50 * r)
    }, u.prototype.timeLeft = function() {
        if (this.data.paused && "number" == typeof this.data.timer) return this.data.timer;
        var t = new Date;
        return (this.data.attributes.ref_date - t) / 1e3
    }, u.prototype.start = function() {
        e.cancelAnimationFrame(this.data.animation_frame), e.clearTimeout(this.data.animation_frame);
        var i = t(this.element).data("date");
        if (void 0 === i && (i = t(this.element).attr("data-date")), "string" == typeof i) this.data.attributes.ref_date = function(t) {
            var e = t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{1,2}:[0-9]{2}:[0-9]{2}$/);
            if (null !== e && e.length > 0) {
                var i = t.split(" "),
                    a = i[0].split("-"),
                    s = i[1].split(":");
                return new Date(a[0], a[1] - 1, a[2], s[0], s[1], s[2])
            }
            var n = Date.parse(t);
            return isNaN(n) ? (n = Date.parse(t.replace(/-/g, "/").replace("T", " ")), isNaN(n) ? new Date : n) : n
        }(i);
        else if ("number" == typeof this.data.timer) this.data.paused && (this.data.attributes.ref_date = (new Date).getTime() + 1e3 * this.data.timer);
        else {
            var a = t(this.element).data("timer");
            void 0 === a && (a = t(this.element).attr("data-timer")), "string" == typeof a && (a = parseFloat(a)), "number" == typeof a ? (this.data.timer = a, this.data.attributes.ref_date = (new Date).getTime() + 1e3 * a) : this.data.attributes.ref_date = this.config.ref_date
        }
        this.data.paused = !1, this.update.call(this)
    }, u.prototype.restart = function() {
        this.data.timer = !1, this.start()
    }, u.prototype.stop = function() {
        "number" == typeof this.data.timer && (this.data.timer = this.timeLeft(this)), this.data.paused = !0, e.cancelAnimationFrame(this.data.animation_frame)
    }, u.prototype.destroy = function() {
        this.clearListeners(), this.stop(), e.clearInterval(this.data.interval_fallback), this.data.interval_fallback = null, this.container.remove(), t(this.element).removeAttr("data-tc-id"), t(this.element).removeData("tc-id")
    }, u.prototype.setOptions = function(i) {
        if (null === this.config && (this.default_options.ref_date = new Date, this.config = t.extend(!0, {}, this.default_options)), t.extend(!0, this.config, i), e = this.config.use_top_frame ? window.top : window, d(), this.data.total_duration = this.config.total_duration, "string" == typeof this.data.total_duration)
            if (void 0 !== n[this.data.total_duration]) this.data.total_duration = n[this.data.total_duration];
            else if ("Auto" === this.data.total_duration)
            for (var a = 0; a < Object.keys(this.config.time).length; a++) {
                var r = Object.keys(this.config.time)[a];
                if (this.config.time[r].show) {
                    this.data.total_duration = n[s[r]];
                    break
                }
            } else this.data.total_duration = n.Years, console.error("Valid values for TimeCircles config.total_duration are either numeric, or (string) Years, Months, Days, Hours, Minutes, Auto")
    }, u.prototype.addListener = function(t, e, i) {
        "function" == typeof t && (void 0 === i && (i = "visible"), this.listeners[i].push({
            func: t,
            scope: e
        }))
    }, u.prototype.notifyListeners = function(t, e, i, a) {
        for (var s = 0; s < this.listeners[a].length; s++) {
            var n = this.listeners[a][s];
            n.func.apply(n.scope, [t, e, i])
        }
    }, u.prototype.default_options = {
        ref_date: new Date,
        start: !0,
        animation: "smooth",
        count_past_zero: !0,
        circle_bg_color: "#60686F",
        use_background: !0,
        fg_width: .1,
        bg_width: 1.2,
        text_size: .07,
        total_duration: "Auto",
        direction: "Clockwise",
        use_top_frame: !1,
        start_angle: 0,
        time: {
            Days: {
                show: !0,
                text: "Days",
                color: "#FC6"
            },
            Hours: {
                show: !0,
                text: "Hours",
                color: "#9CF"
            },
            Minutes: {
                show: !0,
                text: "Minutes",
                color: "#BFB"
            },
            Seconds: {
                show: !0,
                text: "Seconds",
                color: "#F99"
            }
        }
    };
    var l = function(t, e) {
        this.elements = t, this.options = e, this.foreach()
    };
    l.prototype.getInstance = function(e) {
        var i, a = t(e).data("tc-id");
        if (void 0 === a && (a = r() + r() + "-" + r() + "-" + r() + "-" + r() + "-" + r() + r() + r(), t(e).attr("data-tc-id", a)), void 0 === h[a]) {
            var s = this.options,
                n = t(e).data("options");
            "string" == typeof n && (n = JSON.parse(n)), "object" == typeof n && (s = t.extend(!0, {}, this.options, n)), i = new u(e, s), h[a] = i
        } else i = h[a], void 0 !== this.options && i.setOptions(this.options);
        return i
    }, l.prototype.addTime = function(t) {
        this.foreach(function(e) {
            e.addTime(t)
        })
    }, l.prototype.foreach = function(t) {
        var e = this;
        return this.elements.each(function() {
            var i = e.getInstance(this);
            "function" == typeof t && t(i)
        }), this
    }, l.prototype.start = function() {
        return this.foreach(function(t) {
            t.start()
        }), this
    }, l.prototype.stop = function() {
        return this.foreach(function(t) {
            t.stop()
        }), this
    }, l.prototype.restart = function() {
        return this.foreach(function(t) {
            t.restart()
        }), this
    }, l.prototype.rebuild = function() {
        return this.foreach(function(t) {
            t.initialize(!1)
        }), this
    }, l.prototype.getTime = function() {
        return this.getInstance(this.elements[0]).timeLeft()
    }, l.prototype.addListener = function(t, e) {
        void 0 === e && (e = "visible");
        var i = this;
        return this.foreach(function(a) {
            a.addListener(t, i.elements, e)
        }), this
    }, l.prototype.destroy = function() {
        return this.foreach(function(t) {
            t.destroy()
        }), this
    }, l.prototype.end = function() {
        return this.elements
    }, t.fn.TimeCircles = function(t) {
        return new l(this, t)
    }
}(jQuery), $(function() {
    $("#CountDownTimer").TimeCircles({
        time: {
            Days: {
                show: !1
            },
            Hours: {
                show: !0
            }
        }
    })
});


/*! jQuery Validation Plugin - v1.15.0 - 2/24/2016
 * http://jqueryvalidation.org/
 * Copyright (c) 2016 JÃƒÂ¶rn Zaefferer; Licensed MIT */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
    a.extend(a.fn, {
        validate: function(b) {
            if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function(b) {
                c.settings.submitHandler && (c.submitButton = b.target), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0)
            }), this.on("submit.validate", function(b) {
                function d() {
                    var d, e;
                    return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), void 0 !== e ? e : !1) : !0
                }
                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
            })), c)
        },
        valid: function() {
            var b, c, d;
            return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function() {
                b = c.element(this) && b, b || (d = d.concat(c.errorList))
            }), c.errorList = d), b
        },
        rules: function(b, c) {
            if (this.length) {
                var d, e, f, g, h, i, j = this[0];
                if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                    case "add":
                        a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                        break;
                    case "remove":
                        return c ? (i = {}, a.each(c.split(/\s/), function(b, c) {
                            i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required")
                        }), i) : (delete e[j.name], f)
                }
                return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({
                    required: h
                }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, {
                    remote: h
                })), g
            }
        }
    }), a.extend(a.expr[":"], {
        blank: function(b) {
            return !a.trim("" + a(b).val())
        },
        filled: function(b) {
            var c = a(b).val();
            return null !== c && !!a.trim("" + c)
        },
        unchecked: function(b) {
            return !a(b).prop("checked")
        }
    }), a.validator = function(b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init()
    }, a.validator.format = function(b, c) {
        return 1 === arguments.length ? function() {
            var c = a.makeArray(arguments);
            return c.unshift(b), a.validator.format.apply(this, c)
        } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() {
                return c
            })
        }), b)
    }, a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(a) {
                this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)))
            },
            onfocusout: function(a) {
                this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
            },
            onkeyup: function(b, c) {
                var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === c.which && "" === this.elementValue(b) || -1 !== a.inArray(c.keyCode, d) || (b.name in this.submitted || b.name in this.invalid) && this.element(b)
            },
            onclick: function(a) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
            },
            highlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
            },
            unhighlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
            }
        },
        setDefaults: function(b) {
            a.extend(a.validator.defaults, b)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}."),
            step: a.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function b(b) {
                    var c = a.data(this.form, "validator"),
                        d = "on" + b.type.replace(/^validate/, ""),
                        e = c.settings;
                    e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b)
                }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var c, d = this.groups = {};
                a.each(this.settings.groups, function(b, c) {
                    "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) {
                        d[c] = b
                    })
                }), c = this.settings.rules, a.each(c, function(b, d) {
                    c[b] = a.validator.normalizeRule(d)
                }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                return this.valid()
            },
            element: function(b) {
                var c, d, e = this.clean(b),
                    f = this.validationTargetFor(e),
                    g = this,
                    h = !0;
                return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function(a, b) {
                    b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = h && g.check(e)))
                }), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h
            },
            showErrors: function(b) {
                if (b) {
                    var c = this;
                    a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function(a, b) {
                        return {
                            message: a,
                            element: c.findByName(b)[0]
                        }
                    }), this.successList = a.grep(this.successList, function(a) {
                        return !(a.name in b)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(b)
            },
            resetElements: function(a) {
                var b;
                if (this.settings.unhighlight)
                    for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
                else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(a) {
                var b, c = 0;
                for (b in a) a[b] && c++;
                return c
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(a) {
                a.not(this.containers).text(""), this.addWrapper(a).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (b) {}
            },
            findLastActive: function() {
                var b = this.lastActive;
                return b && 1 === a.grep(this.errorList, function(a) {
                    return a.element.name === b.name
                }).length && b
            },
            elements: function() {
                var b = this,
                    c = {};
                return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var d = this.name || a(this).attr("name");
                    return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]), d in c || !b.objectLength(a(this).rules()) ? !1 : (c[d] = !0, !0)
                })
            },
            clean: function(b) {
                return a(b)[0]
            },
            errors: function() {
                var b = this.settings.errorClass.split(" ").join(".");
                return a(this.settings.errorElement + "." + b, this.errorContext)
            },
            resetInternals: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([])
            },
            reset: function() {
                this.resetInternals(), this.currentElements = a([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(a) {
                this.reset(), this.toHide = this.errorsFor(a)
            },
            elementValue: function(b) {
                var c, d, e = a(b),
                    f = b.type;
                return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = b.hasAttribute("contenteditable") ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c)
            },
            check: function(b) {
                b = this.validationTargetFor(this.clean(b));
                var c, d, e, f = a(b).rules(),
                    g = a.map(f, function(a, b) {
                        return b
                    }).length,
                    h = !1,
                    i = this.elementValue(b);
                if ("function" == typeof f.normalizer) {
                    if (i = f.normalizer.call(b, i), "string" != typeof i) throw new TypeError("The normalizer should return a string value.");
                    delete f.normalizer
                }
                for (d in f) {
                    e = {
                        method: d,
                        parameters: f[d]
                    };
                    try {
                        if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
                            h = !0;
                            continue
                        }
                        if (h = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b)));
                        if (!c) return this.formatAndAdd(b, e), !1
                    } catch (j) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), j
                    }
                }
                if (!h) return this.objectLength(f) && this.successList.push(b), !0
            },
            customDataMessage: function(b, c) {
                return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg")
            },
            customMessage: function(a, b) {
                var c = this.settings.messages[a];
                return c && (c.constructor === String ? c : c[b])
            },
            findDefined: function() {
                for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a]
            },
            defaultMessage: function(b, c) {
                var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"),
                    e = /\$?\{(\d+)\}/g;
                return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d
            },
            formatAndAdd: function(a, b) {
                var c = this.defaultMessage(a, b);
                this.errorList.push({
                    message: c,
                    element: a,
                    method: b.method
                }), this.errorMap[a.name] = c, this.submitted[a.name] = c
            },
            addWrapper: function(a) {
                return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
            },
            defaultShowErrors: function() {
                var a, b, c;
                for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return a(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(b, c) {
                var d, e, f, g, h = this.errorsFor(b),
                    i = this.idOrName(b),
                    j = a(b).attr("aria-describedby");
                h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function(b, c) {
                    c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id"))
                })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h)
            },
            errorsFor: function(b) {
                var c = this.escapeCssMeta(this.idOrName(b)),
                    d = a(b).attr("aria-describedby"),
                    e = "label[for='" + c + "'], label[for='" + c + "'] *";
                return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e)
            },
            escapeCssMeta: function(a) {
                return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1")
            },
            idOrName: function(a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
            },
            validationTargetFor: function(b) {
                return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0]
            },
            checkable: function(a) {
                return /radio|checkbox/i.test(a.type)
            },
            findByName: function(b) {
                return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']")
            },
            getLength: function(b, c) {
                switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                }
                return b.length
            },
            depend: function(a, b) {
                return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0
            },
            dependTypes: {
                "boolean": function(a) {
                    return a
                },
                string: function(b, c) {
                    return !!a(b, c.form).length
                },
                "function": function(a, b) {
                    return a(b)
                }
            },
            optional: function(b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
            },
            startRequest: function(b) {
                this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0)
            },
            stopRequest: function(b, c) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(b, c) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(b, {
                        method: c
                    })
                })
            },
            destroy: function() {
                this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
        },
        classRules: function(b) {
            var c = {},
                d = a(b).attr("class");
            return d && a.each(d.split(" "), function() {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
            }), c
        },
        normalizeAttributeRule: function(a, b, c, d) {
            /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0)
        },
        attributeRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);
            return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
        },
        dataRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d);
            return e
        },
        staticRules: function(b) {
            var c = {},
                d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
        },
        normalizeRules: function(b, c) {
            return a.each(b, function(d, e) {
                if (e === !1) return void delete b[d];
                if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!a(e.depends, c.form).length;
                            break;
                        case "function":
                            f = e.depends.call(c, c)
                    }
                    f ? b[d] = void 0 !== e.param ? e.param : !0 : (a.data(c.form, "validator").resetElements(a(c)), delete b[d])
                }
            }), a.each(b, function(d, e) {
                b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e
            }), a.each(["minlength", "maxlength"], function() {
                b[this] && (b[this] = Number(b[this]))
            }), a.each(["rangelength", "range"], function() {
                var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]))
            }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b
        },
        normalizeRule: function(b) {
            if ("string" == typeof b) {
                var c = {};
                a.each(b.split(/\s/), function() {
                    c[this] = !0
                }), b = c
            }
            return b
        },
        addMethod: function(b, c, d) {
            a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
        },
        methods: {
            required: function(b, c, d) {
                if (!this.depend(d, c)) return "dependency-mismatch";
                if ("select" === c.nodeName.toLowerCase()) {
                    var e = a(c).val();
                    return e && e.length > 0
                }
                return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0
            },
            email: function(a, b) {
                return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)
            },
            url: function(a, b) {
                return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)
            },
            date: function(a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString())
            },
            dateISO: function(a, b) {
                return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)
            },
            number: function(a, b) {
                return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
            },
            digits: function(a, b) {
                return this.optional(b) || /^\d+$/.test(a)
            },
            minlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d
            },
            maxlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || d >= e
            },
            rangelength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d[0] && e <= d[1]
            },
            min: function(a, b, c) {
                return this.optional(b) || a >= c
            },
            max: function(a, b, c) {
                return this.optional(b) || c >= a
            },
            range: function(a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1]
            },
            step: function(b, c, d) {
                var e = a(c).attr("type"),
                    f = "Step attribute on input type " + e + " is not supported.",
                    g = ["text", "number", "range"],
                    h = new RegExp("\\b" + e + "\\b"),
                    i = e && !h.test(g.join());
                if (i) throw new Error(f);
                return this.optional(c) || b % d === 0
            },
            equalTo: function(b, c, d) {
                var e = a(d);
                return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                    a(c).valid()
                }), b === e.val()
            },
            remote: function(b, c, d, e) {
                if (this.optional(c)) return "dependency-mismatch";
                e = "string" == typeof e && e || "remote";
                var f, g, h, i = this.previousValue(c, e);
                return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && {
                    url: d
                } || d, h = a.param(a.extend({
                    data: b
                }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, {
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: g,
                    context: f.currentForm,
                    success: function(a) {
                        var d, g, h, j = a === !0 || "true" === a;
                        f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, {
                            method: e,
                            parameters: b
                        }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j)
                    }
                }, d)), "pending")
            }
        }
    });
    var b, c = {};
    a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, d) {
        var e = a.port;
        "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d)
    }) : (b = a.ajax, a.ajax = function(d) {
        var e = ("mode" in d ? d : a.ajaxSettings).mode,
            f = ("port" in d ? d : a.ajaxSettings).port;
        return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments)
    })
});

/*! jquery.cookie v1.4.1 | MIT */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? a(require("jquery")) : a(jQuery)
}(function(a) {
    function b(a) {
        return h.raw ? a : encodeURIComponent(a)
    }

    function c(a) {
        return h.raw ? a : decodeURIComponent(a)
    }

    function d(a) {
        return b(h.json ? JSON.stringify(a) : String(a))
    }

    function e(a) {
        0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return a = decodeURIComponent(a.replace(g, " ")), h.json ? JSON.parse(a) : a
        } catch (b) {}
    }

    function f(b, c) {
        var d = h.raw ? b : e(b);
        return a.isFunction(c) ? c(d) : d
    }
    var g = /\+/g,
        h = a.cookie = function(e, g, i) {
            if (void 0 !== g && !a.isFunction(g)) {
                if (i = a.extend({}, h.defaults, i), "number" == typeof i.expires) {
                    var j = i.expires,
                        k = i.expires = new Date;
                    k.setTime(+k + 864e5 * j)
                }
                return document.cookie = [b(e), "=", d(g), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
            }
            for (var l = e ? void 0 : {}, m = document.cookie ? document.cookie.split("; ") : [], n = 0, o = m.length; o > n; n++) {
                var p = m[n].split("="),
                    q = c(p.shift()),
                    r = p.join("=");
                if (e && e === q) {
                    l = f(r, g);
                    break
                }
                e || void 0 === (r = f(r)) || (l[q] = r)
            }
            return l
        };
    h.defaults = {}, a.removeCookie = function(b, c) {
        return void 0 === a.cookie(b) ? !1 : (a.cookie(b, "", a.extend({}, c, {
            expires: -1
        })), !a.cookie(b))
    }
});


/*! Select2 4.0.6-rc.0 | https://github.com/select2/select2/blob/master/LICENSE.md */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function(b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function(a) {
    var b = function() {
            if (a && a.fn && a.fn.select2 && a.fn.select2.amd) var b = a.fn.select2.amd;
            var b;
            return function() {
                if (!b || !b.requirejs) {
                    b ? c = b : b = {};
                    var a, c, d;
                    ! function(b) {
                        function e(a, b) {
                            return v.call(a, b)
                        }

                        function f(a, b) {
                            var c, d, e, f, g, h, i, j, k, l, m, n, o = b && b.split("/"),
                                p = t.map,
                                q = p && p["*"] || {};
                            if (a) {
                                for (a = a.split("/"), g = a.length - 1, t.nodeIdCompat && x.test(a[g]) && (a[g] = a[g].replace(x, "")), "." === a[0].charAt(0) && o && (n = o.slice(0, o.length - 1), a = n.concat(a)), k = 0; k < a.length; k++)
                                    if ("." === (m = a[k])) a.splice(k, 1), k -= 1;
                                    else if (".." === m) {
                                    if (0 === k || 1 === k && ".." === a[2] || ".." === a[k - 1]) continue;
                                    k > 0 && (a.splice(k - 1, 2), k -= 2)
                                }
                                a = a.join("/")
                            }
                            if ((o || q) && p) {
                                for (c = a.split("/"), k = c.length; k > 0; k -= 1) {
                                    if (d = c.slice(0, k).join("/"), o)
                                        for (l = o.length; l > 0; l -= 1)
                                            if ((e = p[o.slice(0, l).join("/")]) && (e = e[d])) {
                                                f = e, h = k;
                                                break
                                            }
                                    if (f) break;
                                    !i && q && q[d] && (i = q[d], j = k)
                                }!f && i && (f = i, h = j), f && (c.splice(0, h, f), a = c.join("/"))
                            }
                            return a
                        }

                        function g(a, c) {
                            return function() {
                                var d = w.call(arguments, 0);
                                return "string" != typeof d[0] && 1 === d.length && d.push(null), o.apply(b, d.concat([a, c]))
                            }
                        }

                        function h(a) {
                            return function(b) {
                                return f(b, a)
                            }
                        }

                        function i(a) {
                            return function(b) {
                                r[a] = b
                            }
                        }

                        function j(a) {
                            if (e(s, a)) {
                                var c = s[a];
                                delete s[a], u[a] = !0, n.apply(b, c)
                            }
                            if (!e(r, a) && !e(u, a)) throw new Error("No " + a);
                            return r[a]
                        }

                        function k(a) {
                            var b, c = a ? a.indexOf("!") : -1;
                            return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a]
                        }

                        function l(a) {
                            return a ? k(a) : []
                        }

                        function m(a) {
                            return function() {
                                return t && t.config && t.config[a] || {}
                            }
                        }
                        var n, o, p, q, r = {},
                            s = {},
                            t = {},
                            u = {},
                            v = Object.prototype.hasOwnProperty,
                            w = [].slice,
                            x = /\.js$/;
                        p = function(a, b) {
                            var c, d = k(a),
                                e = d[0],
                                g = b[1];
                            return a = d[1], e && (e = f(e, g), c = j(e)), e ? a = c && c.normalize ? c.normalize(a, h(g)) : f(a, g) : (a = f(a, g), d = k(a), e = d[0], a = d[1], e && (c = j(e))), {
                                f: e ? e + "!" + a : a,
                                n: a,
                                pr: e,
                                p: c
                            }
                        }, q = {
                            require: function(a) {
                                return g(a)
                            },
                            exports: function(a) {
                                var b = r[a];
                                return void 0 !== b ? b : r[a] = {}
                            },
                            module: function(a) {
                                return {
                                    id: a,
                                    uri: "",
                                    exports: r[a],
                                    config: m(a)
                                }
                            }
                        }, n = function(a, c, d, f) {
                            var h, k, m, n, o, t, v, w = [],
                                x = typeof d;
                            if (f = f || a, t = l(f), "undefined" === x || "function" === x) {
                                for (c = !c.length && d.length ? ["require", "exports", "module"] : c, o = 0; o < c.length; o += 1)
                                    if (n = p(c[o], t), "require" === (k = n.f)) w[o] = q.require(a);
                                    else if ("exports" === k) w[o] = q.exports(a), v = !0;
                                else if ("module" === k) h = w[o] = q.module(a);
                                else if (e(r, k) || e(s, k) || e(u, k)) w[o] = j(k);
                                else {
                                    if (!n.p) throw new Error(a + " missing " + k);
                                    n.p.load(n.n, g(f, !0), i(k), {}), w[o] = r[k]
                                }
                                m = d ? d.apply(r[a], w) : void 0, a && (h && h.exports !== b && h.exports !== r[a] ? r[a] = h.exports : m === b && v || (r[a] = m))
                            } else a && (r[a] = d)
                        }, a = c = o = function(a, c, d, e, f) {
                            if ("string" == typeof a) return q[a] ? q[a](c) : j(p(a, l(c)).f);
                            if (!a.splice) {
                                if (t = a, t.deps && o(t.deps, t.callback), !c) return;
                                c.splice ? (a = c, c = d, d = null) : a = b
                            }
                            return c = c || function() {}, "function" == typeof d && (d = e, e = f), e ? n(b, a, c, d) : setTimeout(function() {
                                n(b, a, c, d)
                            }, 4), o
                        }, o.config = function(a) {
                            return o(a)
                        }, a._defined = r, d = function(a, b, c) {
                            if ("string" != typeof a) throw new Error("See almond README: incorrect module build, no module name");
                            b.splice || (c = b, b = []), e(r, a) || e(s, a) || (s[a] = [a, b, c])
                        }, d.amd = {
                            jQuery: !0
                        }
                    }(), b.requirejs = a, b.require = c, b.define = d
                }
            }(), b.define("almond", function() {}), b.define("jquery", [], function() {
                var b = a || $;
                return null == b && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), b
            }), b.define("select2/utils", ["jquery"], function(a) {
                function b(a) {
                    var b = a.prototype,
                        c = [];
                    for (var d in b) {
                        "function" == typeof b[d] && ("constructor" !== d && c.push(d))
                    }
                    return c
                }
                var c = {};
                c.Extend = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    var d = {}.hasOwnProperty;
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                }, c.Decorate = function(a, c) {
                    function d() {
                        var b = Array.prototype.unshift,
                            d = c.prototype.constructor.length,
                            e = a.prototype.constructor;
                        d > 0 && (b.call(arguments, a.prototype.constructor), e = c.prototype.constructor), e.apply(this, arguments)
                    }

                    function e() {
                        this.constructor = d
                    }
                    var f = b(c),
                        g = b(a);
                    c.displayName = a.displayName, d.prototype = new e;
                    for (var h = 0; h < g.length; h++) {
                        var i = g[h];
                        d.prototype[i] = a.prototype[i]
                    }
                    for (var j = (function(a) {
                            var b = function() {};
                            a in d.prototype && (b = d.prototype[a]);
                            var e = c.prototype[a];
                            return function() {
                                return Array.prototype.unshift.call(arguments, b), e.apply(this, arguments)
                            }
                        }), k = 0; k < f.length; k++) {
                        var l = f[k];
                        d.prototype[l] = j(l)
                    }
                    return d
                };
                var d = function() {
                    this.listeners = {}
                };
                d.prototype.on = function(a, b) {
                    this.listeners = this.listeners || {}, a in this.listeners ? this.listeners[a].push(b) : this.listeners[a] = [b]
                }, d.prototype.trigger = function(a) {
                    var b = Array.prototype.slice,
                        c = b.call(arguments, 1);
                    this.listeners = this.listeners || {}, null == c && (c = []), 0 === c.length && c.push({}), c[0]._type = a, a in this.listeners && this.invoke(this.listeners[a], b.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments)
                }, d.prototype.invoke = function(a, b) {
                    for (var c = 0, d = a.length; c < d; c++) a[c].apply(this, b)
                }, c.Observable = d, c.generateChars = function(a) {
                    for (var b = "", c = 0; c < a; c++) {
                        b += Math.floor(36 * Math.random()).toString(36)
                    }
                    return b
                }, c.bind = function(a, b) {
                    return function() {
                        a.apply(b, arguments)
                    }
                }, c._convertData = function(a) {
                    for (var b in a) {
                        var c = b.split("-"),
                            d = a;
                        if (1 !== c.length) {
                            for (var e = 0; e < c.length; e++) {
                                var f = c[e];
                                f = f.substring(0, 1).toLowerCase() + f.substring(1), f in d || (d[f] = {}), e == c.length - 1 && (d[f] = a[b]), d = d[f]
                            }
                            delete a[b]
                        }
                    }
                    return a
                }, c.hasScroll = function(b, c) {
                    var d = a(c),
                        e = c.style.overflowX,
                        f = c.style.overflowY;
                    return (e !== f || "hidden" !== f && "visible" !== f) && ("scroll" === e || "scroll" === f || (d.innerHeight() < c.scrollHeight || d.innerWidth() < c.scrollWidth))
                }, c.escapeMarkup = function(a) {
                    var b = {
                        "\\": "&#92;",
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;",
                        "/": "&#47;"
                    };
                    return "string" != typeof a ? a : String(a).replace(/[&<>"'\/\\]/g, function(a) {
                        return b[a]
                    })
                }, c.appendMany = function(b, c) {
                    if ("1.7" === a.fn.jquery.substr(0, 3)) {
                        var d = a();
                        a.map(c, function(a) {
                            d = d.add(a)
                        }), c = d
                    }
                    b.append(c)
                }, c.__cache = {};
                var e = 0;
                return c.GetUniqueElementId = function(a) {
                    var b = a.getAttribute("data-select2-id");
                    return null == b && (a.id ? (b = a.id, a.setAttribute("data-select2-id", b)) : (a.setAttribute("data-select2-id", ++e), b = e.toString())), b
                }, c.StoreData = function(a, b, d) {
                    var e = c.GetUniqueElementId(a);
                    c.__cache[e] || (c.__cache[e] = {}), c.__cache[e][b] = d
                }, c.GetData = function(b, d) {
                    var e = c.GetUniqueElementId(b);
                    return d ? c.__cache[e] && null != c.__cache[e][d] ? c.__cache[e][d] : a(b).data(d) : c.__cache[e]
                }, c.RemoveData = function(a) {
                    var b = c.GetUniqueElementId(a);
                    null != c.__cache[b] && delete c.__cache[b]
                }, c
            }), b.define("select2/results", ["jquery", "./utils"], function(a, b) {
                function c(a, b, d) {
                    this.$element = a, this.data = d, this.options = b, c.__super__.constructor.call(this)
                }
                return b.Extend(c, b.Observable), c.prototype.render = function() {
                    var b = a('<ul class="select2-results__options" role="tree"></ul>');
                    return this.options.get("multiple") && b.attr("aria-multiselectable", "true"), this.$results = b, b
                }, c.prototype.clear = function() {
                    this.$results.empty()
                }, c.prototype.displayMessage = function(b) {
                    var c = this.options.get("escapeMarkup");
                    this.clear(), this.hideLoading();
                    var d = a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),
                        e = this.options.get("translations").get(b.message);
                    d.append(c(e(b.args))), d[0].className += " select2-results__message", this.$results.append(d)
                }, c.prototype.hideMessages = function() {
                    this.$results.find(".select2-results__message").remove()
                }, c.prototype.append = function(a) {
                    this.hideLoading();
                    var b = [];
                    if (null == a.results || 0 === a.results.length) return void(0 === this.$results.children().length && this.trigger("results:message", {
                        message: "noResults"
                    }));
                    a.results = this.sort(a.results);
                    for (var c = 0; c < a.results.length; c++) {
                        var d = a.results[c],
                            e = this.option(d);
                        b.push(e)
                    }
                    this.$results.append(b)
                }, c.prototype.position = function(a, b) {
                    b.find(".select2-results").append(a)
                }, c.prototype.sort = function(a) {
                    return this.options.get("sorter")(a)
                }, c.prototype.highlightFirstItem = function() {
                    var a = this.$results.find(".select2-results__option[aria-selected]"),
                        b = a.filter("[aria-selected=true]");
                    b.length > 0 ? b.first().trigger("mouseenter") : a.first().trigger("mouseenter"), this.ensureHighlightVisible()
                }, c.prototype.setClasses = function() {
                    var c = this;
                    this.data.current(function(d) {
                        var e = a.map(d, function(a) {
                            return a.id.toString()
                        });
                        c.$results.find(".select2-results__option[aria-selected]").each(function() {
                            var c = a(this),
                                d = b.GetData(this, "data"),
                                f = "" + d.id;
                            null != d.element && d.element.selected || null == d.element && a.inArray(f, e) > -1 ? c.attr("aria-selected", "true") : c.attr("aria-selected", "false")
                        })
                    })
                }, c.prototype.showLoading = function(a) {
                    this.hideLoading();
                    var b = this.options.get("translations").get("searching"),
                        c = {
                            disabled: !0,
                            loading: !0,
                            text: b(a)
                        },
                        d = this.option(c);
                    d.className += " loading-results", this.$results.prepend(d)
                }, c.prototype.hideLoading = function() {
                    this.$results.find(".loading-results").remove()
                }, c.prototype.option = function(c) {
                    var d = document.createElement("li");
                    d.className = "select2-results__option";
                    var e = {
                        role: "treeitem",
                        "aria-selected": "false"
                    };
                    c.disabled && (delete e["aria-selected"], e["aria-disabled"] = "true"), null == c.id && delete e["aria-selected"], null != c._resultId && (d.id = c._resultId), c.title && (d.title = c.title), c.children && (e.role = "group", e["aria-label"] = c.text, delete e["aria-selected"]);
                    for (var f in e) {
                        var g = e[f];
                        d.setAttribute(f, g)
                    }
                    if (c.children) {
                        var h = a(d),
                            i = document.createElement("strong");
                        i.className = "select2-results__group";
                        a(i);
                        this.template(c, i);
                        for (var j = [], k = 0; k < c.children.length; k++) {
                            var l = c.children[k],
                                m = this.option(l);
                            j.push(m)
                        }
                        var n = a("<ul></ul>", {
                            class: "select2-results__options select2-results__options--nested"
                        });
                        n.append(j), h.append(i), h.append(n)
                    } else this.template(c, d);
                    return b.StoreData(d, "data", c), d
                }, c.prototype.bind = function(c, d) {
                    var e = this,
                        f = c.id + "-results";
                    this.$results.attr("id", f), c.on("results:all", function(a) {
                        e.clear(), e.append(a.data), c.isOpen() && (e.setClasses(), e.highlightFirstItem())
                    }), c.on("results:append", function(a) {
                        e.append(a.data), c.isOpen() && e.setClasses()
                    }), c.on("query", function(a) {
                        e.hideMessages(), e.showLoading(a)
                    }), c.on("select", function() {
                        c.isOpen() && (e.setClasses(), e.highlightFirstItem())
                    }), c.on("unselect", function() {
                        c.isOpen() && (e.setClasses(), e.highlightFirstItem())
                    }), c.on("open", function() {
                        e.$results.attr("aria-expanded", "true"), e.$results.attr("aria-hidden", "false"), e.setClasses(), e.ensureHighlightVisible()
                    }), c.on("close", function() {
                        e.$results.attr("aria-expanded", "false"), e.$results.attr("aria-hidden", "true"), e.$results.removeAttr("aria-activedescendant")
                    }), c.on("results:toggle", function() {
                        var a = e.getHighlightedResults();
                        0 !== a.length && a.trigger("mouseup")
                    }), c.on("results:select", function() {
                        var a = e.getHighlightedResults();
                        if (0 !== a.length) {
                            var c = b.GetData(a[0], "data");
                            "true" == a.attr("aria-selected") ? e.trigger("close", {}) : e.trigger("select", {
                                data: c
                            })
                        }
                    }), c.on("results:previous", function() {
                        var a = e.getHighlightedResults(),
                            b = e.$results.find("[aria-selected]"),
                            c = b.index(a);
                        if (0 !== c) {
                            var d = c - 1;
                            0 === a.length && (d = 0);
                            var f = b.eq(d);
                            f.trigger("mouseenter");
                            var g = e.$results.offset().top,
                                h = f.offset().top,
                                i = e.$results.scrollTop() + (h - g);
                            0 === d ? e.$results.scrollTop(0) : h - g < 0 && e.$results.scrollTop(i)
                        }
                    }), c.on("results:next", function() {
                        var a = e.getHighlightedResults(),
                            b = e.$results.find("[aria-selected]"),
                            c = b.index(a),
                            d = c + 1;
                        if (!(d >= b.length)) {
                            var f = b.eq(d);
                            f.trigger("mouseenter");
                            var g = e.$results.offset().top + e.$results.outerHeight(!1),
                                h = f.offset().top + f.outerHeight(!1),
                                i = e.$results.scrollTop() + h - g;
                            0 === d ? e.$results.scrollTop(0) : h > g && e.$results.scrollTop(i)
                        }
                    }), c.on("results:focus", function(a) {
                        a.element.addClass("select2-results__option--highlighted")
                    }), c.on("results:message", function(a) {
                        e.displayMessage(a)
                    }), a.fn.mousewheel && this.$results.on("mousewheel", function(a) {
                        var b = e.$results.scrollTop(),
                            c = e.$results.get(0).scrollHeight - b + a.deltaY,
                            d = a.deltaY > 0 && b - a.deltaY <= 0,
                            f = a.deltaY < 0 && c <= e.$results.height();
                        d ? (e.$results.scrollTop(0), a.preventDefault(), a.stopPropagation()) : f && (e.$results.scrollTop(e.$results.get(0).scrollHeight - e.$results.height()), a.preventDefault(), a.stopPropagation())
                    }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function(c) {
                        var d = a(this),
                            f = b.GetData(this, "data");
                        if ("true" === d.attr("aria-selected")) return void(e.options.get("multiple") ? e.trigger("unselect", {
                            originalEvent: c,
                            data: f
                        }) : e.trigger("close", {}));
                        e.trigger("select", {
                            originalEvent: c,
                            data: f
                        })
                    }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function(c) {
                        var d = b.GetData(this, "data");
                        e.getHighlightedResults().removeClass("select2-results__option--highlighted"), e.trigger("results:focus", {
                            data: d,
                            element: a(this)
                        })
                    })
                }, c.prototype.getHighlightedResults = function() {
                    return this.$results.find(".select2-results__option--highlighted")
                }, c.prototype.destroy = function() {
                    this.$results.remove()
                }, c.prototype.ensureHighlightVisible = function() {
                    var a = this.getHighlightedResults();
                    if (0 !== a.length) {
                        var b = this.$results.find("[aria-selected]"),
                            c = b.index(a),
                            d = this.$results.offset().top,
                            e = a.offset().top,
                            f = this.$results.scrollTop() + (e - d),
                            g = e - d;
                        f -= 2 * a.outerHeight(!1), c <= 2 ? this.$results.scrollTop(0) : (g > this.$results.outerHeight() || g < 0) && this.$results.scrollTop(f)
                    }
                }, c.prototype.template = function(b, c) {
                    var d = this.options.get("templateResult"),
                        e = this.options.get("escapeMarkup"),
                        f = d(b, c);
                    null == f ? c.style.display = "none" : "string" == typeof f ? c.innerHTML = e(f) : a(c).append(f)
                }, c
            }), b.define("select2/keys", [], function() {
                return {
                    BACKSPACE: 8,
                    TAB: 9,
                    ENTER: 13,
                    SHIFT: 16,
                    CTRL: 17,
                    ALT: 18,
                    ESC: 27,
                    SPACE: 32,
                    PAGE_UP: 33,
                    PAGE_DOWN: 34,
                    END: 35,
                    HOME: 36,
                    LEFT: 37,
                    UP: 38,
                    RIGHT: 39,
                    DOWN: 40,
                    DELETE: 46
                }
            }), b.define("select2/selection/base", ["jquery", "../utils", "../keys"], function(a, b, c) {
                function d(a, b) {
                    this.$element = a, this.options = b, d.__super__.constructor.call(this)
                }
                return b.Extend(d, b.Observable), d.prototype.render = function() {
                    var c = a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
                    return this._tabindex = 0, null != b.GetData(this.$element[0], "old-tabindex") ? this._tabindex = b.GetData(this.$element[0], "old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), c.attr("title", this.$element.attr("title")), c.attr("tabindex", this._tabindex), this.$selection = c, c
                }, d.prototype.bind = function(a, b) {
                    var d = this,
                        e = (a.id, a.id + "-results");
                    this.container = a, this.$selection.on("focus", function(a) {
                        d.trigger("focus", a)
                    }), this.$selection.on("blur", function(a) {
                        d._handleBlur(a)
                    }), this.$selection.on("keydown", function(a) {
                        d.trigger("keypress", a), a.which === c.SPACE && a.preventDefault()
                    }), a.on("results:focus", function(a) {
                        d.$selection.attr("aria-activedescendant", a.data._resultId)
                    }), a.on("selection:update", function(a) {
                        d.update(a.data)
                    }), a.on("open", function() {
                        d.$selection.attr("aria-expanded", "true"), d.$selection.attr("aria-owns", e), d._attachCloseHandler(a)
                    }), a.on("close", function() {
                        d.$selection.attr("aria-expanded", "false"), d.$selection.removeAttr("aria-activedescendant"), d.$selection.removeAttr("aria-owns"), d.$selection.focus(), d._detachCloseHandler(a)
                    }), a.on("enable", function() {
                        d.$selection.attr("tabindex", d._tabindex)
                    }), a.on("disable", function() {
                        d.$selection.attr("tabindex", "-1")
                    })
                }, d.prototype._handleBlur = function(b) {
                    var c = this;
                    window.setTimeout(function() {
                        document.activeElement == c.$selection[0] || a.contains(c.$selection[0], document.activeElement) || c.trigger("blur", b)
                    }, 1)
                }, d.prototype._attachCloseHandler = function(c) {
                    a(document.body).on("mousedown.select2." + c.id, function(c) {
                        var d = a(c.target),
                            e = d.closest(".select2");
                        a(".select2.select2-container--open").each(function() {
                            a(this), this != e[0] && b.GetData(this, "element").select2("close")
                        })
                    })
                }, d.prototype._detachCloseHandler = function(b) {
                    a(document.body).off("mousedown.select2." + b.id)
                }, d.prototype.position = function(a, b) {
                    b.find(".selection").append(a)
                }, d.prototype.destroy = function() {
                    this._detachCloseHandler(this.container)
                }, d.prototype.update = function(a) {
                    throw new Error("The `update` method must be defined in child classes.")
                }, d
            }), b.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function(a, b, c, d) {
                function e() {
                    e.__super__.constructor.apply(this, arguments)
                }
                return c.Extend(e, b), e.prototype.render = function() {
                    var a = e.__super__.render.call(this);
                    return a.addClass("select2-selection--single"), a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), a
                }, e.prototype.bind = function(a, b) {
                    var c = this;
                    e.__super__.bind.apply(this, arguments);
                    var d = a.id + "-container";
                    this.$selection.find(".select2-selection__rendered").attr("id", d).attr("role", "textbox").attr("aria-readonly", "true"), this.$selection.attr("aria-labelledby", d), this.$selection.on("mousedown", function(a) {
                        1 === a.which && c.trigger("toggle", {
                            originalEvent: a
                        })
                    }), this.$selection.on("focus", function(a) {}), this.$selection.on("blur", function(a) {}), a.on("focus", function(b) {
                        a.isOpen() || c.$selection.focus()
                    })
                }, e.prototype.clear = function() {
                    var a = this.$selection.find(".select2-selection__rendered");
                    a.empty(), a.removeAttr("title")
                }, e.prototype.display = function(a, b) {
                    var c = this.options.get("templateSelection");
                    return this.options.get("escapeMarkup")(c(a, b))
                }, e.prototype.selectionContainer = function() {
                    return a("<span></span>")
                }, e.prototype.update = function(a) {
                    if (0 === a.length) return void this.clear();
                    var b = a[0],
                        c = this.$selection.find(".select2-selection__rendered"),
                        d = this.display(b, c);
                    c.empty().append(d), c.attr("title", b.title || b.text)
                }, e
            }), b.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function(a, b, c) {
                function d(a, b) {
                    d.__super__.constructor.apply(this, arguments)
                }
                return c.Extend(d, b), d.prototype.render = function() {
                    var a = d.__super__.render.call(this);
                    return a.addClass("select2-selection--multiple"), a.html('<ul class="select2-selection__rendered"></ul>'), a
                }, d.prototype.bind = function(b, e) {
                    var f = this;
                    d.__super__.bind.apply(this, arguments), this.$selection.on("click", function(a) {
                        f.trigger("toggle", {
                            originalEvent: a
                        })
                    }), this.$selection.on("click", ".select2-selection__choice__remove", function(b) {
                        if (!f.options.get("disabled")) {
                            var d = a(this),
                                e = d.parent(),
                                g = c.GetData(e[0], "data");
                            f.trigger("unselect", {
                                originalEvent: b,
                                data: g
                            })
                        }
                    })
                }, d.prototype.clear = function() {
                    var a = this.$selection.find(".select2-selection__rendered");
                    a.empty(), a.removeAttr("title")
                }, d.prototype.display = function(a, b) {
                    var c = this.options.get("templateSelection");
                    return this.options.get("escapeMarkup")(c(a, b))
                }, d.prototype.selectionContainer = function() {
                    return a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>')
                }, d.prototype.update = function(a) {
                    if (this.clear(), 0 !== a.length) {
                        for (var b = [], d = 0; d < a.length; d++) {
                            var e = a[d],
                                f = this.selectionContainer(),
                                g = this.display(e, f);
                            f.append(g), f.attr("title", e.title || e.text), c.StoreData(f[0], "data", e), b.push(f)
                        }
                        var h = this.$selection.find(".select2-selection__rendered");
                        c.appendMany(h, b)
                    }
                }, d
            }), b.define("select2/selection/placeholder", ["../utils"], function(a) {
                function b(a, b, c) {
                    this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c)
                }
                return b.prototype.normalizePlaceholder = function(a, b) {
                    return "string" == typeof b && (b = {
                        id: "",
                        text: b
                    }), b
                }, b.prototype.createPlaceholder = function(a, b) {
                    var c = this.selectionContainer();
                    return c.html(this.display(b)), c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), c
                }, b.prototype.update = function(a, b) {
                    var c = 1 == b.length && b[0].id != this.placeholder.id;
                    if (b.length > 1 || c) return a.call(this, b);
                    this.clear();
                    var d = this.createPlaceholder(this.placeholder);
                    this.$selection.find(".select2-selection__rendered").append(d)
                }, b
            }), b.define("select2/selection/allowClear", ["jquery", "../keys", "../utils"], function(a, b, c) {
                function d() {}
                return d.prototype.bind = function(a, b, c) {
                    var d = this;
                    a.call(this, b, c), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function(a) {
                        d._handleClear(a)
                    }), b.on("keypress", function(a) {
                        d._handleKeyboardClear(a, b)
                    })
                }, d.prototype._handleClear = function(a, b) {
                    if (!this.options.get("disabled")) {
                        var d = this.$selection.find(".select2-selection__clear");
                        if (0 !== d.length) {
                            b.stopPropagation();
                            var e = c.GetData(d[0], "data"),
                                f = this.$element.val();
                            this.$element.val(this.placeholder.id);
                            var g = {
                                data: e
                            };
                            if (this.trigger("clear", g), g.prevented) return void this.$element.val(f);
                            for (var h = 0; h < e.length; h++)
                                if (g = {
                                        data: e[h]
                                    }, this.trigger("unselect", g), g.prevented) return void this.$element.val(f);
                            this.$element.trigger("change"), this.trigger("toggle", {})
                        }
                    }
                }, d.prototype._handleKeyboardClear = function(a, c, d) {
                    d.isOpen() || c.which != b.DELETE && c.which != b.BACKSPACE || this._handleClear(c)
                }, d.prototype.update = function(b, d) {
                    if (b.call(this, d), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === d.length)) {
                        var e = a('<span class="select2-selection__clear">&times;</span>');
                        c.StoreData(e[0], "data", d), this.$selection.find(".select2-selection__rendered").prepend(e)
                    }
                }, d
            }), b.define("select2/selection/search", ["jquery", "../utils", "../keys"], function(a, b, c) {
                function d(a, b, c) {
                    a.call(this, b, c)
                }
                return d.prototype.render = function(b) {
                    var c = a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');
                    this.$searchContainer = c, this.$search = c.find("input");
                    var d = b.call(this);
                    return this._transferTabIndex(), d
                }, d.prototype.bind = function(a, d, e) {
                    var f = this;
                    a.call(this, d, e), d.on("open", function() {
                        f.$search.trigger("focus")
                    }), d.on("close", function() {
                        f.$search.val(""), f.$search.removeAttr("aria-activedescendant"), f.$search.trigger("focus")
                    }), d.on("enable", function() {
                        f.$search.prop("disabled", !1), f._transferTabIndex()
                    }), d.on("disable", function() {
                        f.$search.prop("disabled", !0)
                    }), d.on("focus", function(a) {
                        f.$search.trigger("focus")
                    }), d.on("results:focus", function(a) {
                        f.$search.attr("aria-activedescendant", a.id)
                    }), this.$selection.on("focusin", ".select2-search--inline", function(a) {
                        f.trigger("focus", a)
                    }), this.$selection.on("focusout", ".select2-search--inline", function(a) {
                        f._handleBlur(a)
                    }), this.$selection.on("keydown", ".select2-search--inline", function(a) {
                        if (a.stopPropagation(), f.trigger("keypress", a), f._keyUpPrevented = a.isDefaultPrevented(), a.which === c.BACKSPACE && "" === f.$search.val()) {
                            var d = f.$searchContainer.prev(".select2-selection__choice");
                            if (d.length > 0) {
                                var e = b.GetData(d[0], "data");
                                f.searchRemoveChoice(e), a.preventDefault()
                            }
                        }
                    });
                    var g = document.documentMode,
                        h = g && g <= 11;
                    this.$selection.on("input.searchcheck", ".select2-search--inline", function(a) {
                        if (h) return void f.$selection.off("input.search input.searchcheck");
                        f.$selection.off("keyup.search")
                    }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function(a) {
                        if (h && "input" === a.type) return void f.$selection.off("input.search input.searchcheck");
                        var b = a.which;
                        b != c.SHIFT && b != c.CTRL && b != c.ALT && b != c.TAB && f.handleSearch(a)
                    })
                }, d.prototype._transferTabIndex = function(a) {
                    this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1")
                }, d.prototype.createPlaceholder = function(a, b) {
                    this.$search.attr("placeholder", b.text)
                }, d.prototype.update = function(a, b) {
                    var c = this.$search[0] == document.activeElement;
                    this.$search.attr("placeholder", ""), a.call(this, b), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), c && this.$search.focus()
                }, d.prototype.handleSearch = function() {
                    if (this.resizeSearch(), !this._keyUpPrevented) {
                        var a = this.$search.val();
                        this.trigger("query", {
                            term: a
                        })
                    }
                    this._keyUpPrevented = !1
                }, d.prototype.searchRemoveChoice = function(a, b) {
                    this.trigger("unselect", {
                        data: b
                    }), this.$search.val(b.text), this.handleSearch()
                }, d.prototype.resizeSearch = function() {
                    this.$search.css("width", "25px");
                    var a = "";
                    if ("" !== this.$search.attr("placeholder")) a = this.$selection.find(".select2-selection__rendered").innerWidth();
                    else {
                        a = .75 * (this.$search.val().length + 1) + "em"
                    }
                    this.$search.css("width", a)
                }, d
            }), b.define("select2/selection/eventRelay", ["jquery"], function(a) {
                function b() {}
                return b.prototype.bind = function(b, c, d) {
                    var e = this,
                        f = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting", "clear", "clearing"],
                        g = ["opening", "closing", "selecting", "unselecting", "clearing"];
                    b.call(this, c, d), c.on("*", function(b, c) {
                        if (-1 !== a.inArray(b, f)) {
                            c = c || {};
                            var d = a.Event("select2:" + b, {
                                params: c
                            });
                            e.$element.trigger(d), -1 !== a.inArray(b, g) && (c.prevented = d.isDefaultPrevented())
                        }
                    })
                }, b
            }), b.define("select2/translation", ["jquery", "require"], function(a, b) {
                function c(a) {
                    this.dict = a || {}
                }
                return c.prototype.all = function() {
                    return this.dict
                }, c.prototype.get = function(a) {
                    return this.dict[a]
                }, c.prototype.extend = function(b) {
                    this.dict = a.extend({}, b.all(), this.dict)
                }, c._cache = {}, c.loadPath = function(a) {
                    if (!(a in c._cache)) {
                        var d = b(a);
                        c._cache[a] = d
                    }
                    return new c(c._cache[a])
                }, c
            }), b.define("select2/diacritics", [], function() {
                return {
                    "â’¶": "A",
                    "ï¼¡": "A",
                    "Ã€": "A",
                    "Ã": "A",
                    "Ã‚": "A",
                    "áº¦": "A",
                    "áº¤": "A",
                    "áºª": "A",
                    "áº¨": "A",
                    "Ãƒ": "A",
                    "Ä€": "A",
                    "Ä‚": "A",
                    "áº°": "A",
                    "áº®": "A",
                    "áº´": "A",
                    "áº²": "A",
                    "È¦": "A",
                    "Ç ": "A",
                    "Ã„": "A",
                    "Çž": "A",
                    "áº¢": "A",
                    "Ã…": "A",
                    "Çº": "A",
                    "Ç": "A",
                    "È€": "A",
                    "È‚": "A",
                    "áº ": "A",
                    "áº¬": "A",
                    "áº¶": "A",
                    "á¸€": "A",
                    "Ä„": "A",
                    "Èº": "A",
                    "â±¯": "A",
                    "êœ²": "AA",
                    "Ã†": "AE",
                    "Ç¼": "AE",
                    "Ç¢": "AE",
                    "êœ´": "AO",
                    "êœ¶": "AU",
                    "êœ¸": "AV",
                    "êœº": "AV",
                    "êœ¼": "AY",
                    "â’·": "B",
                    "ï¼¢": "B",
                    "á¸‚": "B",
                    "á¸„": "B",
                    "á¸†": "B",
                    "Éƒ": "B",
                    "Æ‚": "B",
                    "Æ": "B",
                    "â’¸": "C",
                    "ï¼£": "C",
                    "Ä†": "C",
                    "Äˆ": "C",
                    "ÄŠ": "C",
                    "ÄŒ": "C",
                    "Ã‡": "C",
                    "á¸ˆ": "C",
                    "Æ‡": "C",
                    "È»": "C",
                    "êœ¾": "C",
                    "â’¹": "D",
                    "ï¼¤": "D",
                    "á¸Š": "D",
                    "ÄŽ": "D",
                    "á¸Œ": "D",
                    "á¸": "D",
                    "á¸’": "D",
                    "á¸Ž": "D",
                    "Ä": "D",
                    "Æ‹": "D",
                    "ÆŠ": "D",
                    "Æ‰": "D",
                    "ê¹": "D",
                    "Ç±": "DZ",
                    "Ç„": "DZ",
                    "Ç²": "Dz",
                    "Ç…": "Dz",
                    "â’º": "E",
                    "ï¼¥": "E",
                    "Ãˆ": "E",
                    "Ã‰": "E",
                    "ÃŠ": "E",
                    "á»€": "E",
                    "áº¾": "E",
                    "á»„": "E",
                    "á»‚": "E",
                    "áº¼": "E",
                    "Ä’": "E",
                    "á¸”": "E",
                    "á¸–": "E",
                    "Ä”": "E",
                    "Ä–": "E",
                    "Ã‹": "E",
                    "áºº": "E",
                    "Äš": "E",
                    "È„": "E",
                    "È†": "E",
                    "áº¸": "E",
                    "á»†": "E",
                    "È¨": "E",
                    "á¸œ": "E",
                    "Ä˜": "E",
                    "á¸˜": "E",
                    "á¸š": "E",
                    "Æ": "E",
                    "ÆŽ": "E",
                    "â’»": "F",
                    "ï¼¦": "F",
                    "á¸ž": "F",
                    "Æ‘": "F",
                    "ê»": "F",
                    "â’¼": "G",
                    "ï¼§": "G",
                    "Ç´": "G",
                    "Äœ": "G",
                    "á¸ ": "G",
                    "Äž": "G",
                    "Ä ": "G",
                    "Ç¦": "G",
                    "Ä¢": "G",
                    "Ç¤": "G",
                    "Æ“": "G",
                    "êž ": "G",
                    "ê½": "G",
                    "ê¾": "G",
                    "â’½": "H",
                    "ï¼¨": "H",
                    "Ä¤": "H",
                    "á¸¢": "H",
                    "á¸¦": "H",
                    "Èž": "H",
                    "á¸¤": "H",
                    "á¸¨": "H",
                    "á¸ª": "H",
                    "Ä¦": "H",
                    "â±§": "H",
                    "â±µ": "H",
                    "êž": "H",
                    "â’¾": "I",
                    "ï¼©": "I",
                    "ÃŒ": "I",
                    "Ã": "I",
                    "ÃŽ": "I",
                    "Ä¨": "I",
                    "Äª": "I",
                    "Ä¬": "I",
                    "Ä°": "I",
                    "Ã": "I",
                    "á¸®": "I",
                    "á»ˆ": "I",
                    "Ç": "I",
                    "Èˆ": "I",
                    "ÈŠ": "I",
                    "á»Š": "I",
                    "Ä®": "I",
                    "á¸¬": "I",
                    "Æ—": "I",
                    "â’¿": "J",
                    "ï¼ª": "J",
                    "Ä´": "J",
                    "Éˆ": "J",
                    "â“€": "K",
                    "ï¼«": "K",
                    "á¸°": "K",
                    "Ç¨": "K",
                    "á¸²": "K",
                    "Ä¶": "K",
                    "á¸´": "K",
                    "Æ˜": "K",
                    "â±©": "K",
                    "ê€": "K",
                    "ê‚": "K",
                    "ê„": "K",
                    "êž¢": "K",
                    "â“": "L",
                    "ï¼¬": "L",
                    "Ä¿": "L",
                    "Ä¹": "L",
                    "Ä½": "L",
                    "á¸¶": "L",
                    "á¸¸": "L",
                    "Ä»": "L",
                    "á¸¼": "L",
                    "á¸º": "L",
                    "Å": "L",
                    "È½": "L",
                    "â±¢": "L",
                    "â± ": "L",
                    "êˆ": "L",
                    "ê†": "L",
                    "êž€": "L",
                    "Ç‡": "LJ",
                    "Çˆ": "Lj",
                    "â“‚": "M",
                    "ï¼­": "M",
                    "á¸¾": "M",
                    "á¹€": "M",
                    "á¹‚": "M",
                    "â±®": "M",
                    "Æœ": "M",
                    "â“ƒ": "N",
                    "ï¼®": "N",
                    "Ç¸": "N",
                    "Åƒ": "N",
                    "Ã‘": "N",
                    "á¹„": "N",
                    "Å‡": "N",
                    "á¹†": "N",
                    "Å…": "N",
                    "á¹Š": "N",
                    "á¹ˆ": "N",
                    "È ": "N",
                    "Æ": "N",
                    "êž": "N",
                    "êž¤": "N",
                    "ÇŠ": "NJ",
                    "Ç‹": "Nj",
                    "â“„": "O",
                    "ï¼¯": "O",
                    "Ã’": "O",
                    "Ã“": "O",
                    "Ã”": "O",
                    "á»’": "O",
                    "á»": "O",
                    "á»–": "O",
                    "á»”": "O",
                    "Ã•": "O",
                    "á¹Œ": "O",
                    "È¬": "O",
                    "á¹Ž": "O",
                    "ÅŒ": "O",
                    "á¹": "O",
                    "á¹’": "O",
                    "ÅŽ": "O",
                    "È®": "O",
                    "È°": "O",
                    "Ã–": "O",
                    "Èª": "O",
                    "á»Ž": "O",
                    "Å": "O",
                    "Ç‘": "O",
                    "ÈŒ": "O",
                    "ÈŽ": "O",
                    "Æ ": "O",
                    "á»œ": "O",
                    "á»š": "O",
                    "á» ": "O",
                    "á»ž": "O",
                    "á»¢": "O",
                    "á»Œ": "O",
                    "á»˜": "O",
                    "Çª": "O",
                    "Ç¬": "O",
                    "Ã˜": "O",
                    "Ç¾": "O",
                    "Æ†": "O",
                    "ÆŸ": "O",
                    "êŠ": "O",
                    "êŒ": "O",
                    "Æ¢": "OI",
                    "êŽ": "OO",
                    "È¢": "OU",
                    "â“…": "P",
                    "ï¼°": "P",
                    "á¹”": "P",
                    "á¹–": "P",
                    "Æ¤": "P",
                    "â±£": "P",
                    "ê": "P",
                    "ê’": "P",
                    "ê”": "P",
                    "â“†": "Q",
                    "ï¼±": "Q",
                    "ê–": "Q",
                    "ê˜": "Q",
                    "ÉŠ": "Q",
                    "â“‡": "R",
                    "ï¼²": "R",
                    "Å”": "R",
                    "á¹˜": "R",
                    "Å˜": "R",
                    "È": "R",
                    "È’": "R",
                    "á¹š": "R",
                    "á¹œ": "R",
                    "Å–": "R",
                    "á¹ž": "R",
                    "ÉŒ": "R",
                    "â±¤": "R",
                    "êš": "R",
                    "êž¦": "R",
                    "êž‚": "R",
                    "â“ˆ": "S",
                    "ï¼³": "S",
                    "áºž": "S",
                    "Åš": "S",
                    "á¹¤": "S",
                    "Åœ": "S",
                    "á¹ ": "S",
                    "Å ": "S",
                    "á¹¦": "S",
                    "á¹¢": "S",
                    "á¹¨": "S",
                    "È˜": "S",
                    "Åž": "S",
                    "â±¾": "S",
                    "êž¨": "S",
                    "êž„": "S",
                    "â“‰": "T",
                    "ï¼´": "T",
                    "á¹ª": "T",
                    "Å¤": "T",
                    "á¹¬": "T",
                    "Èš": "T",
                    "Å¢": "T",
                    "á¹°": "T",
                    "á¹®": "T",
                    "Å¦": "T",
                    "Æ¬": "T",
                    "Æ®": "T",
                    "È¾": "T",
                    "êž†": "T",
                    "êœ¨": "TZ",
                    "â“Š": "U",
                    "ï¼µ": "U",
                    "Ã™": "U",
                    "Ãš": "U",
                    "Ã›": "U",
                    "Å¨": "U",
                    "á¹¸": "U",
                    "Åª": "U",
                    "á¹º": "U",
                    "Å¬": "U",
                    "Ãœ": "U",
                    "Ç›": "U",
                    "Ç—": "U",
                    "Ç•": "U",
                    "Ç™": "U",
                    "á»¦": "U",
                    "Å®": "U",
                    "Å°": "U",
                    "Ç“": "U",
                    "È”": "U",
                    "È–": "U",
                    "Æ¯": "U",
                    "á»ª": "U",
                    "á»¨": "U",
                    "á»®": "U",
                    "á»¬": "U",
                    "á»°": "U",
                    "á»¤": "U",
                    "á¹²": "U",
                    "Å²": "U",
                    "á¹¶": "U",
                    "á¹´": "U",
                    "É„": "U",
                    "â“‹": "V",
                    "ï¼¶": "V",
                    "á¹¼": "V",
                    "á¹¾": "V",
                    "Æ²": "V",
                    "êž": "V",
                    "É…": "V",
                    "ê ": "VY",
                    "â“Œ": "W",
                    "ï¼·": "W",
                    "áº€": "W",
                    "áº‚": "W",
                    "Å´": "W",
                    "áº†": "W",
                    "áº„": "W",
                    "áºˆ": "W",
                    "â±²": "W",
                    "â“": "X",
                    "ï¼¸": "X",
                    "áºŠ": "X",
                    "áºŒ": "X",
                    "â“Ž": "Y",
                    "ï¼¹": "Y",
                    "á»²": "Y",
                    "Ã": "Y",
                    "Å¶": "Y",
                    "á»¸": "Y",
                    "È²": "Y",
                    "áºŽ": "Y",
                    "Å¸": "Y",
                    "á»¶": "Y",
                    "á»´": "Y",
                    "Æ³": "Y",
                    "ÉŽ": "Y",
                    "á»¾": "Y",
                    "â“": "Z",
                    "ï¼º": "Z",
                    "Å¹": "Z",
                    "áº": "Z",
                    "Å»": "Z",
                    "Å½": "Z",
                    "áº’": "Z",
                    "áº”": "Z",
                    "Æµ": "Z",
                    "È¤": "Z",
                    "â±¿": "Z",
                    "â±«": "Z",
                    "ê¢": "Z",
                    "â“": "a",
                    "ï½": "a",
                    "áºš": "a",
                    "Ã ": "a",
                    "Ã¡": "a",
                    "Ã¢": "a",
                    "áº§": "a",
                    "áº¥": "a",
                    "áº«": "a",
                    "áº©": "a",
                    "Ã£": "a",
                    "Ä": "a",
                    "Äƒ": "a",
                    "áº±": "a",
                    "áº¯": "a",
                    "áºµ": "a",
                    "áº³": "a",
                    "È§": "a",
                    "Ç¡": "a",
                    "Ã¤": "a",
                    "ÇŸ": "a",
                    "áº£": "a",
                    "Ã¥": "a",
                    "Ç»": "a",
                    "ÇŽ": "a",
                    "È": "a",
                    "Èƒ": "a",
                    "áº¡": "a",
                    "áº­": "a",
                    "áº·": "a",
                    "á¸": "a",
                    "Ä…": "a",
                    "â±¥": "a",
                    "É": "a",
                    "êœ³": "aa",
                    "Ã¦": "ae",
                    "Ç½": "ae",
                    "Ç£": "ae",
                    "êœµ": "ao",
                    "êœ·": "au",
                    "êœ¹": "av",
                    "êœ»": "av",
                    "êœ½": "ay",
                    "â“‘": "b",
                    "ï½‚": "b",
                    "á¸ƒ": "b",
                    "á¸…": "b",
                    "á¸‡": "b",
                    "Æ€": "b",
                    "Æƒ": "b",
                    "É“": "b",
                    "â“’": "c",
                    "ï½ƒ": "c",
                    "Ä‡": "c",
                    "Ä‰": "c",
                    "Ä‹": "c",
                    "Ä": "c",
                    "Ã§": "c",
                    "á¸‰": "c",
                    "Æˆ": "c",
                    "È¼": "c",
                    "êœ¿": "c",
                    "â†„": "c",
                    "â““": "d",
                    "ï½„": "d",
                    "á¸‹": "d",
                    "Ä": "d",
                    "á¸": "d",
                    "á¸‘": "d",
                    "á¸“": "d",
                    "á¸": "d",
                    "Ä‘": "d",
                    "ÆŒ": "d",
                    "É–": "d",
                    "É—": "d",
                    "êº": "d",
                    "Ç³": "dz",
                    "Ç†": "dz",
                    "â“”": "e",
                    "ï½…": "e",
                    "Ã¨": "e",
                    "Ã©": "e",
                    "Ãª": "e",
                    "á»": "e",
                    "áº¿": "e",
                    "á»…": "e",
                    "á»ƒ": "e",
                    "áº½": "e",
                    "Ä“": "e",
                    "á¸•": "e",
                    "á¸—": "e",
                    "Ä•": "e",
                    "Ä—": "e",
                    "Ã«": "e",
                    "áº»": "e",
                    "Ä›": "e",
                    "È…": "e",
                    "È‡": "e",
                    "áº¹": "e",
                    "á»‡": "e",
                    "È©": "e",
                    "á¸": "e",
                    "Ä™": "e",
                    "á¸™": "e",
                    "á¸›": "e",
                    "É‡": "e",
                    "É›": "e",
                    "Ç": "e",
                    "â“•": "f",
                    "ï½†": "f",
                    "á¸Ÿ": "f",
                    "Æ’": "f",
                    "ê¼": "f",
                    "â“–": "g",
                    "ï½‡": "g",
                    "Çµ": "g",
                    "Ä": "g",
                    "á¸¡": "g",
                    "ÄŸ": "g",
                    "Ä¡": "g",
                    "Ç§": "g",
                    "Ä£": "g",
                    "Ç¥": "g",
                    "É ": "g",
                    "êž¡": "g",
                    "áµ¹": "g",
                    "ê¿": "g",
                    "â“—": "h",
                    "ï½ˆ": "h",
                    "Ä¥": "h",
                    "á¸£": "h",
                    "á¸§": "h",
                    "ÈŸ": "h",
                    "á¸¥": "h",
                    "á¸©": "h",
                    "á¸«": "h",
                    "áº–": "h",
                    "Ä§": "h",
                    "â±¨": "h",
                    "â±¶": "h",
                    "É¥": "h",
                    "Æ•": "hv",
                    "â“˜": "i",
                    "ï½‰": "i",
                    "Ã¬": "i",
                    "Ã­": "i",
                    "Ã®": "i",
                    "Ä©": "i",
                    "Ä«": "i",
                    "Ä­": "i",
                    "Ã¯": "i",
                    "á¸¯": "i",
                    "á»‰": "i",
                    "Ç": "i",
                    "È‰": "i",
                    "È‹": "i",
                    "á»‹": "i",
                    "Ä¯": "i",
                    "á¸­": "i",
                    "É¨": "i",
                    "Ä±": "i",
                    "â“™": "j",
                    "ï½Š": "j",
                    "Äµ": "j",
                    "Ç°": "j",
                    "É‰": "j",
                    "â“š": "k",
                    "ï½‹": "k",
                    "á¸±": "k",
                    "Ç©": "k",
                    "á¸³": "k",
                    "Ä·": "k",
                    "á¸µ": "k",
                    "Æ™": "k",
                    "â±ª": "k",
                    "ê": "k",
                    "êƒ": "k",
                    "ê…": "k",
                    "êž£": "k",
                    "â“›": "l",
                    "ï½Œ": "l",
                    "Å€": "l",
                    "Äº": "l",
                    "Ä¾": "l",
                    "á¸·": "l",
                    "á¸¹": "l",
                    "Ä¼": "l",
                    "á¸½": "l",
                    "á¸»": "l",
                    "Å¿": "l",
                    "Å‚": "l",
                    "Æš": "l",
                    "É«": "l",
                    "â±¡": "l",
                    "ê‰": "l",
                    "êž": "l",
                    "ê‡": "l",
                    "Ç‰": "lj",
                    "â“œ": "m",
                    "ï½": "m",
                    "á¸¿": "m",
                    "á¹": "m",
                    "á¹ƒ": "m",
                    "É±": "m",
                    "É¯": "m",
                    "â“": "n",
                    "ï½Ž": "n",
                    "Ç¹": "n",
                    "Å„": "n",
                    "Ã±": "n",
                    "á¹…": "n",
                    "Åˆ": "n",
                    "á¹‡": "n",
                    "Å†": "n",
                    "á¹‹": "n",
                    "á¹‰": "n",
                    "Æž": "n",
                    "É²": "n",
                    "Å‰": "n",
                    "êž‘": "n",
                    "êž¥": "n",
                    "ÇŒ": "nj",
                    "â“ž": "o",
                    "ï½": "o",
                    "Ã²": "o",
                    "Ã³": "o",
                    "Ã´": "o",
                    "á»“": "o",
                    "á»‘": "o",
                    "á»—": "o",
                    "á»•": "o",
                    "Ãµ": "o",
                    "á¹": "o",
                    "È­": "o",
                    "á¹": "o",
                    "Å": "o",
                    "á¹‘": "o",
                    "á¹“": "o",
                    "Å": "o",
                    "È¯": "o",
                    "È±": "o",
                    "Ã¶": "o",
                    "È«": "o",
                    "á»": "o",
                    "Å‘": "o",
                    "Ç’": "o",
                    "È": "o",
                    "È": "o",
                    "Æ¡": "o",
                    "á»": "o",
                    "á»›": "o",
                    "á»¡": "o",
                    "á»Ÿ": "o",
                    "á»£": "o",
                    "á»": "o",
                    "á»™": "o",
                    "Ç«": "o",
                    "Ç­": "o",
                    "Ã¸": "o",
                    "Ç¿": "o",
                    "É”": "o",
                    "ê‹": "o",
                    "ê": "o",
                    "Éµ": "o",
                    "Æ£": "oi",
                    "È£": "ou",
                    "ê": "oo",
                    "â“Ÿ": "p",
                    "ï½": "p",
                    "á¹•": "p",
                    "á¹—": "p",
                    "Æ¥": "p",
                    "áµ½": "p",
                    "ê‘": "p",
                    "ê“": "p",
                    "ê•": "p",
                    "â“ ": "q",
                    "ï½‘": "q",
                    "É‹": "q",
                    "ê—": "q",
                    "ê™": "q",
                    "â“¡": "r",
                    "ï½’": "r",
                    "Å•": "r",
                    "á¹™": "r",
                    "Å™": "r",
                    "È‘": "r",
                    "È“": "r",
                    "á¹›": "r",
                    "á¹": "r",
                    "Å—": "r",
                    "á¹Ÿ": "r",
                    "É": "r",
                    "É½": "r",
                    "ê›": "r",
                    "êž§": "r",
                    "êžƒ": "r",
                    "â“¢": "s",
                    "ï½“": "s",
                    "ÃŸ": "s",
                    "Å›": "s",
                    "á¹¥": "s",
                    "Å": "s",
                    "á¹¡": "s",
                    "Å¡": "s",
                    "á¹§": "s",
                    "á¹£": "s",
                    "á¹©": "s",
                    "È™": "s",
                    "ÅŸ": "s",
                    "È¿": "s",
                    "êž©": "s",
                    "êž…": "s",
                    "áº›": "s",
                    "â“£": "t",
                    "ï½”": "t",
                    "á¹«": "t",
                    "áº—": "t",
                    "Å¥": "t",
                    "á¹­": "t",
                    "È›": "t",
                    "Å£": "t",
                    "á¹±": "t",
                    "á¹¯": "t",
                    "Å§": "t",
                    "Æ­": "t",
                    "Êˆ": "t",
                    "â±¦": "t",
                    "êž‡": "t",
                    "êœ©": "tz",
                    "â“¤": "u",
                    "ï½•": "u",
                    "Ã¹": "u",
                    "Ãº": "u",
                    "Ã»": "u",
                    "Å©": "u",
                    "á¹¹": "u",
                    "Å«": "u",
                    "á¹»": "u",
                    "Å­": "u",
                    "Ã¼": "u",
                    "Çœ": "u",
                    "Ç˜": "u",
                    "Ç–": "u",
                    "Çš": "u",
                    "á»§": "u",
                    "Å¯": "u",
                    "Å±": "u",
                    "Ç”": "u",
                    "È•": "u",
                    "È—": "u",
                    "Æ°": "u",
                    "á»«": "u",
                    "á»©": "u",
                    "á»¯": "u",
                    "á»­": "u",
                    "á»±": "u",
                    "á»¥": "u",
                    "á¹³": "u",
                    "Å³": "u",
                    "á¹·": "u",
                    "á¹µ": "u",
                    "Ê‰": "u",
                    "â“¥": "v",
                    "ï½–": "v",
                    "á¹½": "v",
                    "á¹¿": "v",
                    "Ê‹": "v",
                    "êŸ": "v",
                    "ÊŒ": "v",
                    "ê¡": "vy",
                    "â“¦": "w",
                    "ï½—": "w",
                    "áº": "w",
                    "áºƒ": "w",
                    "Åµ": "w",
                    "áº‡": "w",
                    "áº…": "w",
                    "áº˜": "w",
                    "áº‰": "w",
                    "â±³": "w",
                    "â“§": "x",
                    "ï½˜": "x",
                    "áº‹": "x",
                    "áº": "x",
                    "â“¨": "y",
                    "ï½™": "y",
                    "á»³": "y",
                    "Ã½": "y",
                    "Å·": "y",
                    "á»¹": "y",
                    "È³": "y",
                    "áº": "y",
                    "Ã¿": "y",
                    "á»·": "y",
                    "áº™": "y",
                    "á»µ": "y",
                    "Æ´": "y",
                    "É": "y",
                    "á»¿": "y",
                    "â“©": "z",
                    "ï½š": "z",
                    "Åº": "z",
                    "áº‘": "z",
                    "Å¼": "z",
                    "Å¾": "z",
                    "áº“": "z",
                    "áº•": "z",
                    "Æ¶": "z",
                    "È¥": "z",
                    "É€": "z",
                    "â±¬": "z",
                    "ê£": "z",
                    "Î†": "Î‘",
                    "Îˆ": "Î•",
                    "Î‰": "Î—",
                    "ÎŠ": "Î™",
                    "Îª": "Î™",
                    "ÎŒ": "ÎŸ",
                    "ÎŽ": "Î¥",
                    "Î«": "Î¥",
                    "Î": "Î©",
                    "Î¬": "Î±",
                    "Î­": "Îµ",
                    "Î®": "Î·",
                    "Î¯": "Î¹",
                    "ÏŠ": "Î¹",
                    "Î": "Î¹",
                    "ÏŒ": "Î¿",
                    "Ï": "Ï…",
                    "Ï‹": "Ï…",
                    "Î°": "Ï…",
                    "Ï‰": "Ï‰",
                    "Ï‚": "Ïƒ"
                }
            }), b.define("select2/data/base", ["../utils"], function(a) {
                function b(a, c) {
                    b.__super__.constructor.call(this)
                }
                return a.Extend(b, a.Observable), b.prototype.current = function(a) {
                    throw new Error("The `current` method must be defined in child classes.")
                }, b.prototype.query = function(a, b) {
                    throw new Error("The `query` method must be defined in child classes.")
                }, b.prototype.bind = function(a, b) {}, b.prototype.destroy = function() {}, b.prototype.generateResultId = function(b, c) {
                    var d = b.id + "-result-";
                    return d += a.generateChars(4), null != c.id ? d += "-" + c.id.toString() : d += "-" + a.generateChars(4), d
                }, b
            }), b.define("select2/data/select", ["./base", "../utils", "jquery"], function(a, b, c) {
                function d(a, b) {
                    this.$element = a, this.options = b, d.__super__.constructor.call(this)
                }
                return b.Extend(d, a), d.prototype.current = function(a) {
                    var b = [],
                        d = this;
                    this.$element.find(":selected").each(function() {
                        var a = c(this),
                            e = d.item(a);
                        b.push(e)
                    }), a(b)
                }, d.prototype.select = function(a) {
                    var b = this;
                    if (a.selected = !0, c(a.element).is("option")) return a.element.selected = !0, void this.$element.trigger("change");
                    if (this.$element.prop("multiple")) this.current(function(d) {
                        var e = [];
                        a = [a], a.push.apply(a, d);
                        for (var f = 0; f < a.length; f++) {
                            var g = a[f].id; - 1 === c.inArray(g, e) && e.push(g)
                        }
                        b.$element.val(e), b.$element.trigger("change")
                    });
                    else {
                        var d = a.id;
                        this.$element.val(d), this.$element.trigger("change")
                    }
                }, d.prototype.unselect = function(a) {
                    var b = this;
                    if (this.$element.prop("multiple")) {
                        if (a.selected = !1, c(a.element).is("option")) return a.element.selected = !1, void this.$element.trigger("change");
                        this.current(function(d) {
                            for (var e = [], f = 0; f < d.length; f++) {
                                var g = d[f].id;
                                g !== a.id && -1 === c.inArray(g, e) && e.push(g)
                            }
                            b.$element.val(e), b.$element.trigger("change")
                        })
                    }
                }, d.prototype.bind = function(a, b) {
                    var c = this;
                    this.container = a, a.on("select", function(a) {
                        c.select(a.data)
                    }), a.on("unselect", function(a) {
                        c.unselect(a.data)
                    })
                }, d.prototype.destroy = function() {
                    this.$element.find("*").each(function() {
                        b.RemoveData(this)
                    })
                }, d.prototype.query = function(a, b) {
                    var d = [],
                        e = this;
                    this.$element.children().each(function() {
                        var b = c(this);
                        if (b.is("option") || b.is("optgroup")) {
                            var f = e.item(b),
                                g = e.matches(a, f);
                            null !== g && d.push(g)
                        }
                    }), b({
                        results: d
                    })
                }, d.prototype.addOptions = function(a) {
                    b.appendMany(this.$element, a)
                }, d.prototype.option = function(a) {
                    var d;
                    a.children ? (d = document.createElement("optgroup"), d.label = a.text) : (d = document.createElement("option"), void 0 !== d.textContent ? d.textContent = a.text : d.innerText = a.text), void 0 !== a.id && (d.value = a.id), a.disabled && (d.disabled = !0), a.selected && (d.selected = !0), a.title && (d.title = a.title);
                    var e = c(d),
                        f = this._normalizeItem(a);
                    return f.element = d, b.StoreData(d, "data", f), e
                }, d.prototype.item = function(a) {
                    var d = {};
                    if (null != (d = b.GetData(a[0], "data"))) return d;
                    if (a.is("option")) d = {
                        id: a.val(),
                        text: a.text(),
                        disabled: a.prop("disabled"),
                        selected: a.prop("selected"),
                        title: a.prop("title")
                    };
                    else if (a.is("optgroup")) {
                        d = {
                            text: a.prop("label"),
                            children: [],
                            title: a.prop("title")
                        };
                        for (var e = a.children("option"), f = [], g = 0; g < e.length; g++) {
                            var h = c(e[g]),
                                i = this.item(h);
                            f.push(i)
                        }
                        d.children = f
                    }
                    return d = this._normalizeItem(d), d.element = a[0], b.StoreData(a[0], "data", d), d
                }, d.prototype._normalizeItem = function(a) {
                    a !== Object(a) && (a = {
                        id: a,
                        text: a
                    }), a = c.extend({}, {
                        text: ""
                    }, a);
                    var b = {
                        selected: !1,
                        disabled: !1
                    };
                    return null != a.id && (a.id = a.id.toString()), null != a.text && (a.text = a.text.toString()), null == a._resultId && a.id && null != this.container && (a._resultId = this.generateResultId(this.container, a)), c.extend({}, b, a)
                }, d.prototype.matches = function(a, b) {
                    return this.options.get("matcher")(a, b)
                }, d
            }), b.define("select2/data/array", ["./select", "../utils", "jquery"], function(a, b, c) {
                function d(a, b) {
                    var c = b.get("data") || [];
                    d.__super__.constructor.call(this, a, b), this.addOptions(this.convertToOptions(c))
                }
                return b.Extend(d, a), d.prototype.select = function(a) {
                    var b = this.$element.find("option").filter(function(b, c) {
                        return c.value == a.id.toString()
                    });
                    0 === b.length && (b = this.option(a), this.addOptions(b)), d.__super__.select.call(this, a)
                }, d.prototype.convertToOptions = function(a) {
                    function d(a) {
                        return function() {
                            return c(this).val() == a.id
                        }
                    }
                    for (var e = this, f = this.$element.find("option"), g = f.map(function() {
                            return e.item(c(this)).id
                        }).get(), h = [], i = 0; i < a.length; i++) {
                        var j = this._normalizeItem(a[i]);
                        if (c.inArray(j.id, g) >= 0) {
                            var k = f.filter(d(j)),
                                l = this.item(k),
                                m = c.extend(!0, {}, j, l),
                                n = this.option(m);
                            k.replaceWith(n)
                        } else {
                            var o = this.option(j);
                            if (j.children) {
                                var p = this.convertToOptions(j.children);
                                b.appendMany(o, p)
                            }
                            h.push(o)
                        }
                    }
                    return h
                }, d
            }), b.define("select2/data/ajax", ["./array", "../utils", "jquery"], function(a, b, c) {
                function d(a, b) {
                    this.ajaxOptions = this._applyDefaults(b.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), d.__super__.constructor.call(this, a, b)
                }
                return b.Extend(d, a), d.prototype._applyDefaults = function(a) {
                    var b = {
                        data: function(a) {
                            return c.extend({}, a, {
                                q: a.term
                            })
                        },
                        transport: function(a, b, d) {
                            var e = c.ajax(a);
                            return e.then(b), e.fail(d), e
                        }
                    };
                    return c.extend({}, b, a, !0)
                }, d.prototype.processResults = function(a) {
                    return a
                }, d.prototype.query = function(a, b) {
                    function d() {
                        var d = f.transport(f, function(d) {
                            var f = e.processResults(d, a);
                            e.options.get("debug") && window.console && console.error && (f && f.results && c.isArray(f.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), b(f)
                        }, function() {
                            "status" in d && (0 === d.status || "0" === d.status) || e.trigger("results:message", {
                                message: "errorLoading"
                            })
                        });
                        e._request = d
                    }
                    var e = this;
                    null != this._request && (c.isFunction(this._request.abort) && this._request.abort(), this._request = null);
                    var f = c.extend({
                        type: "GET"
                    }, this.ajaxOptions);
                    "function" == typeof f.url && (f.url = f.url.call(this.$element, a)), "function" == typeof f.data && (f.data = f.data.call(this.$element, a)), this.ajaxOptions.delay && null != a.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(d, this.ajaxOptions.delay)) : d()
                }, d
            }), b.define("select2/data/tags", ["jquery"], function(a) {
                function b(b, c, d) {
                    var e = d.get("tags"),
                        f = d.get("createTag");
                    void 0 !== f && (this.createTag = f);
                    var g = d.get("insertTag");
                    if (void 0 !== g && (this.insertTag = g), b.call(this, c, d), a.isArray(e))
                        for (var h = 0; h < e.length; h++) {
                            var i = e[h],
                                j = this._normalizeItem(i),
                                k = this.option(j);
                            this.$element.append(k)
                        }
                }
                return b.prototype.query = function(a, b, c) {
                    function d(a, f) {
                        for (var g = a.results, h = 0; h < g.length; h++) {
                            var i = g[h],
                                j = null != i.children && !d({
                                    results: i.children
                                }, !0);
                            if ((i.text || "").toUpperCase() === (b.term || "").toUpperCase() || j) return !f && (a.data = g, void c(a))
                        }
                        if (f) return !0;
                        var k = e.createTag(b);
                        if (null != k) {
                            var l = e.option(k);
                            l.attr("data-select2-tag", !0), e.addOptions([l]), e.insertTag(g, k)
                        }
                        a.results = g, c(a)
                    }
                    var e = this;
                    if (this._removeOldTags(), null == b.term || null != b.page) return void a.call(this, b, c);
                    a.call(this, b, d)
                }, b.prototype.createTag = function(b, c) {
                    var d = a.trim(c.term);
                    return "" === d ? null : {
                        id: d,
                        text: d
                    }
                }, b.prototype.insertTag = function(a, b, c) {
                    b.unshift(c)
                }, b.prototype._removeOldTags = function(b) {
                    this._lastTag;
                    this.$element.find("option[data-select2-tag]").each(function() {
                        this.selected || a(this).remove()
                    })
                }, b
            }), b.define("select2/data/tokenizer", ["jquery"], function(a) {
                function b(a, b, c) {
                    var d = c.get("tokenizer");
                    void 0 !== d && (this.tokenizer = d), a.call(this, b, c)
                }
                return b.prototype.bind = function(a, b, c) {
                    a.call(this, b, c), this.$search = b.dropdown.$search || b.selection.$search || c.find(".select2-search__field")
                }, b.prototype.query = function(b, c, d) {
                    function e(b) {
                        var c = g._normalizeItem(b);
                        if (!g.$element.find("option").filter(function() {
                                return a(this).val() === c.id
                            }).length) {
                            var d = g.option(c);
                            d.attr("data-select2-tag", !0), g._removeOldTags(), g.addOptions([d])
                        }
                        f(c)
                    }

                    function f(a) {
                        g.trigger("select", {
                            data: a
                        })
                    }
                    var g = this;
                    c.term = c.term || "";
                    var h = this.tokenizer(c, this.options, e);
                    h.term !== c.term && (this.$search.length && (this.$search.val(h.term), this.$search.focus()), c.term = h.term), b.call(this, c, d)
                }, b.prototype.tokenizer = function(b, c, d, e) {
                    for (var f = d.get("tokenSeparators") || [], g = c.term, h = 0, i = this.createTag || function(a) {
                            return {
                                id: a.term,
                                text: a.term
                            }
                        }; h < g.length;) {
                        var j = g[h];
                        if (-1 !== a.inArray(j, f)) {
                            var k = g.substr(0, h),
                                l = a.extend({}, c, {
                                    term: k
                                }),
                                m = i(l);
                            null != m ? (e(m), g = g.substr(h + 1) || "", h = 0) : h++
                        } else h++
                    }
                    return {
                        term: g
                    }
                }, b
            }), b.define("select2/data/minimumInputLength", [], function() {
                function a(a, b, c) {
                    this.minimumInputLength = c.get("minimumInputLength"), a.call(this, b, c)
                }
                return a.prototype.query = function(a, b, c) {
                    if (b.term = b.term || "", b.term.length < this.minimumInputLength) return void this.trigger("results:message", {
                        message: "inputTooShort",
                        args: {
                            minimum: this.minimumInputLength,
                            input: b.term,
                            params: b
                        }
                    });
                    a.call(this, b, c)
                }, a
            }), b.define("select2/data/maximumInputLength", [], function() {
                function a(a, b, c) {
                    this.maximumInputLength = c.get("maximumInputLength"), a.call(this, b, c)
                }
                return a.prototype.query = function(a, b, c) {
                    if (b.term = b.term || "", this.maximumInputLength > 0 && b.term.length > this.maximumInputLength) return void this.trigger("results:message", {
                        message: "inputTooLong",
                        args: {
                            maximum: this.maximumInputLength,
                            input: b.term,
                            params: b
                        }
                    });
                    a.call(this, b, c)
                }, a
            }), b.define("select2/data/maximumSelectionLength", [], function() {
                function a(a, b, c) {
                    this.maximumSelectionLength = c.get("maximumSelectionLength"), a.call(this, b, c)
                }
                return a.prototype.query = function(a, b, c) {
                    var d = this;
                    this.current(function(e) {
                        var f = null != e ? e.length : 0;
                        if (d.maximumSelectionLength > 0 && f >= d.maximumSelectionLength) return void d.trigger("results:message", {
                            message: "maximumSelected",
                            args: {
                                maximum: d.maximumSelectionLength
                            }
                        });
                        a.call(d, b, c)
                    })
                }, a
            }), b.define("select2/dropdown", ["jquery", "./utils"], function(a, b) {
                function c(a, b) {
                    this.$element = a, this.options = b, c.__super__.constructor.call(this)
                }
                return b.Extend(c, b.Observable), c.prototype.render = function() {
                    var b = a('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                    return b.attr("dir", this.options.get("dir")), this.$dropdown = b, b
                }, c.prototype.bind = function() {}, c.prototype.position = function(a, b) {}, c.prototype.destroy = function() {
                    this.$dropdown.remove()
                }, c
            }), b.define("select2/dropdown/search", ["jquery", "../utils"], function(a, b) {
                function c() {}
                return c.prototype.render = function(b) {
                    var c = b.call(this),
                        d = a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" /></span>');
                    return this.$searchContainer = d, this.$search = d.find("input"), c.prepend(d), c
                }, c.prototype.bind = function(b, c, d) {
                    var e = this;
                    b.call(this, c, d), this.$search.on("keydown", function(a) {
                        e.trigger("keypress", a), e._keyUpPrevented = a.isDefaultPrevented()
                    }), this.$search.on("input", function(b) {
                        a(this).off("keyup")
                    }), this.$search.on("keyup input", function(a) {
                        e.handleSearch(a)
                    }), c.on("open", function() {
                        e.$search.attr("tabindex", 0), e.$search.focus(), window.setTimeout(function() {
                            e.$search.focus()
                        }, 0)
                    }), c.on("close", function() {
                        e.$search.attr("tabindex", -1), e.$search.val(""), e.$search.blur()
                    }), c.on("focus", function() {
                        c.isOpen() || e.$search.focus()
                    }), c.on("results:all", function(a) {
                        if (null == a.query.term || "" === a.query.term) {
                            e.showSearch(a) ? e.$searchContainer.removeClass("select2-search--hide") : e.$searchContainer.addClass("select2-search--hide")
                        }
                    })
                }, c.prototype.handleSearch = function(a) {
                    if (!this._keyUpPrevented) {
                        var b = this.$search.val();
                        this.trigger("query", {
                            term: b
                        })
                    }
                    this._keyUpPrevented = !1
                }, c.prototype.showSearch = function(a, b) {
                    return !0
                }, c
            }), b.define("select2/dropdown/hidePlaceholder", [], function() {
                function a(a, b, c, d) {
                    this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c, d)
                }
                return a.prototype.append = function(a, b) {
                    b.results = this.removePlaceholder(b.results), a.call(this, b)
                }, a.prototype.normalizePlaceholder = function(a, b) {
                    return "string" == typeof b && (b = {
                        id: "",
                        text: b
                    }), b
                }, a.prototype.removePlaceholder = function(a, b) {
                    for (var c = b.slice(0), d = b.length - 1; d >= 0; d--) {
                        var e = b[d];
                        this.placeholder.id === e.id && c.splice(d, 1)
                    }
                    return c
                }, a
            }), b.define("select2/dropdown/infiniteScroll", ["jquery"], function(a) {
                function b(a, b, c, d) {
                    this.lastParams = {}, a.call(this, b, c, d), this.$loadingMore = this.createLoadingMore(), this.loading = !1
                }
                return b.prototype.append = function(a, b) {
                    this.$loadingMore.remove(), this.loading = !1, a.call(this, b), this.showLoadingMore(b) && this.$results.append(this.$loadingMore)
                }, b.prototype.bind = function(b, c, d) {
                    var e = this;
                    b.call(this, c, d), c.on("query", function(a) {
                        e.lastParams = a, e.loading = !0
                    }), c.on("query:append", function(a) {
                        e.lastParams = a, e.loading = !0
                    }), this.$results.on("scroll", function() {
                        var b = a.contains(document.documentElement, e.$loadingMore[0]);
                        if (!e.loading && b) {
                            e.$results.offset().top + e.$results.outerHeight(!1) + 50 >= e.$loadingMore.offset().top + e.$loadingMore.outerHeight(!1) && e.loadMore()
                        }
                    })
                }, b.prototype.loadMore = function() {
                    this.loading = !0;
                    var b = a.extend({}, {
                        page: 1
                    }, this.lastParams);
                    b.page++, this.trigger("query:append", b)
                }, b.prototype.showLoadingMore = function(a, b) {
                    return b.pagination && b.pagination.more
                }, b.prototype.createLoadingMore = function() {
                    var b = a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),
                        c = this.options.get("translations").get("loadingMore");
                    return b.html(c(this.lastParams)), b
                }, b
            }), b.define("select2/dropdown/attachBody", ["jquery", "../utils"], function(a, b) {
                function c(b, c, d) {
                    this.$dropdownParent = d.get("dropdownParent") || a(document.body), b.call(this, c, d)
                }
                return c.prototype.bind = function(a, b, c) {
                    var d = this,
                        e = !1;
                    a.call(this, b, c), b.on("open", function() {
                        d._showDropdown(), d._attachPositioningHandler(b), e || (e = !0, b.on("results:all", function() {
                            d._positionDropdown(), d._resizeDropdown()
                        }), b.on("results:append", function() {
                            d._positionDropdown(), d._resizeDropdown()
                        }))
                    }), b.on("close", function() {
                        d._hideDropdown(), d._detachPositioningHandler(b)
                    }), this.$dropdownContainer.on("mousedown", function(a) {
                        a.stopPropagation()
                    })
                }, c.prototype.destroy = function(a) {
                    a.call(this), this.$dropdownContainer.remove()
                }, c.prototype.position = function(a, b, c) {
                    b.attr("class", c.attr("class")), b.removeClass("select2"), b.addClass("select2-container--open"), b.css({
                        position: "absolute",
                        top: -999999
                    }), this.$container = c
                }, c.prototype.render = function(b) {
                    var c = a("<span></span>"),
                        d = b.call(this);
                    return c.append(d), this.$dropdownContainer = c, c
                }, c.prototype._hideDropdown = function(a) {
                    this.$dropdownContainer.detach()
                }, c.prototype._attachPositioningHandler = function(c, d) {
                    var e = this,
                        f = "scroll.select2." + d.id,
                        g = "resize.select2." + d.id,
                        h = "orientationchange.select2." + d.id,
                        i = this.$container.parents().filter(b.hasScroll);
                    i.each(function() {
                        b.StoreData(this, "select2-scroll-position", {
                            x: a(this).scrollLeft(),
                            y: a(this).scrollTop()
                        })
                    }), i.on(f, function(c) {
                        var d = b.GetData(this, "select2-scroll-position");
                        a(this).scrollTop(d.y)
                    }), a(window).on(f + " " + g + " " + h, function(a) {
                        e._positionDropdown(), e._resizeDropdown()
                    })
                }, c.prototype._detachPositioningHandler = function(c, d) {
                    var e = "scroll.select2." + d.id,
                        f = "resize.select2." + d.id,
                        g = "orientationchange.select2." + d.id;
                    this.$container.parents().filter(b.hasScroll).off(e), a(window).off(e + " " + f + " " + g)
                }, c.prototype._positionDropdown = function() {
                    var b = a(window),
                        c = this.$dropdown.hasClass("select2-dropdown--above"),
                        d = this.$dropdown.hasClass("select2-dropdown--below"),
                        e = null,
                        f = this.$container.offset();
                    f.bottom = f.top + this.$container.outerHeight(!1);
                    var g = {
                        height: this.$container.outerHeight(!1)
                    };
                    g.top = f.top, g.bottom = f.top + g.height;
                    var h = {
                            height: this.$dropdown.outerHeight(!1)
                        },
                        i = {
                            top: b.scrollTop(),
                            bottom: b.scrollTop() + b.height()
                        },
                        j = i.top < f.top - h.height,
                        k = i.bottom > f.bottom + h.height,
                        l = {
                            left: f.left,
                            top: g.bottom
                        },
                        m = this.$dropdownParent;
                    "static" === m.css("position") && (m = m.offsetParent());
                    var n = m.offset();
                    l.top -= n.top, l.left -= n.left, c || d || (e = "below"), k || !j || c ? !j && k && c && (e = "below") : e = "above", ("above" == e || c && "below" !== e) && (l.top = g.top - n.top - h.height), null != e && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + e), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + e)), this.$dropdownContainer.css(l)
                }, c.prototype._resizeDropdown = function() {
                    var a = {
                        width: this.$container.outerWidth(!1) + "px"
                    };
                    this.options.get("dropdownAutoWidth") && (a.minWidth = a.width, a.position = "relative", a.width = "auto"), this.$dropdown.css(a)
                }, c.prototype._showDropdown = function(a) {
                    this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown()
                }, c
            }), b.define("select2/dropdown/minimumResultsForSearch", [], function() {
                function a(b) {
                    for (var c = 0, d = 0; d < b.length; d++) {
                        var e = b[d];
                        e.children ? c += a(e.children) : c++
                    }
                    return c
                }

                function b(a, b, c, d) {
                    this.minimumResultsForSearch = c.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), a.call(this, b, c, d)
                }
                return b.prototype.showSearch = function(b, c) {
                    return !(a(c.data.results) < this.minimumResultsForSearch) && b.call(this, c)
                }, b
            }), b.define("select2/dropdown/selectOnClose", ["../utils"], function(a) {
                function b() {}
                return b.prototype.bind = function(a, b, c) {
                    var d = this;
                    a.call(this, b, c), b.on("close", function(a) {
                        d._handleSelectOnClose(a)
                    })
                }, b.prototype._handleSelectOnClose = function(b, c) {
                    if (c && null != c.originalSelect2Event) {
                        var d = c.originalSelect2Event;
                        if ("select" === d._type || "unselect" === d._type) return
                    }
                    var e = this.getHighlightedResults();
                    if (!(e.length < 1)) {
                        var f = a.GetData(e[0], "data");
                        null != f.element && f.element.selected || null == f.element && f.selected || this.trigger("select", {
                            data: f
                        })
                    }
                }, b
            }), b.define("select2/dropdown/closeOnSelect", [], function() {
                function a() {}
                return a.prototype.bind = function(a, b, c) {
                    var d = this;
                    a.call(this, b, c), b.on("select", function(a) {
                        d._selectTriggered(a)
                    }), b.on("unselect", function(a) {
                        d._selectTriggered(a)
                    })
                }, a.prototype._selectTriggered = function(a, b) {
                    var c = b.originalEvent;
                    c && c.ctrlKey || this.trigger("close", {
                        originalEvent: c,
                        originalSelect2Event: b
                    })
                }, a
            }), b.define("select2/i18n/en", [], function() {
                return {
                    errorLoading: function() {
                        return "The results could not be loaded."
                    },
                    inputTooLong: function(a) {
                        var b = a.input.length - a.maximum,
                            c = "Please delete " + b + " character";
                        return 1 != b && (c += "s"), c
                    },
                    inputTooShort: function(a) {
                        return "Please enter " + (a.minimum - a.input.length) + " or more characters"
                    },
                    loadingMore: function() {
                        return "Loading more resultsâ€¦"
                    },
                    maximumSelected: function(a) {
                        var b = "You can only select " + a.maximum + " item";
                        return 1 != a.maximum && (b += "s"), b
                    },
                    noResults: function() {
                        return "No results found"
                    },
                    searching: function() {
                        return "Searchingâ€¦"
                    }
                }
            }), b.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C) {
                function D() {
                    this.reset()
                }
                return D.prototype.apply = function(l) {
                    if (l = a.extend(!0, {}, this.defaults, l), null == l.dataAdapter) {
                        if (null != l.ajax ? l.dataAdapter = o : null != l.data ? l.dataAdapter = n : l.dataAdapter = m, l.minimumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, r)), l.maximumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, s)), l.maximumSelectionLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, t)), l.tags && (l.dataAdapter = j.Decorate(l.dataAdapter, p)), null == l.tokenSeparators && null == l.tokenizer || (l.dataAdapter = j.Decorate(l.dataAdapter, q)), null != l.query) {
                            var C = b(l.amdBase + "compat/query");
                            l.dataAdapter = j.Decorate(l.dataAdapter, C)
                        }
                        if (null != l.initSelection) {
                            var D = b(l.amdBase + "compat/initSelection");
                            l.dataAdapter = j.Decorate(l.dataAdapter, D)
                        }
                    }
                    if (null == l.resultsAdapter && (l.resultsAdapter = c, null != l.ajax && (l.resultsAdapter = j.Decorate(l.resultsAdapter, x)), null != l.placeholder && (l.resultsAdapter = j.Decorate(l.resultsAdapter, w)), l.selectOnClose && (l.resultsAdapter = j.Decorate(l.resultsAdapter, A))), null == l.dropdownAdapter) {
                        if (l.multiple) l.dropdownAdapter = u;
                        else {
                            var E = j.Decorate(u, v);
                            l.dropdownAdapter = E
                        }
                        if (0 !== l.minimumResultsForSearch && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, z)), l.closeOnSelect && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, B)), null != l.dropdownCssClass || null != l.dropdownCss || null != l.adaptDropdownCssClass) {
                            var F = b(l.amdBase + "compat/dropdownCss");
                            l.dropdownAdapter = j.Decorate(l.dropdownAdapter, F)
                        }
                        l.dropdownAdapter = j.Decorate(l.dropdownAdapter, y)
                    }
                    if (null == l.selectionAdapter) {
                        if (l.multiple ? l.selectionAdapter = e : l.selectionAdapter = d, null != l.placeholder && (l.selectionAdapter = j.Decorate(l.selectionAdapter, f)), l.allowClear && (l.selectionAdapter = j.Decorate(l.selectionAdapter, g)), l.multiple && (l.selectionAdapter = j.Decorate(l.selectionAdapter, h)), null != l.containerCssClass || null != l.containerCss || null != l.adaptContainerCssClass) {
                            var G = b(l.amdBase + "compat/containerCss");
                            l.selectionAdapter = j.Decorate(l.selectionAdapter, G)
                        }
                        l.selectionAdapter = j.Decorate(l.selectionAdapter, i)
                    }
                    if ("string" == typeof l.language)
                        if (l.language.indexOf("-") > 0) {
                            var H = l.language.split("-"),
                                I = H[0];
                            l.language = [l.language, I]
                        } else l.language = [l.language];
                    if (a.isArray(l.language)) {
                        var J = new k;
                        l.language.push("en");
                        for (var K = l.language, L = 0; L < K.length; L++) {
                            var M = K[L],
                                N = {};
                            try {
                                N = k.loadPath(M)
                            } catch (a) {
                                try {
                                    M = this.defaults.amdLanguageBase + M, N = k.loadPath(M)
                                } catch (a) {
                                    l.debug && window.console && console.warn && console.warn('Select2: The language file for "' + M + '" could not be automatically loaded. A fallback will be used instead.');
                                    continue
                                }
                            }
                            J.extend(N)
                        }
                        l.translations = J
                    } else {
                        var O = k.loadPath(this.defaults.amdLanguageBase + "en"),
                            P = new k(l.language);
                        P.extend(O), l.translations = P
                    }
                    return l
                }, D.prototype.reset = function() {
                    function b(a) {
                        function b(a) {
                            return l[a] || a
                        }
                        return a.replace(/[^\u0000-\u007E]/g, b)
                    }

                    function c(d, e) {
                        if ("" === a.trim(d.term)) return e;
                        if (e.children && e.children.length > 0) {
                            for (var f = a.extend(!0, {}, e), g = e.children.length - 1; g >= 0; g--) {
                                null == c(d, e.children[g]) && f.children.splice(g, 1)
                            }
                            return f.children.length > 0 ? f : c(d, f)
                        }
                        var h = b(e.text).toUpperCase(),
                            i = b(d.term).toUpperCase();
                        return h.indexOf(i) > -1 ? e : null
                    }
                    this.defaults = {
                        amdBase: "./",
                        amdLanguageBase: "./i18n/",
                        closeOnSelect: !0,
                        debug: !1,
                        dropdownAutoWidth: !1,
                        escapeMarkup: j.escapeMarkup,
                        language: C,
                        matcher: c,
                        minimumInputLength: 0,
                        maximumInputLength: 0,
                        maximumSelectionLength: 0,
                        minimumResultsForSearch: 0,
                        selectOnClose: !1,
                        sorter: function(a) {
                            return a
                        },
                        templateResult: function(a) {
                            return a.text
                        },
                        templateSelection: function(a) {
                            return a.text
                        },
                        theme: "default",
                        width: "resolve"
                    }
                }, D.prototype.set = function(b, c) {
                    var d = a.camelCase(b),
                        e = {};
                    e[d] = c;
                    var f = j._convertData(e);
                    a.extend(!0, this.defaults, f)
                }, new D
            }), b.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function(a, b, c, d) {
                function e(b, e) {
                    if (this.options = b, null != e && this.fromElement(e), this.options = c.apply(this.options), e && e.is("input")) {
                        var f = a(this.get("amdBase") + "compat/inputData");
                        this.options.dataAdapter = d.Decorate(this.options.dataAdapter, f)
                    }
                }
                return e.prototype.fromElement = function(a) {
                    var c = ["select2"];
                    null == this.options.multiple && (this.options.multiple = a.prop("multiple")), null == this.options.disabled && (this.options.disabled = a.prop("disabled")), null == this.options.language && (a.prop("lang") ? this.options.language = a.prop("lang").toLowerCase() : a.closest("[lang]").prop("lang") && (this.options.language = a.closest("[lang]").prop("lang"))), null == this.options.dir && (a.prop("dir") ? this.options.dir = a.prop("dir") : a.closest("[dir]").prop("dir") ? this.options.dir = a.closest("[dir]").prop("dir") : this.options.dir = "ltr"), a.prop("disabled", this.options.disabled), a.prop("multiple", this.options.multiple), d.GetData(a[0], "select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), d.StoreData(a[0], "data", d.GetData(a[0], "select2Tags")), d.StoreData(a[0], "tags", !0)), d.GetData(a[0], "ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), a.attr("ajax--url", d.GetData(a[0], "ajaxUrl")), d.StoreData(a[0], "ajax-Url", d.GetData(a[0], "ajaxUrl")));
                    var e = {};
                    e = b.fn.jquery && "1." == b.fn.jquery.substr(0, 2) && a[0].dataset ? b.extend(!0, {}, a[0].dataset, d.GetData(a[0])) : d.GetData(a[0]);
                    var f = b.extend(!0, {}, e);
                    f = d._convertData(f);
                    for (var g in f) b.inArray(g, c) > -1 || (b.isPlainObject(this.options[g]) ? b.extend(this.options[g], f[g]) : this.options[g] = f[g]);
                    return this
                }, e.prototype.get = function(a) {
                    return this.options[a]
                }, e.prototype.set = function(a, b) {
                    this.options[a] = b
                }, e
            }), b.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function(a, b, c, d) {
                var e = function(a, d) {
                    null != c.GetData(a[0], "select2") && c.GetData(a[0], "select2").destroy(), this.$element = a, this.id = this._generateId(a), d = d || {}, this.options = new b(d, a), e.__super__.constructor.call(this);
                    var f = a.attr("tabindex") || 0;
                    c.StoreData(a[0], "old-tabindex", f), a.attr("tabindex", "-1");
                    var g = this.options.get("dataAdapter");
                    this.dataAdapter = new g(a, this.options);
                    var h = this.render();
                    this._placeContainer(h);
                    var i = this.options.get("selectionAdapter");
                    this.selection = new i(a, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, h);
                    var j = this.options.get("dropdownAdapter");
                    this.dropdown = new j(a, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, h);
                    var k = this.options.get("resultsAdapter");
                    this.results = new k(a, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);
                    var l = this;
                    this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function(a) {
                        l.trigger("selection:update", {
                            data: a
                        })
                    }), a.addClass("select2-hidden-accessible"), a.attr("aria-hidden", "true"), this._syncAttributes(), c.StoreData(a[0], "select2", this)
                };
                return c.Extend(e, c.Observable), e.prototype._generateId = function(a) {
                    var b = "";
                    return b = null != a.attr("id") ? a.attr("id") : null != a.attr("name") ? a.attr("name") + "-" + c.generateChars(2) : c.generateChars(4), b = b.replace(/(:|\.|\[|\]|,)/g, ""), b = "select2-" + b
                }, e.prototype._placeContainer = function(a) {
                    a.insertAfter(this.$element);
                    var b = this._resolveWidth(this.$element, this.options.get("width"));
                    null != b && a.css("width", b)
                }, e.prototype._resolveWidth = function(a, b) {
                    var c = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                    if ("resolve" == b) {
                        var d = this._resolveWidth(a, "style");
                        return null != d ? d : this._resolveWidth(a, "element")
                    }
                    if ("element" == b) {
                        var e = a.outerWidth(!1);
                        return e <= 0 ? "auto" : e + "px"
                    }
                    if ("style" == b) {
                        var f = a.attr("style");
                        if ("string" != typeof f) return null;
                        for (var g = f.split(";"), h = 0, i = g.length; h < i; h += 1) {
                            var j = g[h].replace(/\s/g, ""),
                                k = j.match(c);
                            if (null !== k && k.length >= 1) return k[1]
                        }
                        return null
                    }
                    return b
                }, e.prototype._bindAdapters = function() {
                    this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container)
                }, e.prototype._registerDomEvents = function() {
                    var b = this;
                    this.$element.on("change.select2", function() {
                        b.dataAdapter.current(function(a) {
                            b.trigger("selection:update", {
                                data: a
                            })
                        })
                    }), this.$element.on("focus.select2", function(a) {
                        b.trigger("focus", a)
                    }), this._syncA = c.bind(this._syncAttributes, this), this._syncS = c.bind(this._syncSubtree, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA);
                    var d = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                    null != d ? (this._observer = new d(function(c) {
                        a.each(c, b._syncA), a.each(c, b._syncS)
                    }), this._observer.observe(this.$element[0], {
                        attributes: !0,
                        childList: !0,
                        subtree: !1
                    })) : this.$element[0].addEventListener && (this.$element[0].addEventListener("DOMAttrModified", b._syncA, !1), this.$element[0].addEventListener("DOMNodeInserted", b._syncS, !1), this.$element[0].addEventListener("DOMNodeRemoved", b._syncS, !1))
                }, e.prototype._registerDataEvents = function() {
                    var a = this;
                    this.dataAdapter.on("*", function(b, c) {
                        a.trigger(b, c)
                    })
                }, e.prototype._registerSelectionEvents = function() {
                    var b = this,
                        c = ["toggle", "focus"];
                    this.selection.on("toggle", function() {
                        b.toggleDropdown()
                    }), this.selection.on("focus", function(a) {
                        b.focus(a)
                    }), this.selection.on("*", function(d, e) {
                        -1 === a.inArray(d, c) && b.trigger(d, e)
                    })
                }, e.prototype._registerDropdownEvents = function() {
                    var a = this;
                    this.dropdown.on("*", function(b, c) {
                        a.trigger(b, c)
                    })
                }, e.prototype._registerResultsEvents = function() {
                    var a = this;
                    this.results.on("*", function(b, c) {
                        a.trigger(b, c)
                    })
                }, e.prototype._registerEvents = function() {
                    var a = this;
                    this.on("open", function() {
                        a.$container.addClass("select2-container--open")
                    }), this.on("close", function() {
                        a.$container.removeClass("select2-container--open")
                    }), this.on("enable", function() {
                        a.$container.removeClass("select2-container--disabled")
                    }), this.on("disable", function() {
                        a.$container.addClass("select2-container--disabled")
                    }), this.on("blur", function() {
                        a.$container.removeClass("select2-container--focus")
                    }), this.on("query", function(b) {
                        a.isOpen() || a.trigger("open", {}), this.dataAdapter.query(b, function(c) {
                            a.trigger("results:all", {
                                data: c,
                                query: b
                            })
                        })
                    }), this.on("query:append", function(b) {
                        this.dataAdapter.query(b, function(c) {
                            a.trigger("results:append", {
                                data: c,
                                query: b
                            })
                        })
                    }), this.on("keypress", function(b) {
                        var c = b.which;
                        a.isOpen() ? c === d.ESC || c === d.TAB || c === d.UP && b.altKey ? (a.close(), b.preventDefault()) : c === d.ENTER ? (a.trigger("results:select", {}), b.preventDefault()) : c === d.SPACE && b.ctrlKey ? (a.trigger("results:toggle", {}), b.preventDefault()) : c === d.UP ? (a.trigger("results:previous", {}), b.preventDefault()) : c === d.DOWN && (a.trigger("results:next", {}), b.preventDefault()) : (c === d.ENTER || c === d.SPACE || c === d.DOWN && b.altKey) && (a.open(), b.preventDefault())
                    })
                }, e.prototype._syncAttributes = function() {
                    this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {})
                }, e.prototype._syncSubtree = function(a, b) {
                    var c = !1,
                        d = this;
                    if (!a || !a.target || "OPTION" === a.target.nodeName || "OPTGROUP" === a.target.nodeName) {
                        if (b)
                            if (b.addedNodes && b.addedNodes.length > 0)
                                for (var e = 0; e < b.addedNodes.length; e++) {
                                    var f = b.addedNodes[e];
                                    f.selected && (c = !0)
                                } else b.removedNodes && b.removedNodes.length > 0 && (c = !0);
                            else c = !0;
                        c && this.dataAdapter.current(function(a) {
                            d.trigger("selection:update", {
                                data: a
                            })
                        })
                    }
                }, e.prototype.trigger = function(a, b) {
                    var c = e.__super__.trigger,
                        d = {
                            open: "opening",
                            close: "closing",
                            select: "selecting",
                            unselect: "unselecting",
                            clear: "clearing"
                        };
                    if (void 0 === b && (b = {}), a in d) {
                        var f = d[a],
                            g = {
                                prevented: !1,
                                name: a,
                                args: b
                            };
                        if (c.call(this, f, g), g.prevented) return void(b.prevented = !0)
                    }
                    c.call(this, a, b)
                }, e.prototype.toggleDropdown = function() {
                    this.options.get("disabled") || (this.isOpen() ? this.close() : this.open())
                }, e.prototype.open = function() {
                    this.isOpen() || this.trigger("query", {})
                }, e.prototype.close = function() {
                    this.isOpen() && this.trigger("close", {})
                }, e.prototype.isOpen = function() {
                    return this.$container.hasClass("select2-container--open")
                }, e.prototype.hasFocus = function() {
                    return this.$container.hasClass("select2-container--focus")
                }, e.prototype.focus = function(a) {
                    this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {}))
                }, e.prototype.enable = function(a) {
                    this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), null != a && 0 !== a.length || (a = [!0]);
                    var b = !a[0];
                    this.$element.prop("disabled", b)
                }, e.prototype.data = function() {
                    this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
                    var a = [];
                    return this.dataAdapter.current(function(b) {
                        a = b
                    }), a
                }, e.prototype.val = function(b) {
                    if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == b || 0 === b.length) return this.$element.val();
                    var c = b[0];
                    a.isArray(c) && (c = a.map(c, function(a) {
                        return a.toString()
                    })), this.$element.val(c).trigger("change")
                }, e.prototype.destroy = function() {
                    this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1), this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1), this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)), this._syncA = null, this._syncS = null, this.$element.off(".select2"), this.$element.attr("tabindex", c.GetData(this.$element[0], "old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), c.RemoveData(this.$element[0]), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null
                }, e.prototype.render = function() {
                    var b = a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                    return b.attr("dir", this.options.get("dir")), this.$container = b, this.$container.addClass("select2-container--" + this.options.get("theme")), c.StoreData(b[0], "element", this.$element), b
                }, e
            }), b.define("jquery-mousewheel", ["jquery"], function(a) {
                return a
            }), b.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults", "./select2/utils"], function(a, b, c, d, e) {
                if (null == a.fn.select2) {
                    var f = ["open", "close", "destroy"];
                    a.fn.select2 = function(b) {
                        if ("object" == typeof(b = b || {})) return this.each(function() {
                            var d = a.extend(!0, {}, b);
                            new c(a(this), d)
                        }), this;
                        if ("string" == typeof b) {
                            var d, g = Array.prototype.slice.call(arguments, 1);
                            return this.each(function() {
                                var a = e.GetData(this, "select2");
                                null == a && window.console && console.error && console.error("The select2('" + b + "') method was called on an element that is not using Select2."), d = a[b].apply(a, g)
                            }), a.inArray(b, f) > -1 ? this : d
                        }
                        throw new Error("Invalid arguments for Select2: " + b)
                    }
                }
                return null == a.fn.select2.defaults && (a.fn.select2.defaults = d), c
            }), {
                define: b.define,
                require: b.require
            }
        }(),
        c = b.require("jquery.select2");
    return a.fn.select2.amd = b, c
});



/* Snow js 
!function(){var e=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};window.requestAnimationFrame=e}();var flakes=[],canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),flakeCount=400,mX=-100,mY=-100;function snow(){ctx.clearRect(0,0,canvas.width,canvas.height);for(var e=0;e<flakeCount;e++){var a=flakes[e],t=mX,n=mY,i=a.x,o=a.y,s=Math.sqrt((i-t)*(i-t)+(o-n)*(o-n));if(s<150){var r=(t-i)/s,d=(n-o)/s,c=150/(s*s)/2;a.velX-=c*r,a.velY-=c*d}else a.velX*=.98,a.velY<=a.speed&&(a.velY=a.speed),a.velX+=Math.cos(a.step+=.05)*a.stepSize;ctx.fillStyle="rgba(255,255,255,"+a.opacity+")",a.y+=a.velY,a.x+=a.velX,(a.y>=canvas.height||a.y<=0)&&reset(a),(a.x>=canvas.width||a.x<=0)&&reset(a),ctx.beginPath(),ctx.arc(a.x,a.y,a.size,0,2*Math.PI),ctx.fill()}requestAnimationFrame(snow)}function reset(e){e.x=Math.floor(Math.random()*canvas.width),e.y=0,e.size=3*Math.random()+2,e.speed=1*Math.random()+.5,e.velY=e.speed,e.velX=0,e.opacity=.5*Math.random()+.3}function init(){for(var e=0;e<flakeCount;e++){var a=Math.floor(Math.random()*canvas.width),t=Math.floor(Math.random()*canvas.height),n=3*Math.random()+2,i=1*Math.random()+.5,o=.5*Math.random()+.3;flakes.push({speed:i,velY:i,velX:0,x:a,y:t,size:n,stepSize:Math.random()/30,step:0,opacity:o})}snow()}canvas.width=window.innerWidth,canvas.height=window.innerHeight,canvas.addEventListener("mousemove",function(e){mX=e.clientX,mY=e.clientY}),window.addEventListener("resize",function(){canvas.width=window.innerWidth,canvas.height=window.innerHeight}),init();
*/


! function(i) {
    i.fn.theiaStickySidebar = function(t) {
        function e(t, e) {
            var a = o(t, e);
            a || (console.log("TSS: Body width smaller than options.minWidth. Init is delayed."), i(document).on("scroll." + t.namespace, function(t, e) {
                return function(a) {
                    var n = o(t, e);
                    n && i(this).unbind(a)
                }
            }(t, e)), i(window).on("resize." + t.namespace, function(t, e) {
                return function(a) {
                    var n = o(t, e);
                    n && i(this).unbind(a)
                }
            }(t, e)))
        }

        function o(t, e) {
            return t.initialized === !0 || !(i("body").width() < t.minWidth) && (a(t, e), !0)
        }

        function a(t, e) {
            t.initialized = !0;
            var o = i("#theia-sticky-sidebar-stylesheet-" + t.namespace);
            0 === o.length && i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-' + t.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')), e.each(function() {
                function e() {
                    a.fixedScrollTop = 0, a.sidebar.css({
                        "min-height": "1px"
                    }), a.stickySidebar.css({
                        position: "static",
                        width: "",
                        transform: "none"
                    })
                }

                function o(t) {
                    var e = t.height();
                    return t.children().each(function() {
                        e = Math.max(e, i(this).height())
                    }), e
                }
                var a = {};
                if (a.sidebar = i(this), a.options = t || {}, a.container = i(a.options.containerSelector), 0 == a.container.length && (a.container = a.sidebar.parent()), a.sidebar.parents().css("-webkit-transform", "none"), a.sidebar.css({
                        position: a.options.defaultPosition,
                        overflow: "visible",
                        "-webkit-box-sizing": "border-box",
                        "-moz-box-sizing": "border-box",
                        "box-sizing": "border-box"
                    }), a.stickySidebar = a.sidebar.find(".theiaStickySidebar"), 0 == a.stickySidebar.length) {
                    var s = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                    a.sidebar.find("script").filter(function(i, t) {
                        return 0 === t.type.length || t.type.match(s)
                    }).remove(), a.stickySidebar = i("<div>").addClass("theiaStickySidebar").append(a.sidebar.children()), a.sidebar.append(a.stickySidebar)
                }
                a.marginBottom = parseInt(a.sidebar.css("margin-bottom")), a.paddingTop = parseInt(a.sidebar.css("padding-top")), a.paddingBottom = parseInt(a.sidebar.css("padding-bottom"));
                var r = a.stickySidebar.offset().top,
                    d = a.stickySidebar.outerHeight();
                a.stickySidebar.css("padding-top", 1), a.stickySidebar.css("padding-bottom", 1), r -= a.stickySidebar.offset().top, d = a.stickySidebar.outerHeight() - d - r, 0 == r ? (a.stickySidebar.css("padding-top", 0), a.stickySidebarPaddingTop = 0) : a.stickySidebarPaddingTop = 1, 0 == d ? (a.stickySidebar.css("padding-bottom", 0), a.stickySidebarPaddingBottom = 0) : a.stickySidebarPaddingBottom = 1, a.previousScrollTop = null, a.fixedScrollTop = 0, e(), a.onScroll = function(a) {
                    if (a.stickySidebar.is(":visible")) {
                        if (i("body").width() < a.options.minWidth) return void e();
                        if (a.options.disableOnResponsiveLayouts) {
                            var s = a.sidebar.outerWidth("none" == a.sidebar.css("float"));
                            if (s + 50 > a.container.width()) return void e()
                        }
                        var r = i(document).scrollTop(),
                            d = "static";
                        if (r >= a.sidebar.offset().top + (a.paddingTop - a.options.additionalMarginTop)) {
                            var c, p = a.paddingTop + t.additionalMarginTop,
                                b = a.paddingBottom + a.marginBottom + t.additionalMarginBottom,
                                l = a.sidebar.offset().top,
                                f = a.sidebar.offset().top + o(a.container),
                                h = 0 + t.additionalMarginTop,
                                g = a.stickySidebar.outerHeight() + p + b < i(window).height();
                            c = g ? h + a.stickySidebar.outerHeight() : i(window).height() - a.marginBottom - a.paddingBottom - t.additionalMarginBottom;
                            var u = l - r + a.paddingTop,
                                S = f - r - a.paddingBottom - a.marginBottom,
                                y = a.stickySidebar.offset().top - r,
                                m = a.previousScrollTop - r;
                            "fixed" == a.stickySidebar.css("position") && "modern" == a.options.sidebarBehavior && (y += m), "stick-to-top" == a.options.sidebarBehavior && (y = t.additionalMarginTop), "stick-to-bottom" == a.options.sidebarBehavior && (y = c - a.stickySidebar.outerHeight()), y = m > 0 ? Math.min(y, h) : Math.max(y, c - a.stickySidebar.outerHeight()), y = Math.max(y, u), y = Math.min(y, S - a.stickySidebar.outerHeight());
                            var k = a.container.height() == a.stickySidebar.outerHeight();
                            d = (k || y != h) && (k || y != c - a.stickySidebar.outerHeight()) ? r + y - a.sidebar.offset().top - a.paddingTop <= t.additionalMarginTop ? "static" : "absolute" : "fixed"
                        }
                        if ("fixed" == d) {
                            var v = i(document).scrollLeft();
                            a.stickySidebar.css({
                                position: "fixed",
                                width: n(a.stickySidebar) + "px",
                                transform: "translateY(" + y + "px)",
                                left: a.sidebar.offset().left + parseInt(a.sidebar.css("padding-left")) - v + "px",
                                top: "0px"
                            })
                        } else if ("absolute" == d) {
                            var x = {};
                            "absolute" != a.stickySidebar.css("position") && (x.position = "absolute", x.transform = "translateY(" + (r + y - a.sidebar.offset().top - a.stickySidebarPaddingTop - a.stickySidebarPaddingBottom) + "px)", x.top = "0px"), x.width = n(a.stickySidebar) + "px", x.left = "", a.stickySidebar.css(x)
                        } else "static" == d && e();
                        "static" != d && 1 == a.options.updateSidebarHeight && a.sidebar.css({
                            "min-height": a.stickySidebar.outerHeight() + a.stickySidebar.offset().top - a.sidebar.offset().top + a.paddingBottom
                        }), a.previousScrollTop = r
                    }
                }, a.onScroll(a), i(document).on("scroll." + a.options.namespace, function(i) {
                    return function() {
                        i.onScroll(i)
                    }
                }(a)), i(window).on("resize." + a.options.namespace, function(i) {
                    return function() {
                        i.stickySidebar.css({
                            position: "static"
                        }), i.onScroll(i)
                    }
                }(a)), "undefined" != typeof ResizeSensor && new ResizeSensor(a.stickySidebar[0], function(i) {
                    return function() {
                        i.onScroll(i)
                    }
                }(a))
            })
        }

        function n(i) {
            var t;
            try {
                t = i[0].getBoundingClientRect().width
            } catch (i) {}
            return "undefined" == typeof t && (t = i.width()), t
        }
        var s = {
            containerSelector: "",
            additionalMarginTop: 0,
            additionalMarginBottom: 0,
            updateSidebarHeight: !0,
            minWidth: 0,
            disableOnResponsiveLayouts: !0,
            sidebarBehavior: "modern",
            defaultPosition: "relative",
            namespace: "TSS"
        };
        return t = i.extend(s, t), t.additionalMarginTop = parseInt(t.additionalMarginTop) || 0, t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0, e(t, this), this
    }
}(jQuery);
//# sourceMappingURL=maps/theia-sticky-sidebar.min.js.map