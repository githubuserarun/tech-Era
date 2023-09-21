import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseList from '../CourseList'
import './index.css'

const statusConstant = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {displayData: [], status: statusConstant.initial}

  componentDidMount() {
    this.getData()
  }

  onClickRetry = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({status: statusConstant.process})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({status: statusConstant.success})
      const updatedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({displayData: updatedData})
    } else {
      this.setState({status: statusConstant.failure})
    }
  }

  renderLoading = () => (
    <div className="loader" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccess = () => {
    const {displayData} = this.state
    return (
      <div className="courseContainer">
        <h1 className="Heading">Courses</h1>
        <ul className="CourseListContainer">
          {displayData.map(each => (
            <CourseList key={each.id} data={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailure = () => (
    <div className="FailureContainer">
      <img
        className="FailureImg"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="FailureHeading">Oops! Something Went Wrong</h1>
      <p className="FailureText">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="FailureButton"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderData = () => {
    const {status} = this.state

    switch (status) {
      case statusConstant.process:
        return this.renderLoading()
      case statusConstant.success:
        return this.renderSuccess()
      case statusConstant.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderData()}
      </div>
    )
  }
}
export default Home
