import React from 'react';

class ReadingModule extends React.Component
{
  constructor(props)
  {
    super(props);
    this.database = props.database;
    this.uid = props.uid; // user id
    this.course = props.course; // course name
    this.xmods = props.xmods; // the number of modules in the course
    this.state = {
      mod: props.mod, // the zero-based index of the module
      name: "",
      content: "",
    }

    this.updateNameAndContentFromSnapshot = this.updateNameAndContentFromSnapshot.bind(this);
    this.fetchMod = this.fetchMod.bind(this);
    this.handleAdvanceClick = this.handleAdvanceClick.bind(this);
  }

  componentDidMount()
  {
    // go ahead and render the first module
    this.fetchMod(this.state.mod);
  }

  fetchMod(modindex)
  {
    // Set state based on module contents
    let contentRef = this.database.ref("courses").child(this.course).child("modules").child(modindex);
    contentRef.once('value').then(this.updateNameAndContentFromSnapshot);
    this.setState({mod: modindex});
  }

  updateNameAndContentFromSnapshot(snapshot)
  {
    if (snapshot.exists())
    {
      this.setState(snapshot.val());
    }
  }

  handleAdvanceClick(event)
  {
    // Mark module as complete
    let userRef = this.database.ref("students").child(this.uid);
    userRef.child("courses").child(this.course).child(this.state.mod).set(true);

    // render the next module
    this.fetchMod(this.state.mod + 1);
  }

  render()
  {
    return <div>
      <h1>{this.course}</h1>
      <hr/>
      <h2>{this.state.name}</h2>
      <p>{this.state.content}</p>
      {
        // only show advance button when there's another module after this
        (this.state.mod < this.xmods - 1)
        ? <input type="button" value="advance" onClick={this.handleAdvanceClick}/>
        : null
      }
    </div>;
  }
}

export default ReadingModule;