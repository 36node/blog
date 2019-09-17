import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { graphql, Link, navigate } from "gatsby"
import { Icon, Input, Progress, Row, Col } from "antd"
import { difference } from "lodash"
import HotTopic from "../components/topic"
// import Search from "../components/Search"

const { Search } = Input

const BlogProgress = styled(Progress)`
  position: fixed;
  top: -8px;
  z-index: 100;
  .ant-progress-line {
    font-size: 12px;
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
        padding: 27px 0;
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
      margin-top: 32px;
      font-size: 16px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(50, 56, 84, 1);
      @media screen and (max-width: 992px) {
        margin-top: 0px;
        padding-left: 15px;
        border-left: 2px solid #dfe0e9;
      }
    }
  }
  .recommend-area {
    margin-top: 80px;
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
        .recommend-article-title {
          color: #323854;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
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
  padding-bottom: 60px;
  width: 80%;
  margin: 0 auto;
  .article-detail {
    display: grid;
    grid-template-columns: 1fr 320px;
    padding-top: 40px;
    @media screen and (max-width: 992px) {
      display: block;
    }
    .articles {
      margin-right: 180px;
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
      }
      .article-tag {
        padding-bottom: 32px;
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
        padding: 15px 0;
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
    .hot-topics {
      width: 320px;
      @media screen and (max-width: 992px) {
        width: auto;
      }
      .title {
        margin-top: 48px;
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(50, 56, 84, 1);
        margin-bottom: 16px;
      }
      .topic-list {
        .topic {
          height: 48px;
          background-color: white;
          margin-bottom: 8px;
          border-left: 2px solid #dfe0e9;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(46, 73, 213, 1);
          padding-left: 16px;
          line-height: 48px;
          cursor: pointer;
          &:hover {
            border-left: 2px solid #667be7;
          }
        }
      }
    }
  }
`

const TopicSearch = styled(Search)`
  height: 48px;
  margin-bottom: 40px;
  @media screen and (max-width: 992px) {
    display: none;
  }
  .ant-input {
    background-color: #f8faff;
    &:hover {
      border-color: #2e49d5 !important;
    }
    &:active {
      border-color: #2e49d5 !important;
    }
  }
`
const MobileTopicSearch = styled(Search)`
  height: 48px;
  margin-bottom: 40px;
  display: none;
  @media screen and (max-width: 992px) {
    display: block;
    margin: 0 auto;
    width: 80%;
    margin-top: 32px;
  }
  .ant-input {
    background-color: #f8faff;
    &:hover {
      border-color: #2e49d5 !important;
    }
    &:active {
      border-color: #2e49d5 !important;
    }
  }
`

const MobileHotTopic = styled.div`
  width: 320px;
  padding-top: 40px;
  @media screen and (max-width: 992px) {
    width: auto;
  }
  .title {
    margin-top: 48px;
    font-size: 28px;
    font-family: PingFangSC;
    font-weight: 600;
    color: rgba(50, 56, 84, 1);
    margin-bottom: 16px;
  }
  .topic-list {
    .topic {
      height: 48px;
      background-color: white;
      margin-bottom: 8px;
      border-left: 2px solid #dfe0e9;
      font-size: 14px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(46, 73, 213, 1);
      padding-left: 16px;
      line-height: 48px;
      cursor: pointer;
      &:hover {
        border-left: 2px solid #667be7;
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

function findRelativeBlog(array = [], currentBlogTagArray = []) {
  let resultId = []
  for (let i = 0; i < array.length; i++) {
    const {
      node: {
        id,
        frontmatter: { tags },
      },
    } = array[i]
    if (
      difference(tags, currentBlogTagArray).length === 0 &&
      !resultId.includes(id)
    ) {
      resultId.push(id)
    }
  }
  let recommendArray = array.filter(item => resultId.includes(item.node.id))
  return recommendArray.length > 3 ? recommendArray.slice(0, 3) : recommendArray
}

const search = value => {
  navigate("/search", { state: { value } })
}

const searchIndices = [
  { name: `Pages`, title: `Pages`, hitComp: `PageHit` },
  { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` },
]

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
    console.log(data)
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
    const recommendArray = findRelativeBlog(otherEdges, frontmatter.tags)
    return (
      <Layout>
        {this.state.percent !== 0 && (
          <BlogProgress
            percent={this.state.percent}
            showInfo={false}
            strokeColor="#2E49D5"
          />
        )}
        {window.innerWidth < 992 && (
          <MobileTopicSearch
            placeholder="搜索文章"
            indices={searchIndices}
            onSearch={search}
          />
        )}
        <ArticleArea>
          <ArticleList>
            <div className="article-detail">
              <div className="articles">
                <div className="title">{frontmatter.title}</div>
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
              {window.innerWidth > 992 && (
                <div className="hot-topics">
                  <TopicSearch
                    className="search"
                    placeholder="搜索文章"
                    indices={searchIndices}
                    onSearch={search}
                  />
                  <HotTopic />
                </div>
              )}
            </div>
            <div className="operation">
              <div className="prev-article">
                <span className="arrow">
                  <Icon type="caret-left" />
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
                <div className="article-title">
                  {currentIndex === 0
                    ? "这是第一篇"
                    : edges[currentIndex - 1].node.frontmatter.title}
                </div>
              </div>
              <div className="next-article">
                <span className="arrow">
                  {window.innerWidth < 992 && <Icon type="caret-right" />}
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
                  {window.innerWidth > 992 && <Icon type="caret-right" />}
                </span>
                <div className="article-title">
                  {currentIndex < edges.length - 1
                    ? edges[currentIndex + 1].node.frontmatter.title
                    : "这是最后一篇"}
                </div>
              </div>
            </div>
            {recommendArray.length !== 0 && (
              <div className="recommend-area">
                <div className="title">推荐文章</div>
                <div className="recommend-articles">
                  {window.innerWidth > 992 ? (
                    <Row
                      gutter={24}
                      style={{ width: "100%", marginRight: 0, marginLeft: 0 }}
                    >
                      <div>
                        {recommendArray.map(item => {
                          const {
                            node: {
                              id,
                              frontmatter: { title, path, brief },
                            },
                          } = item
                          return (
                            <Col span={8} className="cube">
                              <Link to={path} key={path}>
                                <div className="recommend-article" key={id}>
                                  <div className="recommend-article-title">
                                    {title}
                                  </div>
                                  <div className="recommend-article-brief">
                                    {brief}
                                  </div>
                                </div>
                              </Link>
                            </Col>
                          )
                        })}
                      </div>
                    </Row>
                  ) : (
                    <div>
                      {recommendArray.map(item => {
                        const {
                          node: {
                            id,
                            frontmatter: { title, path, brief },
                          },
                        } = item
                        return (
                          <Link to={path} key={path}>
                            <div className="recommend-article" key={id}>
                              <div className="recommend-article-title">
                                {title}
                              </div>
                              <div className="recommend-article-brief">
                                {brief}
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
            {window.innerWidth < 992 && (
              <MobileHotTopic>
                <HotTopic />
              </MobileHotTopic>
            )}
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
