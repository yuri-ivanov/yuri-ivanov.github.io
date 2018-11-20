import React from 'react'
import { Link } from 'gatsby'
import { Nav, NavItem, NavLink } from 'reactstrap';
import './header.css'


const Header = ({ siteTitle }) => (
    <header
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <Nav className="mainMenu">
        <NavItem>
          <Link to="/portfolio/">Porfolio</Link>
        </NavItem>
        <NavItem>
          <Link to="/skills/">Skills</Link>
        </NavItem>
        <NavItem>
          <Link to="/principles/">Principles</Link>
        </NavItem>
        <NavItem>
          <Link to="/contactme/">Contact Me</Link>
        </NavItem>
        <NavItem>
          <Link to="/blog/">Blog</Link>
        </NavItem>
      </Nav>
    </header>
)

export default Header
