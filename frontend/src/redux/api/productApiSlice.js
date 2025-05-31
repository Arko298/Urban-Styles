import { apiSlice } from "./apiSlice";
import { PRODUCT_URL,UPLOAD_URL } from "../constants.js";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}`,
            }),
            providesTags: ["Products"],
            keepUnusedDataFor: 5,
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
            }),
           providesTags: (result,error,productId)=>[
            {type: "Products", id: productId},
           ],
        }),

        allProducts: builder.query({
            query: ()=>({
                url: `${PRODUCT_URL}/all-products`,
            })
        }),
        getTopProducts: builder.query({
            query: ()=>({
                url: `${PRODUCT_URL}/top-products`
            })
        }),
        createProducts: builder.mutation({
            query: (productData) => ({
                url: `${PRODUCT_URL}`,
                method: "POST",
                body: productData,
            }),
            invalidatesTags: ["Products"]
        }),
        updateProducts: builder.mutation({
            query: (productId,formdata) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "PUT",
                body: formdata,
            }),
        }),
        deleteProducts: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "DELETE",
            }),
        }),
        getFilteredProducts: builder.query({
            query: (filters) => ({
                url: `${PRODUCT_URL}/filter`,
                method: "POST",
                body: filters,
            }),
            providesTags: ["Products"],
            keepUnusedDataFor: 5,
        }),
        uploadProductImage: builder.mutation({
            query: (data)=>({
                url: `${UPLOAD_URL}`,
                method: "POST",
                body: data,
            })
        }),
        getNewProducts: builder.query({
            query: ()=>({
                url: `${PRODUCT_URL}/new`,
            }),
            providesTags: ["Products"]
        }),
        createProductsReviews : builder.mutation({
            query: (data)=>({
                url: `${PRODUCT_URL}/${data.productId}/reviews`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),
        getProductsDetails: builder.query({
            query: (productId)=>({
                url: `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),

    })
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductsMutation,
    useUpdateProductsMutation,
    useDeleteProductsMutation,
    useGetFilteredProductsQuery,
    useGetNewProductsQuery,
    useUploadProductImageMutation,
    useAllProductsQuery,
    useGetTopProductsQuery,
    useCreateProductsReviewsMutation,
    useGetProductsDetailsQuery,
} = productApiSlice;
