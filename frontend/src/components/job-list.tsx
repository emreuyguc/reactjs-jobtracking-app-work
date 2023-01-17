import {Col, Modal, Row, Table, Tag} from "antd";
import React, {memo, useMemo} from "react";
import {ColumnsType} from "antd/es/table";
import {IJob, IJobPriority} from "../stores/job/job-store";
import JobActions from "./job-actions";

const JobList = ({jobList}: { jobList: IJob[] }) => {
    let jobColumns: ColumnsType<any> = useMemo(() => [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        {
            title: 'Prioritsy',
            dataIndex: 'priority',
            render: function (value: IJobPriority, record, index) {
                return <Tag color={value.color}>{value.title}</Tag>
            },
            sorter: (a: any, b: any) => a.priority.id - b.priority.id,
            defaultSortOrder: 'descend',
            showSorterTooltip:false
        },
        {
            title: 'Action',
            width: 100,
            render: function (value, record, index) {
                return <JobActions job={record}/>
            }
        }],[]);

    console.log("list render")
    return <Row style={{marginTop: 10}}>
        <Col span={24}>
            <Table columns={jobColumns} dataSource={jobList} />
        </Col>
    </Row>
}

export default memo(JobList);