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

export const modalInfo = () => {
  return async (dispatch) => {
    const response = await localHost.get("/modalInfo");
    dispatch({ type: "MODAL_INFO", payload: response.data });
  };
};
