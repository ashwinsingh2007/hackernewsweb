import React, { Component } from "react";
import { Link } from "react-router";
import Modal from "react-modal";
import ls from "local-storage";
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

class Header extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      username: "",
      password: ""
    };
    this.loginIUser = this.loginIUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.username = this.username.bind(this);
    this.password = this.password.bind(this);
    this.logout = this.logout.bind(this);
  }
  logout() {
    this.props.loginOut();
  }
  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, reply: "", replyTo: null });
  }

  registerUser() {
    const { username, password } = this.state;
    if (username && password) {
      this.props.registerUser({ username, password });
      this.closeModal();
    } else {
      alert(`Username or Password can't be empty !`);
    }
  }

  loginIUser() {
    const { username, password } = this.state;
    this.props.loginIUser({ username, password });
    this.closeModal();
  }

  username(e) {
    this.setState({ username: e.target.value });
  }
  password(e) {
    this.setState({ password: e.target.value });
  }
  render() {
    const { users } = this.props;
    console.log("user----", users);
    return (
      <div className="hacker-news_header">
        <div className="hacker-news_title">
          <div className="hacker-news-header-bar">
            <Link to="/"> Hacker News Challenge</Link>
          </div>
          {users.username !== "anonymous" ? (
            <button onClick={this.logout}>Logout</button>
          ) : (
            <button onClick={this.openModal}>Register/Login</button>
          )}
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Reply to this thread"
          >
            <div className="modal-comment-container">
              <h3>Create a new post</h3>
              <div>
                <label>Username</label>
                <input value={this.state.username} onChange={this.username} />
                <br />
                <br />
                <label>Password </label>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.password}
                />
              </div>
              <div className="flex-button">
                <button onClick={this.registerUser}>Register</button>
                <button onClick={this.loginIUser}>Login</button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Header;
