
import { createStore, combineReducers } from 'redux'

import router from './router'
import home from './home'
import loading from './loading'

const rootReducer = combineReducers({
    router,
    home,
    loading
})

const store = createStore(rootReducer)

export default store

