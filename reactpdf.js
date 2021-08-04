 'use strict'
 const { Component, PureComponent, createContext } = React;
 const { render } = ReactDOM;
 const PDF_URL = "//mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";
 const SCALE = 5.0;
 class PDFViewer extends Component {
     state = {
         pdf: null
     }
     static propTypes = {
         src: PropTypes.string.isRequired
     }
     componentDidMount() {
         pdfjsLib.getDocument(this.props.src).then((pdf) => {
             this.setState({ pdf });
         });
     }
     render() {
         const { pdf, activeIndex } = this.state;
         const numPages = pdf ? pdf.numPages : 0;
         const fingerprint = pdf ? pdf.pdfInfo.fingerprint : 'none';
         const pages = Array(numPages).fill().map(function(_, i) {
             return (
                 <PDFPage index={i+1} key={i} pdf={pdf} active={i===0} />
             );
         });
         return (
             <div id="sheetmusic" className="carousel slide border border-dark" data-ride="carousel">
        <div className="carousel-inner">
          {pages}
        </div>
        <a className="carousel-control-prev" href="#sheetmusic" role="button" data-slide="prev">
          <i className="fas fa-chevron-left fa-2x" aria-hidden="true"></i>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#sheetmusic" role="button" data-slide="next">
          <i className="fas fa-chevron-right fa-2x" aria-hidden="true"></i>
          <span className="sr-only">Next</span>
        </a>
      </div>
         );
     }
 }
 class PDFPage extends PureComponent {
     static propTypes = {
         index: PropTypes.number,
         pdf: PropTypes.any,
         active: PropTypes.bool
     }
     componentDidMount() {
         this._update(this.props.pdf);
     }
     componentDidUpdate(prevProps) {
         this._update(this.props.pdf);
     }
     _update(pdf) {
         if (pdf !== null) {
             const { index } = this.props;
             pdf.getPage(index).then(this._renderPage.bind(this));
         }
     }
     _renderPage(page) {
         const viewport = page.getViewport(SCALE);
         const { canvas } = this.refs;
         const canvasContext = canvas.getContext('2d');
         canvas.height = viewport.height;
         canvas.width = viewport.width;
         return page.render({
             canvasContext,
             viewport
         }).promise;
     }
     render() {
         const { index, active } = this.props;
         const { numPages } = this.props.pdf;
         return (
             <div className={`carousel-item px-5 ${active ? 'active' : ''}`}>
        <canvas className="d-block w-auto mw-100" ref='canvas'></canvas>
        <div className="carousel-caption d-none d-md-block">
          <p>Page: {index} / {numPages}</p>
        </div>
      </div>
         );
     }
 }
 render(<PDFViewer src={PDF_URL} />, document.getElementById('main'));
