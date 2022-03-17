import React, { PureComponent } from 'react';

import { ShadowContainer } from './styles';

type ShadowWrapperProps = {
  active: boolean;
};

class ShadowWrapper extends PureComponent<ShadowWrapperProps> {
  constructor(props: ShadowWrapperProps) {
    super(props);
  }

  render() {
    const { active } = this.props;

    return <ShadowContainer id="shadow-container" active={active} />;
  }
}

export default ShadowWrapper;
