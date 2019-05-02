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
                    {/*<h3>yyy</h3>*/}


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

ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
);