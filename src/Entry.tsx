import * as React from 'react';
import './Category.css';
import { EntriesState, Entry } from './store/entries/types';
import Col from 'reactstrap/lib/Col';
import Card from 'reactstrap/lib/Card';
import CardImg from 'reactstrap/lib/CardImg';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardSubtitle from 'reactstrap/lib/CardSubtitle';
import CardText from 'reactstrap/lib/CardText';
import './Entry.css';

interface IProps {
  entry: Entry;
}



export default class EntryCard extends React.Component<IProps> {
  public render () {
    const entry: Entry = this.props.entry;
    return (
        <div>
            <Col xs="auto" sm="auto" key={entry.entry_id}>
                <Card className="entry-card">
                    <CardImg top width="100%"
                        src={entry.featured_image}
                        className="mh-50 round-img"
                        alt={"Image for" + entry.display_name} />
                    <CardBody>
                        <span>
                            <CardTitle>{entry.display_name}</CardTitle>
                        </span>
                        <span>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                        </span>
                        <span>
                            <CardText>
                                <a href={entry.display_content} target="_blank">View more...</a>
                            </CardText>
                        </span>
                        {this.props.children}
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
  }
}

