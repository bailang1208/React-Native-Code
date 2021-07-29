import * as React from 'react';
import {getOrderStatus} from '../../providers/Utilities';
import {ODropDown, OSegment, OText} from '../shared';

import OrderItem from '../order-item';
import ApiProvider from '../../providers/ApiProvider';
import {
  HTTP_CONF,
  IMAGES,
  STATUS_GROUP,
  ORDER_STATUS,
  TIME_FORMAT,
} from '../../config/constants';
import { FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import { FilterWrapper, Wrapper } from './styles';
import { ToastType, useToast } from '../../providers/ToastProvider';

const orderStatus = [
  ['Group', ...STATUS_GROUP.PENDING.map((i) => getOrderStatus(i))], // pending
  ['Group', ...STATUS_GROUP.INPROGRESS.map((i) => getOrderStatus(i))], // inprogress
  ['Group', ...STATUS_GROUP.COMPLETE.map((i) => getOrderStatus(i))], // completed
  ['Group', ...STATUS_GROUP.CANCEL.map((i) => getOrderStatus(i))], // canceled
];

const dateFilters = ['Today', 'Last Week', 'Older'];

const INIT_PAGE = [
  {
    tabId: 0,
    text: 'Pending',
    image: IMAGES.pending,
    items: [],
    statusGroup: STATUS_GROUP.PENDING,
    options: {
      query: {
        orderBy: '-id',
        page: 1,
        page_size: HTTP_CONF.PAGE_SIZE,
        where: [
          {
            attribute: 'status',
            value: STATUS_GROUP.PENDING,
          },
        ],
      },
    },
    loadMore: false,
    isFiltering: false,
  },
  {
    tabId: 1,
    text: 'InProgress',
    image: IMAGES.inprogress,
    items: [],
    statusGroup: STATUS_GROUP.INPROGRESS,
    options: {
      query: {
        orderBy: '-id',
        page: 1,
        page_size: HTTP_CONF.PAGE_SIZE,
        where: [
          {
            attribute: 'status',
            value: STATUS_GROUP.INPROGRESS,
          },
        ],
      },
    },
    loadMore: false,
    isFiltering: false,
  },
  {
    tabId: 2,
    text: 'Completed',
    image: IMAGES.completed,
    items: [],
    statusGroup: STATUS_GROUP.COMPLETE,
    options: {
      query: {
        orderBy: '-id',
        page: 1,
        page_size: HTTP_CONF.PAGE_SIZE,
        where: [
          {
            attribute: 'status',
            value: STATUS_GROUP.COMPLETE,
          },
        ],
      },
    },
    loadMore: false,
    isFiltering: false,
  },
  {
    tabId: 3,
    text: 'Canceled',
    image: IMAGES.canceled,
    items: [],
    statusGroup: STATUS_GROUP.CANCEL,
    options: {
      query: {
        orderBy: '-id',
        page: 1,
        page_size: HTTP_CONF.PAGE_SIZE,
        where: [
          {
            attribute: 'status',
            value: STATUS_GROUP.CANCEL,
          },
        ],
      },
    },
    loadMore: false,
    isFiltering: false,
  },
];

const initialDateQuery = {
  attribute: 'delivery_datetime',
  value: {
    condition: '<=',
    value: moment().format(TIME_FORMAT),
  },
};

interface Props {
  orders: Array<any>;
  navigation: any;
}

const OrderList: React.FC<Props> = (props) => {

  const { navigation, orders } = props;
  const { showToast } = useToast();
  const api = new ApiProvider();

  var listRef = React.useRef<FlatList>(null);
  
  const [mPage, setPageData] = React.useState(INIT_PAGE);
  const [statusFilters, getFilterTypes] = React.useState(orderStatus[0]);
  const [curTab, onChangeStatus] = React.useState(mPage[0].tabId);
  const [curOrders, onUpdateOrders] = React.useState([]);
  const [filteredStatusIdx, setFilteredStatusIdx] = React.useState(0);
  const [filteredDate, setFilteredDate] = React.useState(initialDateQuery);
  const [is_refreshing] = React.useState(false);
  const [is_loading, setLoading] = React.useState(false);
  const [curOrderStatus, onChangeCurStatus] = React.useState(
    ORDER_STATUS.GROUPED,
  );

  React.useEffect(() => {
    getFilterTypes(orderStatus[curTab]);
    onChangeCurStatus(ORDER_STATUS.GROUPED);
    if (listRef.current) {
      listRef.current.scrollToOffset({animated: true, offset: 0});
    }
  }, [curTab]);

  React.useEffect(() => {
    console.log(statusFilters);
  }, [statusFilters]);

  React.useEffect(() => {
    console.log(curOrders.length);
  }, [curOrders]);

  React.useEffect(() => {
    mPage[curTab].isFiltering = curOrderStatus !== -1 ? true : false;
    setPageData(mPage);
    fetchingOrders();
  }, [curOrderStatus, filteredDate, curTab]);

  const onFilterByStatus = (index: number) => {
    setFilteredStatusIdx(index);
    const curStatus =
      index === 0 ? ORDER_STATUS.GROUPED : mPage[curTab].statusGroup[index - 1];
    onChangeCurStatus(curStatus);
  };

  const onFilterByDate = (index: number) => {
    let query = {
      attribute: 'delivery_datetime',
      value: {
        condition: '<=',
        value: moment().format(TIME_FORMAT),
      },
    };
    if (index === 0) {
      query.value = {
        condition: '=',
        value: moment().format(TIME_FORMAT),
      };
    } else if (index === 1) {
      query.value = {
        condition: '>=',
        value: moment().clone().subtract(7, 'days').format(TIME_FORMAT),
      };
    } else {
      query.value = {
        condition: '<=',
        value: moment().clone().subtract(7, 'days').format(TIME_FORMAT),
      };
    }
    setFilteredDate(query);
  };

  const _getWhere = (type: string) => {
    console.log('-------- getting where -------- : ' + type);
    if (curOrderStatus > -1) {
      if (curTab > 0) {
        mPage[curTab].options.query.where = [
          {
            attribute: 'status',
            value: [curOrderStatus],
          },
          filteredDate,
        ] as any;
      } else {
        mPage[curTab].options.query.where = [
          {
            attribute: 'status',
            value: [curOrderStatus],
          },
        ];
      }
    } else {
      if (curTab > 0) {
        mPage[curTab].options.query.where = [
          {
            attribute: 'status',
            value: mPage[curTab].statusGroup,
          },
          filteredDate,
        ] as any;
      } else {
        mPage[curTab].options.query.where = [
          {
            attribute: 'status',
            value: mPage[curTab].statusGroup,
          },
        ];
      }
    }

    console.log(JSON.stringify(mPage[curTab].options));
    return mPage[curTab].options;
  };

  const fetchingOrders = () => {
    console.log('-------- fetching orders -------- : ');
    if (is_loading) return;
    setLoading(true);
    mPage[curTab].options.query.page = 0;
    api
      .getOrders(_getWhere('FETCHING'))
      .then(_handleResults)
      .catch(_handleErrors);
  };

  const _loadMore = () => {
    if (mPage[curTab].items.length === 0 || filteredStatusIdx !== 0) {
      return;
    }
    console.log('-------- load more -------- : ');
    if (is_loading) return;
    setLoading(true);
    mPage[curTab].options.query.page = mPage[curTab].options.query.page + 1;
    api
      .getOrders(_getWhere('LOAD_MORE'))
      .then(_handleMoreResults)
      .catch(_handleErrors);
  };

  const _handleResults = (res: any) => {
    if (res.content.error) {
      showToast(ToastType.Error, res.content.error);
    } else {
      mPage[curTab].items = res.content.result;
      mPage[curTab].options.query.page = 1;
      mPage[curTab].loadMore =
        mPage[curTab].items.length >= res.content.pagination.total
          ? false
          : true;
      setPageData(mPage);
      onUpdateOrders([...mPage[curTab].items]);
      setLoading(false);
    }
  };

  const _handleMoreResults = (res: any) => {
    if (res.content.error) {
      showToast(ToastType.Error, res.content.error);
    } else {
      let _tmp = mPage[curTab].items;
      mPage[curTab].items = _tmp.concat(res.content.result);
      mPage[curTab].options.query.page =
        res.content.result.length != 0
          ? mPage[curTab].options.query.page
          : mPage[curTab].options.query.page - 1;
      mPage[curTab].loadMore =
        mPage[curTab].items.length >= res.content.pagination.total
          ? false
          : true;
      setPageData(mPage);
      onUpdateOrders([...mPage[curTab].items]);
      setLoading(false);

      console.log(
        '------- Current Page ------- : ' + res.content.pagination.current_page,
      );
    }
  };
  
  const _handleErrors = (err: any) => {
    setLoading(false);
    showToast(ToastType.Error, err.message);
  };

  const renderItem = ({item}: any) => {
    return (
      <OrderItem
        navigation={navigation}
        data={item}
        canAccept={curTab == 0 ? true : false}
      />
    );
  };

  return (
    <Wrapper>
      <Spinner visible={is_loading} />
      <OSegment
        items={mPage}
        selectedIdx={curTab}
        onSelectItem={onChangeStatus}
      />
      <FilterWrapper>
        <ODropDown
          items={statusFilters}
          placeholder={'Group'}
          kindImage={IMAGES.group}
          selectedIndex={filteredStatusIdx}
          onSelect={onFilterByStatus}
        />
        {curTab > 0 ? <OText style={{minWidth: 10}}>{''}</OText> : null}
        {curTab > 0 ? (
          <ODropDown
            items={dateFilters}
            placeholder={'Today'}
            kindImage={IMAGES.calendar}
            selectedIndex={0}
            onSelect={onFilterByDate}
          />
        ) : null}
      </FilterWrapper>
      <FlatList
        ref={listRef}
        data={curOrders}
        renderItem={renderItem}
        keyExtractor={(order: any) => order.id.toString()}
        onEndReachedThreshold={0.9}
        onEndReached={() => _loadMore()}
        onRefresh={() => fetchingOrders()}
        refreshing={is_refreshing}
      />
    </Wrapper>
  );
};

export default OrderList;
