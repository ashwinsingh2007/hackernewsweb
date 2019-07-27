import React from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

const NewsList = ({items, isLoading}) => {
  return (
    <div className="news-list">
      
      { isLoading && 
        <Spinner /> }
      {items.length > 0 && items.map( (item, index) => {
        return <NewsItem key={item.id} item={item} rank={index + 1} />
      })}
    </div>
  )
}

export default NewsList