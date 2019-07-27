import * as actions from '../actions'
import { combineReducers } from 'redux'
import ls from 'local-storage'
const initialState = {
  items: []
}

const newsList = (state = initialState, action) => {
  console.log('---actions-----', action)
  switch (action.type) {
    case actions.REQUEST_ITEM_LIST:
      return {
        ...state,
        items: [],
        isLoading: true
      }
    case actions.RECEIVE_NEWS:
    case actions.RECEIVE_NEWEST:
    case actions.RECEIVE_SHOW:
    case actions.RECEIVE_JOBS:
    case actions.RECEIVE_ASK:
      return {
        ...state,
        items: action.items,
        isLoading: false,
        receiveDate: action.receiveDate
      }
    case actions.LOADING:
    console.log('---actions---', actions);
      return {
        ...state,
        loading: action.loading
      }
    default:
      return state
  }
}
const comments = (state = {
  kids: []
}, action) => {
  switch (action.type) {
    case actions.RECEIVE_COMMENTS:
      return action.comments
    default: 
      return state
  }
}
const users = (state = {
  username: ls.get('token') || 'anonymous'
}, action) => {
  switch (action.type) {
    case actions.TOKEN:
      return {...state, username: action.token}
    default: 
      return state
  }
}

export default combineReducers({
  newsList,
  comments,
  users,
})



