const pageQuery = `
  query IndexPageQuery($slug: String!) {
    page(where: {slug: $slug}) {
      banner {
        id
        content
        href
        slug
        theme
      }
      blocks {
        __typename
        ... on Grid {
          id
          columns {
            __typename
            ... on BlogPost {
              id
              authors {
                name
              }
              content {
                markdown
              }
              coverImage {
                id
                title
                url
              }
              published
              slug
              title
            }
            ... on Feature {
              id
              content {
                markdown
              }
              image {
                id
                title
                url
              }
              slug
              title
            }
          }
          slug
          gridSubtitle: subtitle {
            markdown
          }
          gridTitle: title
          width
        }
        ... on Hero {
          id
          buttons {
            id
            href
            label
            style
          }
          image {
            id
            title
            url
          }
          slug
        }
      }
      id
      subtitle {
        markdown
      }
      title
    }
  }
`

export { pageQuery }