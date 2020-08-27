import React, {Component} from "react"
import api from "../../api"

class Film extends Component {
    state = {
        film: {},
        loading: true,
    }

    componentDidMount() {
        api.films.fetchById(this.props.match.params._id).then(film =>
            this.setState({
                film,
                loading: false,
            }),
        )
    }

    render() {
        const {film, loading} = this.state
        return (
            <>
                {loading ? (
                    <h1>....Loading ....</h1>
                ) : (
                    <>
                        <h1 className="ui center aligned dividing header">{film.title}</h1>
                        <div className="ui grid">
                            <div className="four wide column">
                                <img
                                    className="ui fluid image"
                                    src={film.img}
                                    alt={film.name}
                                />
                            </div>

                            <div className="six wide column">
                                <p>{film.description}</p>
                                <p>Director {film.director}</p>
                                <p>Duration {film.duration}</p>
                                <p>Price {film.price} $</p>
                            </div>
                        </div>
                    </>
                )}
            </>
        )
    }
}

export default Film
