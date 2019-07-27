import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const NewsItem = ({item, rank}) => {

  const getHackerNewsCommentComment = () => {
    let commentText = 'discuss'
    if (item.kids) {
      commentText = item.kidsLength || item.kids.length + ' comments'
    }
    return (
      <Link to={`/comment/${item.id}`}>{commentText}</Link>
      )
  }

  const getHackerNewsCommentSubtext = () => {
    return (
      <div className="hacker-hacker-news-item_subtext">
        5 points by <Link to='/'>{item.by}</Link> | {getHackerNewsCommentComment()}
      </div>
    )
  }

  const getHackerNewsCommentTitle = () => {
    return (
      <div>
        <a className="hacker-news-item_title-link" href={item.url} target="_blank">
          {item.title}
        </a>
        
      </div>
    )
  }

  const getHackerNewsCommentVote = () => {
    return (
      <div className="hacker-news-item_vote">
        <a href="#">
          <span className="gray-arrow"></span>
        </a>
      </div>
    )
  }

  return (
    <div className="hacker-news-item">
      {getHackerNewsCommentVote()}
      <div className="hacker-news-item_text">
        {getHackerNewsCommentTitle()}
        {getHackerNewsCommentSubtext()}
      </div>
    </div>
    )
}

NewsItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    score: PropTypes.number,
    by: PropTypes.string,
    kids: PropTypes.array
  })
} 

export default NewsItem