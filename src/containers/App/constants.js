/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_ADMIN = 'GET_TOKEN_ADMIN';
export const GET_ME = 'GET_ME';
export const LOGOUT = 'LOGOUT';
export const SET_TITLE = 'SET_TITLE';
export const GET_DELIVERY_OPTIONS = 'GET_DELIVERY_OPTIONS';
export const SET_ROLE = 'SET_ROLE';
export const REGISTER = 'REGISTER';
