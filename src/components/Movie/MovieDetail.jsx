import React from 'react'
import { Button, Icon, Spin, Alert } from 'antd'

import fetchJSONP from 'fetch-jsonp'
import styles from '../../css/main.scss'

import { Rate } from 'antd';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export default class MovieDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {},
            isLoading: true

        }
    }
    render() {
        return <div>
            <Button type="link" onClick={this.goBack}>
                <Icon type="left" />返回电影列表
             </Button>
            {this.renderInfo()}
        </div>

    }
    // 返回按钮
    goBack = () => {
        this.props.history.go(-1)
    }

    //缓存图片机制，防止加载图片403
    getImages(_url) {
        if (_url !== undefined) {
            let _u = _url.substring(7);
            return 'https://images.weserv.nl/?url=' + _u;
        }
    }

    //加载中
    renderInfo = () => {
        if (this.state.isLoading) {
            return <Spin tip="Loading...">
                <Alert
                    message="玩命加载电影数据中"
                    description="精彩内容，马上呈现"
                    type="info"
                />
            </Spin>
        } else {
            return <div >
                <h1 style={{ textAlign: 'center', fontSize: '24px' }}>{this.state.info.title}({this.state.info.year})</h1>
                <div style={{ display: 'flex', flexGrow: 4, justifyContent: 'flex-start' }}>
                    <div style={{ flex: 1, padding: '0 20px' }}>
                        <img src={this.getImages(this.state.info.images.large)} alt="" />
                    </div>
                    <div style={{
                        padding: '0 10px 0 40px', flex: 2}}>
                        <p>导演：{this.state.info.directors.map(item => { return item.name }).join('/')}</p>
                        <p>主演：{this.state.info.casts.map(item => { return item.name }).join('/')}</p>
                        <p>类型：{this.state.info.genres.map(item => { return item }).join('/')}</p>
                        <p>上映时间：{this.state.info.pubdates.map(item => { return item }).join('/')}</p>
                        <p>语言：{this.state.info.languages.map(item => { return item }).join('/')}</p>
                        <p>片长：{this.state.info.durations.map(item => { return item })}</p>
                        <h4> 剧情简介：</h4>{this.state.info.summary}
                    </div>
                    <div style={{ flex: 2 }}>
                        <Rate disabled defaultValue={this.state.info.rating.average / 2} />
                        <div>评分：<span style={{fontSize:'18px',fontWeight:'bold'}}>{this.state.info.rating.average}</span></div>
                        <div>评价人数：<span>{this.state.info.ratings_count}</span></div>
                    </div>
                </div>

                <div >
                    <h4 style={{ padding: '10px 20px' }}>演员照片</h4>
                    {this.state.info.casts.map(item => {
                        return <div key={item.id} style={{ float: 'left', padding: '0 20px' }}>
                            <img
                                src={this.getImages(item.avatars.small)}
                                style={{ width: '115px', height: '160px' }} />
                            <p style={{ textAlign: 'center',paddingTop:'5px' }}>{item.name}</p>

                        </div>
                    })}

                </div>
            </div>


        }
    }
    handleChange = value => {
        this.setState({ value });
    };

    componentWillMount() {
        const url = `https://douban.uieee.com/v2/movie/subject/${this.props.match.params.id}`

        //es6 API 基于promise 封装的发起ajax请求方法
            fetchJSONP(url).then(response => {
                return response.json()
            }).then(data => {
                this.setState({
                    info: data,
                    isLoading: false
                })
            })


        //模拟数据
        // fetch('./Data/moviesInfo.json'
        // ).then(response => {
        //     return response.json()
        // }).then(data => {
        //     console.log(data);

        //     setTimeout(() => {
        //         this.setState({
        //             info: data,
        //             isLoading: false
        //         })
        //     }, 1000);
        // })
    }
}