import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import styles from '../../css/main.scss'
import '../../css/staticStyle.css'

import MovieDetail from './MovieDetail.jsx'





const { Content, Sider } = Layout

import MovieList from './MovieList.jsx'
export default class Movie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return <Layout className={styles.h100}>
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[window.location.hash.split('/')[2]]}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="in_theaters">
                        <Link to="/movie/in_theaters/1" replace>
                            <Icon type="laptop" />
                            正在热映
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="coming_soon">
                        <Link to="/movie/coming_soon/1" replace>
                            <Icon type="calendar" />
                            即将上映
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="top250">
                        <Link to="/movie/top250/1" replace>
                            <Icon type="bar-chart" />
                            Top250
                    </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 10px', }}>
                {/* 内容区域 */}
                <Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        height: '100%'
                    }}
                >
                    <Switch>
                        {/* 电影详情 */}
                        <Route path="/movie/detail/:id" component={MovieDetail} exact></Route>
                        {/* 电影列表*/}
                        <Route path="/movie/:type/:page" component={MovieList} exact></Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout >

    }
}