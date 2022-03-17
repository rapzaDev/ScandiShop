import React, { ButtonHTMLAttributes, PureComponent } from 'react';

import { Button } from './styles';

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
    const { children, ...rest } = this.props;

    return (
      <Button className="category-button" {...rest}>
        {children}
      </Button>
    );
  }
}

export default SelectCategoryButton;
