import React from "react"
import {NavLink} from "react-router-dom"

const TopNavigation = ({isAuth, logout, isAdmin}) => (
    <div className="ui secondary pointing menu">
        <NavLink exact to="/" className="item">
            Home
        </NavLink>
        <NavLink exact to="/films" className="item">
            Films
        </NavLink>
        {isAdmin && (
            <NavLink exact to="/films/new" className="item">
                <i className="icon plus" />
                Add new film
            </NavLink>
        )}

        {isAuth ? (
            <div className="right menu">
        <span onClick={logout} className="item">
          Logout
        </span>
            </div>
        ) : (
            <div className="right menu">
                <NavLink to="/signup" className="item">
                    Sing up
                </NavLink>
                <NavLink to="/login" className="item">
                    Login
                </NavLink>
            </div>
        )}
    </div>
)

export default TopNavigation
