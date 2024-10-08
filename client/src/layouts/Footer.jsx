import React from 'react'

const Footer = () => {
  return (
    <footer className='footer flex-space-around'>
        <div className='flex-space-around'>
            <form method="post" action="">

            <label htmlFor='subscribe'>Subscribe Page</label>
            <input type='email' name='subscribe'
            id='subscribe' placeholder='Enter your email address'
            className='footer-input'>
                </input>

            <button type='submit' className='button-subscribe'>Subscribe</button>

            </form>
        </div>

        <div>
            <p>&copy; Copyright 2024. Mehedi Hassan. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer