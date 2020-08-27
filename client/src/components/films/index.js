import React from "react"
import PropTypes from "prop-types"
import FilmCard from "./FilmCard"
import Message from '../Message'

export default function FilmsList({films}) {
    return (
        <div className="ui four cards">
            {films.length === 0 ? (
                <Message msg="No films in out base yet" type="star outline" />
            ) : (
                films.map(film => <FilmCard key={film._id} film={film} />)
            )}
        </div>
    )
}

FilmsList.defaultProps = {
    films: [],
}

FilmsList.propTypes = {
    films: PropTypes.arrayOf(PropTypes.object).isRequired,
}
