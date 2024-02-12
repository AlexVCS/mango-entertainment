'use client'
import Image from "next/image"
import { useState } from "react";

const Search = () => {
  const [filterSearch, setFilterSearch] = useState('')

  // const searchBookmarks = () => {
  //   console.log(filterSearch)
  // }

  return (
    <div className="flex items-center my-2 ml-4 md:my-4 md:ml-6 lg:ml-0 lg:mt-12">
      <Image
        className="w-6 h-6 md:w-8 md:h-8"
        src="icon-search.svg"
        height={32}
        width={32}
        alt="search icon"
      />
      <input
        className="block w-full text-base font-light bg-transparent border-0 md:text-2xl text-entertainment-pure-white caret-entertainment-red focus:border-entertainment-pure-white"
        type="text"
        placeholder="Search for movies or TV series"
        value={filterSearch}
        onChange={(e) => setFilterSearch(e.target.value)}
      />
    </div>
  )
}

export default Search