/*
   由zhaojunzhe于2019/9/14创建
*/
import React from "react"
import { Icon, Input } from "antd"
import styled from "styled-components"
import { graphql, Link, navigate } from "gatsby"
import Layout from "../components/layout"
import HotTopic from "../components/topic"
import RecommendArticle from "../components/recommendArticle"
// import Search from "../components/Search"

const { Search } = Input

const searchIndices = [
  { name: `Pages`, title: `Pages`, hitComp: `PageHit` },
  { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` },
]

const ArticleList = styled.div`
  padding-bottom: 60px;

  .articles-zone {
    display: grid;
    grid-template-columns: 1fr 320px;
    @media screen and (max-width: 992px) {
      display: block;
    }
  }
  .hot-topics{
    padding-top: 40px;
  }
  @media screen and (max-width: 992px) {
    display: block;
    width: 100%;
    padding: 0 20px;
    padding-bottom: 110px;
  }
  width: 100%;
  padding: 0 10%;
  margin: 0 auto;
  padding-bottom: 110px;
  .articles {
    position: relative;
    right: 40px;
    max-width: 800px;
    .searchResult {
      height: 48px;
      margin-top: 40px;
      border-bottom: 1px solid #dfe0e9;
      margin-left: 40px;
      line-height: 60px;
      color: #9ea6b4;
      letter-spacing: 3px;
      @media screen and (max-width: 992px) {
        margin-left: 0px;
      }
      .search-count {
        color: #2e49d5;
      }
    }
    @media screen and (max-width: 992px) {
      margin-right: 0;
      right: 0px;
    }
    .empty-search {
      margin: 30px 0 30px 40px;
      @media screen and (max-width: 992px) {
        margin: 30px 0;
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
const MobileTopicSearch = styled(Search)`
  height: 48px;
  margin-bottom: 40px;
  margin-top: 35px !important;
  @media screen and (max-width: 992px) {
    margin: 32px 0;
    margin-bottom: 0;
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

export default class SearchPage extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const inMobile = window.innerWidth < 992;
    const scrollValue = inMobile ? 420 : 320;
    setTimeout(() => {
      window.scrollTo({
        top: scrollValue,
        behavior: "smooth",
      })
    }, 0)
  }
  
  search = value => {
    if (value === "") {
      navigate("/")
    } else {
      navigate("/search", { state: { value } })
    }
  }
  render() {
    const {
      data: {
        allMarkdownRemark: { edges },
      },
      location: {
        state: { value },
      },
    } = this.props
    const filterEdges = edges.filter(item =>
      item.node.frontmatter.title.includes(value)
    )

    return (
      <Layout>
        <ArticleList>
          <div className="articles-zone">
            {window.innerWidth < 992 && (
              <MobileTopicSearch
                className="search"
                placeholder="搜索文章"
                defaultValue={value}
                indices={searchIndices}
                onSearch={this.search}
              />
            )}
            <div className="articles">
              <div className="searchResult">
                共<span className="search-count">{filterEdges.length}</span>
                篇和"{value}"相关的文章
              </div>
              {filterEdges.length === 0 && (
                <div className="empty-search">
                  没有找到和"{value}"有关的文章
                </div>
              )}
              {filterEdges.map(({ node }) => (
                <Link to={node.frontmatter.path} key={node.frontmatter.path}>
                  <div className="article" key={node.id}>
                    <div className="article-title">
                      {node.frontmatter.title}
                    </div>
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
            </div>
            <div className="hot-topics">
              {window.innerWidth > 992 && <HotTopic />}
            </div>
          </div>
          <RecommendArticle otherEdges={edges} />
        </ArticleList>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
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
