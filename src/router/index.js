import React from 'react';
import {Router,Route,Switch,Redirect} from 'react-router-dom';
import { createHashHistory } from "history";
import LogIn from '../page/login/login'
import Homepage from '../page/homepage/homepage'
import MemList from '../page/memList/memList'
import MemDetail from '../page/memDetail/memDetail'
import MemEdit from '../page/memEdit/memEdit'

const history = createHashHistory();

class RouterConfig extends React.Component{
    render(){
        return(
            <Router history={history}>
                <Switch>
                    <Route path='/' exact render={()=>(
                        <Redirect to='/login'/>
                    )}/>
                    <Route path='/login' component={LogIn}/>
                    <Route path='/home' component={Homepage}/>
                    <Route path='/mem' component={MemList}/>
                    <Route path='/detail' component={MemDetail}/>
                    <Route path='/edit' component={MemEdit}/>
                </Switch>
            </Router>
        )
    }
}
export default RouterConfig;