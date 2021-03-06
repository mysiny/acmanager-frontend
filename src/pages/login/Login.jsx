import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from "./index.css";
import { connect } from 'dva';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({
            type: 'user/login',
            payload: { username: values.username, password: values.password },
        });
        }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.login_form}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className={styles.login_form_forgot} href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className={styles.login_form_button}>
            登录
          </Button>
          Or <a href="/register">现在注册!</a>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps(state) {
    // const { role, login_state, message } = state.login;
    return {
    //   role,
    //   login_state: login_state,
    //   message: message,
    //   loading: state.loading.models.users,
    };
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default connect(mapStateToProps)(WrappedNormalLoginForm);