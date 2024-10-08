import React from 'react'
import {useSelector,useDispatch} from 'react-redux'


import {decrement, increment, incrementByAmount, reset} from '../app/feautures/counter/counterSlice'

const Counter = () => {

  const {count} = useSelector((state)=>
        state.counterR
  )

  const dispatch = useDispatch()

  const handleIncrement = ()=>{
      dispatch(increment())
  }

  const handleDecrement = ()=>{
      dispatch(decrement())
  }
  const handleReset = ()=>{
      dispatch(reset())
  }
  const handleIncrementByAmount = ()=>{
      dispatch(incrementByAmount(5))
  }

  return (
    <div>
    <h2>Count : {count}</h2>
    <button onClick={handleIncrement}>Increment</button>
    <button onClick={handleDecrement}>Decrement</button>
    <button onClick={handleReset}>Reset</button>
    <button onClick={handleIncrementByAmount}>Increment+5</button>
    </div>
  )
}

export default Counter