import React from 'react';
import { Segment, Container, Message } from 'semantic-ui-react';

const StatusReport = ({ pending = true, ok = false, failure = false, message = '' }) => {
    if (ok) {
        return <></>;
    }

    message = message || 'Fetching data...';

    const color = pending ? 'yellow' : 'red';

    return (
        <Segment as={Container}>
            <Message color={color} content={message} icon={pending ? 'circle notched' : 'alarm'} />
        </Segment>
    )
};

export default StatusReport;
