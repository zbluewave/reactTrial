import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {
    Message,
    Button,
    Grid
} from 'semantic-ui-react';
import ContentWrapper from '../../ContentWrapper/Component/ContentWrapper';
import EntityList from './EntityDataSearch/EntityList';
import QueueReviewTool from './QueueReview/QueueReviewTool';
import editEntityMasterListLinksAction from '../ActionCreator/editEntityMasterListLinksAction';
import EntityDataSearch from './EntityDataSearch/EntityDataSearch';
import { connect } from 'react-redux';
import StandardizedDataSearch from './StandardardizedDataSearch/StandardizedDataSearch';
import { pushEntitiesToQueueAction } from '../ActionCreator/buttonActions';

@connect(
    state => ({
        error: state.standardizedMappingTool.error,
        pendingQueue: state.standardizedMappingTool.pendingQueue,
        entitiesPage: state.standardizedMappingTool.entitiesPage,
        auth: state.auth.data
    }),
    dispatch => ({
        editEntityMasterListLinks: (query) => dispatch(editEntityMasterListLinksAction(query)),
        pushEntitiesToQueue: (entities) => dispatch(pushEntitiesToQueueAction(entities))
    })
)

class StandardizationMappingTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReview: false
        };
        autoBind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.entitiesPage.loading) {
            this.setState({
                showReview: false
            });
        }
    }

    toggleReviewWindow() {
        this.setState(prevState => {
            return {
                showReview: !prevState.showReview
            };
        });
    }

    pushAssociation() {
        const requests = this.props.pendingQueue.getPendingQueue();
        if (requests.length > 0) {
            this.props.editEntityMasterListLinks({
                links: requests
            });
        }
    }

    render() {
        return (
            <ContentWrapper>
                {this.renderMessageRow()}
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={7}>
                            <Grid.Row>
                                <StandardizedDataSearch />
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Grid.Row>
                                <EntityDataSearch/>
                            </Grid.Row>
                            {this.renderButtons()}
                            {this.renderRightWindow()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </ContentWrapper>
        );
    }

    renderMessageRow() {
        if (this.props.error) {
            return (
                <Message negative floating>
                    <p>{this.props.error}</p>
                </Message>
            );
        }
        return "";
    }

    pushEntitiesToQueue() {
        this.props.pushEntitiesToQueue(this.props.entitiesPage.currentDisplay);
    }

    renderButtons() {
        const toggleText = this.state.showReview ? "See Entities" : "Review Pending";
        const pushButton = this.props.pendingQueue.hasPending() &&  this.state.showReview?
            <Button onClick={this.pushAssociation}>Push Association</Button> : "";
        const pushPageButton = this.props.entitiesPage.currentDisplay.length > 0 && !this.state.showReview?
            <Button onClick={this.pushEntitiesToQueue}>Push Current Page To Queue</Button> : "";
        return (
            <Grid.Row>
                <Button onClick={this.toggleReviewWindow}>{toggleText}</Button>
                {pushButton}
                {pushPageButton}
            </Grid.Row>
        );
    }

    renderRightWindow()
    {
        if (this.state.showReview) {
            return (
                <QueueReviewTool
                    list={this.props.pendingQueue.flatten()}
                />
            );
        }
        return (
            <EntityList/>
        );
    }
}

StandardizationMappingTool.propTypes = {
    error: PropTypes.string,
    pendingQueue: PropTypes.object,
    entitiesPage: PropTypes.object,
    editEntityMasterListLinks: PropTypes.func,
    pushEntitiesToQueue: PropTypes.func
};

export default StandardizationMappingTool;
