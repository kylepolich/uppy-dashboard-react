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
      { 'class': 'modal fade' + (active !== false ? ' d-block fade show' : ''), style: { background: 'rgba(0,0,0,0.5)' }, onclick: this.onClick, ref: function ref(background) {
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
              { 'class': 'row' },
              h(
                'div',
                { 'class': 'col-md-9' },
                h(
                  'div',
                  { style: { maxWidth: '100%' } },
                  h('img', { id: file.id, src: file.preview, alt: 'Picture' })
                )
              ),
              h(
                'div',
                { 'class': 'col-md-3' },
                h(
                  'div',
                  { 'class': 'docs-preview clearfix' },
                  h('div', { 'class': 'img-preview preview-lg' })
                ),
                h(
                  'div',
                  { 'class': 'btn-group' },
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'setDragMode', 'data-option': 'move', title: 'Move' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.setDragMode("move")' },
                      h('span', { 'class': 'fa fa-arrows-alt' })
                    )
                  ),
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'setDragMode', 'data-option': 'crop', title: 'Crop' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.setDragMode("crop")' },
                      h('span', { 'class': 'fa fa-crop-alt' })
                    )
                  )
                ),
                h(
                  'div',
                  { 'class': 'btn-group' },
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'zoom', 'data-option': '0.1', title: 'Zoom In' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.zoom(0.1)' },
                      h('span', { 'class': 'fa fa-search-plus' })
                    )
                  ),
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'zoom', 'data-option': '-0.1', title: 'Zoom Out' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.zoom(-0.1)' },
                      h('span', { 'class': 'fa fa-search-minus' })
                    )
                  )
                ),
                h(
                  'div',
                  { 'class': 'btn-group' },
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'move', 'data-option': '-10', 'data-second-option': '0', title: 'Move Left' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.move(-10, 0)' },
                      h('span', { 'class': 'fa fa-arrow-left' })
                    )
                  ),
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'move', 'data-option': '10', 'data-second-option': '0', title: 'Move Right' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.move(10, 0)' },
                      h('span', { 'class': 'fa fa-arrow-right' })
                    )
                  ),
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'move', 'data-option': '0', 'data-second-option': '-10', title: 'Move Up' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.move(0, -10)' },
                      h('span', { 'class': 'fa fa-arrow-up' })
                    )
                  ),
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'move', 'data-option': '0', 'data-second-option': '10', title: 'Move Down' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.move(0, 10)' },
                      h('span', { 'class': 'fa fa-arrow-down' })
                    )
                  )
                ),
                h(
                  'div',
                  { 'class': 'btn-group' },
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'rotate', 'data-option': '-45', title: 'Rotate Left' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.rotate(-45)' },
                      h('span', { 'class': 'fa fa-undo-alt' })
                    )
                  ),
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'rotate', 'data-option': '45', title: 'Rotate Right' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.rotate(45)' },
                      h('span', { 'class': 'fa fa-redo-alt' })
                    )
                  )
                ),
                h(
                  'div',
                  { 'class': 'btn-group' },
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'scaleX', 'data-option': '-1', title: 'Flip Horizontal' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.scaleX(-1)' },
                      h('span', { 'class': 'fa fa-arrows-alt-h' })
                    )
                  ),
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'scaleY', 'data-option': '-1', title: 'Flip Vertical' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.scaleY(-1)' },
                      h('span', { 'class': 'fa fa-arrows-alt-v' })
                    )
                  )
                ),
                h(
                  'div',
                  { 'class': 'btn-group' },
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'crop', title: 'Crop' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.crop()' },
                      h('span', { 'class': 'fa fa-check' })
                    )
                  ),
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'clear', title: 'Clear' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.clear()' },
                      h('span', { 'class': 'fa fa-times' })
                    )
                  )
                ),
                h(
                  'div',
                  { 'class': 'btn-group' },
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'disable', title: 'Disable' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.disable()' },
                      h('span', { 'class': 'fa fa-lock' })
                    )
                  ),
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'enable', title: 'Enable' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.enable()' },
                      h('span', { 'class': 'fa fa-unlock' })
                    )
                  )
                ),
                h(
                  'div',
                  { 'class': 'btn-group' },
                  h(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', 'data-method': 'reset', title: 'Reset' },
                    h(
                      'span',
                      { 'class': 'docs-tooltip', 'data-toggle': 'tooltip', title: 'cropper.reset()' },
                      h('span', { 'class': 'fa fa-sync-alt' })
                    )
                  )
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