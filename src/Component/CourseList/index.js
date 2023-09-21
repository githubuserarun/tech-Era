import {Link} from 'react-router-dom'
import './index.css'

const CourseList = props => {
  const {data} = props
  const {id, logoUrl, name} = data
  return (
    <Link to={`/courses/${id}`} className="link">
      <li>
        <img width="50px" height="50px" src={logoUrl} alt={name} />
        <p>{name}</p>
      </li>
    </Link>
  )
}
export default CourseList
