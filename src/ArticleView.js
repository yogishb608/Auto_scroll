import React, { Component } from 'react';
import './App.css';
import { Media, Row, Col, Button, Glyphicon } from 'react-bootstrap'
import data from './data.json';
import InfiniteScroll from 'react-infinite-scroller';
var low = 5;
class ArticleView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: data.articles[this.props.params.article_id].comment,
            article_comments: [],
            isInfiniteLoading: true
        }

        this.loadMoreData = this.loadMoreData.bind(this)
        this.likeIt = this.likeIt.bind(this)
    }

    likeIt(val, nest) {
        var element;

            if (document.getElementById(val).style.backgroundColor === "cyan") {
                document.getElementById(val).style.backgroundColor = "white";
                document.getElementById(val).style.color = "black";
            } else {
                document.getElementById(val).style.backgroundColor = "cyan";
                document.getElementById(val).style.color = "white";
            }

    }

    componentWillMount() {
        var rows = [];

        console.log(this.state.comments)
        for (var i = 0; i < 5; i++) {
            rows[i] = this.state.comments[i]
        }
        this.setState({ article_comments: this.state.article_comments.push(rows) })
        this.setState({ article_comments: this.state.article_comments[0] })
    }

    loadMoreData() {
        var rows = [];
        var high = low + 5;
        console.log("high" + high)
        console.log(this.state.comments.length)
        if (high > this.state.comments.length) {
            console.log('high')
            high = this.state.comments.length
            this.setState({ isInfiniteLoading: false })
            return
        }
        for (var i = low; i < high; i++) {
            rows[i] = this.state.comments[i]
        }
        low = low + 5;
        this.setState({ article_comments: this.state.article_comments.concat(rows) })
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col mdOffset={4} md={6}>    
                        <h2>ArticleView</h2>
                        <p>{data.articles[this.props.params.article_id].title}</p>
                        <p>{data.articles[this.props.params.article_id].body}</p>
                        <p>Comments:</p>
                        <p></p>
                        
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadMoreData.bind(this)}
                            hasMore={this.state.isInfiniteLoading}
                            loader={<div className="loader">Loading ...</div>}
                        >
                            {
                               this.state.article_comments.map(function(data,index){
                                return(
                                    <div className="card" key={index}>
                                        <Media >
                                          <Media.Left align="top">
                                            <img width={64} height={64} src={require('./ninja.png')} alt="Image"/>
                                          </Media.Left>
                                          <Media.Body>
                                            <Media.Heading>{data.author}</Media.Heading>
                                            <p>{data.comment}</p>
                                                {
                                                    data.replies.map(function(data,index){
                                                        return(
                                                        <div className="card" key={index}>
                                                           <Media>
                                                               <Media.Left align="top">
                                                                    <img width={32} height={32} src={require('./ninja.png')} alt="Image"/>
                                                               </Media.Left>
                                                               <Media.Body>
                                                                    <Media.Heading>{data.author}</Media.Heading>
                                                                    <p>{data.comment}</p>
                                                               </Media.Body>
                                                           </Media>
                                                        </div>
                                                        )
                                                    }.bind(this))
                                                }
                                          <Button onClick={this.likeIt.bind(this,index,0)} id={index} bsSize="xsmall"><Glyphicon glyph="star" /> Like</Button>
                                          </Media.Body>
                                        </Media>
                                    </div>
                                )
                               }.bind(this))

                            }
                        </InfiniteScroll>

                    </Col>
                </Row>
            </div>
        );
    }
}

export default ArticleView;
