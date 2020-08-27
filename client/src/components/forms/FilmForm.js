import React, {useEffect, useState} from "react"
import {Link, Redirect} from "react-router-dom"
import ReactImageFallback from "react-image-fallback"
import FormMessage from './FormMessage'
import setFormObject from "./FormUtils"

const isRedirected = false;

const initialData = {
    title: "",
    description: "",
    director: "",
    duration: "",
    price: "",
    img: "http://via.placeholder.com/250x250",
    featured: false,
    _id: null,
}

const FilmForm = props => {
    const [data, setData] = useState(initialData)
    const [redirect, setRedirect] = useState(isRedirected)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (props.film._id && data._id !== props.film._id) {
            setData(props.film)
        } else {
            setData(initialData)
        }
    }, [props.film])

    const handleSubmit = e => {
        e.preventDefault()
        const errors = validate(data)
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            setLoading(true)
            props.submit(data).catch(err => {
                setErrors(err.response.data.errors)
                setLoading(false)
                return true
            })
                .then(() => setRedirect(true))
        }
    }

    const formClassName = loading ? "ui form loading" : "ui form"

    const validate = data => {
        const errors = {}
        if (!data.title) errors.title = "This field cant be blank"
        if (!data.description) errors.description = "This field cant be blank"
        if (!data.price) errors.price = "This field cant be blank"
        if (!data.director) errors.director = "This field cant be blank"
        if (!data.duration) errors.duration = "This field cant be blank"

        if (parseInt(data.price) <= 0) errors.price = "Error price"
        if (parseInt(data.duration) <= 0) errors.duration = "Error duration"

        return errors
    }

    return (
        <form className={formClassName} onSubmit={handleSubmit}>
            {redirect && <Redirect to="/films" />}
            <div className="ui  grid">
                <div className="twelve wide column">
                    <div className={errors.title ? "field error" : "field"}>
                        <label>Film title</label>
                        <input   type="text"  name="title"  id="title"  placeholder="film title"
                                 value={data.title}
                                 onChange={setFormObject(data, setData)}
                        />
                        <FormMessage type="error">{errors.title}</FormMessage>
                    </div>
                    <div className={errors.description ? "field error" : "field"}>
                        <label>Film description</label>
                        <textarea name="description" id="description" placeholder="film description"
                                  onChange={setFormObject(data, setData)}
                                  value={data.description}
                        />
                        <FormMessage type="error">{errors.description}</FormMessage>
                    </div>
                </div>

                <div className="four wide column field">
                    <ReactImageFallback
                        src={data.img}
                        fallbackImage="http://via.placeholder.com/250x250"
                        alt="thumbnail"
                        className="ui image"
                    />
                </div>

                <div className="twelve wide column">
                    <div className={errors.img ? "field error" : "field"}>
                        <label>Image</label>
                        <input
                            value={data.img}
                            onChange={setFormObject(data, setData)}
                            type="text"
                            name="img"
                            id="img"
                            placeholder="img"
                        />
                        <FormMessage>{errors.img}</FormMessage>
                    </div>
                </div>

                <div className="six wide column field">
                    <div className={errors.director ? "field error" : "field"}>
                        <label>Director</label>
                        <input   type="text"  name="director"  id="director"  placeholder="film director"
                                 onChange={setFormObject(data, setData)}
                                 value={data.director}
                        />
                        <FormMessage type="error">{errors.director}</FormMessage>
                    </div>
                </div>

                <div className="six wide column field">
                    <div className={errors.duration ? "field error" : "field"}>
                        <label>Duration</label>
                        <input type="number"  name="duration" id="duration"  placeholder="Duration"
                               value={data.duration}
                               onChange={setFormObject(data, setData)}
                        />
                        <FormMessage type="error">{errors.duration}</FormMessage>
                    </div>
                </div>

                <div className="six wide column field">
                    <div className={errors.price ? "field error" : "field"}>
                        <label>Price</label>
                        <input type="number" name="price"  id="price"  placeholder="price"
                               value={data.price}
                               onChange={setFormObject(data, setData)}
                        />
                        <FormMessage type="error">{errors.price}</FormMessage>
                    </div>
                </div>

                <div className="six wide column inline field">
                    <label htmlFor="featured">Featured</label>
                    <input  type="checkbox" name="featured"  id="featured"
                            value={data.featured}
                            onChange={setFormObject(data, setData)}
                    />
                </div>
            </div>

            <div className="ui fluid buttons">
                <button className="ui button primary" type="submit">Save</button>
                <div className="or" />
                <Link to="/films" className="ui button">Hide form</Link>
            </div>
        </form>
    )
}

export default FilmForm
