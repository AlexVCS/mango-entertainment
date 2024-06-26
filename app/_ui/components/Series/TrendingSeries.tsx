import { trpc } from '@/lib/server/trpc'
import { type RouterOutputs } from '@/app/api/trpc/trpc-router'
import { type FC } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from '@/components/ui/arrowbuttons'
import SkeletonTrending from '@/app/_ui/components/SkeletonTrending'
import SelectionCard from '@/app/_ui/components/SelectionCard'

type TrendingSectionProps = {
  bookmarks: RouterOutputs['bookmarks']['getBookmarkedSeries'] | undefined
}

const TrendingSeries: FC<TrendingSectionProps> = ({ bookmarks }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: false,
    align: 'start',
  })
  const { data, isLoading } = trpc.tmdb.getTrendingSeries.useQuery()

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  if (isLoading) {
    return (
      <div className="ml-4 text-entertainment-pure-white">
        <h1 className="mb-4 text-xl font-light md:mb-6 md:text-3xl">
          Trending Series
        </h1>
        <SkeletonTrending />
      </div>
    )
  }
  if (data && data?.length < 1) {
    return (
      <div className="ml-4 text-entertainment-pure-white">
        <h1 className="mb-4 text-xl font-light md:mb-6 md:text-3xl">
          Trending Series
        </h1>
        <p className="text-center font-light opacity-75 lg:text-xl">
          No results found
        </p>
      </div>
    )
  }
  return (
    <div className="ml-4 text-entertainment-pure-white">
      <h1 className="mb-4 text-xl font-light md:mb-6 md:text-3xl">
        Trending Series
      </h1>
      <section>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="mb-2 flex w-max touch-pan-y gap-4 md:gap-6">
            {data
              ? data.map((selection) => {
                const bookmarked = bookmarks?.data.filter(
                  (bookmark) => bookmark.selection_id === selection.selection_id,
                )[0] ?? { bookmarked: false }
                  return (
                    <SelectionCard
                      key={selection.selection_id}
                      selection_id={selection.selection_id}
                      selection_title={selection.selection_title}
                      selection_poster_path={selection.selection_poster_path}
                      selection_year={selection.selection_year}
                      bookmarked={bookmarked.bookmarked}
                      selection_type="TV Series"
                    />
                  )
                })
              : null}
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-end">
          <div className="grid w-24 grid-cols-2 gap-1 md:mr-4">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
export default TrendingSeries
