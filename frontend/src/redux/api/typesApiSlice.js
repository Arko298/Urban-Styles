import { TYPE_URL } from "../constants";
import { apiSlice } from "./apiSlice";




export const typesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        createTypes: builder.mutation({
            query: (newTypes)=>({
                url: `${TYPE_URL}`,
                method: "POST",
                body: newTypes
            }),
        }),
        removeTypes: builder.mutation({
            query: (typeId)=>({
                url: `${TYPE_URL}/${typeId}`,
                method: "DELETE",
            }),
        }),
        updateTypes: builder.mutation({
            query: ({typeId,updatedTypes})=>({
                url: `${TYPE_URL}/${typeId}`,
                method: "PUT",
                body: updatedTypes
            }),
            overrideExistingQuery: false,
        }),
        fetchTypes: builder.query({
            query: ()=>({
                url: `${TYPE_URL}/types`,
            }),
            providesTags: ["Types"],
        }),
    })
});

export const {
    useCreateTypesMutation,
    useRemoveTypesMutation,
    useUpdateTypesMutation,
    useFetchTypesQuery
}= typesApiSlice;