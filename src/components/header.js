import React from "react"
import { Menu } from "antd"
import styled from "styled-components"
import LogoImg from "./logoImage"
import { withRouter } from "react-router"

import LargeContainer from "./container-large"
import { graphql, Link } from "gatsby"

const Header = styled.div`
  width: 100%;
  height: 68px;
  line-height: 68px;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  box-shadow: 0 2px 3px #f0f1f2;

  ${LargeContainer} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ant-menu-item {
    line-height: 68px;
    padding: 0 25px;
    border: none !important;

    &:hover {
      border: none !important;
    }
  }

  .menu {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .menu {
      display: block;
      position: absolute;
      top: 20px;
      right: 5%;
      font-size: 24px;
    }
  }
`

const Logo = styled.div`
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 68px;

    img {
      height: 30px;
      margin-right: 10px;
      width: 60px;
    }

    .logo-title-con {
      line-height: 1;
      margin-left: 10px;
      .logo-title {
        font-size: 16px;
        margin: 3px 0;
        color: black;
      }

      .logo-sub-title {
        font-size: 12px;
        color: #ccd0d7;
        text-align: center;
      }
    }
  }
`

const WrapMenu = styled(Menu)`
  &.ant-menu-horizontal {
    background: transparent;
    border-bottom: none;
  }
`

class BlogHeader extends React.PureComponent {
  componentDidMount = () => {
    window.addEventListener("resize", this.updateDimensions)
  }
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions)
  }

  renderMenu = mode => {
    const homePageUrl = "http://www.adventurer.tech"
    return (
      <WrapMenu mode={mode} selectedKeys="/opinion">
        <WrapMenu.Item>
          <a href={`${homePageUrl}`}>首页</a>
        </WrapMenu.Item>
        <WrapMenu.Item key="/service">
          <a href={`${homePageUrl}/service`}>服务</a>
        </WrapMenu.Item>
        <WrapMenu.Item key="/cases">
          <a href={`${homePageUrl}/cases`}>案例</a>
        </WrapMenu.Item>
        <WrapMenu.Item key="/opinion">
          <Link to="/">观点</Link>
        </WrapMenu.Item>
        <WrapMenu.Item key="/about">
          <a href={`${homePageUrl}/about`}>关于</a>
        </WrapMenu.Item>
        <WrapMenu.Item key="/join">
          <a href={`${homePageUrl}/join`}>加入</a>
        </WrapMenu.Item>
      </WrapMenu>
    )
  }

  render() {
    return (
      <Header>
        <LargeContainer>
          <Logo>
            <Link to="/">
              <LogoImg />
              <div className="logo-title-con">
                <div className="logo-title">冒险者科技</div>
                <div className="logo-sub-title">AdventureTech</div>
              </div>
            </Link>
          </Logo>
          {this.renderMenu("horizontal")}
        </LargeContainer>
      </Header>
    )
  }
}
export default withRouter(BlogHeader)

export const query = graphql`
  query {
    file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
