import React, { ButtonHTMLAttributes, PureComponent } from 'react';

import { Button } from './styles';

export type OptionButtonState = {
  origin: 'ProductPage' | 'CartPage' | 'MyBag';
  active: boolean;
};

interface IOptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  origin: 'ProductPage' | 'CartPage' | 'MyBag';
  active: boolean;
  onClick: () => void;
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  value: string;
}

class OptionButton extends PureComponent<
  IOptionButtonProps,
  OptionButtonState
> {
  constructor(props: IOptionButtonProps) {
    super(props);
  }

  render() {
    const { origin, active, onClick, value, children } = this.props;

    return (
      <Button
        id="option-button"
        origin={origin}
        active={active}
        onClick={() => origin === 'ProductPage' && onClick()}
        value={value}
      >
        {children}
      </Button>
    );
  }
}

export default OptionButton;
