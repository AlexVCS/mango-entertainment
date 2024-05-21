import { type RouterOutputs } from '@/app/api/trpc/trpc-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type FC } from 'react'
import { useUser } from '@clerk/nextjs'
import useBookmarks from '@/app/_hooks/useBookmarks'
import { cx } from 'class-variance-authority'
import { CardHeader } from '@/components/ui/card'
import SkeletonDetails from '@/app/_ui/components/SkeletonDetails'
import Image from 'next/image'

type MovieDetailsContentProps = {
  movieDetails: RouterOutputs['tmdb']['getMovieDetails']
  bookmarked: boolean
}

const MovieInfo: FC<MovieDetailsContentProps> = ({
  movieDetails,
  bookmarked,
}) => {
  return (
    <div
      className={cx(
        'relative mx-4 my-2 md:ml-0 md:mt-2 lg:w-full lg:place-content-stretch',
        // if there's no poster path, add margin top
        !movieDetails?.poster_path && 'mt-4',
      )}
    >
      <Tabs defaultValue="details">
        <div className="flex justify-center">
          <TabsList className=" mb-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="details">
          <MovieDetailContent
            bookmarked={bookmarked}
            movieDetails={movieDetails}
          />
        </TabsContent>
        <TabsContent
          className="h-max-full mb-20 flex flex-col flex-wrap overflow-y-hidden md:flex-row"
          value="videos"
        >
          {movieDetails?.videos.results.map((video) => {
            return (
              <div key={video.id} className="w-full md:w-1/2 lg:w-1/3 pb-3 md:p-1.5">
                <iframe
                  className="w-full aspect-video rounded-xl"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  allowFullScreen
                />
              </div>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}

const MovieDetailContent: FC<MovieDetailsContentProps> = ({
  movieDetails,
  bookmarked,
}) => {
  const { isSignedIn, user } = useUser()
  const toggleBookmark = useBookmarks()
  const bookmarkData = {
    id: movieDetails.id,
    adult: movieDetails.adult,
    backdrop_path: movieDetails.backdrop_path,
    genre_ids: movieDetails.genres.map((genre) => genre.id),
    original_language: movieDetails.original_language,
    original_title: movieDetails.original_title,
    overview: movieDetails.overview,
    popularity: movieDetails.popularity,
    poster_path: movieDetails.poster_path,
    release_date: movieDetails.release_date,
    title: movieDetails.title,
    video: movieDetails.video,
    videos: movieDetails.videos,
    vote_average: movieDetails.vote_average,
    vote_count: movieDetails.vote_count,
  }
  return (
    <div
    // className={cx(
    //   'relative mx-4 mb-2 md:ml-0 md:mt-2 lg:w-full lg:place-content-stretch',
    //   // if there's no poster path, add margin top
    //   !movieDetails?.poster_path && 'mt-4',
    // )}
    >
      <div className="mb-2 flex flex-row justify-between">
        <h1 className="w-11/12 text-3xl md:w-auto lg:text-4xl">
          {movieDetails?.title}
        </h1>
        {isSignedIn ? (
          <CardHeader
            className="relative right-0 top-0 mr-2 h-12 justify-end md:right-0 md:top-0 md:w-56"
            onClick={() =>
              toggleBookmark({
                selection_id: movieDetails.id,
                user_id: user?.id,
                selection_type: 'Movie',
                movie_data: bookmarkData,
              })
            }
          >
            {bookmarked ? (
              <Image
                src="/icon-bookmark-full.svg"
                height={32}
                width={32}
                alt="bookmark icon"
              />
            ) : (
              <Image
                src="/icon-bookmark-empty.svg"
                height={32}
                width={32}
                alt="bookmark icon"
              />
            )}
          </CardHeader>
        ) : (
          <div className="relative right-0 top-0 mr-2 h-12 justify-end md:right-0 md:top-0 md:w-56"></div>
        )}
      </div>
      <p className="text-xl italic md:text-2xl">{movieDetails?.tagline}</p>
      <div className="my-2 flex flex-wrap justify-between lg:my-3">
        <p>{movieDetails?.runtime} min</p>
        <p>
          {movieDetails?.genres.map((genre, index) =>
            index === 0 ? `${genre.name}` : `, ${genre.name}`,
          )}
        </p>
        <p>
          {movieDetails?.origin_country} {movieDetails.release_date.slice(0, 4)}
        </p>
      </div>
      <p className="text-clip text-lg lg:text-xl">
        {movieDetails?.overview
          ? movieDetails.overview
          : 'No description available'}
      </p>
    </div>
  )
}

export default MovieInfo
