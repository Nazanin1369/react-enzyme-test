import React from "react";

const Test = () => <div>Test</div>;

export class Tag extends React.Component {
  render() {
    return this.props.hide ? null : <a href={this.props.address}>Click</a>;
  }
}

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Welcome to React Enzyme training"
    };

    this.handleChangeCourse = this.handleChangeCourse.bind(this);
  }

  componentDidMount() {
    console.log("Component Mounted!");
  }

  handleChangeCourse(e) {
    console.log("button clickedß");
    this.setState({
      text: "Welcome to the new course"
    });
  }

  handleStrings(text) {
    return text.length > 0;
  }

  render() {
    return (
      <div className="App">
        <Test />
        <Tag address="netflix.com" />
        <h1>Hello React Jest Anzyme</h1>
        <h2>Start editing to see some magic happen!</h2>
        <p>{this.state.text}</p>
        <button onClick={this.handleChangeCourse}>Change course</button>
      </div>
    );
  }
}
