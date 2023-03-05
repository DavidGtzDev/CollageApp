import React from 'react'
import styles from './styles.module.css'

export default function Navbar() {
  //onclick redirect depending on the e.target.innerText

  function handleClick(e: any) {
    window.location.href = '/' + e.target.innerText;
  }
  return (
    <div className={styles.navbar}>
        <div> <p onClick={handleClick}>collage</p>  </div>
        <div> <p onClick={handleClick}>remover</p> </div>
    </div>
  )
}
