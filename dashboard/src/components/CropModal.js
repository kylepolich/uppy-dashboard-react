
const Cropper = require('cropperjs')
require('cropperjs/dist/cropper.css')
const { h, Component } = require('preact')

class CropModal extends Component {
  constructor (props) {
    super(props)

    this.cropper = null

    this.init = this.init.bind(this)
    this.crop = this.crop.bind(this)
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
    console.log('new Cropper...')
    const file = this.props.file
    const image = document.getElementById(file.id)
    const preview = document.getElementById(`preview-${file.id}`)
    if (this.cropper) this.cropper.destroy()
    this.cropper = new Cropper(image, {
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
        var data = event.detail
        var cropper = this.cropper
        var imageData = cropper.getImageData()
        var previewAspectRatio = data.width / data.height

        var previewImage = preview.getElementsByTagName('img').item(0)
        var previewWidth = preview.offsetWidth
        var previewHeight = previewWidth / previewAspectRatio
        var imageScaledRatio = data.width / previewWidth
        preview.style.height = previewHeight + 'px'
        if (previewImage) {
          previewImage.style.width = imageData.naturalWidth / imageScaledRatio + 'px'
          previewImage.style.height = imageData.naturalHeight / imageScaledRatio + 'px'
          previewImage.style.marginLeft = -data.x / imageScaledRatio + 'px'
          previewImage.style.marginTop = -data.y / imageScaledRatio + 'px'
        }
      }
    })
  }

  crop (ev) {
    console.log('x = ', ev.detail.x)
    console.log('y = ', ev.detail.y)
    console.log('w = ', ev.detail.width)
    console.log('h = ', ev.detail.height)
    console.log('ro = ', ev.detail.rotate)
    console.log('sx = ', ev.detail.scaleX)
    console.log('sy = ', ev.detail.scaleY)
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
    console.log('save...')
    if (this.cropper) {
      this.cropper.destroy()
      this.cropper = null
    }
    this.props.onSave()
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
                  <div style={{ float: 'left', width: '70%', padding: 5, background: 'gray' }}>
                    <img id={file.id} src={file.preview} alt="Picture" style={{ maxWidth: '100%' }} />
                  </div>
                  <div style={{ float: 'left', width: '30%', padding: 5 }}>
                    <div id={`preview-${file.id}`} style={{ overflow: 'hidden' }} />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick={this.onClose}>Close</button>
              <button type="button" class="btn btn-primary" onclick={this.onSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = CropModal
