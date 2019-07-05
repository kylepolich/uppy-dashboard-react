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

    _this.init = _this.init.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    _this.onClose = _this.onClose.bind(_this);
    _this.onSave = _this.onSave.bind(_this);
    return _this;
  }

  CropModal.prototype.componentDidMount = function componentDidMount() {
    this.init();
  };

  CropModal.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.active === false && this.props.active === true) {
      this.init();
    }
  };

  CropModal.prototype.init = function init() {
    var minCroppedWidth = 100;
    var minCroppedHeight = 100;
    var maxCroppedWidth = 640;
    var maxCroppedHeight = 640;
    console.log('new Cropper...');
    var file = this.props.file;
    var image = document.getElementById(file.id);
    var preview = document.getElementById('preview-' + file.id);
    if (this.cropper) this.cropper.destroy();
    this.cropper = new Cropper(image, {
      viewMode: 3,
      // initialAspectRatio: 4 / 3,
      // minContainerWidth: 400,
      // minContainerHeight: 300,
      // autoCropArea: 0.7,
      data: {
        width: (minCroppedWidth + maxCroppedWidth) / 2,
        height: (minCroppedHeight + maxCroppedHeight) / 2
      },
      ready: function ready() {
        var clone = this.cloneNode();

        clone.className = '';
        clone.style.cssText = 'display: block;' + 'width: 100%;' + 'min-width: 0;' + 'min-height: 0;' + 'max-width: none;' + 'max-height: none;';

        preview.appendChild(clone.cloneNode());
      },
      crop: function crop(event) {
        var width = event.detail.width;
        var height = event.detail.height;
        var cropper = this.cropper;
        // set dimensions
        if (width < minCroppedWidth || height < minCroppedHeight || width > maxCroppedWidth || height > maxCroppedHeight) {
          cropper.setData({
            width: Math.max(minCroppedWidth, Math.min(maxCroppedWidth, width)),
            height: Math.max(minCroppedHeight, Math.min(maxCroppedHeight, height))
          });
        }

        // set preview
        var previewAspectRatio = width / height;
        var previewWidth = preview.offsetWidth;
        var previewHeight = previewWidth / previewAspectRatio;
        preview.style.height = previewHeight + 'px';

        // set image in preview
        var previewImage = preview.getElementsByTagName('img').item(0);
        if (previewImage) {
          var imageData = cropper.getImageData();
          var imageScaledRatio = width / previewWidth;
          previewImage.style.width = imageData.naturalWidth / imageScaledRatio + 'px';
          previewImage.style.height = imageData.naturalHeight / imageScaledRatio + 'px';
          previewImage.style.marginLeft = -event.detail.x / imageScaledRatio + 'px';
          previewImage.style.marginTop = -event.detail.y / imageScaledRatio + 'px';
        }
      }
    });
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
    var cropOption = {
      width: 160, // TODO: should get from configuration
      height: 90, // TODO: should get from configuration
      minWidth: 256,
      minHeight: 256,
      maxWidth: 1024,
      maxHeight: 1024,
      fillColor: 'transparent',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'low' // 'low' or 'medium' or 'high'
    };
    var quality = 0.92; // TODO: check image size
    var blobUrl = this.cropper.getCroppedCanvas().toDataURL('image/png', quality);
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
    this.props.onSave(blobUrl);
  };

  CropModal.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        active = _props.active,
        file = _props.file;


    return h(
      'div',
      { 'class': 'modal fade' + (active !== false ? ' d-block fade show' : ''), style: { background: 'rgba(0,0,0,0.5)' }, onclick: this.onClick, ref: function ref(background) {
          _this2.background = background;
        } },
      h(
        'div',
        { 'class': 'modal-dialog', role: 'document', style: { maxWidth: 750 } },
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
              { style: { margin: 10, maxWidth: 700 } },
              h(
                'div',
                { 'class': 'row', style: { overflow: 'hidden' } },
                h(
                  'div',
                  { style: { float: 'left', width: '70%', background: 'gray' } },
                  h('img', { id: file.id, src: file.preview, alt: 'Picture', style: { maxWidth: '100%' } })
                ),
                h(
                  'div',
                  { style: { float: 'left', width: '30%', background: '#f7f7f7', padding: 5 } },
                  h('div', { id: 'preview-' + file.id, style: { overflow: 'hidden' } })
                )
              )
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
              'Crop'
            )
          )
        )
      )
    );
  };

  return CropModal;
}(Component);

module.exports = CropModal;