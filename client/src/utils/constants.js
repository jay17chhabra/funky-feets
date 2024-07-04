import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from '@mui/icons-material/Delete';

export const sidebarLinks = [
  {
    id: 1,
    name: "Profile",
    path: "/profile",
    icon: <PersonIcon />,
  },

  {
    id: 2,
    name: "Shipping Address",
    path: "/shipping",
    icon: <LocalShippingIcon />,
  },
  {
    id: 3,
    name: "Purchase History",
    path: "/history",
    icon: <HistoryIcon />,
  },
  {
    id: 4,
    name: "Logout",
    path: "",
    icon: <PowerSettingsNewIcon />,
    handler: true,
  },
];

export const adminSidebarLinks = [
  {
    id: 1,
    name: "New Item",
    path: "/new-item",
    icon: <AddIcon />,
  },

  {
    id: 2,
    name: "Edit Item",
    path: "/edit-item",
    icon: <EditIcon />,
  },
  {
    id: 3,
    name: "Delete Item",
    path: "/delete-item",
    icon: <DeleteIcon />,
  },
  {
    id: 4,
    name: "Back Home",
    path: "/",
    icon: <HomeIcon />,
  },
];
