import React from 'react'
import { Rate } from 'antd'
import styles from '../../css/movie_item.scss'
export default class MovieItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div className={styles.box} onClick={this.movieDetail}>
            <img src={this.getImages(this.props.images.small)} alt="" className={styles.img} />
            <h4 className={styles.title}>电影名称:{this.props.title}</h4>
            <h4 className={styles.year}>上映年份:{this.props.year}年</h4>
            <h4 className={styles.genres}>电影类型:{this.props.genres.join(',')}</h4>
            <Rate disabled defaultValue={this.props.rating.average / 2} />
        </div>

    }
    //缓存图片机制，防止加载图片403
    getImages(_url) {
        if (_url !== undefined) {
            let _u = _url.substring(7);
            return 'https://images.weserv.nl/?url=' + _u;
        }
    }
    movieDetail = () => {
        this.props.history.push('/movie/detail/'+this.props.id)
        
    }
}