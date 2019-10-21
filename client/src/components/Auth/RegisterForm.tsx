import React, { FormEvent } from "react";
import { Button, Col, Form, Icon, Input, Row, Typography } from "antd";
import styled from "styled-components";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { Register } from "./auth.interfaces";
import { postData } from "../../utils";

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
    form.validateFields(async (err, values: Register) => {
      if (!err) {
        try {
          const data = await postData(
            "http://localhost:3050/api/user/",
            values
          );
          console.log(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
  };
  const { getFieldDecorator } = form;
  return (
    <Container>
      <AppForm onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <Form.Item>
          <Title level={1}>Register</Title>
          <Text>Please register your credentials to start using the app.</Text>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your user name!" }]
          })(
            <Input
              size="large"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="User name"
            />
          )}
          ,
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
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              size="large"
              type="password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("confirmPassword", {
            rules: [
              {
                required: true,
                message: "Please input your password confirmation!"
              }
            ]
          })(
            <Input
              size="large"
              type="password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Confirm password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Row type="flex" justify="center">
            <Col>
              <CallActionButton htmlType="submit" type="primary" size="large">
                Register
              </CallActionButton>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col>
              Already had an account?! <a href="">login now!</a>{" "}
            </Col>
          </Row>
        </Form.Item>
      </AppForm>
    </Container>
  );
};

export const RegisterForm = Form.create({ name: "login_form" })(FormComponent);
