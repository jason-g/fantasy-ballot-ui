import React, { Component } from 'react';
import './App.css';
import CategoryCard from './Category';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Jumbotron, Container, Modal } from 'reactstrap';
import { Provider, connect } from 'react-redux';
import { CategoriesActionTypes, Category, CategoriesState } from './store/categories/types';
import { Entry, EntriesState } from './store/entries/types';
import { Selection, SelectionsState } from './store/selections/types';
import { ModalHeader, ModalFooter } from 'react-bootstrap';
import ModalBody from 'reactstrap/lib/ModalBody';
import EntryCard from './Entry';
 


const TITLE =  'Ballot Time'

// Separate props from state and props from dispatch to their own interfaces.
interface PropsFromState {
  categories: CategoriesState,
  entries: EntriesState,
  selections: SelectionsState
};

interface PropsFromDispatch {
  [key: string]: any,
};
interface OwnProps {
  //store: Store<ApplicationState>
  //history: History
  categories: CategoriesState
  entries: EntriesState
  selections: SelectionsState
}
type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

const mapStateToProps = (state: PropsFromState): OwnProps => ({
  categories: state.categories,
  entries: state.entries,
  selections: state.selections,
})

class App extends React.Component<AllProps> {
  state = {
    errors: null,
  }

  updatePick = (e: any) => {
    const entry_id = e.target.dataset.entry;
    const category_id = e.target.dataset.category;
    let id;
    const current_selection = this.getSelection(category_id);
    if (current_selection) {
      id = current_selection.id;
    }
    this.props.dispatch({
      type: "@@selections/SELECT_ENTRY",
      entry_id: entry_id,
      category_id: category_id,
      id: id,
    })
  };

  isLoading = () => {
    if (
      this.props.categories.loading
      || this.props.entries.loading
      || this.props.selections.loading
    ) {
      return true;
    }
    return false;
  }
  getSelection = (category_id: number) => {
    const selection = this.props.selections.data.find(selection => selection.category_id == category_id);
    if (!selection) {
      return undefined;
    }
    const entry = this.props.entries.data.find(entry => entry.entry_id == selection.entry_id);
    if (!entry) {
      return undefined;
    }
    return {entry_id: selection.entry_id, entry_name: entry.display_name, id: selection.id};
  };

  render() {
    // get the state
    const categories = this.props.categories.data;
    const entries = this.props.entries.data;
    const selections = this.props.selections.data;
    if (this.state.errors) {
      return <p>Aw Snap - there was an error - hint: check the console</p>;
    }

    return (
      <div className="App">
        <header className="pp-header">
          <h1>{TITLE}</h1>
        </header>
        <div>
          <Modal isOpen={this.isLoading()} className={this.props.className}>
            <ModalBody>
              Please wait a moment while we load things up...
            </ModalBody>
          </Modal>
        </div>
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
                selection={this.getSelection(category.category_id)}>
                  <Row>
                  {
                    entries.filter(entry => entry.category_id == category.category_id)
                    .map(entry => (
                      <EntryCard key={entry.entry_id} entry={entry}>
                        <Button onClick={this.updatePick.bind(this)}
                          data-entry={entry.entry_id}
                          data-category={entry.category_id}>
                          Select {entry.display_name}
                        </Button>
                      </EntryCard>
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

  /*
                  {
                    entries.filter(entry => entry.category_id == category.category_id)
                    .map(entry => (
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
  */

  componentDidMount() {
    this.props.dispatch({
      type: "@@categories/FETCH_REQUEST",
    })
    this.props.dispatch({
      type: "@@entries/FETCH_REQUEST",
    })
    this.props.dispatch({
      type: "@@selections/FETCH_REQUEST",
    })
  }
}

export default connect(mapStateToProps)(App);
