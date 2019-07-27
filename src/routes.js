import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Index from './containers/Index'
import News from './containers/News'
import Comments from './containers/Comments'

const routes = (
  <Route path="/" component={Index}>
    <IndexRoute component={News}/>
    <Route path="comment/:id" component={Comments} />
  </Route>
)

export default routes