const { Modal, Button, TimePicker } = antd;

let MyCom = React.createClass({
    getInitialState(){
        return {data: ["06:20"]};
    },
    addTimeItem(index){
        const {data} = this.state;
        let arr = [...data];
        arr.splice(index+1, 0, "");
        this.setState({data:[...arr]});
    },
    removeTimeItem(index){
        console.log(index)
        const {data} = this.state;
        let arr = [...data];
        arr.splice(index, 1)
        this.setState({data:[...arr]});
    },
    render(){
        console.log(this.state);
        return (
            <div>
                {
                    this.state.data.map((el,index)=>{
                        return  <div key={index}>
                            <TimePicker defaultValue={el ?moment(el, 'HH:mm') : null} format="HH:mm"/>
                            <a href="javascript:void(0);" onClick={this.addTimeItem.bind(this, index)}>增加</a>
                            <a href="javascript:void(0);" onClick={this.removeTimeItem.bind(this, index)}> 删除</a>
                        </div>
                    })
                }
            </div>
        )
    }
})

ReactDOM.render(<MyCom/>, document.getElementById('root'));