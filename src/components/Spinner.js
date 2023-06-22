import React, { Component } from 'react'
import loader from "./Loader.gif.gif"

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center font'>
      <img className="my-3" src={loader} alt='loading' />
        
      </div>
    )
  }
}

export default Spinner
