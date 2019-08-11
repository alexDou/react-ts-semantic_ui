import React, { SyntheticEvent } from 'react';
import { Container, Pagination, PaginationProps } from 'semantic-ui-react';
import { style } from 'typestyle';

import apiConfig from '@api/api.config';
import { TFooterProps } from '@t/app';

const footerStyle = style({
    $nest: {
        '&.ui.container': {
            display: 'flex',
            alignItems: 'center',
            position: 'fixed',
            left: '0px',
            bottom: '0px',
            padding: '2em 0 2em 4em',
            width: '100%',
            background: 'gainsboro'
        }
    }
});

const footerPaginationStyle = style({
    $nest: {
        '&.ui.pagination.menu': {
            margin: '0 auto'
        }
    }
});

const Footer = ({ pages, active, pageChange }: TFooterProps) => {

    const total = Math.floor(pages / apiConfig.defaults.per_page);

    const handlePageChange = (e: SyntheticEvent, d: PaginationProps) => {
        const turnPage = parseInt(`${d.activePage}`);

        pageChange(turnPage);
    }

    return (total && total > 1 ?
        <Container className={footerStyle}>
            <Pagination
                className={footerPaginationStyle}
                defaultActivePage={active}
                totalPages={total}
                onPageChange={handlePageChange}
            />
        </Container>
        : <></>
    )
}

export default Footer;
