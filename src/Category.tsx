import * as React from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Panel } from 'react-bootstrap';
import './Category.css';
import CustomInput from 'reactstrap/lib/CustomInput';

interface IProps {
  title: string;
  id: number;
  selection?: number,
  selection_name? : string,
}

interface IState {

}

export default class CategoryCard extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        this.onEntering = this.onEntering.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false, status: 'Closed' };
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

            //<Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{title}</Button>
            //<h5>Current state: {this.state.status}</h5>
  public render () {
    const title: string = this.props.title;
    const id: number = this.props.id;
    const selection: number | undefined = this.props.selection;
    const selection_name: string | undefined = this.props.selection_name;
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
                                label={title + " : " + selection_name}
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
