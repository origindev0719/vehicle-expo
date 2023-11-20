import {configureStore} from '@reduxjs/toolkit';
import vehicleReducer from './src/features/vehicleSlice';


export default configureStore({
  reducer: {
    vehicle: vehicleReducer
  },
});
