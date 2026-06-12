import Container from '../components/container';
import HeroPost from '../components/hero-post';
import Layout from '../components/layout';
import { getAllPosts } from '../lib/posts';
import Head from 'next/head';
import { BLOG_NAME } from '../lib/constants';
import Post from '../interfaces/post';
import PostPreview from '../components/post-preview';

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
          <section className="mt-16 mb-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
            <h1 className="text-5xl leading-tight font-bold tracking-tighter md:pr-8 md:text-8xl">
              {BLOG_NAME}
            </h1>
            <h4 className="mt-5 text-center text-lg md:pl-8 md:text-left">
              Making the thing I wish I had found.
            </h4>
          </section>

          <hr className="mt-1 mb-1 border-neutral-200 md:mt-24 md:mb-24" />

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

          <hr className="mt-1 mb-6 border-neutral-200 md:mt-24 md:mb-24" />

          {morePosts.length > 0 && (
            <section>
              <h2 className="mb-8 text-5xl leading-tight font-bold tracking-tighter md:text-7xl">
                More Stories
              </h2>
              <div className="mb-32 grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
                {morePosts.map(post => (
                  <PostPreview
                    key={post.slug}
                    title={post.title}
                    coverImage={post.coverImage}
                    date={post.date}
                    author={post.author}
                    slug={post.slug}
                    excerpt={post.excerpt}
                  />
                ))}
              </div>
            </section>
          )}
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
