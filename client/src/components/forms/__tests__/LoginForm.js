import React from "react"
import {MemoryRouter as Router} from "react-router-dom"
import user from "@testing-library/user-event"
import {render, fireEvent} from "@testing-library/react"
import LoginForm from "../LoginForm"

const submit = jest.fn(() => Promise.resolve())

const data = {
    email: "test@mail.com",
    password: "mypass",
}

test("should render correctly", () => {
    const {getByLabelText, getByTestId, getByRole, queryByRole} = render(<Router><LoginForm submit={submit}/></Router>)

    const emailEl = getByLabelText(/email/i)
    const passwordEl = getByLabelText(/password/i)
    const btn = getByTestId('login-button');

    user.type(emailEl, 'not correct email');
    user.type(passwordEl, 'correct password');

    fireEvent.click(btn)

    expect(queryByRole('alert')).toBeNull()
})
