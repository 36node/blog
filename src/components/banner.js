import React from "react"
import styled from "styled-components"
import Image from "./image"

const BannerWrapper = styled.div`
  width: 100%;
  height: 320px;
  background-color: #2e49d5;
  display: grid;
  grid-template-columns: 1fr 440px;
  padding: 0 10%;
  @media screen and (max-width: 992px) {
    height: auto;
    display: block;
    padding: 38px 20px 0 20px;
    text-align: center;
  }
  .text-area {
    padding-top: 80px;
    @media screen and (max-width: 992px) {
      padding-top: 0px;
      margin-right: 0px;
    }
    .title {
      height: 62px;
      font-size: 44px;
      font-family: PingFangSC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 62px;
      letter-spacing: 2px;
      margin-bottom: 32px;
      @media screen and (max-width: 992px) {
        font-size: 24px;
        margin-bottom: 16px;
        line-height: initial;
        height: auto;
      }
    }
    .subtitle {
      height: 64px;
      font-size: 18px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 32px;
      letter-spacing: 1px;
      @media screen and (max-width: 992px) {
        font-size: 12px;
        line-height: 24px;
      }
    }
  }
`

export default class Banner extends React.PureComponent {
  render() {
    return (
      <BannerWrapper>
        <div className="text-area">
          <div className="title">从思考，到创造</div>
          <div className="subtitle">
            我们在观察和理解这个世界的同时，更坚持不断持续探索与创新，将我们的理念付诸于实践，将我们的梦想变为现实。
          </div>
        </div>
        <Image />
      </BannerWrapper>
    )
  }
}
