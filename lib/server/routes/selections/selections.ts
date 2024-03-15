import { z } from 'zod'
import { t } from '@/lib/server/trpc-server'
import prisma from '@/prisma/prisma.db'


export const selectionRouter = t.router({
  getRecommended: t.procedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const selections = await prisma.selection.findMany({
        where: {
          title: {
            mode: 'insensitive',
            contains: input.search,
          },
          is_trending: false,
        },
        include: {
          RegularThumb: true,
        },
      })
      return {
        status: 'success',
        results: selections.length,
        data: selections,
      }
    }),

  getTrending: t.procedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const selections = await prisma.selection.findMany({
        where: {
          title: {
            mode: 'insensitive',
            contains: input.search,
          },
          is_trending: true,
        },
        include: {
          TrendingThumb: true,
        },
      })
      return {
        status: 'success',
        results: selections.length,
        data: selections,
      }
    }),

  getMovies: t.procedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const selections = await prisma.selection.findMany({
        where: {
          title: {
            mode: 'insensitive',
            contains: input.search,
          },
          category: 'Movie',
        },
        include: {
          RegularThumb: true,
        },
      })
      return {
        status: 'success',
        results: selections.length,
        data: selections,
      }
    }),
  getSeries: t.procedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const selections = await prisma.selection.findMany({
        where: {
          title: {
            mode: 'insensitive',
            contains: input.search,
          },
          category: 'TV Series',
        },
        include: {
          RegularThumb: true,
        },
      })
      return {
        status: 'success',
        results: selections.length,
        data: selections,
      }
    }),
  getBookmarkedMovies: t.procedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const selections = await prisma.selection.findMany({
        where: {
          title: {
            mode: 'insensitive',
            contains: input.search,
          },
          category: 'Movie',
          is_bookmarked: true,
        },
        include: {
          RegularThumb: true,
        },
      })
      return {
        status: 'success',
        results: selections.length,
        data: selections,
      }
    }),
  getBookmarkedSeries: t.procedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const selections = await prisma.selection.findMany({
        where: {
          title: {
            mode: 'insensitive',
            contains: input.search,
          },
          category: 'TV Series',
          is_bookmarked: true,
        },
        include: {
          RegularThumb: true,
        },
      })
      return {
        status: 'success',
        results: selections.length,
        data: selections,
      }
    }),
})
