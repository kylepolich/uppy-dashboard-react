var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var DragDropPlugin = require('@uppy/drag-drop');
var propTypes = require('./propTypes');

var h = React.createElement;

/**
 * React component that renders an area in which files can be dropped to be
 * uploaded.
 */

var DragDrop = function (_React$Component) {
  _inherits(DragDrop, _React$Component);

  function DragDrop() {
    _classCallCheck(this, DragDrop);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DragDrop.prototype.componentDidMount = function componentDidMount() {
    this.installPlugin();
  };

  DragDrop.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.uppy !== this.props.uppy) {
      this.uninstallPlugin(prevProps);
      this.installPlugin();
    }
  };

  DragDrop.prototype.componentWillUnmount = function componentWillUnmount() {
    this.uninstallPlugin();
  };

  DragDrop.prototype.installPlugin = function installPlugin() {
    var uppy = this.props.uppy;
    var options = _extends({ id: 'react:DragDrop' }, this.props, { target: this.container });
    delete options.uppy;

    uppy.use(DragDropPlugin, options);

    this.plugin = uppy.getPlugin(options.id);
  };

  DragDrop.prototype.uninstallPlugin = function uninstallPlugin() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

    var uppy = props.uppy;

    uppy.removePlugin(this.plugin);
  };

  DragDrop.prototype.render = function render() {
    var _this2 = this;

    return h('div', {
      ref: function ref(container) {
        _this2.container = container;
      }
    });
  };

  return DragDrop;
}(React.Component);

DragDrop.propTypes = {
  uppy: propTypes.uppy,
  locale: propTypes.locale
};
DragDrop.defaultProps = {};

module.exports = DragDrop;