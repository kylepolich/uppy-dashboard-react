function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getFileTypeIcon = require('../utils/getFileTypeIcon');
var FilePreview = require('./FilePreview');
var CropModal = require('./CropModal');
var ignoreEvent = require('../utils/ignoreEvent.js');

var _require = require('preact'),
    h = _require.h,
    Component = _require.Component;

var FileCard = function (_Component) {
  _inherits(FileCard, _Component);

  function FileCard(props) {
    _classCallCheck(this, FileCard);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.meta = {};

    _this.tempStoreMetaOrSubmit = _this.tempStoreMetaOrSubmit.bind(_this);
    _this.renderMetaFields = _this.renderMetaFields.bind(_this);
    _this.handleSave = _this.handleSave.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.handleCloseCropModal = _this.handleCloseCropModal.bind(_this);
    _this.handleSaveCropModal = _this.handleSaveCropModal.bind(_this);
    return _this;
  }

  FileCard.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    setTimeout(function () {
      if (!_this2.firstInput) return;
      _this2.firstInput.focus({ preventScroll: true });
    }, 150);
  };

  FileCard.prototype.tempStoreMetaOrSubmit = function tempStoreMetaOrSubmit(ev) {
    var file = this.props.files[this.props.fileCardFor];

    if (ev.keyCode === 13) {
      ev.stopPropagation();
      ev.preventDefault();
      this.props.saveFileCard(this.meta, file.id);
      return;
    }

    console.log('metaFields = ', this.props.metaFields);
    console.log('this.meta = ', this.meta);
    console.log('file.id = ', file.id);

    var value = ev.target.value;
    var name = ev.target.dataset.name;
    this.meta[name] = value;
  };

  FileCard.prototype.renderCropButton = function renderCropButton(file) {
    var _this3 = this;

    if (file.preview) {
      return h(
        'div',
        { 'class': 'uppy-u-reset uppy-DashboardItem-crop' },
        h(
          'button',
          { 'class': 'uppy-u-reset uppy-DashboardItem-edit',
            type: 'button',
            'aria-label': this.props.i18n('cropImage'),
            title: this.props.i18n('cropImage'),
            onclick: function onclick() {
              return _this3.props.toggleCropModal(true);
            } },
          h('i', { 'class': 'fa fa-crop' })
        )
      );
    }
    return null;
  };

  FileCard.prototype.renderMetaFields = function renderMetaFields(file) {
    var _this4 = this;

    var metaFields = this.props.metaFields || [];
    return metaFields.map(function (field, i) {
      return h(
        'fieldset',
        { 'class': 'uppy-DashboardFileCard-fieldset' },
        h(
          'label',
          { 'class': 'uppy-DashboardFileCard-label' },
          field.name
        ),
        h('input', { 'class': 'uppy-u-reset uppy-c-textInput uppy-DashboardFileCard-input',
          type: 'text',
          'data-name': field.id,
          value: file.meta[field.id],
          placeholder: field.placeholder,
          onkeyup: _this4.tempStoreMetaOrSubmit,
          onkeydown: _this4.tempStoreMetaOrSubmit,
          onkeypress: _this4.tempStoreMetaOrSubmit,
          ref: function ref(el) {
            if (i === 0) _this4.firstInput = el;
          } })
      );
    });
  };

  FileCard.prototype.handleSave = function handleSave(ev) {
    var fileID = this.props.fileCardFor;
    this.props.saveFileCard(this.meta, fileID);
  };

  FileCard.prototype.handleCancel = function handleCancel(ev) {
    this.meta = {};
    this.props.toggleFileCard();
  };

  FileCard.prototype.handleCloseCropModal = function handleCloseCropModal(ev) {
    this.props.toggleCropModal(false);
  };

  FileCard.prototype.handleSaveCropModal = function handleSaveCropModal(blobUrl) {
    this.meta.blobUrl = blobUrl;
    var fileID = this.props.fileCardFor;
    this.props.saveFileCard(this.meta, fileID, false);

    this.props.toggleCropModal(false);
  };

  FileCard.prototype.render = function render() {
    var file = this.props.files[this.props.fileCardFor];
    var showCropModal = this.props.showCropModal;

    return h(
      'div',
      { 'class': 'uppy-DashboardFileCard',
        'data-uppy-panelType': 'FileCard',
        onDragOver: ignoreEvent,
        onDragLeave: ignoreEvent,
        onDrop: ignoreEvent,
        onPaste: ignoreEvent },
      h(
        'div',
        { 'class': 'uppy-DashboardContent-bar' },
        h(
          'div',
          { 'class': 'uppy-DashboardContent-title', role: 'heading', 'aria-level': 'h1' },
          this.props.i18nArray('editing', {
            file: h(
              'span',
              { 'class': 'uppy-DashboardContent-titleFile' },
              file.meta ? file.meta.name : file.name
            )
          })
        ),
        h(
          'button',
          { 'class': 'uppy-DashboardContent-back', type: 'button', title: this.props.i18n('finishEditingFile'),
            onclick: this.handleSave },
          this.props.i18n('done')
        )
      ),
      h(
        'div',
        { 'class': 'uppy-DashboardFileCard-inner' },
        h(
          'div',
          { 'class': 'uppy-DashboardFileCard-preview', style: { backgroundColor: getFileTypeIcon(file.type).color } },
          h(FilePreview, { file: file })
        ),
        this.renderCropButton(file),
        h(CropModal, { active: showCropModal, file: file, onClose: this.handleCloseCropModal, onSave: this.handleSaveCropModal }),
        h(
          'div',
          { 'class': 'uppy-DashboardFileCard-info' },
          this.renderMetaFields(file)
        ),
        h(
          'div',
          { 'class': 'uppy-Dashboard-actions' },
          h(
            'button',
            { 'class': 'uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-actionsBtn',
              type: 'button',
              onclick: this.handleSave },
            this.props.i18n('saveChanges')
          ),
          h(
            'button',
            { 'class': 'uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-actionsBtn',
              type: 'button',
              onclick: this.handleCancel },
            this.props.i18n('cancel')
          )
        )
      )
    );
  };

  return FileCard;
}(Component);

module.exports = FileCard;