import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

const ProductTemplate = ({ data }) => {
  const { name, body, relationships } = data.nodeProduct
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title">{name}</h1>
          <div className="columns">
            <div className="column is-half">
              <Img
                fixed={relationships.gallery[0].localFile.childImageSharp.fixed}
              />
              <div className="columns">
                <div className="column">
                  {relationships.gallery.map(image => (
                    <Img fixed={image.localFile.childImageSharp.fixed} />
                  ))}
                </div>
              </div>
            </div>
            <div className="column">
              {body.value ? (
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: body.value }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query Product($slug: String!) {
    nodeProduct(drupal_id: { eq: $slug }) {
      drupal_id
      title
      body {
        value
      }
      name: field_name
      relationships {
        gallery: field_gallery {
          localFile {
            childImageSharp {
              fixed(width: 112, height: 112) {
                ...GatsbyImageSharpFixed_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`

export default ProductTemplate
