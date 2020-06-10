'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
	value: true,
})
exports.Check = void 0

var _typeof2 = _interopRequireDefault(require('@babel/runtime/helpers/typeof'))

var _classCallCheck2 = _interopRequireDefault(
	require('@babel/runtime/helpers/classCallCheck')
)

var _createClass2 = _interopRequireDefault(
	require('@babel/runtime/helpers/createClass')
)

var Check = /*#__PURE__*/ (function() {
	function Check(object, type) {
		;(0, _classCallCheck2['default'])(this, Check)
		this.object = object
		this.type = type

		if (typeof type === 'string') {
			this.checkBasicTypes()
		} else if ((0, _typeof2['default'])(type) === 'object') {
		}
	}

	;(0, _createClass2['default'])(Check, [
		{
			key: 'checkBasicTypes',
			value: function checkBasicTypes() {
				if ((0, _typeof2['default'])(this.object) !== this.type) {
					throw new Error('Object does not match type ' + this.type)
				}
			},
		},
	])
	return Check
})()

exports.Check = Check
