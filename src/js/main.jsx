import React,{ Component } from 'react';
import '../scss/main.scss';



class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      data:this.props.allData,
      prevDate:this.props.allData,
      level:1
    };
  }
  componentDidMount() {
  }
  nextClick(child,level,activeDate){
    this.setState({
      data:child,
      level:level,
      prevDate:activeDate
    });
  }
  prevClick(parent,level){
    this.setState({
      data:parent,
      level:parent[0].level
    });
  }
	render() {
    let topTitle;
    if(this.state.level===1){
      topTitle=()=>{
        return (<li className="flexWrap topTitle">
          <div className="flexWidth id">ID</div>
          <div className="flexWidth level">层级</div>
          <div className="flexWidth name">分类名称</div>
          <div className="flexWidth option">操作</div>
        </li>);
      }
    }else{
      topTitle=()=>{
        return (<li className="flexWrap topTitle">
          <div className="flexWidth id">ID</div>
          <div className="flexWidth prev">上级类目层级</div>
          <div className="flexWidth prevCategory">上级类目</div>
          <div className="flexWidth level">层级</div>
          <div className="flexWidth name">分类名称</div>
          <div className="flexWidth option">操作</div>
        </li>);
      }
    }

    let activeDate=this.state.data;
		return (
      <div className="mainTable">
        <ul>
          {topTitle()}
          {
            activeDate.map((item,index)=>{
              console.log(item,index);// {name: "服装", level: 1, child: Array(1)} 0
              return (<li key={index} className="flexWrap">
                <div className="flexWidth id">{index}</div>
                <div className="flexWidth level">{item.level}级类目</div>
                <div className="flexWidth name">{item.name}</div>
                <div className="flexWidth option flexWrap">
                  {
                    this.state.level===1
                  ?
                  (
                    <a className="flexWidth" href="javascript:void(0);" onClick={this.nextClick.bind(this,item.child,item.level,activeDate)}>下一层级</a>
                  )
                  :
                  (
                    item.child&&item.child.length>0
                    ?
                    (
                      <div className="flexWrap">
                        <a className="flexWidth" href="javascript:void(0);">上一层级</a>
                        <a className="flexWidth" href="javascript:void(0);">下一层级</a>
                      </div>
                    )
                    :
                    (
                      <a className="flexWidth" href="javascript:void(0);" onClick={this.prevClick.bind(this,this.state.prevDate)}>上一层级</a>
                    )
                  )
                  }

                </div>
              </li>)
            })
          }
        </ul>
      </div>
		)
	}
}

export default Main;
