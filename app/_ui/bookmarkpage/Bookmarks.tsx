'use client'

import Search from '@/app/_ui/components/Search'
import SectionComponent from '@/app/_ui/components/SectionComponent'
import { ChangeEvent, useState } from 'react'


const Bookmarks = () => {
  const [search, setSearch] = useState('')
 
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
     setSearch(e.target.value)
   }

  return (
    <div className="text-entertainment-greyish-blue">
      <Search search={search} handleChange={handleChange} />
      <SectionComponent section="Movies" bookmarked={true} search={search} />
      <SectionComponent
        section="TV Series"
        bookmarked={true}
        search={search}
      />
    </div>
  )
}

export default Bookmarks