import React from 'react'
import { HashRouter, Route, Link,Switch,Redirect } from 'react-router-dom'
import styles from './css/main.scss'
import Home from './components/Home/Home.jsx'
import Movie from './components/Movie/Movie.jsx'
import About from './components/About/About.jsx'

import { Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout

export default class className extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillMount(){
        // console.log(window.location.hash.split('/'));    
    }
    render() {
        return <HashRouter>
        <Layout className="layout" className={styles.h100} ref="layout">

            {/* Header 头部区域 */}
            <Header>
                <div className={styles.logo} />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    // 默认选中项,用过key来控制选中
                    defaultSelectedKeys={[window.location.hash.split('/')[1]]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="home">
                        <Link to="/home" replace exact={'true'}>首页</Link>
                    </Menu.Item>
                    <Menu.Item key="movie">
                        <Link to="/movie/in_theaters/1" replace>电影</Link>
                    </Menu.Item>
                    <Menu.Item key="about">
                        <Link to="/about" replace>关于</Link>
                    </Menu.Item>
                </Menu>
            </Header>

            {/* 中间的 内容区域 */}
            <Content style={{ backgroundColor: '#fff', flex: 1 }}>
                <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/movie" component={Movie}></Route>
                <Route path="/about" component={About}></Route>
                <Redirect path="/" to='/home' />
                </Switch>
            </Content>

            {/* Footer 底部区域 */}
            <Footer style={{ textAlign: 'center' }}>
                Douban-React ©2019 Created by Bebe Gu
            </Footer>


        </Layout>
    </HashRouter>
            
        
    }
}