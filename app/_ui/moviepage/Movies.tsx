'use client'

import { trpc } from '@/lib/server/trpc'
import Search from '@/app/_ui/components/Search'
import MovieSectionComponent from '@/app/_ui/components/Movies/MovieSectionComponent'
import { type ChangeEvent, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import SkeletonSectionComponent from '@/app/_ui/components/SkeletonSectionComponent'

const Movies = () => {
  const [search, setSearch] = useState('')
  const { user } = useUser()
  const bookmarks = trpc.bookmarks.getBookmarks.useQuery({
    search: search,
    user_id: user?.id ?? '',
    selection_type: 'Movie',
  })

  const { data, isLoading } = trpc.tmdb.getMovies.useQuery({ search })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  if (isLoading)
    return (
      <div className="text-entertainment-greyish-blue">
        <Search search={search} handleChange={handleChange} />
        <SkeletonSectionComponent section="Recommended" />
      </div>
    )
    if (data && data?.results < 1) {
      <div className="text-entertainment-greyish-blue">
      <Search search={search} handleChange={handleChange} />
      <div className="ml-4 text-entertainment-pure-white">
        <h1 className="mb-4 text-xl font-light md:mb-6 md:text-3xl">
          Movies
        </h1>
        <p className="text-center font-light opacity-75 lg:text-xl">
          No results found
        </p>
      </div>
      </div>
    }
  return (
    <div className="text-entertainment-greyish-blue">
      <Search search={search} handleChange={handleChange} />
        <MovieSectionComponent
          section="Movies"
          sectionData={data}
          bookmarks={bookmarks?.data}
        />
    </div>
  )

}

export default Movies
