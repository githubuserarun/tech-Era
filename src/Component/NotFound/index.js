import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="NotFoundContainer">
      <img
        width="400px"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png "
        alt="website logo"
      />
      <h1 className="NotFoundHeading">Page Not found</h1>
      <p className="NotFoundText">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
