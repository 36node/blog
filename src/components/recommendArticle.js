/*
   由zhaojunzhe于2019/9/20创建
*/
import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { difference, shuffle } from "lodash"
import { Col, Row } from "antd"

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

function noTagsRecommendArticle(edges) {
  return shuffle(edges).slice(0, 3)
}

const RecommendArea = styled.div`
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
      margin-bottom: 40px;
      @media screen and (max-width: 992px) {
        margin-bottom: 16px;
      }
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

const RecommendArticle = ({ otherEdges = [], tagsArray }) => {
  const recommendArray = tagsArray
    ? findRelativeBlog(otherEdges, tagsArray)
    : noTagsRecommendArticle(otherEdges)
  return (
    <RecommendArea>
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
                    <Col span={8} className="cube" key={path}>
                      <Link to={path} key={path}>
                        <div className="recommend-article" key={id}>
                          <div className="recommend-article-title">{title}</div>
                          <div className="recommend-article-brief">{brief}</div>
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
                    frontmatter: { title, path },
                  },
                } = item
                return (
                  <Link to={path} key={path}>
                    <div className="recommend-article" key={id}>
                      <div className="recommend-article-title">{title}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </RecommendArea>
  )
}

export default RecommendArticle
