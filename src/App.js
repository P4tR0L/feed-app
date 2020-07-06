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
      customLabelCounts0: '',
      customLabelCounts1: '',
      customLabelCounts2: '',
      customLabelCounts3: '',
      customLabelCounts4: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  makeList() {

    if (this.state.customLabel0) {
      let list = this.state.customLabelCounts0;

      let ul = document.querySelector('.custom0-list');
      ul.style.display = 'block';
      ul.innerHTML = '';
      document.querySelector('.App-wrapper').appendChild(ul);

      let li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML += '<strong>custom_label_0</strong>';

      list.forEach(el => {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML += `${el[0]}: <strong>${el[1]}</strong>, dostępnych: <strong>${el[2]}</strong>`;
      });
    }

    if (this.state.customLabel1) {
      let list = this.state.customLabelCounts1;

      let ul = document.querySelector('.custom1-list');
      ul.style.display = 'block';
      ul.innerHTML = '';
      document.querySelector('.App-wrapper').appendChild(ul);

      let li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML += '<strong>custom_label_1</strong>';

      list.forEach(el => {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML += `${el[0]}: <strong>${el[1]}</strong>, dostępnych: <strong>${el[2]}</strong>`;
      });
    }

    if (this.state.customLabel2) {
      let list = this.state.customLabelCounts2;

      let ul = document.querySelector('.custom2-list');
      ul.style.display = 'block';
      ul.innerHTML = '';
      document.querySelector('.App-wrapper').appendChild(ul);

      let li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML += '<strong>custom_label_2</strong>';

      list.forEach(el => {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML += `${el[0]}: <strong>${el[1]}</strong>, dostępnych: <strong>${el[2]}</strong>`;
      });
    }

    if (this.state.customLabel3) {
      let list = this.state.customLabelCounts3;

      let ul = document.querySelector('.custom3-list');
      ul.style.display = 'block';
      ul.innerHTML = '';
      document.querySelector('.App-wrapper').appendChild(ul);

      let li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML += '<strong>custom_label_3</strong>';

      list.forEach(el => {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML += `${el[0]}: <strong>${el[1]}</strong>, dostępnych: <strong>${el[2]}</strong>`;
      });
    }

    if (this.state.customLabel4) {
      let list = this.state.customLabelCounts4;

      let ul = document.querySelector('.custom4-list');
      ul.style.display = 'block';
      ul.innerHTML = '';
      document.querySelector('.App-wrapper').appendChild(ul);

      let li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML += '<strong>custom_label_4</strong>';

      list.forEach(el => {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML += `${el[0]}: <strong>${el[1]}</strong>, dostępnych: <strong>${el[2]}</strong>`;
      });
    }
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

  componentDidUpdate() {
    this.makeList();
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
          {this.state.customLabel0 ? <ul className="custom0-list"></ul> : null}
          {this.state.customLabel1 ? <ul className="custom1-list"></ul> : null}
          {this.state.customLabel2 ? <ul className="custom2-list"></ul> : null}
          {this.state.customLabel3 ? <ul className="custom3-list"></ul> : null}
          {this.state.customLabel4 ? <ul className="custom4-list"></ul> : null}
        </div>
      </div>
    );
  }
}

export default App;
