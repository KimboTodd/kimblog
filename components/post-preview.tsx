import Image from 'next/image'
import Link from 'next/link'
import type Author from '../interfaces/author'
import DateFormatter from './date-formatter'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
}

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
      <h3 className="mb-1 text-3xl leading-snug md:mb-3">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="mb-1 text-lg md:mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
    </div>
  )
}

export default PostPreview
