+ function($) {
    "use strict";

    function Plugin(action, options) {
        var args;
        return args = Array.prototype.slice.call(arguments, 1), this.each(function() {
            var $this, data;
            $this = $(this), data = $this.data("vc.accordion"), data || (data = new Accordion($this, $.extend(!0, {}, options)), $this.data("vc.accordion", data)), "string" == typeof action && data[action].apply(data, args)
        })
    }
    var Accordion, clickHandler, old, hashNavigation;
    Accordion = function($element, options) {
        this.$element = $element, this.activeClass = "vc_active", this.animatingClass = "vc_animating", this.useCacheFlag = void 0, this.$target = void 0, this.$targetContent = void 0, this.selector = void 0, this.$container = void 0, this.animationDuration = void 0, this.index = 0
    }, Accordion.transitionEvent = function() {
        var transition, transitions, el;
        el = document.createElement("vcFakeElement"), transitions = {
            transition: "transitionend",
            MSTransition: "msTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd"
        };
        for (transition in transitions)
            if (void 0 !== el.style[transition]) return transitions[transition]
    }, Accordion.emulateTransitionEnd = function($el, duration) {
        var callback, called;
        called = !1, duration || (duration = 250), $el.one(Accordion.transitionName, function() {
            called = !0
        }), callback = function() {
            called || $el.trigger(Accordion.transitionName)
        }, setTimeout(callback, duration)
    }, Accordion.DEFAULT_TYPE = "collapse", Accordion.transitionName = Accordion.transitionEvent(), Accordion.prototype.controller = function(options) {
        var $this;
        $this = this.$element;
        var action = options;
        "string" != typeof action && (action = $this.data("vcAction") || this.getContainer().data("vcAction")), void 0 === action && (action = Accordion.DEFAULT_TYPE), "string" == typeof action && Plugin.call($this, action, options)
    }, Accordion.prototype.isCacheUsed = function() {
        var useCache, that;
        return that = this, useCache = function() {
            return !1 !== that.$element.data("vcUseCache")
        }, void 0 === this.useCacheFlag && (this.useCacheFlag = useCache()), this.useCacheFlag
    }, Accordion.prototype.getSelector = function() {
        var findSelector, $this;
        return $this = this.$element, findSelector = function() {
            var selector;
            return selector = $this.data("vcTarget"), selector || (selector = $this.attr("href")), selector
        }, this.isCacheUsed() ? (void 0 === this.selector && (this.selector = findSelector()), this.selector) : findSelector()
    }, Accordion.prototype.findContainer = function() {
        var $container;
        return $container = this.$element.closest(this.$element.data("vcContainer")), $container.length || ($container = $("body")), $container
    }, Accordion.prototype.getContainer = function() {
        return this.isCacheUsed() ? (void 0 === this.$container && (this.$container = this.findContainer()), this.$container) : this.findContainer()
    }, Accordion.prototype.getTarget = function() {
        var selector, that, getTarget;
        return that = this, selector = that.getSelector(), getTarget = function() {
            var element;
            return element = that.getContainer().find(selector), element.length || (element = that.getContainer().filter(selector)), element
        }, this.isCacheUsed() ? (void 0 === this.$target && (this.$target = getTarget()), this.$target) : getTarget()
    }, Accordion.prototype.getTargetContent = function() {
        var $target, $targetContent;
        return $target = this.getTarget(), this.isCacheUsed() ? (void 0 === this.$targetContent && ($targetContent = $target, $target.data("vcContent") && ($targetContent = $target.find($target.data("vcContent")), $targetContent.length || ($targetContent = $target)), this.$targetContent = $targetContent), this.$targetContent) : $target.data("vcContent") && ($targetContent = $target.find($target.data("vcContent")), $targetContent.length) ? $targetContent : $target
    }, Accordion.prototype.getTriggers = function() {
        var i;
        return i = 0, this.getContainer().find("[data-vc-accordion]").each(function() {
            var accordion, $this;
            $this = $(this), accordion = $this.data("vc.accordion"), void 0 === accordion && ($this.vcAccordion(), accordion = $this.data("vc.accordion")), accordion && accordion.setIndex && accordion.setIndex(i++)
        })
    }, Accordion.prototype.setIndex = function(index) {
        this.index = index
    }, Accordion.prototype.getIndex = function() {
        return this.index
    }, Accordion.prototype.triggerEvent = function(event, opt) {
        var $event;
        "string" == typeof event && ($event = $.Event(event), this.$element.trigger($event, opt))
    }, Accordion.prototype.getActiveTriggers = function() {
        return this.getTriggers().filter(function() {
            var $this, accordion;
            return $this = $(this), accordion = $this.data("vc.accordion"), accordion.getTarget().hasClass(accordion.activeClass)
        })
    }, Accordion.prototype.changeLocationHash = function() {
        var id, $target;
        $target = this.getTarget(), $target.length && (id = $target.attr("id")), id && (history.pushState ? history.pushState(null, null, "#" + id) : location.hash = "#" + id)
    }, Accordion.prototype.isActive = function() {
        return this.getTarget().hasClass(this.activeClass)
    }, Accordion.prototype.getAnimationDuration = function() {
        var findAnimationDuration, that;
        return that = this, findAnimationDuration = function() {
            var $targetContent, duration;
            return void 0 === Accordion.transitionName ? "0s" : ($targetContent = that.getTargetContent(), duration = $targetContent.css("transition-duration"), duration = duration.split(",")[0])
        }, this.isCacheUsed() ? (void 0 === this.animationDuration && (this.animationDuration = findAnimationDuration()), this.animationDuration) : findAnimationDuration()
    }, Accordion.prototype.getAnimationDurationMilliseconds = function() {
        var duration;
        return duration = this.getAnimationDuration(), "ms" === duration.substr(-2) ? parseInt(duration) : "s" === duration.substr(-1) ? Math.round(1e3 * parseFloat(duration)) : void 0
    }, Accordion.prototype.isAnimated = function() {
        return parseFloat(this.getAnimationDuration()) > 0
    }, Accordion.prototype.show = function(opt) {
        var $target, that, $targetContent;
        that = this, $target = that.getTarget(), $targetContent = that.getTargetContent(), that.isActive() || (that.isAnimated() ? (that.triggerEvent("beforeShow.vc.accordion"), $target.queue(function(next) {
            $targetContent.one(Accordion.transitionName, function() {
                $target.removeClass(that.animatingClass), $targetContent.attr("style", ""), that.triggerEvent("afterShow.vc.accordion", opt)
            }), Accordion.emulateTransitionEnd($targetContent, that.getAnimationDurationMilliseconds() + 100), next()
        }).queue(function(next) {
            $targetContent.attr("style", ""), $targetContent.css({
                position: "absolute",
                visibility: "hidden",
                display: "block"
            });
            var height = $targetContent.height();
            $targetContent.data("vcHeight", height), $targetContent.attr("style", ""), next()
        }).queue(function(next) {
            $targetContent.height(0), $targetContent.css({
                "padding-top": 0,
                "padding-bottom": 0
            }), next()
        }).queue(function(next) {
            $target.addClass(that.animatingClass), $target.addClass(that.activeClass), ("object" == typeof opt && opt.hasOwnProperty("changeHash") && opt.changeHash || void 0 === opt) && that.changeLocationHash(), that.triggerEvent("show.vc.accordion", opt), next()
        }).queue(function(next) {
            var height = $targetContent.data("vcHeight");
            $targetContent.animate({
                height: height
            }, {
                duration: that.getAnimationDurationMilliseconds(),
                complete: function() {
                    $targetContent.data("events") || $targetContent.attr("style", "")
                }
            }), $targetContent.css({
                "padding-top": "",
                "padding-bottom": ""
            }), next()
        })) : ($target.addClass(that.activeClass), that.triggerEvent("show.vc.accordion", opt)))
    }, Accordion.prototype.hide = function(opt) {
        var $target, that, $targetContent;
        that = this, $target = that.getTarget(), $targetContent = that.getTargetContent(), that.isActive() && (that.isAnimated() ? (that.triggerEvent("beforeHide.vc.accordion"), $target.queue(function(next) {
            $targetContent.one(Accordion.transitionName, function() {
                $target.removeClass(that.animatingClass), $targetContent.attr("style", ""), that.triggerEvent("afterHide.vc.accordion", opt)
            }), Accordion.emulateTransitionEnd($targetContent, that.getAnimationDurationMilliseconds() + 100), next()
        }).queue(function(next) {
            $target.addClass(that.animatingClass), $target.removeClass(that.activeClass), that.triggerEvent("hide.vc.accordion", opt), next()
        }).queue(function(next) {
            var height = $targetContent.height();
            $targetContent.height(height), next()
        }).queue(function(next) {
            $targetContent.animate({
                height: 0
            }, that.getAnimationDurationMilliseconds()), $targetContent.css({
                "padding-top": 0,
                "padding-bottom": 0
            }), next()
        })) : ($target.removeClass(that.activeClass), that.triggerEvent("hide.vc.accordion", opt)))
    }, Accordion.prototype.toggle = function(opt) {
        var $this;
        $this = this.$element, this.isActive() ? Plugin.call($this, "hide", opt) : Plugin.call($this, "show", opt)
    }, Accordion.prototype.dropdown = function(opt) {
        var $this;
        $this = this.$element, this.isActive() ? Plugin.call($this, "hide", opt) : (Plugin.call($this, "show", opt), $(document).on("click.vc.accordion.data-api.dropdown", function(e) {
            Plugin.call($this, "hide", opt), $(document).off(e)
        }))
    }, Accordion.prototype.collapse = function(opt) {
        var $this, $triggers;
        $this = this.$element, $triggers = this.getActiveTriggers().filter(function() {
            return $this[0] !== this
        }), $triggers.length && Plugin.call($triggers, "hide", opt), Plugin.call($this, "show", opt)
    }, Accordion.prototype.collapseAll = function(opt) {
        var $this, $triggers;
        $this = this.$element, $triggers = this.getActiveTriggers().filter(function() {
            return $this[0] !== this
        }), $triggers.length && Plugin.call($triggers, "hide", opt), Plugin.call($this, "toggle", opt)
    }, Accordion.prototype.showNext = function(opt) {
        var $triggers, $activeTriggers, activeIndex;
        if ($triggers = this.getTriggers(), $activeTriggers = this.getActiveTriggers(), $triggers.length) {
            if ($activeTriggers.length) {
                var lastActiveAccordion;
                lastActiveAccordion = $activeTriggers.eq($activeTriggers.length - 1).vcAccordion().data("vc.accordion"), lastActiveAccordion && lastActiveAccordion.getIndex && (activeIndex = lastActiveAccordion.getIndex())
            } - 1 < activeIndex && activeIndex + 1 < $triggers.length ? Plugin.call($triggers.eq(activeIndex + 1), "controller", opt) : Plugin.call($triggers.eq(0), "controller", opt)
        }
    }, Accordion.prototype.showPrev = function(opt) {
        var $triggers, $activeTriggers, activeIndex;
        if ($triggers = this.getTriggers(), $activeTriggers = this.getActiveTriggers(), $triggers.length) {
            if ($activeTriggers.length) {
                var lastActiveAccordion;
                lastActiveAccordion = $activeTriggers.eq($activeTriggers.length - 1).vcAccordion().data("vc.accordion"), lastActiveAccordion && lastActiveAccordion.getIndex && (activeIndex = lastActiveAccordion.getIndex())
            } - 1 < activeIndex ? 0 <= activeIndex - 1 ? Plugin.call($triggers.eq(activeIndex - 1), "controller", opt) : Plugin.call($triggers.eq($triggers.length - 1), "controller", opt) : Plugin.call($triggers.eq(0), "controller", opt)
        }
    }, Accordion.prototype.showAt = function(index, opt) {
        var $triggers;
        $triggers = this.getTriggers(), $triggers.length && index && index < $triggers.length && Plugin.call($triggers.eq(index), "controller", opt)
    }, Accordion.prototype.scrollToActive = function(opt) {
        if (void 0 === opt || void 0 === opt.scrollTo || opt.scrollTo) {
            var that, $targetElement, offset, delay, speed;
            that = this, offset = 1, delay = 300, speed = 300, $targetElement = $(this.getTarget()), $targetElement.length && this.$element.length && setTimeout(function() {
                $targetElement.offset().top - $(window).scrollTop() - that.$element.outerHeight() * offset < 0 && $("html, body").animate({
                    scrollTop: $targetElement.offset().top - that.$element.outerHeight() * offset
                }, speed)
            }, delay)
        }
    }, old = $.fn.vcAccordion, $.fn.vcAccordion = Plugin, $.fn.vcAccordion.Constructor = Accordion, $.fn.vcAccordion.noConflict = function() {
        return $.fn.vcAccordion = old, this
    }, clickHandler = function(e) {
        var $this;
        $this = $(this), e.preventDefault(), Plugin.call($this, "controller")
    }, hashNavigation = function() {
        var hash, $targetElement, $accordion, offset, delay, speed;
        offset = .2, delay = 300, speed = 0, (hash = window.location.hash) && ($targetElement = $(hash), $targetElement.length && ($accordion = $targetElement.find('[data-vc-accordion][href="' + hash + '"],[data-vc-accordion][data-vc-target="' + hash + '"]'), $accordion.length && (setTimeout(function() {
            $("html, body").animate({
                scrollTop: $targetElement.offset().top - $(window).height() * offset
            }, speed)
        }, delay), $accordion.trigger("click"))))
    }, $(window).on("hashchange.vc.accordion", hashNavigation), $(document).on("click.vc.accordion.data-api", "[data-vc-accordion]", clickHandler), $(document).on("ready.vc.accordion", hashNavigation), $(document).on("afterShow.vc.accordion", function(e, opt) {
        Plugin.call($(e.target), "scrollToActive", opt)
    })
}(window.jQuery);