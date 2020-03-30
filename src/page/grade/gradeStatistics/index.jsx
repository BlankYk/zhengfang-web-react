import React, { Component } from 'react';
import { Table, Alert } from 'antd';
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
                }, {
                    title: "未通过学分",
                    dataIndex: "weitongguoxuefen",
                    key: "weitongguoxuefen"
                }, {
                    title: "获得学分",
                    dataIndex: "huodexuefen",
                    key: "huodexuefen"
                }, {
                    title: "还需学分",
                    dataIndex: "haixuxuefen",
                    key: "haixuxuefen"
                }, {
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
                }, {
                    title: "未通过学分",
                    dataIndex: "weitongguoxuefen",
                    key: "weitongguoxuefen"
                }, {
                    title: "获得学分",
                    dataIndex: "huodexuefen",
                    key: "huodexuefen"
                }, {
                    title: "还需学分",
                    dataIndex: "haixuxuefen",
                    key: "haixuxuefen"
                }, {
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
                }, {
                    title: "学期",
                    dataIndex: "xueqi",
                    key: "xueqi"
                }, {
                    title: "获得学分",
                    dataIndex: "huodexuefen",
                    key: "huodexuefen"
                }, {
                    title: "不及格课程及学分",
                    dataIndex: "bujigekechengjixuefen",
                    key: "bujigekechengjixuefen"
                }, {
                    title: "未通过学分",
                    dataIndex: "weitongguoxuefen",
                    key: "weitongguoxuefen"
                }, {
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
            } else {
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
                <Alert type="error" message="成绩信息及名称完全来源于学校正方系统" />
                <h3>成绩全览(不知道该叫啥)</h3>
                <Alert type="info" message={this.state.gradeStatistics.averageScorePoint + " " + this.state.gradeStatistics.totalPeople + " " + this.state.gradeStatistics.sumOfGradePoints} />
                <Alert type="info" message={this.state.gradeStatistics.creditStatistics} />
                <Table columns={this.state.Col2} dataSource={this.state.gradeStatistics.data2} loading={this.state.tableLoading}
                    rowKey={(record, index) => index} locale={this.state.locale} />
                <h3>选修</h3>
                <Alert type="info" message="我校规定大学3年选修(公共选修课)要修够6分,不能少于6分,也不可超过6分,如果学分不足可使用驾照等证件抵消(别问我有哪些,自己去问辅导员)" />
                <Table columns={this.state.Col6} dataSource={this.state.gradeStatistics.data6} loading={this.state.tableLoading}
                    rowKey={(record, index) => index} locale={this.state.locale} />
                <h3>这个好像是重修 <span role="img" aria-label="horse">🐎</span>?</h3>
                <Table columns={this.state.Col6} dataSource={this.state.gradeStatistics.data7} loading={this.state.tableLoading}
                    rowKey={(record, index) => index} locale={this.state.locale} />
            </div>
        )
    }
}

export default GradeStatistics;