import React, { ButtonHTMLAttributes, PureComponent } from 'react';

import {
    Button,
} from './styles';

export interface SelectCategoryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    isSelected?: boolean;
};

class SelectCategoryButton extends PureComponent<SelectCategoryButtonProps> {

    constructor(props: SelectCategoryButtonProps) {
        super(props);
    }

    render() {

        const { ...rest } = this.props;

        return (
            <Button className="category-button" {...rest} >
                {this.props.children}
            </Button>
        );

    }
};

export default SelectCategoryButton;