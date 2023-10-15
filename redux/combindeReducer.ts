import { combineReducers } from "redux";
import { PersistConfig, persistReducer } from "redux-persist";
import cartReduce, { InitialCartItem } from "./slice/cartReduce";
import storage from "redux-persist/es/storage";

 const persisConfig: PersistConfig<any> = {
    key: "85344fefd31c62836a512d95e205d804",
    version: 1,
    storage
};
const combinedReducers = combineReducers({
    cartReduce: persistReducer<InitialCartItem>(persisConfig, cartReduce)
});

export default combinedReducers;