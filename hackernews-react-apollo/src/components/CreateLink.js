//import useState hook to handle data that’s typed into  fields and hold input component’s local state
import React, { useState } from 'react';
//import useMutation hook to fire mutation after it is defined
import { useMutation, gql } from '@apollo/client';
//to aid auto redirect back to LinkList after mutation
import { useNavigate } from 'react-router-dom';

// define create mutation
const CREATE_LINK_MUTATION = gql`
    mutation PostMutation(
        $description: String!
        $url: String!
    ) {
        post(description: $description, url: $url) {
            id
            createdAt
            url
            description
        }
    }
`;


const CreateLink = () => {
    // create navigate reference to be used within onCompleted callback
    const navigate = useNavigate();
    //set states
    const [formState, setFormState] = useState({
        description: '', 
        url: ''
    });

    //pass CREATE_LINK_MUTATION to useMutation hook and pass in data provided in input fields as variables
    //createLink is function to call the mutation
    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        variables: {
            description: formState.description, 
            url: formState.url
        }, 
        onCompleted: () => navigate('/')
    });

    return (
        <div>
            <form  onSubmit={(e) => {e.preventDefault(); createLink(); }}>
                <div className='flex flex-column mt3'>
                    <input 
                    className='mb2'
                    value={formState.description} 
                    onChange={(e) => setFormState({...formState, description: e.target.value})} 
                    type="text" 
                    placeholder='A description for the link'
                    />
                    <input 
                    className='mb2'
                    value={formState.url} 
                    onChange={(e) => setFormState({...formState, url: e.target.value})} 
                    type="text" 
                    placeholder='The URL for the link'
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default CreateLink;