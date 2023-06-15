import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const Logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="col">
      <nav className="nav">
        <Link to="/" className="link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="lo"
          />
        </Link>
        <div className="pc">
          <ul className="ul pc">
            <Link to="/" className="link">
              <li className="para">Home</li>
            </Link>
            <Link to="/jobs" className="link">
              <li className="para">Jobs</li>
            </Link>
            <li className="none">kln</li>
          </ul>
        </div>
        <button type="button" className="bb" onClick={Logout}>
          Logout
        </button>
      </nav>
    </div>
  )
}
export default withRouter(Header)
