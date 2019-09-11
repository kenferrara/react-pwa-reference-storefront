/**
 * Copyright © 2019 Elastic Path Software Inc. All rights reserved.
 *
 * This is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this license. If not, see
 *
 *     https://www.gnu.org/licenses/
 *
 *
 */

import React, { FormEvent } from 'react';
import { bloomreachSuggestionSearch } from '../utils/BloomreachSearchService';
import './bloomreach.headersearch.main.less';

const intl = { get: str => str };

interface BloomreachHeaderSearchMainProps {
    isMobileView: boolean,
    onSearchPage?: (...args: any[]) => any,
}
interface BloomreachHeaderSearchMainState {
    keywords: string,
    focusedElement?: HTMLElement,
    suggestions: [],
    liElements?: {},
}

class BloomreachHeaderSearchMain extends React.Component<BloomreachHeaderSearchMainProps, BloomreachHeaderSearchMainState> {
  private searchInput: React.RefObject<HTMLInputElement>;
  private suggestionListElements: HTMLLIElement[];
  private suggestionIndex: number;
  
  static defaultProps = {
    onSearchPage: () => {},
  }
  

  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      suggestions: [],
      focusedElement: null,
      liElements: {}
    };
    this.searchInput = React.createRef();
    this.suggestionListElements = [];
    this.suggestionIndex = 0;
    this.setSuggestionsList = this.setSuggestionsList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.inputHandleKeyDown = this.inputHandleKeyDown.bind(this);
    this.liHandleKeyDown = this.liHandleKeyDown.bind(this);
  }

  setSuggestionsList(element, indexOfSuggestion: number) {
    this.suggestionListElements[indexOfSuggestion] = element;
  }

  handleChange(event) {
    const keywords = event.target.value;

    bloomreachSuggestionSearch(keywords)
      .then((res) => {
        const brSuggestions = res.response.suggestions;
        const suggestions = brSuggestions ? brSuggestions.map(suggestion => suggestion.dq) : [];

        this.setState({
          keywords,
          suggestions,
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error.message);
      });
  }

  search(event?: FormEvent<HTMLFormElement>, listElementKeyword?: string) {
    const { onSearchPage } = this.props;
    const { keywords } = this.state;

    if (listElementKeyword) {
      document.querySelector('.collapsable-container').classList.remove('show');
      onSearchPage(listElementKeyword);
    } else if (keywords !== '') {
      document.querySelector('.collapsable-container').classList.remove('show');
      onSearchPage(keywords);
    }
    
    this.searchInput.current.value = '';
    if (event != null) {
      event.preventDefault();
    }
  }

  handleSuggestionClicked(suggestion) {
    this.setState(
      {
        keywords: suggestion,
        suggestions: [],
      },
      this.search,
    );
  }

  liHandleKeyDown(e) {
    if (e.keyCode === 38) {
      if (this.suggestionIndex > 0 && this.suggestionListElements[this.suggestionIndex - 1]) {
        this.suggestionIndex = this.suggestionIndex - 1;
        this.suggestionListElements[this.suggestionIndex].focus();
      } else {
        this.searchInput.current.focus();
      }
    } else if (e.keyCode === 40) {
      if (this.suggestionIndex < this.suggestionListElements.length - 1 && this.suggestionListElements[this.suggestionIndex + 1]) {
        this.suggestionIndex = this.suggestionIndex + 1;
        this.suggestionListElements[this.suggestionIndex].focus();
      }
    } else if (e.keyCode === 13) {
      const { suggestions } = this.state;
      this.search(e, suggestions[this.suggestionIndex]);
    }
    e.preventDefault();
  }

  inputHandleKeyDown(e) {
    console.log('inputhandlekeydown being clicked');
    if (e.keyCode === 40) {
      console.log(this.suggestionListElements);
      this.suggestionListElements[0].focus();
    }
    e.preventDefault();
  }

  suggestionListHelper() {
    const { suggestions } = this.state;
    this.suggestionListElements = [];
    
    return suggestions.map((suggestion, i)=> {
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions    
        return (
        <li className="suggestion-element" 
            tabIndex={0} 
            ref={(e)=>this.setSuggestionsList(e, i)} 
            key={suggestion} 
            onKeyDown={this.liHandleKeyDown} 
            onMouseDown={() => this.handleSuggestionClicked(suggestion)}
        >
          {suggestion}
        </li>
        );
      }
    );
  }

  suggestionsListComponent() {
    const { suggestions } = this.state;
    if (suggestions.length !== 0) {
      return (
        <ul className="suggestions">
          { this.suggestionListHelper() }
        </ul>
      );
    }

    return null;
  }

  render() {
    const { isMobileView } = this.props;

    return (
      <div className={`main-search-container ${isMobileView ? 'mobile-view' : ''}`}>
        <form className="search-form" onSubmit={event => this.search(event)}>
          <input tabIndex={0} className="input-search" type="search" onChange={this.handleChange} placeholder={intl.get('search')} ref={this.searchInput} onKeyUp={this.inputHandleKeyDown} />
          <div className="search-icon" />
          {this.suggestionsListComponent()}
        </form>
      </div>
    );
  }
}

export default BloomreachHeaderSearchMain;