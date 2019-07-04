
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
      <div class={`modal fade${active !== false ? ' d-block fade show' : ''}`} style={{ background: 'rgba(0,0,0,0.5)' }} onclick={this.onClick} ref={(background) => { this.background = background }}>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Cropper</h5>
              <button type="button" class="close" aria-label="Close" onclick={this.onClose}><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-9">
                  <div style={{ maxWidth: '100%' }}>
                    <img id={file.id} src={file.preview} alt="Picture" />
                  </div>
                </div>
                
                <div class="col-md-3">

                  {/* preview */}
                  <div class="docs-preview clearfix">
                    <div class="img-preview preview-lg" />
                  </div>

                  {/* drag-mode */}
                  <div class="btn-group">
                    <button type="button" class="btn btn-primary" data-method="setDragMode" data-option="move" title="Move">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.setDragMode(&quot;move&quot;)">
                        <span class="fa fa-arrows-alt" />
                      </span>
                    </button>
                    <button type="button" class="btn btn-primary" data-method="setDragMode" data-option="crop" title="Crop">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.setDragMode(&quot;crop&quot;)">
                        <span class="fa fa-crop-alt" />
                      </span>
                    </button>
                  </div>

                  {/* zoom */}
                  <div class="btn-group">
                    <button type="button" class="btn btn-primary" data-method="zoom" data-option="0.1" title="Zoom In">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.zoom(0.1)">
                        <span class="fa fa-search-plus" />
                      </span>
                    </button>
                    <button type="button" class="btn btn-primary" data-method="zoom" data-option="-0.1" title="Zoom Out">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.zoom(-0.1)">
                        <span class="fa fa-search-minus" />
                      </span>
                    </button>
                  </div>

                  {/* move */}
                  <div class="btn-group">
                    <button type="button" class="btn btn-primary" data-method="move" data-option="-10" data-second-option="0" title="Move Left">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.move(-10, 0)">
                        <span class="fa fa-arrow-left" />
                      </span>
                    </button>
                    <button type="button" class="btn btn-primary" data-method="move" data-option="10" data-second-option="0" title="Move Right">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.move(10, 0)">
                        <span class="fa fa-arrow-right" />
                      </span>
                    </button>
                    <button type="button" class="btn btn-primary" data-method="move" data-option="0" data-second-option="-10" title="Move Up">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.move(0, -10)">
                        <span class="fa fa-arrow-up" />
                      </span>
                    </button>
                    <button type="button" class="btn btn-primary" data-method="move" data-option="0" data-second-option="10" title="Move Down">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.move(0, 10)">
                        <span class="fa fa-arrow-down" />
                      </span>
                    </button>
                  </div>

                  {/* rotate */}
                  <div class="btn-group">
                    <button type="button" class="btn btn-primary" data-method="rotate" data-option="-45" title="Rotate Left">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.rotate(-45)">
                        <span class="fa fa-undo-alt" />
                      </span>
                    </button>
                    <button type="button" class="btn btn-primary" data-method="rotate" data-option="45" title="Rotate Right">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.rotate(45)">
                        <span class="fa fa-redo-alt" />
                      </span>
                    </button>
                  </div>

                  {/* flip */}
                  <div class="btn-group">
                    <button type="button" class="btn btn-primary" data-method="scaleX" data-option="-1" title="Flip Horizontal">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.scaleX(-1)">
                        <span class="fa fa-arrows-alt-h" />
                      </span>
                    </button>
                    <button type="button" class="btn btn-primary" data-method="scaleY" data-option="-1" title="Flip Vertical">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.scaleY(-1)">
                        <span class="fa fa-arrows-alt-v" />
                      </span>
                    </button>
                  </div>

                  {/* crop / clear */}
                  <div class="btn-group">
                    <button type="button" class="btn btn-primary" data-method="crop" title="Crop">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.crop()">
                        <span class="fa fa-check" />
                      </span>
                    </button>
                    <button type="button" class="btn btn-primary" data-method="clear" title="Clear">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.clear()">
                        <span class="fa fa-times" />
                      </span>
                    </button>
                  </div>

                  {/* enable / disable */}
                  <div class="btn-group">
                    <button type="button" class="btn btn-primary" data-method="disable" title="Disable">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.disable()">
                        <span class="fa fa-lock" />
                      </span>
                    </button>
                    <button type="button" class="btn btn-primary" data-method="enable" title="Enable">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.enable()">
                        <span class="fa fa-unlock" />
                      </span>
                    </button>
                  </div>

                  {/* reset */}
                  <div class="btn-group">
                    <button type="button" class="btn btn-primary" data-method="reset" title="Reset">
                      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.reset()">
                        <span class="fa fa-sync-alt" />
                      </span>
                    </button>
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
