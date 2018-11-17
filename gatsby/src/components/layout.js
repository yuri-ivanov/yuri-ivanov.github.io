import React from "react"
import { css } from "react-emotion"
import { rhythm } from "../util/typography"
import { StaticQuery, Link, graphql } from "gatsby"


const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default ({ children }) => (
    <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
    }
    render={data => ( 
    <div
    className={css`
      margin: 0 auto;
      max-width: 700px;
      padding: ${rhythm(2)};
      padding-top: ${rhythm(1.5)};
    `}>
    <Link to={`/`}>
      <h3
        className={css`
          margin-bottom: ${rhythm(2)};
          display: inline-block;
          font-style: normal;
        `}
      >
        {data.site.siteMetadata.title}
      </h3>
    </Link>
    <Link
      to={`/about/`}
      className={css`
        float: right;
      `}
    >
      About
    </Link>
    {children}
  </div>
  )}
  />  
)