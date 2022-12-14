import { gql } from "@apollo/client";

export const getEvent = gql`
  query getEvent($id: uuid!) {
    Events_by_pk(id: $id) {
      id
      name
      date
      }
      }
      `

  export const JoinEvent = gql`
  mutation InsertEventObserver($eventId: uuid!, $userId: uuid!) {
    insert_EventObserver(objects: [{ eventId: $eventId, userId: $userId }]) {
      returning {
        id
        userId
        eventId
        Event {
          id
          EventObserver {
            id
          }
        }
      }
    }
  }
`;

export const getEvents = gql`
    query {
      Events {
        id
        name
        date
      }
    }
  `;