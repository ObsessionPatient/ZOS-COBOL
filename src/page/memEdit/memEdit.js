import React, { Component } from 'react'
import { Button, Input, message } from 'antd';
import axios from 'axios'
import 'antd/dist/antd.dark.css';

const { TextArea } = Input;

export default class MemEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.location.search,
      content: "",
      jobId: "",
      result: "",
      id: "",
      jobName: ""
    }
    //console.log(this.state.name.split("=")[1])
    this.state.name = this.state.name.split("=")[1]
    //console.log(this.state.name)
  }

  componentDidMount() {
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
        console.log(res)
        this.setState({
          content: res.data
        })
        console.log(res.data)
      })
  }

  onChange(event) {
    console.log(event.target.value)
    this.setState({
      content: event.target.value
    })
  }

  onClick() {
    console.log(this.state.content)
    var token = JSON.parse(localStorage.getItem('token')).token
    axios({
      method: "put",
      url: 'http://localhost:8080/sms/writeds',
      data: {
        dsName: this.state.name,
        jclList: this.state.content
      },
      headers: {
        "Authorization": token
      }
    })
      .then(() => {
        message.info('修改成功');
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
              jobId: res.data.jobId,
              jobName: res.data.jobName
            })
          })
          .catch(() => {
            message.info('运行失败');
          })
      })
      .catch(() => {
        message.info('修改失败');
      })
  }

  onIdChange(event) {
    console.log(event.target.value)
    this.setState({
      id: event.target.value
    })
  }

  onSearchClick() {
    var token = JSON.parse(localStorage.getItem('token')).token
    axios({
      method: "get",
      url: 'http://localhost:8080/sms/job/output',
      data: {
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
          result: res.data
        })
      })
      .catch(() => {
        message.info('查询失败')
      })
  }

  render() {
    return (
      <div>
        <div style={{ margin: 'auto', width: '60%' }}>
          <div style={{ marginTop: 101.6, marginBottom: 20 }}>
          </div>
          <TextArea rows={10} defaultValue={this.state.content} onChange={event => this.onChange(event)} />
          <Button onClick={() => this.onClick()} style={{ marginTop: 20 }}>运行</Button>
          <TextArea rows={1} defaultValue="请输入查询的id" onChange={event => this.onIdChange(event)} style={{ marginTop: 20 }} />
          <Button onClick={() => this.onSearchClick()} style={{ marginTop: 20 }}>查询</Button>
          <TextArea rows={5} defaultValue={this.state.result} disabled style={{ marginTop: 20 }} />
        </div>
      </div>
    )
  }
}