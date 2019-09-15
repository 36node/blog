import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"

const TagWrapper = styled.div`
  margin: 50px 0;
  text-align: center;
  .article-list{
    padding-left: 0;
    li{
      list-style: none;
      margin-bottom: 5px;
    }
  }
`

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map(post => (
      <li key={post.node.frontmatter.path}>
        <Link to={post.node.frontmatter.path}>{post.node.frontmatter.title}</Link>
      </li>
    ))

    return (
      <Layout location={this.props.location}>
        <TagWrapper>
          <h1>
            {this.props.data.allMarkdownRemark.totalCount}
            篇
            “{this.props.pageContext.tag}”标签下的文章
          </h1>
          <ul className="article-list">{postLinks}</ul>
          <p>
            <Link to="/">返回全部文章</Link>
          </p>
        </TagWrapper>
      </Layout>
    )
  }
}

export default TagRoute

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title,
            path
          }
        }
      }
    }
  }
`
