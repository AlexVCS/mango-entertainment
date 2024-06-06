'use client'

import { trpc } from '@/lib/server/trpc'
import Search from '@/app/_ui/components/Search'
import { type ChangeEvent, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import SkeletonSectionComponent from '@/app/_ui/components/SkeletonSectionComponent'
import MovieSectionComponent from '../components/Movies/MovieSectionComponent'
import SeriesSectionComponent from '../components/Series/SeriesSectionComponent'

const Bookmarks = () => {
  const [search, setSearch] = useState('')

  const { user } = useUser()

  const movieBookmarks = trpc.bookmarks.getBookmarks.useQuery({
    search: search,
    user_id: user?.id ?? '',
    selection_type: 'Movie',
  })

  const seriesBookmarks = trpc.bookmarks.getBookmarks.useQuery({
    search: search,
    user_id: user?.id ?? '',
    selection_type: 'TV Series',
  })

  const bookmarkedSeries = trpc.bookmarks.getBookmarkedSeries.useQuery({
    search: search,
    user_id: user?.id ?? '',
  })
  const bookmarkedMovies = trpc.bookmarks.getBookmarkedMovies.useQuery({
    search: search,
    user_id: user?.id ?? '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  return (
    <div className="text-entertainment-greyish-blue">
      <Search search={search} handleChange={handleChange} />
      {bookmarkedMovies.isLoading ? (
        <SkeletonSectionComponent section="Movies" />
      ) : (
        <MovieSectionComponent
          section="Movies"
          data={bookmarkedMovies.data}
          bookmarks={movieBookmarks.data}
        />
      )}
      {bookmarkedSeries.isLoading ? (
        <SkeletonSectionComponent section="TV Series" />
      ) : (
        <SeriesSectionComponent
          section="TV Series"
          data={bookmarkedSeries.data}
          bookmarks={seriesBookmarks.data}
        />
      )}
    </div>
  )
}

export default Bookmarks
