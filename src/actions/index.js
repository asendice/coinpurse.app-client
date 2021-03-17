import coinGeckoApi from "../apis/coinGeckoApi";
import localHost from "../apis/localHost";
//Actions
//Asynchronous Action Creator to retrieve market data from api
export const getMarket = () => {
  return async (dispatch) => {
    const response = await coinGeckoApi.get("/");
    dispatch({ type: "FETCH_MARKET", payload: response.data });
  };
};

export const coinSelect = (coin) => {
  return {
    type: "COIN_SELECTED",
    payload: coin,
  };
};

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

export const getFavorites = () => {
  return async (dispatch) => {
    const response = await localHost
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
  const favorite = {
    name: coin.name,
    image: coin.image,
    price: coin.current_price,
    pricePercent: coin.price_change_percentage_24h,
  };
  return (dispatch) => {
    localHost
      .post("/favorites", {
        coin: favorite,
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
      .then((response) => dispatch(addFavorite(response)))
      .catch((error) => {
        console.log("postFavorite", error.message);
      });
  };
};

export const modalInfo = () => {
  return async (dispatch) => {
    const response = await localHost.get("/modalInfo");
    dispatch({ type: "MODAL_INFO", payload: response.data });
  };
};
