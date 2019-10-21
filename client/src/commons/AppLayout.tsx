import React, { ReactChild } from "react";
import { Layout } from "antd";
import { Navbar } from "./Navbar";
import styled from "styled-components";

const { Content } = Layout;

const Header = styled(Layout.Header)`
  background: white;
`;

export const AppLayout = ({ children }: { children: ReactChild }) => {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content>{children}</Content>
    </Layout>
  );
};
