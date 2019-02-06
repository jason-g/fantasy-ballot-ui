import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import { SelectionsState } from '../../store/selections/types';
import { connect } from 'react-redux';
import './progress.css';
import { UserState } from '../../store/user/types';
import { CategoriesState } from '../../store/categories/types';

interface PropsFromDispatch {
    [key: string]: any,
};
interface PropsFromState {
    selections: SelectionsState,
    categories: CategoriesState,
    user: UserState,
};
interface OwnProps {
    selections: SelectionsState | null,
    categories: CategoriesState,
    user: UserState,
}
interface myState {
    selections: SelectionsState | null,
    categories: CategoriesState,
    user: UserState,
}
type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

class BallotProgress extends React.Component<AllProps, myState> {
    constructor(props: any) {
        super(props);
        this.state = {
            selections: props.selections,
            categories: props.categories,
            user: this.props.user,
        }
    }
    render() {
        if (!this.props.selections.data || !this.props.categories.data) {
            return (
                <div></div
            >);
        }
        let selected = this.props.selections.data.length
        const total = this.props.categories.data.length; // todo count of categories
        if (!this.props.user.authenticated) {
            return (
            <div></div>
            );
        }
        return (
            <div className="ballot-progress flex-grow-1 flex-fill">
                <Progress color="warning" value={100 * selected / total} >
                    {selected + ' out of ' + total}
                </Progress>
            </div>
        ); 
    }
}

const mapStateToProps = (state: PropsFromState): OwnProps => ({
    selections: state.selections,
    categories: state.categories,
    user: state.user,
})

export default connect(mapStateToProps, {})(BallotProgress);