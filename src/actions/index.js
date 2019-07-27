import {
  GET_NEWS_URL,
  GET_COMMMENTS_URL,
  GET_SIGNUP_URL,
  GET_LOGIN_URL,
  GET_COMMMENTS_EDIT_URL
} from "../constants";
import ls from "local-storage";
export const REQUEST_ITEM_LIST = "REQUEST_ITEM_LIST";

export const RECEIVE_NEWS = "RECEIVE_NEWS";
export const RECEIVE_NEWEST = "RECEIVE_NEWEST";

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const LOADING = "LOADING";

//type constants
export const NEWEST = "NEWEST";
export const NEWS = "NEWS";
export const TOKEN = "TOKEN";

function getApiUrlByItemType(type) {
  switch (type) {
    case NEWEST:
      return "newstories";
    case NEWS:
    default:
      return "topstories";
  }
}

function getReceiveTypeByItemType(type) {
  return RECEIVE_NEWS;
}

export const requestItemList = () => {
  return {
    type: REQUEST_ITEM_LIST
  };
};
export const isLoading = loading => {
  return {
    type: LOADING,
    loading
  };
};
export const receiveStories = (items, type) => {
  console.log("items---items", items);
  return {
    type: getReceiveTypeByItemType(type),
    items,
    receiveDate: Date.now()
  };
};

export const getNews = type => dispatch => {
  dispatch(requestItemList());
  return fetch(GET_NEWS_URL)
    .then(r => r.json())
    .then(results => {
      console.log(results);
      dispatch(receiveStories(results, type));
    });
};

export const receiveComments = comments => {
  console.log("comment-----", comments);
  return {
    type: RECEIVE_COMMENTS,
    comments: comments
  };
};

export const getComments = id => dispatch => {
  return fetch(`${GET_NEWS_URL}/${id}`)
    .then(r => r.json())
    .then(results => {
      console.log(results);
      dispatch(receiveComments(results));
    });
};

export const addReplies = data => dispatch => {
  console.log("AAAAAA---AAAAA", data);
  const { reply, replyTo, newsId, users } = data.data;
  console.log("--users--", users, data);
  const request = new Request(`${GET_COMMMENTS_URL}/${replyTo}`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: ls.get("token")
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify({
      objectId: replyTo,
      comments: reply,
      newsId,
      users: users.username
    })
  });
  dispatch(isLoading(true));
  return fetch(request).then(results => {
    dispatch(getComments(newsId));
    dispatch(isLoading(false));
  });
};

export const editReplies = data => dispatch => {
  console.log("AAAAAA---AAAAA", data);
  const { editReply, replyTo, users, newsId } = data.data;
  console.log("--users--", users, data);
  const request = new Request(`${GET_COMMMENTS_EDIT_URL}/${replyTo}`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: ls.get("token")
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify({
      objectId: replyTo,
      comments: editReply,
      users: users.username
    })
  });
  dispatch(isLoading(true));
  return fetch(request).then(results => {
    dispatch(getComments(newsId));
    dispatch(isLoading(false));
  });
};

export const postNews = data => dispatch => {
  debugger;
  console.log("AAAAAA---AAAAA", data);
  const { title, links, users } = data.data;
  console.log("--users--", data.users, data);
  const request = new Request(GET_NEWS_URL, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: ls.get("token")
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify({ title, links, users: users })
  });
  dispatch(isLoading(true));
  return fetch(request).then(results => {
    dispatch(getNews());
    dispatch(isLoading(false));
  });
};
export const setToken = token => {
  return {
    type: TOKEN,
    token
  };
};
export const register = data => dispatch => {
  console.log("AAAAAA---AAAAA", data);
  const { username, password } = data;
  const request = new Request(GET_SIGNUP_URL, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify({ username, password })
  });
  dispatch(isLoading(true));
  return fetch(request)
    .then(rt => rt.json())
    .then(results => {
      console.log("--results--", results);
      if (results.error) {
        alert(results.error);
        return;
      }
      ls.set("token", username);
      dispatch(setToken(username));
      alert("Your account created and you are logged in !");
      dispatch(isLoading(false));
    });
};

export const login = data => dispatch => {
  console.log("AAAAAA---AAAAA", data);
  const { username, password } = data;
  const request = new Request(GET_LOGIN_URL, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify({ username, password })
  });
  dispatch(isLoading(true));
  return fetch(request)
    .then(rt => rt.json())
    .then(results => {
      console.log("--results--", results);
      if (results.error) {
        alert(results.error);
        return;
      }
      ls.set("token", username);
      dispatch(setToken(username));
      alert("You are logged in !");
      dispatch(isLoading(false));
    });
};

export const logout = () => dispatch => {
  ls.set("token", "anonymous");
  return dispatch(setToken("anonymous"));
};
