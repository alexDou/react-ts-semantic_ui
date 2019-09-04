import React, { ReactElement } from 'react';
import { Segment, Container, Message } from 'semantic-ui-react';

import { SessionState } from '@t/app';

const StatusReport = ({ pending = true, ok = false, message = '' }: SessionState): ReactElement => {
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
