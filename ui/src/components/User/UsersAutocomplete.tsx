import React, {useEffect, useState} from "react";
import { Autocomplete, TextField } from '@mui/material';
import {User} from "../../types/User";

interface UsersAutocompleteProps {
    user: User|null,
    setUser: (user: User) => void
}

const UsersAutocomplete: React.FC<UsersAutocompleteProps> = (
    {
        user,
        setUser
    }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_API_HOST}/api/users`)
            .then(response => response.json())
            .then(data => {
                setUsers(data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [user]);

    return (
        <>
            <Autocomplete
                options={users}
                loading={loading}
                selectOnFocus={true}
                clearOnBlur={true}
                handleHomeEndKeys={true}
                getOptionLabel={(option) => option.username}
                value={user
                    ? users.find((datum: User) => datum.id === user.id)
                    : null}
                onChange={(event, newValue) => {
                    if (newValue && newValue.id !== user?.id) {
                        const selectedRecord = users.find((datum: User) => datum.id === newValue.id);
                        if (selectedRecord) {
                            setUser(selectedRecord);
                        }
                    }
                }}
                renderInput={(params) => <TextField {...params} label="User" variant="outlined" required />}
            />
        </>
    );
}

export default UsersAutocomplete;