import {Component} from 'react'
import './index.css'

import {v4 as uuidv4} from 'uuid'

import {formatDistanceToNow} from 'date-fns'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentList = []

class Comments extends Component {
  state = {
    commentsList: initialCommentList,
    name: '',
    comment: '',
    count: 0,
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onTextName = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const containerColor =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
      initialClassname: containerColor,
      date: formatDistanceToNow(new Date()),
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      count: prevState.count + 1,
      name: ' ',
      comment: ' ',
    }))
  }

  toggleIsLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {
            ...eachComment,
            isLiked: !eachComment.isLiked,
          }
        }
        return eachComment
      }),
    }))
  }

  deleteBtn = id => {
    const {commentsList} = this.state
    const filterComment = commentsList.filter(each => each.id !== id)
    this.setState({
      commentsList: filterComment,
    })
    this.setState(prevState => ({
      count: prevState.count - 1,
    }))
  }

  render() {
    const {count, commentsList} = this.state
    return (
      <div className="Comments-main-container">
        <div className="Comments-card-container">
          <h1 className="Comments-heading"> Comments </h1>
          <div className="comments-container">
            <div className="comments-inputSearch-container">
              <p className="comments-para">
                Say something about 4.0 technologies{' '}
              </p>
              <form onSubmit={this.onAddComment}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="inputSearch"
                  onChange={this.onChangeName}
                />
                <br />
                <textarea
                  rows="5"
                  cols="21"
                  placeholder="Your Comments"
                  className="textareaSearch"
                  onChange={this.onTextName}
                />
                <div>
                  <button type="submit" className="button">
                    Add Comment
                  </button>
                </div>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                className="image"
              />
            </div>
          </div>
          <p> {count} comments </p>
          <ul className="comment-list">
            {commentsList.map(eachComment => (
              <CommentItem
                commentsDetails={eachComment}
                key={eachComment.id}
                toggleIsLike={this.toggleIsLike}
                deleteBtn={this.deleteBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
