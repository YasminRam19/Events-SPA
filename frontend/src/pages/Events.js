import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  /*const data = useLoaderData();

  if (data.isError) {
    return <p>{data.message}</p>;
  }
  const events = data.events;
  return (
    <>
      <EventsList events={events} />
    </>
  );*/

  //After defering the events list....
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    //return { isError: true, message: "Could not fetch events." };
    /*throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });*/
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    //response was received directly by userLoaderData but does not work if we have a defer in between
    //return response;
    //Manually parse the response
    const resData = await response.json();
    return resData.events;
  }
};

export const loader = () => {
  return defer({
    //Execute loadEvents function which returns a promise
    events: loadEvents(),
  });
};
