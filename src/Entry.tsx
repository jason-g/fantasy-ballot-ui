import * as React from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Panel } from 'react-bootstrap';
import './Category.css';
import CustomInput from 'reactstrap/lib/CustomInput';
import { Store } from 'redux';
import { Category, CategoriesActionTypes, CategoriesState } from './store/categories/types';
import categoriesSaga from './store/categories/sagas';
import { ConnectedReduxProps } from './store';
import { connect } from 'react-redux';
import { EntriesState } from './store/entries/types';
import { SelectionsState } from './store/selections/types';
//import { ApplicationState } from './store';

interface IProps {
  title: string;
  id: number;
//  store: Store<ApplicationState>,
  selection?: number | undefined,
  selection_name? : string | undefined,
}

interface IState {
    status: string,
    collapse: boolean,
    selection: number,
    selection_name: string,
}

// Separate state props + dispatch props to their own interfaces.

interface PropsFromState {
  categories: CategoriesState,
  entries: EntriesState,
  selections: SelectionsState
};

interface PropsFromDispatch {
  [key: string]: any,
};
// Any additional component props go here.
interface OwnProps {
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

class EntryCard extends React.Component<IProps, any> {
  public render () {
    const title: string = this.props.title;
    const id: number = this.props.id;
    const selection: number | undefined = this.props.selection;
    const selection_name: string | undefined = this.props.selection_name;
    return (
        <div>
           Entry 
        </div>
    );
  }
}

export default connect(mapStateToProps)(EntryCard);
