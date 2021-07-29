import { appData } from '../utils/AppData';
import {s_accessToken, s_userInfo, _retrieveStoreData} from './StoreUtil';

export default class ApiProvider {
  // sdk: Client's sdk (I removed it)

  parseResponse = (resp: any) => {
    return resp.response ? resp.response.data : resp;
  };

  // Authentication ============================================================================
  login = async (credential: any) => {
    try {
      return this.sdk.users().auth(credential);
    } catch (err) {
      console.log(err);
    }
  };

  forgot = async (email: string) => {
    try {
      return this.sdk.users().forgotPassword({email: email});
    } catch (err) {
      console.log(err);
    }
  };

  // User ======================================================================================
  updateUser = async (options: any) => {
    try {
      console.log(options);
      return this.sdk
        .setAccessToken(await s_accessToken())
        .users(appData.userId())
        .save(options);
    } catch (err) {
      console.log(err);
    }
  };

  // Orders ====================================================================================
  getOrders = async (options: any) => {
    try {
      return this.sdk
        .setAccessToken(await s_accessToken())
        .orders()
        .asDashboard()
        .get(options);
    } catch (err) {
      console.log(err);
    }
  };

  getOrder = async (orderId: number) => {
    try {
      return this.sdk
        .setAccessToken(await s_accessToken())
        .orders(orderId)
        .asDashboard()
        .get();
    } catch (err) {
      console.log(err);
    }
  };

  updateOrder = async (options: any) => {
    try {
      return this.sdk
        .setAccessToken(await s_accessToken())
        .orders(options.order_id)
        .save(options);
    } catch (err) {
      console.log(err);
    }
  };

  // Order Message =============================================================================
  getOrderMessages = async (orderId: string) => {
    try {
      let url = `api end point`;
      return this.sdk.setAccessToken(await s_accessToken()).get(url);
    } catch (err) {
      console.log(err);
    }
  }

  addOrderMessage = async (orderId: string, params: any) => {
    try {
      let url = `api end point`;
      return this.sdk.setAccessToken(await s_accessToken()).post(url, params);
    } catch (err) {
      console.log(err);
    }
  }
}

export const api = new ApiProvider();