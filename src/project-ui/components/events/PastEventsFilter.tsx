import { Dropdown } from 'rsuite';


interface props {
  setPastEvents: (value: boolean) => void
  bottomEnd?: boolean
}

function PastEventsFilter(props: props) {
  const { setPastEvents, bottomEnd } = props;

  return (
    <>
      <Dropdown title={'Filter Events'} placement={bottomEnd ? 'bottomEnd' : 'bottomStart'}>
        <Dropdown.Item onClick={() => setPastEvents(false)}>Show Upcoming Events</Dropdown.Item>
        <Dropdown.Item onClick={() => setPastEvents(true)}>Show Past Events</Dropdown.Item>
      </Dropdown>
    </>
  )

}

export default PastEventsFilter;