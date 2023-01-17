import {createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {addJob, deleteJob, editJob} from "./job-store";
import {IAppStates} from "../index";

const localstorageMiddleware = createListenerMiddleware()

localstorageMiddleware.startListening({
    predicate : (action:any, currentState:any, originalState:any) => {
        if(isAnyOf(addJob,editJob,deleteJob)(action)){
            localStorage.setItem('jobs',JSON.stringify(currentState.job.jobList))
        }
        return currentState;
    },
    effect: async (action, api) => {
    },
})

export default localstorageMiddleware