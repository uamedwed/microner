'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
	value: true,
})
exports.Constants = void 0

var _classCallCheck2 = _interopRequireDefault(
	require('@babel/runtime/helpers/classCallCheck')
)

var Constants = function Constants() {
	;(0, _classCallCheck2['default'])(this, Constants)
	var envFileName =
		process.env.NODE_ENV === 'prod' ? '.env' : '.env.' + process.env.NODE_ENV

	require('dotenv').config({
		path: envFileName,
	})

	return {
		DB_DRIVER: process.env.DB_DRIVER || 'mongodb',
		DB_USER: process.env.DB_USER || '',
		DB_PASSWORD: process.env.DB_PASSWORD || '',
		DB_HOST: process.env.DB_HOST || '',
		DB_PORT: process.env.DB_PORT || '',
		DB_DATABASE_NAME: process.env.DB_DATABASE_NAME || '',
		APP_PORT: process.env.APP_PORT || 1300,
		API_DRIVER: process.env.API_DRIVER || 'express',
		API_TYPE: process.env.API_TYPE || 'rest',
		API_ROOT: process.env.API_ROOT || 'api',
		API_VERSION: process.env.API_VERSION || 'v1',
	}
}

exports.Constants = Constants
