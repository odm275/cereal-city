const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      query AllProductsQuery {
        allNodeProduct {
          edges {
            node {
              field_name
              field_price
              drupal_id
            }
          }
        }
      }
    `).then(result => {
      console.log(result.data)
      result.data.allNodeProduct.edges.forEach(({ node }) => {
        createPage({
          path: node.drupal_id,
          component: path.resolve(`./src/templates/product-post.js`),
          context: {
            slug: node.drupal_id,
          },
        })
      })
      resolve()
    })
  })
}
