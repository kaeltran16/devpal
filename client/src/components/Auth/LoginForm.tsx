import React, { FormEvent } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Typography
} from "antd";
import styled from "styled-components";
import { WrappedFormUtils } from "antd/lib/form/Form";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AppForm = styled(Form)`
  width: 30%;
  height: 80%;
`;

const CallActionButton = styled(Button)`
  width: 15rem;
`;
const { Title, Text } = Typography;
const FormComponent = ({ form }: { form: WrappedFormUtils<any> }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  const { getFieldDecorator } = form;
  return (
    <Container>
      <AppForm onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <Form.Item>
          <Title level={1}>Login</Title>
          <Text>Please enter your credentials to start using the app.</Text>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "Email is not valid!"
              }
            ]
          })(
            <Input
              size="large"
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
          ,
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              size="large"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Row type="flex" justify="space-between">
            <Col>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
            </Col>
            <Col>
              <a href="">Forgot password</a>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row type="flex" justify="center">
            <Col>
              <CallActionButton type="primary" size="large">
                Log in
              </CallActionButton>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col>
              Don't have an account?! <a href="">register now!</a>{" "}
            </Col>
          </Row>
        </Form.Item>
      </AppForm>
    </Container>
  );
};

export const LoginForm = Form.create({ name: "login_form" })(FormComponent);
