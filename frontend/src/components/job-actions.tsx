import {Button, Col, Modal, Row} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled} from "@ant-design/icons";
import React, {memo} from "react";
import {IAppStates} from "../stores";
import {deleteJob, IJob, IJobState, setEditingJob} from "../stores/job/job-store";
import {useDispatch, useSelector} from "react-redux";

const {confirm} = Modal;

const showDeleteConfirm = (okCallback: () => void, cancelCallback: () => void) => {
    confirm({
        title: 'Are you sure delete this job?',
        icon: <ExclamationCircleFilled/>,
        content: 'This action cannot be undone\n',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            okCallback()
        },
        onCancel() {
            cancelCallback()
        },
    });
};

const JobActions = ({job}: { job:IJob }) => {
    const dispatcher = useDispatch();
    const handleDeleteJob = (e: any) => {
        showDeleteConfirm(() => {
            dispatcher(deleteJob(job!))
        },() => {

        })
    };

    const handleEditJob = (e:any) => {
        dispatcher(setEditingJob(job!))
    }

    console.log("actions render")
    return <Row gutter={4}>
        <Col>
            <Button icon={<EditOutlined/>} onClick={(e) => handleEditJob(e)}/>
        </Col>
        <Col>
            <Button icon={<DeleteOutlined/>} onClick={(e) => handleDeleteJob(e)}/>
        </Col>
    </Row>

}

export default memo(JobActions)