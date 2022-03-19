import React, { PureComponent } from 'react';

// STYLES
import { Container, SmallImagesWrapper, SmallImage, BigImage } from './styles';

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
    } as ImagesContainerState;
  }

  handleClickSmallImage(image: string) {
    this.setState(() => ({
      bigImage: image,
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
        </SmallImagesWrapper>

        <BigImage className="big-image">
          <img src={bigImage} alt={bigImage} />
        </BigImage>
      </Container>
    );
  }
}

export default ImagesContainer;
