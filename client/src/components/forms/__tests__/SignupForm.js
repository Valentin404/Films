import React from 'react'
import {MemoryRouter as Router} from 'react-router-dom'
import {render} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'
import SignupForm from '../SignupForm'

expect.extend(toHaveNoViolations)

test('signup form must be accessible', async () => {
    const {container} = render(<Router><SignupForm /></Router>,)

    const result = await axe(container)
    expect(result).toHaveNoViolations()
})
