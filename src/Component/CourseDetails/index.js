import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseDetailsCard from '../CourseDetailsCard'
import './index.css'

const statusConstant = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {displayData: [], status: statusConstant.initial}

  componentDidMount() {
    this.getData()
  }

  onClickRetry = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({status: statusConstant.process})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({status: statusConstant.success})
      const updatedData = {
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
        description: data.course_details.description,
      }
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
          <CourseDetailsCard data={displayData} />
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
export default CourseDetails
