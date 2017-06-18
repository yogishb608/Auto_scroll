import React, { Component } from 'react';
import './App.css';
import data from './data.json'
import { Link } from 'react-router';
import Infinite from 'react-infinite';
import {Row,Col} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller'
let low = 5;
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article_data: data.articles,
            article_payload: {},
            isInfiniteLoading: true
        }
        // this.load = this.load.bind(this);
    }

    componentWillMount() {
        var rows=[];
        // this.setState({ isInfiniteLoading: true })
        for (var i = 0; i < 5; i++) {
            rows[i]=data.articles[i]
        }
        this.setState({article_payload:rows})        
    }

    loadMoreData(){
        var rows=[];
        var high=low+5;
        this.setState({isInfiniteLoading:false})
        for (var i = low; i < high; i++) {
            rows[i]=data.articles[i]
        }
        this.setState({article_payload:this.state.article_payload.concat(rows)})
        // this.setState({isInfiniteLoading:false})
        low=low+5;
        console.log("low :"+low)
        this.setState({isInfiniteLoading:true})
    }

    render() {
        return (

            <div className="container">
                <Row>
                    <Col mdOffset={4} md={4}>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadMoreData.bind(this)}
                            hasMore={this.state.isInfiniteLoading}
                            loader={<div className="loader">Loading ...</div>}
                        >
                        {
                           this.state.article_payload.map(function(data,index){
                            return(
                                    <div className="card" key={index}>
                                        <Link to={"/article_view/"+index}><p>{data.title}</p></Link>
                                        <p>{data.body.substring(0,100)}</p>
                                    </div>
                                )
                           })   
                        }
                        </InfiniteScroll>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
