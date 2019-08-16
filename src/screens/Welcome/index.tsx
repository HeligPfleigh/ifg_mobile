import React, { Component } from 'react'
import { Text } from 'react-native';
import { WelcomeImg } from "../../assets/images";
import { Block, Button } from '../../components';
import { theme } from '../../constants';
import { styles } from './styles';

export default class extends Component {
    render() {
        return (
            <Block>
                <Block center bottom flex={1}>
                    <WelcomeImg />
                </Block>
                <Block center middle flex={0.5}>
                    <Text style={styles.header}>I Feel Good</Text>
                    <Text style={styles.paragraph}>Find out what you need,</Text>
                    <Text style={styles.paragraph}>and also what you dont!</Text>
                </Block>
                <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                    <Button gradient>
                        <Block center middle>
                            <Text style={styles.textBtn}>SIGN UP</Text>
                        </Block>
                    </Button>
                    <Button shadow>
                        <Block center middle>
                            <Text style={styles.textBtn}>I HAVE AN ACCOUNT</Text>
                        </Block>
                    </Button>
                </Block>
                <Block flex={1} />
            </Block>
        )
    }
}
