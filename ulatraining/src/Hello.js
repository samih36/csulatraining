import React from 'react';

class Hello extends React.Component
{
  constructor(props)
  {
    super(props);
    this.database = props.database;
    this.state = {
      yak: "",
      posts: { }
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.updatePostsFromSnapshot = this.updatePostsFromSnapshot.bind(this);
  }

  componentDidMount()
  {
    let dbref = this.database.ref('posts');
    dbref.on("value", this.updatePostsFromSnapshot)
  }

  updatePostsFromSnapshot(snapshot)
  {
    if (snapshot.exists())
    {
      this.setState({ posts: snapshot.val()});
    }
  }

  handleTextChange(event)
  {
    const val = event.target.value;
    this.setState({yak: val});
  }

  handleSubmission(event)
  {
    let post = this.database.ref('posts').push().key;
    this.database.ref('posts').child(post).set({content: this.state.yak, stamp: Date.now()});
  }

  render()
  {
    return <div>
      <h1>Type some text here</h1>
      <form>
        <input type="text" value={this.state.yak} onChange={this.handleTextChange}/>
        <br/>
        <input type="button" value="Submit" onClick={this.handleSubmission}/>
      </form>
      <br/><br/>
      <div>
        {
          Object.keys(this.state.posts).map(key =>
            <div>
              <h1>{this.state.posts[key].content}</h1>
              <p>{this.state.posts[key].stamp}</p>
            </div>
          )
        }
      </div>
    </div>;
  }
}

export default Hello;