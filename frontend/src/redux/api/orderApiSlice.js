import { createApi,  } from "@reduxjs/toolkit/query";
import {apiSlice} from "./apiSlice.js";
import { ORDERS_URL } from "../constants";
export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createOrder:builder.mutation({
            query:(orderData)=>({
                url:`${ORDERS_URL}`,
                method:"POST",
                body:orderData,
            }),
        }),
        getOrderDetails:builder.query({
            query:(id)=>({
                url:`${ORDERS_URL}/${id}`,
            }),
        }),
        payOrder:builder.mutation({
            query:({ordersId,details})=>({
                url:`${ORDERS_URL}/${ordersId}/pay`,
                method:"PUT",
                body:details,
            }),
        }),
        getPaypalClientId:builder.query(),
        getMyOrders: builder.query({
            query: () => ({
              url: `${ORDERS_URL}/mine`,
            }),
            keepUnusedDataFor: 5,
          }),
      
          getOrders: builder.query({
            query: () => ({
              url: ORDERS_URL,
            }),
          }),
      
          deliverOrder: builder.mutation({
            query: (orderId) => ({
              url: `${ORDERS_URL}/${orderId}/deliver`,
              method: "PUT",
            }),
          }),
      
          getTotalOrders: builder.query({
            query: () => `${ORDERS_URL}/total-orders`,
          }),
      
          getTotalSales: builder.query({
            query: () => `${ORDERS_URL}/total-sales`,
          }),
      
          getTotalSalesByDate: builder.query({
            query: () => `${ORDERS_URL}/total-sales-by-date`,
          }),
    })
})








export const{
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery,
    useGetMyOrdersQuery,
    useGetOrdersQuery,
    useDeliverOrderMutation,
    useGetTotalOrdersQuery,
    useGetTotalSalesQuery,
    useGetTotalSalesByDateQuery
}=orderApiSlice;