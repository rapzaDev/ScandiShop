import React, { PureComponent } from 'react';

// ICONS
import downArrow from '../../assets/images/down-arrow-icon.svg';
import upArrow from '../../assets/images/up-arrow-icon.svg';
// STYLES
import {
  Container,
  SmallImagesWrapper,
  SmallImage,
  ArrowContainer,
  BigImage,
} from './styles';

type ImagesContainerProps = {
  images: Array<string>;
  shadow: boolean;
};

type ImagesContainerState = {
  bigImage: string;
  downHeightValue: number;
  upHeightValue: number;
};

class ImagesContainer extends PureComponent<
  ImagesContainerProps,
  ImagesContainerState
> {
  constructor(props: ImagesContainerProps) {
    super(props);

    const { images } = this.props;

    this.state = {
      bigImage: images[0],
      downHeightValue: images.length - 3,
      upHeightValue: 0,
    } as ImagesContainerState;
  }

  handleClickSmallImage(image: string) {
    this.setState(() => ({
      bigImage: image,
    }));
  }

  clickOnSmallImagesArrowUp() {
    const smallImages = document.getElementById('small-images');

    smallImages?.scrollBy({ top: -120 });

    this.setState((state) => ({
      upHeightValue: state.upHeightValue - 1,
      downHeightValue: state.downHeightValue + 1,
    }));
  }

  clickOnSmallImagesArrowDown() {
    const smallImages = document.getElementById('small-images');

    smallImages?.scrollBy({ top: 120 });

    this.setState((state) => ({
      downHeightValue: state.downHeightValue - 1,
      upHeightValue: state.upHeightValue + 1,
    }));
  }

  getSelectedValue(image: string, bigImage: string) {
    const { images } = this.props;

    if (images.length > 1) {
      const value = image === bigImage;

      return value;
    }
    return false;
  }

  renderSmallImagesArrows() {
    const { images } = this.props;
    const { downHeightValue, upHeightValue } = this.state;

    return (
      <div className="arrows-container">
        <ArrowContainer
          className="arrow-container"
          visible={!!(images.length >= 3 && upHeightValue > 0)}
          onClick={() => this.clickOnSmallImagesArrowUp()}
        >
          <img src={upArrow} alt="Up Arrow Icon" />
        </ArrowContainer>
        <ArrowContainer
          className="arrow-container"
          visible={!!(images.length >= 3 && downHeightValue > 0)}
          onClick={() => this.clickOnSmallImagesArrowDown()}
        >
          <img src={downArrow} alt="Down Arrow Icon" />
        </ArrowContainer>
      </div>
    );
  }

  render() {
    const { images, shadow } = this.props;
    const { bigImage } = this.state;

    return (
      <Container style={shadow ? { filter: 'brightness(0.78)' } : {}}>
        <SmallImagesWrapper>
          <div id="small-images">
            {images.map((image) => (
              <SmallImage
                className="small-image"
                key={image}
                onClick={() => this.handleClickSmallImage(image)}
                selected={this.getSelectedValue(image, bigImage)}
              >
                <img src={image} alt={image} />
              </SmallImage>
            ))}
          </div>

          {this.renderSmallImagesArrows()}
        </SmallImagesWrapper>

        <BigImage className="big-image">
          <img src={bigImage} alt={bigImage} />
        </BigImage>
      </Container>
    );
  }
}

export default ImagesContainer;
