import {createSlice} from '@reduxjs/toolkit'

export interface IJobPriority {
    id: number,
    title: string,
    color: string
}

export interface IJob {
    key?: string,
    id: number,
    name: string,
    priority: IJobPriority | undefined
}

export interface IJobState {
    jobList: IJob[],
    priorities: IJobPriority[],
    editingJob?: IJob
}

export const JobStore = createSlice({
    name: 'JobStore',
    initialState: {
        jobList: [],
        priorities: []
    } as IJobState,
    reducers: {
        addJob: (state, {payload}: { payload: Pick<IJob, "priority" | "name"> }) => {
            let idMax = (Math.max(0,...state.jobList.map(job => job.id)))
            state.jobList.push({...payload, id: idMax + 1, key: 'item' + (idMax + 1)});
        },
        deleteJob: (state, {payload}: { payload: IJob }) => {
            let {jobList} = state;
            state.jobList = jobList.filter((item) => item.id !== payload.id);
        },
        editJob: (state, {payload}: { payload: IJob }) => {
            let {jobList} = state;
            state.jobList = jobList.map((item) => item.id === payload.id ? payload : item);
        },
        setPriorities: (state, {payload}: { payload: IJobPriority[] }) => {
            state.priorities = payload
        },
        setEditingJob: (state, {payload}: { payload: IJob | undefined }) => {
            state.editingJob = payload
        },
        setJobs: (state, {payload}: { payload: IJob[] }) => {
            state.jobList = payload
        }
    },
})
export const {addJob, deleteJob, editJob, setPriorities, setEditingJob,setJobs} = JobStore.actions
export default JobStore.reducer;