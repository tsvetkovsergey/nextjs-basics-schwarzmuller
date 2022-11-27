import { Fragment } from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// This function will run not during the build
// process but instead always on the server
// after deployment
// export async function getServerSideProps(context) {
//   const { req, res } = context;

//   // fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://admin-sergei:KAKtus1.6458685@cluster0.6lxqz.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  // By default find() will find all meetups
  // in the collection
  const meetups = await meetupsCollection.find().toArray();

  // Close the connection after we done fetching
  client.close();

  return {
    props: {
      // We should convert _id from database
      meetups: meetups.map((meetup) => {
        const { _id, title, image, address } = meetup;
        return { title, image, address, id: _id.toString() };
      }),
    },
    revalidate: 10,
  };
}

export default HomePage;
