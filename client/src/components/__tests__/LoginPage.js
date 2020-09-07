import React from "react";
import {MemoryRouter as Router} from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import {render, fireEvent} from "@testing-library/react";
import LoginPage from "../LoginPage";
import mockApi from "../../api";

const {users: {login}} = mockApi;

const data = {
    email: 'test@email.com',
    password: 'mypass',
}

const mockToken = '12345'

jest.mock('../../api');

const mockLogin = jest.fn();
const mockHistory = {push: jest.fn()}

test('should correct send data', async () => {
    login.mockResolvedValueOnce(mockToken)
    const {getByLabelText, getByTestId} = render(
        <Router>
            <LoginPage login={mockLogin} history={mockHistory}/>
        </Router>
    )

    const emailEl = getByLabelText(/email/i)
    const passwordEl = getByLabelText(/password/i)
    const btn = getByTestId('login-button')

    fireEvent.change(emailEl, {target: {value: data.email}})
    fireEvent.change(passwordEl, {target: {value: data.password}})

    await fireEvent.click(btn)

    expect(login).toHaveBeenCalledTimes(1)
    expect(login).toHaveBeenCalledWith(data)

    expect(mockHistory.push).toHaveBeenCalledTimes(1)
    expect(mockHistory.push).toHaveBeenCalledWith('/films')
})
