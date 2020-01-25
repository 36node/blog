import React from "react"
import { Menu, Divider } from "antd"
import styled from "styled-components"
import { NavLink } from "react-router-dom"

import Container from "./container"
import LogoImg from "./logoImage"
import { Link } from "gatsby"

const Footer = styled.div`
  width: 100%;
  background: #071b46;
  padding-top: 50px;
  padding-bottom: 30px;

  .ant-divider {
    background: #0e224b;
    margin: 80px 0 40px 0;
  }

  p {
    color: #9ea6b4;
    text-align: center;
    font-size: 13px;
  }

  @media screen and (max-width: 768px) {
    padding-top: 30px;
    padding-bottom: 20px;
    overflow-x: hidden;
    .ant-divider {
      margin: 20px 0;
    }
  }
`

const FooterMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .ant-menu-item {
    padding: 0 25px;
    border: none !important;

    a {
      color: #9ea6b4 !important;
    }

    &:hover {
      border: none !important;

      a {
        color: white !important;
      }
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    .ant-menu {
      margin: 20px 0 0 -15px;
    }

    .ant-menu-item {
      padding: 0 15px;
    }
  }
`

const Logo = styled.div`
  a {
    display: flex;
    align-items: flex-end;
    flex-direction: row;

    img {
      height: 30px;
      margin-right: 10px;
    }

    .logo-title-con {
      line-height: 0.5;
      margin-left: 10px;

      .logo-title {
        font-size: 16px;
        margin-bottom: 5px;
        color: white;
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

export default class AdventureFooter extends React.PureComponent {
  render() {
    const homePageUrl = "http://www.adventurer.tech"
    return (
      <Footer>
        <Container>
          <FooterMain>
            <Logo>
              <NavLink to="/">
                <LogoImg />
                <div className="logo-title-con">
                  <div className="logo-title">冒险者科技</div>
                </div>
              </NavLink>
            </Logo>
            <WrapMenu mode="horizontal">
              <WrapMenu.Item>
                <a href={`${homePageUrl}`}>首页</a>
              </WrapMenu.Item>
              <WrapMenu.Item>
                <a href={`${homePageUrl}/service`}>服务</a>
              </WrapMenu.Item>
              <WrapMenu.Item>
                <a href={`${homePageUrl}/cases`}>案例</a>
              </WrapMenu.Item>
              <WrapMenu.Item>
                <Link to="/">观点</Link>
              </WrapMenu.Item>
              <WrapMenu.Item>
                <a href={`${homePageUrl}/about`}>关于</a>
              </WrapMenu.Item>
              <WrapMenu.Item>
                <a href={`${homePageUrl}/join`}>加入</a>
              </WrapMenu.Item>
            </WrapMenu>
            )}
          </FooterMain>
          <Divider />
          <p>
            © 2018-2019 AdventurerTech, Inc All rights reserved
            冒险者科技（北京）有限公司版权所有 京ICP备 14026729-1
          </p>
        </Container>
      </Footer>
    )
  }
}
