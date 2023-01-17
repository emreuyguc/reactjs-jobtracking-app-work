import React, {useEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {
    Col,
    Divider,
    Image, Input,
    Layout, Row,
    Typography
} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {IJob, IJobPriority, setJobs, setPriorities} from "./stores/job/job-store";
import {IAppStates} from "./stores";
import JobForm from "./components/job-form";
import JobList from "./components/job-list";
import JobEditModal from "./components/job-edit-modal";
import JobPrioritySelector from "./components/job-priority-selector";
import {GithubOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import Link from "antd/es/typography/Link";

const {Header, Footer, Content} = Layout;
const {Title} = Typography;

function JobSearch({searchVal}:{searchVal:any}) {
    const handleSearch = (e:any) => {
      searchVal(e.target.value)
    }
    return <Input placeholder="Job Name" prefix={<SearchOutlined />}  onChange={handleSearch}  />;
}

function App() {
    const jobList = useSelector<IAppStates, IJob[]>((appStates) => appStates.job.jobList);
    const jobPriorities = useSelector<IAppStates, IJobPriority[]>((appStates) => appStates.job.priorities)
    const editedJob = useSelector<IAppStates,IJob |undefined>((appStates) => appStates.job.editingJob)

    const [nameFilter,setNameFilter] = useState('')
    const [priorityFilter,setPriorityFilter] = useState(-1)


    const dispatch = useDispatch();

    const timer = useRef<NodeJS.Timer | null>(null);
    const startFetchPriorities = () => {
        if (jobPriorities.length < 1 && timer.current == null) {
            timer.current = setInterval(() => fetchPriorities(), 1000)
        }
    };
    const resetFetchPriorities = () => {
        clearInterval(timer.current!)
        timer.current = null
    }

    const fetchPriorities = () => {
        fetch('http://localhost:8080/priority').then((res) => res.json()).then(function (data: IJobPriority[]) {
            resetFetchPriorities()
            dispatch(setPriorities(data))
        }).catch(function (err) {
            console.log(err)
        })
    }
    const fillFromLocalStorage = () => {
        dispatch(setJobs(JSON.parse(localStorage.getItem('jobs')!) ?? []))
    }

    useEffect(function () {
        startFetchPriorities()
        fillFromLocalStorage()
    }, [])

    console.log('app rend')
    return (
        <Layout>
            <Header style={{background: 'none', display: 'flex', alignItems: 'center'}}>
                <Image height={'100%'} src={'/logo.webp'}/>
                <Title style={{color: '#064797'}}>Logo</Title>
            </Header>
            <Content style={{paddingInline: '50px'}}>
                <Divider />
                <JobForm jobPriorities={jobPriorities}/>
                <Row gutter={4}>
                    <Col span={20}>
                        <JobSearch searchVal={setNameFilter}/></Col>
                    <Col span={4}>
                        <JobPrioritySelector
                        onChange={setPriorityFilter}
                        options={[...jobPriorities.map(priority => ({value: priority.id, label: priority.title})),{value:-1,label:'All'}]}
                        defaultValue={priorityFilter}
                    /></Col>
                </Row>
                <JobList  jobList={jobList.filter(value =>
                    (value.name.toLowerCase().indexOf(nameFilter) > -1)
                        &&
                    (priorityFilter != -1 ? value.priority?.id == priorityFilter : true  )
                )}/>
                <JobEditModal editedJob={editedJob} jobPriorities={jobPriorities} />
            </Content>
            <Footer>
                <Row style={{justifyContent:'space-between'}}>
                    <Col><Link href={'https://github.com/emreuyguc/reactjs-job-track-case'}>
                        <GithubOutlined /> Go To Repository
                    </Link></Col>
                    <Col>
                        <UserOutlined /> Emre Utku Uyguç
                    </Col>
                </Row>
            </Footer>
        </Layout>
    );
}

export default App;
