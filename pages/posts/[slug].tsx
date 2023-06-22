import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import Layout from '../../components/layout';
import { getPostBySlug, getAllPosts } from '../../lib/posts';
import Head from 'next/head';
import type PostType from '../../interfaces/post';
import Link from 'next/link';
import Avatar from '../../components/avatar';
import DateFormatter from '../../components/date-formatter';
import Chatbot from '../../components/chatbot';
import Markdown from 'markdown-to-jsx';
import Image from 'next/image';

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter();
  const title = `${post.title}`;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <h2 className="mb-9 mt-5 text-2xl font-bold leading-tight tracking-tight md:mb-20 md:mt-8 md:text-4xl md:tracking-tighter">
          <Link href="/" className="hover:underline">
            kimblog
          </Link>
        </h2>{' '}
        {router.isFallback ? (
          <h1 className="mb-12 text-center text-5xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
            Loading…
          </h1>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{title}</title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>

              {/* header */}
              <div className="mx-auto max-w-6xl">
                <h1 className="mb-12 text-center text-5xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
                  {title}
                </h1>
                <div className="mb-6 block">
                  <Avatar
                    name={post.author.name}
                    picture={post.author.picture}
                  />
                </div>
                <div className="mb-2 text-lg md:mb-6">
                  <DateFormatter dateString={post.date} />
                </div>
                {post.coverImage ? (
                  <div className="relative mb-8 h-96 overflow-hidden sm:mx-0 md:mb-16 shadow-lg">
                    <Image
                      src={post.coverImage}
                      className="w-full "
                      alt={`Cover Image for ${title}`}
                      fill={true}
                      style={{ objectFit: 'cover' }}
                      sizes="66vw"
                    />
                  </div>
                ) : (
                  <hr></hr>
                )}
              </div>

              {/* body */}
              <div className="mx-auto max-w-3xl">
                <div className="prose lg:prose-xl">
                  <Markdown
                    // eslint-disable-next-line react/no-children-prop
                    children={post.content}
                    options={{
                      overrides: {
                        Chatbot: {
                          component: () => <Chatbot />,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);

  return {
    props: {
      post: {
        ...post,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
