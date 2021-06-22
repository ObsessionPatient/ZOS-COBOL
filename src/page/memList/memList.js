import React, { Component } from 'react'
import { Table, message } from 'antd';
import axios from 'axios'
import 'antd/dist/antd.dark.css';
import { Link } from 'react-router-dom'

export default class MemList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      memList: [],
      //name: props.location.state.name,
      name: props.location.search,
    }
    console.log(this.state.name.split("=")[1])
    this.state.name = this.state.name.split("=")[1]
    console.log(this.state.name)
  }

  componentDidMount() {
    //console.log(this.props.location.state.name)
    this.getMemList()
  }

  columns = [
    {
      title: '成员名称',
      dataIndex: 'member',
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
          <Link to={`/detail?member=${this.state.name}(${record.member})`}>查看&nbsp;&nbsp;&nbsp;</Link>
          <Link to={`/edit?member=${this.state.name}(${record.member})`}>编辑&nbsp;&nbsp;&nbsp;</Link>
          <a onClick={() => this.deleteMem(record.member)}>删除</a>
        </>
      )
    }
  ]

  getMemList() {
    var token = JSON.parse(localStorage.getItem('token')).token
    axios({
      method: "get",
      url: `http://localhost:8080/sms/getpdsmemberlist?dsName=${this.state.name}`,
      headers: {
        "Authorization": token
      }
    })
      .then((res) => {
        console.log(res)
        this.setState({
          memList: res.data.items
        })
      })
  }

  deleteMem(mem) {
    var token = JSON.parse(localStorage.getItem('token')).token
    axios({
      method: "get",
      url: 'http://localhost:8080/sms/deletepdsmember?dsName=' + this.state.name + '(' + mem + ')',
      headers: {
        "Authorization": token
      }
    })
      .then((res) => {
        message.info('删除成功');
        this.getMemList()
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
          <div style={{ marginTop: 101.6, marginBottom: 20 }}>
          </div>
          <Table columns={this.columns} dataSource={this.state.memList} />
        </div>
      </div>
    )
  }
}