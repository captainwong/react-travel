import React from "react";
import styles from "./SignInForm.module.css";
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { signIn, userSlice } from "../../redux/user/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SignInForm: React.FC = () => {
  const loading = useSelector(s => s.user.loading);
  const error = useSelector(s => s.user.error);
  const jwt = useSelector(s => s.user.token);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    
    if (error) {
      console.log('SignInForm.19', error);
      Modal.error({
        title: 'Error',
        content: error,
      });
      dispatch(userSlice.actions.clearError());
    } else if (jwt !== null) {
      navigate('/');
    }
  }, [jwt, error, loading]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    dispatch(signIn({
      email: values.username,
      password: values.password,
    }));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles.form}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
