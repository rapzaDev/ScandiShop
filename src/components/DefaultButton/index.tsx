import React, { ButtonHTMLAttributes, PureComponent } from 'react';

import {
    Button,
} from './styles';

export interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    color: 'default' | 'green';
};

class DefaultButton extends PureComponent<DefaultButtonProps> {

    constructor(props: DefaultButtonProps) {
        super(props);
    }

    render() {
        const { ...rest } = this.props;

        return (
            <Button {...rest}>
                {this.props.children}
            </Button>
        );
    }

};

export default DefaultButton;