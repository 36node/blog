import React from "react"
import { Icon } from "antd"
import styled from "styled-components"
import { graphql, Link, navigate } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HotTopic from "../components/topic"
// import Search from "../components/Search"

const ArticleList = styled.div`
  padding-bottom: 60px;
  display: grid;
  grid-template-columns: 1fr 320px;
  @media screen and (max-width: 992px) {
    display: block;
    width: 100%;
    padding: 0 20px;
    position: relative;
  }
  width: 100%;
  padding: 0 10%;
  margin: 0 auto;
  .articles {
    position: relative;
    right: 40px;
    max-width: 800px;
    padding-bottom: 50px;
    @media screen and (max-width: 992px) {
      margin-right: 0;
      right: 0px;
    }
    &:first-child {
      @media screen and (max-width: 992px) {
        padding-top: 75px;
      }
    }
    .article {
      cursor: pointer;
      padding: 40px;
      @media screen and (max-width: 992px) {
        border-bottom: 2px solid #dfe0e9;
        padding: 35px 0 32px 0;
      }
      @media screen and (min-width: 992px) {
        &:hover {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 15px 60px 0px rgba(92, 105, 127, 0.1);
          .article-title {
            color: #2e49d5;
          }
          .article-view {
            display: inline-block;
          }
        }
      }
      .article-title {
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(50, 56, 84, 1);
        line-height: 40px;
        letter-spacing: 1px;
        margin-bottom: 16px;
        @media screen and (max-width: 992px) {
          font-size: 20px;
        }
      }
      .article-tag {
        margin-bottom: 24px;
        .tag {
          display: inline-block;
          padding: 5px 12px;
          height: 30px;
          border: 2px solid rgba(235, 239, 255, 1);
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(102, 123, 231, 1);
          line-height: 18px;
          margin-right: 8px;
        }
      }
      .brief-info {
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(107, 109, 127, 1);
        margin-bottom: 24px;
        @media screen and (max-width: 992px) {
          margin-bottom: 16px;
        }
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .author-info {
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(50, 56, 84, 1);
        margin-right: 20px;
      }
      .time-info {
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(158, 166, 180, 1);
      }
      .article-view {
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(46, 73, 213, 1);
        float: right;
        display: none;
        @media screen and (max-width: 992px) {
          display: block;
        }
      }
    }
    .more-article {
      width: 180px;
      height: 48px;
      border-radius: 4px;
      border: 2px solid rgba(102, 123, 231, 1);
      line-height: 48px;
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(102, 123, 231, 1);
      cursor: pointer;
      margin-left: 40px;
      margin-bottom: 50px;
      margin-top: 50px;
      @media screen and (max-width: 992px) {
        width: 100%;
        margin-left: 0;
      }
    }
  }
`

const PAGE_SIZE = 5

export default class IndexPage extends React.PureComponent {
  state = {
    page: 0,
    pageCount: 0,
  }
  componentDidMount() {
    const {
      data: {
        allMarkdownRemark: { edges },
      },
    } = this.props
    const pageCount = Math.floor(edges.length / PAGE_SIZE)
    this.setState({ pageCount })
  }

  pagination = () => {
    if (this.state.page < this.state.pageCount) {
      this.setState({ page: this.state.page + 1 })
    }
  }
  search = value => {
    navigate("/search", { state: { value } })
  }
  render() {
    const {
      data: {
        allMarkdownRemark: { edges },
      },
    } = this.props
    const { page, pageCount } = this.state
    return (
      <Layout>
        <SEO title="Home" />
        <ArticleList>
          <div className="articles">
            {edges.slice(0, (page + 1) * PAGE_SIZE).map(({ node }) => (
              <Link to={node.frontmatter.path} key={node.frontmatter.path}>
                <div className="article" key={node.id}>
                  <div className="article-title">{node.frontmatter.title}</div>
                  <div className="article-tag">
                    {node.frontmatter.tags.map(item => (
                      <span className="tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="brief-info">{node.frontmatter.brief}</div>
                  <div>
                    <span className="author-info">
                      {node.frontmatter.author}
                    </span>
                    <span className="time-info">{node.frontmatter.date}</span>
                    <span className="article-view">
                      查看全文
                      <Icon type="caret-right" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            <div
              className="more-article"
              onClick={this.pagination}
              style={{ display: page < pageCount ? "block" : "none" }}
            >
              更多文章
            </div>
          </div>
          <HotTopic />
        </ArticleList>
      </Layout>
    )
  }
}
export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            brief
            author
            path
            tags
          }
          excerpt
        }
      }
    }
  }
`
