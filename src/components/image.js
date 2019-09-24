import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import test from "../../static/a.png"

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
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "article-banner.png" }) {
        childImageSharp {
          fluid(maxWidth: 440, maxHeight: 320) {
            ...GatsbyImageSharpFluid
          }
          fixed(width: 440, height: 320) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <Img
      fluid={data.file.childImageSharp.fluid}
      alt="Gatsby Docs are awesome"
      style={{ width: "100%" }}
    />
  )
}

export default Image
