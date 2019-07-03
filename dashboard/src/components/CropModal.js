
const Cropper = require('cropperjs')
require('cropperjs/dist/cropper.css')
const { h, Component } = require('preact')

class CropModal extends Component {
  constructor (props) {
    super(props)

    this.cropper = null

    this.crop = this.crop.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentDidMount () {
    console.log('componentDidMount: new Cropper...')
    const file = this.props.file
    const image = document.getElementById(file.id)
    this.cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
      guides: true,
      crop: this.crop
    })
  }

  componentDidUpdate (prevProps) {
    if (prevProps.active === false && this.props.active === true) {
      console.log('componentDidUpdate: new Cropper...')
      const file = this.props.file
      const image = document.getElementById(file.id)
      this.cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        guides: true,
        crop: this.crop
      })
    }
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
      <div class={`modal fade${active !== false ? ' d-block fade show' : ''}`} ref={(background) => { this.background = background }}>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Cropper</h5>
              <button type="button" class="close" aria-label="Close" onclick={this.onClose}><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
              <div class="img-container">
                <img id={file.id} src={file.preview} alt="Picture" />
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
