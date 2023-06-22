import DateFormatter from './date-formatter';
import Image from 'next/image';
import Link from 'next/link';
import type Author from '../interfaces/author';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const PostPreview = ({ title, coverImage, date, excerpt, slug }: Props) => {
  return (
    <div>
      <div className="mb-5">
        <div className="relative h-96 overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-lg sm:mx-0">
          <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
            <Image
              src={coverImage}
              className="w-full"
              alt={`Cover Image for ${title}`}
              fill={true}
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        </div>
      </div>
      <h3 className="mb-1 md:mb-3 text-3xl leading-snug">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="mb-1 md:mb-4 text-lg">
        <DateFormatter dateString={date} />
      </div>
      <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
    </div>
  );
};

export default PostPreview;
