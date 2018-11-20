import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

const IndexPage = () => (
  <Layout>
    <h1>Yuri Ivanov</h1>
    <p>Java Developer</p>
    <p>building software is my pasion</p>
    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
      <Image />
    </div>
    
  </Layout>
)

export default IndexPage
