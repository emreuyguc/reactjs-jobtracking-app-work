import {Button, Col, Input, Row, Spin, Tooltip, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {memo, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addJob, IJobPriority} from "../stores/job/job-store";
import JobPrioritySelector from "./job-priority-selector";

const {Text,Title} = Typography

const JobForm = ({jobPriorities}: { jobPriorities: IJobPriority[] }) => {
    //local storage?

    const [selectPriority, setSelectPriority] = useState<number | 'Choose'>('Choose');
    const [inputName, setInputName] = useState<string>("");
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] | undefined }>({})

    const handleSelectPriority = (e: any) => setSelectPriority(e)
    const handleNameChange = (e: any) => setInputName(e.target.value)

    const dispatch = useDispatch();

    /* VALIDATE */
    const validators: { [key: string]: () => string[] | undefined } = {
        inputName: () => {
            let value = inputName;
            let errors = [];

            (/[^0-9a-zA-Z\s]/.test(value)) && errors.push('alphanumeric characters only');
            (value.length > 255) && errors.push('max length 255');
            (value == '') && errors.push('not empty');

            return errors.length ? errors : undefined
        },
        selectPriority: () => {
            let value = selectPriority;
            let errors = [];

            (value == 'Choose') && errors.push('please choose');
            return errors.length ? errors : undefined
        }
    }
    useEffect(() => {
        if (inputName.length > 0 || formErrors['inputName']) {
            setFormErrors((errs) =>
                ({
                    ...errs,
                    inputName: validators['inputName']()
                }))
        }

    }, [inputName])
    useEffect(() => {
        if (selectPriority != 'Choose') {
            setFormErrors((errs) =>
                ({
                    ...errs,
                    selectPriority: validators['selectPriority']()
                }))
        }
    }, [selectPriority])

    const isErrorForm: () => boolean = function () {
        let errors: { [key: string]: string[] | undefined } = {}
        Object.keys(validators).forEach((key) => {
            errors[key] = validators[key]()
        })

        setFormErrors(errors)
        return !(Object.values(errors).every((errs) => errs == undefined));
    }
    const handleCreate = async function (e: any) {
        if (!isErrorForm()) {
            dispatch(addJob({
                name: inputName,
                priority: jobPriorities.find((jobPriority) => jobPriority.id == selectPriority)
            }))
            setInputName('')
            setSelectPriority('Choose')
        }
    };

    console.log("form render")
    return <Spin spinning={!jobPriorities.length} tip={'Priorities fetching..'}>
        <Title level={4}>Create New Job</Title>
        <Row style={{alignItems: 'flex-end',marginBottom:40}} gutter={[4, 4]} >
            <Col xs={{span: '24'}} sm={{span: 14}} md={{span: 16}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Tooltip placement="top" title={formErrors['inputName']?.join(',')} color={'red'} open={!!formErrors['inputName']} defaultOpen={false}>
                        <Text type={'secondary'}>Job name ({(255-inputName.length) < 0 ? (inputName.length-255) + ' More Char!' : (255-inputName.length) + ' Char Left'} )</Text>
                    </Tooltip>
                    <Input width={'100%'} style={{width: '100%'}}
                           value={inputName}
                           onChange={handleNameChange}
                           status={(formErrors['inputName']) && 'error'}
                    />

                </div>
            </Col>
            <Col xs={{span: '24'}} sm={{span: 6}} md={{span: 4}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Tooltip placement="top" title={formErrors['selectPriority']?.join(',')} color={'red'} open={!!formErrors['selectPriority']} defaultOpen={false}>
                        <Text type={'secondary'}>Job priority</Text>
                    </Tooltip>
                    <JobPrioritySelector
                        onChange={handleSelectPriority}
                        value={selectPriority}
                        status={formErrors['selectPriority'] && 'error'}
                    />
                </div>
            </Col>
            <Col xs={{span: '24'}} sm={{span: 4}} md={{span: 4}}>
                <Button type="primary"
                        style={{width: '100%'}}
                        onClick={(e) => handleCreate(e)}
                ><PlusOutlined/>Create</Button>
            </Col>
        </Row>
    </Spin>
}
export default memo(JobForm);

