(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/data-cascade.ts":
/*!*****************************!*\
  !*** ./src/data-cascade.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DateCascade; });\n// date-cascade.ts\nclass DateCascade {\n    constructor(options) {\n        let date = new Date();\n        this.options = Object.assign({}, options);\n        this.el = document.getElementById(this.options.el);\n        this.startYear = this.options.startYear;\n        this.endYear = this.options.endYear;\n        this.currentYear = date.getFullYear();\n        this.currentMonth = date.getMonth() + 1;\n        this.currentDate = date.getDate();\n        this.monthDays = [31, this.isLeapYear(this.currentYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];\n        this.yearSelect = this.monthSelect = this.dateSelect = null;\n        this.init();\n    }\n    init() {\n        this.createSelectContainer();\n        this.handleSelectChange();\n        this.observer();\n    }\n    observer() {\n        this.currentState = {\n            currentYear: this.currentYear,\n            currentMonth: this.currentMonth,\n            currentDate: this.currentDate\n        };\n        Object.keys(this.currentState).forEach(props => {\n            Object.defineProperty(this, props, {\n                get() {\n                    return this.currentState[props];\n                },\n                set(val) {\n                    this.currentState[props] = val;\n                    DateCascade.changeCallback(this.currentState);\n                }\n            });\n        });\n    }\n    isLeapYear(year) {\n        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);\n    }\n    handleSelectChange() {\n        let { yearSelect, monthSelect, dateSelect } = this;\n        yearSelect.addEventListener('change', (e) => this.handleYearSelectChange(e));\n        monthSelect.addEventListener('change', (e) => this.handleMonthSelectChange(e));\n        dateSelect.addEventListener('change', (e) => this.handleDateSelectChange(e));\n    }\n    handleYearSelectChange({ target }) {\n        let { dateSelect } = this;\n        this.monthDays.splice(1, 1, this.isLeapYear(target.value) ? 29 : 28);\n        this.currentYear = +target.value;\n        this.renderDateSelect(dateSelect);\n    }\n    handleMonthSelectChange({ target }) {\n        let { dateSelect } = this;\n        this.currentMonth = +target.value;\n        this.renderDateSelect(dateSelect);\n    }\n    handleDateSelectChange({ target }) {\n        this.currentDate = +target.value;\n    }\n    createSelectContainer() {\n        let d = document;\n        let yearSelect = d.createElement('select');\n        let monthSelect = d.createElement('select');\n        let dateSelect = d.createElement('select');\n        yearSelect.setAttribute('data-type', 'year');\n        monthSelect.setAttribute('data-type', 'month');\n        dateSelect.setAttribute('data-type', 'date');\n        this.el.appendChild(yearSelect);\n        this.el.appendChild(monthSelect);\n        this.el.appendChild(dateSelect);\n        this.renderYearSelect(yearSelect);\n        this.renderMonthSelect(monthSelect);\n        this.renderDateSelect(dateSelect);\n        this.yearSelect = yearSelect;\n        this.monthSelect = monthSelect;\n        this.dateSelect = dateSelect;\n    }\n    setDefaultSelected(select, current) {\n        let index = Array.from(select.options).findIndex(options => +options.value === current);\n        select.options[~index ? index : 0].selected = true;\n        this.currentDate = ~index ? this.currentDate : 1;\n    }\n    renderYearSelect(select) {\n        let { startYear, endYear } = this;\n        let options = '';\n        for (let i = startYear; i <= endYear; i++) {\n            options += `<option value=\"${i}\">${i}</option>`;\n        }\n        select.innerHTML = options;\n        this.setDefaultSelected(select, this.currentYear);\n    }\n    renderMonthSelect(select) {\n        let options = '';\n        let monthDays = this.monthDays;\n        for (let i = 0; i < monthDays.length; i++) {\n            options += `<option value=\"${i + 1}\">${i + 1}</option>`;\n        }\n        select.innerHTML = options;\n        this.setDefaultSelected(select, this.currentMonth);\n    }\n    renderDateSelect(select) {\n        let options = '';\n        let days = this.monthDays[this.currentMonth - 1];\n        for (let i = 0; i < days; i++) {\n            options += `<option value=\"${i + 1}\">${i + 1}</option>`;\n        }\n        select.innerHTML = options;\n        this.setDefaultSelected(select, this.currentDate);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/data-cascade.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_cascade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data-cascade */ \"./src/data-cascade.ts\");\n\nconst result = new _data_cascade__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    el: 'demo',\n    startYear: 2010,\n    endYear: 2040\n});\nconst trigger = document.getElementById('trigger');\n_data_cascade__WEBPACK_IMPORTED_MODULE_0__[\"default\"].changeCallback = function (o) {\n    trigger.innerHTML = `${o.currentYear}-${o.currentMonth}-${o.currentDate}`;\n};\ntrigger.innerHTML = `${(result.currentState).currentYear}-${result.currentState.currentMonth}-${result.currentState.currentDate}`;\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });
});