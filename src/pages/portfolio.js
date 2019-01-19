import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'


class PortfolioPage extends React.Component {
  
  render() {
    console.log('state', this.props);
    let data = '';
    let projects = this.props.data.allProjectsJson.edges;
    console.log('projects', projects);
    return (
      <Layout>
        <h1>Portfolio Page 2</h1>
        <section className="work">
          <header>Capgemini Sweden<time>2018</time></header>
          <article>
            <header>Project Name</header>
          </article>
        </section>
        {projects.map(({node})=>( <div>{node.projectName}</div> ))}
      </Layout>
    );
  }
}
export const query = graphql`
  query {
    allProjectsJson{
      edges{
        node{
          projectName
        }
      }
    }
  }
`
export default PortfolioPage
