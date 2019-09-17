import React from 'react';
import { View, Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../constants';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: theme.sizes.base,
  },
  link: {
    position: 'absolute',
    bottom: 0,
  },
  text: {
    color: theme.colors.gray2,
    fontStyle: 'italic',
    fontSize: theme.sizes.h3,
  },
});

const ContactMail: React.FC = () => {
  return (
    <View style={styles.box}>
      <View style={styles.link}>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:ifeelgood.hello@gmail.com')}>
          <Text style={styles.text}>ifeelgood.hello@gmail.com</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactMail;
