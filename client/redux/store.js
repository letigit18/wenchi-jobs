import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import  userReducer from './user';
import stepReducer from './step'
import languageReducer from './language'
import multiStepReducer from './multiStepForm'
import loginReducer from './login'
import employersReducer from './employers';
const store = configureStore(
    {
        reducer: {
            user: userReducer,
            step: stepReducer,
            language: languageReducer,
            CVBuilder: multiStepReducer,
            login: loginReducer,
            employers: employersReducer,
        },
    }
)
export default store;
