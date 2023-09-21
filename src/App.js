import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './Component/HomeRoute'
import CourseDetails from './Component/CourseDetails'
import NotFound from './Component/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
