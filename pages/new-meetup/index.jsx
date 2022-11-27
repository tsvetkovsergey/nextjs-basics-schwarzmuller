// my-domain.com/new-meetup
import { useRouter } from 'next/router.js';
import { Fragment } from 'react';
import Head from 'next/head.js';

import NewMeetupForm from '../../components/meetups/NewMeetupForm.js';

function NewMeetup() {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    // Post new meetup to Next.js backend API
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Get back response
    const data = await response.json();

    console.log(data);

    // Redirect to main page
    router.push('/');
  };

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetup;
