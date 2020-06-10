'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
	value: true,
})
exports.Routes = void 0

var _classCallCheck2 = _interopRequireDefault(
	require('@babel/runtime/helpers/classCallCheck')
)

var _createClass2 = _interopRequireDefault(
	require('@babel/runtime/helpers/createClass')
)

var _expressjs = require('./expressjs')

var Routes = /*#__PURE__*/ (function() {
	function Routes(settings) {
		;(0, _classCallCheck2['default'])(this, Routes)
		this.settings = settings

		if (this.settings.API_DRIVER === 'express') {
			this.app = new _expressjs.ExpressJs(this.settings)
		}
	}

	;(0, _createClass2['default'])(Routes, [
		{
			key: 'createApi',
			value: function createApi(name, model) {
				return this.app.initEndpoints(name, model)
			},
		},
		{
			key: 'createRoute',
			value: function createRoute(name, action, controller, rootEndpoint) {
				return this.app.createEndpoint(name, action, controller, rootEndpoint)
			},
		},
	])
	return Routes
})()

exports.Routes = Routes
