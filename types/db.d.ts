import type {
  User,
  Selection,
  TrendingThumb,
  RegularThumb,
} from '@prisma/client'

export type SelectionWithRegularThumbs = Selection & {
  RegularThumb: RegularThumb
}

export type SelectionWithTrendingThumbs = Selection & {
  TrendingThumb: TrendingThumb
}
