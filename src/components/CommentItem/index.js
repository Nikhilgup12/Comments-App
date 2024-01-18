import './index.css'

const CommentItem = props => {
  const {commentsDetails, toggleIsLike, deleteBtn} = props
  const {name, comment, isLiked, id, date, initialClassname} = commentsDetails
  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onLikeImage = () => {
    toggleIsLike(id)
  }
  const onDeletebtn = () => {
    deleteBtn(id)
  }

  const letter = name.slice(0, 1)
  return (
    <li className="list">
      <div className="comment-list-container">
        <div className={`comment-letter ${initialClassname}`}>
          <h1 className="comment-first-letter"> {letter} </h1>
        </div>
        <div>
          <div className="name-time-container">
            <div>
              <h1 className="comment-name"> {name} </h1>
              <p className="comment-discription"> {comment} </p>
            </div>
            <p className="date-style"> {date} </p>
          </div>
        </div>
      </div>
      <div className="like-container">
        <div className="like-image-container">
          <img src={likeImage} className="like-icon" alt="like" />
          <button className="btn" onClick={onLikeImage} type="button">
            Like
          </button>
        </div>

        <button
          className="btn"
          onClick={onDeletebtn}
          data-testid="delete"
          type="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-icon"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
