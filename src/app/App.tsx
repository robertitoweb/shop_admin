"use client"
import {store} from "@/redux/store"
import React  from "react"
import {Provider} from "react-redux"
interface PropsType {
    children : React.ReactNode
}

const App = ({children} : PropsType) => {
  return <Provider store={store}>{children}</Provider>
}

export default App
