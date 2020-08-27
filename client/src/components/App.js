import React, {useState, useEffect} from "react"
import {Route} from "react-router-dom"
import Film from "./films/Film"
import TopNavigation from "./TopNavigation"
import {Async, lazyImport} from "./Async"
import LoginPage from "./LoginPage"
import {setAuthorizationHeader} from "../utils"
import jwtDecode from 'jwt-decode'

const AppContext = React.createContext()
export {AppContext}

const HomePage = Async(lazyImport("./HomePage"))
const FilmsPage = Async(lazyImport("./FilmsPage"))
const SignupPage = Async(lazyImport("./SignupPage"))

const initialState = {
    token: null,
    role: "user",
}

const App = props => {
    const [user, setUser] = useState(initialState)
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (localStorage.filmsToken) {
            setUser({
                token: localStorage.filmsToken,
                role: jwtDecode(localStorage.filmsToken).user.role,
            })
            setAuthorizationHeader(localStorage.filmsToken)
        }
    }, [])

    const login = token => {
        setUser({token, role: jwtDecode(token).user.role})
        localStorage.filmsToken = token
        setAuthorizationHeader(token)
    }

    const logout = () => {
        setUser({token: null, role: "user"})
        localStorage.removeItem("filmsToken")
        setAuthorizationHeader()
    }

    const isUserAdmin = user.token && user.role === "admin";

    return (
        <div className="ui container">
            <TopNavigation logout={logout} isAuth={user.token} isAdmin={isUserAdmin} />

            {message && (
                <div className="ui info message">
                    <i className="close icon" onClick={() => setMessage("")} />
                    {message}
                </div>
            )}

            <Route exact path="/" component={HomePage} />
            <Route path="/films" render={props => (
                <FilmsPage {...props}  user={user}/>
            )} />
            <Route
                path="/signup"
                render={props => (
                    <SignupPage {...props} setMessage={setMessage} />
                )}
            />
            <Route path="/film/:_id" exact component={Film} />
            <Route  path="/login"
                    render={props => <LoginPage {...props} login={login} />}
            />
        </div>
    )
}

export default App
