
const Cropper = require('cropperjs')
require('cropperjs/dist/cropper.css')
const { h, Component } = require('preact')

class CropModal extends Component {
  constructor (props) {
    super(props)

    this.cropper = null

    this.init = this.init.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentDidMount () {
    this.init()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.active === false && this.props.active === true) {
      this.init()
    }
  }

  init () {
    var minCroppedWidth = 100
    var minCroppedHeight = 100
    var maxCroppedWidth = 640
    var maxCroppedHeight = 640
    console.log('new Cropper...')
    const file = this.props.file
    const image = document.getElementById(file.id)
    const preview = document.getElementById(`preview-${file.id}`)
    if (this.cropper) this.cropper.destroy()
    this.cropper = new Cropper(image, {
      data: {
        width: (minCroppedWidth + maxCroppedWidth) / 2,
        height: (minCroppedHeight + maxCroppedHeight) / 2
      },
      ready: function () {
        var clone = this.cloneNode()

        clone.className = ''
        clone.style.cssText = (
          'display: block;' +
          'width: 100%;' +
          'min-width: 0;' +
          'min-height: 0;' +
          'max-width: none;' +
          'max-height: none;'
        )

        preview.appendChild(clone.cloneNode())
      },
      crop: function (event) {
        var width = event.detail.width
        var height = event.detail.height
        var cropper = this.cropper
        // set dimensions
        if (width < minCroppedWidth || height < minCroppedHeight || width > maxCroppedWidth || height > maxCroppedHeight) {
          cropper.setData({
            width: Math.max(minCroppedWidth, Math.min(maxCroppedWidth, width)),
            height: Math.max(minCroppedHeight, Math.min(maxCroppedHeight, height))
          })
        }

        // set preview
        var previewAspectRatio = width / height
        var previewWidth = preview.offsetWidth
        var previewHeight = previewWidth / previewAspectRatio
        preview.style.height = previewHeight + 'px'

        // set image in preview
        var previewImage = preview.getElementsByTagName('img').item(0)
        if (previewImage) {
          var imageData = cropper.getImageData()
          var imageScaledRatio = width / previewWidth
          previewImage.style.width = imageData.naturalWidth / imageScaledRatio + 'px'
          previewImage.style.height = imageData.naturalHeight / imageScaledRatio + 'px'
          previewImage.style.marginLeft = -event.detail.x / imageScaledRatio + 'px'
          previewImage.style.marginTop = -event.detail.y / imageScaledRatio + 'px'
        }
      }
    })
  }

  onClick (ev) {
    if (ev.target === this.background) this.props.onClose(ev)
  }

  onClose (ev) {
    if (this.cropper) {
      this.cropper.destroy()
      this.cropper = null
    }
    this.props.onClose(ev)
  }

  onSave (ev) {
    const cropOption = {
      width: 160,                     // TODO: should get from configuration
      height: 90,                     // TODO: should get from configuration
      minWidth: 256,
      minHeight: 256,
      maxWidth: 1024,
      maxHeight: 1024,
      fillColor: 'transparent',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'low'    // 'low' or 'medium' or 'high'
    }
    const quality = 0.92              // TODO: check image size
    const blobUrl = this.cropper.getCroppedCanvas(/* cropOption */).toDataURL('image/png', quality)
    if (this.cropper) {
      this.cropper.destroy()
      this.cropper = null
    }
    this.props.onSave(blobUrl)
  }

  render () {
    const { active, file } = this.props

    return (
      <div class={`modal fade${active !== false ? ' d-block fade show' : ''}`} style={{ background: 'rgba(0,0,0,0.5)' }} onclick={this.onClick} ref={(background) => { this.background = background }}>
        <div class="modal-dialog" role="document" style={{ maxWidth: 750 }}>
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Cropper</h5>
              <button type="button" class="close" aria-label="Close" onclick={this.onClose}><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
              <div style={{ margin: 10, maxWidth: 700 }}>
                <div class="row" style={{ overflow: 'hidden' }}>
                  <div style={{ float: 'left', width: '70%', background: 'gray' }}>
                    <img id={file.id} src={file.preview} alt="Picture" style={{ maxWidth: '100%' }} />
                  </div>
                  <div style={{ float: 'left', width: '30%', background: '#f7f7f7', padding: 5 }}>
                    <div id={`preview-${file.id}`} style={{ overflow: 'hidden' }} />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick={this.onClose}>Close</button>
              <button type="button" class="btn btn-primary" onclick={this.onSave}>Crop</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = CropModal
