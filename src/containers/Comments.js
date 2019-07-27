import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "../components/Comment";
import Spinner from "../components//Spinner";
import { getComments, addReplies, editReplies } from "../actions";

class Comments extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    this.props.getComments(id);
  }

  render() {
    const { comments, addReply, loading, editReply } = this.props;
    console.log("lloadidididiidid", loading);
    return (
      <div>
        {loading ? (
          <div className="news-list">
            <Spinner />
          </div>
        ) : (
          <Comment
            comments={comments}
            addReply={addReply}
            editReply={editReply}
            users={this.props.users}
          />
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: id => {
      if (typeof id === "string") {
        dispatch(getComments(id));
      }
    },
    addReply: data => {
      dispatch(addReplies({ data }));
    },
    editReply: data => {
      dispatch(editReplies({ data }));
    }
  };
}

function mapStateToProps(state) {
  console.log("state--", state);
  return {
    comments: {
      ...state.comments,
      hidden: false
    },
    loading: state.newsList.loading,
    users: state.users
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
