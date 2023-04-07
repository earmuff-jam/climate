import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LinkIcon from '@mui/icons-material/Link';
import { useRouter } from 'next/router';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

const AccountPage = (props) => {
    const { userDetails } = props;
    const { id, username, full_name, avatar_url, website } = userDetails;
    const router = useRouter();
    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const blankUserInfo = {
        full_name: full_name,
        username: username,
        websiteUrl: website,
    };
    const [userInfo, setUserInfo] = useState(blankUserInfo);

    const resetFields = () => {
        setUserInfo({ ...blankUserInfo });
    }

    const handleChange = ({ target: { name, value } }) => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        // Code to save the edited information
        await supabaseClient
            .from('profiles')
            .upsert({ id: user?.id, full_name: userInfo?.full_name, username: userInfo?.username, website: userInfo?.websiteUrl, updated_at: new Date().toISOString() })
            .select();
        router.push("/");
        resetFields();
    };

    const handleDeleteAccount = () => {
        // Code to delete the user account
    };

    useEffect(() => {
        setUserInfo({ ...userDetails });
    }, [userDetails]);

    console.log(userDetails);
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 0',
                    borderBottom: '1px solid #ccc',
                    marginBottom: '1rem',
                }}
            >
                <Avatar src={avatar_url} alt={username} sx={{ marginRight: '1rem' }} />
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{username}</Typography>
                    <Typography variant="subtitle1">{full_name}</Typography>
                </Box>
                <IconButton aria-label="Edit Profile" onClick={handleSave}>
                    <EditIcon />
                </IconButton>
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
                <Typography variant="h6">Edit Profile</Typography>
                <TextField
                    id="name"
                    name="full_name"
                    label="Full Name"
                    value={userInfo?.full_name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="website"
                    name="website"
                    label="Website"
                    value={userInfo?.websiteUrl}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Divider sx={{ margin: '1rem 0' }} />
                <Typography variant="h6">Change Display Name</Typography>
                <TextField
                    id="username"
                    name="username"
                    type="username"
                    label="Username"
                    value={userInfo?.username}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
                <Typography variant="h6">Account Settings</Typography>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <LinkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Social Media Links" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Notification Settings" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <LanguageIcon />
                        </ListItemIcon>
                        <ListItemText primary="User and Metadata Settings" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Remove Profile Details" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <LockIcon />
                        </ListItemIcon>
                        <ListItemText primary="Protect User Details" />
                    </ListItem>
                </List>
            </Box>
            <Button variant="contained" onClick={handleSave}>
                Save
            </Button>
        </Container>
    );
};

export default AccountPage;
