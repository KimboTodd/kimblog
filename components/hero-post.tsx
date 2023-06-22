import Avatar from './avatar';
import DateFormatter from './date-formatter';
import Link from 'next/link';
import type Author from '../interfaces/author';
import Image from 'next/image';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        {coverImage && (
          <div className="relative h-[32rem] overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-lg sm:mx-0">
            <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
              <Image
                src={coverImage}
                className="w-full"
                alt={`Cover Image for ${title}`}
                fill={true}
                style={{ objectFit: 'cover' }}
                sizes="66vw"
              />
            </Link>
          </div>
        )}
      </div>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-5xl">
            <Link
              as={`/posts/${slug}`}
              href="/posts/[slug]"
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  );
};

export default HeroPost;
