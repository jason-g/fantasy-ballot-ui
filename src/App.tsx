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
import { Redirect } from 'react-router';
import { UserState } from './store/user/types';
 


const TITLE =  'Ballot Time'

// Separate props from state and props from dispatch to their own interfaces.
interface PropsFromState {
  categories: CategoriesState,
  entries: EntriesState,
  selections: SelectionsState,
  user: UserState,
};

interface PropsFromDispatch {
  [key: string]: any,
};
interface OwnProps {
  //store: Store<ApplicationState>
  //history: History
  categories: CategoriesState,
  entries: EntriesState,
  selections: SelectionsState,
  user: UserState,
}
type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

const mapStateToProps = (state: PropsFromState): OwnProps => ({
  categories: state.categories,
  entries: state.entries,
  selections: state.selections,
  user: state.user,
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

  getEntryLabel = (category_id: number, entry: Entry) => {
    const selected = this.getSelection(category_id);
    if (selected && selected.entry_id == entry.entry_id) {
      return "Selected";
    }
    return "Select " + entry.display_name;
  }

  isEntrySelected = (category_id: number, entry: Entry) => {
    const selected = this.getSelection(category_id);
    if (selected && selected.entry_id == entry.entry_id) {
      return true;
    }
    return false;
  }

  render() {
    if (!this.props.user.authenticated) {
      console.log('No user... redirecting to Login page');
      return <Redirect to='/login' />;
    }
    // get the state
    const categories = this.props.categories.data;
    const entries = this.props.entries.data;
    const selections = this.props.selections.data;
    if (this.state.errors) {
      return <p>Aw Snap - there was an error - hint: check the console</p>;
    }
/*
        <header className="pp-header">
          <h1>{TITLE}</h1>
        </header>
        */
    return (
      <div className="App">
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
                      <EntryCard key={entry.entry_id} 
                        selected={this.isEntrySelected(category.category_id, entry)}
                        entry={entry}>
                        <Button onClick={this.updatePick.bind(this)}
                          data-entry={entry.entry_id}
                          data-category={entry.category_id}>
                          {this.getEntryLabel(category.category_id, entry)}
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
