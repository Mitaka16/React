function WelcomeFunc({ name, children }) {
  return (
    <div>
      <h1>Bonjour {name}</h1>
      <p>{children}</p>
    </div>
  );
}

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h1>Bonjour {this.props.name}</h1>
        <p>{this.props.children}</p>
      </div>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timer = window.setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    const date = new Date();
    return (
      <div>
        Nous somme le {this.state.date.toLocaleDateString()}{" "}
        {this.state.date.toLocaleTimeString()}
      </div>
    );
  }
}

class Incrementer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { n: props.start }
    this.toggle = this.toggle.bind(this)
    this.reset = this.reset.bind(this)
  }

  componentDidMount() {
    this.play()
  }

  componentWillUnmount() {
    this.pause()
  }

  tick() {
    this.setState(function (state, props) { // Peut s'ecrire de cette facon: 
    return { n: state.n + props.step };     // this.setState((state, props) => ({n: this.state.n +1}))
    });
    }

  pause() {
      window.clearInterval(this.state.timer)
      this.setState({
          timer: null
      })
  }

  play() {
      window.setInterval(this.state.timer)
      this.setState({
       timer: window.setInterval(this.tick.bind(this), 1000)
      })
  }

  toggle() {
      return this.state.timer ? this.pause() : this.play()
  }

  label() {
      return this.state.timer ? 'Pause' : 'Play'
  }

  reset() {
      this.pause()
      this.play()
      this.setState((state, props) => ({n: props.start}))
  }

  render() {
    return <div>
    Valeur: {this.state.n} 
    <button onClick={this.toggle}>{this.label()}</button>
    <button onClick={this.reset}>Reset</button></div>
  }
}

  Incrementer.defaultProps = {
      start: 0,
      step: 1
  } 

//   class ManualIncrementer extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = {n: 0}
//     }

//     tick(e) {
//         e.preventDefault()
//         this.setState(function(state, props) {
//             return {n: state.n + 1}
//         })
//     }

//     render() {
//         return<div>Valeur: {this.state.n} <a href="http://grafikart.fr" onClick={this.tick.bind(this)}>Incrementer</a></div>
//     }

//   }

function Home() {
  return (
    <div>
      <Welcome name="Sarah" />
      <Welcome name="Mat" />
      <Clock />
      <Incrementer start={0} />
      {/* <Incrementer start={100} step={10} /> */}
      {/* <ManualIncrementer /> */}
    </div>
  );
}

ReactDOM.render(<Home />, document.querySelector("#app"));
