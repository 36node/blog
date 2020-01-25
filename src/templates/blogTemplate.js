import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import { Icon, Progress } from "antd"
import RecommendArticle from "../components/recommendArticle"
import HotTopic from "../components/topic"
// import Search from "../components/Search"
const BlogProgress = styled(Progress)`
  position: fixed;
  top: -11px;
  z-index: 100;
  .ant-progress-line {
    font-size: 12px;
  }
  .ant-progress-bg {
    height: 3px !important;
  }
`

const ArticleArea = styled.div`
  background-color: #f8faff;
  .operation {
    display: flex;
    justify-content: space-between;
    padding-bottom: 55px;
    border-bottom: 2px solid F2F4FA;
    @media screen and (max-width: 992px) {
      display: block;
      border-bottom: 2px solid #dfe0e9;
      border-top: 2px solid #dfe0e9;
      padding-bottom: 0;
    }
    .right {
      float: right;
    }
    .left {
      float: left;
    }
    .clear {
      clear: both;
    }
    .arrow {
      font-size: 16px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(46, 73, 213, 1);
      cursor: pointer;
      padding-bottom: 16px;
      border-bottom: 2px solid #f2f4fa;
      @media screen and (max-width: 992px) {
        padding-bottom: 0;
        border-bottom: none;
        padding-right: 15px;
      }
    }
    .prev-article {
      @media screen and (max-width: 992px) {
        display: flex;
        padding: 25px 0;
        border-bottom: 2px solid #dfe0e9;
      }
    }
    .next-article {
      @media screen and (max-width: 992px) {
        display: flex;
        padding: 27px 0;
      }
    }
    .article-title {
      margin-top: 16px;
      font-size: 16px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(50, 56, 84, 1);
      @media screen and (max-width: 992px) {
        margin-top: 0px;
        padding-left: 15px;
        border-left: 2px solid #dfe0e9;
        max-width: 70%;
      }
    }
  }
  .recommend-area {
    margin-top: 80px;
    @media screen and (max-width: 992px) {
      margin-top: 40px;
    }
    .title {
      font-size: 28px;
      font-family: PingFangSC;
      font-weight: 600;
      color: rgba(50, 56, 84, 1);
    }
    .recommend-articles {
      display: flex;
      // display: grid;
      // grid-template-columns: 1fr 1fr 1fr;
      @media screen and (max-width: 992px) {
        display: block;
        box-shadow: 0px 10px 20px 0px rgba(92, 105, 127, 0.1);
      }
      .cube {
        &:first-child {
          padding-left: 0 !important;
        }
        &:nth-of-type(3n) {
          padding-right: 0 !important;
        }
      }
      .recommend-article {
        height: 150px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 15px 60px 0px rgba(92, 105, 127, 0.1);
        border-top: 2px solid #2e49d5;
        padding: 20px;
        @media screen and (max-width: 992px) {
          padding: 23px 15px;
          border-top: none;
          border-left: 2px solid #2e49d5;
          height: auto;
        }
        .recommend-article-title {
          color: #323854;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 0px;
        }
        .recommend-article-brief {
          color: black;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          display: -webkit-box;
        }
        @media screen and (max-width: 992px) {
          display: block;
          margin: 0 0px 20px 0px;
        }
        &:nth-of-type(n) {
          margin-left: 0;
        }
        &:nth-of-type(3n) {
          margin-right: 0;
        }
      }
    }
  }
`

const ArticleList = styled.div`
  padding: 0px 10%;
  margin: 0 auto;
  padding-bottom: 50px;
  @media screen and (max-width: 992px) {
    padding: 70px 20px 0 20px;
    position: relative;
  }
  .article-detail {
    display: grid;
    grid-template-columns: 1fr 320px;
    @media screen and (max-width: 992px) {
      display: block;
    }
    .articles {
      margin-right: 200px;
      padding-top: 40px;
      @media screen and (max-width: 992px) {
        margin-right: 0px;
      }
      .title {
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(50, 56, 84, 1);
        margin-bottom: 16px;
      }
      .blog-content {
        padding-bottom: 50px;
        border-bottom: 2px solid #f2f4fa;
        margin-bottom: 50px;
        @media screen and (max-width: 992px) {
          margin-bottom: 0px;
        }
      }
      .article-tag {
        padding-bottom: 32px;
        @media screen and (max-width: 992px) {
          padding-bottom: 16px;
        }
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
      .author-time-area {
        border-top: 2px solid #f2f4fa;
        border-bottom: 2px solid #f2f4fa;
        padding: 12px 0;
        display: flex;
        justify-content: space-between;
        margin-bottom: 32px;
        .author {
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(50, 56, 84, 1);
        }
        .date {
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(158, 166, 180, 1);
        }
      }
    }
  }
`

