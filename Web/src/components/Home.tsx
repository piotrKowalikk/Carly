import * as React from 'react'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

interface IExampleComponentProps {
    searchTypeChange: Function;
    errorMessage: string;
    searchStringChange: Function;
}

interface IExampleComponentState {
}

class ExampleComponent extends React.Component<IExampleComponentProps, IExampleComponentState>{

    constructor(props) {
        super(props);
    }

    render() {
        return (
<div>
    HOME LAYOUT
</div>
            );
    }
}

