import React, { Component } from "react"
import NormalLoginForm from "./component/loginForm"
import { Card } from "antd"
import 'antd/dist/antd.dark.css';

export default class LogIn extends Component {
  render() {
    return (
      <Card title="登录" style={{ marginTop: '10%', marginRight: '35%', marginLeft: '35%' }}>
        <NormalLoginForm />
        
      </Card>
    )
  }
}