var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
var StatusBarPlugin = require('@uppy/status-bar');
var uppyPropType = require('./propTypes').uppy;

var h = React.createElement;

/**
 * React component that renders a status bar containing upload progress and speed,
 * processing progress and pause/resume/cancel controls.
 */

var StatusBar = function (_React$Component) {
  _inherits(StatusBar, _React$Component);

  function StatusBar() {
    _classCallCheck(this, StatusBar);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  StatusBar.prototype.componentDidMount = function componentDidMount() {
    this.installPlugin();
  };

  StatusBar.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.uppy !== this.props.uppy) {
      this.uninstallPlugin(prevProps);
      this.installPlugin();
    }
  };

  StatusBar.prototype.componentWillUnmount = function componentWillUnmount() {
    this.uninstallPlugin();
  };

  StatusBar.prototype.installPlugin = function installPlugin() {
    var uppy = this.props.uppy;
    var options = _extends({ id: 'react:StatusBar' }, this.props, { target: this.container });
    delete options.uppy;

    uppy.use(StatusBarPlugin, options);

    this.plugin = uppy.getPlugin(options.id);
  };

  StatusBar.prototype.uninstallPlugin = function uninstallPlugin() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

    var uppy = props.uppy;

    uppy.removePlugin(this.plugin);
  };

  StatusBar.prototype.render = function render() {
    var _this2 = this;

    return h('div', {
      ref: function ref(container) {
        _this2.container = container;
      }
    });
  };

  return StatusBar;
}(React.Component);

StatusBar.propTypes = {
  uppy: uppyPropType,
  hideAfterFinish: PropTypes.bool,
  showProgressDetails: PropTypes.bool
};
StatusBar.defaultProps = {};

module.exports = StatusBar;