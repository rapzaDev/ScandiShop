import React, { PureComponent } from 'react';

import {
    Button
} from './styles';

export type SizeButtonState = {
    origin: 'MyBag' | 'ProductPage' | 'CartPage';
    active: boolean;
    unavailable: boolean;
}

type SizeButtonProps = {
    origin: 'MyBag' | 'ProductPage' | 'CartPage';
    active: boolean;
    unavailable: boolean;
    onClick: () => void;
    children: React.ReactNode;
} 

class SizeButton extends PureComponent<SizeButtonProps, SizeButtonState> {

    constructor(props: SizeButtonProps) {
        super(props);
    }

    state:SizeButtonState = {
        origin: this.props.origin,
        active: false,
        unavailable: this.props.unavailable,
    }

    render() {

        return (

            <Button 
                id="size-button"
                origin={this.props.origin}
                active={this.props.active}
                unavailable={this.props.unavailable}
                onClick={() => this.props.onClick()}
            >
                { this.props.children }
            </Button>

        );

    }

};

export { SizeButton };