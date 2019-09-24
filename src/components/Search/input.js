import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { SearchIcon, Form, Input } from "./styles"
export default connectSearchBox(({ refine, ...rest }) => (
  <Form>
    <Input
      type="text"
      placeholder="搜索文章"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      {...rest}
    />
    <SearchIcon />
  </Form>
))/*
   由zhaojunzhe于2019/9/13创建
*/
