import React from 'react'
import {render, act as reactAct} from '@testing-library/react'
import {renderHook, act as hookAct} from '@testing-library/react-hooks'
import useCounter from '../useCounter'

test('useCounter', () => {
    const {result} = renderHook(useCounter);

    expect(result.current.count).toBe(0)
    hookAct(() => result.current.increment())
    expect(result.current.count).toBe(1)
    hookAct(() => result.current.decrement())
    expect(result.current.count).toBe(0)
})

function setup({initialProps} = {}) {
    let result = {};

    function TestComponent() {
        result.current = useCounter(initialProps);
        return null
    }

    render(<TestComponent {...initialProps} />)
    return result;
}

