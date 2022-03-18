import React, { ButtonHTMLAttributes, PureComponent } from 'react';

import { ButtonWrapper, Button, Underline } from './styles';

export interface ISelectCategoryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  // eslint-disable-next-line react/require-default-props
  isSelected?: boolean;
}

class SelectCategoryButton extends PureComponent<ISelectCategoryButtonProps> {
  constructor(props: ISelectCategoryButtonProps) {
    super(props);
  }

  render() {
    const { children, isSelected, ...rest } = this.props;

    return (
      <ButtonWrapper>
        <Button className="category-button" isSelected={isSelected} {...rest}>
          {children}
        </Button>
        <Underline isSelected={isSelected} />
      </ButtonWrapper>
    );
  }
}

export default SelectCategoryButton;
