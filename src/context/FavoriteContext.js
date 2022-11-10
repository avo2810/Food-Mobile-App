import React, { useReducer } from "react";
import createDataContext from "./createDataContext";
import jsonServer from '../api/jsonServer'

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'get_favorite':
            return action.payload;
        case 'delete_favorite':
            return state.filter((favoriteRestaurant) => favoriteRestaurant.id !== action.payload);
        default:
    }
}

const getFavorite = dispatch => {
    return async () => {
        const response = await jsonServer.get('/favoriteRestaurants')
        dispatch({ type: 'get_favorite', payload: response.data })
    }
}

const addFavorite = dispatch => {
    return async (businessName, businessID, callback) => {
        await jsonServer.post('/favoriteRestaurants', { businessName, businessID })
        if (callback) {
            callback()
        }
    }
}

const deleteFavorite = dispatch => {
    return async (id) => {
        await jsonServer.delete(`/favoriteRestaurants/${id}`)
        dispatch({ type: 'delete_favorite', payload: id })
    }
}




export const { Context, Provider } = createDataContext(favoriteReducer, { addFavorite, deleteFavorite, getFavorite }, [])
