/*
   由zhaojunzhe于2019/9/14创建
*/
import React from "react"
import { Icon, Input } from "antd"
import styled from "styled-components"
import { graphql, Link, navigate } from "gatsby"
import Layout from "../components/layout"
import kebabCase from "lodash/kebabCase"
// import Search from "../components/Search"

const { Search } = Input

const searchIndices = [
  { name: `Pages`, title: `Pages`, hitComp: `PageHit` },
  { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` },
]

const ArticleArea = styled.div`
  background-color: #f8faff;
`

const ArticleList = styled.div`
  padding-bottom: 60px;
  display: grid;
  grid-template-columns: 1fr 320px;
  @media screen and (max-width: 992px) {
    display: block;
    width: 100%;
  }
  width: 80%;
  margin: 0 auto;
  padding-top: 4px;
  .articles {
    margin-right: 180px;
    @media screen and (max-width: 992px) {
      margin-right: 0;
    }
    .searchResult {
      height: 70px;
      font-size: 14px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(158, 166, 180, 1);
      line-height: 110px;
      border-bottom: 1px solid #dfe0e9;
      letter-spacing: 5px;
      .search-count {
        color: black;
      }
    }
    .article {
      cursor: pointer;
      padding: 40px;
      @media screen and (max-width: 992px) {
        border-bottom: 2px solid #dfe0e9;
      }
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
      @media screen and (max-width: 992px) {
        width: 80%;
      }
    }
  }
  .hot-topics {
    width: 320px;
    padding-top: 40px;
    @media screen and (max-width: 992px) {
      width: 80%;
      margin: 0 auto;
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
`
const MobileTopicSearch = styled(Search)`
  height: 48px;
  margin-bottom: 40px;
  .ant-input {
    background-color: #f8faff;
    &:hover {
      border-color: #2e49d5 !important;
    }
    &:active {
      border-color: #2e49d5 !important;
    }
  }
  @media screen and (max-width: 992px) {
    width: 80%;
    margin: 32px;
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

export default class SearchPage extends React.Component {
  search = value => {
    if (value === "") {
      navigate("/");
    } else {
      navigate("/search", { state: { value } })
    }
  };
  render() {
    const {
      data: {
        allMarkdownRemark: { edges, group },
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
        <ArticleArea>
          <ArticleList>
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
              {window.innerWidth > 992 && (
                <div className="searchResult">
                  共<span className="search-count">{filterEdges.length}</span>
                  篇相关文章
                </div>
              )}
              {filterEdges.map(({ node }) => (
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
                      <Link to={node.frontmatter.path}>查看全文</Link>
                      <Icon type="caret-right" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="hot-topics">
              {window.innerWidth > 992 && (
                <TopicSearch
                  className="search"
                  placeholder="搜索文章"
                  indices={searchIndices}
                  defaultValue={value}
                  onSearch={this.search}
                />
              )}
              {window.innerWidth > 992 && (
                <div>
                  <div className="title">所有分类</div>
                  <div className="topic-list">
                    {group.map(tag => (
                      <div className="topic" key={tag.fieldValue}>
                        <Link
                          style={{
                            textDecoration: `none`,
                          }}
                          to={`/tags/${kebabCase(tag.fieldValue)}/`}
                        >
                          {tag.fieldValue} ({tag.totalCount})
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ArticleList>
        </ArticleArea>
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
