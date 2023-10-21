import Register from "./RegisterAndLoginForm"
import axios from "axios"
import Routes from "./Routes"
import { UserContext, UserContextProvider } from "./UserContext"
import { useContext, useEffect } from "react"

function App() {
  axios.defaults.baseURL = 'http://localhost:4040'
  axios.defaults.withCredentials = true
  const {username} = useContext(UserContext)
  console.log(username)
  
  return (
    <UserContextProvider>
      <Routes/>
    </UserContextProvider>
    )
}

export default App
