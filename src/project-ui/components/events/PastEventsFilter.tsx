import { Dropdown } from 'rsuite';


interface props {
  setPastEvents: (value: boolean) => void
}

function PastEventsFilter(props: props) {
  const {setPastEvents } = props;

  return (
    <>
      <Dropdown title={'Filter Events'}>
        <Dropdown.Item onClick={() => setPastEvents(false)}>Show Upcoming Events</Dropdown.Item>
        <Dropdown.Item onClick={() => setPastEvents(true)}>Show Past Events</Dropdown.Item>
      </Dropdown>
    </>
  )

}

export default PastEventsFilter;