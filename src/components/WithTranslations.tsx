import React from 'react';
import { connect } from 'react-redux';

export default function withTranslations(WrappedComponent: any) {
  class TranslationComponent extends React.Component<{ lang: string }> {
    static navigationOptions = WrappedComponent.navigationOptions;

    render() {
      return <WrappedComponent {...this.props} lang={this.props.lang} />;
    }
  }
  const mapStateToProps = (state: any) => ({
    lang: state.language.locale,
  });
  return connect(mapStateToProps)(TranslationComponent);
}
