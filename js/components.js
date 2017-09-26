class CommentForm extends React.Component {
	_handleSubmit(event) {
		event.preventDefault();
		let author = this._author;
		let body = this._body;
		this.props.addComment(author.value, body.value);
	}

	render() {
		return (
		<form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
			<label>Join the discussion</label>
			<div className="comment-form-fields">
				<input placeholder="Name:" ref={(input) => this._author = input}/>
				<textarea placeholder="Comment:" ref={(textarea) => this._body = textarea}></textarea>
			</div>
			<div className="comment-form-actions">
				<button type="submit">Post comment</button>
			</div>
		</form>
		);
	}
}

class Comment extends React.Component {
	render(){
		return (
			<div className="comment">
				<p className="comment-header">{this.props.author}</p>
				<p className="comment-body">{this.props.body}</p>
				<div className="comment-footer"> 
					<a href="#" className="comment-footer-delete">Delete Comment</a>
				</div>
			</div>
		);
	}
}

class CommentBox extends React.Component{
	constructor(){
		super();
		this.state = {
			showComments: false,
			comments: []
		};
	}
	
	_fetchComments() {
		const comments = [{id: 1, author: 'User1', body: 'Comment 1'},{id: 2, author: 'User2', body: 'Comment 2'}];
		this.setState({ comments });
	}
	
	componentWillMount() {
		this._fetchComments();
	}
	
	/*
	componentDidMount() {
		this._timer = setInterval(() => this._fetchComments(), 5000);
	}
	
	componentWillUnmount() {
		clearInterval(this._timer);
	}
	*/
	
	_getComments() {
		return this.state.comments.map((comment)=>{ 
									return (<Comment author={comment.author} body={comment.body} key={comment.id} />);
								});
	}
	
	_getCommentsTitle(commentCount) {
		if (commentCount === 0) {
			return 'No comments yet';
		} else if (commentCount === 1) {
			return '1 comment';
		} else {
			return `${commentCount} comments`;
		}
	}
	
	_handleClick() {
		this.setState({showComments: !this.state.showComments});
	}
	
	_addComment(author, body) {
		const comment = {id: this.state.comments.length + 1, author, body};
		this.setState({comments: this.state.comments.concat([comment])});
	}
	
	render(){
		let buttonText = 'Show comments';
		
		const comments = this._getComments();
		let commentNodes;
		
		if (this.state.showComments){
			buttonText = 'Hide comments';
			commentNodes = <div className="comment-list">{comments}</div>;
		}
		
		return(
			<div className="comment-box">
				<CommentForm addComment={this._addComment.bind(this)} />
				<h3>Comments</h3>
				<h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
				<button onClick={this._handleClick.bind(this)}>{buttonText}</button>
				{commentNodes}
			</div>
		);
	}
}

ReactDOM.render(<CommentBox />, document.getElementById('root'));