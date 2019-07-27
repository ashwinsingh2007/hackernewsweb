import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { Link } from "react-router";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px"
  }
};

Modal.setAppElement("#root");

class Comment extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      reply: "",
      replyTo: null,
      newsId: null,
      editReply: null,
      editModalIsOpen: false
    };
    this.submitReply = this.submitReply.bind(this);
    this.changeReply = this.changeReply.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.openEditModal = this.openEditModal.bind(this);
  }

  openEditModal = ct => {
    console.log("------ct---", ct);
    this.setState({
      editModalIsOpen: true,
      editReply: ct.text,
      replyTo: ct.id,
      newsId: ct.parent
    });
  };

  closeEditModal = () => {
    this.setState({
      editModalIsOpen: false,
      editReply: null
    });
  };

  changeEditReply = e => {
    this.setState({ editReply: e.target.value });
  };

  submitEditReply = users => {
    const { editReply, replyTo, newsId } = this.state;
    if (editReply) {
      this.props.editReply({ replyTo, editReply, users, newsId });
      this.closeEditModal();
    } else {
      alert("Your comment text seems to be empty !");
    }
  };

  changeReply(e) {
    this.setState({ reply: e.target.value });
  }

  openModal(comment, isParent) {
    if (this.props.users.username === "anonymous") {
      alert("You should be logged in to comment here");
      return;
    }
    this.setState({
      modalIsOpen: true,
      replyTo: isParent ? null : comment.id,
      newsId: isParent ? comment.id : comment.parent
    });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, reply: "", replyTo: null });
  }

  submitReply(users) {
    const { reply, replyTo, newsId } = this.state;
    if (reply) {
      this.props.addReply({ replyTo, reply, newsId, users });
      this.closeModal();
    } else {
      alert("Your comment text seems to be empty !");
    }
  }

  onClick = () => {
    this.refs.child.style.display = "none";
  };

  getComment = comment => {
    const { users } = this.props;
    return (
      <div key={comment.id} className="comment">
        <div className="hacker-hacker-news-item_subtext">
          <Link to={`/`}>{comment.by}</Link>
          <span onClick={() => this.onClick(comment)}>+</span>
        </div>
        <div ref="child">
          <div
            className="comment-content"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
          <div className="flex">
            <button
              className="comment-button"
              onClick={() => {
                this.openModal(comment);
              }}
            >
              Reply
            </button>
            {users.username !== "anonymous" &&
              users.username === comment.username && (
                <button
                  onClick={() => {
                    this.openEditModal(comment);
                  }}
                  className="comment-button"
                >
                  Edit
                </button>
              )}
          </div>
          {comment.kids !== undefined &&
            comment.kids.map(kid => {
              return this.getComment(kid);
            })}
        </div>
      </div>
    );
  };

  render() {
    const { comments, users } = this.props;
    return (
      <div className="news-list">
        <NewsItem key={comments.id} item={comments} />
        <button
          className="comment-button"
          onClick={() => {
            this.openModal(comments, true);
          }}
        >
          Reply
        </button>
        <div className="comment-gap">
          {comments.kids.map(kid => {
            return this.getComment(kid);
          })}
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Reply to this thread"
        >
          <div className="modal-comment-container">
            <h3>Reply to this thread</h3>
            <textarea
              value={this.state.reply}
              onChange={this.changeReply}
              rows="9"
            />
            <div className="flex-button">
              <button onClick={() => this.submitReply(users)}>submit</button>
              <button onClick={this.closeModal}>close</button>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.editModalIsOpen}
          onRequestClose={this.closeEditModal}
          style={customStyles}
          contentLabel="Edit this comment"
        >
          <div className="modal-comment-container">
            <h3>Edit this comment</h3>
            <textarea
              value={this.state.editReply}
              onChange={this.changeEditReply}
            />
            <div className="flex-button">
              <button onClick={() => this.submitEditReply(users)}>
                submit
              </button>
              <button onClick={this.closeEditModal}>close</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Comment;
