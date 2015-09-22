import theme from 'theme.less';
import styles from './Example1.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateInputValue, suggestionSelected } from 'actions/app';
import Autosuggest from 'AutosuggestContainer';

const exampleId = '1';

function mapStateToProps(state) {
  return {
    value: state[exampleId].value,
    suggestions: state[exampleId].suggestions,
    selectedSuggestionId: state[exampleId].selectedSuggestionId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: (value, method) => {
      dispatch(updateInputValue(exampleId, value, method));
    },
    onSuggestionSelected: (event, { suggestion, method }) => {
      console.log(`Example ${exampleId}: Suggestion selected:`, suggestion, `method = ${method}`);
      dispatch(suggestionSelected(exampleId, getSuggestionValue(suggestion), suggestion.id));
    }
  };
}

function getSuggestionValue(suggestion) {
  return suggestion.text;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.text}</span>
  );
}

function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getSectionSuggestions(section) {
  return section.suggestions;
}

class Example extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    suggestions: PropTypes.array.isRequired,
    selectedSuggestionId: PropTypes.string.isRequired,

    onChange: PropTypes.func.isRequired,
    onSuggestionSelected: PropTypes.func.isRequired
  };

  render() {
    const { value, suggestions, selectedSuggestionId,
            onChange, onSuggestionSelected } = this.props;
    const inputProps = {
      placeholder: 'Pick another fruit',
      value,
      onChange: (event, { newValue, method }) => {
        console.log(`Example ${exampleId}: Changed value = ${newValue}, method = ${method}`);
        onChange(newValue, method);
      },
      onBlur: () => console.log(`Example ${exampleId}: Blurred`),
      onFocus: () => console.log(`Example ${exampleId}: Focused`)
    };

    return (
      <div className={styles.container}>
        <div className={styles.selectedSuggestionIdContainer}>
          Selected suggestion id: {selectedSuggestionId}
        </div>
        <Autosuggest multiSection={true}
                     suggestions={suggestions}
                     getSuggestionValue={getSuggestionValue}
                     renderSuggestion={renderSuggestion}
                     renderSectionTitle={renderSectionTitle}
                     getSectionSuggestions={getSectionSuggestions}
                     inputProps={inputProps}
                     onSuggestionSelected={onSuggestionSelected}
                     theme={theme} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);
