import coinGeckoApi from "../apis/coinGeckoApi";
import localHost from "../apis/localHost";
import backendApi from "../apis/backendApi";
//Actions
//Asynchronous Action Creator to retrieve market data from api
export const getMarket = () => {
  return async (dispatch) => {
    const response = await coinGeckoApi.get("/");
    dispatch({ type: "FETCH_MARKET", payload: response.data });
  };
};

export const modalInfo = () => {
  return async (dispatch) => {
    const response = await localHost.get("/modalInfo");
    dispatch({ type: "MODAL_INFO", payload: response.data });
  };
};

export const coinSelect = (coin) => {
  return {
    type: "COIN_SELECTED",
    payload: coin,
  };
};

//<-----> BEGINNING OF ACTION CREATORS FOR FAVORITE <----->
export const addFavorite = (coin) => {
  return {
    type: "ADD_FAVORITE",
    payload: coin,
  };
};

export const addFavorites = (coins) => {
  return {
    type: "ADD_FAVORITES",
    payload: coins,
  };
};

export const deleteFavorite = (id) => (dispatch) => {
  localHost
    .delete(`/favorites/${id}`)
    .then((response) => {
      console.log(response);
    })
    .then((fav) =>
      dispatch({
        type: "DELETE_FAVORITE",
        payload: id,
      })
    );
};

export const getFavorites = () => {
  return async (dispatch) => {
    await localHost
      .get("/favorites")
      .then((response) => {
        if (response) {
          return response.data;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      })
      .then((favorites) => dispatch(addFavorites(favorites)));
  };
};

export const postFavorite = (coin) => {
  return (dispatch) => {
    localHost
      .post("/favorites", {
        coin: coin,
      })
      .then((response) => {
        if (response) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      })
      .then((response) => dispatch(addFavorite(response.data)))
      .catch((error) => {
        console.log("postFavorite", error.message);
      });
  };
};

//<-----> END OF ACTION CREATORS FOR FAVORITE <----->

//<-----> BEGINNING OF ACTION CREATORS FOR TRANSACTIONS <----->

export const postTransaction = (trans) => {
  return (dispatch) => {
    localHost
      .post("/transactions", {
        trans: trans,
      })
      .then((response) => {
        if (response) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      })
      .then((response) => dispatch(addTransaction(response)))
      .catch((error) => {
        console.log("postTransaction", error.message);
      });
  };
};
export const getTransactions = () => {
  return async (dispatch) => {
    await localHost
      .get("/transactions")
      .then((response) => {
        if (response) {
          return response.data;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      })
      .then((transactions) =>
        dispatch(
          addTransactions(transactions),
          dispatch(createPortList(transactions))
        )
      );
  };
};

export const addTransactions = (trans) => {
  return {
    type: "ADD_TRANSACTIONS",
    payload: trans,
  };
};
export const addTransaction = (trans) => {
  return {
    type: "ADD_TRANSACTION",
    payload: trans,
  };
};

//<-----> END OF ACTION CREATORS FOR TRANSACTION <----->

//<-----> BEGINNING OF ACTION CREATORS FOR PORT LIST <----->

export const createPortList = (transList) => {
  console.log(transList);
  return {
    type: "CREATE_PORTLIST",
    payload: transList,
  };
};
//<-----> END OF ACTION CREATORS FOR PORT LIST <----->

export const register = (formValues) => {
  const json = JSON.stringify({
    email: formValues.email,
    name: formValues.username,
    password: formValues.password,
    password_confirmation: formValues.confirmPassword,
    skill: formValues.skill,
  });

  return (dispatch) => {
    backendApi
      .post("/signup", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          console.log(error, "error");
          console.log(error, "error");
          error.response = JSON.stringify(response);
        }
      })
      .then((response) => dispatch(registered(response)))
      .catch((error) => {
        dispatch(registered(error.response));
      });
  };
};

export const registered = (res) => {
  return {
    type: "REG_RESPONSE",
    payload: res,
  };
};

export const login = (formValues) => {
  const json = JSON.stringify({
    name: formValues.username,
    password: formValues.password,
  });
  return (dispatch) => {
    backendApi
      .post("/signin", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          console.log(error, "error");
          console.log(error, "error");
          error.response = JSON.stringify(response);
        }
      })
      .then((response) => dispatch(loggedin(response)))
      .catch((error) => {
        dispatch(loggedin(error.response));
      });
  };
};

export const loggedin = (res) => {
  return {
    type: "LOG_RESPONSE",
    payload: res,
  };
};
