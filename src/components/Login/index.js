import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  userName = event => {
    console.log(event.target.value)
    this.setState({username: event.target.value})
  }

  password = event => {
    console.log(event.target.value)
    this.setState({password: event.target.value})
  }

  LoginSuccess = jwtToken => {
    this.setState({showErrorMsg: false})
    const {history} = this.props
    const jwt = Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  Login = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const res = await fetch(url, options)
    const data = await res.json()

    console.log(res)
    console.log(data)
    if (res.ok) {
      this.LoginSuccess(data.jwt_token)
    } else {
      this.setState({showErrorMsg: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password} = this.state
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div className="bg">
          <form className="bg1" onSubmit={this.Login}>
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
            <div className="hlo">
              <label className="lab" htmlFor="name">
                USERNAME
              </label>
              <input
                type="text"
                className="inm"
                id="name"
                value={username}
                placeholder="Username"
                onChange={this.userName}
              />
            </div>
            <div className="hlo">
              <label className="lab" htmlFor="name1">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                className="inm"
                id="name1"
                placeholder="Password"
                onChange={this.password}
              />
            </div>
            <button type="submit" className="but">
              Login
            </button>
            {showErrorMsg && <p className="er">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
