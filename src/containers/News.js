import React, { Component } from "react";
import { connect } from "react-redux";
import NewsList from "../components/NewsList";
import { getNews, postNews } from "../actions";
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

class News extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      title: "",
      links: ""
    };
    this.enterLink = this.enterLink.bind(this);
    this.enterTitle = this.enterTitle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }
  enterTitle(e) {
    this.setState({ title: e.target.value });
  }
  enterLink(e) {
    this.setState({ links: e.target.value });
  }

  openModal() {
    this.setState({
      modalIsOpen: true,
      title: "",
      links: ""
    });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, title: "", links: null });
  }

  submitPost(users) {
    const { title, links } = this.state;
    if (title && links) {
      this.props.postHackerNews({ title, links, users });
      this.closeModal();
    } else {
      alert(`Title or Link can't be empty !`);
    }
  }
  componentDidMount() {
    const type = location.pathname.substring(1).toUpperCase();
    this.props.getHackerNews(type);
  }

  render() {
    const { items, isLoading, users } = this.props;
    return (
      <div>
        <div className="news-list-button">
          <button onClick={this.openModal}>Submit post</button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Reply to this thread"
        >
          <div className="modal-comment-container">
            <h3>Create a new post</h3>
            <div style={{ textAlign: "left" }}>
              <label>Enter Title : </label>
              <input value={this.state.title} onChange={this.enterTitle} />
              <br />
              <br />
              <label>Enter Url starting with http or https : </label>
              <input
                type="url"
                pattern="https?://.+"
                value={this.state.links}
                onChange={this.enterLink}
              />
            </div>
            <div className="flex-button">
              <button
                onClick={() => {
                  this.submitPost(users);
                }}
              >
                submit
              </button>
              <button onClick={this.closeModal}>close</button>
            </div>
          </div>
        </Modal>
        <NewsList items={items} isLoading={isLoading} />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.newsList.items,
    isLoading: state.newsList.isLoading,
    receiveDate: state.newsList.receiveDate,
    loading: state.newsList.loading,
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHackerNews: type => {
      if (typeof type === "string") dispatch(getNews(type.toUpperCase()));
    },
    postHackerNews: data => {
      dispatch(postNews({ data }));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
