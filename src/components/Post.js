import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';


import {createPost, oneCity, deletePost, allCities, editPost} from './Util';


const ID_TOKEN_KEY= 'id_token';

export default class Post extends Component {

  constructor(props){
    console.log("props are: ", props)
    super(props)
    this.state= {
      title:'',
      content:'',
      city: this.props.cities.name,
      author:'',
      uniqueId:'',
      posts:this.props.posts,
      toBeUpdated:false
    }
    this.handlePostSubmit= this.handlePostSubmit.bind(this);
    this.handleContentChange= this.handleContentChange.bind(this);
    this.loadPostsFromServer= this.loadPostsFromServer.bind(this);
    this.handleEditSubmit= this.handleEditSubmit.bind(this);
    this.handleEditChange= this.handleEditChange.bind(this);

  }

  // componentDidUpdate(){
  // }
  loadPostsFromServer(){
    oneCity(this.state.city).then(res=> {
      console.log("res is ", res);
      this.setState({
        posts:res
      })
      console.log("working from loadpsotfromserver", this.state.posts);
    })
  }
  //   componentWillUnmount(){
  //     setInterval(0);
  //   }
  componentDidMount(){
    console.log("the city in DidMount are", this.state.city)
    this.loadPostsFromServer();
    setInterval(this.loadPostsFromServer, this.props.pollInterval)
  }

  handleDelete(id){
    console.log("going to delete" , id);
    deletePost(id);
  }
  handleEditSubmitForm(id,e){
    console.log("edit in submitform ", id);
    e.preventDefault();
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      uniqueId:id,
    })
    window.scrollTo(0,document.body.scrollHeight);

  }

  handleEditSubmit(e){
    e.preventDefault();
    let id = this.state.uniqueId;
    console.log('going to edit', this.state.uniqueId);
    let post = this.state;
    console.log("updated info called post", post);
    editPost(id,post)
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
    })
  }

  handleEditChange(e){
    this.setState({
      content: this.refs.contentEdit.value,
      title: this.refs.titleEdit.value,
      // author:this.refs.usernameEdit.value,
      city:this.state.city
    })

  }

  handlePostSubmit(e){
    e.preventDefault();
    let post= this.state;
    console.log(post,'post here ');
    createPost(post)
      this.refs.content.value='';
      this.refs.title.value='';
      this.refs.username.value='';
  }

  handleContentChange(e){
    this.setState({
      content: this.refs.content.value,
      title: this.refs.title.value,
      author:this.refs.username.value,
      city:this.state.city
    })
  }


  render() {
    let posts= this.state.posts
    let results= posts.map( (post)=> {
    let authorVarName= post.author
    let authorVarPic= post.authorImg
    return (

   <div className="container" key={post._id} id="postContainer">

                    <div className="col-xs-7 postBox">
                        <div className="row">
                            <div className="col-xs-2">
                                <h5>{post.author}</h5>
                                <img src={post.authorImg} className="img-responsive" alt="user"/>
                                <div className="row">
                                    <p>
                                        <i className="icon-calendar"></i>
                                        Sept 16, 2012
                                    </p>
                                    <button onClick={this.handlePostEdit.bind(this, post._id)}>edit</button>
                                    <button onClick={this.handleDelete.bind(this, post._id)}>Delete</button>
                                </div>
                            </div>
                            <div className="col-xs-5">
                                <h5>
                                    <strong>Title:&nbsp;{post.title}</strong>
                                </h5>

                                <p className="postContent"></p>

                                <h5>
                                    <strong>Comment: &nbsp;</strong>{post.content}</h5>
                                <p>
                                    <a className="btn" href="#">Comment</a>
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

        )
      })
      if(!this.state.toBeUpdated){
      return (
        <div>
        {results}
        <br/>
          <div>
          <h2>Write a post</h2>
            <form className='col-xs-4' onSubmit={this.handlePostSubmit}>
              <input placeholder="Title" type="text"
                ref='title' onChange={this.handleContentChange}/>
              <br/>
              <input placeholder="Enter thoughts here" type="text"
                ref='content' onChange={this.handleContentChange}/>
                <br/>
                  <input placeholder="Enter username" type="text"
                    ref='username' onChange={this.handleContentChange}/>
              <button type='submit'>Post</button>
            </form>
        </div>
        </div>
    )
  } else{
    return (
      <div>
      {results}
    <div>
    <h2>Edit This post</h2>
      <form onSubmit={this.handleEditSubmit}>
        <input placeholder="Title" type="text"
          ref='titleEdit' onChange={this.handleEditChange}/>
        <br/>
        <input placeholder="Enter thoughts here" type="text"
          ref='contentEdit' onChange={this.handleEditChange}/>
        <button type='submit'>Save</button>
      </form>
  </div>
  </div>
)
  }
  }

}

