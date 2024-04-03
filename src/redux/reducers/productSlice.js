import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { productAction } from "../actions/productAction"

let initialState = {
  productList:[],
  selectedItem: null,
  isLoading:false,
  error : null,
}

export const fetchProducts = createAsyncThunk('product/fetchAll',async(searchQuery, thunkApi)=>{
  try{
    let url = `https://my-json-server.typicode.com/wammaa/hnmreact/products?q=${searchQuery}`
    let response = await fetch(url)
    return await response.json()
  }catch(error){
    thunkApi.rejectWithValue(error.message)
  }
  
})

export const fetchDetail = createAsyncThunk('product/fetchDetail', async(id, thunkApi)=>{
  try{
    let url = `https://my-json-server.typicode.com/wammaa/hnmreact/products/${id}`
    let response = await fetch(url)
    return await response.json()
  }catch(error){
    thunkApi.rejectWithValue(error.message)
  }
})

// function productReducer(state=initialState, action){
//   let {type, payload} = action
//   switch(type){
//     case "GET_PRODUCT_SUCCESS":
//       return {...state, productList:payload.data}
//     case "GET_PRODUCT_DETAIL_SUCCESS":
//       return {...state, selectedItem: payload.data }
//     default :
//       return {...state}
//   }
// }

// export default productReducer

const productSlice = createSlice({
  name : "product",
  initialState,
  reducers:{
    getSingleProduct(state,action){
      state.selectedItem = action.payload.data
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchProducts.pending, (state)=>{
      state.isLoading = true
    })
    .addCase(fetchProducts.fulfilled, (state, action)=>{
      state.isLoading = false
      state.productList = action.payload
    })
    .addCase(fetchProducts.rejected, (state, action)=>{
      state.isLoading = false
      state.error = action.payload
    });
    builder.addCase(fetchDetail.pending, (state)=>{
      state.isLoading = true
    })
    .addCase(fetchDetail.fulfilled, (state,action)=>{
      state.isLoading = true
      state.selectedItem = action.payload
    })
    .addCase(fetchDetail.rejected, (state, action)=>{
      state.isLoading = true
      state.error = action.payload
    });
  }
})

export const productActions = productSlice.actions;
export default productSlice.reducer;