"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaggieBrein = void 0;
var _fuse = _interopRequireDefault(require("fuse.js"));
var _BasicFollowUpQuestion = require("./../answers/questions/BasicFollowUpQuestion");
var _Bye = require("./../answers/Bye");
var _Goodmorning = require("./../answers/Goodmorning");
var _Timeout = require("../answers/Timeout");
var _How = require("./../answers/How");
var _Why = require("./../answers/Why");
var _Joke = require("./../answers/Joke");
var _Thanks = require("./../answers/Thanks");
var _Howmuch = require("./../answers/Howmuch");
var _Sluip = require("./../answers/youtube/Sluip");
var _Weetjes = require("./../answers/weetjes/Weetjes");
var _When = require("./../answers/When");
var _Where = require("./../answers/Where");
var _MaggieMond = require("./MaggieMond");
var _Tokenizer = require("./tokenizer/Tokenizer");
var _HowYouDoing = require("./../answers/HowYouDoing");
var _lodash = require("lodash");
var _Countries = require("../answers/Countries");
var _Sorry = require("../answers/Sorry");
var _Hoer = require("../answers/Hoer");
var _Food = require("../answers/food/Food");
var _Images = require("../answers/image/Images");
var _BaseGameService = require("./game/BaseGameService");
var _MoodService = require("./MoodService");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var tokenizer = new _Tokenizer.TokenizerService();
var MAX_MESSAGES_MEM = 10;
var SIZE_DUPLICATE = 3;
var SIZE_MONOLOGUE = 8;
var PID_DUPLICATE = 3;
var PID_MONOLOGUE = 10;
var MaggieBrein = /*#__PURE__*/function () {
  function MaggieBrein(platform) {
    var _this = this;
    _classCallCheck(this, MaggieBrein);
    _defineProperty(this, "gameService", void 0);
    _defineProperty(this, "maggieMond", void 0);
    _defineProperty(this, "matches", this.getSimpeleMaggieMatches(this.getMood()));
    _defineProperty(this, "messages", []);
    _defineProperty(this, "moodService", void 0);
    _defineProperty(this, "getFuzzyMatch", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(tokens) {
        var _this$matches;
        var tokenizedMatches, fuse, searchTokensPromises, result, flatten, reduced, reducedKeys, sorted, sortedList, filtered;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                tokenizedMatches = (_this$matches = _this.matches) === null || _this$matches === void 0 ? void 0 : _this$matches.flatMap(function (match) {
                  var _match$names;
                  return match === null || match === void 0 ? void 0 : (_match$names = match.names) === null || _match$names === void 0 ? void 0 : _match$names.flatMap(function (name) {
                    return _objectSpread(_objectSpread({}, match), {}, {
                      names: _this.getTokens(name)
                    });
                  });
                });
                fuse = new _fuse["default"](tokenizedMatches, {
                  keys: ["names"],
                  includeScore: true,
                  isCaseSensitive: false,
                  ignoreLocation: false
                });
                searchTokensPromises = tokens.map( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(token) {
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            return _context.abrupt("return", new Promise(function (resolve, reject) {
                              var matched = fuse.search({
                                names: token
                              });
                              matched ? resolve(matched) : reject([]);
                            }));
                          case 1:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));
                  return function (_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                _context2.next = 5;
                return Promise.all(searchTokensPromises);
              case 5:
                result = _context2.sent;
                flatten = (0, _lodash.flatMap)(result);
                reduced = flatten.reduce(function (results, match) {
                  var _results$match$refInd, _results$match$refInd2, _results$match$refInd3;
                  var matchedResults = ((_results$match$refInd = results[match.refIndex]) === null || _results$match$refInd === void 0 ? void 0 : _results$match$refInd.values) || [];
                  matchedResults.push(match);
                  results[match.refIndex] = _objectSpread(_objectSpread({}, results[match.refIndex]), {}, {
                    values: matchedResults
                  });
                  results[match.refIndex]["score"] = (_results$match$refInd2 = results[match.refIndex]) !== null && _results$match$refInd2 !== void 0 && _results$match$refInd2.score ? ((_results$match$refInd3 = results[match.refIndex]) === null || _results$match$refInd3 === void 0 ? void 0 : _results$match$refInd3.score) + (match === null || match === void 0 ? void 0 : match.score) : match === null || match === void 0 ? void 0 : match.score;
                  results[match.refIndex]["avgScore"] = results[match.refIndex].score / (matchedResults === null || matchedResults === void 0 ? void 0 : matchedResults.length);
                  results[match.refIndex]["distanceScore"] = (tokens === null || tokens === void 0 ? void 0 : tokens.length) - (matchedResults === null || matchedResults === void 0 ? void 0 : matchedResults.length);
                  results[match.refIndex]["finalScore"] = results[match.refIndex].avgScore + results[match.refIndex].distanceScore * results[match.refIndex].avgScore;
                  return results;
                }, {});
                reducedKeys = Object.keys(reduced);
                sorted = reducedKeys.sort(function (k1, k2) {
                  var _reduced$k, _reduced$k2;
                  return ((_reduced$k = reduced[k1]) === null || _reduced$k === void 0 ? void 0 : _reduced$k.finalScore) - ((_reduced$k2 = reduced[k2]) === null || _reduced$k2 === void 0 ? void 0 : _reduced$k2.finalScore);
                });
                sortedList = sorted.map(function (sort) {
                  return reduced[sort];
                });
                filtered = sortedList.filter(function (sort) {
                  return (sort === null || sort === void 0 ? void 0 : sort.finalScore) < 0.001;
                });
                return _context2.abrupt("return", filtered !== null && filtered !== void 0 && filtered.length ? filtered[0].values[0].item : null);
              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    _defineProperty(this, "getExactMatches", function (tokens) {
      return _this.matches.filter(function (match) {
        return tokens.some(function (token) {
          //const nameTokens = match?.names?.flatMap((name) => this.getTokens(name));
          return match.names.includes(token);
        });
      });
    });
    _defineProperty(this, "getTokens", function (text) {
      return tokenizer.tokenize(text);
    });
    _defineProperty(this, "getMessageMatches", function (messages) {
      var matches = [{
        isMatchFn: function isMatchFn() {
          return (messages === null || messages === void 0 ? void 0 : messages.length) >= SIZE_DUPLICATE;
        },
        getMessage: function getMessage() {
          if (_this.isDuplicateAnswer(messages, SIZE_DUPLICATE)) {
            var _messages;
            return (_messages = messages[(messages === null || messages === void 0 ? void 0 : messages.length) - 1]) === null || _messages === void 0 ? void 0 : _messages.text;
          }
        },
        pid: PID_DUPLICATE
      }, {
        isMatchFn: function isMatchFn() {
          return (messages === null || messages === void 0 ? void 0 : messages.length) >= SIZE_MONOLOGUE;
        },
        getMessage: function getMessage() {
          if (_this.isMonologueAnswer(messages, SIZE_MONOLOGUE)) {
            return _this.maggieMond.sayMonologue();
          }
        },
        pid: PID_MONOLOGUE
      }, {
        isMatchFn: function isMatchFn() {
          var _messages2;
          return _Hoer.HOER_TRIGGER.includes((_messages2 = messages[messages.length - 1]) === null || _messages2 === void 0 ? void 0 : _messages2.text);
        },
        getMessage: function getMessage() {
          return _this.maggieMond.sayHoer();
        },
        pid: 5
      }];
      return matches.filter(function (match) {
        return match === null || match === void 0 ? void 0 : match.isMatchFn();
      });
    });
    _defineProperty(this, "isDuplicateAnswer", function (messages, size) {
      var startIndex = (messages === null || messages === void 0 ? void 0 : messages.length) - size;
      var endIndex = messages === null || messages === void 0 ? void 0 : messages.length;
      var messagesBag = messages === null || messages === void 0 ? void 0 : messages.slice(startIndex, endIndex);
      return messagesBag === null || messagesBag === void 0 ? void 0 : messagesBag.every(function (m) {
        return m.text === messagesBag[0].text && m.user !== _this.id;
      });
    });
    _defineProperty(this, "isMonologueAnswer", function (messages, size) {
      var startIndex = messages.length - size;
      var endIndex = messages.length;
      var messagesBag = messages.slice(startIndex, endIndex);
      return messagesBag === null || messagesBag === void 0 ? void 0 : messagesBag.every(function (m) {
        return m.user === messagesBag[0].user;
      });
    });
    this.gameService = new _BaseGameService.BaseGameService(platform);
    this.maggieMond = new _MaggieMond.MaggieMond(platform);
    this.moodService = new _MoodService.MoodService();
  }
  _createClass(MaggieBrein, [{
    key: "setMood",
    value: function setMood(textInput) {
      this.moodService.setMood(textInput);
    }
  }, {
    key: "getMood",
    value: function getMood() {
      if (this.moodService) {
        this.moodService.getMood();
      }
    }
  }, {
    key: "playGame",
    value: function playGame(textInput, user) {
      this.gameService.initGame(textInput, user);
      return this.gameService.playGame(textInput, user);
    }
  }, {
    key: "getSimpeleMaggieMatches",
    value: function getSimpeleMaggieMatches(mood) {
      var _this2 = this;
      return [{
        names: _Bye.BYE_TRIGGER,
        action: function action() {
          return _this2.maggieMond.sayBye();
        }
      }, {
        names: [_Countries.COUNTRY_TRIGGER],
        action: function action() {
          return _this2.maggieMond.sayCountry();
        }
      }, {
        names: _Goodmorning.GOODMORNING_TRIGGER,
        action: function action() {
          return _this2.maggieMond.sayGoodMorning();
        }
      }, {
        names: _Why.WHY_TRIGGER,
        action: function action(text) {
          return _this2.maggieMond.sayWhy(text);
        }
      }, {
        names: _How.HOW_TRIGGER,
        action: function action(text) {
          return _this2.maggieMond.sayHow(text);
        }
      }, {
        names: _HowYouDoing.HOW_YOU_DOING_TRIGGER,
        action: function action(text, mood) {
          return _this2.maggieMond.sayHowYouDoing(text, mood);
        }
      }, {
        names: _Joke.JOKE_TRIGGER,
        action: function action() {
          return _this2.maggieMond.sayJoke();
        }
      }, {
        names: _Howmuch.HOWMUCH_TRIGGER,
        action: function action(text) {
          return _this2.maggieMond.sayHowMuch(text);
        }
      }, {
        names: _Sluip.SLUIP_TRIGGER,
        action: function () {
          var _action = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", _this2.maggieMond.saySluip());
                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));
          function action() {
            return _action.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: _Thanks.THANKS_TRIGGER,
        action: function action() {
          return _this2.maggieMond.sayThanks();
        }
      }, {
        names: _When.WHEN_TRIGGER,
        action: function action() {
          return _this2.maggieMond.sayWhen();
        }
      }, {
        names: _Where.WHERE_TRIGGER,
        action: function action(text) {
          return _this2.maggieMond.sayWhere(text);
        }
      }, {
        names: _Weetjes.WEETJES_TRIGGER,
        action: function () {
          var _action2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return _this2.maggieMond.sayWeetje();
                  case 2:
                    return _context4.abrupt("return", _context4.sent);
                  case 3:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));
          function action() {
            return _action2.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: ["wie"],
        action: function action() {
          return _this2.maggieMond.sayRandomUser();
        }
      }, {
        names: ["wat"],
        action: function action(text) {
          return _this2.maggieMond.sayWhat(text);
        }
      }, {
        names: ["tag"],
        action: function action(text) {
          return _this2.maggieMond.tagUser(text);
        }
      }, {
        names: ["scheld", "scheldt"],
        action: function action(text) {
          return _this2.maggieMond.scheldUser(text);
        }
      }, {
        names: _Sorry.SORRY_TRIGGER,
        action: function action(text) {
          return _this2.maggieMond.saySorry();
        }
      }, {
        names: ["verjaardag", "jarig", "jaardag", "verjaardagen"],
        action: function action(text) {
          return _this2.maggieMond.sayBirthDay(text);
        }
      }, {
        names: ["hoelaat", "uur"],
        action: function action(text) {
          return _this2.maggieMond.sayTime(text);
        }
      }, {
        names: ["youtube random", "zoek youtube", "muziek"],
        action: function () {
          var _action3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(text) {
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return _this2.maggieMond.sayRandomYoutube(text);
                  case 2:
                    return _context5.abrupt("return", _context5.sent);
                  case 3:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          }));
          function action(_x3) {
            return _action3.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: ["youtube exact", "geef video over"],
        action: function () {
          var _action4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(text) {
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return _this2.maggieMond.sayExactYoutube(text);
                  case 2:
                    return _context6.abrupt("return", _context6.sent);
                  case 3:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          }));
          function action(_x4) {
            return _action4.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: ["grietje", "wufke", "slet"],
        action: function () {
          var _action5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return _this2.maggieMond.showGirl();
                  case 2:
                    return _context7.abrupt("return", _context7.sent);
                  case 3:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7);
          }));
          function action() {
            return _action5.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: ["hoertjes", "hoertje", "pron"],
        action: function () {
          var _action6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(text) {
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return _this2.maggieMond.sayExactTube(text);
                  case 2:
                    return _context8.abrupt("return", _context8.sent);
                  case 3:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8);
          }));
          function action(_x5) {
            return _action6.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: ["cosplay"],
        action: function () {
          var _action7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
            return _regeneratorRuntime().wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return _this2.maggieMond.showCosplay();
                  case 2:
                    return _context9.abrupt("return", _context9.sent);
                  case 3:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee9);
          }));
          function action() {
            return _action7.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: ["nsfw"],
        action: function () {
          var _action8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
            return _regeneratorRuntime().wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return _this2.maggieMond.showNsfw();
                  case 2:
                    return _context10.abrupt("return", _context10.sent);
                  case 3:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee10);
          }));
          function action() {
            return _action8.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: ["9gag", "ninegag", "meme"],
        action: function () {
          var _action9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
            return _regeneratorRuntime().wrap(function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.next = 2;
                    return _this2.maggieMond.showMeme();
                  case 2:
                    return _context11.abrupt("return", _context11.sent);
                  case 3:
                  case "end":
                    return _context11.stop();
                }
              }
            }, _callee11);
          }));
          function action() {
            return _action9.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: ["nieuws", "news", "hln", "gazet"],
        action: function () {
          var _action10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
            return _regeneratorRuntime().wrap(function _callee12$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    _context12.next = 2;
                    return _this2.maggieMond.readTheNews();
                  case 2:
                    return _context12.abrupt("return", _context12.sent);
                  case 3:
                  case "end":
                    return _context12.stop();
                }
              }
            }, _callee12);
          }));
          function action() {
            return _action10.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: ["euromillions", "euromillions"],
        action: function action() {
          return _this2.maggieMond.tellNextEuroMillionsDraw();
        }
      }, {
        names: ["weer"],
        action: function () {
          var _action11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(text) {
            var city;
            return _regeneratorRuntime().wrap(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    city = text === null || text === void 0 ? void 0 : text.replace("weer", "");
                    _context13.next = 3;
                    return _this2.maggieMond.sayCurrentWeather(city);
                  case 3:
                    return _context13.abrupt("return", _context13.sent);
                  case 4:
                  case "end":
                    return _context13.stop();
                }
              }
            }, _callee13);
          }));
          function action(_x6) {
            return _action11.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: ["pollution"],
        action: function () {
          var _action12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(text) {
            var city;
            return _regeneratorRuntime().wrap(function _callee14$(_context14) {
              while (1) {
                switch (_context14.prev = _context14.next) {
                  case 0:
                    city = text === null || text === void 0 ? void 0 : text.replace("pollution", "");
                    _context14.next = 3;
                    return _this2.maggieMond.sayCurrentWeatherPollution(city);
                  case 3:
                    return _context14.abrupt("return", _context14.sent);
                  case 4:
                  case "end":
                    return _context14.stop();
                }
              }
            }, _callee14);
          }));
          function action(_x7) {
            return _action12.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: ["weer voorspelling", "voorspelling"],
        action: function () {
          var _action13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(text) {
            var city;
            return _regeneratorRuntime().wrap(function _callee15$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    city = text === null || text === void 0 ? void 0 : text.replace("voorspelling", "").replace("weer", "");
                    _context15.next = 3;
                    return _this2.maggieMond.sayForecastWeather(city);
                  case 3:
                    return _context15.abrupt("return", _context15.sent);
                  case 4:
                  case "end":
                    return _context15.stop();
                }
              }
            }, _callee15);
          }));
          function action(_x8) {
            return _action13.apply(this, arguments);
          }
          return action;
        }()
      },
      /*{
        names: ["zou", "doen", "doenbaar"],
        action: async (text, context, imageUrl) => {
          return await this.maggieMond.recognize(imageUrl);
        },
      },*/
      {
        names: ["maand"],
        action: function () {
          var _action14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
            return _regeneratorRuntime().wrap(function _callee16$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    _context16.next = 2;
                    return _this2.maggieMond.sayMonth();
                  case 2:
                    return _context16.abrupt("return", _context16.sent);
                  case 3:
                  case "end":
                    return _context16.stop();
                }
              }
            }, _callee16);
          }));
          function action() {
            return _action14.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: ["welk spel"],
        action: function () {
          var _action15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
            return _regeneratorRuntime().wrap(function _callee17$(_context17) {
              while (1) {
                switch (_context17.prev = _context17.next) {
                  case 0:
                    _context17.next = 2;
                    return _this2.maggieMond.sayGame();
                  case 2:
                    return _context17.abrupt("return", _context17.sent);
                  case 3:
                  case "end":
                    return _context17.stop();
                }
              }
            }, _callee17);
          }));
          function action() {
            return _action15.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: _Food.FOOD_TRIGGER,
        action: function () {
          var _action16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(text) {
            return _regeneratorRuntime().wrap(function _callee18$(_context18) {
              while (1) {
                switch (_context18.prev = _context18.next) {
                  case 0:
                    _context18.next = 2;
                    return _this2.maggieMond.sayFood(text);
                  case 2:
                    return _context18.abrupt("return", _context18.sent);
                  case 3:
                  case "end":
                    return _context18.stop();
                }
              }
            }, _callee18);
          }));
          function action(_x9) {
            return _action16.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: _BasicFollowUpQuestion.BASIC_FOLLOWUP_TRIGGER,
        action: function action() {
          return _this2.maggieMond.askBasicFollowUpQuestion();
        }
      }, {
        names: ["wie mol"],
        action: function () {
          var _action17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
            return _regeneratorRuntime().wrap(function _callee19$(_context19) {
              while (1) {
                switch (_context19.prev = _context19.next) {
                  case 0:
                    return _context19.abrupt("return", _this2.maggieMond.sayMolName());
                  case 1:
                  case "end":
                    return _context19.stop();
                }
              }
            }, _callee19);
          }));
          function action() {
            return _action17.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: ["kleur"],
        action: function action() {
          return _this2.maggieMond.sayColour();
        }
      }, {
        names: ["wiki", "wikipedia"],
        action: function () {
          var _action18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(text) {
            return _regeneratorRuntime().wrap(function _callee20$(_context20) {
              while (1) {
                switch (_context20.prev = _context20.next) {
                  case 0:
                    _context20.next = 2;
                    return _this2.maggieMond.sayWiki(text);
                  case 2:
                    return _context20.abrupt("return", _context20.sent);
                  case 3:
                  case "end":
                    return _context20.stop();
                }
              }
            }, _callee20);
          }));
          function action(_x10) {
            return _action18.apply(this, arguments);
          }
          return action;
        }()
      },
      /*{
        names: ["wat is", "wie is", "vertel meer over"],
        action: async (text) => await this.maggieMond.sayWikiSummary(text),
      }, */
      {
        names: _Images.IMAGE_TRIGGER,
        action: function () {
          var _action19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(text) {
            return _regeneratorRuntime().wrap(function _callee21$(_context21) {
              while (1) {
                switch (_context21.prev = _context21.next) {
                  case 0:
                    _context21.next = 2;
                    return _this2.maggieMond.sayImage(text);
                  case 2:
                    return _context21.abrupt("return", _context21.sent);
                  case 3:
                  case "end":
                    return _context21.stop();
                }
              }
            }, _callee21);
          }));
          function action(_x11) {
            return _action19.apply(this, arguments);
          }
          return action;
        }()
      }, {
        names: [_Timeout.TIMEOUT_STOP_TRIGGER],
        action: function action() {
          return _this2.maggieMond.askForStopTimeout();
        }
      }, {
        names: ["mop", "mopje", "grapje"],
        action: function () {
          var _action20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(text) {
            return _regeneratorRuntime().wrap(function _callee22$(_context22) {
              while (1) {
                switch (_context22.prev = _context22.next) {
                  case 0:
                    _context22.next = 2;
                    return _this2.maggieMond.sayMopje(text);
                  case 2:
                    return _context22.abrupt("return", _context22.sent);
                  case 3:
                  case "end":
                    return _context22.stop();
                }
              }
            }, _callee22);
          }));
          function action(_x12) {
            return _action20.apply(this, arguments);
          }
          return action;
        }()
      }];
    }
  }, {
    key: "pushMessage",
    value: function pushMessage(message) {
      var _this$messages;
      if (((_this$messages = this.messages) === null || _this$messages === void 0 ? void 0 : _this$messages.length) > MAX_MESSAGES_MEM) {
        this.messages.shift();
      }
      this.messages.push(message);
    }
  }]);
  return MaggieBrein;
}();
exports.MaggieBrein = MaggieBrein;