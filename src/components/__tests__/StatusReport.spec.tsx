import React from 'react';
import renderer from 'react-test-renderer';
import { Message } from 'semantic-ui-react';

import StatusReport from '../StatusReport';

describe('StatusReport component', function () {
    it('reports failure', () => {
        const errorReport = renderer.create(
            <StatusReport pending={false} failure={true} ok={false} message={`error occurred`} />
        );
        const errorReportInstance = errorReport.root;

        expect(errorReportInstance.findByType(Message)).toBeDefined();
        expect(errorReportInstance.findByType(Message).props.color).toBe('red');
        expect(errorReportInstance.findByType(Message).props.content).toBe('error occurred');
        expect(errorReportInstance).toMatchSnapshot();
        errorReport.unmount();
    });

    it('reports pending', () => {
        const errorReport = renderer.create(
            <StatusReport pending={true} failure={false} ok={false} />
        );
        const errorReportInstance = errorReport.root;

        expect(errorReportInstance.findByType(Message)).toBeDefined();
        expect(errorReportInstance.findByType(Message).props.color).toBe('yellow');
        expect(/fetching/i.test(errorReportInstance.findByType(Message).props.content)).toBe(true);
        errorReport.unmount();
    });

    it('do not report success', () => {
        const errorReport = renderer.create(
            <StatusReport pending={false} failure={false} ok={true} />
        );
        const errorReportInstance = errorReport.root;

        try {
            errorReportInstance.findByType(Message);
            expect(true).toBe(false);
        } catch(e) {
            expect(e).toBeDefined();
        }
        errorReport.unmount();
    });
});
