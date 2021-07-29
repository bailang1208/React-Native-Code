import { updateLocale } from 'moment';
import React, { createContext, FC, ReactNode, useState } from 'react';
import { ORDER_STATUS } from '../config/constants';
import { OrderStatusType } from '../config/types';

type AppStatusType = {
    curOrderStatus: OrderStatusType;
    updateOrderStatus: (status: number) => void;
    canPageLoading: boolean;
    updatePageLoading: (can: boolean) => void;
    isOnline: boolean;
    updateOnOffLine: (state: boolean) => void;
};

export const StatusContext = createContext<AppStatusType>({
    curOrderStatus: ORDER_STATUS.PENDING, 
    canPageLoading: false,
    isOnline: false,
    updateOrderStatus: () => {},
    updatePageLoading: () => {},
    updateOnOffLine: () => {},
});

type Props = {
    children: ReactNode;
};

const AppStatusProvider: FC<Props> = (props) => {
    const { children } = props;
    const [curOrderStatus, updateOrderStatus] = useState(ORDER_STATUS.PENDING);
    const [canPageLoading, updatePageLoading] = useState(false);
    const [isOnline, updateOnOffLine] = useState(false);

    const initialState: AppStatusType = {
        curOrderStatus,
        updateOrderStatus,
        canPageLoading,
        updatePageLoading,
        isOnline,
        updateOnOffLine,
    }

    return (
        <StatusContext.Provider value={initialState}>
            {children}
        </StatusContext.Provider>
    );
}

export default AppStatusProvider;