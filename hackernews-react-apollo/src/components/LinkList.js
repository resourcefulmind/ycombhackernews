import React from 'react';
import Link from './Link';
import { useQuery, gql } from '@apollo/client';

//use useQuery hook from Apollo Client to make queries and take care of fetching and returning data plus errors
const FEED_QUERY = gql`
    {
        feed {
            id
            links {
                id
                createdAt
                url
                description
            }
        }
    }
`
;


const LinkList = () => {
    //pass FEED_QUERY into useQuery
    const { data } = useQuery(FEED_QUERY);

    return (
        <div>
            {/* Iterate over returned links */}
            {data.feed.links.map((link) => (
                <Link key={link.id} link={link} />
            ))}
        </div>
    )
}

export default LinkList;