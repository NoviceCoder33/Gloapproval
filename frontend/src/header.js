import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./header.module.css";

function Header() {
  return (
    <>
    <div className={styles.header}>
        <h2>Intoglo</h2>
        <Link to="/" style={{textDecoration:"none"}}><h3>logout</h3></Link>
    </div>
    </>
  )
}

export default Header;