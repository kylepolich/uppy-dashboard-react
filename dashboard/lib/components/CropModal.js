function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cropper = require('cropperjs');
require('cropperjs/dist/cropper.css');

var _require = require('preact'),
    h = _require.h,
    Component = _require.Component;

var CropModal = function (_Component) {
  _inherits(CropModal, _Component);

  function CropModal(props) {
    _classCallCheck(this, CropModal);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.cropper = null;

    _this.crop = _this.crop.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    _this.onClose = _this.onClose.bind(_this);
    _this.onSave = _this.onSave.bind(_this);
    return _this;
  }

  CropModal.prototype.componentDidMount = function componentDidMount() {
    console.log('componentDidMount: new Cropper...');
    var file = this.props.file;
    var image = document.getElementById(file.id);
    this.cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
      guides: true,
      crop: this.crop
    });
  };

  CropModal.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.active === false && this.props.active === true) {
      console.log('componentDidUpdate: new Cropper...');
      var file = this.props.file;
      var image = document.getElementById(file.id);
      this.cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        guides: true,
        crop: this.crop
      });
    }
  };

  CropModal.prototype.crop = function crop(ev) {
    console.log('x = ', ev.detail.x);
    console.log('y = ', ev.detail.y);
    console.log('w = ', ev.detail.width);
    console.log('h = ', ev.detail.height);
    console.log('ro = ', ev.detail.rotate);
    console.log('sx = ', ev.detail.scaleX);
    console.log('sy = ', ev.detail.scaleY);
  };

  CropModal.prototype.onClick = function onClick(ev) {
    if (ev.target === this.background) this.props.onClose(ev);
  };

  CropModal.prototype.onClose = function onClose(ev) {
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
    this.props.onClose(ev);
  };

  CropModal.prototype.onSave = function onSave(ev) {
    console.log('save...');
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
    this.props.onSave();
  };

  CropModal.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        active = _props.active,
        file = _props.file;


    return h(
      'div',
      { 'class': 'modal fade' + (active !== false ? ' d-block fade show' : ''), ref: function ref(background) {
          _this2.background = background;
        } },
      h(
        'div',
        { 'class': 'modal-dialog', role: 'document' },
        h(
          'div',
          { 'class': 'modal-content' },
          h(
            'div',
            { 'class': 'modal-header' },
            h(
              'h5',
              { 'class': 'modal-title', id: 'modalLabel' },
              'Cropper'
            ),
            h(
              'button',
              { type: 'button', 'class': 'close', 'aria-label': 'Close', onclick: this.onClose },
              h(
                'span',
                { 'aria-hidden': 'true' },
                '\xD7'
              )
            )
          ),
          h(
            'div',
            { 'class': 'modal-body' },
            h(
              'div',
              { 'class': 'img-container' },
              h('img', { id: file.id, src: file.preview, alt: 'Picture' })
            )
          ),
          h(
            'div',
            { 'class': 'modal-footer' },
            h(
              'button',
              { type: 'button', 'class': 'btn btn-secondary', onclick: this.onClose },
              'Close'
            ),
            h(
              'button',
              { type: 'button', 'class': 'btn btn-primary', onclick: this.onSave },
              'Save'
            )
          )
        )
      )
    );
  };

  return CropModal;
}(Component);

module.exports = CropModal;