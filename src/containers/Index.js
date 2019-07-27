import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { getNews, register, login, logout } from "../actions";

const Index = ({
  children,
  updateView,
  loginIUser,
  registerUser,
  users,
  loginOut
}) => {
  return (
    <div>
      <Header
        updateView={updateView}
        registerUser={registerUser}
        loginIUser={loginIUser}
        users={users}
        loginOut={loginOut}
      />
      {children}
    </div>
  );
};

const mapDispatchToProp = dispatch => {
  return {
    updateView: e => {
      const type = e.target.href
        .split("/")
        .slice(-1)[0]
        .toUpperCase();
      dispatch(getNews(type.toUpperCase()));
    },
    registerUser: data => {
      dispatch(register(data));
    },
    loginIUser: data => {
      dispatch(login(data));
    },
    loginOut: data => {
      dispatch(logout(data));
    }
  };
};
const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(Index);
