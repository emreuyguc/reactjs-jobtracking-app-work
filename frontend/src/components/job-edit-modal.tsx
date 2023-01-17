import {Col, Input, Modal, Row, Typography} from "antd";
import {useDispatch} from "react-redux";
import {editJob, IJob, IJobPriority, setEditingJob} from "../stores/job/job-store";
import React, {memo, useEffect, useState} from "react";
import JobPrioritySelector from "./job-priority-selector";

const {Text} = Typography

const JobEditModal = ({editedJob, jobPriorities}: { editedJob: IJob | undefined, jobPriorities: IJobPriority[] }) => {
    const [selectPriority, setSelectPriority] = useState<number>();
    const [inputName, setInputName] = useState<string>();

    const handleSelectPriority = (e: any) => setSelectPriority(e)

    const dispatcher = useDispatch()

    useEffect(function () {
        if (editedJob) {
            setInputName(editedJob.name)
            setSelectPriority(editedJob.priority?.id)
        }
    }, [editedJob])

    console.log("modal renderr")

    return <Modal title="Job Edit" open={editedJob !== undefined}
                  onOk={() => {
                      if(editedJob){
                          dispatcher(
                              editJob({
                                  ...editedJob,
                                  priority: jobPriorities.find((priority) => priority.id == selectPriority)
                              })
                          )
                          dispatcher(setEditingJob())
                      }
                  }}
                  onCancel={() => {
                      dispatcher(setEditingJob())
                  }}>
        <Row style={{alignItems: 'flex-end'}} gutter={[4, 4]}>
            <Col span={24}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Text type={'secondary'}>Job name</Text>
                    <Input
                        width={'100%'}
                        style={{width: '100%'}}
                        value={inputName}
                        disabled={true}
                    />
                </div>
            </Col>
            <Col span={24}>a
                <JobPrioritySelector
                    onChange={handleSelectPriority}
                    value={selectPriority}
                />
            </Col>

        </Row>
    </Modal>
}

export default memo(JobEditModal);