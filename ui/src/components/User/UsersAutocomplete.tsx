import React, {useEffect, useState} from "react";
import { Autocomplete, TextField } from '@mui/material';
import {User} from "../../types/User";
import {useApi} from "../../context/ApiProvider";

interface UsersAutocompleteProps {
    user: User|null,
    setUser: (user: User) => void
}

const UsersAutocomplete: React.FC<UsersAutocompleteProps> = ({user, setUser}) => {
    const api = useApi();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        api?.get(`/users`)
            .then((response) => {
                if (!response.ok) {
                    throw Error('Failed to fetch')
                }

                return response.body
            })
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