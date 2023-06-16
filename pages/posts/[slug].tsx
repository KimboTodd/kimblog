import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/posts";
import Head from "next/head";
import type PostType from "../../interfaces/post";
import Link from "next/link";
import markdownStyles from "../../components/markdown-styles.module.css";
import Avatar from "../../components/avatar";
import CoverImage from "../../components/cover-image";
import DateFormatter from "../../components/date-formatter";
import Chatbot from "../../components/chatbot";
import Markdown from "markdown-to-jsx";

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
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
          <Link href="/" className="hover:underline">
            kimblog
          </Link>
        </h2>{" "}
        {router.isFallback ? (
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
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
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
                {title}
              </h1>
              <div className="hidden md:block md:mb-12">
                <Avatar name={post.author.name} picture={post.author.picture} />
              </div>
              {post.coverImage && (
                <div className="mb-8 md:mb-16 sm:mx-0">
                  <CoverImage title={title} src={post.coverImage} />
                </div>
              )}
              <div className="max-w-2xl mx-auto">
                <div className="block md:hidden mb-6">
                  <Avatar
                    name={post.author.name}
                    picture={post.author.picture}
                  />
                </div>
                <div className="mb-6 text-lg">
                  <DateFormatter dateString={post.date} />
                </div>
              </div>

              {/* body */}
              <div className="max-w-2xl mx-auto">
                <div className={markdownStyles["markdown"]}>
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
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
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
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
