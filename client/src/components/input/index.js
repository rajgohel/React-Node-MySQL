import * as React from 'react';
import { Form } from 'react-bootstrap';

export class InputText extends React.Component {
    onChange = (e) => {
        const { onChange, name } = this.props;
        const { value } = e.target;
        if (onChange) {
            onChange(name, value);
        }
    }

    render() {
        const { name, title, type, placeholder, className, value } = this.props;
        return (
            <div className={className}>
                <Form.Group className="mb-3">
                    <Form.Label>{title}</Form.Label>
                    <Form.Control name={name}
                        type={type}
                        value={value}
                        onChange={this.onChange}
                        placeholder={placeholder} />
                </Form.Group>
            </div>
        );
    }
}