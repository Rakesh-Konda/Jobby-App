import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobsListRight from '../JobsListRight'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    profile: '',
    apiStatus: apiStatusConstants.initial,
    employmentType: [],
    minimumPackage: 0,
    Search: '',
  }

  componentDidMount() {
    this.get()
  }

  get = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = 'https://apis.ccbp.in/profile'
    const res = await fetch(url, options)
    const data = await res.json()

    if (res.ok) {
      this.setState({apiStatus: apiStatusConstants.success})
      const Profile1 = data.profile_details
      this.setState({profile: Profile1})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  Retry = () => {
    this.get()
  }

  Loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successView = () => {
    const {profile} = this.state
    return (
      <div className="pro">
        <img src={profile.profile_image_url} alt="profile" className="proi" />
        <h1 className="proi">{profile.name}</h1>
        <p className="proi">{profile.short_bio}</p>
      </div>
    )
  }

  FailureView = () => (
    <div className="ccc">
      <button className="but" type="button" onClick={this.Retry}>
        Retry
      </button>
    </div>
  )

  FinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.FailureView()
      case apiStatusConstants.loading:
        return this.Loader()
      default:
        return null
    }
  }

  inputText = data => {
    console.log(data)
    this.setState({Search: data})
  }

  checkboxText = data => {
    this.setState(prevState => {
      let updatedEmploymentType
      if (prevState.employmentType.includes(data)) {
        updatedEmploymentType = prevState.employmentType.filter(
          item => item !== data,
        )
      } else {
        updatedEmploymentType = [...prevState.employmentType, data]
      }

      return {
        employmentType: updatedEmploymentType,
      }
    })
    const {employmentType} = this.state
    console.log(employmentType)
  }

  radioText = data => {
    console.log(data)
    this.setState({minimumPackage: data})
  }

  render() {
    const {minimumPackage, Search, employmentType} = this.state

    return (
      <div>
        <Header />
        <div className="bg11">
          <div className="lef">
            {this.FinalView()}
            <hr className="hr" />
            <div>
              <h1 className="w">Type of Employment</h1>
              <ul>
                {employmentTypesList.map(each => (
                  <li key={each.employmentTypeId} className="li">
                    <input
                      type="checkbox"
                      id={each.employmentTypeId}
                      onChange={() => this.checkboxText(each.employmentTypeId)}
                    />
                    <label className="label" htmlFor={each.employmentTypeId}>
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
              <hr className="hr" />
            </div>
            <div>
              <h1 className="w">Salary Range</h1>
              <ul>
                {salaryRangesList.map(each => (
                  <li key={each.salaryRangeId} className="li">
                    <input
                      type="radio"
                      id={each.salaryRangeId}
                      name="salary"
                      onChange={() => this.radioText(each.salaryRangeId)}
                    />
                    <label className="label" htmlFor={each.salaryRangeId}>
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <JobsListRight
              inputText={this.inputText}
              radioText={this.radioText}
              checkboxText={this.checkboxText}
              employmentType={employmentType}
              Search={Search}
              minimumPackage={minimumPackage}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
