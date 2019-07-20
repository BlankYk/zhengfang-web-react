import React from "react";
import {Table} from "antd";

class FailedGrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            failedGrade: null,
            tableLoading: true,
            locale: {
                filterTitle: '筛选',
                filterConfirm: '确定',
                filterReset: '重置',
                emptyText: '空数据',
            },
            failedGradeCol: [{
                title: "课程性质",
                dataIndex: "kechengxingzhi",
                key: "kechengxingzhi"
            }, {
                title: "学分",
                dataIndex: "xuefen",
                key: "xuefen"
            }, {
                title: "课程代码",
                dataIndex: "kechengdaima",
                key: "kechengdaima"
            }, {
                title: "课程名称",
                dataIndex: "kechengmingcheng",
                key: "kechengmingcheng"
            }, {
                title: "最高成绩值",
                dataIndex: "zuigaochengjizhi",
                key: "zuigaochengjizhi"
            }, {
                title: "课程归属",
                dataIndex: "kechengguishu",
                key: "kechengguishu"
            }]
        };
        this.handleFailedGrade();
        this.handleFailedGrade = this.handleFailedGrade.bind(this);
    }

    handleFailedGrade() {
        fetch("/user/failedGrade?"+new Date().getMilliseconds(), {
            credentials: "include"
        }).then(rep => {
            return rep.json();
        }).then(json => {
            if (json.result === "success") {
                this.setState({
                    failedGrade: json.item.failedGrade,
                    tableLoading: false
                });
            }else{
                this.setState({
                    failedGrade: null,
                    tableLoading: false,
                    locale: {
                        emptyText: '请求异常!',
                    }
                })
            }
        });
    }

    render() {
        return (
            <div>
                <h2>未通过成绩</h2>
                <Table dataSource={this.state.failedGrade} loading={this.state.tableLoading}
                       columns={this.state.failedGradeCol} rowKey={(record, index) => index} locale={this.state.locale}/>
            </div>
        )
    }
}

export default FailedGrade;