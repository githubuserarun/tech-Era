import './index.css'

const CourseDetailsCard = props => {
  const {data} = props
  const {imageUrl, name, description} = data
  return (
    <li className="CourseDetailsCardlist">
      <img width="300px" height="400px" src={imageUrl} alt="website logo" />
      <div className="textContent">
        <h1 className="head">{name}</h1>
        <p className="para">{description}</p>
      </div>
    </li>
  )
}
export default CourseDetailsCard
