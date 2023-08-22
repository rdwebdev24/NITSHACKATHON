import * as React from "react";
import { List, Datagrid, TextField } from 'react-admin';

export const WasteData = () => (
    <List>
        <Datagrid>
            <TextField source="nature" />
            <TextField label="weight/kg" source="weight" />
            <TextField source="duration" />
            <TextField source="location" />
            <TextField source="image" />
            <TextField source="description" />
            <TextField source="EmissionFactor" />
            <TextField source="biodegradable" />
            <TextField source="non_biodegradable" />
            <TextField label="recyclable/reusable" source="recyclable" />
            <TextField source="non_recyclable" />
        </Datagrid>
    </List>
);
