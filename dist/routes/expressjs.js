'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
	value: true,
})
exports.ExpressJs = void 0

var _classCallCheck2 = _interopRequireDefault(
	require('@babel/runtime/helpers/classCallCheck')
)

var _createClass2 = _interopRequireDefault(
	require('@babel/runtime/helpers/createClass')
)

var _constants = require('../config/constants')

var _controllers = require('../controllers')

var express = require('express')

var bodyParser = require('body-parser')

var ExpressJs = /*#__PURE__*/ (function() {
	function ExpressJs(settings) {
		var _this = this

		;(0, _classCallCheck2['default'])(this, ExpressJs)
		this.port = settings.APP_PORT || _constants.Constants.APP_PORT
		this.settings = settings
		this.app = express()
		this.app.use(function(req, res, next) {
			res.header('Access-Control-Allow-Origin', '*')
			res.header('Access-Control-Allow-Credentials', 'true')
			res.header(
				'Access-Control-Allow-Methods',
				'GET,HEAD,PUT,PATCH,POST,DELETE'
			)
			res.header('Access-Control-Expose-Headers', 'Content-Length')
			res.header(
				'Access-Control-Allow-Headers',
				'Accept, Authorization, Content-Type, X-Requested-With, Range'
			)

			if (req.method === 'OPTIONS') {
				return res.send(200)
			} else {
				return next()
			}
		})
		this.app.use(bodyParser.json())
		this.app.listen(this.port, function() {
			console.log('app listening at port %s', _this.port)
		})
	}

	;(0, _createClass2['default'])(ExpressJs, [
		{
			key: 'createBasicEndpoint',
			value: function createBasicEndpoint() {
				var root = this.settings.API_ROOT || _constants.Constants.API_ROOT
				var version =
					this.settings.API_VERSION || _constants.Constants.API_VERSION
				return '/' + root + '/' + version + '/'
			},
		},
		{
			key: 'createEndpoints',
			value: function createEndpoints(name) {
				var basicEndpoint = this.createBasicEndpoint()
				var nameEndpoint = name
				var idEndpoint = ':_id'
				return {
					get: basicEndpoint + nameEndpoint,
					getSingle: basicEndpoint + nameEndpoint + '/' + idEndpoint,
					post: basicEndpoint + nameEndpoint,
					patchSingle: basicEndpoint + nameEndpoint + '/' + idEndpoint,
					delete: basicEndpoint + nameEndpoint + '/' + idEndpoint,
				}
			},
		},
		{
			key: 'initEndpoints',
			value: function initEndpoints(name, model) {
				var endpoints = this.createEndpoints(name)
				var controller = new _controllers.Controllers(model)
				this.app.get(endpoints.get, [
					function(req, res) {
						controller
							.list(req.query)
							.then(function(result) {
								res.status(200).send(result)
							})
							['catch'](function(error) {
								res.status(500).send(error)
							})
					},
				])
				this.app.get(endpoints.getSingle, [
					function(req, res) {
						controller
							.getById(req.params._id)
							.then(function(result) {
								res.status(200).send(result)
							})
							['catch'](function(error) {
								res.status(500).send(error)
							})
					},
				])
				this.app.post(endpoints.post, [
					function(req, res) {
						controller
							.insert(req.body)
							.then(function(result) {
								res.status(201).send(result)
							})
							['catch'](function(error) {
								res.status(500).send(error)
							})
					},
				])
				this.app.patch(endpoints.patchSingle, [
					function(req, res) {
						controller
							.patchById(req.params._id, req.body)
							.then(function(result) {
								res.status(201).send(result)
							})
							['catch'](function(error) {
								res.status(500).send(error)
							})
					},
				])
				this.app['delete'](endpoints['delete'], [
					function(req, res) {
						controller
							.removeById(req.params._id)
							.then(function(result) {
								res.status(201).send(result)
							})
							['catch'](function(error) {
								res.status(500).send(error)
							})
					},
				])
				return controller
			},
		},
		{
			key: 'createEndpoint',
			value: function createEndpoint(name, action, controller) {
				var rootEndpoint =
					arguments.length > 3 && arguments[3] !== undefined
						? arguments[3]
						: true
				var basicEndpoint = rootEndpoint ? this.createBasicEndpoint() : ''
				this.app[action](basicEndpoint + name, [
					function(req, res) {
						controller(req)
							.then(function(result) {
								res.status(201).send(result)
							})
							['catch'](function(error) {
								res.status(500).send(error)
							})
					},
				])
			},
		},
	])
	return ExpressJs
})()

exports.ExpressJs = ExpressJs
