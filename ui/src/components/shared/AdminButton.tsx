import React from 'react';
import {Button} from "@mui/material";
import {User} from "../../types/User";
import {useUserStore} from "../../stores/useUserStore";

interface AdminButtonProps {
    variant?: "contained" | "outlined" | "text"
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
    href?: string
    label?: string
    onClick?: () => void
}

const AdminButton: React.FC<AdminButtonProps> = (
    {
        variant,
        color,
        href,
        label,
        onClick
    }) => {
    const {user} = useUserStore();

    const buttonProps: any = {}
    if (variant) {
        buttonProps['variant'] = variant
    }
    if (color) {
        buttonProps['color'] = color
    }
    if (href) {
        buttonProps['href'] = href
    }
    if (onClick) {
        buttonProps['onClick'] = onClick
    }

    return (<>
        {user && (user.is_admin || user.is_super_admin) && <Button
            {...buttonProps}
        >
            {label}
        </Button>}
    </>)
}

export default AdminButton;