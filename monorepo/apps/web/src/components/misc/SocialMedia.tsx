import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import EditIcon from "@mui/icons-material/Edit";

const actions = [
  {
    icon: <BsGithub className="text-black" />,
    name: "GitHub",
    link: "https://github.com/maheshbasnet089/tapShare",
  },
  {
    icon: <FaFacebook className="text-[#4267B2]" />,
    name: "Facebook",
    link: "https://www.facebook.com/tapshare089",
  },
  {
    icon: <BsLinkedin className="text-[#0a66c2]" />,
    name: "LinkedIn",
    link: "https://www.linkedin.com/company/tapshare089/",
  },
];

export default function SocialMedia() {
  return (
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        direction="up"
        ariaLabel="SpeedDial openIcon example"
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
          ".MuiSpeedDial-fab": {
            width: "43px",
            height: "43px",
            bgcolor: "#3c486b6e",
            color: "gray",
            ":hover": {
              color: "white",
              bgcolor: "#3c486b",
            },
          },
          ".MuiSpeedDialIcon-openIcon": {
            fontSize: "1.4rem",
          },
        }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => window.open(action?.link, "_blank")?.focus()}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
