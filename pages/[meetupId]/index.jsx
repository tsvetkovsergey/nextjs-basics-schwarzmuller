// file:  pages/[meetupId]/index.jsx
// route: pages/[meetupId]
import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails({ meetupData }) {
  return (
    <Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail {...meetupData} />
    </Fragment>
  );
}

// getStaticPaths defines for which dynamic
// parameter values this page should be pre-generated
// We need to pre-generate page for every available meetupId
export async function getStaticPaths(context) {
  // Fetch all meetups to get their IDs
  const client = await MongoClient.connect(
    'mongodb+srv://admin-sergei:KAKtus1.6458685@cluster0.6lxqz.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  // Fetch only IDs of all meetups
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    // fallback: false - means that you defined
    // all supported paths here
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // Get meetupId from the URL path
  const meetupId = context.params.meetupId;

  // fetch data for a single meetup
  const client = await MongoClient.connect(
    'mongodb+srv://admin-sergei:KAKtus1.6458685@cluster0.6lxqz.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  // Fetch only one meetup
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  const id = selectedMeetup._id.toString();
  const { title, image, address, description } = selectedMeetup;

  return {
    props: {
      meetupData: { id, title, image, address, description },
    },
  };
}

export default MeetupDetails;
