import * as React from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import './Category.css';
import CustomInput from 'reactstrap/lib/CustomInput';
import { Category, CategoriesActionTypes } from './store/categories/types';
import { ConnectedReduxProps } from './store';
//import { ApplicationState } from './store';

interface IProps {
  title: string;
  id: number;
  selection?: cleanSelection,
}

interface IState {
    status: string,
    collapse: boolean,
    selection: Selection,
}

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Category[]
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof CategoriesActionTypes.FETCH_REQUEST
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps

interface cleanSelection {
    entry_id : number,
    entry_name: string,
}

export default class CategoryCard extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        this.onEntering = this.onEntering.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = { 
            collapse: false, 
            status: 'Closed',
            selection: (props.selection)? props.selection : undefined,
            selection_name: (props.selection_name)? props.selection_name : undefined,
         };
    }

    onEntering() {
        this.setState({ status: 'Opening...' });
    }

    onEntered() {
        this.setState({ status: 'Opened' });
    }

    onExiting() {
        this.setState({ status: 'Closing...' });
    }

    onExited() {
        this.setState({ status: 'Closed' });
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

  public render () {
    const title: string = this.props.title;
    const id: number = this.props.id;
    const selection: cleanSelection | undefined = this.props.selection;
    return (
        <div>
            <Card onClick={this.toggle} className="ponter">
                <CardBody> 
                    <div className="category-title">{title}</div>
                    <div>
                        {selection !== undefined &&
                            <CustomInput
                                type="checkbox"
                                id={"picked_" + id}
                                label={title + " : " + selection.entry_name}
                                checked
                                disabled />
                        } 
                        {selection == undefined &&
                            <CustomInput
                                type="checkbox"
                                id={"notpicked_" + id}
                                label={title + " not yet picked"}
                                disabled />
                        }
                        </div> 
                </CardBody>
            </Card>
            <Collapse
                isOpen={this.state.collapse}
                onEntering={this.onEntering}
                onEntered={this.onEntered}
                onExiting={this.onExiting}
                onExited={this.onExited}
            >
                <Card>
                    <CardBody>
                        {
                            this.props.children
                        }
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    );
  }
}


// Card styles
const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

// set up the type shape info ... (TBD)
type TCategory = {  
  display_name: string;
  display_content: string;
  category_id: number;  
}
