import React, { Component } from 'react';
import './App.css';
import CategoryCard from './Category';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Jumbotron, Container } from 'reactstrap';
import { normalize } from 'path';
import { Next } from 'react-bootstrap/lib/Pagination';


const TITLE =  'Ballot Time'

const GET_REST = {
  categories: '/categories',
  entries: '/entries',
  selections: '/selections',
};

type TEntry = {
  entry_id: number,
  display_name: string,
  featured_image: string,
  featuredVideo: string,
  display_content: string,
  category_id: number,
};
type TCategory = {
  category_id: number,
  display_content: string,
  display_name: string,
  entries: TEntry[],
  selection?: number,
  selection_name?: string,
};
type TSelection = {
  id: number,
  category_id: number,
  entry_id: number,
};

class App extends Component {
  state = {
    categories: [{
      display_name: "",
      selection: 0,
      selection_name: "",
      display_content: "",
      category_id: 0,
      entries: [{
        entry_id: 0,
        display_name: "",
        featured_image: "",
        featuredVideo: "",
        display_content: "",
        category_id: 0
      }]
    }],
    entries: [{
      entry_id: 0,
      display_name: "",
      featured_image: "",
      featuredVideo: "",
      display_content: "",
      category_id: 0
    }],
    selections: [{
      id: 0,
      category_id: 0,
      entry_id: 0
    }],
    post: '',
    errors: null,
    isLoading: true,
  }

  /*
Redux

store:
  categories: {
    x: {
      category_id: x,
      display_name: A,
      display_content: B,
      order: 0,
    }
  }
  entries: {
    y: {
      entry_id: y,
      display_name: "",
      featured_image: "",
      featuredVideo: "",
      display_content: "",
      category_id: 0,
      order: 0,
    }
  }
  selections: {
    x: { 
      category_id: x, 
      entry_id: y, 
    }
  }

  const ids_by_order =
      Object.values(categories)
            .reduce((ordered_ids, category) => {
                        ordered_ids[category.order] = category.id
                        return ordered_ids
                    }, [])

  ids_by_order.map(id => categories[id])
  */

  updatePick = (e: any) => {
    const entry_id = e.target.dataset.entry;
    const category_id = e.target.dataset.category;
    this.setState({post: entry_id});
    console.log('sending: ' + category_id + ' : '+ entry_id);
    //uupdate or new
    const updated = this.sendPost(category_id, entry_id);
  };

  sendPost = async (category_id: number, entry_id: number) => {
    const response = await fetch('/selections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "category_id": Number(category_id), "entry_id": Number(entry_id), "user_id": 0 }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  render() {
    // get the state
    const { categories } = this.state;
    const items = categories.map(category => ({
      title: <h2>{category.display_name}</h2>,
      content: <p>{category.display_content}</p>
    }));
    console.log(items);
    if (this.state.errors) {
      return <p>Aw Snap - there was an error - hint: check the console</p>;
    }
    if (this.state.isLoading) {
      return <p>Loading…</p>;
    }
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
            <div className="container" key={category.category_id}>
              <CategoryCard 
                title={category.display_name} 
                id={category.category_id}
                selection={category.selection}
                selection_name={category.selection_name}>
                  <Row>
                {
                    category.entries.map(entry => (
                      <Col sm="6" key={entry.entry_id}>
                      <Card>
                        <CardImg top width="100%"
                          src={entry.featured_image}
                          className="h-50 mh-50"
                          alt={"Image for" + entry.display_name} />
                        <CardBody>
                          <CardTitle>{entry.display_name}</CardTitle>
                          <CardSubtitle>Card subtitle</CardSubtitle>
                          <CardText>{entry.display_content}</CardText>
                          <Button onClick={this.updatePick.bind(this)}
                            data-entry={entry.entry_id}
                            data-category={entry.category_id}>
                            Select {entry.display_name}
                          </Button>
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
    //this.onFetchFromBackEnd(GET_GRAPHQL);
    this.onGetDataFromAPI(GET_REST);
  }

  onGetDataFromAPI = (URL: { categories: string, entries: string, selections: string}) => {
    let entries: TEntry[] = [];  
    fetch(URL.entries)
    .then(result => result.json())
    .then(local_entries => {
      console.log('Entries:' + local_entries);
      entries = local_entries;
      this.setState({ entries: local_entries });
    })
    .then(() => {
      fetch(URL.categories)
      .then(result => result.json())
      .then(categories => {
        categories.map((category: TCategory) => {
          let local_entries: TEntry[] = [];
          entries.filter(function (entry: TEntry) {
            if (entry.category_id === category.category_id) {
              //category.entries.push(entry);
              local_entries.push(entry);
            }
          })
          category.entries = local_entries;
        });
      this.setState({ categories: categories });
      });
    })
    .then(() => {
      fetch(URL.selections)
        .then(result => result.json())
        .then(selections => {
          this.normalizeSelections(selections);
          this.setState({ selections: selections, isLoading: false })
        });
    });
  };

  normalizeSelections = (selections: TSelection[]) => {
    let categories: TCategory[] = this.state.categories;
    selections.map((selection: TSelection) => {
      let category = categories.find(category => category.category_id == selection.category_id);
      if (category) {
        category.selection = selection.entry_id;
        let entries: TEntry | undefined = this.state.entries.find(entry => entry.entry_id == selection.entry_id);
        if (entries) {
          category.selection_name = entries.display_name;
        }
      }
    });
    this.setState({ categories: categories });
  };
}

export default App;
