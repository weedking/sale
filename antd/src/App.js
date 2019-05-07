// import React ,{ Component } from 'react';

import React from 'react';
// import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon, Button, Table, Input, Popconfirm, Form, } from 'antd';


const { SubMenu } = Menu;
const { Header, Content, Footer, Sider,} = Layout;

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    save = (e) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <Input
                                                ref={node => (this.input = node)}
                                                onPressEnter={this.save}
                                                onBlur={this.save}
                                            />
                                        )}
                                    </FormItem>
                                ) : (
                                    <div
                                        className="editable-cell-value-wrap"
                                        style={{ paddingRight: 24 }}
                                        onClick={this.toggleEdit}
                                    >
                                        {restProps.children}
                                    </div>
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: 'name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        }, {
            title: 'age',
            dataIndex: 'age',
            editable: true,
        }, {
            title: 'address',
            dataIndex: 'address',
            editable: true,
        },{
            title: 'address2',
            dataIndex: 'address',
            editable: true,
        },{
            title: 'address3',
            dataIndex: 'address',
            editable: true,
        },{
            title: 'address4',
            dataIndex: 'address',
            editable: true,
        },{
            title: 'address5',
            dataIndex: 'address',
            editable: true,
        },{
            title: 'address6',
            dataIndex: 'address',
            editable: true,
        }, {
            title: 'address7',
            dataIndex: 'address',
            editable: true,
        },{
            title: 'address8',
            dataIndex: 'address',
            editable: true,
        },{
            title: 'address9',
            dataIndex: 'address',
            editable: true,
        },{
            title: 'address10',
            dataIndex: 'address',
            editable: true,
        },{
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => (
                this.state.dataSource.length >= 1
                    ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="javascript:;">Delete</a>
                        </Popconfirm>
                    ) : null
            ),
        }];

        this.state = {
            dataSource: [{
                key: '0',
                name: 'Edward King 0',
                age: '32',
                address: 'London, Park Lane no. 0',
            }, {
                key: '1',
                name: 'Edward King 1',
                age: '32',
                address: 'London, Park Lane no. 1',
            }],
            count: 2,
        };
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: 32,
            address: `London, Park Lane no. ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    Add a row
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}



// const columns = [
//     {
//         title: '客户ID',  width: 150, dataIndex: 'id', key: 'id',
//     },
//
//     {
//         title: '公司名称', width: 150, dataIndex: 'name', key: 'name',
//     },
//
//     {
//         title: '客户来源',  width: 150, dataIndex: 'source', key: 'source',
//     },
//     {
//         title: '所在城市', sorter: true, width: 150, dataIndex: 'city', key: 'city',
//     },
//
//     {
//         title: '联系人', dataIndex: 'contacts', key: 'contacts', width: 150,
//     },
//     {
//         title: '职务', dataIndex: 'title', key: 'title', width: 150,
//     },
//     {
//         title: '联系电话', dataIndex: 'phone', key: 'phone', width: 150,
//     },
//     {
//         title: '提交时间', dataIndex: 'inputtime', key: 'inputtime', width: 150,
//     },
//     {
//         title: '需求产品', dataIndex: 'need', key: 'need', width: 150,
//     },
//     {
//         title: '邮箱', dataIndex: 'email', key: 'email', width: 150,
//     },
//     {
//         title: '公司地址', dataIndex: 'address', key: 'address', width: 150,
//     },
//     {
//         title: '公司网址', dataIndex: 'url', key: 'url', width: 150,
//     },
//     {
//         title: '备注', dataIndex: 'remark', key: 'remark', width: 150,
//     },
//     // { title: '11', dataIndex: 'address', key: '9' },
//     {
//         title: 'Action',
//         key: 'operation',
//         fixed: 'right',
//         width: 150,
//         // render: () => <a href="javascript:;">修改</a>,
//         render: () => (
//             <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
//                 <a href="javascript:;">Delete</a>
//             </Popconfirm>
//         ) ,
//     },
// ];

const data = [];
for (let i = 0; i < 5; i++) {
    data.push({
        key: i,
        name: `哈哈Edrward ${i}`,
        age: 32,
        phone: 13760271577,
        address: `London Park no. ${i}`,
    });
}

class CustomerList extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '客户ID',  width: 150, dataIndex: 'id', key: 'id',
            },

            {
                title: '公司名称', width: 150, dataIndex: 'name', key: 'name',
            },

            {
                title: '客户来源',  width: 150, dataIndex: 'source', key: 'source',
            },
            {
                title: '所在城市', sorter: true, width: 150, dataIndex: 'city', key: 'city',
            },

            {
                title: '联系人', dataIndex: 'contacts', key: 'contacts', width: 150,
            },
            {
                title: '职务', dataIndex: 'title', key: 'title', width: 150,
            },
            {
                title: '联系电话', dataIndex: 'phone', key: 'phone', width: 150,
            },
            {
                title: '提交时间', dataIndex: 'inputtime', key: 'inputtime', width: 150,
            },
            {
                title: '需求产品', dataIndex: 'need', key: 'need', width: 150,
            },
            {
                title: '邮箱', dataIndex: 'email', key: 'email', width: 150,
            },
            {
                title: '公司地址', dataIndex: 'address', key: 'address', width: 150,
            },
            {
                title: '公司网址', dataIndex: 'url', key: 'url', width: 150,
            },
            {
                title: '备注', dataIndex: 'remark', key: 'remark', width: 150,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => (
                    this.state.dataSource.length >= 1
                        ? (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(this.state.dataSource.key)}>
                                <a href="javascript:;">Delete</a>

                            </Popconfirm>
                        ) : null
                ),
            }

            // {
            //     title: 'operation',
            //     dataIndex: 'operation',
            //     render: (text, record) => (
            //         this.state.dataSource.length >= 1
            //             ? (
            //                 <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
            //                     <a href="javascript:;">Delete</a>
            //                 </Popconfirm>
            //             ) : null
            //     ),
            // }
            ];

        this.state = {
            dataSource: data,
            get1:'123'
        };
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        dataSource.splice(key, 1, {
            key: 6,
            name: `新的 `,
            age: 32,
            phone: 1376,
            address: `地址`,

        });

        this.setState({ dataSource: dataSource.filter(item => item.key !== key),
                get1:key});


    }


    render() {
        return (
            <Table columns={this.columns} dataSource={this.state.dataSource} scroll={{x: 1500, y: 300}}/>
        // {this.state.get1}

        );

    }
}

class Display extends React.Component{
    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
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
                                    <Menu.Item key="1">用户列表</Menu.Item>
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
                            {/*Content*/}
                            <CustomerList/>//列表样式之一
                            {/*<EditableTable />//列表样式之二*/}
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
                {/*<Toggle/>*/}
                {/*<Button type="primary">Button</Button>*/}
                {/*<h3>djfldskjflk</h3>*/}


                <Display/>
                {/*<EditableTable />*/}
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
