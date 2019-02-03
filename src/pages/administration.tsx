import 'react-app-polyfill/ie9';
import React, { Component } from 'react';
import '../App.css';
import CategoryCard from '../Category';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {  Button, Jumbotron, Container, Modal } from 'reactstrap';
import { connect } from 'react-redux';
import { Category, CategoriesState } from '../store/categories/types';
import { Entry, EntriesState } from '../store/entries/types';
import { SelectionsState } from '../store/selections/types';
import ModalBody from 'reactstrap/lib/ModalBody';
import { Redirect } from 'react-router';
import { UserState } from '../store/user/types';
 
const TITLE =  'Administration Page'

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

class Administration extends React.Component<AllProps> {
  state = {
      errors: null,
  }

  updatePick = (e: any) => {
    const entry_id = e.target.dataset.entry;
    const category_id = e.target.dataset.category;
    const category = this.props.categories.data.find(category => category.category_id == category_id);
    if (!category) {
        console.log('something went wrong finding the category');
        return undefined;
    }
    category.winner = entry_id;
    this.props.dispatch({
        type: "@@categories/SELECT_WINNER",
        category: category, 
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

  getEntryLabel = (category: Category, entry: Entry) => {
    if (category.winner == entry.entry_id) {
      return "Winner: " + entry.display_name;
    }
    return "Select: " + entry.display_name;
  }

  preAuthCheck = () => {
    const tmpUser = localStorage.getItem('user');
    if (tmpUser) {
        let objUser = JSON.parse(tmpUser);
        objUser.username = localStorage.getItem('username') || 'Unknown User';
        // ToDo: Move this to central auth component
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        // const redirect = from.pathname;
        const redirect = '/administration';
        // ToDo add verify on token in auth api call
        this.props.dispatch({
            type: "@@user/ADD_TOKEN",
            user: JSON.stringify(objUser),
            redirect: redirect,
        });
    }
  }

  renderEntry = (category: Category, entry: Entry, index: number) => {
    return (
      <div  key={entry.entry_id}>
        <Button onClick={this.updatePick.bind(this)}
          className="mt-auto entry-button"
          data-entry={entry.entry_id}
          data-category={entry.category_id}>
          {this.getEntryLabel(category, entry)}
        </Button>
      </div>
    );
  }

  render() {
    if (!this.props.user.authenticated) {
      this.preAuthCheck();
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
              <h1 className="display-4">91st Academy Awards</h1>
              <hr className="my-2" />
              <p>Live on Sunday February 24th, 2019 at 8:00 Eastern Time</p>
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
                <div className="container">
                  <div className="card-deck d-flex align-items-stretch row entry-cards">
                  {
                    entries.filter(entry => entry.category_id == category.category_id)
                    .map((entry, index) => this.renderEntry(category, entry, index))
                  }
                  </div>
                </div>
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
  }
}

export default connect(mapStateToProps)(Administration);
