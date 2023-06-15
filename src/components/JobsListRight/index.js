import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {FaBriefcase} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobsListRight extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employmentType: [],
      minimumPackage: 0,
      Search: '',
      jobsList: [],
      apiStatus: apiStatusConstants.initial,
    }
  }

  componentDidMount() {
    this.get()
  }

  inputChangeText = event => {
    const {inputText} = this.props
    inputText(event.target.value)
  }

  SearchButton = () => {
    console.log('ser')
    const {minimumPackage, Search, employmentType, jobsList} = this.props
    console.log(minimumPackage, Search, employmentType)
    this.setState({minimumPackage, Search, employmentType}, this.get)
    console.log(jobsList)
    // if (jobsList === []) {
    //   this.setState({apiStatus: apiStatusConstants.noJob})
    // }
  }

  getSuccess = data => {
    const Data = data.jobs.map(each => ({
      companyUrl: each.company_logo_url,
      employmentType: each.employment_type,
      description: each.job_description,
      id: each.id,
      package: each.package_per_annum,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({jobsList: Data})
  }

  getFailure = () => {}

  get = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {employmentType, minimumPackage, Search} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${minimumPackage}&search=${Search}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data.jobs)
    console.log(response)

    if (response.ok) {
      this.setState({apiStatus: apiStatusConstants.success})
      this.getSuccess(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
      this.getFailure()
    }
  }

  DoRetry = () => {
    this.get()
  }

  //   noJob = () => (
  //     <div className="mid">
  //       <img
  //         src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
  //         alt="no jobs"
  //         className=""
  //       />
  //       <h1 className="o">No Jobs Found</h1>
  //       <p className="o">We could not find any jobs. Try other filters</p>
  //     </div>
  //   )

  Loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  FailureView = () => (
    <div className="mid">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="o">Oops! Something Went Wrong</h1>
      <p className="o">We cannot seem to find the page you are looking for.</p>
      <button type="button" className="but" onClick={this.DoRetry}>
        Retry
      </button>
    </div>
  )

  successView = () => {
    const {jobsList} = this.state
    const jobDisplay = jobsList.length > 0
    return (
      <div>
        {jobDisplay ? (
          <div>
            <ul className="ul">
              {jobsList.map(each => (
                <Link to={`/jobs/${each.id}`} className="link" key={each.id}>
                  <li key={each.id} className="lii">
                    <div className="card">
                      <div className="hcc">
                        <img
                          src={each.companyUrl}
                          alt="company logo"
                          className="i"
                        />
                        <div>
                          <h1 className="head">{each.title}</h1>
                          <div className="sc">
                            <AiFillStar className="star" />
                            <p className="pp">{each.rating}</p>
                          </div>
                        </div>
                      </div>
                      <div className="ccd">
                        <div className="go">
                          <HiOutlineLocationMarker className="loca" />
                          <p className="o">{each.location}</p>
                        </div>
                        <div className="go">
                          <FaBriefcase className="loca" />
                          <p className="o">{each.employmentType}</p>
                        </div>
                        <h1 className="oo">{each.package}</h1>
                      </div>
                      <div className="bot">
                        <hr />
                        <h1 className="oo">Description</h1>
                        <p className="hl">{each.description}</p>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mid">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className=""
            />
            <h1 className="o">No Jobs Found</h1>
            <p className="o">We could not find any jobs. Try other filters</p>
          </div>
        )}
      </div>
    )
  }

  FinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.FailureView()
      case apiStatusConstants.loading:
        return this.Loader()
      case apiStatusConstants.noJob:
        return this.noJob()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="ver">
        <div className="jar">
          <input
            className="inp"
            type="search"
            placeholder="Search"
            onChange={this.inputChangeText}
          />
          <button
            data-testid="searchButton"
            type="button"
            className="sebut"
            onClick={this.SearchButton}
          >
            <BsSearch className="ser" />
          </button>
        </div>
        {this.FinalView()}
      </div>
    )
  }
}
export default JobsListRight
