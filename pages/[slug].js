import { useRouter } from 'next/router'
import { gql } from 'graphql-request'

import { getLayout as getPageLayout } from '../components/layout-page'
import { graphcmsClient } from '../lib/_client'
import { pageQuery } from '../lib/_queries'
import { parsePageData } from '../utils/_parsePageData'
import Wrapper from '../components/wrapper'

function Page({ page }) {
  const router = useRouter()

  if (router.isFallback) return <div>Loading</div>

  if (!page) return <div> Not found</div>

  return <Wrapper {...page} />
}

export async function getStaticProps({ locale, params }) {
  const { page } = await graphcmsClient.request(pageQuery, {
    locale,
    slug: params.slug
  })

  return {
    props: {
      page: page ? await parsePageData(page) : null
    },
    revalidate: 3
  }
}

export async function getStaticPaths({ locales }) {
  let paths = []

  const { pages } = await graphcmsClient.request(gql`
    {
      pages(where: { slug_not_in: ["home", "blog"] }) {
        slug
      }
    }
  `)

  for (const locale of locales) {
    paths = [
      ...paths,
      ...pages.map((page) => ({ params: { slug: page.slug }, locale }))
    ]
  }

  return {
    paths,
    fallback: true
  }
}

Page.getLayout = getPageLayout

export default Page
