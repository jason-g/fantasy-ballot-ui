import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import CategoryCard from './Category';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Jumbotron, Container } from 'reactstrap';


const TITLE =  'Ballot Time'

// GraphQL getter stuffs
const axiosBackEndGraphQL = axios.create({
  baseURL: '/graphql',
});

/*
TBD workaround
Revisit this once hasMany bug is fixed in loopback
*/
const GET_GRAPHQL = `
{
  categories {
    categoryId
    displayName
    displayContent
  }
  entries {
    entryId
    displayName
    featuredImage
    featuredVideo
    displayContent
    categoryId
  }
}`;

type TEntry = {
  entryId: number,
  displayName: string,
  featuredImage: string,
  featuredVideo: string,
  displayContent: string,
  categoryId: number
};

// set up the tye shape info ... (TBD)
type TCategory = {
  categoryId: number,
  displayContent: string,
  displayName: string,
  entries: TEntry[]
};

class App extends Component {
  state = {
    categories: [{
      displayName: "",
      displayContent: "",
      categoryId: 0,
      entries: [{
        entryId: 0,
        displayName: "",
        featuredImage: "",
        featuredVideo: "",
        displayContent: "",
        categoryId: 0
      }]
    }],
    entries: [{
      entryId: 0,
      displayName: "",
      featuredImage: "",
      featuredVideo: "",
      displayContent: "",
      categoryId: 0
    }],
    errors: null,
  }
  render() {
    // get the state
    const { categories } = this.state;
    const items = categories.map(category => ({
      title: <h2>{category.displayName}</h2>,
      content: <p>{category.displayContent}</p>
    }));
    console.log(items);
    return (
      <div className="App">
        <header className="pp-header">
          <h1>{TITLE}</h1>
        </header>
        <div>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">91st Academy Awards</h1>
              <p className="lead">Live on Sunday</p>
              <hr className="my-2" />
              <p>February 24th, 2019 at 8:00 Eastern Time</p>
            </Container>
          </Jumbotron>
        </div>
        {
          categories.map(category => (
            <div className="container">
              <CategoryCard 
                title={category.displayName} 
                id={category.categoryId}>
                  <Row>
                {
                    category.entries.map(entry => (
                      <Col sm="6" key={entry.entryId}>
                      <Card>
                        <CardImg top width="100%"
                          src={entry.featuredImage}
                          className="h-50 mh-50"
                          alt={"Image for" + entry.displayName} />
                        <CardBody>
                          <CardTitle>{entry.displayName}</CardTitle>
                          <CardSubtitle>Card subtitle</CardSubtitle>
                          <CardText>{entry.displayContent}</CardText>
                          <Button>Select {entry.displayName}</Button>
                        </CardBody>
                      </Card>
                    </Col>
                    ))
                }
                  </Row>
              </CategoryCard>
            </div>
            ))
        }
      </div>
    );
  }

  componentDidMount() {
    this.onFetchFromBackEnd(GET_GRAPHQL);
  }

  onFetchFromBackEnd = (URL: string) => {
    let categories: TCategory[] = [];
    axiosBackEndGraphQL
      .post('', { query: URL })
      .then(result => {
          console.log(result.data.data);
          //TBD - revisit when loopback fixes the hasMany bug
          result.data.data.categories.map(function (category: TCategory) {
            let entries: TEntry[] = [];
            console.log('Found Category:' + category.displayName);
            result.data.data.entries.filter(function (entry: TEntry) {
              if (entry.categoryId === category.categoryId) {
                //category.entries.push(entry);
                entries.push(entry);
              }
            })
            console.log('Found Entries:' + entries);
            category.entries = entries;
          });
          this.setState(() => ({
            categories: result.data.data.categories,
            entries: result.data.data.entries,
            errors: result.data.errors,
          }));
        }
      )
      .then(() => {
        this.rebuildData();
      });
  };

  // rebuild data due to bug in loopback hasMany
  rebuildData = () => {
    for (const key in this.state.categories) {
      let category = this.state.categories[key];
      let entries: {
        entryId: number,
        displayName: string,
        featuredImage: string,
        featuredVideo: string,
        displayContent: string,
        categoryId: number
      }[] = [];
      this.state.entries.filter(function (entry) {
        if (entry.categoryId === category.categoryId) {
          //category.entries.push(entry);
          entries.push(entry);
        }
      })
      console.log (category.displayName);
      console.log (entries);
    }
  }
}

export default App;
