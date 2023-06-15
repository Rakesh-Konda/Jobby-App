import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="back">
      <Header />
      <div className="hh">
        <h1 className="whi">
          Find The Job That <br /> Fits Your Life
        </h1>
        <p className="whi">
          Millions of people are searching for jobs,salary <br />
          information,company interview reviews. Find the job that fits your
          <br />
          ability and potentiality.
        </p>
        <Link to="/jobs">
          <button type="button" className="bbb">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home
