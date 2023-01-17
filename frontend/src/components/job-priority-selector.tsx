import {Select, SelectProps} from "antd";
import {memo} from "react";
import {useSelector} from "react-redux";
import {IAppStates} from "../stores";
import {IJobPriority} from "../stores/job/job-store";

interface ISelectorProps extends SelectProps {
}

const JobPrioritySelector = (selectorProps: ISelectorProps) => {
    const jobPriorities = useSelector<IAppStates, IJobPriority[]>((appStates) => appStates.job.priorities)

    console.log("selector render")
    return <Select
        options={jobPriorities.map(priority => ({value: priority.id, label: priority.title}))}
        defaultValue={'Choose'}
        {...selectorProps}
        style={{width:'100%'}}
    />;
}

export default memo(JobPrioritySelector);