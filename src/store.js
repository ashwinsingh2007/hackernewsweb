import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import newsList from './reducers'

const loggerMiddleware = createLogger()

const store = createStore(
  newsList,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware 
  )
)

export default store

