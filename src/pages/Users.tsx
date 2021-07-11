import React from 'react';
import { Col, Row, Table } from 'reactstrap';
import axios from 'axios';

import { IAsyncData, IUser } from '../models';

import { CommonPageContainer } from '../hoc/CommonPageContainer';
import { INITIAL_ASYNC_DATA } from '../consts';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { UsersList } from '../components/UsersList';

export const UsersPage: React.FC = () => {
    const [usersData, setUsersData] = React.useState<IAsyncData<IUser[]>>(INITIAL_ASYNC_DATA);

    React.useEffect(() => {
        setUsersData(oldData => ({ ...oldData, loading: true }));
        axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users').then(({ data }) => {
            setUsersData(oldData => ({ ...oldData, loading: false, data, error: undefined }));
        }).catch((error) => {
            setUsersData({ data: undefined, loading: false, error: error.toString() });
        });
    }, []);

    return (
        <CommonPageContainer>
            <Row>
                <Col xs={12}>
                    <h3 className="text-success mt-4">Users</h3>
                    {usersData.loading && <LoadingSpinner />}
                    {Boolean(usersData.error) && <h4 className="text-danger text-center">Error occurred while fetching data</h4>}
                    {!!usersData.data && (
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                            <UsersList users={usersData.data} />
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </CommonPageContainer>
    )
}
