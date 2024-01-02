import { configureStore } from '@reduxjs/toolkit';
import userReduce from './reducers/userReduce';

export default configureStore({
    reducer: {
        user: userReduce,
    },
})