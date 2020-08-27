import React from "react"
import LoginForm from "./forms/LoginForm"
import api from "../api"

function LoginPage(props) {
    const submit = user =>
        api.users.login(user).then(token => {
            props.login(token)
            props.history.push("/films")
        })

    return (
        <div className="ui grid">
            <div className="eight wide column">
                <LoginForm submit={submit} />
            </div>
        </div>
    )
}

export default LoginPage
