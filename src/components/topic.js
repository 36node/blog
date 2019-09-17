/*
   由zhaojunzhe于2019/9/17创建
*/
import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import styled from "styled-components"

const HotTopic = styled.div`
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
`

const Topic = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        limit: 1000
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        totalCount
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)
  const {
    allMarkdownRemark: { group },
  } = data
  return (
    <HotTopic>
      <div className="title">所有分类</div>
      <div className="topic-list">
        {group.map((tag, index) => (
          <Link
            style={{
              textDecoration: `none`,
            }}
            to={`/tags/${kebabCase(tag.fieldValue)}/`}
            key={index}
          >
            <div className="topic" key={tag.fieldValue}>
              {tag.fieldValue} ({tag.totalCount})
            </div>
          </Link>
        ))}
      </div>
    </HotTopic>
  )
}

export default Topic
