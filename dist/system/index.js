'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
	value: true,
})
exports.System = void 0

var _defineProperty2 = _interopRequireDefault(
	require('@babel/runtime/helpers/defineProperty')
)

var _classCallCheck2 = _interopRequireDefault(
	require('@babel/runtime/helpers/classCallCheck')
)

var _createClass2 = _interopRequireDefault(
	require('@babel/runtime/helpers/createClass')
)

var _database = require('../database')

var _routes = require('../routes')

function ownKeys(object, enumerableOnly) {
	var keys = Object.keys(object)
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object)
		if (enumerableOnly)
			symbols = symbols.filter(function(sym) {
				return Object.getOwnPropertyDescriptor(object, sym).enumerable
			})
		keys.push.apply(keys, symbols)
	}
	return keys
}

function _objectSpread(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {}
		if (i % 2) {
			ownKeys(Object(source), true).forEach(function(key) {
				;(0, _defineProperty2['default'])(target, key, source[key])
			})
		} else if (Object.getOwnPropertyDescriptors) {
			Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
		} else {
			ownKeys(Object(source)).forEach(function(key) {
				Object.defineProperty(
					target,
					key,
					Object.getOwnPropertyDescriptor(source, key)
				)
			})
		}
	}
	return target
}

var System = /*#__PURE__*/ (function() {
	function System(settings) {
		;(0, _classCallCheck2['default'])(this, System)

		if (settings) {
			this.db = new _database.Database(settings)
			this.api = new _routes.Routes(settings)
		}
	}

	;(0, _createClass2['default'])(System, [
		{
			key: 'createTable',
			value: function createTable(name, structure, indexes, options) {
				return this.db.createTable(name, structure, indexes, options)
			},
		},
		{
			key: 'createApi',
			value: function createApi(name, model) {
				return this.api.createApi(name, model)
			},
		},
		{
			key: 'generateService',
			value: function generateService(name, dbStructure, dbIndexes, dbOptions) {
				var _name = name

				var _model = this.createTable(
					_name,
					_objectSpread({}, dbStructure),
					dbIndexes,
					dbOptions
				)

				var _api = this.createApi(_name, _model)

				return {
					model: _model,
					api: _api,
				}
			},
		},
		{
			key: 'createRoute',
			value: function createRoute(name, action, controller, rootEndpoint) {
				return this.api.createRoute(name, action, controller, rootEndpoint)
			},
		},
	])
	return System
})()

exports.System = System
