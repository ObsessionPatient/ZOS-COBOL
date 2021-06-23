import React, { Component } from 'react'
import { Button, Input, message } from 'antd';
import axios from 'axios'
import 'antd/dist/antd.dark.css';

const { TextArea } = Input;

export default class MemDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.location.search,
      content: "",
      jobId: "",
      result: "",
      id: "",
      jobName: "",
      isloading: false
    }
    console.log(this.state.name.split("=")[1])
    this.state.name = this.state.name.split("=")[1]
    console.log(this.state.name)
    this.getDetail()
  }

  componentWillMount() {
    this.setState({ isLoading: true })
    this.getDetail()
  }

  getDetail() {
    var token = JSON.parse(localStorage.getItem('token')).token
    axios({
      method: "get",
      url: `http://localhost:8080/sms/getds?dsName=${this.state.name}`,
      headers: {
        "Authorization": token
      }
    })
      .then((res) => {
        //console.log(res)
        this.setState({
          content: res.data,
          isLoading: false
        })
        console.log(this.state.content)
      })
  }

  onClick() {
    console.log("run")
    var token = JSON.parse(localStorage.getItem('token')).token
    axios({
      method: "put",
      url: 'http://localhost:8080/sms/subjob',
      data: {
        jclList: this.state.content
      },
      headers: {
        "Authorization": token
      }
    })
      .then((res) => {
        message.info('运行成功');
        this.setState({
          jobId: res.data.jobid,
          jobName: res.data.jobname
        })
      })
      .catch(() => {
        message.info('运行失败');
      })
  }

  onIdChange(event) {
    console.log(event.target.value)
    this.setState({
      id: event.target.value
    })
  }

  onSearchClick() {
    this.setState({ isLoading: true })
    var token = JSON.parse(localStorage.getItem('token')).token
    axios({
      method: "get",
      url: 'http://localhost:8080/sms/job/output',
      params: {
        jobName: this.state.jobName,
        jobId: this.state.jobId,
        id: this.state.id,
      },
      headers: {
        "Authorization": token
      }
    })
      .then((res) => {
        message.info('查询成功')
        this.setState({
          result: res.data,
          isLoading: false
        })
      })
      .catch(() => {
        message.info('查询失败')
      })
  }

  render() {
    let { isLoading } = this.state
    if (isLoading) {
      return <p>isLoading...</p>
    }
    console.log(this.state.content)
    console.log(this.state.result)
    return (
      <div>
        <div style={{ margin: 'auto', width: '60%' }}>
          <div style={{ marginTop: 101.6, marginBottom: 20 }}>
          </div>
          <TextArea rows={10} defaultValue={this.state.content} disabled style={{ color: 'white' }}></TextArea>
          <Button onClick={() => this.onClick()} style={{ marginTop: 20 }}>运行</Button>
          <p style={{marginTop: 25}}>jobName: {this.state.jobName}</p>
          <p>jobId: {this.state.jobId}</p>
          <TextArea rows={1} defaultValue="请输入查询的id" onChange={event => this.onIdChange(event)} style={{ marginTop: 20 }} />
          <Button onClick={() => this.onSearchClick()} style={{ marginTop: 20 }}>查询</Button>
          <TextArea rows={10} defaultValue={this.state.result} disabled style={{ marginTop: 20, color: 'white' }} />
        </div>
      </div>
    )
  }
}