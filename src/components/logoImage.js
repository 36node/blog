import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
// import Img from "gatsby-image"
import logo from "../../static/logo.png"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     file(relativePath: { eq: "logo.png" }) {
  //       childImageSharp {
  //         fixed(width: 60, height: 30) {
  //           ...GatsbyImageSharpFixed
  //         }
  //       }
  //     }
  //   }
  // `)

  // return <Img fixed={data.file.childImageSharp.fixed} />
  return <img src={logo} alt="" />
}

export default Image
