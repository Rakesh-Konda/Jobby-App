import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="cbx">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="oo">Page Not Found</h1>
      <p className="oo">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)
export default NotFound
