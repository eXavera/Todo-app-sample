import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../state';
import { RequestAddTodo } from '../actions';

interface AddFormState {
    text: string
}

interface AddFormProps {
    onAdd: (text: string) => void
}

class AddForm extends React.Component<AddFormProps, AddFormState> {
    constructor(props: AddFormProps) {
        super(props);

        this.state = {
            text: ''
        };

        this.saveText = this.saveText.bind(this);
        this.isTextInvalid = this.isTextInvalid.bind(this);
        this.add = this.add.bind(this);
    }
    private saveText(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            text: event.currentTarget.value
        });
    }
    private isTextInvalid() {
        const text = this.state.text;
        if (!text || text.length === 0) return true;

        return /^\s*$/.test(text);
    }
    private add() {
        this.props.onAdd(this.state.text);
        this.setState({
            text: ''
        });
    }
    render() {
        return (
            <div id="add-form">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Don't forget to ..." onChange={this.saveText} value={this.state.text} />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" disabled={this.isTextInvalid()} onClick={this.add}>
                            <span className="glyphicon glyphicon-plus"></span> Add
                    </button>
                    </span>
                </div>
            </div>
        );
    }
};

const mapDispatchToProps = function (dispatch: Dispatch<any>): AddFormProps {
    return {
        onAdd: (text) => {
            dispatch(RequestAddTodo(text));
        }
    };
};

export default connect(() => ({}), mapDispatchToProps)(AddForm);