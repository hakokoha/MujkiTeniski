import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { createStore, combineReducers } from 'redux'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import App from './App'

const firebaseConfig = {
    apiKey: "AIzaSyAuw8fddKfPVhytSp58c1O2KQoVv7cR3TI",
    authDomain: "mujkiteniski.firebaseapp.com",
    databaseURL: "https://mujkiteniski.firebaseio.com",
    projectId: "mujkiteniski",
    storageBucket: "mujkiteniski.appspot.com",
    messagingSenderId: "1075248186549",
    appId: "1:1075248186549:web:989e912c21cdabc43baafc",
    measurementId: "G-8TL4C618YB"
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
  })

  const initialState = {}
  const store = createStore(rootReducer, initialState)

  const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
  }

  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
  }

render(<Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
              <App/>
          </ReactReduxFirebaseProvider>
       </Provider>, document.getElementById('root'));