"use client"
import store from './store'
import React from 'react'
import Navbar from "@/components/Nav/page";
import Footer from "@/components/Footer/page";
import { Provider } from 'react-redux'
const Providers = ({children})=>{
    return(
        <Provider store={store}>
          <Navbar />
            {children}
          <Footer />
        </Provider>
    )
}
export default Providers;