function createTagArray(array) {
  if (Array.isArray(array)) {
    return array.map(item => (
      <span className="tag" key={item}>
        {item}
      </span>
    ))
  }
  return null
}

export default class Template extends React.PureComponent {
  state = {
    percent: 0,
  }
  componentDidMount = () => {
    window.addEventListener("scroll", this.progress)
  }
  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.progress)
  }
  progress = () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    if (scrollTop + clientHeight === scrollHeight) {
      this.setState({ percent: 100 })
    } else {
      this.setState({ percent: (scrollTop / scrollHeight) * 100 })
    }
  }
  render() {
    const { data } = this.props
    const {
      markdownRemark,
      allMarkdownRemark: { edges },
    } = data // data.markdownRemark holds our post data
    const { frontmatter, html } = markdownRemark
    const currentPath = frontmatter.path
    const currentIndex = edges.findIndex(
      item => item.node.frontmatter.path === currentPath
    )
    const otherEdges = edges.filter((item, index) => index !== currentIndex)
    return (
      <Layout>
        {this.state.percent !== 0 && (
          <BlogProgress
            percent={this.state.percent}
            showInfo={false}
            strokeColor="#2E49D5"
          />
        )}
        <ArticleArea>
          <ArticleList>
            <div className="article-detail">
              <div className="articles">
                <div className="title" ref="target">
                  {frontmatter.title}
                </div>
                {frontmatter.tags && (
                  <div className="article-tag">
                    {createTagArray(frontmatter.tags)}
                  </div>
                )}
                <div className="author-time-area">
                  <span className="author">{frontmatter.author}</span>
                  <span className="date">{frontmatter.date}</span>
                </div>
                <div className="blog-container">
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>
              </div>
              <HotTopic />
            </div>
            <div className="operation">
              <div className="prev-article">
                <span
                  className="arrow left"
                  style={{ paddingLeft: currentIndex === 0 ? 16 : 0 }}
                >
                  {currentIndex !== 0 && <Icon type="caret-left" />}
                  <Link
                    to={
                      currentIndex === 0
                        ? ""
                        : edges[currentIndex - 1].node.frontmatter.path
                    }
                    disabled={currentIndex === 0}
                  >
                    上一篇
                  </Link>
                </span>
                <div className="clear" />
                <div className="article-title">
                  {currentIndex === 0
                    ? "这是第一篇"
                    : edges[currentIndex - 1].node.frontmatter.title}
                </div>
              </div>
              <div className="next-article">
                <span
                  className="arrow right"
                  style={{
                    paddingLeft: currentIndex === edges.length - 1 ? 16 : 0,
                  }}
                >
                  <Link
                    to={
                      currentIndex < edges.length - 1
                        ? edges[currentIndex + 1].node.frontmatter.path
                        : ""
                    }
                    disabled={currentIndex >= edges.length - 1}
                  >
                    下一篇
                  </Link>
                  {currentIndex < edges.length - 1 && (
                    <Icon type="caret-right" />
                  )}
                </span>
                <div className="clear" />
                <div className="article-title">
                  {currentIndex < edges.length - 1
                    ? edges[currentIndex + 1].node.frontmatter.title
                    : "这是最后一篇"}
                </div>
              </div>
            </div>
            <RecommendArticle
              otherEdges={otherEdges}
              tagsArray={frontmatter.tags}
            />
            <HotTopic />
          </ArticleList>
        </ArticleArea>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        brief
        author
        tags
      }
    }
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            path
            tags
            brief
          }
        }
      }
    }
  }
`
