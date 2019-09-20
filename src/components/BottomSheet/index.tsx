import React, { Component } from 'react';
import get from 'lodash/get';
import noop from 'lodash/noop';
import { View, Modal, TouchableOpacity, Animated, PanResponder, StyleProp, ViewStyle } from 'react-native';
import styles from './styles';

interface IStates {
  pan: any;
  animatedHeight: any;
  modalVisible: boolean;
}

interface IProps {
  animationType?: 'none' | 'fade' | 'slide';
  height?: number;
  minClosingHeight?: number;
  duration?: number;
  closeOnDragDown?: boolean;
  closeOnPressMask?: boolean;
  onClose?: () => void;
  customStyles?: {
    wrapper?: StyleProp<ViewStyle>;
    container?: StyleProp<ViewStyle>;
  };
}

class BootomSheet extends Component<IProps, IStates> {
  panResponder: any;

  static defaultProps: IProps = {
    animationType: 'none',
    height: 260,
    minClosingHeight: 0,
    duration: 300,
    closeOnDragDown: false,
    closeOnPressMask: true,
    customStyles: {},
    onClose: noop,
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      modalVisible: false,
      pan: new Animated.ValueXY(),
      animatedHeight: new Animated.Value(0),
    };

    this.createPanResponder(props);
  }

  setModalVisible = (visible: boolean) => {
    const { height, minClosingHeight, duration, onClose } = this.props;
    const { animatedHeight, pan } = this.state;
    if (visible) {
      this.setState({ modalVisible: visible });
      Animated.timing(animatedHeight, {
        duration,
        toValue: height || 260,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        duration,
        toValue: minClosingHeight || 0,
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0),
        });
        if (typeof onClose === 'function') {
          onClose();
        }
      });
    }
  };

  createPanResponder = (props: IProps) => {
    const { closeOnDragDown, height } = props;
    const { pan } = this.state;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnDragDown || false,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, { dy: pan.y }])(e, gestureState);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if ((height || 260) / 4 - gestureState.dy < 0) {
          this.setModalVisible(false);
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
        }
      },
    });
  };

  open = () => {
    this.setModalVisible(true);
  };

  close = () => {
    this.setModalVisible(false);
  };

  render() {
    const { animatedHeight, pan, modalVisible } = this.state;
    const { animationType, closeOnPressMask, children, customStyles } = this.props;
    const panStyle = {
      transform: pan.getTranslateTransform(),
    };

    return (
      <Modal
        transparent
        visible={modalVisible}
        animationType={animationType}
        onRequestClose={() => {
          this.setModalVisible(false);
        }}
      >
        <View style={[styles.wrapper, get(customStyles, 'wrapper', {})]}>
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={1}
            onPress={() => (closeOnPressMask ? this.close() : {})}
          />
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.container, get(customStyles, 'container', {}), { height: animatedHeight }]}
          >
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

export default BootomSheet;
