import {configureStore} from "@reduxjs/toolkit";
import jobStore, {IJobState} from "./job/job-store";
import themeStore, {ThemeState} from "./theme/theme-store";
import localstorageMiddleware from "./job/localstorage-middleware";


export interface IAppStates {
    job: IJobState,
    theme : ThemeState
}

const AppStores = configureStore({
    reducer:{
        job : jobStore,
        theme : themeStore
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(localstorageMiddleware.middleware)
})

export default AppStores;
