import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { UIListAction } from "../../redux/UI/UI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 0, 0),
        // vertical padding + font size from searchIcon
        paddingTop: "0px",
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));
interface ShopBarProps {}

const ShopBar: React.FunctionComponent<ShopBarProps> = () => {
    const dispatch = useDispatch();
    const isOpenning = useSelector(
        (state: RootState) => state.UI.isSideBarOpenning
    );
    const onToggleSideBar = () => {
        dispatch(UIListAction.setSideBarOpenning(!isOpenning));
    };
    return (
        <Box sx={{ flexGrow: 1 }} className=" max-h-16">
            <AppBar position="relative">
                <Toolbar className={`transition-all duration-300 sticky`}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={onToggleSideBar}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Search className="flex h-10">
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ShopBar;
