import React from 'react'
import './styles.css'
function footer() {
  return (
    <footer className="bg-dark text-white mt-5 pd-4 text-center foot">
      Copyright &copy; {new Date().getFullYear()}
    </footer>
  )
}

export default footer