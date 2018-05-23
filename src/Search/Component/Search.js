import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {
    Form,
    Input
} from 'semantic-ui-react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        };
        autoBind(this);
    }

    handleSearch(event) {
        this.props.handleSearch(
            event.target.value.toLowerCase(),
            this.props.collectionName
        );
        this.setState({
            searchInput: event.target.value
        });
    }

    handleClear() {
        this.props.handleClear(this.props.collectionName);
        this.setState({
            searchInput: ''
        });
    }

    render() {
        const { searchInput } = this.state;
        const props = this.props;

        return (
            <Form>
                <Form.Field>
                    <div className="Search__container">
                        <Input
                            className="Search__input"
                            type="text"
                            value={searchInput}
                            onChange={this.handleSearch}
                            placeholder={`Search ${props.searchTarget}..`}
                            icon={{ 
                                name: "search",
                                circular: true,
                                inverted: true,
                                color: 'blue' 
                            }}
                            iconPosition="left"
                        />
                        <button
                            className="Search__clear"
                            type="button"
                            onClick={this.handleClear}
                        >
                            {"Clear"}
                        </button>
                    </div>
                </Form.Field>
            </Form>
        );
    }
}

Search.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    handleClear: PropTypes.func.isRequired,
    searchTarget: PropTypes.string.isRequired,
    collectionName: PropTypes.string
};

export default Search;
