import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const TITLE =  'Ballot Time'

const axiosBackEndGraphQL = axios.create({
  baseURL: 'http://127.0.0.1:3001/graphql',
});

const GET_CATEGORIES = `
{
  categories2 {
    categoryId
    displayName
    displayContent
  }
}`;

type ICategory = {  
  dislayName: string;
  displayContent: string;
  categoryId: number;  
}[]

class App extends Component {
  state = {
    categories: [{
      displayName: "",
      displayContent: "",
      categoryId: 0,
    }],
    errors: null,
  }
  render() {
    // get the state
    const { categories } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{TITLE}</h1>
          {categories.map(category => (
          //  <Category category={displayName} />
          <h4 key={category.categoryId}>{category.displayName}</h4>
          ))}
        </header>
      </div>
    );
  }



  componentDidMount() {
    this.onFetchFromBackEnd();
  }

  onFetchFromBackEnd = () => {
    axiosBackEndGraphQL
      .post('', { query: GET_CATEGORIES })
      .then(result => {
          console.log(result.data.data.categories2);
          this.setState(() => ({
            categories: result.data.data.categories2,
            errors: result.data.errors,
          }));
        }
      );
  };
}

const Category = ({ category = {} }) => (
  <div>
    <p>
      <strong>Category: {category}</strong>
    </p>
  </div>
);
export default App;
