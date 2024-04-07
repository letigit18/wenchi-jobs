import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import  userReducer from './user';
import stepReducer from './step'
import languageReducer from './language'
import multiStepReducer from './multiStepForm'
const store = configureStore(
    {
        reducer: {
            user: userReducer,
            step: stepReducer,
            language: languageReducer,
            CVBuilder: multiStepReducer,
        },
    }
)
export default store;
