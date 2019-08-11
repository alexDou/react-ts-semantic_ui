import React, { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { style } from 'typestyle';

import { SearchFormProps } from '@t/app';

const inputStyle = style({
    minWidth: '260px'
})

const SearchForm: React.FC<SearchFormProps> = (props) => {
    const { size, stacked, color, disabled, query, onFormSubmit } = props;
    const [q, setQ] = useState(query);

    const handleChange = (e: any) => setQ(e.target.value);
    const handleSubmit = () => onFormSubmit(q as string);

    const formStyle = style({
        $nest: {
            '&.ui.form': {
                maxWidth: size === 'small' ? '400px' : '100%',
                margin: size === 'small' ? '0 auto' : 'initial'
            }
        }
    });

    const form = () =>
        <>
            <Form.Input
                disabled={disabled}
                fluid
                icon="search"
                iconPosition="left"
                placeholder="discover best ideas"
                type="text"
                value={q}
                className={inputStyle}
                onChange={handleChange}
            />
            <Button disabled={disabled} basic color={color} fluid size={size}>
            Search
            </Button>
        </>

    return (
        <Form size={size} onSubmit={handleSubmit} className={formStyle}>
            <Segment stacked={!!stacked}>
                {size === 'small'
                    ? <Form.Group>{form()}</Form.Group>
                    : form()
                }
            </Segment>
        </Form>
    )
}

export default SearchForm;
