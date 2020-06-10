'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
	value: true,
})
exports.Database = void 0

var _defineProperty2 = _interopRequireDefault(
	require('@babel/runtime/helpers/defineProperty')
)

var _classCallCheck2 = _interopRequireDefault(
	require('@babel/runtime/helpers/classCallCheck')
)

var _createClass2 = _interopRequireDefault(
	require('@babel/runtime/helpers/createClass')
)

var _config = require('../config')

var _mongodb = require('../models/mongodb')

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

var mongoose = require('mongoose')

var Database = /*#__PURE__*/ (function() {
	function Database(settings) {
		;(0, _classCallCheck2['default'])(this, Database)

		if (!settings) {
			settings = {
				driver: _config.configConstants.DB_DRIVER,
				user: _config.configConstants.DB_USER,
				password: _config.configConstants.DB_PASSWORD,
				host: _config.configConstants.DB_HOST,
				port: _config.configConstants.DB_PORT,
				databaseName: _config.configConstants.DB_DATABASE_NAME,
			}
		}

		this.settings = settings
		this.driver = settings.DB_DRIVER
		this.databaseUrl = this.connectString(this.settings)

		try {
			this.connect()
		} catch (error) {
			console.log(error)
		}
	}

	;(0, _createClass2['default'])(Database, [
		{
			key: 'connect',
			value: function connect() {
				if (this.driver === 'mongodb') {
					mongoose.connect(this.databaseUrl, {
						useUnifiedTopology: true,
						useNewUrlParser: true,
						useFindAndModify: false,
						useCreateIndex: true,
					})
				}
			},
		},
		{
			key: 'connectString',
			value: function connectString(settings) {
				if (this.driver === 'mongodb') {
					return (
						'mongodb://' +
						settings.DB_USER +
						':' +
						settings.DB_PASSWORD +
						'@' +
						settings.DB_HOST +
						':' +
						settings.DB_PORT +
						'/' +
						settings.DB_DATABASE_NAME
					)
				}
			},
		},
		{
			key: 'schema',
			value: function schema(structure, options) {
				if (this.driver === 'mongodb') {
					return new mongoose.Schema(structure, _objectSpread({}, options))
				}
			},
		},
		{
			key: 'createTable',
			value: function createTable(name, structure, indexes) {
				var options =
					arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {}

				if (this.driver === 'mongodb') {
					var schema = this.schema(structure, options)

					if (indexes && indexes.length > 0) {
						indexes.forEach(function(indexItem) {
							schema.index(indexItem)
						})
					}

					return new _mongodb.MongoDb(mongoose.model(name, schema, name))
				}
			},
		},
	])
	return Database
})()

exports.Database = Database
