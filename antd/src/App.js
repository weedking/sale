// import React ,{ Component } from 'react';

import React from 'react';
// import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';

const { SubMenu } = Menu;
const {
    Header, Content, Footer, Sider,
} = Layout;

class Display extends React.Component{
    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">用户信息</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="user" />用户信息</span>}>
                                    <Menu.Item key="1">用户信息录入</Menu.Item>
                                    <Menu.Item key="2">option2</Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            Content
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        );
    }



}

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue : '',//查询结果
            content: '',//笔记内容
            date: new Date(),//当前时间
            mynote: [],//存储笔记的相关字段内容
        };

        // This binding is necessary to make `this` work in the callback
        this.getNoteList=this.getNoteList.bind(this);
        this.clickNoteTitle=this.clickNoteTitle.bind(this);

    }


    componentDidMount() {//组件挂载时执行的代码
        this.timerID = setInterval(
            () => this.tick(),
            1000 //每秒更新一次
        );
    }

    tick() {//定时器
        this.setState({
            date: new Date()//创建当前时间
        });
        this.getNoteList();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);//清理计时器

    }


//保存新笔记
    saveNewNote(){
        let filter={
            object:{
                object:{

                }
            }
        }
        // Math.floor(Math.random()*(max-min+1)+min);//产生随机数
        var createID=Math.floor(Math.random()*(1000-1+1)+1);

        var preurl1 = "http://localhost:8080/addNote?no=";
        var preurl2= "&content=";
        var url = preurl1+createID+preurl2 + this.state.content;//后台增加笔记的url地址

        var getInformation ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            /* json格式转换 */
            body:JSON.stringify(filter)
        }
        fetch(url,getInformation)
            .then(response => response.json())
            .then(responseJson=>{
                // 返回的数据 根据自己返回的json格式取值
                debugger;
                console.log(responseJson)
                this.setState({
                    inputValue:responseJson.content

                })
            })
    }

    //更新新笔记内容
    handelNewNoteChange(){
        let value=this.refs.textarea.value;
        this.setState({
            content: value
        })
    }

// 按ID请求后台数据查询
    changeInputValue(){
        /* 查询数据的格式 */
        let filter={
            object:{
                object:{

                }
            }
        };
        var preurl = "http://localhost:8080/showNote?no=";
        var url = preurl + this.state.inputvalue;
        // var url ="http://localhost:8080/showNote?no=2";
        var getInformation ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            /* json格式转换 */
            body:JSON.stringify(filter)
        };
        fetch(url,getInformation)
            .then(response => response.json())
            .then(responseJson=>{
                // 返回的数据 根据自己返回的json格式取值
                debugger;
                console.log(responseJson)
                this.setState({
                    inputValue:responseJson.content
                })
            })
    }

//从后台获得title列表
    getNoteList(){
        /* 查询数据的格式 */
        let filter={
            object:{
                object:{

                }
            }
        };

        var url ="http://127.0.0.1:8080/getNoteList";
        var getInformation ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            /* json格式转换 */
            body:JSON.stringify(filter)
        }
        fetch(url,getInformation)
            .then(response => response.json())
            .then(responseJson=>{
                // 返回的数据 根据自己返回的json格式取值.
                debugger;
                console.log(responseJson);
                this.setState({
                    mynote: responseJson
                })

            })
    }

    //获得查询框的值，并更新内置的inputvalue值
    handelChange(){
        let value=this.refs.input.value
        this.setState({
            inputvalue: value
        })
    }


    NewNote(){
        this.setState({
            content: ''
        })
    }

    clickNoteTitle(no,con){
        this.setState({
            // clickid: e.target.key,
            content: con,

        })
    }

    render() {
        return (
            <div className="container">
                <div className="leftbox">
                    <button className='newNote' onClick={this.NewNote.bind(this)} >新建</button>
                    {this.state.mynote.map(
                        //传递点中的ID
                        u => <div key={u.no} onClick={this.clickNoteTitle.bind(this,u.no,u.content)}>{u.no}:{u.title}</div>)
                    }
                    <h3>yyyoo</h3>


                </div>

                <div className="rightbox">
                    <p>
                        请输入查询ID：
                        <input type="number" ref='input' onChange = {this.handelChange.bind(this)}/>
                        <button className='red-btn' onClick={this.changeInputValue.bind(this)} >查询</button>
                    </p>

                    <p>
                        查询结果：
                        <input value={this.state.inputValue}/>
                    </p>

                    <p>
                        <h2>新笔记:</h2>
                        <textarea cols="30" rows="8"  ref='textarea' value={this.state.content} onChange = {this.handelNewNoteChange.bind(this)}/>
                        <button className='saveNewNote' onClick={this.saveNewNote.bind(this)} >保存</button>
                        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                    </p>

                </div>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Toggle/>
                <Button type="primary">Button</Button>
                <h3>djfldskjflk</h3>

                <Display/>
            </div>

        );
    }
}

// ReactDOM.render(
//
// <Toggle />,
//     document.getElementById('root')
// );

export default App;

// export default Toggle;
