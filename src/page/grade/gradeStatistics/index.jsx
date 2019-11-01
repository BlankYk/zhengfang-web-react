import React, { Component } from 'react';
import { Table } from 'antd';
import store from '../../../store'

class GradeStatistics extends Component {
    storeState = store.getState();
    constructor(props) {
        super(props);
        this.state = {
            tableLoading: true,
            gradeStatistics: {},
            locale: {
                filterTitle: '筛选',
                filterConfirm: '确定',
                filterReset: '重置',
                emptyText: '空数据',
            },
            Col2: [
                {
                    title: "课程性质名称",
                    dataIndex: "kechengxingzhimingcheng",
                    key: "kechengxingzhimingcheng"
                },{
                    title: "未通过学分",
                    dataIndex: "weitongguoxuefen",
                    key: "weitongguoxuefen"
                },{
                    title: "获得学分",
                    dataIndex: "huodexuefen",
                    key: "huodexuefen"
                },{
                    title: "还需学分",
                    dataIndex: "haixuxuefen",
                    key: "haixuxuefen"
                },{
                    title: "学分要求",
                    dataIndex: "xuefenyaoqiu",
                    key: "xuefenyaoqiu"
                }
            ],
            Col6: [
                {
                    title: "课程属性名称",
                    dataIndex: "kechengguishumingcheng",
                    key: "kechengguishumingcheng"
                },{
                    title: "未通过学分",
                    dataIndex: "weitongguoxuefen",
                    key: "weitongguoxuefen"
                },{
                    title: "获得学分",
                    dataIndex: "huodexuefen",
                    key: "huodexuefen"
                },{
                    title: "还需学分",
                    dataIndex: "haixuxuefen",
                    key: "haixuxuefen"
                },{
                    title: "学分要求",
                    dataIndex: "xuefenyaoqiu",
                    key: "xuefenyaoqiu"
                }
            ],
            Col7: [
                {
                    title: "学年",
                    dataIndex: "xuenian",
                    key: "xuenian"
                },{
                    title: "学期",
                    dataIndex: "xueqi",
                    key: "xueqi"
                },{
                    title: "获得学分",
                    dataIndex: "huodexuefen",
                    key: "huodexuefen"
                },{
                    title: "不及格课程及学分",
                    dataIndex: "bujigekechengjixuefen",
                    key: "bujigekechengjixuefen"
                },{
                    title: "未通过学分",
                    dataIndex: "weitongguoxuefen",
                    key: "weitongguoxuefen"
                },{
                    title: "是否警告",
                    dataIndex: "shifoujinggao",
                    key: "shifoujinggao"
                }
            ]
        }
        this.handleGetGrade();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);
    }

    handleStoreChange() {
        this.storeState = store.getState();
        this.handleGetGrade();
    }

    handleGetGrade() {
        this.setState({
            tableLoading: true
        });
        fetch(this.storeState.backendHost + "/selectGrade?year=" + this.storeState.gradeState.year
            + "&semester=" + this.storeState.gradeState.semester
            + "&courseNature=" + this.storeState.gradeState.courseNature
            + "&btn=" + this.storeState.gradeState.btn
            + "&token=" + this.storeState.token
            + "&r=" + Math.random(), {
            credentials: "include",
            cache: 'no-cache',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(rep => {
            return rep.json();
        }).then(data => {
            if (data.result === 'success') {
                this.setState({
                    gradeStatistics: data.item.gradeStatistics,
                    tableLoading: false
                })
            }else{
                this.setState({
                    grade: [],
                    tableLoading: false
                })
            }
        }).catch()
    }

    render() {
        return (
            <div>
                <h3>成绩全览(不知道该叫啥)</h3>
                <p>{this.state.gradeStatistics.averageScorePoint}&emsp;{this.state.gradeStatistics.totalPeople}&emsp;{this.state.gradeStatistics.sumOfGradePoints} </p>
                <p>{this.state.gradeStatistics.creditStatistics}</p>
                <Table columns={this.state.Col2} dataSource={this.state.gradeStatistics.data2} loading={this.state.tableLoading}
                    rowKey={(record, index) => index} locale={this.state.locale} />
                <h3>选修</h3>
                <Table columns={this.state.Col6} dataSource={this.state.gradeStatistics.data6} loading={this.state.tableLoading}
                    rowKey={(record,index) => index} locale={this.state.locale} />
                <h3>这个好像是重修 <span role="img" aria-label="horse">🐎</span>?</h3>
                <Table columns={this.state.Col6} dataSource={this.state.gradeStatistics.data7} loading={this.state.tableLoading}
                    rowKey={(record,index) => index} locale={this.state.locale} />
            </div>
        )
    }
}

export default GradeStatistics;