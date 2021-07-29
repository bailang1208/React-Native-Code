import { ORDER_STATUS } from "./constants";

export type ObjectValues<T> = T extends { [key: string]: infer U } ? U : never;
export type OrderStatusType = ObjectValues<typeof ORDER_STATUS>;

export type UserTypes = {
    address: string;
    address_notes: string;
    available: boolean;
    birthdate: string;
    busy: boolean;
    cellphone: string;
    city_id: number;
    country_phone_code: string;
    created_at: string;
    deleted_at: string;
    dropdown_option: any;
    dropdown_option_id: number;
    email: string;
    enabled: boolean;
    id: number;
    internal_number: string;
    language_id: number;
    last_location_at: string;
    last_order_assigned_at: string;
    lastname: string;
    level: number;
    location: {
        lat: number;
        lng: number
    };
    login_type: number;
    map_data: any;
    middle_name: string;
    name: string;
    phone: string;
    photo: string;
    priority: number;
    push_notifications: boolean;
    second_lastname: string;
    session: {
        access_token: string;
        expires_in: number;
        token_type: string
    };
    social_id: string;
    updated_at: string;
    zipcode: string;
};
