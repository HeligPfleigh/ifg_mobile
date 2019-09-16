import React from 'react';
import { View, Linking, Button, StyleSheet } from 'react-native';
import { theme } from '../constants';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: theme.sizes.base,
  },
  button: {
    position: 'absolute',
    bottom: 0,
  },
});

const ContactMail: React.FC = () => {
  return (
    <View style={styles.box}>
      <View style={styles.button}>
        <Button onPress={() => Linking.openURL('mailto:ifeelgood.hello@gmail.com')} title="ifeelgood.hello@gmail.com" />
      </View>
    </View>
  );
};

export default ContactMail;
