import { STATUS_GROUP } from "../config/constants";
import { api } from "../providers/ApiProvider";
import { userInfo } from "../providers/StoreUtil";

class AppData {
  user: any;

  order: any;

  pendingOrders: Array<any> = [];
  inprogressOrders: Array<any> = [];

  constructor() {
    this.initData();
  }

  async initData() {
    this.user = await userInfo();
  }

  load() {
    console.log('===== AppData load =====');
    let options = {
      query: {
        orderBy: '-id',
        where: [
          {
            attribute: 'status',
            value: STATUS_GROUP.INPROGRESS,
          },
        ],
      },
    }
    api.getOrders(options).then((res) => {
      if (res?.content.error) {
        console.log('===== get order message res error =====');
        console.log(res.content)
      }
      else {
        console.log('===== get inprogress orders =====');
        // console.log(res?.content.result);
        this.inprogressOrders = res?.content.result;
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  userId() {
    return this.user?.id;
  }

  accessToken() {
    return this.user?.session.access_token;
  }

  bearToken() {
    return `Bearer ${this.accessToken()}`;
  }

  setOrder(order: any) {
    this.order = order;
  }

  getOrder() {
    return this.order;
  }

  getPendingOrders() {
    return this.pendingOrders;
  }

  getInprogressOrders() {
    return this.inprogressOrders;
  }
}

export const appData = new AppData();