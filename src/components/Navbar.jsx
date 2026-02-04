import React from 'react'
import Home from './Home'
import About from './About'
import Symptomgalaxy from './DIYData'
import {Link,NavLink} from 'react-router-dom'
import "./Navbar.css";

//using NavLink tag instead of anchor tag because it doesn't reload the entire page like anchor tag
const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
            <NavLink to= '/' className={({isActive}) =>isActive? "active-link":""}>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to = '/about' className={({isActive}) =>isActive? "active-link":""}> About </NavLink>
        </li>
        <li>
            <NavLink to = '/DIYData' className={({isActive}) =>isActive? "active-link":""}> DIYdata</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
