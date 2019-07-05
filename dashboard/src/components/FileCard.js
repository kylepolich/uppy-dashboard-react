const getFileTypeIcon = require('../utils/getFileTypeIcon')
const FilePreview = require('./FilePreview')
const CropModal = require('./CropModal')
const ignoreEvent = require('../utils/ignoreEvent.js')
const { h, Component } = require('preact')

class FileCard extends Component {
  constructor (props) {
    super(props)

    this.meta = {}

    this.tempStoreMetaOrSubmit = this.tempStoreMetaOrSubmit.bind(this)
    this.renderMetaFields = this.renderMetaFields.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleCloseCropModal = this.handleCloseCropModal.bind(this)
    this.handleSaveCropModal = this.handleSaveCropModal.bind(this)
  }

  componentDidMount () {
    setTimeout(() => {
      if (!this.firstInput) return
      this.firstInput.focus({ preventScroll: true })
    }, 150)
  }

  tempStoreMetaOrSubmit (ev) {
    const file = this.props.files[this.props.fileCardFor]

    if (ev.keyCode === 13) {
      ev.stopPropagation()
      ev.preventDefault()
      this.props.saveFileCard(this.meta, file.id)
      return
    }

    console.log('metaFields = ', this.props.metaFields)
    console.log('this.meta = ', this.meta)
    console.log('file.id = ', file.id)

    const value = ev.target.value
    const name = ev.target.dataset.name
    this.meta[name] = value
  }

  renderCropButton (file) {
    if (file.preview) {
      return (
        <div class="uppy-u-reset uppy-DashboardItem-crop">
          <button class="uppy-u-reset uppy-DashboardItem-edit"
            type="button"
            aria-label={this.props.i18n('cropImage')}
            title={this.props.i18n('cropImage')}
            onclick={() => this.props.toggleCropModal(true)}>
            <i class="fa fa-crop" />
          </button>
        </div>
      )
    }
    return null
  }

  renderMetaFields (file) {
    const metaFields = this.props.metaFields || []
    return metaFields.map((field, i) => {
      return <fieldset class="uppy-DashboardFileCard-fieldset">
        <label class="uppy-DashboardFileCard-label">{field.name}</label>
        <input class="uppy-u-reset uppy-c-textInput uppy-DashboardFileCard-input"
          type="text"
          data-name={field.id}
          value={file.meta[field.id]}
          placeholder={field.placeholder}
          onkeyup={this.tempStoreMetaOrSubmit}
          onkeydown={this.tempStoreMetaOrSubmit}
          onkeypress={this.tempStoreMetaOrSubmit}
          ref={(el) => {
            if (i === 0) this.firstInput = el
          }} /></fieldset>
    })
  }

  handleSave (ev) {
    const fileID = this.props.fileCardFor
    this.props.saveFileCard(this.meta, fileID)
  }

  handleCancel (ev) {
    this.meta = {}
    this.props.toggleFileCard()
  }

  handleCloseCropModal (ev) {
    this.props.toggleCropModal(false)
  }

  handleSaveCropModal (blobUrl) {
    this.meta.blobUrl = blobUrl
    const fileID = this.props.fileCardFor
    this.props.saveFileCard(this.meta, fileID, false)

    this.props.toggleCropModal(false)
  }

  render () {
    const file = this.props.files[this.props.fileCardFor]
    const showCropModal = this.props.showCropModal

    return (
      <div class="uppy-DashboardFileCard"
        data-uppy-panelType="FileCard"
        onDragOver={ignoreEvent}
        onDragLeave={ignoreEvent}
        onDrop={ignoreEvent}
        onPaste={ignoreEvent}>
        <div class="uppy-DashboardContent-bar">
          <div class="uppy-DashboardContent-title" role="heading" aria-level="h1">
            {this.props.i18nArray('editing', {
              file: <span class="uppy-DashboardContent-titleFile">{file.meta ? file.meta.name : file.name}</span>
            })}
          </div>
          <button class="uppy-DashboardContent-back" type="button" title={this.props.i18n('finishEditingFile')}
            onclick={this.handleSave}>{this.props.i18n('done')}</button>
        </div>

        <div class="uppy-DashboardFileCard-inner">
          <div class="uppy-DashboardFileCard-preview" style={{ backgroundColor: getFileTypeIcon(file.type).color }}>
            <FilePreview file={file} />
          </div>
          
          {/* CROPPER */}
          {this.renderCropButton(file)}
          <CropModal active={showCropModal} file={file} onClose={this.handleCloseCropModal} onSave={this.handleSaveCropModal} />

          <div class="uppy-DashboardFileCard-info">
            {this.renderMetaFields(file)}
          </div>

          <div class="uppy-Dashboard-actions">
            <button class="uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-actionsBtn"
              type="button"
              onclick={this.handleSave}>{this.props.i18n('saveChanges')}</button>
            <button class="uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-actionsBtn"
              type="button"
              onclick={this.handleCancel}>{this.props.i18n('cancel')}</button>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = FileCard
