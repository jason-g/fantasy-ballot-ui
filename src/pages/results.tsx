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
import { GlobalsState } from '../store/globals/types';
import { ResultsState, ByCategoryType } from '../store/results/types';
import {Bar, HorizontalBar} from 'react-chartjs-2';
 
const TITLE =  'Administration Page'

// Separate props from state and props from dispatch to their own interfaces.
interface PropsFromState {
  categories: CategoriesState,
  entries: EntriesState,
  selections: SelectionsState,
  user: UserState,
  globals: GlobalsState,
  results: ResultsState;
}

interface PropsFromDispatch {
  [key: string]: any,
};
interface OwnProps {
  categories: CategoriesState,
  entries: EntriesState,
  selections: SelectionsState,
  user: UserState,
  globals: GlobalsState,
  results: ResultsState,
}
type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

const mapStateToProps = (state: PropsFromState): OwnProps => ({
  categories: state.categories,
  entries: state.entries,
  selections: state.selections,
  user: state.user,
  globals: state.globals,
  results: state.results,
})

class Results extends React.Component<AllProps> {
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
        const redirect = '/results';
        // ToDo add verify on token in auth api call
        this.props.dispatch({
            type: "@@user/ADD_TOKEN",
            user: JSON.stringify(objUser),
            redirect: redirect,
        });
    }
  }

  sortProperties = (obj: any, sortedBy: any, isNumericSort: boolean, reverse: boolean) => {
    sortedBy = sortedBy || 1; // by default first key
    isNumericSort = isNumericSort || false; // by default text sort
    reverse = reverse || false; // by default no reverse

    var reversed = (reverse) ? -1 : 1;

    var sortable = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        sortable.push([key, obj[key]]);
      }
    }
    if (isNumericSort)
      sortable.sort(function (a, b) {
        return reversed * (a[1][sortedBy] - b[1][sortedBy]);
      });
    else
      sortable.sort(function (a, b) {
        var x = a[1][sortedBy].toLowerCase(),
          y = b[1][sortedBy].toLowerCase();
        return x < y ? reversed * -1 : x > y ? reversed : 0;
      });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
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
    let results = this.props.results.data;
    let isLocked = this.props.globals.data.map(
      globalSetting => {
        if (globalSetting.setting == 'isLocked') {
          return globalSetting.value;
        }
      }
    );
    if (this.state.errors) {
      return <p>Aw Snap - there was an error - hint: check the console</p>;
    }

    if (!isLocked[0]) {
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
              <p>Live Results are not avaiable until all submissions are locked</p>
            </Container>
          </Jumbotron>
        </div>
      </div>
      )
    }
    let data: any[] = [];
    if (!results) {
      return (
        <div>No results available yet ... please check back soon.</div>
      );
    }
    let categoryData = results.byCategory;
    let byCategoryResults = {
      labels: categoryData.labels,
      datasets: [
        {
          label: 'Winners per category',
          height: 200,
          width: 600,
          backgroundColor: 'rgba(239, 197, 113, 0.6)',
          borderColor: 'rgba(239, 197, 113, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(199, 21, 133, 0.6)',
          hoverBorderColor: 'rgba(199, 21, 133, 1)',
          data: categoryData.data,
        }
      ]
    };
    let userData = results.byUser;
    console.log('1:',userData);
    let userdata = this.sortProperties(userData, 'data', true, true)
    //let userdata = userData.sort(function (a: any, b: any) {
    //  return b.data - a.data;
    ///});
    console.log('2:',userdata);
    let byUserResults = {
      labels: userData.labels,
      datasets: [
        {
          label: 'The Leaders board',
          height: 200,
          width: 600,
          backgroundColor: 'rgba(199, 21, 133, 0.6)',
          borderColor: 'rgba(199, 21, 133,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 197, 113, 0.6)',
          hoverBorderColor: 'rgba(239, 197, 113, 1)',
          data: userData.data,
        }
      ],
      
    };
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
              <p>Live Results</p>
            </Container>
          </Jumbotron>
        </div>
        <div>
          <HorizontalBar data={byUserResults}
            width={100}
            height={500}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [{
                  ticks: {
                    min: 0,
                    stepSize: 1,
                  },
                  gridLines: {
                    display: false,
                  }
                }],
                xAxes: [{
                  ticks: {
                    min: 0,
                    stepSize: 1,
                  },
                  gridLines: {
                    display: false,
                  }
                }],
              },
            }}
        />
        </div>
        <div>
          <Bar data={byCategoryResults}
            width={100}
            height={500}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [{
                  ticks: {
                    min: 0,
                    stepSize: 1,
                  },
                  gridLines: {
                    display: false,
                  }
                }],
                xAxes: [{
                  ticks: {
                    min: 0,
                    stepSize: 1,
                  },
                  gridLines: {
                    display: false,
                  }
                }],
              },
            }}
          />
        </div>
        
      </div>
    );
  }


  componentDidMount() {
    if (this.props.user.authenticated) {
      this.props.dispatch({
        type: "@@globals/FETCH_GLOBALS",
      })
      this.props.dispatch({
        type: "@@results/FETCH_RESULTS",
      })
      this.props.dispatch({
        type: "@@entries/FETCH_REQUEST",
      })
    }
  }
}

export default connect(mapStateToProps)(Results);
