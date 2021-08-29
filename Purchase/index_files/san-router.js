define('base:thirdParty/san/san-router.js', function (require, exports, module) {
    
(function webpackUniversalModuleDefinition(root, factory) {

    if (typeof Object.create !== "function") {
        Object.create = function (proto, propertiesObject) {
            return {};
        };
    }
    if (typeof Object.assign !== "function") {
        Object.assign = function (o, n) {
            for (var p in n){
                if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) ))
                    o[p]=n[p];
            }
            return o;
        };
    }
    if (!document.querySelectorAll) {
        document.querySelectorAll = function (selectors) {
            var style = document.createElement('style'), elements = [], element;
            document.documentElement.firstChild.appendChild(style);
            document._qsa = [];
            if (style.styleSheet) {
                // IE
                style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
            } else {
                // w3c
                var cssText = document.createTextNode(selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}');
                style.appendChild(cssText);
            }
            window.scrollBy(0, 0);
            style.parentNode.removeChild(style);
            while (document._qsa.length) {
                element = document._qsa.shift();
                element.style.removeAttribute('x-qsa');
                elements.push(element);
            }
            document._qsa = null;
            return elements;
        };
    }

    if (!document.querySelector) {
        document.querySelector = function (selectors) {
            var elements = document.querySelectorAll(selectors);
            return (elements.length) ? elements[0] : null;
        };
    }
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (classStr) {
            var nodes = document.getElementsByTagName('div'),ret = [];
            function hasClass(tagStr,classStr){
                var arr=tagStr.className.split(/\s+/ );  //这个正则表达式是因为class可以有多个,判断是否包含
                for (var i=0;i<arr.length;i++){
                       if (arr[i]==classStr){
                             return true ;
                       }
                }
                return false ;
           }     
            for(i = 0; i < nodes.length; i++) {
                if(hasClass(nodes[i],classStr)){
                    ret.push(nodes[i]);
                }
            }
            return ret;
        } 
        

}
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define("san-router", [], factory);
    else if (typeof exports === 'object')
        exports["san-router"] = factory();
    else
        root["san-router"] = factory();
})(this, function () {
    return /******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
                /******/
};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
            /******/
}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function (value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
                    /******/
});
                /******/
}
            /******/
};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
            /******/
};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
        /******/
})
/************************************************************************/
/******/([
/* 0 */
/***/ function (module, exports, __webpack_require__) {

                "use strict";


                exports.__esModule = true;
                exports['default'] = resolveURL;

                var _parseUrl = __webpack_require__(1);

                var _parseUrl2 = _interopRequireDefault(_parseUrl);

                function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

                /**
                 * 将 URL 中相对路径部分展开
                 *
                 * @param {string} source 要展开的url
                 * @param {string} base 当前所属环境的url
                 * @return {string}
                 */
                function resolveURL(source, base) {
                    var sourceLoc = (0, _parseUrl2['default'])(source);
                    var baseLoc = (0, _parseUrl2['default'])(base);

                    var sourcePath = sourceLoc.path;
                    if (sourcePath.indexOf('/') === 0) {
                        return source;
                    }

                    var sourceSegs = sourcePath.split('/');
                    var baseSegs = baseLoc.path.split('/');
                    baseSegs.pop();

                    for (var i = 0; i < sourceSegs.length; i++) {
                        var seg = sourceSegs[i];
                        switch (seg) {
                            case '..':
                                baseSegs.pop();
                                break;
                            case '.':
                                break;
                            default:
                                baseSegs.push(seg);
                        }
                    }

                    if (baseSegs[0] !== '') {
                        baseSegs.unshift('');
                    }

                    return baseSegs.join('/') + (sourceLoc.queryString ? '?' + sourceLoc.queryString : '');
                } /**
   * san-router
   * Copyright 2017 Baidu Inc. All rights reserved.
   *
   * @file 将 URL 中相对路径部分展开
   * @author errorrik
   */

                /***/
},
/* 1 */
/***/ function (module, exports, __webpack_require__) {

                "use strict";


                exports.__esModule = true;
                exports['default'] = parseURL;
                /**
                 * san-router
                 * Copyright 2017 Baidu Inc. All rights reserved.
                 *
                 * @file 解析URL
                 * @author errorrik
                 */

                /**
                 * 解析URL，返回包含path、query、queryString的对象
                 *
                 * @param {string} url 要解析的url
                 * @return {Object}
                 */
                function parseURL(url) {
                    var result = {
                        hash: '',
                        queryString: '',
                        query: {},
                        path: url
                    };

                    // parse hash
                    var hashStart = result.path.indexOf('#');
                    if (hashStart >= 0) {
                        result.hash = result.path.slice(hashStart + 1);
                        result.path = result.path.slice(0, hashStart);
                    }

                    // parse query
                    var query = result.query;
                    var queryStart = result.path.indexOf('?');
                    if (queryStart >= 0) {
                        result.queryString = result.path.slice(queryStart + 1);
                        result.path = result.path.slice(0, queryStart);

                        result.queryString.split('&').forEach(function (querySeg) {
                            // 考虑到有可能因为未处理转义问题，
                            // 导致value中存在**=**字符，因此不使用`split`函数
                            var equalIndex = querySeg.indexOf('=');
                            var value = '';
                            if (equalIndex > 0) {
                                value = querySeg.slice(equalIndex + 1);
                                querySeg = querySeg.slice(0, equalIndex);
                            }

                            var key = decodeURIComponent(querySeg);
                            value = decodeURIComponent(value);

                            // 已经存在这个参数，且新的值不为空时，把原来的值变成数组
                            if (query.hasOwnProperty(key)) {
                                /* eslint-disable */
                                query[key] = [].concat(query[key], value);
                                /* eslint-disable */
                            } else {
                                query[key] = value;
                            }
                        });
                    }

                    return result;
                }

                /***/
},
/* 2 */
/***/ function (module, exports, __webpack_require__) {

                "use strict";


                exports.__esModule = true;


                var _Event = __webpack_require__(7);

                var _Event2 = _interopRequireDefault(_Event);

                var _EventQueue = __webpack_require__(8);

                var _EventQueue2 = _interopRequireDefault(_EventQueue);

                function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

                function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * ER (Enterprise RIA)
                                                                                                                                                           * Copyright 2013 Baidu Inc. All rights reserved.
                                                                                                                                                           *
                                                                                                                                                           * @ignore
                                                                                                                                                           * @file 提供事件相关操作的基类
                                                                                                                                                           * @author otakustay
                                                                                                                                                           */

                var EVENT_POOL = 'eventPool';

                /**
                 * 提供事件相关操作的基类
                 *
                 * 可以让某个类继承此类，获得事件的相关功能：
                 *
                 * ```js
                 * function MyClass() {
                 *     // 此处可以不调用EventTarget构造函数
                 * }
                 *
                 * inherits(MyClass, EventTarget);
                 *
                 * let instance = new MyClass();
                 * instance.on('foo', executeFoo);
                 * instance.fire('foo', { bar: 'Hello World' });
                 * ```
                 *
                 * 当然也可以使用`Object.create`方法：
                 *
                 * ```js
                 * let instance = Object.create(EventTarget.prototype);
                 * instance.on('foo', executeFoo);
                 * instance.fire('foo', { bar: 'Hello World' });
                 * ```
                 *
                 * 还可以使用`enable`方法让一个静态的对象拥有事件功能：
                 *
                 * ```js
                 * let instance = {}
                 * EventTarget.enable(instance);
                 *
                 * // 同样可以使用事件
                 * instance.on('foo', executeFoo);
                 * instance.fire('foo', { bar: 'Hello World' });
                 * ```
                 */

                var EventTarget = function () {
                    function EventTarget() {
                        _classCallCheck(this, EventTarget);
                    }

                    /**
                     * 注册一个事件处理函数
                     *
                     * @param {string} type 事件的类型
                     * @param {Function | boolean} fn 事件的处理函数，
                     * 特殊地，如果此参数为`false`，将被视为特殊的事件处理函数，
                     * 其效果等于`preventDefault()`及`stopPropagation()`
                     * @param {*} [thisObject] 事件执行时`this`对象
                     * @param {Object} [options] 事件相关配置项
                     * @param {boolean} [options.once=false] 控制事件仅执行一次
                     */
                    EventTarget.prototype.on = function on(type, fn, thisObject, options) {
                        if (!this[EVENT_POOL]) {
                            this[EVENT_POOL] = Object.create(null);
                        }

                        if (!this[EVENT_POOL][type]) {
                            this[EVENT_POOL][type] = new _EventQueue2['default']();
                        }

                        var queue = this[EVENT_POOL][type];

                        options = Object.assign({}, options);
                        if (thisObject) {
                            options.thisObject = thisObject;
                        }

                        queue.add(fn, options);
                    };

                    /**
                     * 注册一个仅执行一次的处理函数
                     *
                     * @param {string} type 事件的类型
                     * @param {Function} fn 事件的处理函数
                     * @param {*} [thisObject] 事件执行时`this`对象
                     * @param {Object} [options] 事件相关配置项
                     */


                    EventTarget.prototype.once = function once(type, fn, thisObject, options) {
                        options = Object.assign({}, options);
                        options.once = true;
                        this.on(type, fn, thisObject, options);
                    };

                    /**
                     * 注销一个事件处理函数
                     *
                     * @param {string} type 事件的类型，如果值为`*`仅会注销通过`*`为类型注册的事件，并不会将所有事件注销
                     * @param {Function} [handler] 事件的处理函数，无此参数则注销`type`指定类型的所有事件处理函数
                     * @param {*} [thisObject] 处理函数对应的`this`对象，无此参数则注销`type`与`handler`符合要求，且无`this`对象的处理函数
                     */


                    EventTarget.prototype.un = function un(type, handler, thisObject) {
                        if (!this[EVENT_POOL] || !this[EVENT_POOL][type]) {
                            return;
                        }

                        var queue = this[EVENT_POOL][type];
                        queue.remove(handler, thisObject);
                    };

                    /**
                     * 触发指定类型的事件
                     *
                     * 3个重载：
                     *
                     * - `.fire(type)`
                     * - `.fire(args)`
                     * - `.fire(type, args)`
                     *
                     * @param {string | Object} type 事件类型
                     * @param {*} [args] 事件对象
                     * @return {Event} 事件传递过程中的`Event`对象
                     */


                    EventTarget.prototype.fire = function fire(type, args) {
                        // 只提供一个对象作为参数，则是`.fire(args)`的形式，需要加上type
                        /* eslint-disable prefer-rest-params */
                        if (arguments.length === 1 && (typeof type === 'undefined' ? 'undefined' : typeof(type)) === 'object') {
                            args = type;
                            type = args.type;
                        }
                        /* eslint-enable prefer-rest-params */

                        if (!type) {
                            throw new Error('No event type specified');
                        }

                        if (type === '*') {
                            throw new Error('Cannot fire global event');
                        }

                        var event = args instanceof _Event2['default'] ? args : new _Event2['default'](type, args);
                        event.target = this;

                        // 在此处可能没有[EVENT_POOL]`，这是指对象整个就没初始化，
                        // 即一个事件也没注册过就`fire`了，这是正常现象
                        if (this[EVENT_POOL] && this[EVENT_POOL][type]) {
                            var queue = this[EVENT_POOL][type];
                            queue.execute(event, this);
                        }

                        // 同时也有可能在上面执行标准事件队列的时候，把这个`EventTarget`给销毁了，
                        // 此时[EVENT_POOL]`就没了，这种情况是正常的不能抛异常，要特别处理
                        if (this[EVENT_POOL] && this[EVENT_POOL]['*']) {
                            var globalQueue = this[EVENT_POOL]['*'];
                            globalQueue.execute(event, this);
                        }

                        return event;
                    };

                    /**
                     * 销毁所有事件
                     */


                    EventTarget.prototype.destroyEvents = function destroyEvents() {
                        if (!this[EVENT_POOL]) {
                            return;
                        }

                        for (var name in this[EVENT_POOL]) {
                            if (this[EVENT_POOL][name]) {
                                this[EVENT_POOL][name].dispose();
                            }
                        }

                        this[EVENT_POOL] = null;
                    };

                    return EventTarget;
                }();

                exports['default'] = EventTarget;

                /***/
},
/* 3 */
/***/ function (module, exports, __webpack_require__) {

                "use strict";


                exports.__esModule = true;

                var _main = __webpack_require__(6);

                var _resolveUrl = __webpack_require__(0);

                var _resolveUrl2 = _interopRequireDefault(_resolveUrl);

                function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

                /**
                 * san-router
                 * Copyright 2017 Baidu Inc. All rights reserved.
                 *
                 * @file 路由链接的 San 组件
                 * @author errorrik
                 */

                exports['default'] = {
                    template: '<a href="{{href}}"\n        onclick="return false;"\n        on-click="clicker($event)"\n        target="{{target}}"\n        class="{{class}}"\n        style="{{style}}"\n        >\n        <slot></slot>\n    </a>',

                    clicker: function clicker(e) {
                        var href = this.data.get('href');

                        if (typeof href === 'string') {
                            _main.router.locator.redirect(href.replace(/^#/, ''));
                        }

                        if (e.preventDefault) {
                            e.preventDefault();
                        } else {
                            e.returnValue = false;
                        }
                    },


                    computed: {
                        href: function href() {
                            var url = this.data.get('to');
                            if (typeof url !== 'string') {
                                return;
                            }

                            var href = (0, _resolveUrl2['default'])(url, _main.router.locator.current);
                            if (_main.router.mode === 'hash') {
                                href = '#' + href;
                            }

                            return href;
                        }
                    }
                };

                /***/
},
/* 4 */
/***/ function (module, exports, __webpack_require__) {

                "use strict";


                exports.__esModule = true;

                var _EventTarget2 = __webpack_require__(2);

                var _EventTarget3 = _interopRequireDefault(_EventTarget2);

                var _resolveUrl = __webpack_require__(0);

                var _resolveUrl2 = _interopRequireDefault(_resolveUrl);

                function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

                function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

                function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

                function _inherits(subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) {
                         throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); 
                    } 
                        subClass.prototype = new superClass();                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                }
                /**
                 * 获取当前URL
                 *
                 * @return {string}
                 */
                function getLocation() {
                    // Firefox下`location.hash`存在自动解码的情况，
                    // 比如hash的值是**abc%3def**，
                    // 在Firefox下获取会成为**abc=def**
                    // 为了避免这一情况，需要从`location.href`中分解
                    var index = location.href.indexOf('#');
                    var url = index < 0 ? '/' : location.href.slice(index + 1) || '/';

                    return url;
                }

                /**
                 * hash 模式地址监听器
                 *
                 * @class
                 */

                var Locator = function (_EventTarget) {
                    _inherits(Locator, _EventTarget);

                    /**
                     * 构造函数
                     */
                    function Locator() {
                        _classCallCheck(this, Locator);

                        var _this = _possibleConstructorReturn(this, _EventTarget.call(this));

                        _this.current = getLocation();
                        _this.referrer = '';

                        _this.hashChangeHandler = function () {
                            _this.redirect(getLocation());
                        };
                        return _this;
                    }

                    /**
                     * 开始监听 url 变化
                     */


                    Locator.prototype.start = function start() {
                        if (window.addEventListener) {
                            window.addEventListener('hashchange', this.hashChangeHandler, false);
                        }

                        if (window.attachEvent) {
                            window.attachEvent('onhashchange', this.hashChangeHandler);
                        }
                    };

                    /**
                     * 停止监听
                     */


                    Locator.prototype.stop = function stop() {
                        if (window.removeEventListener) {
                            window.removeEventListener('hashchange', this.hashChangeHandler, false);
                        }

                        if (window.detachEvent) {
                            window.detachEvent('onhashchange', this.hashChangeHandler);
                        }
                    };

                    /**
                     * 重定向
                     *
                     * @param {string} url 重定向的地址
                     * @param {Object?} options 重定向的行为配置
                     * @param {boolean?} options.force 是否强制刷新
                     */


                    Locator.prototype.redirect = function redirect(url) {
                        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { force: false };

                        url = (0, _resolveUrl2['default'])(url, this.current);
                        var referrer = this.current;

                        var isChanged = url !== referrer;
                        if (isChanged) {
                            this.referrer = referrer;
                            this.current = url;
                            location.hash = url;
                        } else {
                            referrer = this.referrer;
                        }

                        if ((isChanged || options.force) && !options.silent) {
                            this.fire('redirect', { url: url, referrer: referrer });
                        }
                    };

                    /**
                     * 刷新当前 url
                     */


                    Locator.prototype.reload = function reload() {
                        this.redirect(this.current, { force: true });
                    };

                    return Locator;
                }(_EventTarget3['default']);

                exports['default'] = Locator;

                /***/
},
/* 5 */
/***/ function (module, exports, __webpack_require__) {

                "use strict";


                exports.__esModule = true;

                var _EventTarget2 = __webpack_require__(2);

                var _EventTarget3 = _interopRequireDefault(_EventTarget2);

                var _resolveUrl = __webpack_require__(0);

                var _resolveUrl2 = _interopRequireDefault(_resolveUrl);

                function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

                function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

                function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

                function _inherits(subClass, superClass) 
                { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } 
                subClass.prototype = new superClass();
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                /**
                 * 获取当前URL
                 *
                 * @return {string}
                 */
                function getLocation() {
                    return location.pathname + location.search;
                }

                /**
                 * html5 模式地址监听器
                 *
                 * @class
                 */

                var Locator = function (_EventTarget) {
                    _inherits(Locator, _EventTarget);

                    /**
                     * 构造函数
                     */
                    function Locator() {
                        _classCallCheck(this, Locator);

                        var _this = _possibleConstructorReturn(this, _EventTarget.call(this));

                        _this.current = getLocation();
                        _this.referrer = '';

                        _this.popstateHandler = function () {
                            _this.referrer = _this.current;
                            _this.current = getLocation();

                            _this.fire('redirect', {
                                url: _this.current,
                                referrer: _this.referrer
                            });
                        };
                        return _this;
                    }

                    /**
                     * 开始监听 url 变化
                     */


                    Locator.prototype.start = function start() {
                        window.addEventListener('popstate', this.popstateHandler);
                    };

                    /**
                     * 停止监听
                     */


                    Locator.prototype.stop = function stop() {
                        window.removeEventListener('popstate', this.popstateHandler);
                    };

                    /**
                     * 重定向
                     *
                     * @param {string} url 重定向的地址
                     * @param {Object?} options 重定向的行为配置
                     * @param {boolean?} options.force 是否强制刷新
                     */


                    Locator.prototype.redirect = function redirect(url) {
                        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { force: false };

                        url = (0, _resolveUrl2['default'])(url, this.current);
                        var referrer = this.current;

                        var isChanged = url !== referrer;

                        if (isChanged) {
                            this.referrer = referrer;
                            this.current = url;

                            history.pushState({}, '', url);
                        }

                        if ((isChanged || options.force) && !options.silent) {
                            this.fire('redirect', { url: url, referrer: referrer });
                        }
                    };

                    /**
                     * 刷新当前 url
                     */


                    Locator.prototype.reload = function reload() {
                        this.fire('redirect', {
                            url: this.current,
                            referrer: this.referrer
                        });
                    };

                    return Locator;
                }(_EventTarget3['default']);

                exports['default'] = Locator;


                Locator.isSupport = 'pushState' in window.history;

                /***/
            },
/* 6 */
/***/ function (module, exports, __webpack_require__) {

                "use strict";


                exports.__esModule = true;
                exports.Link = exports.router = exports.Router = exports.version = undefined;

                var _hash = __webpack_require__(4);

                var _hash2 = _interopRequireDefault(_hash);

                var _html = __webpack_require__(5);

                var _html2 = _interopRequireDefault(_html);

                var _parseUrl = __webpack_require__(1);

                var _parseUrl2 = _interopRequireDefault(_parseUrl);

                var _link = __webpack_require__(3);

                var _link2 = _interopRequireDefault(_link);

                function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

                function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * san-router
                                                                                                                                                           * Copyright 2017 Baidu Inc. All rights reserved.
                                                                                                                                                           *
                                                                                                                                                           * @file 主模块
                                                                                                                                                           * @author errorrik
                                                                                                                                                           */

                var routeID = 0x5942b;
                var guid = function guid() {
                    return (++routeID).toString();
                };

                /**
                 * 版本号
                 *
                 * @type {string}
                 */
                var version = exports.version = '1.1.1';

                /**
                 * 路由器类
                 *
                 * @class
                 */

                var Router = exports.Router = function () {

                    /**
                     * 构造函数
                     *
                     * @param {Object?} options 初始化参数
                     * @param {string?} options.mode 路由模式，hash | html5
                     */
                    function Router() {
                        var _this = this;

                        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                            _ref$mode = _ref.mode,
                            mode = _ref$mode === undefined ? 'hash' : _ref$mode;

                        _classCallCheck(this, Router);

                        this.routes = [];
                        this.routeAlives = [];
                        this.listeners = [];

                        /**
                         * locator redirect 事件监听函数
                         *
                         * @param {Object} e locator事件对象
                         */
                        this.locatorRedirectHandler = function (e) {
                            var url = (0, _parseUrl2['default'])(e.url);
                            var routeItem = void 0;

                            for (var _i = 0; _i < _this.routes.length; _i++) {
                                var item = _this.routes[_i];
                                var match = item.rule.exec(url.path);

                                if (match) {
                                    routeItem = item;

                                    // fill query
                                    var keys = item.keys || [];
                                    for (var j = 1; j < match.length; j++) {
                                        url.query[keys[j] || j] = match[j];
                                    }

                                    // fill referrer
                                    url.referrer = e.referrer;
                                    url.config = item.config;

                                    break;
                                }
                            }

                            var i = 0;
                            var state = 1;

                            /**
                             * listener 事件对象
                             *
                             * @type {Object}
                             */
                            var listenerEvent = {
                                hash: url.hash,
                                queryString: url.queryString,
                                query: url.query,
                                path: url.path,
                                referrer: url.referrer,
                                config: url.config,
                                resume: next,
                                suspend: function suspend() {
                                    state = 0;
                                },
                                stop: function stop() {
                                    state = -1;
                                }
                            };

                            /**
                             * 尝试运行下一个listener
                             *
                             * @inner
                             */
                            var doNext = function doNext() {
                                if (state > 0) {
                                    if (i < _this.listeners.length) {
                                        _this.listeners[i].call(_this, listenerEvent, url.config);
                                        if (state > 0) {
                                            next();
                                        }
                                    } else {
                                        routeAction();
                                    }
                                }
                            };

                            /**
                             * 运行下一个listener
                             *
                             * @inner
                             */
                            function next() {
                                state = 1;
                                i++;
                                doNext();
                            }

                            /**
                             * 运行路由行为
                             *
                             * @inner
                             */
                            var routeAction = function routeAction() {
                                if (routeItem) {
                                    _this.doRoute(routeItem, url);
                                } else {
                                    var len = _this.routeAlives.length;
                                    while (len--) {
                                        _this.routeAlives[len].component.dispose();
                                        _this.routeAlives.splice(len, 1);
                                    }
                                }
                            };

                            doNext();
                        };

                        this.setMode(mode);
                    }

                    /**
                     * 添加路由监听器
                     *
                     * @param {function(e, config)} listener 监听器
                     */


                    Router.prototype.listen = function listen(listener) {
                        this.listeners.push(listener);
                    };

                    /**
                     * 移除路由监听器
                     *
                     * @param {Function} listener 监听器
                     */


                    Router.prototype.unlisten = function unlisten(listener) {
                        var len = this.listeners.length;
                        while (len--) {
                            if (this.listeners[len] === listener) {
                                this.listeners.splice(len, 1);
                            }
                        }
                    };

                    /**
                     * 执行路由
                     *
                     * @private
                     * @param {Object} routeItem 路由项
                     * @param {Object} e 路由信息
                     */


                    Router.prototype.doRoute = function doRoute(routeItem, e) {
                        var isUpdateAlive = false;
                        var len = this.routeAlives.length;

                        while (len--) {
                            var routeAlive = this.routeAlives[len];

                            if (routeAlive.id === routeItem.id) {
                                routeAlive.component.data.set('route', e);
                                routeAlive.component._callHook('route');
                                isUpdateAlive = true;
                            } else {
                                routeAlive.component.dispose();
                                this.routeAlives.splice(len, 1);
                            }
                        }

                        if (!isUpdateAlive) {
                            if (routeItem.Component) {
                                var component = new routeItem.Component();
                                component.data.set('route', e);
                                component._callHook('route');
                                // querySelector降级不对，先用getElementsByClassName代替
                                // var targetEl = document.querySelector(routeItem.target);
                                var targetEl = document.getElementsByClassName(routeItem.target.slice(1))[0];
                                if (!targetEl) {
                                    throw new Error('[SAN-ROUTER ERROR] ' + 'Attach failed, target element "' + routeItem.target + '" is not found.');
                                }
                                component.attach(targetEl);

                                this.routeAlives.push({
                                    component: component,
                                    id: routeItem.id
                                });
                            } else {
                                routeItem.handler.call(this, e);
                            }
                        }
                    };

                    /**
                     * 添加路由项
                     * 当规则匹配时，路由将优先将Component渲染到target中。如果没有包含Component，则执行handler函数
                     *
                     * @private
                     * @param {Object} config 路由项配置
                     * @param {string|RegExp} config.rule 路由规则
                     * @param {Function?} config.handler 路由函数
                     * @param {Function?} config.Component 路由组件
                     * @param {string} config.target 路由组件要渲染到的目标位置
                     * @return {Object} san-router 实例
                     */


                    Router.prototype.add = function add(config) {
                        var rule = config.rule,
                            handler = config.handler,
                            _config$target = config.target,
                            target = _config$target === undefined ? '#main' : _config$target,
                            Component = config.Component;

                        var keys = [''];

                        if (typeof rule === 'string') {
                            // 没用path-to-regexp，暂时不提供这么多功能支持
                            var regText = rule.replace(/\/:([a-z0-9_-]+)(?=\/|$)/ig, function (match, key) {
                                keys.push(key);
                                return '/([^/\\s]+)';
                            });

                            rule = new RegExp('^' + regText + '$', 'i');
                        }

                        if (!(rule instanceof RegExp)) {
                            throw new Error('[SAN-ROUTER ERROR] Rule must be string or RegExp!');
                        }

                        var id = guid();
                        this.routes.push({ id: id, rule: rule, handler: handler, keys: keys, target: target, Component: Component, config: config });

                        return this;
                    };

                    /**
                     * 启动路由功能
                     *
                     * @return {Object} san-router 实例
                     */


                    Router.prototype.start = function start() {
                        if (!this.isStarted) {
                            this.isStarted = true;
                            this.locator.on('redirect', this.locatorRedirectHandler);
                            this.locator.start();
                            this.locator.reload();
                        }

                        return this;
                    };

                    /**
                     * 停止路由功能
                     *
                     * @return {Object} san-router 实例
                     */


                    Router.prototype.stop = function stop() {
                        this.locator.un('redirect', this.locatorRedirectHandler);
                        this.locator.stop();
                        this.isStarted = false;

                        return this;
                    };

                    /**
                     * 设置路由模式
                     *
                     * @param {string} mode 路由模式，hash | html5
                     * @return {Object} san-router 实例
                     */


                    Router.prototype.setMode = function setMode(mode) {
                        mode = mode.toLowerCase();
                        if (this.mode === mode) {
                            return;
                        }

                        this.mode = mode;

                        var restart = false;
                        if (this.isStarted) {
                            this.stop();
                            restart = true;
                        }

                        switch (mode) {
                            case 'hash':
                                this.locator = new _hash2['default']();
                                break;
                            case 'html5':
                                this.locator = new _html2['default']();
                        }

                        if (restart) {
                            this.start();
                        }

                        return this;
                    };

                    return Router;
                }();

                /**
                 * 默认的路由器实例
                 *
                 * @type {Router}
                 */


                var router = exports.router = new Router();

                /**
                 * 路由链接的 San 组件
                 *
                 * @class
                 */
                exports.Link = _link2['default'];

                /***/
},
/* 7 */
/***/ function (module, exports, __webpack_require__) {

                "use strict";


                exports.__esModule = true;


                function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

                /**
                 * mini-event
                 * Copyright 2013 Baidu Inc. All rights reserved.
                 *
                 * @ignore
                 * @file 事件对象类
                 * @author otakustay
                 */

                var isObject = function isObject(target) {
                    return Object.prototype.toString.call(target) === '[object Object]';
                };

                // 复制事件属性的时候不复制这几个
                var EVENT_PROPERTY_BLACK_LIST = new Array(['type', 'target', 'preventDefault', 'isDefaultPrevented', 'stopPropagation', 'isPropagationStopped', 'stopImmediatePropagation', 'isImmediatePropagationStopped']);

                /**
                 * 事件对象类
                 */

                var Event = function () {

                    /**
                     * 构造函数
                     *
                     * 3个重载：
                     *      - `new Event(type)`
                     *      - `new Event(args)`
                     *      - `new Event(type, args)`
                     * 只提供一个对象作为参数，则是`new Event(args)`的形式，需要加上type
                     *
                     * @param {string | *} [type] 事件类型
                     * @param {*} [args] 事件中的数据，如果为对象则将参数扩展到`Event`实例上。如果参数是非对象类型，则作为实例的`data`属性使用
                     */
                    function Event(type, args) {
                        _classCallCheck(this, Event);

                        // 如果第1个参数是对象，则就当是`new Event(args)`形式
                        if ((typeof type === 'undefined' ? 'undefined' : typeof(type)) === 'object') {
                            args = type;
                            type = args.type;
                        }

                        if (isObject(args)) {
                            Object.assign(this, args);
                        } else if (args) {
                            this.data = args;
                        }

                        if (type) {
                            this.type = type;
                        }
                    }

                    /**
                     * 判断默认行为是否已被阻止
                     *
                     * @return {boolean}
                     */


                    Event.prototype.isDefaultPrevented = function isDefaultPrevented() {
                        return false;
                    };

                    /**
                     * 阻止默认行为
                     */


                    Event.prototype.preventDefault = function preventDefault() {
                        this.isDefaultPrevented = function () {
                            return true;
                        };
                    };

                    /**
                     * 判断事件传播是否已被阻止
                     *
                     * @return {boolean}
                     */


                    Event.prototype.isPropagationStopped = function isPropagationStopped() {
                        return false;
                    };

                    /**
                     * 阻止事件传播
                     */


                    Event.prototype.stopPropagation = function stopPropagation() {
                        this.isPropagationStopped = function () {
                            return true;
                        };
                    };

                    /**
                     * 判断事件的立即传播是否已被阻止
                     *
                     * @return {boolean}
                     */


                    Event.prototype.isImmediatePropagationStopped = function isImmediatePropagationStopped() {
                        return false;
                    };

                    /**
                     * 立即阻止事件传播
                     */


                    Event.prototype.stopImmediatePropagation = function stopImmediatePropagation() {
                        this.isImmediatePropagationStopped = function () {
                            return true;
                        };

                        this.stopPropagation();
                    };

                    /**
                     * 从一个已有事件对象生成一个新的事件对象
                     *
                     * @static
                     * @param {Event} originalEvent 作为源的已有事件对象
                     * @param {Object} [options] 配置项
                     * @param {string} [options.type] 新事件对象的类型，不提供则保留原类型
                     * @param {boolean} [options.preserveData=false] 是否保留事件的信息
                     * @param {boolean} [options.syncState=false] 是否让2个事件状态同步，状态包括阻止传播、立即阻止传播和阻止默认行为
                     * @param {Object} [options.extend] 提供事件对象的更多属性
                     * @return {Event}
                     */


                    Event.fromEvent = function fromEvent(originalEvent, options) {
                        var defaults = {
                            type: originalEvent.type,
                            preserveData: false,
                            syncState: false
                        };
                        options = Object.assign(defaults, options);

                        var newEvent = new Event(options.type);
                        // 如果保留数据，则把数据复制过去
                        if (options.preserveData) {
                            // 要去掉一些可能出现的杂质，因此不用`lib.extend`
                            for (var key in originalEvent) {
                                if (originalEvent.hasOwnProperty(key) && !EVENT_PROPERTY_BLACK_LIST.has(key)) {
                                    newEvent[key] = originalEvent[key];
                                }
                            }
                        }

                        // 如果有扩展属性，加上去
                        if (options.extend) {
                            Object.assign(newEvent, options.extend);
                        }

                        // 如果要同步状态，把和状态相关的方法挂接上
                        if (options.syncState) {
                            (function () {
                                var preventDefault = newEvent.preventDefault;
                                newEvent.preventDefault = function () {
                                    originalEvent.preventDefault();

                                    preventDefault.call(this);
                                };

                                var stopPropagation = originalEvent.stopPropagation;
                                newEvent.stopPropagation = function () {
                                    originalEvent.stopPropagation();

                                    stopPropagation.call(this);
                                };

                                var stopImmediatePropagation = originalEvent.stopImmediatePropagation;
                                newEvent.stopImmediatePropagation = function () {
                                    originalEvent.stopImmediatePropagation();

                                    stopImmediatePropagation.call(this);
                                };
                            })();
                        }

                        return newEvent;
                    };

                    /**
                     * 将一个对象的事件代理到另一个对象
                     *
                     * @static
                     * @param {EventTarget} from 事件提供方
                     * @param {EventTarget | string} fromType 为字符串表示提供方事件类型；
                     * 为可监听对象则表示接收方，此时事件类型由第3个参数提供
                     * @param {EventTarget | string} to 为字符串则表示提供方和接收方事件类型一致，
                     * 由此参数作为事件类型；为可监听对象则表示接收方，此时第2个参数必须为字符串
                     * @param {string} [toType] 接收方的事件类型
                     * @param {Object} [options] 配置项
                     * @param {boolean} [options.preserveData=false] 是否保留事件的信息
                     * @param {boolean} [options.syncState=false] 是否让2个事件状态同步，状态包括阻止传播、立即阻止传播和阻止默认行为
                     * @param {Object} [options.extend] 提供事件对象的更多属性
                     *
                     * ```
                     * // 当`label`触发`click`事件时，自身也触发`click`事件
                     * Event.delegate(label, this, 'click');
                     *
                     * // 当`label`触发`click`事件时，自身触发`labelclick`事件
                     * Event.delegate(label, 'click', this, 'labelclick');
                     * ```
                     */


                    Event.delegate = function delegate(from, fromType, to, toType, options) {
                        // 重载：
                        //
                        // 1. `.delegate(from, fromType, to, toType)`
                        // 2. `.delegate(from, fromType, to, toType, options)`
                        // 3. `.delegate(from, to, type)`
                        // 4. `.delegate(from, to, type, options)

                        // 重点在于第2个参数的类型，如果为字符串则肯定是1或2，否则为3或4
                        var useDifferentType = typeof fromType === 'string';
                        var source = {
                            object: from,
                            type: useDifferentType ? fromType : to
                        };
                        var target = {
                            object: useDifferentType ? to : fromType,
                            type: useDifferentType ? toType : to
                        };
                        var config = useDifferentType ? options : toType;
                        config = Object.assign({ preserveData: false }, config);

                        // 如果提供方不能注册事件，或接收方不能触发事件，那就不用玩了
                        if (typeof source.object.on !== 'function' || typeof target.object.on !== 'function' || typeof target.object.fire !== 'function') {
                            return;
                        }

                        var delegator = function delegator(originalEvent) {
                            var event = Event.fromEvent(originalEvent, config);
                            // 修正`type`和`target`属性
                            event.type = target.type;
                            event.target = target.object;

                            target.object.fire(target.type, event);
                        };

                        source.object.on(source.type, delegator);
                    };

                    return Event;
                }();

                exports['default'] = Event;

                /***/
},
/* 8 */
/***/ function (module, exports, __webpack_require__) {

                "use strict";


                exports.__esModule = true;

                function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

                /**
                 * mini-event
                 * Copyright 2013 Baidu Inc. All rights reserved.
                 *
                 * @ignore
                 * @file 事件队列
                 * @author otakustay
                 */

                var QUEUE ='queue';

                /**
                 * 判断已有的一个事件上下文对象是否和提供的参数等同
                 *
                 * @param {Object} context 在队列中已有的事件上下文对象
                 * @param {Function | boolean} handler 处理函数，可以是`false`
                 * @param {Mixed} [thisObject] 处理函数的`this`对象
                 * @return {boolean}
                 * @ignore
                 */
                /* eslint-disable fecs-arrow-body-style */
                var isContextIdentical = function isContextIdentical(context, handler, thisObject) {
                    // `thisObject`为`null`和`undefined`时认为等同，所以用`==`
                    /* eslint-disable eqeqeq */
                    return context && context.handler === handler && context.thisObject == thisObject;
                    /* eslint-enable eqeqeq */
                };
                /* eslint-enable fecs-arrow-body-style */

                /**
                 * 事件队列
                 *
                 * @constructor
                 */

                var EventQueue = function () {
                    function EventQueue() {
                        _classCallCheck(this, EventQueue);

                        this[QUEUE] = [];
                    }

                    /**
                     * 添加一个事件处理函数
                     *
                     * @param {Function | boolean} handler 处理函数，
                     * 可以传递`false`作为特殊的处理函数，参考{@link EventTarget#on}
                     * @param {Object} [options] 相关配置
                     * @param {Mixed} [options.thisObject] 执行处理函数时的`this`对象
                     * @param {boolean} [options.once=false] 设定函数仅执行一次
                     */


                    EventQueue.prototype.add = function add(handler, options) {
                        if (handler !== false && typeof handler !== 'function') {
                            throw new Error('event handler must be a function or const false');
                        }

                        var wrapper = Object.assign({ handler: handler }, options);

                        for (var i = 0; i < this[QUEUE].length; i++) {
                            var context = this[QUEUE][i];
                            // 同样的处理函数，不同的`this`对象，相当于外面`bind`了一把再添加，
                            // 此时认为这是完全不同的2个处理函数，但`null`和`undefined`认为是一样的
                            if (isContextIdentical(context, handler, wrapper.thisObject)) {
                                return;
                            }
                        }

                        this[QUEUE].push(wrapper);
                    };

                    /**
                     * 移除一个或全部处理函数
                     *
                     * @param {Function | boolean} [handler] 指定移除的处理函数，
                     * 如不提供则移除全部处理函数，可以传递`false`作为特殊的处理函数
                     * @param {Mixed} [thisObject] 指定函数对应的`this`对象，
                     * 不提供则仅移除没有挂载`this`对象的那些处理函数
                     */


                    EventQueue.prototype.remove = function remove(handler, thisObject) {
                        // 如果没提供`handler`，则直接清空
                        if (!handler) {
                            this.clear();
                            return;
                        }

                        for (var i = 0; i < this[QUEUE].length; i++) {
                            var context = this[QUEUE][i];

                            if (isContextIdentical(context, handler, thisObject)) {
                                // 为了让`execute`过程中调用的`remove`工作正常，
                                // 这里不能用`splice`直接删除，仅设为`null`留下这个空间
                                this[QUEUE][i] = null;

                                // 完全符合条件的处理函数在`add`时会去重，因此这里肯定只有一个
                                return;
                            }
                        }
                    };

                    /**
                     * 移除全部处理函数，如果队列执行时调用这个函数，会导致剩余的处理函数不再执行
                     */


                    EventQueue.prototype.clear = function clear() {
                        this[QUEUE].length = 0;
                    };

                    /**
                     * 执行所有处理函数
                     *
                     * @param {Event} event 事件对象
                     * @param {Mixed} thisObject 函数执行时的`this`对象
                     */


                    EventQueue.prototype.execute = function execute(event, thisObject) {
                        // 如果执行过程中销毁，`dispose`会把`this[QUEUE]`弄掉，所以这里留一个引用，
                        // 在`dispose`中会额外把数组清空，因此不用担心后续的函数会执行
                        var queue = this[QUEUE];
                        for (var i = 0; i < queue.length; i++) {
                            if (typeof event.isImmediatePropagationStopped === 'function' && event.isImmediatePropagationStopped()) {
                                return;
                            }

                            var context = queue[i];

                            // 移除事件时设置为`null`，因此可能无值
                            if (!context) {
                                continue;
                            }

                            var handler = context.handler;

                            // `false`等同于两个方法的调用
                            if (handler === false) {
                                if (typeof event.preventDefault === 'function') {
                                    event.preventDefault();
                                }
                                if (typeof event.stopPropagation === 'function') {
                                    event.stopPropagation();
                                }
                            } else {
                                // 这里不需要做去重处理了，在`on`的时候会去重，因此这里不可能重复
                                handler.call(context.thisObject || thisObject, event);
                            }

                            if (context.once) {
                                this.remove(context.handler, context.thisObject);
                            }
                        }
                    };

                    /**
                     * 获取队列的长度
                     *
                     * @return {number}
                     */


                    EventQueue.prototype.length = function length() {
                        return this[QUEUE].filter(function (item) {
                            return !!item;
                        }).length;
                    };

                    /**
                     * 销毁
                     *
                     * 如果在队列执行的过程中销毁了对象，则在对象销毁后，剩余的处理函数不会再执行了
                     */


                    EventQueue.prototype.dispose = function dispose() {
                        // 在执行过程中被销毁的情况下，这里`length`置为0，循环就走不下去了
                        this.clear();
                        this[QUEUE] = null;
                    };

                    return EventQueue;
                }();

                exports['default'] = EventQueue;

                /***/
}
/******/]);
});
});