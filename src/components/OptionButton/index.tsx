import React, { PureComponent } from 'react';

import {
    Button
} from './styles';

export type OptionButtonState = {
    origin: 'MyBag' | 'ProductPage' | 'CartPage';
    active: boolean;
}

type OptionButtonProps = {
    origin: 'MyBag' | 'ProductPage' | 'CartPage';
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    value: string;
} 

class OptionButton extends PureComponent<OptionButtonProps, OptionButtonState> {

    constructor(props: OptionButtonProps) {
        super(props);
    }

    state:OptionButtonState = {
        origin: this.props.origin,
        active: false,
    }

    render() {

        return (

            <Button 
                id="option-button"
                origin={this.props.origin}
                active={this.props.active}
                onClick={() => this.props.onClick()}
                value={this.props.value}
            >
                { this.props.children }
            </Button>

        );

    }

};

export default OptionButton;