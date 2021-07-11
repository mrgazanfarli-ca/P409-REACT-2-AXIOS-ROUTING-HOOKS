import React from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

import { CommonPageContainer } from '../hoc/CommonPageContainer';

interface IUserPostsParams {
    id: string;
}

export const UserPosts: React.FC = () => {
    const { id } = useParams<IUserPostsParams>();

    return (
        <CommonPageContainer>
            <Row>
                <Col xs={12}>this is posts page of user with id {id}</Col>
            </Row>
        </CommonPageContainer>
    )
}
