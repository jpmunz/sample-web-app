import React from "react";
import { connect } from "react-redux";
import {
  Spinner,
  Button,
  InputGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
import {
  fetchFooServerValueRequest,
  getFooValue,
  getFooServerValue,
  setFooValue,
  getAsync
} from "src/state";
import autoBind from "react-autobind";
import "./Component.scss";

export class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fooValue: "" };
    autoBind(this);
  }

  componentDidMount() {
    this.props.fetchFooServerValueRequest({});
  }

  handleChangeFooValue(event) {
    this.setState({ fooValue: event.target.value });
  }

  handleClickSetFooValue() {
    this.props.setFooValue({ value: this.state.fooValue });
  }

  render() {
    if (this.props.request.inProgress) {
      return (
        <Spinner variant="primary" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else if (this.props.request.error) {
      return <div>{"Some error: " + this.props.request.error}</div>;
    } else {
      return (
        <div className="Component">
          <div>
            {"Got here from: " +
              (this.props.routeId ? "/foo/" + this.props.routeId : "/")}
          </div>
          <div>{"FooServerValue: " + this.props.fooServerValue}</div>
          <div>{"FooValue: " + this.props.fooValue}</div>
          <InputGroup>
            <FormLabel htmlFor="foo-value-input">Foo value</FormLabel>
            <FormControl
              id="foo-value-input"
              type="text"
              onChange={this.handleChangeFooValue}
              placeholder={this.props.fooValue}
              value={this.state.fooValue}
              aria-label="Foo value"
            />
            <InputGroup.Append>
              <Button variant="secondary" onClick={this.handleClickSetFooValue}>
                Update Foo Value
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      );
    }
  }
}

export default connect(
  (state, props) => {
    return {
      fooValue: getFooValue(state),
      fooServerValue: getFooServerValue(state),
      request: getAsync(state, "foo")
    };
  },
  { setFooValue, fetchFooServerValueRequest }
)(Component);
