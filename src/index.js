import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ArticleView from './ArticleView'
import { Router, Route, browserHistory, IndexRoute} from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}></Route>
        <Route path="/article_view/:article_id" component={ArticleView}/>
    </Router>
    ,
  document.getElementById('root')
);
