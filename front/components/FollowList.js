import React from "react";
import { List, Button, Card } from "antd";
import Styled from "styled-components";
import { StopOutlined } from "@ant-design/icons";

const StyledList = Styled(List)`
margin: 0 20px;
`;

const FollowList = ({ header, data }) => {
    return (
        <>
            <StyledList
                grid={{ gutter: 4, xs: 2, md: 3 }}
                size="small"
                header={<div>{header}</div>}
                loadMore={<Button>더 보기</Button>}
                bordered
                dataSource={data}
                renderItem={(item) => (
                    <List.Item style={{ marginTop: 20 }}>
                        <Card actions={[<StopOutlined key="stop" />]}>
                            <Card.Meta description={item.nickname} />
                        </Card>
                    </List.Item>
                )}
            />
        </>
    );
};

export default FollowList;
