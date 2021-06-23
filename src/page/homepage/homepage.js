import React, { Component } from 'react'
import { Table, Input, Button, message } from 'antd';
import axios from 'axios'
import 'antd/dist/antd.dark.css';
import { Link } from 'react-router-dom'

export default class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dsList: [],
      name: "",
    }
  }

  columns = [
    {
      title: '数据集名称',
      dataIndex: 'dsname',
      width: '20%',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '操作',
      dataIndex: 'opr',
      width: '20%',
      align: 'center',
      render: (_, record) => (
        <>
          <Link to={`/mem?name=${record.dsname}`}>查看&nbsp;&nbsp;&nbsp;</Link>
          <a onClick={() => this.deleteDs(record.dsname)}>删除</a>
        </>
      )
    }
  ]

  getDsList() {
    var token = JSON.parse(localStorage.getItem('token')).token
    axios({
      method: "get",
      url: `http://localhost:8080/sms/getdslist?dsName=${this.state.name}`,
      headers: {
        "Authorization": token
      }
    })
      .then((res) => {
        console.log(res)
        this.setState({
          dsList: res.data.items
        })
      })
  }

  deleteDs(name) {
    // console.log("准备")
    var token = JSON.parse(localStorage.getItem('token')).token
    axios({
      method: "delete",
      url: 'http://localhost:8080/sms/deleteds?dsName=' + name,
      headers: {
        "Authorization": token
      }
    })
      .then((res) => {
        message.info('删除成功');
        this.getDsList()
      })
  }

  onChange(event) {
    console.log(event.target.value)
    this.setState({
      name: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div style={{ margin: 'auto', width: '60%' }}>
          <Input placeholder="请输入名称" style={{ marginTop: 50, marginBottom: 20, width: 200 }} onChange={event => this.onChange(event)}></Input>
          <Button onClick={() => this.getDsList()}>搜索</Button>
          <Table columns={this.columns} dataSource={this.state.dsList} />
        </div>
      </div>
    )
  }
}