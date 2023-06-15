import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {FiExternalLink} from 'react-icons/fi'
import {FaBriefcase} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {jobDetails: [], LifeAtCompany: [], Skill: [], similarjobs: []}

  componentDidMount() {
    this.get()
  }

  getSuccess = data => {
    const JobDet = data.job_details
    const Jobdet1 = {
      companyUrl: JobDet.company_logo_url,
      companyWebUrl: JobDet.company_website_url,
      employmentType: JobDet.employment_type,
      id: JobDet.id,
      Jobdescription: JobDet.job_description,
      location: JobDet.location,
      package: JobDet.package_per_annum,
      title: JobDet.title,
      rating: JobDet.rating,
    }
    console.log(Jobdet1)
    this.setState({jobDetails: Jobdet1})
    const life = {
      lifeaAtcompany: data.job_details.life_at_company.description,
      lifeAtCompanyImgUrl: data.job_details.life_at_company.image_url,
    }
    console.log(life)
    this.setState({LifeAtCompany: life})
    const skills = data.job_details.skills.map(each => ({
      skillName: each.name,
      skillUrl: each.image_url,
    }))
    console.log(skills)
    this.setState({Skill: skills})
    const similar = data.similar_jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      JobDescription: each.job_description,
      id: each.id,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))
    console.log(similar)
    this.setState({similarjobs: similar})
  }

  getFailure = () => {}

  get = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
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
    const {similarjobs, LifeAtCompany, Skill, jobDetails} = this.state
    const jobDisplay = jobDetails.length > 0
    return (
      <div>
        <div className="hlo">
          <div className="hcc">
            <img
              src={jobDetails.companyUrl}
              alt="job details company logo"
              className="i"
            />
            <div>
              <h1 className="head">{jobDetails.title}</h1>
              <div className="sc">
                <AiFillStar className="star" />
                <p className="pp">{jobDetails.rating}</p>
              </div>
            </div>
          </div>

          <div className="ccd">
            <div className="go">
              <HiOutlineLocationMarker className="loca" />
              <p className="o">{jobDetails.location}</p>
            </div>
            <div className="go">
              <FaBriefcase className="loca" />
              <p className="o">{jobDetails.employmentType}</p>
            </div>
            <p className="oo">{jobDetails.package}</p>
          </div>
          <div className="bot">
            <hr />
            <div className="cbn">
              <h1 className="oo">Description</h1>
              <div className="cbn">
                <a href={jobDetails.companyWebUrl} className="visit">
                  Visit
                </a>
                <FiExternalLink className="visit v" />
              </div>
            </div>

            <p className="hl">{jobDetails.Jobdescription}</p>
          </div>
          <div>
            <h1 className="oo n">Skills</h1>
            <ul className="ul kk">
              {Skill.map(each => (
                <li key={each.skillName}>
                  <div className="dis">
                    <img
                      src={each.skillUrl}
                      alt={each.skillName}
                      className="io"
                    />
                    <p className="oo m">{each.skillName}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="oo n">Life at Company</h1>
            <div className="dii">
              <p className="oo t">{LifeAtCompany.lifeaAtcompany}</p>
              <img
                src={LifeAtCompany.lifeAtCompanyImgUrl}
                alt="life at company"
                className="pi"
              />
            </div>
          </div>
        </div>
        <h1 className="oo n">Similar Jobs</h1>
        <div>
          <ul className="ul mmi">
            {similarjobs.map(each => (
              <li key={each.id}>
                <div className="cd">
                  <div className="ccv">
                    <img
                      src={each.companyLogoUrl}
                      alt="similar job company logo"
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
                  <h1 className="oo n">Description</h1>
                  <p className="oo n">{each.JobDescription}</p>
                  <div className="cennm">
                    <div className="go b">
                      <HiOutlineLocationMarker className="loca" />
                      <p className="o">{each.location}</p>
                    </div>
                    <div className="go b">
                      <FaBriefcase className="loca" />
                      <p className="o">{each.employmentType}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
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

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="bgg">{this.FinalView()}</div>
      </div>
    )
  }
}
export default JobItemDetails
