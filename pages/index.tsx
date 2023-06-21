import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Layout from '../components/layout';
import { getAllPosts } from '../lib/posts';
import Head from 'next/head';
import { BLOG_NAME } from '../lib/constants';
import Post from '../interfaces/post';

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout>
        <Head>
          <title>{`${BLOG_NAME}`}</title>
        </Head>
        <Container>
          {/* intro */}
          <section className=" mb-16 mt-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
            <h1 className="text-5xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
              {BLOG_NAME}
            </h1>
            <h4 className="mt-5 text-center text-lg md:pl-8 md:text-left">
              Making the thing I wish I had found.
            </h4>
          </section>

          <hr className="mb-1 mt-1 border-neutral-200 md:mb-24 md:mt-24" />

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

          <hr className="mb-6 mt-1 border-neutral-200 md:mb-24 md:mt-24" />

          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          {/* projects */}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: { allPosts },
  };
};
