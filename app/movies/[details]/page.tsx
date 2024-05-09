'use client'

import { trpc } from '@/lib/server/trpc'
import Image from 'next/image'
import { type RouterOutputs } from '@/app/api/trpc/trpc-router'
import { type FC } from 'react'

type MovieDetailsContentProps = {
  movieDetails: RouterOutputs['tmdb']['getMovieDetails']
}

const movieDetailsPage = ({ params }: { params: { details: string } }) => {
  const movie_id = parseInt(params.details)
  const { data, isLoading } = trpc.tmdb.getMovieDetails.useQuery({ movie_id })

  if(isLoading) {<div>is loading</div>}
  if(!data) return
  return (
    <>
      {data.backdrop_path ? (
        <div
          className="mt-2 bg-cover p-2 md:p-8 md:mt-4 lg:mt-12"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.backdrop_path}})`,
          }}
        >
          <div className="flex flex-col md:flex-row md:aspect-video mx-2 md:mx-4 bg-entertainment-greyish-blue bg-opacity-80">
            <MoviePoster movieDetails={data} />
            <MovieDetailContent movieDetails={data} />
          </div>
        </div>
      ) : (
        <div className="mt-2 aspect-video w-full bg-black bg-cover p-8 md:mt-4 lg:mt-12">
          <div className="flex flex-col md:flex-row bg-entertainment-greyish-blue min-h-full h-auto bg-opacity-80">
            <MoviePoster movieDetails={data} />
            <MovieDetailContent movieDetails={data} />
          </div>
        </div>
      )}
    </>
  )
}

const MovieDetailContent: FC<MovieDetailsContentProps> = ({ movieDetails }) => {
  return (
    <div className="mx-4 mb-4 md:mt-4 md:ml-0">
      <h1 className="text-4xl mb-2">{movieDetails?.title}</h1>
      <p className="text-2xl italic">{movieDetails?.tagline}</p>
      <div className="flex gap-4 my-3">
        <p>{movieDetails.release_date}</p>
        <p>{movieDetails?.origin_country}</p>
        <p>{movieDetails?.runtime} min</p>
      </div>
      <p className='text-xl'>{movieDetails?.overview}</p>
    </div>
  )
}

const MoviePoster: FC<MovieDetailsContentProps> = ({movieDetails}) => {
  return movieDetails.poster_path ? (
      <Image
        className="self-center md:scale-100 md:m-4 h-auto scale-90 rounded-lg"
        src={`https://image.tmdb.org/t/p/original${movieDetails?.poster_path}`}
        width={400}
        height={250}
        alt={`${movieDetails.title} poster`}
      />
  ) : (
    <div className="m-4 flex aspect-[9/16] items-center justify-center rounded-lg bg-entertainment-pure-white p-4 text-center text-xl text-entertainment-greyish-blue md:text-2xl">
      {movieDetails.title ?? 'No image available'}
    </div>
  )
}

export default movieDetailsPage
