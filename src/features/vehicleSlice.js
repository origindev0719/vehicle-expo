import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchMake = createAsyncThunk(
  'fetchMake',
  async (item) => {
    const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForManufacturerAndYear/mer?year=${item}&format=json`)
    return response.data.Results;
  }
)

export const fetchModel = createAsyncThunk(
  'fetchModel',
  async ({makeId, year}) => {
    const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`)

    return response.data.Results;
  }
)

export const createProduct = createAsyncThunk(
  'createProduct',
    async({make, model, year}) => {
      return Promise.resolve({Make: make, Model: model, Year: year});
  }
)

export const vehicleSlice = createSlice({
  name: 'vehicleSlice',
  initialState: {
    make: [],
    model: [],
    product: {
      Make: '',
      Model: '',
      Year: ''
    },
    status: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMake.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchMake.fulfilled, (state, action) => {
        state.make = action.payload;
      })
      .addCase(fetchModel.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchModel.fulfilled, (state, action) => {
        state.model = action.payload;
      })
      .addCase(createProduct.pending, state => {
        state.status = 'loading'
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.product = {...state.product, ...action.payload}
      })
  }
})

export default vehicleSlice.reducer;