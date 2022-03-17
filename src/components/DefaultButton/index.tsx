import React, { ButtonHTMLAttributes, PureComponent } from 'react';

import { Button } from './styles';

export interface IDefaultButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'default' | 'green';
}

class DefaultButton extends PureComponent<IDefaultButtonProps> {
  constructor(props: IDefaultButtonProps) {
    super(props);
  }

  render() {
    const { children, ...rest } = this.props;

    return <Button {...rest}>{children}</Button>;
  }
}

export default DefaultButton;
