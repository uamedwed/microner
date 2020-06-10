'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
	value: true,
})
exports.MongoDb = void 0

var _classCallCheck2 = _interopRequireDefault(
	require('@babel/runtime/helpers/classCallCheck')
)

var _createClass2 = _interopRequireDefault(
	require('@babel/runtime/helpers/createClass')
)

var MongoDb = /*#__PURE__*/ (function() {
	function MongoDb(model) {
		;(0, _classCallCheck2['default'])(this, MongoDb)
		this.model = model
	}

	;(0, _createClass2['default'])(MongoDb, [
		{
			key: 'add',
			value: function add(data) {
				var _this = this

				return new Promise(function(resolve, reject) {
					try {
						resolve(new _this.model(data).save())
					} catch (error) {
						reject(error)
					}
				})
			},
		},
		{
			key: 'findById',
			value: function findById(_id) {
				var _this2 = this

				return new Promise(function(resolve, reject) {
					_this2.model
						.findById(_id)
						.then(function(result) {
							resolve(result)
						})
						['catch'](function(error) {
							reject(error)
						})
				})
			},
		},
		{
			key: 'list',
			value: function list(perPage, page) {
				var _this3 = this

				return new Promise(function(resolve, reject) {
					_this3.model
						.find()
						.limit(perPage)
						.skip(perPage * page)
						.exec(function(err, users) {
							if (err) {
								reject(err)
							} else {
								resolve(users)
							}
						})
				})
			},
		},
		{
			key: 'update',
			value: function update(_id, data) {
				var _this4 = this

				return new Promise(function(resolve, reject) {
					_this4.model.findById(_id, function(err, model) {
						if (err) reject(err)

						for (var i in data) {
							model[i] = data[i]
						}

						model.save(function(err, updateModel) {
							if (err) return reject(err)
							resolve(updateModel)
						})
					})
				})
			},
		},
		{
			key: 'deleteOne',
			value: function deleteOne(_id) {
				var _this5 = this

				return new Promise(function(resolve, reject) {
					_this5.model.deleteOne(
						{
							_id: _id,
						},
						function(err) {
							if (err) {
								reject(err)
							} else {
								resolve(true)
							}
						}
					)
				})
			},
		},
		{
			key: 'deleteMany',
			value: function deleteMany(query) {
				var _this6 = this

				return new Promise(function(resolve, reject) {
					_this6.model.deleteMany(query, function(err) {
						if (err) {
							reject(err)
						} else {
							resolve(true)
						}
					})
				})
			},
		},
	])
	return MongoDb
})()

exports.MongoDb = MongoDb
