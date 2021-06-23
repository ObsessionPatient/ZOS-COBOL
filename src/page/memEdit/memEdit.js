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
      jobName: "",
      isloading: false
    }
    //console.log(this.state.name.split("=")[1])
    this.state.name = this.state.name.split("=")[1]
    //console.log(this.state.name)
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
        console.log(res)
        this.setState({
          content: res.data,
          isLoading: false
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
      })
      .catch(() => {
        message.info('修改失败');
      })
  }

  render() {
    let { isLoading } = this.state
    if (isLoading) {
      return <p>isLoading...</p>
    }
    console.log(this.state.content)
    return (
      <div>
        <div style={{ margin: 'auto', width: '60%' }}>
          <div style={{ marginTop: 101.6, marginBottom: 20 }}>
          </div>
          <TextArea rows={10} defaultValue={this.state.content} onChange={event => this.onChange(event)} />
          <Button onClick={() => this.onClick()} style={{ marginTop: 20 }}>提交</Button>
        </div>
      </div>
    )
  }
}