import React, {useState, useContext} from "react"
import {Link} from "react-router-dom"
import Featured from "./Featured"
import PropTypes from "prop-types"
import {AppContext} from '../App'

const FilmCard =({film}) => {
        const [isShowDescription, toggleDescription] = useState(false);
        const {deleteFilm, user} = useContext(AppContext)
        const [confirm, setConfirm] = useState(false)
        const showConfirm = () => setConfirm(true)
        const hideConfirm = () => setConfirm(false)
        const adminAction = (
            <div className="extra content">
                {confirm ? (
                    <div className="ui two buttons">
                            <span  className="ui red basic button"  onClick={() => deleteFilm(film)}>
                                <i className="ui icon check" /> YES
                            </span>
                        <span className="ui grey basic button" onClick={hideConfirm}>
                                <i className="ui icon trash" /> NO
                            </span>
                    </div>
                ) : (
                    <div className="ui two buttons">
                        <Link  to={`/films/edit/${film._id}`}  className="ui green basic button">
                            <i className="ui icon edit" />
                        </Link>
                        <span className="ui red basic button" onClick={showConfirm}>
                                <i className="ui icon trash" />
                            </span>
                    </div>
                )}
            </div>
        )
        const userAction = (
            <div className="extra content">
                <button className="ui green basic button ">Add to cart</button>
            </div>
        )

        return (
            <div className="ui card">
                {isShowDescription ? (
                    <div className="content">
                        <p>{film.description}</p>
                    </div>
                ) : (
                    <div className="image">
                        <span className="ui green label ribbon">{film.price} $</span>
                        <Featured featured={film.featured} filmId={film._id} />
                        <img src={film.img} alt={film.title} />
                    </div>
                )}

                <div className="content">
                    <Link to={`/film/${film._id}`} className="header">
                        {film.title}
                    </Link>
                    <div className="meta">
                        <i className="icon users" />
                        {film.director}
                        <span className="right floated">
                            <i className="icon wait right" />
                            {film.duration} min
                        </span>
                    </div>

                    <div className="content">
                        <i onClick={() => toggleDescription(!isShowDescription)}
                            className={`icon link eye ${isShowDescription ? "slash" : ""}`}
                        />
                    </div>
                </div>

                {user.token && user.role === "admin" && adminAction}
                {user.token && user.role === "user" && userAction}
            </div>
        )
}

FilmCard.propTypes = {
    film: PropTypes.shape({
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        featured: PropTypes.bool.isRequired,
    }).isRequired,
}

export default React.memo(FilmCard)
