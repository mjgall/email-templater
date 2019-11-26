import React from 'react';
import './App.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';

class App extends React.Component {
  state = {
    form: {
      features: [
        { name: 'Workflow customization', enabled: false, link: '<a href="https://help.catsone.com/article/120-customizing-the-workflow">Customizing your workflow</a>'},
        { name: 'Custom fields', enabled: false, link: '<a href="https://help.catsone.com/article/128-custom-fields">Custom fields</a>' },
        { name: 'Email integration', enabled: false, link: '<a href="https://help.catsone.com/article/117-email-integration">Email integration</a>' },
        { name: 'Calendar integration', enabled: false, link: '<a href="https://help.catsone.com/article/114-calendar-sync">Calendar sync</a>' },
        { name: 'SMS', enabled: false, link: '<a href="https://help.catsone.com/article/150-sending-text-sms-messages">Sending text messages</a>' },
        { name: 'Meeting Scheduler', enabled: false, link: '<a href="https://help.catsone.com/article/151-schedule-meetings-with-cats">Meeting Scheduler</a>' },
        { name: 'Custom access levels', enabled: false, link: '<a href="https://help.catsone.com/article/215-access-levels">Custom access levels</a>' }
      ],
      recipientFirstName: ''
    },
    editorState: `<p>Hi {firstName},
</br>
</br>
    I was just doing a review of your CATS account and wanted to know if you were aware of the following features of CATS:</br></br>
{list}</br>I'd encourage you to review our Knowledge Base articles I have linked with those items, but I would love to set up a time for a call to cover any questions that you may have about your CATS account as well. Please feel free to <a href="https://calendly.com/mike-cats/15min">use this link to book a time for that</a>.
    </br>
    </br>
    Thanks, looking forward to hearing from you!
    </br>
    </br>
    Mike
    </p>`,
    defaultEditorState: `<p>Hi {firstName},
    </br>
    </br>
        I was just doing a review of your CATS account and wanted to know if you were aware of the following features of CATS:</br></br>
    {list}</br>I'd encourage you to review our Knowledge Base articles I have linked with those items, but I would love to set up a time for a call to cover any questions that you may have about your CATS account as well. Please feel free to <a href="https://calendly.com/mike-cats/15min">use this link to book a time for that</a>.
        </br>
        </br>
        Thanks, looking forward to hearing from you!
        </br>
        </br>
        Mike
        </p>`,
    toInsert: ''
  };

  handleSubmit = e => {
    e.preventDefault();

    const ul = document.createElement('ul');

    for (let index = 0; index < this.state.form.features.length; index++) {
      const feature = this.state.form.features[index];
      if (feature.enabled) {
        const li = document.createElement('li');
        li.innerHTML = feature.link;
        ul.appendChild(li);
      }
    } 

    const firstNameUpdated = this.state.editorState.replace('{firstName}', this.state.form.recipientFirstName)
    const listUpdated = firstNameUpdated.replace('{list}', ul.outerHTML)
    this.setState({editorState: listUpdated})

  };

  handleFirstNameChange = ({ target }) => {
    this.setState({
      form: { ...this.state.form, recipientFirstName: target.value }
    });
    console.log(this.state);
  };

  handleFeatureAddition = e => {
    const features = [...this.state.form.features];
    const index = this.state.form.features.findIndex(
      feature => feature.name === e.target.id
    );
    features[index].enabled = !features[index].enabled;
    this.setState({ form: { ...this.state.form, features } });
    console.log(this.state);
  };

  handleEditorChange = editorState => this.setState({ editorState });

  render = () => {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h3>Template Builder</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    onChange={this.handleFirstNameChange}
                  />
                </Form.Group>
                <Form.Group>
                  {this.state.form.features.map((feature, index) => {
                    return (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        id={feature.name}
                        label={feature.name}
                        onChange={this.handleFeatureAddition}
                      />
                    );
                  })}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button variant="secondary" onClick={()=> {this.setState({editorState: this.state.defaultEditorState})}}>
                  Reset
                </Button>
              </Form>
            </Col>
          </Row>
          <ReactQuill
            value={this.state.editorState}
            onChange={this.handleEditorChange}
          />
        </Container>
      </div>
    );
  };
}

export default App;
