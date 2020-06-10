'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
	value: true,
})
exports.Controllers = void 0

var _classCallCheck2 = _interopRequireDefault(
	require('@babel/runtime/helpers/classCallCheck')
)

var _createClass2 = _interopRequireDefault(
	require('@babel/runtime/helpers/createClass')
)

var Controllers = /*#__PURE__*/ (function() {
	function Controllers(model) {
		;(0, _classCallCheck2['default'])(this, Controllers)
		this.model = model
	}

	;(0, _createClass2['default'])(Controllers, [
		{
			key: 'insert',
			value: function insert(data) {
				return this.model.add(data)
			},
		},
		{
			key: 'list',
			value: function list(query) {
				var limit =
					query.limit && query.limit <= 100 ? parseInt(query.limit) : 10
				var page = 0

				if (query) {
					if (query.page) {
						query.page = parseInt(query.page)
						page = Number.isInteger(query.page) ? query.page : 0
					}
				}

				return this.model.list(limit, page)
			},
		},
		{
			key: 'getById',
			value: function getById(_id) {
				return this.model.findById(_id)
			},
		},
		{
			key: 'patchById',
			value: function patchById(_id, data) {
				return this.model.update(_id, data)
			},
		},
		{
			key: 'removeById',
			value: function removeById(_id) {
				return this.model.deleteOne(_id)
			},
		},
	])
	return Controllers
})()

exports.Controllers = Controllers
