import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor () {
		super()

		this.state = {
			tempo: 100,
			interval: undefined
		};

		this.commands = this.commands.bind(this);
	}
	componentWillMount () {
		const annyang = window.annyang;

		if (annyang) {
			window.annyang.addCommands(this.commands());
			window.annyang.start();
		}
	}

	commands () {
		const commands = {};
		
			for (let i = 1; i <= 300; i++) {
				commands[i] = () => {
					clearInterval(this.state.interval);
					this.setState({ tempo: `${i}`});
					this.audio(i);
				};
			}

			commands['start'] = () => {
				this.audio();
			};

			commands['stop'] = () => {
				clearInterval(this.state.interval);
			}
		
			return commands;
	}

	audio (time = this.state.tempo) {
		const sound = document.getElementById("audio");
		const tempo = 100000 / parseInt(time);

		const interval = setInterval(() => {
			sound.play();
		}, tempo);

		this.setState({ interval });
	}

  render() {
    return (
      <div className="tempo-container">
        <div className="tempo">{this.state.tempo}</div>
      </div>
    );
  }
}

export default App;
