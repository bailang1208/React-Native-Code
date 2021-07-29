import Axios from 'axios';
import {s_accessToken} from './StoreUtil';

class HttpProvider {
  base_url = 'API base url';

  parseResponse = (resp: any) => {
    return resp.response ? resp.response.data : resp;
  };

  updateOrder = async (data: any) => {
    let url = `Api end point`;
    let token = await s_accessToken();
    return Axios({
      method: 'put',
      url: url,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}

export default HttpProvider;
