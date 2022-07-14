//create component that expects a link to be passed as props and renders the description and url of that link

import { useMutation, gql } from '@apollo/client';
import React from 'react';
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceForDate } from '../utils';
import { FEED_QUERY } from './LinkList';

const VOTE_MUTATION = gql`
    mutation VoteMutation($linkId: ID!) {
        vote(linkId: $linkId) {
            id
            link {
                id
                votes {
                    id
                    user {
                        id
                    }
                }
            }
            user {
                id
            }
        }
    }
`;

const Link = (props) => {
    const { link } = props;
    const authToken = localStorage.getItem(AUTH_TOKEN);

    const [vote] = useMutation(VOTE_MUTATION, {
        variables: {
            linkId: link.id
        }, 
        //additional behavior to read cahe, modify and commit changes
        update: (cache, {data: {vote}}) => {
            const { feed } = cache.readQuery({
                query: FEED_QUERY
            });

            const updatedLinks = feed.links.map((feedLink) => {
                if (feedLink.id === link.id) {
                    return {
                        ...feedLink, 
                        votes: [...feedLink.votes, vote]
                    };
                }
                return feedLink;
            });
            cache.writeQuery({
                query: FEED_QUERY, 
                data: {
                    feed: {
                        links: updatedLinks
                    }
                }
            });
        }
    });

    return (
        <div className='flex mt2 items-start'>
            <div className='flex items-center'>
                <span className='gray'>{props.index + 1}.</span>
                {authToken && (
                    <div className='ml1 gray f7' style={{ cursor: 'pointer' }} onClick={vote}>
                        ▲
                    </div>
                )}
            </div>
            <div className='ml1'>
                <div>
                    {link.description} ({link.url})
                </div>
                {(
                    <div className='f8 lh-copy gray'>
                        {link.votes.length} votes | by{' '}
                        {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
                        {timeDifferenceForDate(link.createdAt)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Link;