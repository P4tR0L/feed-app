import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Input from './components/Input';
import Button from './components/Button';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      url: '',
      incorrectLink: false,
      items: '',
      inStock: '',
      customLabel0: '',
      customLabel1: '',
      customLabel2: '',
      customLabel3: '',
      customLabel4: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ url: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/feed?url=${encodeURIComponent(this.state.url)}`)
      .then(response => response.json())
      .then(state => this.setState(state));
  }

  render() {
    return (
      <div className="App">
        <div className="App-wrapper">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Feed App</h2>
          <p>Podając link do feeda produktowego XML, możesz sprawdzić jego parametry.</p>
          <p>Wklej link, naciśnij przycisk i zaczekaj chwilę na wyniki.</p>
          <form id="feed-app" onSubmit={this.handleSubmit}>
            <Input
              id="url"
              type="text"
              value={this.state.url}
              onChange={this.handleChange}
              placeholder="Link do feeda"
            />
            <Button type="submit">Sprawdź</Button>
          </form>
          <div className="info">
          {this.state.items ? 
          <p className="info">Ilość wszystkich produktów: <span className="all">{this.state.items}</span></p>
          : null}
          {this.state.inStock ? 
          <p className="info">Ilość dostępnych produktów: <span className="instock">{this.state.inStock}</span></p>
          : null}
          {this.state.incorrectLink ? 
          <p className="alert">Podałeś nieprawidłowy link.</p>
          : null}
          </div>
          {this.state.customLabel0 || this.state.customLabel1 || this.state.customLabel2 || this.state.customLabel3 || this.state.customLabel4 ? 
            <table className="info-table">
              <thead>
                <tr>
                  <th></th>
                  <th>custom_label_0</th>
                  <th>custom_label_1</th>
                  <th>custom_label_2</th>
                  <th>custom_label_3</th>
                  <th>custom_label_4</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-title">Ilość produktów</td>
                  <td>{this.state.customLabel0}</td>
                  <td>{this.state.customLabel1}</td>
                  <td>{this.state.customLabel2}</td>
                  <td>{this.state.customLabel3}</td>
                  <td>{this.state.customLabel4}</td>
                </tr>
              </tbody>
            </table>
          : null} 
        </div>
      </div>
    );
  }
}

export default App;
