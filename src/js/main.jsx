import React,{ Component } from 'react';
import '../scss/main.scss';


class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      data:this.props.allData,
      level:1,
      prevLevel:0,
      prevName:'',
    };
    Global.level1=this.props.allData;
  }
  componentDidMount() {
  }
  nextClick(child,level,activeDate,prevLevel,prevName){
    if(!Global['level'+level]){
      Global['level'+level]=activeDate;
    }

    this.setState({
      data:child,
      level:level,
      prevLevel:prevLevel,
      prevName:prevName,
    });
  }
  prevClick(activeLevel,name){
    let parent;
    let prevParent;

    parent=Global['level'+activeLevel];
    prevParent=Global['level'+(activeLevel-1)];

    if(activeLevel===1){
      prevParent=null;
    }

    /*console.log(parent);
    console.log(prevParent);*/

    let level=parent&&parent[0].level;
    let prevLevel=prevParent&&prevParent[0].level;
    let prevName=prevParent&&prevParent[0].name;

    this.setState({
      data:parent,
      level:level,
      prevLevel:prevLevel,
      prevName:prevName,
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
              //console.log(item,index);// {name: "服装", level: 1, child: Array(1)} 0
              return (<li key={index} className="flexWrap">
                <div className="flexWidth id">{index}</div>
                {item.level>1?<div className="flexWidth prev">{this.state.prevLevel}级类目</div>:''}
                {item.level>1?<div className="flexWidth prevCategory">{this.state.prevName}</div>:''}
                <div className="flexWidth level">{item.level}级类目</div>
                <div className="flexWidth name">{item.name}</div>
                <div className="flexWidth option flexWrap">
                  {
                    this.state.level===1
                  ?
                  (
                    <a className="flexWidth" href="javascript:void(0);" onClick={this.nextClick.bind(this,item.child,item.child[0].level,activeDate,item.level,item.name)}>下一层级</a>
                  )
                  :
                  (
                    item.child&&item.child.length>0
                    ?
                    (
                      <div className="flexWrap">
                        <a className="flexWidth" href="javascript:void(0);" onClick={this.prevClick.bind(this,item.level,item.name)}>上一层级</a>
                        <a className="flexWidth" href="javascript:void(0);" onClick={this.nextClick.bind(this,item.child,item.child[0].level,activeDate,item.level,item.name)}>下一层级</a>
                      </div>
                    )
                    :
                    (
                      <a className="flexWidth" href="javascript:void(0);" onClick={this.prevClick.bind(this,item.level,item.name)}>上一层级</a>
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
