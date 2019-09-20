import React from 'react';
import { Table} from 'antd';
import store from "../../../store";

class OtherGrade extends React.Component {
    storeState = store.getState().gradeState;
    storeStateMain = store.getState();
    constructor(props) {
        super(props);
        this.state = {
            tableLoading: true,
            grade: null,
            locale: {
                filterTitle: '筛选',
                filterConfirm: '确定',
                filterReset: '重置',
                emptyText: '空数据',
            },
            GradeCol: [{
                title: "学年",
                dataIndex: "xuenian",
                key: "xuenian"
            }, {
                title: "学期",
                dataIndex: "xueqi",
                key: "xueqi"
            }, {
                title: "课程代码",
                dataIndex: "kechengdaima",
                key: "kechengdaima"
            }, {
                title: "课程名称",
                dataIndex: "kechengmingcheng",
                key: "kechengmingcheng"
            }, {
                title: "课程性质",
                dataIndex: "kechengxingzhi",
                key: "kechengxingzhi"
            }, {
                title: "课程归属",
                dataIndex: "kechengguishu",
                key: "kechengguishu"
            }, {
                title: "学分",
                dataIndex: "xuefen",
                key: "xuefen"
            }, {
                title: "绩点",
                dataIndex: "jidian",
                key: "jidian"
            }, {
                title: "成绩",
                dataIndex: "chengji",
                key: "chengji"
            }, {
                title: "辅修标记",
                dataIndex: "fuxiubiaoji",
                key: "fuxiubiaoji"
            },{
                title: "补考成绩",
                dataIndex: "bukaochengji",
                key: "bukaochengji",
            },{
                title: "重修成绩",
                dataIndex: "chongxiuchengji",
                key: "chongxiuchengji"
            },{
                title: "开课学院",
                dataIndex: "kaikexueyuan",
                key: "kaikexueyuan"
            },{
                title: "备注",
                dataIndex: "beizhu",
                key: "beizhu"
            },{
                title: "重修标记",
                dataIndex: "chongxiubiaoji",
                key: "chongxiubiaoji"
            }]
        };
        this.handleGetGrade();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);
    }
    handleStoreChange() {
        this.storeState = store.getState().gradeState;
        this.handleGetGrade();
    }
    handleGetGrade() {
        this.setState({
            tableLoading: true
        });
        fetch(this.storeStateMain.backendHost+"/selectGrade?year=" + this.storeState.year
            + "&semester=" + this.storeState.semester
            + "&courseNature=" + this.storeState.courseNature
            + "&btn=" + this.storeState.btn
            + "&token="+this.storeStateMain.token
            +"&r="+Math.random(), {
            credentials: "include",
            cache: 'no-cache',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(rep => {
            return rep.json();
        }).then(json => {
            this.setState({
                grade: json.item.grade,
                tableLoading: false
            })
        }).catch()
    }

    render() {
        return (
            <div>
                <h2>成绩查询</h2>
                <Table columns={this.state.GradeCol} dataSource={this.state.grade} loading={this.state.tableLoading}
                       rowKey={(record, index) => index} locale={this.state.locale}/>
            </div>
        );
    }
}

export default OtherGrade;