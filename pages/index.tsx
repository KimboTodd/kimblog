import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/posts'
import Head from 'next/head'
import { BLOG_NAME } from '../lib/constants'
import Post from '../interfaces/post'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>{`${BLOG_NAME}`}</title>
        </Head>
        <Container>
          {/* intro */}
          <section className=" md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 flex-col">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
              {BLOG_NAME}
            </h1>
            <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
              Making the thing I wish I had found.
            </h4>
          </section>

          <hr className="border-neutral-200 mt-1 mb-1 md:mt-24 md:mb-24" />

          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}

          <hr className="border-neutral-200 mt-1 mb-6 md:mt-24 md:mb-24" />

          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          {/* projects */}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt'
  ])

  return {
    props: { allPosts }
  }
}
