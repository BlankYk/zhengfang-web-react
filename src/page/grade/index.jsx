import React from 'react';
import {GradeWrapper} from "./style";
import {Button, Select, Form, Row, Col, Empty,notification} from "antd";
import FailedGrade from "./failedGrade/failedGrade";
import OtherGrade from "./otherGrade/otherGrade";
import store from "../../store";
import {searchGrade} from "../../store/actionCreators";

class Grade extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);
    }

    handleStoreChange() {
        this.setState(store.getState());
    }

    handleOnSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (values.btn === 'Button2'){
                notification['warning']({
                    message: '警告',
                    description:
                        '查询对象为未通过成绩!',
                });
                let newState = {
                    year: values.year,
                    semester: values.semester,
                    courseNature: values.courseNature,
                    btn: values.btn
                };
                const action = searchGrade(newState);
                store.dispatch(action)
            }else if (values.year === '' && values.btn==='btn_xn'){
                notification['error']({
                    message: '错误',
                    description:
                        '请选择学年!',
                });
            }else if (values.semester === '' && values.btn === 'btn_xq'){
                notification['error']({
                    message: '错误',
                    description:
                        '请选择学期!',
                });
            }else{
                let newState = {
                    year: values.year,
                    semester: values.semester,
                    courseNature: values.courseNature,
                    btn: values.btn
                };
                const action = searchGrade(newState);
                store.dispatch(action)
            }
        });
    }

    render() {
        const yearNow = new Date().getFullYear();
        const {Option} = Select;
        const {getFieldDecorator} = this.props.form;
        const yearMap = [];
        for (let year = 2001; year <= yearNow; year++) {
            yearMap.push(year.toString() + "-" + (year + 1).toString());
        }
        const btn = this.state.gradeState.btn;
        let grade;
        if (btn === 'Button2') {
            grade = <FailedGrade/>
        } else if (btn === 'btn_xq' || btn === 'btn_xn' || btn === 'btn_zcj' || btn === 'btn_zg') {
            grade = <OtherGrade/>
        } else {
            grade = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'做出你的选择,面对现实吧!'}/>
        }
        return (
            <GradeWrapper>
                <h1>成绩单</h1>
                <Form onSubmit={this.handleOnSubmit.bind(this)} className={"gradeBox"}
                      layout={'inline'}>
                    <Row type="flex" justify="space-between">
                        <Col span={5}>
                            <Form.Item label="学年">
                                {getFieldDecorator('year', {initialValue: this.state.gradeState.year})(
                                    <Select className={"select"}>
                                        {yearMap.map((year) => (
                                            <Option key={year}>{year}</Option>
                                        ))}
                                    </Select>,
                                )}

                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item label="学期">
                                {getFieldDecorator('semester', {initialValue: this.state.gradeState.semester})(
                                    <Select className={"select"}>
                                        <Option value={"1"}>1</Option>
                                        <Option value={"2"}>2</Option>
                                        <Option value={"3"}>3</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item label="课程性质">
                                {getFieldDecorator('courseNature', {initialValue: this.state.gradeState.courseNature})(
                                    <Select className={"select"}>
                                        <Option value={"01"}>公共必修课</Option>
                                        <Option value={"02"}>专业必修课</Option>
                                        <Option value={"03"}>公共选修</Option>
                                        <Option value={"04"}>限选课</Option>
                                        <Option value={"05"}>实践课</Option>
                                        <Option value={"06"}>必修课</Option>
                                        <Option value={"07"}>省考</Option>
                                        <Option value={"08"}>统考</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item label="查询对象">
                                {getFieldDecorator('btn', {initialValue: 'Button2'})(
                                    <Select className={"select"}>
                                        <Option value={"Button2"}>未通过成绩</Option>
                                        <Option value={"btn_xq"}>学期成绩</Option>
                                        <Option value={"btn_xn"}>学年成绩</Option>
                                        <Option value={"btn_zcj"}>历年成绩</Option>
                                        <Option value={"btn_zg"}>课程最高成绩</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                        <Button htmlType="submit" className={'search'}>Search</Button>
                    </Row>
                </Form>
                {grade}
            </GradeWrapper>
        )
    }
}

export default Form.create()(Grade);