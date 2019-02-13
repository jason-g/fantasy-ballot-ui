import * as React from 'react';
import './Category.css';
import { Entry } from './store/entries/types';
import Card from 'reactstrap/lib/Card';
import CardImg from 'reactstrap/lib/CardImg';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardSubtitle from 'reactstrap/lib/CardSubtitle';
import CardText from 'reactstrap/lib/CardText';
import './Entry.css';

interface IProps {
  entry: Entry,
  selected: boolean | undefined,
}

export default class EntryCard extends React.Component<IProps> {
  getClassNames = () => {
      let classname = 'entry-card d-flex justify-content-center mb-5 shadow p-3 bg-white rounded';
      if (this.props.selected) {
        classname = classname + ' entry-card-selected'
      }
      return classname;
  }
  public render () {
    const entry: Entry = this.props.entry;
    let hasImage = (entry.featured_image && entry.featured_image !=='images/xxx.png')
      return (
          <Card className={this.getClassNames()}>
              <CardBody className="">
                  <span>
                      <CardTitle>{entry.display_name}</CardTitle>
                  </span>
              </CardBody>
              {!hasImage? '' :
              <div className="text-center">  

                  <CardImg top width="100%"
                      src={entry.featured_image}
                      className="mh-50 round-img"
                      alt={"Image for" + entry.display_name} />
              </div>
              }
              <CardBody>
                  <span className="text-center">
                      <CardText>
                          {entry.display_content}
                      </CardText>
                  </span>
                  <span>
                      <CardText className="card-link">
                          <a href={entry.featured_video} target="_blank">
                            <i className="fas fa-film" title="View trailer"></i>
                          </a>
                      </CardText>
                  </span>
              </CardBody>
              <CardBody className="card-footer">
                  {this.props.children}
              </CardBody>
          </Card>
      );
  }
}

