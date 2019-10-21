import React from "react";
import { Button, Col, Row } from "antd";

export const Navbar = () => {
  return (
    <Row>
      <Col span={4}>LOGO</Col>
      <Col span={4} offset={16}>
        <Row type="flex" justify="space-around" align="middle">
          <Col>
            <Button type="primary">Get started</Button>
          </Col>
          <Col>
            <Button type="default">Login</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
