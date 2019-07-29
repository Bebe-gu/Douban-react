import React from 'react'
import fetchJSONP from 'fetch-jsonp'
import { Spin, Alert, Pagination } from 'antd'
import MovieItem from './MovieItem.jsx'
import styles from '../../css/main.scss'

export default class MovieList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            nowPage: parseInt(props.match.params.page) || 1,
            pageSize: 12, //每页显示多少条
            total: 0,    //当前电影总数
            isLoading: true,
            movieType: props.match.params.type  //传过来的url中的分类
        }
    }
    componentWillMount() {
        this.loadMovieListByTypeAndPage();
    }
    //监听地址栏变化，重置state中的参数数据，然后可以重新发送请求
    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoading: true,
            nowPage: parseInt(nextProps.match.params.page) || 1,
            movieType: nextProps.match.params.type
        }, function () {
            this.loadMovieListByTypeAndPage()
        })

    }
    render() {
        return <div>
            {this.renderList()}
        </div>
    }
    renderList = () => {
        if (this.state.isLoading) {
            return <Spin tip="Loading...">
                <Alert
                    message="玩命加载电影数据中"
                    description="精彩内容，马上呈现"
                    type="info"
                />
            </Spin>
        } else {
            //flex布局
            return <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', paddingBottom: '10px' }}>

                    {/* return  <div className={`${styles.clearfix} ${styles.position_relative}`}> */}
                    {this.state.movies.map(item => {
                        return <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>
                    })}
                </div>
                <Pagination onChange={this.pageChanged} defaultCurrent={this.state.nowPage} total={this.state.total} pageSize={this.state.pageSize} size="small" className={styles.center} />
                {/* showTotal={(total,range) => { return `共${Math.ceil(this.state.total/this.state.pageSize)}页/${this.state.total}条电影` }}  */}
            </div>


        }
    }
    //点击页码显示数据 
    pageChanged = (page) => {
        //DOM操作
        //window.location.href = `/#/movie/${this.state.movieType}/${page}`
        //console.log(this.props.history);


        this.props.history.push('/movie/' + this.state.movieType + '/' + page)
    }

    loadMovieListByTypeAndPage = () => {
        //npm i fetch-jsonp 解决跨域
        //豆瓣热映 API https://douban.uieee.com/v2/movie/in_theaters
        //top250 API  https://douban.uieee.com/v2/movie/top250
        //即将上映 API  https://douban.uieee.com/v2/movie/coming_soon

        //接口文档地址  https://douban-api-docs.zce.me

        //开始获取数据索引
        const start = this.state.pageSize * (this.state.nowPage - 1)
        // //请求地址
        const url = `https://douban.uieee.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize}`

        // // // //es6 API 基于promise 封装的发起ajax请求方法
        fetchJSONP(url).then(response => {
            return response.json()
        }).then(data => {
            this.setState({
                isLoading: false,
                movies: data.subjects,
                total: data.total
            })
        })

        //模拟数据
        // fetch('./Data/' + this.state.movieType + '.json'
        // ).then(response => {
        //     return response.json()
        // }).then(data => {
        //     setTimeout(() => {
        //         this.setState({
        //             isLoading: false,
        //             movies: data.subjects,
        //             total: data.total
        //         })
        //     }, 1000);
        // })
    }
}

