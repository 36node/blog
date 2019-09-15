/*
   由zhaojunzhe于2019/9/13创建
*/
import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import styled from "styled-components"
import kebabCase from "lodash/kebabCase"

const Topic = styled.div`
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

export default class Categories extends React.PureComponent {
  render() {
    const data = useStaticQuery(graphql`
      query {
        allMarkdownRemark {
          totalCount
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `)
    console.log(data);
    const allTags = data.allMarkdownRemark.group
    return (
      <Topic>
        <div className="topic-list">
          {allTags.map(tag => (
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
      </Topic>
    )
  }
}
